// Tipos TypeScript que espelham as respostas da API do backend (ver
// backend/app/presentation/api/schemas/**).

export type ContributionType = "comment" | "suggestion" | "fork";

export type HtmlPage = {
  id: string;
  user_id: string | null;
  title: string;
  description: string | null;
  file_path: string;
  views_count: number;
  created_at: string;
  expires_at: string | null;
  anon_id: string | null;
  expires_at_before_pro: string | null;
  allow_contributions: boolean;
  hide_branding: boolean;
};

export type BillingInterval = "month" | "year";

export type Plan = "free" | "pro";

// Espelha ProfileRead (backend/app/presentation/api/schemas/me.py) — os
// campos internos do Stripe (customer/subscription/price id) nunca são
// expostos ao frontend.
export type Profile = {
  id: string;
  plan: Plan;
  created_at: string;
  current_period_end: string | null;
  cancel_at_period_end: boolean;
  interval: BillingInterval | null;
};

export interface SubscriptionDetailsResponse {
  status: string;
  interval: BillingInterval | null;
  current_period_end: string | null;
  cancel_at_period_end: boolean;
}

export interface InvoiceRead {
  id: string;
  number: string | null;
  amount_due: number;
  currency: string;
  status: string | null;
  created: string | null;
  hosted_invoice_url: string | null;
  invoice_pdf: string | null;
}

export interface InvoicesResponse {
  invoices: InvoiceRead[];
}

export type ShareLink = {
  id: string;
  page_id: string;
  token: string;
  created_by: string | null;
  expires_at: string | null;
  created_at: string;
};

export type Contribution = {
  id: string;
  page_id: string;
  user_id: string | null;
  author_name: string;
  content: string;
  type: ContributionType;
  fork_page_id: string | null;
  created_at: string;
};

// -- Tipos das respostas da API do backend (FastAPI/Pydantic, snake_case) --

export interface UploadResponse {
  page: HtmlPage;
  anon_id: string | null;
}

export interface ShareResponse {
  share_link: ShareLink;
  url: string;
}

export interface PageByTokenResponse {
  page: Pick<
    HtmlPage,
    | "id"
    | "title"
    | "description"
    | "file_path"
    | "views_count"
    | "created_at"
    | "allow_contributions"
    | "hide_branding"
  >;
  share_link: Pick<ShareLink, "id" | "token" | "expires_at">;
}

export interface MeResponse {
  profile: Profile;
  active_pages_count: number;
  max_active_pages: number | null;
}
