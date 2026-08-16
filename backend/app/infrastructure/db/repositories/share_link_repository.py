from __future__ import annotations

import uuid
from datetime import datetime

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.domain.entities import ShareLink
from app.domain.repositories import ShareLinkRepository
from app.infrastructure.db.models import ShareLinkModel


def _to_entity(model: ShareLinkModel) -> ShareLink:
    """Map a `ShareLinkModel` row to its `ShareLink` domain entity."""
    return ShareLink(
        id=model.id,
        page_id=model.page_id,
        token=model.token,
        created_by=model.created_by,
        expires_at=model.expires_at,
        created_at=model.created_at,
    )


class SqlAlchemyShareLinkRepository(ShareLinkRepository):
    """SQLAlchemy-backed implementation of `ShareLinkRepository`."""

    def __init__(self, session: AsyncSession) -> None:
        self._session = session

    async def get_by_token(self, token: str) -> ShareLink | None:
        """Fetch a share link by its token."""
        stmt = select(ShareLinkModel).where(ShareLinkModel.token == token)
        result = await self._session.execute(stmt)
        model = result.scalars().first()
        return _to_entity(model) if model is not None else None

    async def get_canonical_for_page(self, page_id: uuid.UUID) -> ShareLink | None:
        """Fetch a page's oldest share link."""
        stmt = (
            select(ShareLinkModel)
            .where(ShareLinkModel.page_id == page_id)
            .order_by(ShareLinkModel.created_at.asc())
            .limit(1)
        )
        result = await self._session.execute(stmt)
        model = result.scalars().first()
        return _to_entity(model) if model is not None else None

    async def create(
        self,
        *,
        page_id: uuid.UUID,
        token: str,
        created_by: str | None,
        expires_at: datetime | None,
    ) -> ShareLink:
        """Persist a new share link row and return it with its generated id."""
        model = ShareLinkModel(page_id=page_id, token=token, created_by=created_by, expires_at=expires_at)
        self._session.add(model)
        await self._session.commit()
        await self._session.refresh(model)
        return _to_entity(model)
