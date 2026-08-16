from __future__ import annotations

from pydantic import BaseModel


class ErrorResponse(BaseModel):
    """Uniform error body returned for non-2xx responses."""

    detail: str
