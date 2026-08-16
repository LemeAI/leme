# Leme backend

FastAPI service that replaces `app/api/**` from the Next.js app. Authenticates
callers via Firebase Auth, reads and writes the same Supabase Postgres
database and Storage bucket the frontend used to access directly, and talks
to Stripe for billing.

## Architecture

The code is organized in four layers, dependencies pointing inward:

```
app/
  domain/          entities, repository interfaces (ports), business rules —
                    no FastAPI, SQLAlchemy, or Pydantic imports allowed here.
  application/      use cases orchestrating domain entities through the
                     repository ports and two external-service ports
                     (StoragePort, PaymentGatewayPort).
  infrastructure/    concrete adapters: SQLAlchemy repositories, the Supabase
                      Storage HTTP client, the Stripe gateway, the Firebase
                      token verifier, and environment-backed settings.
  presentation/       FastAPI: Pydantic schemas, routers, the dependency
                       injection composition root (deps.py), and the app
                       factory (main.py).
```

A request flows: router -> use case -> repository/gateway port -> concrete
infrastructure adapter -> Supabase/Stripe/Firebase. Routers never touch
SQLAlchemy or `httpx` directly; use cases never import FastAPI or Pydantic.

## Running locally

```bash
python -m venv .venv
.venv/Scripts/activate   # .venv/bin/activate on macOS/Linux
pip install -r requirements-dev.txt
cp .env.example .env     # fill in Supabase/Stripe values, see ../SETUP.md
```

Firebase ID token verification uses Application Default Credentials. Cloud
Run provides these automatically through its runtime service account; for
local development, run:

```bash
gcloud auth application-default login
```

Then start the API with hot reload:

```bash
uvicorn app.presentation.main:app --reload --port 8000
```

Interactive docs: `http://localhost:8000/docs` (Swagger UI) or `/redoc`.

## Tests and linting

```bash
pytest
ruff check .
mypy app
```

## Deployment

Built as a container (`Dockerfile`) and deployed to Cloud Run. Secrets
(`SUPABASE_DB_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `STRIPE_SECRET_KEY`,
`STRIPE_WEBHOOK_SECRET`) belong in Secret Manager, injected as environment
variables on the Cloud Run service — never committed or baked into the image.
