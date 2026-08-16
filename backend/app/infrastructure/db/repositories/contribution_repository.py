from __future__ import annotations

import uuid

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.domain.entities import Contribution
from app.domain.repositories import ContributionRepository
from app.infrastructure.db.models import ContributionModel


def _to_entity(model: ContributionModel) -> Contribution:
    """Map a `ContributionModel` row to its `Contribution` domain entity."""
    return Contribution(
        id=model.id,
        page_id=model.page_id,
        user_id=model.user_id,
        author_name=model.author_name,
        content=model.content,
        type=model.type,
        fork_page_id=model.fork_page_id,
        created_at=model.created_at,
    )


class SqlAlchemyContributionRepository(ContributionRepository):
    """SQLAlchemy-backed implementation of `ContributionRepository`."""

    def __init__(self, session: AsyncSession) -> None:
        self._session = session

    async def list_for_page(self, page_id: uuid.UUID) -> list[Contribution]:
        """List contributions on a page, newest first."""
        stmt = (
            select(ContributionModel)
            .where(ContributionModel.page_id == page_id)
            .order_by(ContributionModel.created_at.desc())
        )
        result = await self._session.execute(stmt)
        return [_to_entity(model) for model in result.scalars().all()]

    async def create(
        self,
        *,
        page_id: uuid.UUID,
        user_id: str | None,
        author_name: str,
        content: str,
        type_: str,
        fork_page_id: uuid.UUID | None,
    ) -> Contribution:
        """Persist a new contribution row and return it with its generated id."""
        model = ContributionModel(
            page_id=page_id,
            user_id=user_id,
            author_name=author_name,
            content=content,
            type=type_,
            fork_page_id=fork_page_id,
        )
        self._session.add(model)
        await self._session.commit()
        await self._session.refresh(model)
        return _to_entity(model)
