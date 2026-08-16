from __future__ import annotations

import uuid
from dataclasses import dataclass
from datetime import datetime

from app.domain.entities import HtmlPage, Profile, ShareLink


@dataclass(slots=True)
class UploadPageResult:
    """Outcome of creating an upload.

    Attributes
    ----------
    page : HtmlPage
        The newly created page.
    anon_id : str or None
        Present when the use case generated a fresh anonymous identifier
        that the caller did not already have.
    """

    page: HtmlPage
    anon_id: str | None


@dataclass(slots=True)
class PageContent:
    """Rendered HTML content ready to be served for a page.

    Attributes
    ----------
    html : str
        Fully rendered HTML, including storage shim and watermark.
    is_expired : bool
        Whether the page has expired; when ``True``, ``html`` holds the
        "page expired" placeholder instead of the original content.
    """

    html: str
    is_expired: bool


@dataclass(slots=True)
class ShareLinkResult:
    """Outcome of creating or reusing a page's share link.

    Attributes
    ----------
    share_link : ShareLink
        The canonical share link for the page.
    url : str
        Fully qualified public URL for the link.
    """

    share_link: ShareLink
    url: str


@dataclass(slots=True)
class ResolvedShareLink:
    """Outcome of resolving a share token.

    Attributes
    ----------
    page : HtmlPage
        The page the token points to, with an up-to-date view count.
    share_link : ShareLink
        The resolved share link.
    """

    page: HtmlPage
    share_link: ShareLink


@dataclass(slots=True)
class MeResult:
    """Snapshot of the authenticated user's plan and usage.

    Attributes
    ----------
    profile : Profile
        The user's profile.
    active_pages_count : int
        Number of non-expired pages currently owned by the user.
    max_active_pages : int or None
        Maximum active pages allowed by the user's plan, or ``None`` if
        unlimited.
    """

    profile: Profile
    active_pages_count: int
    max_active_pages: int | None


@dataclass(slots=True)
class SubscriptionEventData:
    """Provider-agnostic representation of a subscription lifecycle event.

    Attributes
    ----------
    event_type : str
        Normalized event type, e.g. ``"checkout.completed"``,
        ``"subscription.updated"``, ``"subscription.deleted"``.
    checkout_mode : str or None
        Stripe Checkout Session mode, only set for checkout-completed events.
    client_reference_id : str or None
        Application-supplied identifier (the Firebase UID) echoed back by
        the payment provider, only set for checkout-completed events.
    customer_id : str or None
        Payment provider's customer id.
    subscription_id : str or None
        Payment provider's subscription id.
    price_id : str or None
        Payment provider's price id for the active subscription item.
    is_active : bool
        Whether the subscription is currently active or trialing.
    current_period_end : datetime or None
        End of the current billing period.
    """

    event_type: str
    checkout_mode: str | None
    client_reference_id: str | None
    customer_id: str | None
    subscription_id: str | None
    price_id: str | None
    is_active: bool
    current_period_end: datetime | None


@dataclass(slots=True)
class ForkRequest:
    """Input needed to create a fork alongside a contribution.

    Attributes
    ----------
    html_content : str
        HTML content of the forked page.
    title : str or None
        Requested title for the forked page.
    """

    html_content: str
    title: str | None


@dataclass(slots=True)
class NewPageId:
    """Lightweight reference to a freshly created page.

    Attributes
    ----------
    id : uuid.UUID
        Identifier of the created page.
    """

    id: uuid.UUID
