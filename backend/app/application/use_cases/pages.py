from __future__ import annotations

import uuid

from app.application.dto import PageContent
from app.application.ports import StoragePort
from app.domain.entities import HtmlPage
from app.domain.exceptions import NotFoundError
from app.domain.html_rendering import inject_storage_shim, inject_watermark, render_expired_html
from app.domain.plans import EffectivePlan, get_plan_limits, is_expired
from app.domain.repositories import HtmlPageRepository, ProfileRepository


class GetPageUseCase:
    """Fetch public metadata for a single page."""

    def __init__(self, pages: HtmlPageRepository) -> None:
        self._pages = pages

    async def execute(self, page_id: uuid.UUID) -> HtmlPage:
        """Fetch a page by id.

        Raises
        ------
        NotFoundError
            If no page matches `page_id`.
        """
        page = await self._pages.get(page_id)
        if page is None:
            raise NotFoundError("Page not found.")
        return page


class GetPageContentUseCase:
    """Render the HTML content served for a page's public view."""

    def __init__(
        self,
        pages: HtmlPageRepository,
        profiles: ProfileRepository,
        storage: StoragePort,
        *,
        site_url: str,
    ) -> None:
        self._pages = pages
        self._profiles = profiles
        self._storage = storage
        self._site_url = site_url

    async def execute(self, page_id: uuid.UUID, *, decorate: bool = True) -> PageContent:
        """Fetch a page's HTML, optionally decorated for the public viewer.

        Parameters
        ----------
        page_id : uuid.UUID
            Identifier of the page.
        decorate : bool
            When True (the default, used by the public `<iframe>` viewer),
            applies the storage shim and watermark. When False, returns the
            original stored bytes untouched — used to seed the fork editor,
            so forking a page never bakes another page's watermark into the
            copy.

        Returns
        -------
        PageContent
            The page's HTML, and whether it was expired.

        Raises
        ------
        NotFoundError
            If no page matches `page_id`, or its file is missing from
            storage.
        """
        page = await self._pages.get(page_id)
        if page is None:
            raise NotFoundError("Page not found.")

        if is_expired(page.expires_at):
            return PageContent(html=render_expired_html(), is_expired=True)

        raw_content = await self._storage.download(page.file_path)
        html = raw_content.decode("utf-8")

        if decorate:
            plan: EffectivePlan = "anonymous"
            if page.user_id:
                profile = await self._profiles.get(page.user_id)
                plan = profile.plan if profile is not None else "free"  # type: ignore[assignment]

            html = inject_storage_shim(html)
            if get_plan_limits(plan).watermark:
                html = inject_watermark(html, site_url=self._site_url)

        return PageContent(html=html, is_expired=False)


class ListMyPagesUseCase:
    """List every page owned by an identity, authenticated or anonymous."""

    def __init__(self, pages: HtmlPageRepository) -> None:
        self._pages = pages

    async def execute(self, *, user_id: str | None, anon_id: str | None) -> list[HtmlPage]:
        """List pages owned by `user_id`, or by `anon_id` when `user_id` is None."""
        if user_id is None and not anon_id:
            return []
        return await self._pages.list_by_owner(user_id=user_id, anon_id=anon_id)
