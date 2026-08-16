# SETUP — Leme

Guia para configurar o Supabase (banco + storage), o Firebase (autenticação),
o backend Python e o deploy do frontend na Vercel + backend no Cloud Run.

O Leme é hoje dois serviços separados:

- **Frontend** (`/`): Next.js, hospedado na Vercel. Não guarda nenhum
  segredo — só fala com o backend via HTTP.
- **Backend** (`/backend`): FastAPI (Python), hospedado no Google Cloud Run.
  É o único componente com acesso ao banco (Supabase Postgres), ao storage
  de arquivos (Supabase Storage) e ao Stripe.

## 1. Criar o projeto no Supabase (banco + storage)

1. Acesse [supabase.com](https://supabase.com), crie uma conta e clique em **New Project**.
2. Escolha nome, senha do banco e região (de preferência próxima dos seus usuários).
3. Aguarde a criação do projeto (leva cerca de 2 minutos).
4. O Supabase Auth **não é usado** neste projeto — a autenticação é 100% Firebase (seção 3). O Supabase entra só como Postgres gerenciado + bucket de arquivos.

## 2. Rodar as migrations (Alembic)

O schema do banco é versionado via Alembic, dentro de `backend/migrations`
— não existe mais um `schema.sql` pra colar no SQL Editor.

1. Siga o [`backend/README.md`](backend/README.md) pra criar o virtualenv e instalar as dependências.
2. Copie `backend/.env.example` pra `backend/.env`. Para **rodar as migrations**, preencha `SUPABASE_DB_URL` com a connection string de superuser do Postgres (**Settings > Database > Connection string**, modo "URI") — criar roles e funções exige privilégio que a role da aplicação não tem.
3. Escolha uma senha forte para a role da aplicação e exporte:

```bash
export LEME_BACKEND_DB_PASSWORD='...'   # no PowerShell: $env:LEME_BACKEND_DB_PASSWORD='...'
```

A migration falha de propósito se essa variável não estiver setada — é a
senha da role `leme_backend`, e ela nunca fica versionada no repositório.

4. Rode as migrations:

```bash
cd backend
alembic upgrade head
```

Isso cria as 4 tabelas (`html_pages`, `profiles`, `share_links`,
`contributions`), as funções auxiliares (`increment_views`,
`apply_pro_upgrade`, `apply_pro_downgrade`), o bucket de Storage
`html-files` (público, limite de 2MB, aceitando `text/html` e
`application/octet-stream`) e a role dedicada `leme_backend`.

5. **Troque o `SUPABASE_DB_URL` do `backend/.env` para conectar como `leme_backend`** (com a senha do passo 3), não mais como superuser. É essa role de baixo privilégio que a aplicação deve usar no dia a dia.

Confirme em **Table Editor** que as 4 tabelas foram criadas, e em
**Storage** que o bucket `html-files` existe e está marcado como público.

## 3. Configurar o Firebase (autenticação)

1. Acesse o [console do Firebase](https://console.firebase.google.com), crie um projeto (pode ser o mesmo projeto do Google Cloud que vai hospedar o backend — simplifica permissões).
2. Em **Authentication > Sign-in method**, habilite:
   - **Email/Password**
   - **Email link (passwordless sign-in)** — equivalente ao "magic link" do fluxo antigo.
3. Em **Authentication > Settings > Authorized domains**, adicione `localhost` (já vem por padrão) e, depois do deploy, o domínio de produção do frontend.
4. Em **Project settings > General > Your apps**, crie um app Web e copie a config (`apiKey`, `authDomain`, `projectId`, `appId`) — vai nas variáveis `NEXT_PUBLIC_FIREBASE_*` do frontend (seção 5).
5. O backend verifica os tokens via Firebase Admin SDK usando Application Default Credentials — **não precisa baixar uma service account key**. Rodando localmente, autentique uma vez com:

```bash
gcloud auth application-default login
```

No Cloud Run, isso é automático (usa a service account do próprio serviço).

## 4. Obter as chaves

Do Supabase (**Settings > API** e **Settings > Database**):

- **Project URL** (`https://SEU-PROJETO.supabase.co`) → `SUPABASE_URL` (backend)
- **service_role key** → `SUPABASE_SERVICE_ROLE_KEY` (backend, usada só pra falar com o Storage — ⚠️ nunca exponha essa chave no frontend)
- **Connection string** (modo URI, com a senha do banco) → `SUPABASE_DB_URL` (backend)

Do Firebase (**Project settings > General**): a config web da seção 3, passo 4.

## 5. Variáveis de ambiente locais

**Frontend** — copie `.env.local.example` pra `.env.local`:

```bash
cp .env.local.example .env.local
```

```
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**Backend** — copie `backend/.env.example` pra `backend/.env` (ver seção 2 e o [`backend/README.md`](backend/README.md) para os valores de Supabase; a seção 8 abaixo cobre os valores de Stripe).

## 6. Rodar localmente

Em dois terminais:

```bash
# terminal 1 — backend
cd backend
uvicorn app.presentation.main:app --reload --port 8000

# terminal 2 — frontend
npm install
npm run dev
```

Acesse `http://localhost:3000`. Docs interativas da API: `http://localhost:8000/docs`.

Teste o fluxo completo:

1. Envie um `.html` na página inicial — você já é redirecionado direto pra `/p/{id}` com o HTML renderizado em tela cheia.
2. No painel lateral, gere um link de compartilhamento e abra `/s/{token}` em outra aba (ou navegador anônimo).
3. Confirme que dá pra comentar, sugerir e fazer fork por ali.
4. Crie uma conta em `/login`, envie um HTML logado e confira o uso do plano em `/dashboard`.
5. Veja `/pricing` pra comparar os planos.

## 7. Planos (free/pro)

O projeto tem a lógica de limites em `lib/plans.ts` (frontend, só pra
exibição) e `backend/app/domain/plans.py` (backend, fonte da verdade):

- **Sem conta**: 1 página ativa por vez, expira em 2 dias, com marca d'água.
- **Free** (conta criada): 3 páginas ativas ao mesmo tempo, expiram em 30 dias, com marca d'água.
- **Pro**: sem limite de páginas, nunca expira, sem marca d'água. US$ 9/mês ou US$ 90/ano.

A cobrança do Pro é feita via Stripe (assinatura recorrente) — configure na
seção 8 abaixo. Enquanto não configurar o Stripe, dá pra promover alguém pra
Pro manualmente direto no banco. Pegue o Firebase UID da pessoa em
**Firebase Console > Authentication > Users** e rode no **SQL Editor** do Supabase:

```sql
update public.profiles
set plan = 'pro'
where id = 'FIREBASE_UID_AQUI';
```

## 8. Billing (assinatura Pro via Stripe)

### 8.1. Criar a conta Stripe

1. Acesse [dashboard.stripe.com/register](https://dashboard.stripe.com/register) e crie uma conta.
2. Você pode testar tudo em **modo de teste** (toggle "Test mode" no canto superior do Dashboard) antes de ativar pagamentos de verdade.

### 8.2. Criar o produto e os preços

1. No Dashboard, vá em **Product catalog > Add product**.
2. Nome: `Leme Pro` (ou o que preferir).
3. Adicione dois preços recorrentes:
   - **Monthly**: US$ 9,00, recorrência mensal.
   - **Yearly**: US$ 90,00, recorrência anual (equivale a ~2 meses grátis frente ao mensal).
4. Copie o **Price ID** de cada preço (começa com `price_...`) → `STRIPE_PRICE_ID_MONTH` e `STRIPE_PRICE_ID_YEAR` no `backend/.env`.

### 8.3. Pegar a chave secreta

1. Vá em **Developers > API keys**.
2. Copie a **Secret key** (em modo de teste, começa com `sk_test_...`) → `STRIPE_SECRET_KEY` no `backend/.env`.
3. Essa chave só existe no backend — nunca no frontend.

### 8.4. Configurar o webhook

O backend escuta eventos de assinatura em `POST /billing/webhook` pra manter
`profiles.plan` sincronizado com o status real no Stripe.

**Em desenvolvimento**, use a [Stripe CLI](https://docs.stripe.com/stripe-cli) apontando pro backend local:

```bash
stripe login
stripe listen --forward-to localhost:8000/billing/webhook
```

O comando `stripe listen` imprime um `whsec_...` — copie pra
`STRIPE_WEBHOOK_SECRET` no `backend/.env`.

**Em produção** (depois do deploy do backend no Cloud Run):

1. Vá em **Developers > Webhooks > Add endpoint**.
2. URL: `https://SEU-BACKEND.run.app/billing/webhook` (ou o domínio customizado do backend, se tiver um).
3. Eventos a escutar: `checkout.session.completed`, `customer.subscription.created`, `customer.subscription.updated`, `customer.subscription.deleted`.
4. Copie o **Signing secret** do endpoint → `STRIPE_WEBHOOK_SECRET` nas variáveis de ambiente do Cloud Run.

### 8.5. Testar

1. Rode `stripe listen --forward-to localhost:8000/billing/webhook` numa aba do terminal.
2. Nas outras duas, rode o backend (`uvicorn ...`) e o frontend (`npm run dev`).
3. Crie uma conta, vá em `/pricing`, clique em **Upgrade to Pro**.
4. No Checkout do Stripe (modo de teste), use o cartão `4242 4242 4242 4242`, qualquer data futura e CVC.
5. Depois de pagar, você volta pro `/dashboard` já como Pro.
6. Teste também **Manage billing** no dashboard — abre o Billing Portal do Stripe. Cancele e confirme que `profiles.plan` volta pra `free`.

## 9. Deploy

### 9.1. Backend no Cloud Run

Ver [`backend/README.md`](backend/README.md) para detalhes de arquitetura.
Resumo do deploy:

1. Crie um projeto no Google Cloud (pode ser o mesmo do Firebase, seção 3).
2. Habilite as APIs Cloud Run, Artifact Registry e Secret Manager.
3. Guarde os segredos (`SUPABASE_DB_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`) no Secret Manager.
4. Build e deploy (a partir de `backend/`):

```bash
gcloud run deploy leme-api \
  --source . \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars FRONTEND_URL=https://SEU-FRONTEND.vercel.app,SITE_URL=https://SEU-FRONTEND.vercel.app,ENVIRONMENT=production,SUPABASE_URL=...,STORAGE_BUCKET=html-files,STRIPE_PRICE_ID_MONTH=...,STRIPE_PRICE_ID_YEAR=... \
  --set-secrets SUPABASE_DB_URL=SUPABASE_DB_URL:latest,SUPABASE_SERVICE_ROLE_KEY=SUPABASE_SERVICE_ROLE_KEY:latest,STRIPE_SECRET_KEY=STRIPE_SECRET_KEY:latest,STRIPE_WEBHOOK_SECRET=STRIPE_WEBHOOK_SECRET:latest
```

5. Rode as migrations contra o banco de produção (`alembic upgrade head` com `SUPABASE_DB_URL` de produção no `.env` local, ou como um passo do seu pipeline de deploy).
6. Anote a URL que o Cloud Run devolve (`https://leme-api-xxxx.run.app`) — vai em `NEXT_PUBLIC_API_URL` no frontend (seção 9.2).

### 9.2. Frontend na Vercel

1. Em [vercel.com/new](https://vercel.com/new), conecte sua conta do GitHub e importe o repositório `leme` (a raiz do repo — a Vercel ignora a pasta `backend/`, que não é um app Next.js).
2. Em **Environment Variables**, adicione as variáveis de `.env.local.example`, apontando `NEXT_PUBLIC_API_URL` pra URL do Cloud Run (seção 9.1) e `NEXT_PUBLIC_SITE_URL` pro domínio da própria Vercel.
3. Clique em **Deploy**.
4. Volte no Cloud Run e atualize a env var `FRONTEND_URL` do backend pra essa URL da Vercel (necessário pro CORS liberar o frontend) — redeploy o backend depois de mudar.
5. No Firebase (**Authentication > Settings > Authorized domains**), adicione o domínio da Vercel.

### 9.3. Domínio próprio (opcional)

Mesmo fluxo do antigo: **Settings > Domains** na Vercel pro frontend, e um
**Domain Mapping** no Cloud Run pro backend (ex: `api.seudominio.com`). Depois
de trocar os domínios, atualize `FRONTEND_URL`/`NEXT_PUBLIC_API_URL` nos dois
lados e o endpoint do webhook do Stripe (seção 8.4).

## Estrutura de pastas

```
app/
  layout.tsx                     -> layout raiz, injeta o AuthProvider (Firebase)
  (main)/                        -> grupo de rotas com Navbar (URLs não mudam)
    layout.tsx                   -> injeta o Navbar
    page.tsx                     -> landing page
    new/page.tsx                 -> tela de upload (client, usa hooks de auth/pages)
    pricing/page.tsx             -> comparação Free vs Pro
    login/page.tsx               -> autenticação Firebase (magic link ou email/senha)
    dashboard/page.tsx           -> uploads do usuário logado, uso do plano
    mine/page.tsx                -> uploads de quem não tem conta (X-Anon-Id)
    auth/callback/page.tsx       -> completa o sign-in por email link (client-side)
    auth/auth-code-error/page.tsx -> erro de confirmação
  s/[token]/page.tsx              -> visualização fullscreen via link compartilhado
  p/[id]/page.tsx                 -> página pública fullscreen, direto pelo id
components/
  Navbar.tsx                     -> client component, usa useAuth()
  PageSidebar.tsx                -> sidebar client-side de /p/[id]
  UploadForm.tsx, ShareButton.tsx, ContributionsPanel.tsx, ManageBillingButton.tsx,
  ProPlanCard.tsx                -> chamam o backend via lib/api.ts
  HtmlViewer.tsx                 -> iframe sandbox (src aponta pro backend)
  ...
lib/
  firebase.ts                    -> client SDK do Firebase (auth)
  auth.tsx                       -> AuthProvider + useAuth()
  api.ts                         -> fetch wrapper (Bearer token, X-Anon-Id, base URL)
  anon-client.ts                 -> identidade anônima via localStorage
  hooks/useMyPages.ts, useProfile.ts
  types.ts                       -> tipos espelhando as respostas da API
  plans.ts                       -> limites de plano (cópia de exibição; fonte real é o backend)
  utils.ts
backend/                          -> ver backend/README.md (FastAPI, camadas, migrations)
```

## Notas de segurança

- O iframe em `HtmlViewer` usa `sandbox="allow-scripts allow-forms allow-popups allow-modals"` — sem `allow-same-origin`, o que impede o HTML de terceiros de acessar cookies/localStorage do seu domínio.
- O frontend não guarda nenhum segredo: nem chave do Supabase, nem do Stripe. Só a config pública do Firebase (`NEXT_PUBLIC_FIREBASE_*`), que é pública por design — a segurança está na verificação do ID token pelo backend.
- O backend é o único componente com acesso ao banco e ao Storage. Conecte-o com a role `leme_backend` (grants restritos às 4 tabelas da aplicação), **não** com a role `postgres`, que é superuser — ver `SUPABASE_DB_URL` no `backend/.env.example`.
- **Modelo de autorização, explicitamente:** o conteúdo das páginas é público por design — qualquer pessoa com o id abre `/p/{id}`, e criar/resolver link de compartilhamento também é aberto (o link não dá acesso a nada que o id já não desse). O que exige token Firebase válido são as rotas de identidade e cobrança: `GET /me`, `GET /pages/mine`, `POST /billing/checkout` e `POST /billing/portal`. Não existem hoje rotas de editar/apagar página; se forem adicionadas, **elas precisam checar dono explicitamente** — não há RLS por baixo pra salvar (o `auth.uid()` do Supabase deixou de existir junto com o Supabase Auth).
- Todo caminho que cria página (upload direto e fork) passa pelo mesmo `PageQuotaService`, que aplica limite de páginas ativas e expiração do plano. O limite do plano anônimo é best-effort: o `X-Anon-Id` é gerado no cliente, então quem limpar o `localStorage` começa do zero — é contenção de abuso casual, não um controle forte.
- CORS no backend é restrito a `FRONTEND_URL` (+ `localhost:3000` em desenvolvimento). Vale lembrar o que CORS **não** faz: ele impede outro site de *ler* a resposta no browser, não impede a request de ser enviada, e não vale nada pra cliente fora do browser (curl, script). Como a autenticação é Bearer token e não cookie, não há superfície de CSRF — a proteção real das rotas privadas é o token, não o CORS.
- Rate limiting (`slowapi`) nos endpoints públicos de escrita (upload, comentário/sugestão/fork, criação de link). **Com o default `RATE_LIMIT_STORAGE_URI=memory://` os contadores são por processo** — zeram em cold start e não são compartilhados entre instâncias do Cloud Run, o que em produção equivale a não ter limite. Aponte pra um Redis antes de considerar isso um controle de verdade. O IP do cliente é extraído do `X-Forwarded-For` contando `TRUSTED_PROXY_HOPS` entradas a partir da direita (à esquerda é valor que o cliente controla, e portanto forjável).
- Requests acima de `MAX_REQUEST_BYTES` são rejeitadas antes de qualquer parsing, e o upload confere o tamanho declarado do arquivo antes de lê-lo na memória.
- O identificador anônimo (`X-Anon-Id`, gerado em `lib/anon-client.ts`) é só um UUID opaco salvo no `localStorage` do navegador — não guarda nenhum dado pessoal. Como fica no `localStorage`, é legível por XSS; ele não concede nenhum privilégio além de listar os próprios uploads daquele navegador.
- `POST /billing/webhook` verifica a assinatura HMAC de cada request (`stripe-signature` + `STRIPE_WEBHOOK_SECRET`) antes de processar qualquer evento — sem isso, qualquer um poderia forjar um "pagamento confirmado".
