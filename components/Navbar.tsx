"use client";

import Link from "next/link";
import { signOut } from "firebase/auth";
import { getFirebaseAuth } from "@/lib/firebase";
import { useAuth } from "@/lib/auth";
import Logo from "@/components/Logo";

export default function Navbar() {
  const { user, loading } = useAuth();

  return (
    <header className="sticky top-0 z-10 h-16 border-b border-ink-100 bg-white/80 backdrop-blur">
      <nav className="mx-auto flex h-full max-w-5xl items-center justify-between px-4">
        <Link href="/">
          <Logo />
        </Link>

        <div className="flex items-center gap-5 text-sm">
          <Link href="/pricing" className="hidden text-ink-600 hover:text-ink-900 sm:inline">
            Plans
          </Link>
          {loading ? null : user ? (
            <>
              <Link href="/dashboard" className="text-ink-600 hover:text-ink-900">
                My files
              </Link>
              <button
                type="button"
                onClick={() => signOut(getFirebaseAuth())}
                className="rounded-full border border-ink-200 px-4 py-1.5 font-medium text-ink-700 transition-colors hover:border-ink-300 hover:bg-ink-50"
              >
                Sign out
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="rounded-full bg-brand-500 px-4 py-1.5 font-semibold text-white shadow-sm transition-colors hover:bg-brand-600"
            >
              Sign in
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
