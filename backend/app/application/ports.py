from __future__ import annotations

from abc import ABC, abstractmethod

from app.application.dto import SubscriptionEventData


class StoragePort(ABC):
    """Port for storing and retrieving uploaded HTML files."""

    @abstractmethod
    async def upload(self, path: str, content: bytes, content_type: str) -> None:
        """Store a file's bytes at the given path, replacing nothing."""

    @abstractmethod
    async def download(self, path: str) -> bytes:
        """Retrieve a file's bytes from the given path."""

    @abstractmethod
    async def remove(self, paths: list[str]) -> None:
        """Delete one or more files by path."""


class PaymentGatewayPort(ABC):
    """Port for creating Stripe Checkout/Billing Portal sessions and parsing webhooks."""

    @abstractmethod
    async def create_customer(self, *, email: str | None, metadata: dict[str, str]) -> str:
        """Create a customer and return its id."""

    @abstractmethod
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
        """Create a subscription Checkout session and return its redirect URL."""

    @abstractmethod
    async def create_billing_portal_session(self, *, customer_id: str, return_url: str) -> str:
        """Create a Billing Portal session and return its redirect URL."""

    @abstractmethod
    def parse_webhook_event(self, payload: bytes, signature: str, secret: str) -> SubscriptionEventData:
        """Verify and translate a raw webhook payload into a domain-friendly event.

        Raises
        ------
        app.domain.exceptions.ValidationError
            If the payload or signature is invalid.
        """
