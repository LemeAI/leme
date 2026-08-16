# Integração Frontend ↔ Backend

Este documento descreve como o frontend Next.js (`leme/`) se comunica com o backend FastAPI (`leme-app-backend/`).

## Camada de API

Toda comunicação com o backend passa por `lib/api.ts`.

- **Autenticação**: anexa automaticamente o token Firebase ID como `Authorization: Bearer <token>` quando o usuário está logado.
- **Anônimo**: envia o header `X-Anon-Id` (gerado em `lib/anon-client.ts`) para rotas que funcionam sem login.
- **Resiliência**: `apiFetch` adiciona timeout (10s padrão), `AbortSignal` e retry com backoff para falhas transitórias. Erros 4xx não são retentados.
- **Tracing**: cada request recebe um `X-Request-ID` gerado no frontend; o backend ecoia o mesmo ID no response header.

## Gerenciamento de Estado

Os hooks `useMyPages` e `useProfile` usam `swr` para:

- **Deduplicação**: múltiplos componentes montados na mesma página não disparam requests repetidos.
- **Cache**: dados são reutilizados entre navegações.
- **Stale-while-revalidate**: a UI mostra dados em cache e atualiza silenciosamente quando o usuário volta à aba.
- **Cancelamento**: requests pendentes são cancelados quando o componente desmonta ou a identidade muda.

## Variáveis de Ambiente

| Variável | Obrigatória | Descrição |
|----------|-------------|-----------|
| `NEXT_PUBLIC_API_URL` | Sim | URL pública do backend (ex: `https://api.leme.app`). Build falha em produção se estiver faltando ou apontar para `localhost`. |
| `NEXT_PUBLIC_SITE_URL` | Sim | URL pública do frontend (usada pelo backend para montar links de compartilhamento). |
| `NEXT_PUBLIC_FIREBASE_*` | Sim | Configuração pública do Firebase Auth. |

## CORS

O backend só aceita origins listadas em `FRONTEND_URL` / `FRONTEND_URLS`. Em desenvolvimento, `http://localhost:3000` é liberado automaticamente.

Para previews da Vercel, adicione a URL fixa de preview em `FRONTEND_URLS` do backend (separada por vírgula). Não é necessário incluir `*.vercel.app` — origens curinga não são suportadas pelo CORS — use URLs conhecidas.

## Rate Limit

O backend aplica rate-limit por IP para usuários anônimos e por `user_id` para usuários autenticados. Isso impede que alguém mude de IP para burlar limites de uso.

## Checklist de Deploy

Ver `DEPLOY_CHECKLIST.md`.
