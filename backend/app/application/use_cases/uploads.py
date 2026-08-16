from __future__ import annotations

import uuid

from app.application.dto import UploadPageResult
from app.application.ports import StoragePort
from app.application.services.page_quota import PageQuotaService
from app.domain.constraints import ALLOWED_UPLOAD_MIME_TYPES, MAX_UPLOAD_SIZE_BYTES
from app.domain.exceptions import ValidationError
from app.domain.plans import compute_expires_at
from app.domain.repositories import HtmlPageRepository


class CreateUploadUseCase:
    """Store an uploaded HTML file and register it as a new page."""

    def __init__(
        self,
        pages: HtmlPageRepository,
        quota: PageQuotaService,
        storage: StoragePort,
    ) -> None:
        self._pages = pages
        self._quota = quota
        self._storage = storage

    async def execute(
        self,
        *,
        user_id: str | None,
        anon_id: str | None,
        title: str,
        description: str | None,
        filename: str,
        content_type: str,
        content: bytes,
    ) -> UploadPageResult:
        """Validate, store, and register an uploaded HTML file.

        Parameters
        ----------
        user_id : str or None
            Firebase UID of the uploader, when authenticated.
        anon_id : str or None
            Client-generated identifier of the uploader, used when
            `user_id` is None. A fresh one is generated when neither is
            available.
        title : str
            Display title for the page.
        description : str or None
            Free-text description of the page.
        filename : str
            Original filename of the upload, used to validate the
            extension.
        content_type : str
            Declared MIME type of the upload.
        content : bytes
            Raw file bytes.

        Returns
        -------
        UploadPageResult
            The created page, plus a freshly generated `anon_id` when one
            had to be created.

        Raises
        ------
        ValidationError
            If the title is missing, the file is empty, too large, or not
            recognized as HTML.
        PlanLimitExceededError
            If the caller's plan has reached its active page limit.
        """
        if not title.strip():
            raise ValidationError("Title is required.")
        if not content:
            raise ValidationError("Empty file.")
        if len(content) > MAX_UPLOAD_SIZE_BYTES:
            raise ValidationError("File exceeds the 2MB limit.")

        looks_like_html = filename.lower().endswith(".html")
        if content_type not in ALLOWED_UPLOAD_MIME_TYPES or not looks_like_html:
            raise ValidationError("Only .html files are accepted.")

        generated_anon_id: str | None = None
        if user_id is None and not anon_id:
            anon_id = uuid.uuid4().hex
            generated_anon_id = anon_id

        plan = await self._quota.resolve_plan(user_id)
        await self._quota.ensure_within_quota(user_id=user_id, anon_id=anon_id, plan=plan)

        unique_id = uuid.uuid4().hex[:16]
        file_path = f"{user_id or 'anon'}/{unique_id}.html"
        await self._storage.upload(file_path, content, "text/html")

        try:
            page = await self._pages.create(
                user_id=user_id,
                anon_id=anon_id if user_id is None else None,
                title=title.strip(),
                description=(description or "").strip() or None,
                file_path=file_path,
                expires_at=compute_expires_at(plan),
            )
        except Exception:
            await self._storage.remove([file_path])
            raise

        return UploadPageResult(page=page, anon_id=generated_anon_id)
