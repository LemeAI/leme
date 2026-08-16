from __future__ import annotations

from dataclasses import dataclass
from functools import lru_cache

from fastapi import Depends, Header, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy.ext.asyncio import AsyncSession

from app.application.ports import PaymentGatewayPort, StoragePort
from app.application.services.page_quota import PageQuotaService
from app.application.use_cases.billing import (
    CreateCheckoutSessionUseCase,
    CreatePortalSessionUseCase,
    HandleStripeWebhookUseCase,
)
from app.application.use_cases.contributions import ListContributionsUseCase, SubmitContributionUseCase
from app.application.use_cases.pages import GetPageContentUseCase, GetPageUseCase, ListMyPagesUseCase
from app.application.use_cases.profiles import GetMeUseCase
from app.application.use_cases.share_links import CreateShareLinkUseCase, ResolveShareLinkUseCase
from app.application.use_cases.uploads import CreateUploadUseCase
from app.domain.repositories import (
    ContributionRepository,
    HtmlPageRepository,
    ProfileRepository,
    ShareLinkRepository,
)
from app.infrastructure.auth.firebase_token_verifier import FirebaseTokenVerifier
from app.infrastructure.config import Settings, get_settings
from app.infrastructure.db.repositories.contribution_repository import SqlAlchemyContributionRepository
from app.infrastructure.db.repositories.html_page_repository import SqlAlchemyHtmlPageRepository
from app.infrastructure.db.repositories.profile_repository import SqlAlchemyProfileRepository
from app.infrastructure.db.repositories.share_link_repository import SqlAlchemyShareLinkRepository
from app.infrastructure.db.session import get_db_session
from app.infrastructure.payments.stripe_gateway import StripeGateway
from app.infrastructure.storage.supabase_storage import SupabaseStorage

_bearer_scheme = HTTPBearer(auto_error=False)


@dataclass(frozen=True, slots=True)
class AuthenticatedUser:
    """Identity of the caller resolved from a verified Firebase ID token.

    Attributes
    ----------
    uid : str
        Firebase UID of the caller.
    email : str or None
        Email address associated with the account, if any.
    """

    uid: str
    email: str | None


@lru_cache
def _token_verifier() -> FirebaseTokenVerifier:
    return FirebaseTokenVerifier()


@lru_cache
def _storage() -> StoragePort:
    return SupabaseStorage(get_settings())


@lru_cache
def _payment_gateway() -> PaymentGatewayPort:
    return StripeGateway(get_settings())


async def get_optional_user(
    credentials: HTTPAuthorizationCredentials | None = Depends(_bearer_scheme),
) -> AuthenticatedUser | None:
    """Resolve the caller's identity from a Bearer token, when one is present.

    Returns
    -------
    AuthenticatedUser or None
        `None` when no `Authorization` header was sent.

    Raises
    ------
    HTTPException
        401, if a token was sent but failed verification.
    """
    if credentials is None:
        return None
    try:
        identity = await _token_verifier().verify(credentials.credentials)
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired authentication token.",
        ) from exc
    return AuthenticatedUser(uid=identity.uid, email=identity.email)


async def get_current_user(
    user: AuthenticatedUser | None = Depends(get_optional_user),
) -> AuthenticatedUser:
    """Require an authenticated caller.

    Raises
    ------
    HTTPException
        401, if no valid Bearer token was sent.
    """
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Authentication required.")
    return user


async def get_anon_id(x_anon_id: str | None = Header(default=None)) -> str | None:
    """Read the client-generated anonymous identifier, when sent."""
    return x_anon_id


def get_page_repository(session: AsyncSession = Depends(get_db_session)) -> HtmlPageRepository:
    """Provide a request-scoped `HtmlPageRepository`."""
    return SqlAlchemyHtmlPageRepository(session)


def get_profile_repository(session: AsyncSession = Depends(get_db_session)) -> ProfileRepository:
    """Provide a request-scoped `ProfileRepository`."""
    return SqlAlchemyProfileRepository(session)


def get_share_link_repository(session: AsyncSession = Depends(get_db_session)) -> ShareLinkRepository:
    """Provide a request-scoped `ShareLinkRepository`."""
    return SqlAlchemyShareLinkRepository(session)


def get_contribution_repository(session: AsyncSession = Depends(get_db_session)) -> ContributionRepository:
    """Provide a request-scoped `ContributionRepository`."""
    return SqlAlchemyContributionRepository(session)


def get_storage() -> StoragePort:
    """Provide the shared `StoragePort` adapter."""
    return _storage()


def get_payment_gateway() -> PaymentGatewayPort:
    """Provide the shared `PaymentGatewayPort` adapter."""
    return _payment_gateway()


def get_page_quota_service(
    pages: HtmlPageRepository = Depends(get_page_repository),
    profiles: ProfileRepository = Depends(get_profile_repository),
) -> PageQuotaService:
    """Assemble `PageQuotaService` with request-scoped dependencies."""
    return PageQuotaService(pages, profiles)


