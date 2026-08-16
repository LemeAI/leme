from __future__ import annotations

from collections.abc import Awaitable, Callable

from fastapi import FastAPI, Request, status
from fastapi.responses import JSONResponse

from app.domain.exceptions import (
    ExpiredError,
    NotFoundError,
    PermissionDeniedError,
    PlanLimitExceededError,
    ValidationError,
)

_STATUS_BY_EXCEPTION: dict[type[Exception], int] = {
    NotFoundError: status.HTTP_404_NOT_FOUND,
    ValidationError: status.HTTP_400_BAD_REQUEST,
    PlanLimitExceededError: status.HTTP_403_FORBIDDEN,
    PermissionDeniedError: status.HTTP_403_FORBIDDEN,
    ExpiredError: status.HTTP_410_GONE,
}


def register_exception_handlers(app: FastAPI) -> None:
    """Register handlers translating domain exceptions into JSON error responses.

    Parameters
    ----------
    app : FastAPI
        Application instance to register the handlers on.
    """
    for exception_type, status_code in _STATUS_BY_EXCEPTION.items():
        app.add_exception_handler(exception_type, _make_handler(status_code))


def _make_handler(status_code: int) -> Callable[[Request, Exception], Awaitable[JSONResponse]]:
    async def _handler(_request: Request, exc: Exception) -> JSONResponse:
        return JSONResponse(status_code=status_code, content={"detail": str(exc)})

    return _handler
