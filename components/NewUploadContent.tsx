"use client";

import UploadLanding from "@/components/UploadLanding";
import { isExpired } from "@/lib/plans";
import { useAuth } from "@/lib/auth";
import { useMyPages } from "@/lib/hooks/useMyPages";
import { useProfile } from "@/lib/hooks/useProfile";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries/en";

type NewUploadContentProps = {
  locale: Locale;
  dict: Dictionary;
};

export default function NewUploadContent({ locale, dict }: NewUploadContentProps) {
  const { user } = useAuth();
  const { pages } = useMyPages();
  const { data: profileData } = useProfile();

  const savedPages = pages.filter((page) => !isExpired(page.expires_at));
  const effectivePlan = user ? profileData?.profile.plan ?? "free" : "anonymous";

  return <UploadLanding savedPages={savedPages} plan={effectivePlan} locale={locale} dict={dict} />;
}
