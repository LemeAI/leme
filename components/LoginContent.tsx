"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  getRedirectResult,
  sendSignInLinkToEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getFirebaseAuth } from "@/lib/firebase";
import { EMAIL_LINK_STORAGE_KEY, useAuth } from "@/lib/auth";
import { describeAuthError } from "@/lib/auth-errors";
import GoogleSignInButton from "@/components/GoogleSignInButton";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries/en";

type Mode = "magic-link" | "password";
type PasswordAction = "sign-in" | "sign-up";

type LoginContentProps = {
  locale: Locale;
  dict: Dictionary;
};

export default function LoginContent({ locale, dict }: LoginContentProps) {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const l = dict.login;
  const a = dict.auth;

  const [mode, setMode] = useState<Mode>("magic-link");
  const [passwordAction, setPasswordAction] = useState<PasswordAction>("sign-in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function completeRedirect() {
      try {
        const result = await getRedirectResult(getFirebaseAuth());
        if (result?.user) {
          router.replace(`/${locale}/dashboard`);
        }
      } catch (err) {
        setError(describeAuthError(err));
      }
    }

    void completeRedirect();
  }, [router, locale]);

  useEffect(() => {
    if (!authLoading && user) {
      router.replace(`/${locale}/dashboard`);
    }
  }, [authLoading, user, router, locale]);

  async function handleMagicLink(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      await sendSignInLinkToEmail(getFirebaseAuth(), email, {
        url: `${window.location.origin}/${locale}/auth/callback`,
        handleCodeInApp: true,
      });
      window.localStorage.setItem(EMAIL_LINK_STORAGE_KEY, email);
      setMessage(l.magicLinkSent);
    } catch (err) {
      setError(describeAuthError(err));
    } finally {
      setLoading(false);
    }
  }

  async function handlePasswordAuth(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      if (passwordAction === "sign-up") {
        await createUserWithEmailAndPassword(getFirebaseAuth(), email, password);
      } else {
        await signInWithEmailAndPassword(getFirebaseAuth(), email, password);
      }
      router.push(`/${locale}/dashboard`);
    } catch (err) {
      setError(describeAuthError(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto flex max-w-sm flex-col gap-7 px-5 py-20 sm:px-8">
      <div>
        <h1 className="title-page">{l.title}</h1>
        <p className="mt-3 text-[15px] text-mute">{l.subtitle}</p>
      </div>

      <GoogleSignInButton
        label={l.googleSignIn}
        loadingLabel={l.googleSignInLoading}
        locale={locale}
        onError={setError}
        disabled={loading}
      />

      <div className="flex items-center gap-3">
        <span className="h-px flex-1 bg-line-soft" />
        <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-mute-dim">
          {l.or}
        </span>
        <span className="h-px flex-1 bg-line-soft" />
      </div>

      <div className="segmented">
        <button
          type="button"
          onClick={() => setMode("magic-link")}
          className={`segmented-item ${
            mode === "magic-link" ? "segmented-item-on" : "segmented-item-off"
          }`}
        >
          {l.magicLink}
        </button>
        <button
          type="button"
          onClick={() => setMode("password")}
          className={`segmented-item ${
            mode === "password" ? "segmented-item-on" : "segmented-item-off"
          }`}
        >
          {l.emailAndPassword}
        </button>
      </div>

      {mode === "magic-link" ? (
        <form onSubmit={handleMagicLink} className="flex flex-col gap-4">
          <label className="field-label">
            {l.emailLabel}
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={l.emailPlaceholder}
              className="field-input"
            />
          </label>
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full justify-center disabled:opacity-50"
          >
            {loading ? l.sending : l.sendMagicLink}
          </button>
        </form>
      ) : (
        <form onSubmit={handlePasswordAuth} className="flex flex-col gap-4">
          <label className="field-label">
            {l.emailLabel}
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={l.emailPlaceholder}
              className="field-input"
            />
          </label>
          <label className="field-label">
            {l.passwordLabel}
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={l.passwordPlaceholder}
              className="field-input"
            />
          </label>
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full justify-center disabled:opacity-50"
          >
            {loading
              ? l.pleaseWait
              : passwordAction === "sign-in"
              ? l.signIn
              : l.createAccount}
          </button>
          <button
            type="button"
            onClick={() => setPasswordAction(passwordAction === "sign-in" ? "sign-up" : "sign-in")}
            className="rounded text-xs text-mute transition-colors hover:text-white"
          >
            {passwordAction === "sign-in" ? l.noAccount : l.hasAccount}
          </button>
        </form>
      )}

      {message && <p className="alert alert-success">{message}</p>}
      {error && <p className="alert alert-error">{error}</p>}
    </div>
  );
}
