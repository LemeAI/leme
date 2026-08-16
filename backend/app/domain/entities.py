from __future__ import annotations

import uuid
from dataclasses import dataclass
from datetime import datetime


@dataclass(slots=True)
class HtmlPage:
    """An HTML file uploaded by a user or an anonymous visitor.

    Attributes
    ----------
    id : uuid.UUID
        Unique identifier of the page.
    user_id : str or None
        Firebase UID of the owner, when uploaded by an authenticated user.
    anon_id : str or None
        Client-generated identifier of the owner, when uploaded anonymously.
        At most one of ``user_id`` and ``anon_id`` is set.
    title : str
        Display title of the page.
    description : str or None
        Free-text description of the page.
    file_path : str
        Path of the underlying file inside the storage bucket.
    views_count : int
        Number of times the page has been viewed through a share link.
    created_at : datetime
        Timestamp at which the page was uploaded.
    expires_at : datetime or None
        Timestamp at which the page stops being served. ``None`` means it
        never expires.
    expires_at_before_pro : datetime or None
        Backup of ``expires_at`` captured when the owner upgraded to Pro,
        used to restore the original expiration on downgrade.
    """

    id: uuid.UUID
    user_id: str | None
    anon_id: str | None
    title: str
    description: str | None
    file_path: str
    views_count: int
    created_at: datetime
    expires_at: datetime | None
    expires_at_before_pro: datetime | None = None


@dataclass(slots=True)
class Profile:
    """Plan and billing state for one Firebase-authenticated user.

    Attributes
    ----------
    id : str
        Firebase UID of the user.
    plan : str
        Effective subscription plan, ``"free"`` or ``"pro"``.
    created_at : datetime
        Timestamp at which the profile was created.
    stripe_customer_id : str or None
        Stripe customer id associated with this user, once created.
    stripe_subscription_id : str or None
        Stripe subscription id backing the Pro plan, when subscribed.
    stripe_price_id : str or None
        Stripe price id of the active subscription.
    current_period_end : datetime or None
        End of the current billing period for an active subscription.
    """

    id: str
    plan: str
    created_at: datetime
    stripe_customer_id: str | None = None
    stripe_subscription_id: str | None = None
    stripe_price_id: str | None = None
    current_period_end: datetime | None = None


@dataclass(slots=True)
class ShareLink:
    """A shareable token pointing at one :class:`HtmlPage`.

    Attributes
    ----------
    id : uuid.UUID
        Unique identifier of the share link.
    page_id : uuid.UUID
        Identifier of the page this link points to.
    token : str
        Opaque token used in the public share URL.
    created_by : str or None
        Firebase UID of the creator, when authenticated.
    expires_at : datetime or None
        Timestamp at which the link stops resolving. ``None`` means it
        never expires.
    created_at : datetime
        Timestamp at which the link was created.
    """

    id: uuid.UUID
    page_id: uuid.UUID
    token: str
    created_by: str | None
    expires_at: datetime | None
    created_at: datetime


@dataclass(slots=True)
class Contribution:
    """A comment, suggestion, or fork submitted against an :class:`HtmlPage`.

    Attributes
    ----------
    id : uuid.UUID
        Unique identifier of the contribution.
    page_id : uuid.UUID
        Identifier of the page this contribution was made on.
    user_id : str or None
        Firebase UID of the author, when authenticated.
    author_name : str
        Display name of the author.
    content : str
        Body of the comment or suggestion.
    type : str
        One of ``"comment"``, ``"suggestion"``, ``"fork"``.
    fork_page_id : uuid.UUID or None
        Identifier of the page created by a fork contribution.
    created_at : datetime
        Timestamp at which the contribution was recorded.
    """

    id: uuid.UUID
    page_id: uuid.UUID
    user_id: str | None
    author_name: str
    content: str
    type: str
    fork_page_id: uuid.UUID | None
    created_at: datetime
