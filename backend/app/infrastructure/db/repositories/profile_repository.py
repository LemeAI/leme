from __future__ import annotations

from datetime import datetime

from sqlalchemy import select, update
from sqlalchemy.dialects.postgresql import insert as pg_insert
from sqlalchemy.ext.asyncio import AsyncSession

from app.domain.entities import Profile
from app.domain.repositories import ProfileRepository
from app.infrastructure.db.models import ProfileModel


def _to_entity(model: ProfileModel) -> Profile:
    """Map a `ProfileModel` row to its `Profile` domain entity."""
    return Profile(
        id=model.id,
        plan=model.plan,
        created_at=model.created_at,
        stripe_customer_id=model.stripe_customer_id,
        stripe_subscription_id=model.stripe_subscription_id,
        stripe_price_id=model.stripe_price_id,
        current_period_end=model.current_period_end,
    )


class SqlAlchemyProfileRepository(ProfileRepository):
    """SQLAlchemy-backed implementation of `ProfileRepository`."""

    def __init__(self, session: AsyncSession) -> None:
        self._session = session

    async def get(self, user_id: str) -> Profile | None:
        """Fetch a profile by Firebase UID."""
        model = await self._session.get(ProfileModel, user_id)
        return _to_entity(model) if model is not None else None

    async def create_default(self, user_id: str) -> Profile:
        """Create a default free-plan profile, tolerating a concurrent insert."""
        stmt = (
            pg_insert(ProfileModel)
            .values(id=user_id, plan="free")
            .on_conflict_do_nothing(index_elements=[ProfileModel.id])
        )
        await self._session.execute(stmt)
        await self._session.commit()
        model = await self._session.get(ProfileModel, user_id)
        if model is None:
            raise RuntimeError(f"Profile {user_id} vanished right after being created.")
        return _to_entity(model)

    async def get_by_stripe_customer_id(self, customer_id: str) -> Profile | None:
        """Fetch the profile linked to a Stripe customer id."""
        stmt = select(ProfileModel).where(ProfileModel.stripe_customer_id == customer_id)
        result = await self._session.execute(stmt)
        model = result.scalars().first()
        return _to_entity(model) if model is not None else None

    async def set_stripe_customer_id(self, user_id: str, customer_id: str) -> None:
        """Attach a Stripe customer id to a profile, creating it if missing."""
        stmt = (
            pg_insert(ProfileModel)
            .values(id=user_id, stripe_customer_id=customer_id)
            .on_conflict_do_update(
                index_elements=[ProfileModel.id],
                set_={"stripe_customer_id": customer_id},
            )
        )
        await self._session.execute(stmt)
        await self._session.commit()

    async def upsert_subscription_state(
        self,
        *,
        user_id: str,
        plan: str,
        stripe_customer_id: str | None,
        stripe_subscription_id: str | None,
        stripe_price_id: str | None,
        current_period_end: datetime | None,
    ) -> None:
        """Create or update a profile's plan and subscription bookkeeping."""
        values = {
            "id": user_id,
            "plan": plan,
            "stripe_customer_id": stripe_customer_id,
            "stripe_subscription_id": stripe_subscription_id,
            "stripe_price_id": stripe_price_id,
            "current_period_end": current_period_end,
        }
        stmt = pg_insert(ProfileModel).values(**values).on_conflict_do_update(
            index_elements=[ProfileModel.id],
            set_={key: value for key, value in values.items() if key != "id"},
        )
        await self._session.execute(stmt)
        await self._session.commit()

    async def update_subscription_state_by_customer_id(
        self,
        *,
        customer_id: str,
        plan: str,
        stripe_subscription_id: str | None,
        stripe_price_id: str | None,
        current_period_end: datetime | None,
    ) -> None:
        """Update the plan and subscription bookkeeping for a known Stripe customer."""
        stmt = (
            update(ProfileModel)
            .where(ProfileModel.stripe_customer_id == customer_id)
            .values(
                plan=plan,
                stripe_subscription_id=stripe_subscription_id,
                stripe_price_id=stripe_price_id,
                current_period_end=current_period_end,
            )
        )
        await self._session.execute(stmt)
        await self._session.commit()
