from __future__ import annotations

from fastapi import APIRouter, Depends, Request, status

from app.application.use_cases.share_links import CreateShareLinkUseCase, ResolveShareLinkUseCase
from app.presentation.api.deps import (
    AuthenticatedUser,
    get_create_share_link_use_case,
    get_optional_user,
    get_resolve_share_link_use_case,
)
from app.presentation.api.rate_limit import limiter
from app.presentation.api.schemas.pages import PageSummary
from app.presentation.api.schemas.share_links import (
    PageByTokenResponse,
    ShareLinkCreateRequest,
    ShareLinkCreateResponse,
    ShareLinkRead,
)

router = APIRouter(tags=["share-links"])


@router.post("/share-links", response_model=ShareLinkCreateResponse, status_code=status.HTTP_201_CREATED)
@limiter.limit("30/hour")
async def create_share_link(
    request: Request,
    payload: ShareLinkCreateRequest,
    user: AuthenticatedUser | None = Depends(get_optional_user),
    use_case: CreateShareLinkUseCase = Depends(get_create_share_link_use_case),
) -> ShareLinkCreateResponse:
    """Create, or reuse, the canonical share link for a page."""
    result = await use_case.execute(
        page_id=payload.page_id,
        created_by=user.uid if user else None,
        expires_at=payload.expires_at,
    )
    return ShareLinkCreateResponse(share_link=ShareLinkRead.model_validate(result.share_link), url=result.url)


@router.get("/share-links/{token}", response_model=PageByTokenResponse)
async def resolve_share_link(
    token: str,
    use_case: ResolveShareLinkUseCase = Depends(get_resolve_share_link_use_case),
) -> PageByTokenResponse:
    """Resolve a share token into its page and record a view."""
    result = await use_case.execute(token)
    return PageByTokenResponse(
        page=PageSummary.model_validate(result.page),
        share_link=ShareLinkRead.model_validate(result.share_link),
    )
