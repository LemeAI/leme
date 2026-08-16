# SETUP — Leme

Guia para configurar o Supabase (banco + storage), o Firebase (autenticação),
o backend Python e o deploy do frontend na Vercel + backend no Cloud Run.

O Leme é hoje dois serviços separados:

- **Frontend** (`/`): Next.js, hospedado na Vercel. Não guarda nenhum
  segredo — só fala com o backend via HTTP.
- **Backend** (`/leme-app-backend`): FastAPI (Python), hospedado no Google Cloud Run.
  É o único componente com acesso ao banco (Supabase Postgres), ao storage
  de arquivos (Supabase Storage) e ao Stripe.

## 1. Criar o projeto no Supabase (banco + storage)

1. Acesse [supabase.com](https://supabase.com), crie uma conta e clique em **New Project**.
2. Escolha nome, senha do banco e região (de preferência próxima dos seus usuários).
3. Aguarde a criação do projeto (leva cerca de 2 minutos).
4. O Supabase Auth **não é usado** neste projeto — a autenticação é 100% Firebase (seção 3). O Supabase entra só como Postgres gerenciado + bucket de arquivos.

## 2. Rodar as migrations (Alembic)

O schema do banco é versionado via Alembic, dentro de `leme-app-backend/migrations`
— não existe mais um `schema.sql` pra colar no SQL Editor.

> **Desenvolvimento com Postgres local.** As migrations rodam tanto no
> Supabase quanto num Postgres comum: tudo que é específico do Supabase
> (FKs pra `auth.users`, trigger de signup, RLS com `auth.uid()`, bucket de
> `storage`) só é criado quando esses schemas existem. Num Postgres local
> essas partes são simplesmente puladas — a revisão `0002` as removeria de
> qualquer jeito. Se você tem Docker:
>
> ```bash
> cd leme-app-backend && docker compose up -d
> # DATABASE_URL=postgresql://leme:leme@localhost:5434/leme
> ```
>
> O container publica na **5434**, não na 5432: uma instalação nativa do
> PostgreSQL costuma ocupar a 5432, e no Windows dois listeners na mesma
> porta não falham de forma clara — a conexão é aceita e derrubada em
> seguida (`WinError 64` / `ConnectionDoesNotExistError`), o que parece
> erro de credencial. Se a 5434 também estiver ocupada por outro projeto
> seu, troque no `docker-compose.yml` e na `DATABASE_URL`.
>
> Para dispensar o Supabase por completo em desenvolvimento, use também o
> storage em disco — aí o ciclo local precisa só do Postgres:
>
> ```
> STORAGE_BACKEND=local
> LOCAL_STORAGE_PATH=.local-storage
> ```
>
> Só para desenvolvimento: o disco do Cloud Run é efêmero e por instância,
> então em produção os arquivos sumiriam a cada restart. Em produção use
> `STORAGE_BACKEND=supabase` com `SUPABASE_URL` e
> `SUPABASE_SERVICE_ROLE_KEY`.

1. Siga o [`leme-app-backend/README.md`](leme-app-backend/README.md) pra criar o virtualenv e instalar as dependências.
2. Copie `leme-app-backend/.env.example` pra `leme-app-backend/.env` e preencha `DATABASE_URL`. Para **rodar as migrations** no Supabase, use a connection string de superuser (**Settings > Database > Connection string**, modo "URI") — criar roles e funções exige privilégio que a role da aplicação não tem. Num Postgres local, o usuário que você criou já é dono do banco.
3. Escolha uma senha forte para a role da aplicação e exporte:

```bash
export LEME_BACKEND_DB_PASSWORD='...'   # no PowerShell: $env:LEME_BACKEND_DB_PASSWORD='...'
```

A migration falha de propósito se essa variável não estiver setada — é a
senha da role `leme_backend`, e ela nunca fica versionada no repositório.

4. Rode as migrations:

```bash
cd leme-app-backend
alembic upgrade head
```

Isso cria as 4 tabelas (`html_pages`, `profiles`, `share_links`,
`contributions`), as funções auxiliares (`increment_views`,
`apply_pro_upgrade`, `apply_pro_downgrade`), o bucket de Storage
`html-files` (público, limite de 2MB, aceitando `text/html` e
`application/octet-stream`) e a role dedicada `leme_backend`.

5. **Troque o `DATABASE_URL` do `leme-app-backend/.env` para conectar como `leme_backend`** (com a senha do passo 3), não mais como superuser. É essa role de baixo privilégio que a aplicação deve usar no dia a dia.

Confirme em **Table Editor** que as 4 tabelas foram criadas, e em
**Storage** que o bucket `html-files` existe e está marcado como público.

## 3. Configurar o Firebase (autenticação)

1. Acesse o [console do Firebase](https://console.firebase.google.com), crie um projeto (pode ser o mesmo projeto do Google Cloud que vai hospedar o backend — simplifica permissões).
2. Em **Authentication > Sign-in method**, habilite:
   - **Email/Password**
   - **Email link (passwordless sign-in)** — equivalente ao "magic link" do fluxo antigo.
   - **Google** — o provedor pede um "support email"; escolha o seu. Sem habilitar aqui, o botão de Google devolve `auth/operation-not-allowed`.
3. Em **Authentication > Settings > Authorized domains**, adicione `localhost` (já vem por padrão) e, depois do deploy, o domínio de produção do frontend.
4. Em **Project settings > General > Your apps**, crie um app Web e copie a config (`apiKey`, `authDomain`, `projectId`, `appId`) — vai nas variáveis `NEXT_PUBLIC_FIREBASE_*` do frontend (seção 5).
5. O backend verifica os tokens via Firebase Admin SDK usando Application Default Credentials — **não precisa baixar uma service account key**. Rodando localmente, autentique uma vez com:

```bash
gcloud auth application-default login
```

No Cloud Run, isso é automático (usa a service account do próprio serviço).

### 3.1. Firestore (contadores de rate limit)

O backend usa o Firestore só como contador de rate limit — nenhum dado do
produto vive lá. Está no mesmo projeto do Firebase Auth, então não é um
serviço novo pra gerenciar, e o volume cabe folgado no free tier.

1. No console do Firebase, vá em **Firestore Database > Create database**, modo **Native**, e escolha a região (de preferência a mesma do Cloud Run).
2. Crie a política de TTL, pra que cada janela de rate limit se apague sozinha em vez de acumular documentos:

```bash
gcloud firestore fields ttls update expires_at \
  --collection-group=rate_limits \
  --enable-ttl \
  --project=SEU-PROJETO
```

3. Em produção, defina `RATE_LIMIT_BACKEND=firestore` (ver seção 9.1). Em desenvolvimento, deixe `memory` — não precisa de Firestore nenhum pra rodar local.
4. Regras de segurança: o acesso é sempre server-side via Admin SDK, que ignora as security rules. Não é preciso abrir nada — mantenha as regras padrão negando acesso do cliente.

## 4. Obter as chaves

Do Supabase (**Settings > API** e **Settings > Database**):

- **Project URL** (`https://SEU-PROJETO.supabase.co`) → `SUPABASE_URL` (backend)
- **service_role key** → `SUPABASE_SERVICE_ROLE_KEY` (backend, usada só pra falar com o Storage — ⚠️ nunca exponha essa chave no frontend)
- **Connection string** (modo URI, com a senha do banco) → `DATABASE_URL` (backend)

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

**Backend** — copie `leme-app-backend/.env.example` pra `leme-app-backend/.env` (ver seção 2 e o [`leme-app-backend/README.md`](leme-app-backend/README.md) para os valores de Supabase; a seção 8 abaixo cobre os valores de Stripe).

## 6. Rodar localmente

Em dois terminais:

```bash
# terminal 1 — backend
cd leme-app-backend
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
4. Crie uma conta em `/login` — por Google, por magic link ou por email/senha — envie um HTML logado e confira o uso do plano em `/dashboard`.
5. Veja `/pricing` pra comparar os planos.

O login com Google usa popup (`signInWithPopup`), então o mesmo botão serve
para entrar e para se cadastrar: na primeira vez o Firebase cria a conta.
Nada muda no backend — o ID token chega no mesmo formato, com o mesmo
`uid`, independente do provedor.

## 7. Planos (free/pro)

O projeto tem a lógica de limites em `lib/plans.ts` (frontend, só pra
exibição) e `leme-app-backend/app/domain/plans.py` (backend, fonte da verdade):

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
4. Copie o **Price ID** de cada preço (começa com `price_...`) → `STRIPE_PRICE_ID_MONTH` e `STRIPE_PRICE_ID_YEAR` no `leme-app-backend/.env`.

### 8.3. Pegar a chave secreta

1. Vá em **Developers > API keys**.
2. Copie a **Secret key** (em modo de teste, começa com `sk_test_...`) → `STRIPE_SECRET_KEY` no `leme-app-backend/.env`.
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
`STRIPE_WEBHOOK_SECRET` no `leme-app-backend/.env`.

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

Ver [`leme-app-backend/README.md`](leme-app-backend/README.md) para detalhes de arquitetura.
Resumo do deploy:

1. Crie um projeto no Google Cloud (pode ser o mesmo do Firebase, seção 3).
2. Habilite as APIs Cloud Run, Artifact Registry e Secret Manager.
3. Guarde os segredos (`DATABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`) no Secret Manager.
4. Build e deploy (a partir de `leme-app-backend/`):

```bash
gcloud run deploy leme-api \
  --source . \
  --region us-central1 \
  --allow-unauthenticated \
  --max-instances 5 \
  --set-env-vars FRONTEND_URL=https://SEU-FRONTEND.vercel.app,SITE_URL=https://SEU-FRONTEND.vercel.app,ENVIRONMENT=production,STORAGE_BACKEND=supabase,SUPABASE_URL=https://SEU-PROJETO.supabase.co,STORAGE_BUCKET=html-files,STRIPE_PRICE_ID_MONTH=price_...,STRIPE_PRICE_ID_YEAR=price_...,RATE_LIMIT_BACKEND=firestore,TRUSTED_PROXY_HOPS=1 \
  --set-secrets DATABASE_URL=DATABASE_URL:latest,SUPABASE_SERVICE_ROLE_KEY=SUPABASE_SERVICE_ROLE_KEY:latest,STRIPE_SECRET_KEY=STRIPE_SECRET_KEY:latest,STRIPE_WEBHOOK_SECRET=STRIPE_WEBHOOK_SECRET:latest
```

A service account do Cloud Run precisa do papel **Cloud Datastore User**
(`roles/datastore.user`) pra escrever os contadores de rate limit:

```bash
gcloud projects add-iam-policy-binding SEU-PROJETO \
  --member=serviceAccount:SEU-PROJETO-compute@developer.gserviceaccount.com \
  --role=roles/datastore.user
```

5. Rode as migrations contra o banco de produção (`alembic upgrade head` com `DATABASE_URL` de produção no `.env` local, ou como um passo do seu pipeline de deploy).
6. Anote a URL que o Cloud Run devolve (`https://leme-api-xxxx.run.app`) — vai em `NEXT_PUBLIC_API_URL` no frontend (seção 9.2).

### 9.2. Frontend na Vercel

1. Em [vercel.com/new](https://vercel.com/new), conecte sua conta do GitHub e importe o repositório `leme` (a raiz do repo — a Vercel ignora a pasta `leme-app-backend/`, que não é um app Next.js).
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
leme-app-backend/                  -> ver leme-app-backend/README.md (FastAPI, camadas, migrations)
```

## Notas de segurança

- O HTML enviado por terceiros é servido com **dupla contenção**: o atributo `sandbox` do `<iframe>` (que vale quando embutido) e o header `Content-Security-Policy: sandbox` na própria resposta (que vale também se alguém abrir a URL da API direto no browser — o atributo do iframe não protege esse caso). Nos dois falta `allow-same-origin` de propósito, o que força um origin opaco. Também vai `X-Content-Type-Options: nosniff` e `frame-ancestors` limitando quem pode embutir.
- O frontend não guarda nenhum segredo: nem chave do Supabase, nem do Stripe. Só a config pública do Firebase (`NEXT_PUBLIC_FIREBASE_*`), que é pública por design — a segurança está na verificação do ID token pelo backend.
- O backend é o único componente com acesso ao banco e ao Storage. Conecte-o com a role `leme_backend` (grants restritos às 4 tabelas da aplicação), **não** com a role `postgres`, que é superuser — ver `DATABASE_URL` no `leme-app-backend/.env.example`.
- **Modelo de autorização, explicitamente:** *ler* uma página é público por design — qualquer pessoa com o id abre `/p/{id}`. Já *criar o link de compartilhamento* exige ser dono (`HtmlPage.is_owned_by`), e resolver um token existente é aberto. Exigem token Firebase válido: `GET /me`, `GET /pages/mine`, `POST /billing/checkout` e `POST /billing/portal`.
- ⚠️ **Não há RLS por baixo.** O `auth.uid()` do Supabase morreu junto com o Supabase Auth, então toda rota que muta um recurso **precisa chamar `is_owned_by` explicitamente** — nada no banco vai pegar uma rota que esquecer. Rotas de editar/apagar página ainda não existem; quando existirem, essa checagem é obrigatória e deve vir com teste (ver `tests/test_ownership.py`).
- **Bucket de storage fechado** (migration `0003`): as políticas originais permitiam insert/update/delete a qualquer role, inclusive `anon` — e a arquitetura antiga publicava a anon key no bundle do browser, então ela deve ser considerada pública para sempre. Hoje só o backend acessa o Storage, com service_role, e o bucket é privado. **Rotacione as chaves do Supabase** se o app antigo chegou a ir ao ar.
- **Trilha de auditoria** em JSON no stdout (`leme.audit`), que o Cloud Logging indexa: token rejeitado, requisição negada por autorização, rate limit estourado e webhook do Stripe aceito/rejeitado. Filtre por `jsonPayload.event`. Tokens e segredos nunca são logados.
- Todo caminho que cria página (upload direto e fork) passa pelo mesmo `PageQuotaService`, que aplica limite de páginas ativas e expiração do plano. O limite do plano anônimo é best-effort: o `X-Anon-Id` é gerado no cliente, então quem limpar o `localStorage` começa do zero — é contenção de abuso casual, não um controle forte.
- CORS no backend é restrito a `FRONTEND_URL` (+ `localhost:3000` em desenvolvimento). Vale lembrar o que CORS **não** faz: ele impede outro site de *ler* a resposta no browser, não impede a request de ser enviada, e não vale nada pra cliente fora do browser (curl, script). Como a autenticação é Bearer token e não cookie, não há superfície de CSRF — a proteção real das rotas privadas é o token, não o CORS.
- Rate limiting por IP nos endpoints públicos de escrita (upload, comentário/sugestão/fork, criação de link). **Em produção use `RATE_LIMIT_BACKEND=firestore`**: o default `memory` mantém contadores por processo, que zeram em cold start e não são compartilhados entre instâncias do Cloud Run — na prática, sem limite. O IP do cliente é extraído do `X-Forwarded-For` contando `TRUSTED_PROXY_HOPS` entradas a partir da direita (à esquerda é valor que o cliente controla, e portanto forjável). O backend Firestore falha aberto: se o Firestore cair, as requests passam e o erro é logado — é contenção de abuso, não fronteira de autorização, e falhar fechado transformaria uma indisponibilidade do Firestore em indisponibilidade de toda escrita.
- Requests acima de `MAX_REQUEST_BYTES` são rejeitadas antes de qualquer parsing, e o upload confere o tamanho declarado do arquivo antes de lê-lo na memória.
- O identificador anônimo (`X-Anon-Id`, gerado em `lib/anon-client.ts`) é só um UUID opaco salvo no `localStorage` do navegador — não guarda nenhum dado pessoal. Como fica no `localStorage`, é legível por XSS; ele não concede nenhum privilégio além de listar os próprios uploads daquele navegador.
- `POST /billing/webhook` verifica a assinatura HMAC de cada request (`stripe-signature` + `STRIPE_WEBHOOK_SECRET`) antes de processar qualquer evento — sem isso, qualquer um poderia forjar um "pagamento confirmado".
