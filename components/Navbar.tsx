"use client";

import Link from "next/link";
import { signOut } from "firebase/auth";
import { getFirebaseAuth } from "@/lib/firebase";
import { useAuth } from "@/lib/auth";
import Logo from "@/components/Logo";
import LanguageSwitch from "@/components/LanguageSwitch";
import type { Dictionary } from "@/lib/i18n/dictionaries/en";
import type { Locale } from "@/lib/i18n/config";

export default function Navbar({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const { user, loading } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-line-soft bg-black/80 backdrop-blur-[14px]">
      <nav className="wrap flex h-16 items-center justify-between gap-6">
        <Link href={`/${locale}`} className="rounded-md">
          <Logo />
        </Link>

        <div className="flex items-center gap-1 text-sm sm:gap-2">
          <Link
            href={`/${locale}/pricing`}
            className="link-nav hidden rounded-md px-2 py-1.5 sm:inline"
          >
            {dict.nav.plans}
          </Link>
          <Link
            href={`/${locale}/blog`}
            className="link-nav hidden rounded-md px-2 py-1.5 sm:inline"
          >
            {dict.nav.blog}
          </Link>
          <Link
            href={`/${locale}/templates`}
            className="link-nav hidden rounded-md px-2 py-1.5 sm:inline"
          >
            {dict.nav.templates}
          </Link>
          <LanguageSwitch currentLocale={locale} />
          {loading ? null : user ? (
            <>
              <Link
                href={`/${locale}/dashboard`}
                className="link-nav rounded-md px-2 py-1.5"
              >
                {dict.nav.myFiles}
              </Link>
              <button
                type="button"
                onClick={() => signOut(getFirebaseAuth())}
                className="btn btn-ghost ml-1 py-2 text-sm"
              >
                {dict.nav.signOut}
              </button>
            </>
          ) : (
            <Link href={`/${locale}/login`} className="btn btn-primary ml-1 py-2 text-sm">
              {dict.nav.signIn}
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
