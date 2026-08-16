from __future__ import annotations

import uuid
from datetime import UTC, datetime

from sqlalchemy import func, or_, select, text, update
from sqlalchemy.ext.asyncio import AsyncSession

from app.domain.entities import HtmlPage
from app.domain.repositories import HtmlPageRepository
from app.infrastructure.db.models import HtmlPageModel


def _to_entity(model: HtmlPageModel) -> HtmlPage:
    """Map a `HtmlPageModel` row to its `HtmlPage` domain entity."""
    return HtmlPage(
        id=model.id,
        user_id=model.user_id,
        anon_id=model.anon_id,
        title=model.title,
        description=model.description,
        file_path=model.file_path,
        views_count=model.views_count,
        created_at=model.created_at,
        expires_at=model.expires_at,
        expires_at_before_pro=model.expires_at_before_pro,
    )


class SqlAlchemyHtmlPageRepository(HtmlPageRepository):
    """SQLAlchemy-backed implementation of `HtmlPageRepository`."""

    def __init__(self, session: AsyncSession) -> None:
        self._session = session

    async def get(self, page_id: uuid.UUID) -> HtmlPage | None:
        """Fetch a page by id."""
        model = await self._session.get(HtmlPageModel, page_id)
        return _to_entity(model) if model is not None else None

    async def list_by_owner(self, *, user_id: str | None, anon_id: str | None) -> list[HtmlPage]:
        """List an owner's pages, newest first."""
        stmt = select(HtmlPageModel).order_by(HtmlPageModel.created_at.desc())
        stmt = (
            stmt.where(HtmlPageModel.user_id == user_id)
            if user_id
            else stmt.where(HtmlPageModel.anon_id == anon_id)
        )
        result = await self._session.execute(stmt)
        return [_to_entity(model) for model in result.scalars().all()]

    async def count_active(self, *, user_id: str | None, anon_id: str | None) -> int:
        """Count an owner's non-expired pages."""
        now = datetime.now(UTC)
        stmt = (
            select(func.count())
            .select_from(HtmlPageModel)
            .where(or_(HtmlPageModel.expires_at.is_(None), HtmlPageModel.expires_at > now))
        )
        stmt = (
            stmt.where(HtmlPageModel.user_id == user_id)
            if user_id
            else stmt.where(HtmlPageModel.anon_id == anon_id)
        )
        result = await self._session.execute(stmt)
        return result.scalar_one()

    async def create(
        self,
        *,
        user_id: str | None,
        anon_id: str | None,
        title: str,
        description: str | None,
        file_path: str,
        expires_at: datetime | None,
    ) -> HtmlPage:
        """Persist a new page row and return it with its generated id."""
        model = HtmlPageModel(
            user_id=user_id,
            anon_id=anon_id,
            title=title,
            description=description,
            file_path=file_path,
            expires_at=expires_at,
        )
        self._session.add(model)
        await self._session.commit()
        await self._session.refresh(model)
        return _to_entity(model)

    async def increment_views(self, page_id: uuid.UUID) -> int | None:
        """Atomically increment a page's view counter, returning the new value.

        The increment happens entirely in SQL. Reading the row into Python,
        adding one, and writing it back would lose counts whenever two
        viewers hit the same page concurrently.
        """
        stmt = (
            update(HtmlPageModel)
            .where(HtmlPageModel.id == page_id)
            .values(views_count=HtmlPageModel.views_count + 1)
            .returning(HtmlPageModel.views_count)
        )
        result = await self._session.execute(stmt)
        new_count = result.scalar_one_or_none()
        await self._session.commit()
        return new_count

    async def apply_pro_upgrade(self, user_id: str) -> None:
        """Invoke the `apply_pro_upgrade` Postgres function for `user_id`."""
        await self._session.execute(text("SELECT public.apply_pro_upgrade(:user_id)"), {"user_id": user_id})
        await self._session.commit()

    async def apply_pro_downgrade(self, user_id: str, fallback_days: int) -> None:
        """Invoke the `apply_pro_downgrade` Postgres function for `user_id`."""
        await self._session.execute(
            text("SELECT public.apply_pro_downgrade(:user_id, :fallback_days)"),
            {"user_id": user_id, "fallback_days": fallback_days},
        )
        await self._session.commit()
