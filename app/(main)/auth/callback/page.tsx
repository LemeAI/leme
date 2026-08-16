"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { getFirebaseAuth } from "@/lib/firebase";
import { EMAIL_LINK_STORAGE_KEY } from "@/lib/auth";

export default function AuthCallbackPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function completeSignIn() {
      if (!isSignInWithEmailLink(getFirebaseAuth(), window.location.href)) {
        router.replace("/auth/auth-code-error");
        return;
      }

      let email = window.localStorage.getItem(EMAIL_LINK_STORAGE_KEY);
      if (!email) {
        email = window.prompt("Confirm your email to finish signing in") ?? "";
      }
      if (!email) {
        router.replace("/auth/auth-code-error");
        return;
      }

      try {
        await signInWithEmailLink(getFirebaseAuth(), email, window.location.href);
        window.localStorage.removeItem(EMAIL_LINK_STORAGE_KEY);
        router.replace("/dashboard");
      } catch {
        setError("This link may have expired or already been used.");
      }
    }

    void completeSignIn();
  }, [router]);

  return (
    <div className="mx-auto flex max-w-sm flex-col gap-4 px-4 py-16 text-center">
      <p className="text-sm text-ink-500">{error ?? "Confirming your sign-in..."}</p>
    </div>
  );
}
