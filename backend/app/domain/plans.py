from __future__ import annotations

from dataclasses import dataclass
from datetime import UTC, datetime, timedelta
from typing import Literal

EffectivePlan = Literal["anonymous", "free", "pro"]


@dataclass(frozen=True, slots=True)
class PlanLimits:
    """Usage limits associated with one effective plan.

    Attributes
    ----------
    max_active_pages : int or None
        Maximum number of non-expired pages allowed at once. ``None`` means
        unlimited.
    retention_days : int or None
        Number of days a page stays live after upload. ``None`` means pages
        never expire.
    watermark : bool
        Whether the "made with Leme" badge is injected into served pages.
    label : str
        Human-readable plan name.
    """

    max_active_pages: int | None
    retention_days: int | None
    watermark: bool
    label: str


_PLAN_LIMITS: dict[EffectivePlan, PlanLimits] = {
    "anonymous": PlanLimits(max_active_pages=1, retention_days=2, watermark=True, label="Anonymous"),
    "free": PlanLimits(max_active_pages=3, retention_days=30, watermark=True, label="Free"),
    "pro": PlanLimits(max_active_pages=None, retention_days=None, watermark=False, label="Pro"),
}


def get_plan_limits(plan: EffectivePlan) -> PlanLimits:
    """Look up the usage limits for an effective plan.

    Parameters
    ----------
    plan : {"anonymous", "free", "pro"}
        The effective plan to look up.

    Returns
    -------
    PlanLimits
        Limits associated with ``plan``.
    """
    return _PLAN_LIMITS[plan]


def compute_expires_at(plan: EffectivePlan, *, now: datetime | None = None) -> datetime | None:
    """Compute the expiration timestamp for a page uploaded under ``plan``.

    Parameters
    ----------
    plan : {"anonymous", "free", "pro"}
        The effective plan of the uploader.
    now : datetime, optional
        Reference timestamp; defaults to the current UTC time. Exposed for
        deterministic testing.

    Returns
    -------
    datetime or None
        The UTC timestamp at which the page expires, or ``None`` if the
        plan grants pages that never expire.
    """
    limits = get_plan_limits(plan)
    if limits.retention_days is None:
        return None
    reference = now or datetime.now(UTC)
    return reference + timedelta(days=limits.retention_days)


def is_expired(expires_at: datetime | None, *, now: datetime | None = None) -> bool:
    """Determine whether a timestamp is in the past.

    Parameters
    ----------
    expires_at : datetime or None
        The expiration timestamp to check. ``None`` is treated as never
        expiring.
    now : datetime, optional
        Reference timestamp; defaults to the current UTC time. Exposed for
        deterministic testing.

    Returns
    -------
    bool
        ``True`` if ``expires_at`` is set and in the past.
    """
    if expires_at is None:
        return False
    if expires_at.tzinfo is None:
        expires_at = expires_at.replace(tzinfo=UTC)
    reference = now or datetime.now(UTC)
    return expires_at < reference
