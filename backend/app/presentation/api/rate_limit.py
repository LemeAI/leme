from __future__ import annotations

from fastapi import Request
from slowapi import Limiter

from app.infrastructure.config import get_settings


def client_ip(request: Request) -> str:
    """Resolve the calling client's IP address from behind reverse proxies.

    Reads X-Forwarded-For counting `trusted_proxy_hops` entries in from the
    right. Counting from the right matters: proxies append, so everything
    to the left of the trusted hops is client-supplied and spoofable. Using
    `request.client.host` directly would instead bucket every caller behind
    the same proxy IP, letting one client exhaust the limit for everyone.

    Parameters
    ----------
    request : Request
        The incoming request.

    Returns
    -------
    str
        The client IP, or "unknown" when it cannot be determined.
    """
    settings = get_settings()
    forwarded = request.headers.get("x-forwarded-for")

    if forwarded:
        hops = [part.strip() for part in forwarded.split(",") if part.strip()]
        index = len(hops) - 1 - settings.trusted_proxy_hops
        if 0 <= index < len(hops):
            return hops[index]
        if hops:
            return hops[0]

    return request.client.host if request.client else "unknown"


limiter = Limiter(key_func=client_ip, storage_uri=get_settings().rate_limit_storage_uri)
