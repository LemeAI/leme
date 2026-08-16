from __future__ import annotations

from app.domain.exceptions import PlanLimitExceededError
from app.domain.plans import EffectivePlan, get_plan_limits
from app.domain.repositories import HtmlPageRepository, ProfileRepository


class PageQuotaService:
    """Resolves a caller's effective plan and enforces its active-page quota.

    Every path that creates a page goes through here — direct uploads and
    forks alike. Keeping the rule in one place is the point: when forks
    carried their own inline logic, they silently skipped the quota check
    and the expiration entirely, handing out unlimited permanent pages.
    """

    def __init__(self, pages: HtmlPageRepository, profiles: ProfileRepository) -> None:
        self._pages = pages
        self._profiles = profiles

    async def resolve_plan(self, user_id: str | None) -> EffectivePlan:
        """Determine the effective plan for a caller.

        Parameters
        ----------
        user_id : str or None
            Firebase UID of the caller, or None when unauthenticated.

        Returns
        -------
        {"anonymous", "free", "pro"}
            The caller's effective plan. Authenticated callers without a
            profile yet get one created on the spot.
        """
        if user_id is None:
            return "anonymous"
        profile = await self._profiles.get(user_id) or await self._profiles.create_default(user_id)
        return profile.plan  # type: ignore[return-value]

    async def ensure_within_quota(
        self, *, user_id: str | None, anon_id: str | None, plan: EffectivePlan
    ) -> None:
        """Verify the caller can create one more page under their plan.

        Parameters
        ----------
        user_id : str or None
            Firebase UID of the caller, when authenticated.
        anon_id : str or None
            Anonymous identifier, used when `user_id` is None.
        plan : {"anonymous", "free", "pro"}
            The caller's effective plan.

        Raises
        ------
        PlanLimitExceededError
            If the caller already holds the maximum number of active pages.
        """
        limits = get_plan_limits(plan)
        if limits.max_active_pages is None:
            return

        active_count = await self._pages.count_active(user_id=user_id, anon_id=anon_id)
        if active_count < limits.max_active_pages:
            return

        if user_id:
            message = (
                f"Your {limits.label} plan allows a maximum of {limits.max_active_pages} "
                "active page(s). Delete an existing page or upgrade to the Pro plan."
            )
        else:
            message = (
                f"Uploads without an account allow a maximum of {limits.max_active_pages} "
                "active page. Create a free account for more space."
            )
        raise PlanLimitExceededError(message)
