from __future__ import annotations

import uuid

from app.application.dto import ForkRequest
from app.application.ports import StoragePort
from app.application.services.page_quota import PageQuotaService
from app.domain.constraints import MAX_FORK_HTML_LENGTH
from app.domain.entities import Contribution
from app.domain.exceptions import NotFoundError, ValidationError
from app.domain.plans import compute_expires_at
from app.domain.repositories import ContributionRepository, HtmlPageRepository


class ListContributionsUseCase:
    """List every contribution made on a page."""

    def __init__(self, contributions: ContributionRepository) -> None:
        self._contributions = contributions

    async def execute(self, page_id: uuid.UUID) -> list[Contribution]:
        """List contributions on `page_id`, newest first."""
        return await self._contributions.list_for_page(page_id)


class SubmitContributionUseCase:
    """Record a comment, suggestion, or fork made against a page."""

    def __init__(
        self,
        pages: HtmlPageRepository,
        contributions: ContributionRepository,
        quota: PageQuotaService,
        storage: StoragePort,
    ) -> None:
        self._pages = pages
        self._contributions = contributions
        self._quota = quota
        self._storage = storage

    async def execute(
        self,
        *,
        page_id: uuid.UUID,
        user_id: str | None,
        anon_id: str | None,
        type_: str,
        author_name: str,
        content: str,
        fork: ForkRequest | None,
    ) -> Contribution:
        """Validate and persist a contribution, creating a fork page if needed.

        Parameters
        ----------
        page_id : uuid.UUID
            Identifier of the page being contributed to.
        user_id : str or None
            Firebase UID of the author, when authenticated.
        anon_id : str or None
            Anonymous identifier of the author, used when `user_id` is
            None so that a fork counts against the right quota and shows
            up in that browser's own uploads.
        type_ : {"comment", "suggestion", "fork"}
            Kind of contribution being submitted.
        author_name : str
            Display name of the author; defaults to "Anonymous" when blank.
        content : str
            Body of the comment or suggestion.
        fork : ForkRequest or None
            Fork payload, required when `type_` is `"fork"`.

        Returns
        -------
        Contribution
            The persisted contribution.

        Raises
        ------
        NotFoundError
            If no page matches `page_id`.
        ValidationError
            If a fork is requested without HTML content, the fork content
            exceeds the size limit, or the final content is empty.
        PlanLimitExceededError
            If a fork would exceed the author's active-page quota.
        """
        original_page = await self._pages.get(page_id)
        if original_page is None:
            raise NotFoundError("Original page not found.")

        fork_page_id: uuid.UUID | None = None
        author_name = author_name.strip() or "Anonymous"
        content = content.strip()

        if type_ == "fork":
            if fork is None or not fork.html_content.strip():
                raise ValidationError("htmlContent is required to create a fork.")

            html_bytes = fork.html_content.encode("utf-8")
            if len(html_bytes) > MAX_FORK_HTML_LENGTH:
                raise ValidationError("The fork content exceeds the 2MB limit.")

            plan = await self._quota.resolve_plan(user_id)
            await self._quota.ensure_within_quota(
                user_id=user_id, anon_id=anon_id, plan=plan
            )

            fork_title = (fork.title or "").strip() or f"Fork of {original_page.title}"
            unique_id = uuid.uuid4().hex[:16]
            file_path = f"{user_id or 'anon'}/{unique_id}.html"

            await self._storage.upload(file_path, html_bytes, "text/html")

            try:
                fork_page = await self._pages.create(
                    user_id=user_id,
                    anon_id=anon_id if user_id is None else None,
                    title=fork_title,
                    description=f'Fork of "{original_page.title}"',
                    file_path=file_path,
                    expires_at=compute_expires_at(plan),
                )
            except Exception:
                await self._storage.remove([file_path])
                raise

            fork_page_id = fork_page.id
            if not content:
                content = f'Fork created: "{fork_title}"'

        if not content:
            raise ValidationError("Content is required.")

        return await self._contributions.create(
            page_id=page_id,
            user_id=user_id,
            author_name=author_name,
            content=content,
            type_=type_,
            fork_page_id=fork_page_id,
        )
