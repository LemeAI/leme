from __future__ import annotations

from app.application.dto import SubscriptionEventData
from app.application.ports import PaymentGatewayPort
from app.domain.exceptions import NotFoundError
from app.domain.plans import get_plan_limits
from app.domain.repositories import HtmlPageRepository, ProfileRepository


class CreateCheckoutSessionUseCase:
    """Create a Stripe Checkout session to start or renew a Pro subscription."""

    def __init__(
        self, profiles: ProfileRepository, gateway: PaymentGatewayPort, *, frontend_url: str
    ) -> None:
        self._profiles = profiles
        self._gateway = gateway
        self._frontend_url = frontend_url

    async def execute(self, *, user_id: str, email: str | None, price_id: str) -> str:
        """Return a Checkout URL for `user_id`, creating a Stripe customer if needed."""
        profile = await self._profiles.get(user_id) or await self._profiles.create_default(user_id)

        customer_id = profile.stripe_customer_id
        if not customer_id:
            customer_id = await self._gateway.create_customer(
                email=email, metadata={"firebase_uid": user_id}
            )
            await self._profiles.set_stripe_customer_id(user_id, customer_id)

        return await self._gateway.create_checkout_session(
            customer_id=customer_id,
            price_id=price_id,
            client_reference_id=user_id,
            success_url=f"{self._frontend_url}/dashboard?checkout=success",
            cancel_url=f"{self._frontend_url}/pricing?checkout=cancelled",
            metadata={"firebase_uid": user_id},
        )


class CreatePortalSessionUseCase:
    """Create a Stripe Billing Portal session for an existing subscriber."""

    def __init__(
        self, profiles: ProfileRepository, gateway: PaymentGatewayPort, *, frontend_url: str
    ) -> None:
        self._profiles = profiles
        self._gateway = gateway
        self._frontend_url = frontend_url

    async def execute(self, user_id: str) -> str:
        """Return a Billing Portal URL for `user_id`.

        Raises
        ------
        NotFoundError
            If the user has no Stripe customer yet.
        """
        profile = await self._profiles.get(user_id)
        if profile is None or not profile.stripe_customer_id:
            raise NotFoundError("No billing account found yet. Upgrade to Pro first.")

        return await self._gateway.create_billing_portal_session(
            customer_id=profile.stripe_customer_id,
            return_url=f"{self._frontend_url}/dashboard",
        )


class HandleStripeWebhookUseCase:
    """Apply a verified Stripe subscription event to profiles and page expirations."""

    def __init__(
        self,
        profiles: ProfileRepository,
        pages: HtmlPageRepository,
        gateway: PaymentGatewayPort,
        *,
        webhook_secret: str,
    ) -> None:
        self._profiles = profiles
        self._pages = pages
        self._gateway = gateway
        self._webhook_secret = webhook_secret

    async def execute(self, *, payload: bytes, signature: str) -> None:
        """Verify, parse, and apply a raw Stripe webhook request body.

        Raises
        ------
        app.domain.exceptions.ValidationError
            If the payload or signature is invalid.
        """
        event = self._gateway.parse_webhook_event(payload, signature, self._webhook_secret)

        if event.event_type == "checkout.completed":
            await self._handle_checkout_completed(event)
        elif event.event_type == "subscription.updated":
            await self._handle_subscription_updated(event)
        elif event.event_type == "subscription.deleted":
            await self._handle_subscription_deleted(event)

    async def _handle_checkout_completed(self, event: SubscriptionEventData) -> None:
        if event.checkout_mode != "subscription":
            return
        if not event.client_reference_id or not event.customer_id:
            return

        await self._profiles.upsert_subscription_state(
            user_id=event.client_reference_id,
            plan="pro",
            stripe_customer_id=event.customer_id,
            stripe_subscription_id=event.subscription_id,
            stripe_price_id=event.price_id,
            current_period_end=event.current_period_end,
        )
        await self._pages.apply_pro_upgrade(event.client_reference_id)

    async def _handle_subscription_updated(self, event: SubscriptionEventData) -> None:
        if not event.customer_id:
            return

        plan = "pro" if event.is_active else "free"
        await self._profiles.update_subscription_state_by_customer_id(
            customer_id=event.customer_id,
            plan=plan,
            stripe_subscription_id=event.subscription_id,
            stripe_price_id=event.price_id,
            current_period_end=event.current_period_end,
        )

        profile = await self._profiles.get_by_stripe_customer_id(event.customer_id)
        if profile is None:
            return
        if event.is_active:
            await self._pages.apply_pro_upgrade(profile.id)
        else:
            fallback_days = get_plan_limits("free").retention_days or 30
            await self._pages.apply_pro_downgrade(profile.id, fallback_days)

    async def _handle_subscription_deleted(self, event: SubscriptionEventData) -> None:
        if not event.customer_id:
            return

        profile = await self._profiles.get_by_stripe_customer_id(event.customer_id)

        await self._profiles.update_subscription_state_by_customer_id(
            customer_id=event.customer_id,
            plan="free",
            stripe_subscription_id=None,
            stripe_price_id=None,
            current_period_end=None,
        )

        if profile is not None:
            fallback_days = get_plan_limits("free").retention_days or 30
            await self._pages.apply_pro_downgrade(profile.id, fallback_days)
