# Leme — Frontend

Frontend Next.js do Leme: aplicação para upload de páginas HTML geradas por IA e compartilhamento via links públicos.

## O que é

O Leme é composto por dois serviços:

- **Frontend** (`leme/`): Next.js 16, hospedado na Vercel. É a interface do usuário.
- **Backend** (`leme-app-backend/`): FastAPI (Python), também hospedado na Vercel como Serverless Function.

Este repositório contém apenas o frontend. O backend vive em [`leme-app-backend/`](../leme-app-backend/).

## Tecnologias

- [Next.js](https://nextjs.org/) 16 (App Router)
- [React](https://react.dev/) 18
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Firebase Auth](https://firebase.google.com/products/auth)
- [SWR](https://swr.vercel.app/) (cache, deduplicação e revalidação de dados)

## Requisitos

- Node.js 20+
- Conta no Firebase (para autenticação)
- Backend Leme rodando localmente ou deployado

## Setup

1. Instale as dependências:

```bash
npm install
```

2. Copie o exemplo de variáveis de ambiente:

```bash
cp .env.local.example .env.local
```

3. Preencha `.env.local` com os valores do seu projeto. Veja a seção **Variáveis de ambiente** abaixo.

4. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

## Scripts

| Comando | Descrição |
|---------|-------------|
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera a build de produção |
| `npm run start` | Inicia o servidor de produção |
| `npm run lint` | Roda o ESLint |
| `npm run typecheck` | Roda a checagem de tipos do TypeScript |

## Variáveis de ambiente

Todas as variáveis começam com `NEXT_PUBLIC_` porque precisam estar disponíveis no browser.

| Variável | Obrigatória | Descrição |
|----------|-------------|-----------|
| `NEXT_PUBLIC_API_URL` | Sim | URL pública do backend FastAPI. Em dev: `http://localhost:8000`. Em produção: `https://<backend>.vercel.app`. |
| `NEXT_PUBLIC_SITE_URL` | Sim | URL pública deste frontend. Usada pelo backend para montar links de compartilhamento. |
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Sim | API key do projeto Firebase. |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Sim | Auth domain do Firebase. |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Sim | Project ID do Firebase. |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Sim | App ID do Firebase. |

> **Atenção:** nunca use `localhost` em `NEXT_PUBLIC_API_URL` no deploy de produção. O build falha propositalmente se isso acontecer.

## Integração com o backend

Toda comunicação com o backend passa por `lib/api.ts`:

- Quando o usuário está logado, o token Firebase ID é enviado automaticamente como `Authorization: Bearer <token>`.
- Quando o usuário é anônimo, um ID gerado no browser é enviado no header `X-Anon-Id`.
- Cada request recebe um `X-Request-ID` para tracing.
- Requests têm timeout de 10s e retry automático para falhas transitórias.

Os hooks `useMyPages` e `useProfile` usam SWR para cache, deduplicação e stale-while-revalidate.

Veja mais detalhes em [`INTEGRATION.md`](./INTEGRATION.md).

## Deploy na Vercel

1. Crie um projeto na Vercel apontando para este diretório (`leme/`).
2. Adicione as variáveis de ambiente de produção.
3. Certifique-se de que o domínio do frontend está autorizado no Firebase Console → Authentication → Authorized domains.
4. Faça o deploy.

Veja o [`DEPLOY_CHECKLIST.md`](./DEPLOY_CHECKLIST.md) para não esquecer nenhum passo.

## Arquitetura

Este projeto usa uma **arquitetura desacoplada (decoupled / API-first)**:

- **Frontend** (este repositório): Next.js 16 na Vercel. Responsável apenas pela interface, navegação, estado local e chamadas de API.
- **Backend** (`leme-app-backend/`): FastAPI (Python) também na Vercel, expõe uma API REST stateless. Responsável por autenticação, banco de dados, storage, billing e regras de negócio.
- **Comunicação**: o frontend chama o backend via HTTP usando `fetch`, autenticando com Firebase ID tokens (`Authorization: Bearer <token>`) ou identificadores anônimos (`X-Anon-Id`).

Essa separação permite escalar, deployar e versionar frontend e backend de forma independente, e facilita governança (o backend é a única fonte de verdade para dados e regras).

## Problemas comuns

### 404 em todas as chamadas de API após o deploy

Verifique o valor de `NEXT_PUBLIC_API_URL`. Ele deve ser uma **URL absoluta**, incluindo o protocolo:

```
# Correto
NEXT_PUBLIC_API_URL=https://leme-app-backend.vercel.app

# Errado — vira um caminho relativo ao domínio do frontend
NEXT_PUBLIC_API_URL=leme-app-backend.vercel.app
```

Com o valor errado, o browser faz requisições como `https://www.leme-app.com/leme-app-backend.vercel.app/uploads`, que não existem.

### `STRIPE_WEBHOOK_SECRET`

Não é a URL do webhook. É o segredo que o Stripe gera para você verificar a assinatura dos eventos (`whsec_...`). A URL do endpoint que deve ser configurada no Stripe é:

```
https://leme-app-backend.vercel.app/billing/webhook
```

### `MIGRATION_DATABASE_URL`

É a string de conexão usada somente para rodar migrações Alembic (geralmente em CI/CD). Deve apontar para a **conexão direta** do Supabase (porta `5432`), não para o transaction pooler (porta `6543`). O nome separado existe para evitar que o runner de CI use a mesma variável `DATABASE_URL` do runtime acidentalmente.

### Variáveis do `.env` não são vistas pelo Alembic

O Alembic não carrega arquivos `.env` automaticamente. Você precisa exportar as variáveis no shell:

```bash
export DATABASE_URL="postgresql://..."
export LEME_BACKEND_DB_PASSWORD="..."
```

Ou usar uma ferramenta como `python-dotenv` carregada no `migrations/env.py` do backend.

## Estrutura

```
app/              # Rotas e páginas do Next.js App Router
components/       # Componentes React reutilizáveis
lib/              # Utilitários, hooks, configurações e cliente de API
public/           # Arquivos estáticos
```

## Licença

Privado — todos os direitos reservados.
