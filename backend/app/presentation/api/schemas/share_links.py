from __future__ import annotations

import uuid
from datetime import datetime

from pydantic import BaseModel, ConfigDict

from app.presentation.api.schemas.pages import PageSummary


class ShareLinkRead(BaseModel):
    """Public representation of a share link."""

    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    page_id: uuid.UUID
    token: str
    created_by: str | None
    expires_at: datetime | None
    created_at: datetime


class ShareLinkCreateRequest(BaseModel):
    """Body for creating, or reusing, a page's share link."""

    page_id: uuid.UUID
    expires_at: datetime | None = None


class ShareLinkCreateResponse(BaseModel):
    """Response returned after creating or reusing a share link."""

    share_link: ShareLinkRead
    url: str


class PageByTokenResponse(BaseModel):
    """Response for resolving a share token into its page."""

    page: PageSummary
    share_link: ShareLinkRead
