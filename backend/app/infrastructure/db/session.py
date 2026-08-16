from __future__ import annotations

from collections.abc import AsyncIterator

from sqlalchemy.ext.asyncio import AsyncEngine, AsyncSession, async_sessionmaker, create_async_engine
from sqlalchemy.orm import DeclarativeBase

from app.infrastructure.config import get_settings


class Base(DeclarativeBase):
    """Declarative base class shared by every SQLAlchemy model."""


def _build_engine() -> AsyncEngine:
    """Create the process-wide async SQLAlchemy engine.

    Returns
    -------
    AsyncEngine
        An engine pooling connections to the Supabase Postgres database
        through the asyncpg driver.
    """
    settings = get_settings()
    return create_async_engine(
        settings.async_database_url,
        pool_pre_ping=True,
        pool_size=10,
        max_overflow=5,
        pool_recycle=1800,
    )


engine: AsyncEngine = _build_engine()
SessionLocal = async_sessionmaker(engine, expire_on_commit=False)


async def get_db_session() -> AsyncIterator[AsyncSession]:
    """Yield a request-scoped AsyncSession, closed on completion.

    Yields
    ------
    AsyncSession
        A database session bound to the shared engine.
    """
    async with SessionLocal() as session:
        yield session
