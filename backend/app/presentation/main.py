from __future__ import annotations

from fastapi import FastAPI, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from slowapi.middleware import SlowAPIMiddleware

from app.infrastructure.config import get_settings
from app.presentation.api.exception_handlers import register_exception_handlers
from app.presentation.api.rate_limit import limiter
from app.presentation.api.routers import billing, contributions, me, pages, share_links, uploads


def create_app() -> FastAPI:
    """Build and configure the FastAPI application.

    Returns
    -------
    FastAPI
        The fully configured application, ready to be served by an ASGI
        server such as uvicorn. Interactive docs are exposed at `/docs`
        (Swagger UI) and `/redoc`.
    """
    settings = get_settings()

    app = FastAPI(
        title="Leme API",
        description="Backend for Leme: upload, share, and collaborate on HTML pages.",
        version="1.0.0",
        docs_url="/docs",
        redoc_url="/redoc",
        openapi_url="/openapi.json",
    )

    app.state.limiter = limiter
    app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)
    app.add_middleware(SlowAPIMiddleware)

    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.cors_origins,
        allow_credentials=False,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    register_exception_handlers(app)

    @app.middleware("http")
    async def reject_oversized_requests(request: Request, call_next):  # type: ignore[no-untyped-def]
        """Reject bodies above `max_request_bytes` before anything parses them."""
        content_length = request.headers.get("content-length")
        if content_length:
            try:
                declared_size = int(content_length)
            except ValueError:
                return JSONResponse(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    content={"detail": "Invalid Content-Length header."},
                )
            if declared_size > settings.max_request_bytes:
                return JSONResponse(
                    status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
                    content={"detail": "Request body is too large."},
                )
        return await call_next(request)

    app.include_router(uploads.router)
    app.include_router(pages.router)
    app.include_router(share_links.router)
    app.include_router(contributions.router)
    app.include_router(billing.router)
    app.include_router(me.router)

    @app.get("/health", tags=["health"])
    async def health() -> dict[str, str]:
        """Liveness probe used by the Cloud Run health check."""
        return {"status": "ok"}

    return app


app = create_app()
