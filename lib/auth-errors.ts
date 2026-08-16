import { FirebaseError } from "firebase/app";

const MESSAGES: Record<string, string> = {
  "auth/invalid-email": "That email address doesn't look valid.",
  "auth/user-disabled": "This account has been disabled.",
  "auth/user-not-found": "No account found with that email.",
  "auth/wrong-password": "Incorrect email or password.",
  "auth/invalid-credential": "Incorrect email or password.",
  "auth/email-already-in-use": "There's already an account with that email. Try signing in instead.",
  "auth/weak-password": "Choose a password with at least 6 characters.",
  "auth/too-many-requests": "Too many attempts. Wait a moment and try again.",
  "auth/network-request-failed": "Couldn't reach the server. Check your connection.",
  "auth/popup-blocked": "Your browser blocked the sign-in popup. Allow popups and try again.",
  "auth/unauthorized-domain":
    "This domain isn't authorized in Firebase. Add it under Authentication > Settings > Authorized domains.",
  "auth/operation-not-allowed":
    "This sign-in method is disabled. Enable it under Authentication > Sign-in method in the Firebase console.",
  "auth/account-exists-with-different-credential":
    "You already have an account with this email using a different sign-in method. Sign in that way first.",
};

/** Error codes that mean "the user changed their mind", not a failure worth showing. */
const SILENT_CODES = new Set([
  "auth/popup-closed-by-user",
  "auth/cancelled-popup-request",
  "auth/user-cancelled",
]);

export function isSilentAuthError(error: unknown): boolean {
  return error instanceof FirebaseError && SILENT_CODES.has(error.code);
}

/**
 * Turn a Firebase auth error into something worth showing a user. Raw
 * Firebase messages read like "Firebase: Error (auth/wrong-password)." —
 * accurate, but not an explanation.
 */
export function describeAuthError(error: unknown): string {
  if (error instanceof FirebaseError) {
    return MESSAGES[error.code] ?? "Couldn't complete sign-in. Please try again.";
  }
  return "Couldn't connect. Check your internet connection and try again.";
}
