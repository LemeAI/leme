from __future__ import annotations

from dataclasses import dataclass

import firebase_admin
from firebase_admin import auth as firebase_auth
from starlette.concurrency import run_in_threadpool


@dataclass(frozen=True, slots=True)
class VerifiedIdentity:
    """Identity extracted from a verified Firebase ID token.

    Attributes
    ----------
    uid : str
        Firebase UID of the authenticated caller.
    email : str or None
        Email address associated with the account, if any.
    """

    uid: str
    email: str | None


class FirebaseTokenVerifier:
    """Verifies Firebase ID tokens using the Firebase Admin SDK.

    Relies on Application Default Credentials, which Cloud Run provides
    automatically through the service's runtime service account, so no
    service-account key file is needed.
    """

    def __init__(self) -> None:
        try:
            firebase_admin.get_app()
        except ValueError:
            firebase_admin.initialize_app()

    async def verify(self, id_token: str) -> VerifiedIdentity:
        """Verify `id_token` and return the identity it asserts.

        Parameters
        ----------
        id_token : str
            Firebase ID token from the `Authorization: Bearer` header.

        Returns
        -------
        VerifiedIdentity
            The verified Firebase UID and email.

        Raises
        ------
        ValueError
            If the token is missing, malformed, expired, or otherwise
            fails verification.
        """
        decoded_token = await run_in_threadpool(firebase_auth.verify_id_token, id_token)
        return VerifiedIdentity(uid=decoded_token["uid"], email=decoded_token.get("email"))
