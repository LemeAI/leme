from __future__ import annotations

from datetime import datetime
from typing import Literal

from pydantic import BaseModel, ConfigDict

Plan = Literal["free", "pro"]


class ProfileRead(BaseModel):
    """Public representation of a user's plan and billing state."""

    model_config = ConfigDict(from_attributes=True)

    id: str
    plan: Plan
    created_at: datetime
    current_period_end: datetime | None


class MeResponse(BaseModel):
    """Response for the authenticated user's own profile and usage."""

    profile: ProfileRead
    active_pages_count: int
    max_active_pages: int | None
