# Checklist de Deploy — Leme

Use este checklist antes de colocar uma nova versão em produção.

## Infraestrutura

- [ ] Banco de dados Postgres provisionado (Supabase ou outro).
- [ ] Migrations aplicadas: `alembic upgrade head` no ambiente de destino.
- [ ] Bucket de storage configurado (Supabase Storage) ou `STORAGE_BACKEND=local` **apenas** em dev.
- [ ] Conta Stripe configurada com preços mensal e anual.
- [ ] Projeto Firebase Auth configurado.

## Backend (`leme-app-backend/`)

- [ ] `DATABASE_URL` aponta para a role `leme_backend` (não `postgres`).
- [ ] `STORAGE_BACKEND=supabase` em produção.
- [ ] `SUPABASE_URL` e `SUPABASE_SERVICE_ROLE_KEY` preenchidos.
- [ ] `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_PRICE_ID_MONTH`, `STRIPE_PRICE_ID_YEAR` preenchidos.
- [ ] `FRONTEND_URL` = URL de produção do frontend (ex: `https://leme.app`).
- [ ] `FRONTEND_URLS` inclui URLs fixas de preview/staging, se houver.
- [ ] `SITE_URL` = mesma URL pública do frontend.
- [ ] `ENVIRONMENT=production`.
- [ ] `RATE_LIMIT_BACKEND=firestore` em produção.
- [ ] Política de TTL configurada no Firestore (campo `expires_at`).
- [ ] Service account do Cloud Run com `roles/datastore.user`.
- [ ] `TRUSTED_PROXY_HOPS=1` (Cloud Run sem load balancer adicional).
- [ ] Stripe webhook aponta para `https://<backend>/billing/webhook`.

## Frontend (`leme/`)

- [ ] `NEXT_PUBLIC_API_URL` = URL pública do backend.
- [ ] `NEXT_PUBLIC_SITE_URL` = URL pública do frontend.
- [ ] `NEXT_PUBLIC_FIREBASE_*` preenchidos com valores do projeto Firebase.
- [ ] Domínio do frontend adicionado em Firebase Console → Authentication → Authorized domains.
- [ ] Build local passa: `npm run typecheck && npm run lint && npm run build`.
- [ ] Build de produção na Vercel não falha por falta de `NEXT_PUBLIC_API_URL`.

## Validação Pós-Deploy

- [ ] Login funciona.
- [ ] Upload de HTML funciona.
- [ ] Criação de share link funciona.
- [ ] Contribuição em página compartilhada funciona.
- [ ] Checkout Pro redireciona para Stripe.
- [ ] Webhook do Stripe processa eventos (ver logs).
- [ ] Rate-limit dispara logs de audit corretamente.
