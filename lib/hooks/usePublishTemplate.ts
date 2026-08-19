"use client";

import { useState, useCallback } from "react";
import { publishTemplate, updateTemplate, deleteTemplate } from "@/lib/api";
import type { Template, TemplateCategory, ForkIconChoice } from "@/lib/types";

export interface PublishTemplateInput {
  source_page_id: string;
  title: string;
  description?: string;
  category: TemplateCategory;
  tags?: string[];
  icon?: ForkIconChoice;
}

interface UsePublishTemplateResult {
  publish: (input: PublishTemplateInput) => Promise<Template>;
  update: (id: string, input: Partial<PublishTemplateInput>) => Promise<Template>;
  remove: (id: string) => Promise<void>;
  publishing: boolean;
  updating: boolean;
  removing: boolean;
  error: Error | null;
}

/**
 * Publishes, updates or removes a template from a page.
 */
export function usePublishTemplate(): UsePublishTemplateResult {
  const [publishing, setPublishing] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const publish = useCallback(async (input: PublishTemplateInput): Promise<Template> => {
    setPublishing(true);
    setError(null);
    try {
      return await publishTemplate({
        source_page_id: input.source_page_id,
        title: input.title,
        description: input.description,
        category: input.category,
        tags: input.tags,
        icon_type: input.icon?.type,
        icon_value: input.icon?.value,
        icon_color: input.icon?.color,
      });
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Publish failed.");
      setError(error);
      throw error;
    } finally {
      setPublishing(false);
    }
  }, []);

  const update = useCallback(async (id: string, input: Partial<PublishTemplateInput>): Promise<Template> => {
    setUpdating(true);
    setError(null);
    try {
      return await updateTemplate(id, {
        title: input.title,
        description: input.description,
        category: input.category,
        tags: input.tags,
        icon_type: input.icon?.type,
        icon_value: input.icon?.value,
        icon_color: input.icon?.color,
      });
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Update failed.");
      setError(error);
      throw error;
    } finally {
      setUpdating(false);
    }
  }, []);

  const remove = useCallback(async (id: string): Promise<void> => {
    setRemoving(true);
    setError(null);
    try {
      await deleteTemplate(id);
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Delete failed.");
      setError(error);
      throw error;
    } finally {
      setRemoving(false);
    }
  }, []);

  return { publish, update, remove, publishing, updating, removing, error };
}