def get_create_upload_use_case(
    pages: HtmlPageRepository = Depends(get_page_repository),
    quota: PageQuotaService = Depends(get_page_quota_service),
    storage: StoragePort = Depends(get_storage),
) -> CreateUploadUseCase:
    """Assemble `CreateUploadUseCase` with request-scoped dependencies."""
    return CreateUploadUseCase(pages, quota, storage)


def get_get_page_use_case(pages: HtmlPageRepository = Depends(get_page_repository)) -> GetPageUseCase:
    """Assemble `GetPageUseCase` with request-scoped dependencies."""
    return GetPageUseCase(pages)


def get_page_content_use_case(
    pages: HtmlPageRepository = Depends(get_page_repository),
    profiles: ProfileRepository = Depends(get_profile_repository),
    storage: StoragePort = Depends(get_storage),
    settings: Settings = Depends(get_settings),
) -> GetPageContentUseCase:
    """Assemble `GetPageContentUseCase` with request-scoped dependencies."""
    return GetPageContentUseCase(pages, profiles, storage, site_url=settings.site_url)


def get_list_my_pages_use_case(
    pages: HtmlPageRepository = Depends(get_page_repository),
) -> ListMyPagesUseCase:
    """Assemble `ListMyPagesUseCase` with request-scoped dependencies."""
    return ListMyPagesUseCase(pages)


def get_create_share_link_use_case(
    pages: HtmlPageRepository = Depends(get_page_repository),
    share_links: ShareLinkRepository = Depends(get_share_link_repository),
    settings: Settings = Depends(get_settings),
) -> CreateShareLinkUseCase:
    """Assemble `CreateShareLinkUseCase` with request-scoped dependencies."""
    return CreateShareLinkUseCase(pages, share_links, site_url=settings.site_url)


def get_resolve_share_link_use_case(
    pages: HtmlPageRepository = Depends(get_page_repository),
    share_links: ShareLinkRepository = Depends(get_share_link_repository),
) -> ResolveShareLinkUseCase:
    """Assemble `ResolveShareLinkUseCase` with request-scoped dependencies."""
    return ResolveShareLinkUseCase(pages, share_links)


def get_list_contributions_use_case(
    contributions: ContributionRepository = Depends(get_contribution_repository),
) -> ListContributionsUseCase:
    """Assemble `ListContributionsUseCase` with request-scoped dependencies."""
    return ListContributionsUseCase(contributions)


def get_submit_contribution_use_case(
    pages: HtmlPageRepository = Depends(get_page_repository),
    contributions: ContributionRepository = Depends(get_contribution_repository),
    quota: PageQuotaService = Depends(get_page_quota_service),
    storage: StoragePort = Depends(get_storage),
) -> SubmitContributionUseCase:
    """Assemble `SubmitContributionUseCase` with request-scoped dependencies."""
    return SubmitContributionUseCase(pages, contributions, quota, storage)


def get_me_use_case(
    pages: HtmlPageRepository = Depends(get_page_repository),
    profiles: ProfileRepository = Depends(get_profile_repository),
) -> GetMeUseCase:
    """Assemble `GetMeUseCase` with request-scoped dependencies."""
    return GetMeUseCase(pages, profiles)


def get_create_checkout_session_use_case(
    profiles: ProfileRepository = Depends(get_profile_repository),
    gateway: PaymentGatewayPort = Depends(get_payment_gateway),
    settings: Settings = Depends(get_settings),
) -> CreateCheckoutSessionUseCase:
    """Assemble `CreateCheckoutSessionUseCase` with request-scoped dependencies."""
    return CreateCheckoutSessionUseCase(profiles, gateway, frontend_url=settings.frontend_url)


def get_create_portal_session_use_case(
    profiles: ProfileRepository = Depends(get_profile_repository),
    gateway: PaymentGatewayPort = Depends(get_payment_gateway),
    settings: Settings = Depends(get_settings),
) -> CreatePortalSessionUseCase:
    """Assemble `CreatePortalSessionUseCase` with request-scoped dependencies."""
    return CreatePortalSessionUseCase(profiles, gateway, frontend_url=settings.frontend_url)


def get_handle_stripe_webhook_use_case(
    profiles: ProfileRepository = Depends(get_profile_repository),
    pages: HtmlPageRepository = Depends(get_page_repository),
    gateway: PaymentGatewayPort = Depends(get_payment_gateway),
    settings: Settings = Depends(get_settings),
) -> HandleStripeWebhookUseCase:
    """Assemble `HandleStripeWebhookUseCase` with request-scoped dependencies."""
    return HandleStripeWebhookUseCase(profiles, pages, gateway, webhook_secret=settings.stripe_webhook_secret)
