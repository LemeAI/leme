from __future__ import annotations

from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Runtime configuration for the Leme backend, sourced from the environment.

    Attributes
    ----------
    supabase_db_url : str
        Direct Postgres connection string for the Supabase-hosted database.
    supabase_url : str
        Base URL of the Supabase project, used to reach the Storage REST API.
    supabase_service_role_key : str
        Service-role key used exclusively for Supabase Storage requests.
    storage_bucket : str
        Name of the Supabase Storage bucket holding uploaded HTML files.
    stripe_secret_key : str
        Secret API key for the Stripe account.
    stripe_webhook_secret : str
        Signing secret used to verify incoming Stripe webhook requests.
    stripe_price_id_month : str
        Stripe Price ID for the monthly Pro subscription.
    stripe_price_id_year : str
        Stripe Price ID for the yearly Pro subscription.
    frontend_url : str
        Origin of the Next.js frontend, used for CORS and Stripe redirect
        URLs.
    site_url : str
        Public site URL used to build share links.
    environment : str
        Deployment environment name, e.g. "development" or "production".
    rate_limit_storage_uri : str
        Backing store for rate-limit counters. The default, "memory://",
        keeps counters per process, which means they reset on cold start
        and are not shared across Cloud Run instances — usable in
        development, but effectively no limit in production. Point this at
        a Redis instance (e.g. "redis://10.0.0.3:6379") for a real limit.
    trusted_proxy_hops : int
        Number of reverse proxies in front of the app. The client IP is
        read from X-Forwarded-For counting this many entries in from the
        right, so client-supplied values on the left cannot spoof it.
        Cloud Run without a load balancer is 1.
    max_request_bytes : int
        Hard ceiling on request body size, rejected before the body is
        parsed. Sits above the per-file upload limit to leave room for
        multipart and JSON encoding overhead.
    """

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    supabase_db_url: str
    supabase_url: str
    supabase_service_role_key: str
    storage_bucket: str = "html-files"

    stripe_secret_key: str
    stripe_webhook_secret: str
    stripe_price_id_month: str
    stripe_price_id_year: str

    frontend_url: str
    site_url: str
    environment: str = "production"

    rate_limit_storage_uri: str = "memory://"
    trusted_proxy_hops: int = 1
    max_request_bytes: int = 8 * 1024 * 1024

    @property
    def async_database_url(self) -> str:
        """Return `supabase_db_url` rewritten for the asyncpg driver.

        Returns
        -------
        str
            A connection string using the `postgresql+asyncpg://` scheme,
            regardless of whether `postgres://` or `postgresql://` was
            supplied.
        """
        url = self.supabase_db_url
        for prefix in ("postgresql://", "postgres://"):
            if url.startswith(prefix):
                return "postgresql+asyncpg://" + url[len(prefix) :]
        return url

    @property
    def cors_origins(self) -> list[str]:
        """Return the list of origins allowed to call this API.

        Returns
        -------
        list of str
            The configured frontend origin, plus the local development
            origin when `environment` is not "production".
        """
        origins = [self.frontend_url]
        if self.environment != "production":
            origins.append("http://localhost:3000")
        return origins


@lru_cache
def get_settings() -> Settings:
    """Return a process-wide cached Settings instance.

    Returns
    -------
    Settings
        The settings instance, constructed once per process.
    """
    return Settings()
