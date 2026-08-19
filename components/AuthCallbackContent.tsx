"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { getFirebaseAuth } from "@/lib/firebase";
import { EMAIL_LINK_STORAGE_KEY } from "@/lib/auth";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries/en";

type AuthCallbackContentProps = {
  locale: Locale;
  dict: Dictionary;
};

export default function AuthCallbackContent({ locale, dict }: AuthCallbackContentProps) {
  const router = useRouter();
  const a = dict.auth;
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function completeSignIn() {
      if (!isSignInWithEmailLink(getFirebaseAuth(), window.location.href)) {
        router.replace(`/${locale}/auth/auth-code-error`);
        return;
      }

      let email = window.localStorage.getItem(EMAIL_LINK_STORAGE_KEY);
      if (!email) {
        email = window.prompt(a.callbackEmailPrompt) ?? "";
      }
      if (!email) {
        router.replace(`/${locale}/auth/auth-code-error`);
        return;
      }

      try {
        await signInWithEmailLink(getFirebaseAuth(), email, window.location.href);
        window.localStorage.removeItem(EMAIL_LINK_STORAGE_KEY);
        router.replace(`/${locale}/dashboard`);
      } catch {
        setError(a.callbackError);
      }
    }

    void completeSignIn();
  }, [router, locale, a]);

  return (
    <div className="mx-auto flex max-w-sm flex-col gap-4 px-5 py-24 text-center sm:px-8">
      {error ? (
        <p className="alert alert-error">{error}</p>
      ) : (
        <p className="text-[15px] text-mute">{a.callbackConfirming}</p>
      )}
    </div>
  );
}
