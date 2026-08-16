from __future__ import annotations

from fastapi import APIRouter, Depends

from app.application.use_cases.profiles import GetMeUseCase
from app.presentation.api.deps import AuthenticatedUser, get_current_user, get_me_use_case
from app.presentation.api.schemas.me import MeResponse, ProfileRead

router = APIRouter(prefix="/me", tags=["me"])


@router.get("", response_model=MeResponse)
async def read_current_user(
    user: AuthenticatedUser = Depends(get_current_user),
    use_case: GetMeUseCase = Depends(get_me_use_case),
) -> MeResponse:
    """Return the authenticated user's profile, plan, and page usage."""
    result = await use_case.execute(user.uid)
    return MeResponse(
        profile=ProfileRead.model_validate(result.profile),
        active_pages_count=result.active_pages_count,
        max_active_pages=result.max_active_pages,
    )
