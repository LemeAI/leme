from __future__ import annotations

import uuid
from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class HtmlPageRead(BaseModel):
    """Public representation of an uploaded HTML page."""

    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    user_id: str | None
    title: str
    description: str | None
    file_path: str
    views_count: int
    created_at: datetime
    expires_at: datetime | None
    anon_id: str | None


class UploadResponse(BaseModel):
    """Response returned after a successful upload."""

    page: HtmlPageRead
    anon_id: str | None = Field(
        default=None,
        description="Present when the server generated a new anonymous identifier; "
        "persist it and resend it as X-Anon-Id on future requests.",
    )


class PageSummary(BaseModel):
    """Trimmed page representation returned alongside a resolved share link."""

    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    title: str
    description: str | None
    file_path: str
    views_count: int
    created_at: datetime
