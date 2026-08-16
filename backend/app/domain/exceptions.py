from __future__ import annotations


class DomainError(Exception):
    """Base class for errors raised by the domain and application layers."""


class NotFoundError(DomainError):
    """Raised when a requested entity does not exist."""


class PermissionDeniedError(DomainError):
    """Raised when the caller is not allowed to act on an entity."""


class ValidationError(DomainError):
    """Raised when input fails a domain-level business rule."""


class PlanLimitExceededError(DomainError):
    """Raised when an operation would exceed the caller's plan limits."""


class ExpiredError(DomainError):
    """Raised when acting on an entity that has passed its expiration."""
