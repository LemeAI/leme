from __future__ import annotations

import uuid

from fastapi import APIRouter, Depends, Response, status
from fastapi.responses import PlainTextResponse

from app.application.use_cases.pages import GetPageContentUseCase, GetPageUseCase, ListMyPagesUseCase
from app.domain.exceptions import NotFoundError
from app.presentation.api.deps import (
    AuthenticatedUser,
    get_anon_id,
    get_current_user,
    get_get_page_use_case,
    get_list_my_pages_use_case,
    get_page_content_use_case,
)
from app.presentation.api.schemas.pages import HtmlPageRead

router = APIRouter(prefix="/pages", tags=["pages"])


@router.get("/mine", response_model=list[HtmlPageRead])
async def list_my_pages(
    user: AuthenticatedUser = Depends(get_current_user),
    use_case: ListMyPagesUseCase = Depends(get_list_my_pages_use_case),
) -> list[HtmlPageRead]:
    """List every page owned by the authenticated user."""
    pages = await use_case.execute(user_id=user.uid, anon_id=None)
    return [HtmlPageRead.model_validate(page) for page in pages]


@router.get("/mine/anonymous", response_model=list[HtmlPageRead])
async def list_anonymous_pages(
    anon_id: str | None = Depends(get_anon_id),
    use_case: ListMyPagesUseCase = Depends(get_list_my_pages_use_case),
) -> list[HtmlPageRead]:
    """List pages uploaded without an account, identified by `X-Anon-Id`."""
    pages = await use_case.execute(user_id=None, anon_id=anon_id)
    return [HtmlPageRead.model_validate(page) for page in pages]


@router.get("/{page_id}", response_model=HtmlPageRead)
async def get_page_by_id(
    page_id: uuid.UUID,
    use_case: GetPageUseCase = Depends(get_get_page_use_case),
) -> HtmlPageRead:
    """Fetch public metadata for a single page."""
    page = await use_case.execute(page_id)
    return HtmlPageRead.model_validate(page)


@router.get("/{page_id}/content")
async def get_page_content(
    page_id: uuid.UUID,
    decorate: bool = True,
    use_case: GetPageContentUseCase = Depends(get_page_content_use_case),
) -> Response:
    """Serve a page's HTML, decorated with the storage shim and watermark.

    Pass `decorate=false` to fetch the original stored bytes instead — used
    to seed the fork editor with unmodified source.

    Returns a plain-text 404 (rather than the standard JSON error body) so
    the response is safe to load directly into the sandboxed `<iframe>`
    that renders it.
    """
    try:
        content = await use_case.execute(page_id, decorate=decorate)
    except NotFoundError as exc:
        return PlainTextResponse(str(exc), status_code=status.HTTP_404_NOT_FOUND)

    status_code = status.HTTP_410_GONE if content.is_expired else status.HTTP_200_OK
    headers = {} if content.is_expired else {"Cache-Control": "public, max-age=60"}
    return Response(content=content.html, media_type="text/html", status_code=status_code, headers=headers)
