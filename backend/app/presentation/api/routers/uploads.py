from __future__ import annotations

from fastapi import APIRouter, Depends, File, Form, HTTPException, Request, UploadFile, status

from app.application.use_cases.uploads import CreateUploadUseCase
from app.domain.constraints import (
    MAX_DESCRIPTION_LENGTH,
    MAX_TITLE_LENGTH,
    MAX_UPLOAD_SIZE_BYTES,
)
from app.presentation.api.deps import (
    AuthenticatedUser,
    get_anon_id,
    get_create_upload_use_case,
    get_optional_user,
)
from app.presentation.api.rate_limit import limiter
from app.presentation.api.schemas.pages import HtmlPageRead, UploadResponse

router = APIRouter(prefix="/uploads", tags=["uploads"])


@router.post("", response_model=UploadResponse, status_code=status.HTTP_201_CREATED)
@limiter.limit("20/hour")
async def create_upload(
    request: Request,
    file: UploadFile = File(...),
    title: str = Form(..., max_length=MAX_TITLE_LENGTH),
    description: str | None = Form(default=None, max_length=MAX_DESCRIPTION_LENGTH),
    user: AuthenticatedUser | None = Depends(get_optional_user),
    anon_id: str | None = Depends(get_anon_id),
    use_case: CreateUploadUseCase = Depends(get_create_upload_use_case),
) -> UploadResponse:
    """Store an uploaded `.html` file and register it as a new page.

    Parameters
    ----------
    request : Request
        Required by the rate limiter.
    file : UploadFile
        The HTML file to store, up to 2MB.
    title : str
        Display title for the page.
    description : str, optional
        Free-text description of the page.
    user : AuthenticatedUser, optional
        Authenticated caller, when a valid Firebase ID token was sent.
    anon_id : str, optional
        Client-generated identifier used to track uploads without an
        account.
    use_case : CreateUploadUseCase
        Injected use case.

    Returns
    -------
    UploadResponse
        The newly created page.

    Raises
    ------
    HTTPException
        413, if the part is larger than the upload limit. Checked against
        the declared size before reading, so an oversized file is never
        pulled into memory just to be rejected.
    """
    if file.size is not None and file.size > MAX_UPLOAD_SIZE_BYTES:
        raise HTTPException(
            status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            detail="File exceeds the 2MB limit.",
        )

    content = await file.read()
    result = await use_case.execute(
        user_id=user.uid if user else None,
        anon_id=anon_id,
        title=title,
        description=description,
        filename=file.filename or "",
        content_type=file.content_type or "application/octet-stream",
        content=content,
    )
    return UploadResponse(page=HtmlPageRead.model_validate(result.page), anon_id=result.anon_id)
