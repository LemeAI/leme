"use client";

import { useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirebaseAuth } from "@/lib/firebase";
import { describeAuthError, isSilentAuthError } from "@/lib/auth-errors";

// O Google não distingue "entrar" de "cadastrar": o mesmo fluxo cria a
// conta na primeira vez e autentica nas seguintes. O backend também não
// precisa saber de nada — o ID token vem no mesmo formato, com o mesmo uid,
// independente do provedor (ver FirebaseTokenVerifier).
//
// Usamos signInWithPopup em vez de signInWithRedirect porque o fluxo de
// redirect do Firebase Auth depende do domínio de auth servir __/firebase/init.json,
// o que falha em alguns ambientes (especialmente após a migração para Firebase v11)
// e deixa o usuário parado na tela de login. O popup é menos afetado por
// bloqueadores e pelo 404.
export default function GoogleSignInButton({
  label,
  loadingLabel,
  locale,
  onError,
  disabled = false,
}: {
  label: string;
  loadingLabel: string;
  locale: string;
  onError: (message: string | null) => void;
  disabled?: boolean;
}) {
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);
    onError(null);

    try {
      await signInWithPopup(getFirebaseAuth(), new GoogleAuthProvider());
      // Em produção o onAuthStateChanged às vezes não dispara a tempo de
      // redirecionar antes que o usuário interaja com a página. Forçamos um
      // redirect full-page aqui; o provider também cuida disso via useAuth.
      // eslint-disable-next-line @next/next/no-location-assign-relative-destination
      window.location.href = `/${locale}/dashboard`;
    } catch (err) {
      if (!isSilentAuthError(err)) {
        onError(describeAuthError(err));
      }
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled || loading}
      className="btn btn-ghost w-full justify-center gap-3 bg-white/5 disabled:opacity-50"
    >
      <GoogleLogo />
      {loading ? loadingLabel : label}
    </button>
  );
}

function GoogleLogo() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 18 18" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.62Z"
      />
      <path
        fill="#34A853"
        d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.8.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.96v2.33A9 9 0 0 0 9 18Z"
      />
      <path
        fill="#FBBC05"
        d="M3.97 10.72a5.4 5.4 0 0 1 0-3.44V4.95H.96a9 9 0 0 0 0 8.1l3.01-2.33Z"
      />
      <path
        fill="#EA4335"
        d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .96 4.95l3.01 2.33C4.68 5.16 6.66 3.58 9 3.58Z"
      />
    </svg>
  );
}
