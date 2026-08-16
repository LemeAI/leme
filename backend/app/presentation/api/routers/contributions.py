from __future__ import annotations

import uuid

from fastapi import APIRouter, Depends, Request, status

from app.application.dto import ForkRequest
from app.application.use_cases.contributions import ListContributionsUseCase, SubmitContributionUseCase
from app.presentation.api.deps import (
    AuthenticatedUser,
    get_anon_id,
    get_list_contributions_use_case,
    get_optional_user,
    get_submit_contribution_use_case,
)
from app.presentation.api.rate_limit import limiter
from app.presentation.api.schemas.contributions import ContributionCreateRequest, ContributionRead

router = APIRouter(tags=["contributions"])


@router.get("/pages/{page_id}/contributions", response_model=list[ContributionRead])
async def list_contributions(
    page_id: uuid.UUID,
    use_case: ListContributionsUseCase = Depends(get_list_contributions_use_case),
) -> list[ContributionRead]:
    """List every comment, suggestion, and fork made on a page."""
    contributions = await use_case.execute(page_id)
    return [ContributionRead.model_validate(contribution) for contribution in contributions]


@router.post("/contributions", response_model=ContributionRead, status_code=status.HTTP_201_CREATED)
@limiter.limit("30/hour")
async def create_contribution(
    request: Request,
    payload: ContributionCreateRequest,
    user: AuthenticatedUser | None = Depends(get_optional_user),
    anon_id: str | None = Depends(get_anon_id),
    use_case: SubmitContributionUseCase = Depends(get_submit_contribution_use_case),
) -> ContributionRead:
    """Record a comment, suggestion, or fork on an existing page."""
    fork = (
        ForkRequest(html_content=payload.html_content, title=payload.title)
        if payload.type == "fork" and payload.html_content is not None
        else None
    )
    contribution = await use_case.execute(
        page_id=payload.page_id,
        user_id=user.uid if user else None,
        anon_id=anon_id,
        type_=payload.type,
        author_name=payload.author_name,
        content=payload.content,
        fork=fork,
    )
    return ContributionRead.model_validate(contribution)
