from __future__ import annotations

import secrets
import string
import uuid
from datetime import datetime

from app.application.dto import ResolvedShareLink, ShareLinkResult
from app.domain.exceptions import ExpiredError, NotFoundError
from app.domain.plans import is_expired
from app.domain.repositories import HtmlPageRepository, ShareLinkRepository

_TOKEN_ALPHABET = string.ascii_letters + string.digits
_TOKEN_LENGTH = 10


def _generate_token() -> str:
    return "".join(secrets.choice(_TOKEN_ALPHABET) for _ in range(_TOKEN_LENGTH))


class CreateShareLinkUseCase:
    """Create, or reuse, the canonical share link for a page."""

    def __init__(self, pages: HtmlPageRepository, share_links: ShareLinkRepository, *, site_url: str) -> None:
        self._pages = pages
        self._share_links = share_links
        self._site_url = site_url

    async def execute(
        self, *, page_id: uuid.UUID, created_by: str | None, expires_at: datetime | None
    ) -> ShareLinkResult:
        """Return a page's existing share link, creating one if it has none.

        Raises
        ------
        NotFoundError
            If no page matches `page_id`.
        """
        page = await self._pages.get(page_id)
        if page is None:
            raise NotFoundError("Page not found.")

        existing = await self._share_links.get_canonical_for_page(page_id)
        if existing is not None:
            return ShareLinkResult(share_link=existing, url=f"{self._site_url}/s/{existing.token}")

        share_link = await self._share_links.create(
            page_id=page_id,
            token=_generate_token(),
            created_by=created_by,
            expires_at=expires_at,
        )
        return ShareLinkResult(share_link=share_link, url=f"{self._site_url}/s/{share_link.token}")


class ResolveShareLinkUseCase:
    """Resolve a share token into its page, incrementing the view counter."""

    def __init__(self, pages: HtmlPageRepository, share_links: ShareLinkRepository) -> None:
        self._pages = pages
        self._share_links = share_links

    async def execute(self, token: str) -> ResolvedShareLink:
        """Resolve `token` into its page and record a view.

        Raises
        ------
        NotFoundError
            If the token or its page do not exist.
        ExpiredError
            If the link or its page have expired.
        """
        share_link = await self._share_links.get_by_token(token)
        if share_link is None:
            raise NotFoundError("Link not found.")
        if is_expired(share_link.expires_at):
            raise ExpiredError("This link has expired.")

        page = await self._pages.get(share_link.page_id)
        if page is None:
            raise NotFoundError("Page not found.")
        if is_expired(page.expires_at):
            raise ExpiredError("This page has expired.")

        new_view_count = await self._pages.increment_views(page.id)
        if new_view_count is not None:
            page.views_count = new_view_count

        return ResolvedShareLink(page=page, share_link=share_link)
