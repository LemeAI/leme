from __future__ import annotations

import httpx

from app.application.ports import StoragePort
from app.domain.exceptions import NotFoundError
from app.infrastructure.config import Settings

_TIMEOUT_SECONDS = 30.0


class SupabaseStorage(StoragePort):
    """`StoragePort` implementation backed by the Supabase Storage REST API.

    Talks directly to Supabase's HTTP API with the service-role key rather
    than through the `supabase-py` client, keeping the request fully async
    and dependency-light.
    """

    def __init__(self, settings: Settings) -> None:
        self._base_url = f"{settings.supabase_url}/storage/v1"
        self._bucket = settings.storage_bucket
        self._headers = {
            "Authorization": f"Bearer {settings.supabase_service_role_key}",
            "apikey": settings.supabase_service_role_key,
        }

    async def upload(self, path: str, content: bytes, content_type: str) -> None:
        """Upload `content` to `path` inside the configured bucket."""
        async with httpx.AsyncClient(timeout=_TIMEOUT_SECONDS) as client:
            response = await client.post(
                f"{self._base_url}/object/{self._bucket}/{path}",
                content=content,
                headers={**self._headers, "Content-Type": content_type},
            )
            response.raise_for_status()

    async def download(self, path: str) -> bytes:
        """Download the bytes stored at `path`.

        Raises
        ------
        NotFoundError
            If no object exists at `path`.
        """
        async with httpx.AsyncClient(timeout=_TIMEOUT_SECONDS) as client:
            url = f"{self._base_url}/object/{self._bucket}/{path}"
            response = await client.get(url, headers=self._headers)
            if response.status_code == httpx.codes.NOT_FOUND:
                raise NotFoundError("File not found.")
            response.raise_for_status()
            return response.content

    async def remove(self, paths: list[str]) -> None:
        """Delete the objects at `paths`, ignoring ones that no longer exist."""
        async with httpx.AsyncClient(timeout=_TIMEOUT_SECONDS) as client:
            response = await client.request(
                "DELETE",
                f"{self._base_url}/object/{self._bucket}",
                json={"prefixes": paths},
                headers=self._headers,
            )
            response.raise_for_status()
