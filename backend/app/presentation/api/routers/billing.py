from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException, Request, status

from app.application.use_cases.billing import (
    CreateCheckoutSessionUseCase,
    CreatePortalSessionUseCase,
    HandleStripeWebhookUseCase,
)
from app.infrastructure.config import Settings, get_settings
from app.presentation.api.deps import (
    AuthenticatedUser,
    get_create_checkout_session_use_case,
    get_create_portal_session_use_case,
    get_current_user,
    get_handle_stripe_webhook_use_case,
)
from app.presentation.api.schemas.billing import (
    BillingCheckoutRequest,
    BillingCheckoutResponse,
    BillingPortalResponse,
)

router = APIRouter(prefix="/billing", tags=["billing"])


@router.post("/checkout", response_model=BillingCheckoutResponse)
async def create_checkout_session(
    payload: BillingCheckoutRequest,
    user: AuthenticatedUser = Depends(get_current_user),
    use_case: CreateCheckoutSessionUseCase = Depends(get_create_checkout_session_use_case),
    settings: Settings = Depends(get_settings),
) -> BillingCheckoutResponse:
    """Create a Stripe Checkout session to start, or renew, a Pro subscription."""
    price_id = (
        settings.stripe_price_id_year if payload.interval == "year" else settings.stripe_price_id_month
    )
    url = await use_case.execute(user_id=user.uid, email=user.email, price_id=price_id)
    return BillingCheckoutResponse(url=url)


@router.post("/portal", response_model=BillingPortalResponse)
async def create_billing_portal_session(
    user: AuthenticatedUser = Depends(get_current_user),
    use_case: CreatePortalSessionUseCase = Depends(get_create_portal_session_use_case),
) -> BillingPortalResponse:
    """Create a Stripe Billing Portal session for an existing subscriber."""
    url = await use_case.execute(user.uid)
    return BillingPortalResponse(url=url)


@router.post("/webhook", include_in_schema=False)
async def stripe_webhook(
    request: Request,
    use_case: HandleStripeWebhookUseCase = Depends(get_handle_stripe_webhook_use_case),
) -> dict[str, bool]:
    """Verify and apply a Stripe subscription lifecycle event."""
    signature = request.headers.get("stripe-signature")
    if not signature:
        raise HTTPException(status.HTTP_400_BAD_REQUEST, "Missing webhook signature.")

    payload = await request.body()
    await use_case.execute(payload=payload, signature=signature)
    return {"received": True}
