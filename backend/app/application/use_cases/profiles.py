from __future__ import annotations

from app.application.dto import MeResult
from app.domain.plans import get_plan_limits
from app.domain.repositories import HtmlPageRepository, ProfileRepository


class GetMeUseCase:
    """Fetch the authenticated user's profile, plan, and page usage."""

    def __init__(self, pages: HtmlPageRepository, profiles: ProfileRepository) -> None:
        self._pages = pages
        self._profiles = profiles

    async def execute(self, user_id: str) -> MeResult:
        """Fetch or create `user_id`'s profile and compute usage against its plan."""
        profile = await self._profiles.get(user_id) or await self._profiles.create_default(user_id)
        limits = get_plan_limits(profile.plan)  # type: ignore[arg-type]
        active_count = await self._pages.count_active(user_id=user_id, anon_id=None)
        return MeResult(
            profile=profile,
            active_pages_count=active_count,
            max_active_pages=limits.max_active_pages,
        )
