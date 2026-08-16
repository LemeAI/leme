from __future__ import annotations

from datetime import UTC, datetime

import stripe

from app.application.dto import SubscriptionEventData
from app.application.ports import PaymentGatewayPort
from app.domain.exceptions import ValidationError
from app.infrastructure.config import Settings

_EVENT_TYPE_MAP = {
    "checkout.session.completed": "checkout.completed",
    "customer.subscription.created": "subscription.updated",
    "customer.subscription.updated": "subscription.updated",
    "customer.subscription.deleted": "subscription.deleted",
}

_ACTIVE_STATUSES = {"active", "trialing"}


class StripeGateway(PaymentGatewayPort):
    """`PaymentGatewayPort` implementation backed by the Stripe API."""

    def __init__(self, settings: Settings) -> None:
        self._client = stripe.StripeClient(settings.stripe_secret_key)

    async def create_customer(self, *, email: str | None, metadata: dict[str, str]) -> str:
        """Create a Stripe customer and return its id."""
        customer = await self._client.customers.create_async(params={"email": email, "metadata": metadata})
        return customer.id

    async def create_checkout_session(
        self,
        *,
        customer_id: str,
        price_id: str,
        client_reference_id: str,
        success_url: str,
        cancel_url: str,
        metadata: dict[str, str],
    ) -> str:
        """Create a subscription Checkout session and return its redirect URL.

        Raises
        ------
        ValidationError
            If Stripe did not return a session URL.
        """
        session = await self._client.checkout.sessions.create_async(
            params={
                "mode": "subscription",
                "customer": customer_id,
                "client_reference_id": client_reference_id,
                "line_items": [{"price": price_id, "quantity": 1}],
                "allow_promotion_codes": True,
                "success_url": success_url,
                "cancel_url": cancel_url,
                "subscription_data": {"metadata": metadata},
            }
        )
        if not session.url:
            raise ValidationError("Failed to create checkout session.")
        return session.url

    async def create_billing_portal_session(self, *, customer_id: str, return_url: str) -> str:
        """Create a Billing Portal session and return its redirect URL."""
        session = await self._client.billing_portal.sessions.create_async(
            params={"customer": customer_id, "return_url": return_url}
        )
        return session.url

    def parse_webhook_event(self, payload: bytes, signature: str, secret: str) -> SubscriptionEventData:
        """Verify a webhook signature and translate the event into a `SubscriptionEventData`.

        Raises
        ------
        ValidationError
            If the payload or signature is invalid.
        """
        try:
            event = stripe.Webhook.construct_event(payload, signature, secret)
        except (ValueError, stripe.SignatureVerificationError) as exc:
            raise ValidationError("Invalid webhook signature.") from exc

        event_type = _EVENT_TYPE_MAP.get(event["type"], "unhandled")
        data_object = event["data"]["object"]

        if event_type == "checkout.completed":
            return self._parse_checkout_completed(data_object)
        if event_type in ("subscription.updated", "subscription.deleted"):
            return self._parse_subscription_event(event_type, data_object)

        return SubscriptionEventData(
            event_type=event_type,
            checkout_mode=None,
            client_reference_id=None,
            customer_id=None,
            subscription_id=None,
            price_id=None,
            is_active=False,
            current_period_end=None,
        )

    @staticmethod
    def _parse_checkout_completed(data_object: dict) -> SubscriptionEventData:
        customer = data_object.get("customer")
        subscription = data_object.get("subscription")
        return SubscriptionEventData(
            event_type="checkout.completed",
            checkout_mode=data_object.get("mode"),
            client_reference_id=data_object.get("client_reference_id"),
            customer_id=customer if isinstance(customer, str) else None,
            subscription_id=subscription if isinstance(subscription, str) else None,
            price_id=None,
            is_active=True,
            current_period_end=None,
        )

    @staticmethod
    def _parse_subscription_event(event_type: str, data_object: dict) -> SubscriptionEventData:
        customer = data_object.get("customer")
        items = (data_object.get("items") or {}).get("data") or []
        item = items[0] if items else None

        current_period_end: datetime | None = None
        raw_period_end = item.get("current_period_end") if item else None
        if raw_period_end:
            current_period_end = datetime.fromtimestamp(raw_period_end, tz=UTC)

        return SubscriptionEventData(
            event_type=event_type,
            checkout_mode=None,
            client_reference_id=None,
            customer_id=customer if isinstance(customer, str) else None,
            subscription_id=data_object.get("id"),
            price_id=(item.get("price") or {}).get("id") if item else None,
            is_active=data_object.get("status") in _ACTIVE_STATUSES,
            current_period_end=current_period_end,
        )
