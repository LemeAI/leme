from __future__ import annotations

import uuid
from datetime import datetime
from typing import Literal

from pydantic import BaseModel, ConfigDict, Field

from app.domain.constraints import (
    MAX_AUTHOR_NAME_LENGTH,
    MAX_CONTRIBUTION_CONTENT_LENGTH,
    MAX_FORK_HTML_LENGTH,
    MAX_TITLE_LENGTH,
)

ContributionType = Literal["comment", "suggestion", "fork"]


class ContributionRead(BaseModel):
    """Public representation of a comment, suggestion, or fork."""

    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    page_id: uuid.UUID
    user_id: str | None
    author_name: str
    content: str
    type: ContributionType
    fork_page_id: uuid.UUID | None
    created_at: datetime


class ContributionCreateRequest(BaseModel):
    """Body for submitting a comment, suggestion, or fork."""

    page_id: uuid.UUID
    type: ContributionType = "comment"
    author_name: str = Field(default="Anonymous", max_length=MAX_AUTHOR_NAME_LENGTH)
    content: str = Field(default="", max_length=MAX_CONTRIBUTION_CONTENT_LENGTH)
    html_content: str | None = Field(default=None, max_length=MAX_FORK_HTML_LENGTH)
    title: str | None = Field(default=None, max_length=MAX_TITLE_LENGTH)
