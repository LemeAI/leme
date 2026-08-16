from __future__ import annotations

import uuid
from abc import ABC, abstractmethod
from datetime import datetime

from app.domain.entities import Contribution, HtmlPage, Profile, ShareLink


class HtmlPageRepository(ABC):
    """Persistence port for :class:`~app.domain.entities.HtmlPage`."""

    @abstractmethod
    async def get(self, page_id: uuid.UUID) -> HtmlPage | None:
        """Fetch a page by id, or ``None`` if it does not exist."""

    @abstractmethod
    async def list_by_owner(self, *, user_id: str | None, anon_id: str | None) -> list[HtmlPage]:
        """List every page owned by a user or anonymous identity, newest first."""

    @abstractmethod
    async def count_active(self, *, user_id: str | None, anon_id: str | None) -> int:
        """Count an owner's pages that have not expired."""

    @abstractmethod
    async def create(
        self,
        *,
        user_id: str | None,
        anon_id: str | None,
        title: str,
        description: str | None,
        file_path: str,
        expires_at: datetime | None,
    ) -> HtmlPage:
        """Persist a new page and return it with its generated id."""

    @abstractmethod
    async def increment_views(self, page_id: uuid.UUID) -> int | None:
        """Atomically increment a page's view counter, returning the new value.

        Returns None when no page matches `page_id`.
        """

    @abstractmethod
    async def apply_pro_upgrade(self, user_id: str) -> None:
        """Suspend the expiration of an owner's existing pages after a Pro upgrade."""

    @abstractmethod
    async def apply_pro_downgrade(self, user_id: str, fallback_days: int) -> None:
        """Restore or reapply expiration for an owner's pages after a Pro downgrade."""


class ProfileRepository(ABC):
    """Persistence port for :class:`~app.domain.entities.Profile`."""

    @abstractmethod
    async def get(self, user_id: str) -> Profile | None:
        """Fetch a profile by Firebase UID, or ``None`` if it does not exist."""

    @abstractmethod
    async def create_default(self, user_id: str) -> Profile:
        """Create and persist a default free-plan profile."""

    @abstractmethod
    async def get_by_stripe_customer_id(self, customer_id: str) -> Profile | None:
        """Fetch the profile linked to a Stripe customer id, if any."""

    @abstractmethod
    async def set_stripe_customer_id(self, user_id: str, customer_id: str) -> None:
        """Attach a Stripe customer id to a profile."""

    @abstractmethod
    async def upsert_subscription_state(
        self,
        *,
        user_id: str,
        plan: str,
        stripe_customer_id: str | None,
        stripe_subscription_id: str | None,
        stripe_price_id: str | None,
        current_period_end: datetime | None,
    ) -> None:
        """Create or update a profile's plan and subscription bookkeeping."""

    @abstractmethod
    async def update_subscription_state_by_customer_id(
        self,
        *,
        customer_id: str,
        plan: str,
        stripe_subscription_id: str | None,
        stripe_price_id: str | None,
        current_period_end: datetime | None,
    ) -> None:
        """Update the plan and subscription bookkeeping for a known Stripe customer."""


class ShareLinkRepository(ABC):
    """Persistence port for :class:`~app.domain.entities.ShareLink`."""

    @abstractmethod
    async def get_by_token(self, token: str) -> ShareLink | None:
        """Fetch a share link by its token, or ``None`` if it does not exist."""

    @abstractmethod
    async def get_canonical_for_page(self, page_id: uuid.UUID) -> ShareLink | None:
        """Fetch a page's oldest (canonical) share link, if any."""

    @abstractmethod
    async def create(
        self,
        *,
        page_id: uuid.UUID,
        token: str,
        created_by: str | None,
        expires_at: datetime | None,
    ) -> ShareLink:
        """Persist a new share link and return it with its generated id."""


class ContributionRepository(ABC):
    """Persistence port for :class:`~app.domain.entities.Contribution`."""

    @abstractmethod
    async def list_for_page(self, page_id: uuid.UUID) -> list[Contribution]:
        """List every contribution made on a page, newest first."""

    @abstractmethod
    async def create(
        self,
        *,
        page_id: uuid.UUID,
        user_id: str | None,
        author_name: str,
        content: str,
        type_: str,
        fork_page_id: uuid.UUID | None,
    ) -> Contribution:
        """Persist a new contribution and return it with its generated id."""
