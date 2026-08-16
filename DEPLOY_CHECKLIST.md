# Checklist de Deploy — Leme

Use este checklist antes de colocar uma nova versão em produção.

## Infraestrutura

- [ ] Banco de dados Postgres provisionado (Supabase ou outro).
- [ ] Migrations aplicadas: `alembic upgrade head` no ambiente de destino.
- [ ] Bucket de storage configurado (Supabase Storage) ou `STORAGE_BACKEND=local` **apenas** em dev.
- [ ] Conta Stripe configurada com preços mensal e anual.
- [ ] Projeto Firebase Auth configurado.

## Backend (`leme-app-backend/` na Vercel)

- [ ] `SERVERLESS=true`.
- [ ] `ENVIRONMENT=production`.
- [ ] `DATABASE_URL` aponta para o **Transaction pooler** do Supabase (porta **6543**), não para a conexão direta.
- [ ] `STORAGE_BACKEND=supabase` em produção.
- [ ] `SUPABASE_URL` e `SUPABASE_SERVICE_ROLE_KEY` preenchidos.
- [ ] `FIREBASE_SERVICE_ACCOUNT_JSON` preenchido com a chave de serviço do Firebase em uma única linha (Vercel não tem ADC).
- [ ] `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_PRICE_ID_MONTH`, `STRIPE_PRICE_ID_YEAR` preenchidos.
- [ ] `FRONTEND_URL` = URL de produção do frontend (ex: `https://leme.app`).
- [ ] `FRONTEND_URLS` inclui URLs fixas de preview/staging da Vercel, se houver.
- [ ] `SITE_URL` = mesma URL pública do frontend.
- [ ] `RATE_LIMIT_BACKEND=firestore` em produção.
- [ ] Política de TTL configurada no Firestore (campo `expires_at`).
- [ ] `TRUSTED_PROXY_HOPS=1`.
- [ ] `MAX_REQUEST_BYTES` ajustado ao plano Vercel (ex: `4000000` no Hobby).
- [ ] Stripe webhook aponta para `https://<backend>.vercel.app/billing/webhook`.

## Frontend (`leme/` na Vercel)

- [ ] `NEXT_PUBLIC_API_URL` = URL pública do backend na Vercel.
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
