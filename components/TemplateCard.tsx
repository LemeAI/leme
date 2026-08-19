"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { useProfile } from "@/lib/hooks/useProfile";
import { useCloneTemplate } from "@/lib/hooks/useCloneTemplate";
import { getTemplateContentUrl } from "@/lib/api-url";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries/en";
import type { Template } from "@/lib/types";

interface TemplateCardProps {
  template: Template;
  locale: Locale;
  dict: Dictionary;
}

export default function TemplateCard({ template, locale, dict }: TemplateCardProps) {
  const router = useRouter();
  const { user } = useAuth();
  const { data: profileData } = useProfile();
  const { clone, cloning } = useCloneTemplate();

  const isPro = profileData?.profile.plan === "pro";
  const canClone = Boolean(user && isPro);

  const handleClone = async () => {
    if (!user) {
      // Defer to the caller's CTA link.
      return;
    }
    const page = await clone(template.id);
    if (page) {
      router.push(`/${locale}/p/${page.id}`);
    }
  };

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-line-soft bg-surface transition-colors hover:border-line">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-surface-elevated to-surface">
        <iframe
          src={getTemplateContentUrl(template.id)}
          title={template.title}
          loading="lazy"
          sandbox="allow-scripts allow-forms allow-popups allow-modals"
          className="pointer-events-none h-[200%] w-[200%] origin-top-left scale-50 select-none"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-medium text-white">{template.title}</h3>
          {template.is_official && (
            <span className="shrink-0 rounded-full bg-brand/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-brand">
              {dict.templates?.officialBadge ?? "Official"}
            </span>
          )}
        </div>

        {template.description && (
          <p className="line-clamp-2 text-sm text-mute">{template.description}</p>
        )}

        <div className="flex flex-wrap gap-1.5">
          {template.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-white/5 px-2 py-0.5 text-xs text-mute-dim"
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 pt-3">
          <span className="text-xs text-mute-dim">
            {template.clones_count} {dict.templates?.clonesCount ?? "clones"}
          </span>

          {canClone ? (
            <button
              type="button"
              onClick={handleClone}
              disabled={cloning}
              className="btn btn-primary text-xs disabled:opacity-50"
            >
              {cloning
                ? dict.templates?.cloning ?? "Cloning..."
                : dict.templates?.useTemplate ?? "Use template"}
            </button>
          ) : (
            <Link
              href={`/${locale}/pricing`}
              className="btn btn-outline text-xs"
            >
              {dict.templates?.upgradeToClone ?? "Upgrade to clone"}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
