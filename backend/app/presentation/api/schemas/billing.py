from __future__ import annotations

from typing import Literal

from pydantic import BaseModel

BillingInterval = Literal["month", "year"]


class BillingCheckoutRequest(BaseModel):
    """Body for starting a Stripe Checkout session."""

    interval: BillingInterval = "month"


class BillingCheckoutResponse(BaseModel):
    """Response containing the URL of a Stripe Checkout session."""

    url: str


class BillingPortalResponse(BaseModel):
    """Response containing the URL of a Stripe Billing Portal session."""

    url: str
