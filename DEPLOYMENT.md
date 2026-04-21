# Deployment Guide (Vercel + FastAPI + Postgres)

This project is deployment-ready with this architecture:
- Frontend: Vercel (Next.js)
- Backend: Render/Railway/Fly.io (FastAPI)
- Database: Managed Postgres (Neon/Supabase/Render Postgres)

## 1. Provision Postgres

Create a Postgres database and copy the connection string.

Use one of these URL formats:
- postgres://user:pass@host:5432/dbname
- postgresql://user:pass@host:5432/dbname

The backend normalizes both automatically.

## 2. Deploy Backend (FastAPI)

### Environment variables
Set these in your backend host:

- APP_NAME=English AI API
- APP_ENV=prod
- DATABASE_URL=<your postgres url>
- JWT_SECRET=<long random secret>
- JWT_ALGORITHM=HS256
- ACCESS_TOKEN_EXPIRE_MINUTES=1440
- CORS_ALLOWED_ORIGINS=https://your-vercel-domain.vercel.app
- CORS_ALLOWED_ORIGIN_REGEX=https://.*\.vercel\.app
- OLLAMA_BASE_URL=https://api.ollama.com
- OLLAMA_API_KEY=<optional>
- OLLAMA_MODEL=llama3
- OLLAMA_CLOUD_MODEL=<optional>

### Start command

```bash
uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

Recommended release command (run once per deploy):

```bash
python scripts/init_deploy.py
```

This ensures required Postgres tables exist and seeds starter lessons if empty.

### Build/install command

```bash
pip install -r requirements.txt
```

## 3. Seed backend data

First initialize Postgres tables (required in all environments):

```bash
python scripts/init_deploy.py
```

This is idempotent and safe to run multiple times.

Then (optional) seed demo data for QA/staging:

```bash
python scripts/seed_data.py
```

This seeds:
- required tables (create_all)
- starter lessons (only if lessons table is empty)
- 2 demo users
- sample completions and interactions

For production, you can skip demo users and only seed lessons by running:

```bash
SEED_LESSONS=true python scripts/init_deploy.py
```

## 4. Deploy Frontend on Vercel

Set frontend environment variable in Vercel project settings:

- NEXT_PUBLIC_API_BASE_URL=https://your-backend-domain.com

The frontend also supports NEXT_PUBLIC_API_URL for compatibility.

## 5. Verify production

- Frontend loads at Vercel URL
- Signup works (no failed to fetch)
- Backend health endpoint works: /health
- Auth flow works end to end:
  - POST /api/auth/register
  - POST /api/auth/login
  - GET /api/auth/me (with Bearer token)
- AI endpoints respond:
  - POST /api/grammar/correct
  - POST /api/conversation/reply
  - POST /api/speaking/feedback
  - POST /api/lessons/generate-json

## 6. Troubleshooting

### Signup says failed to fetch

Usually one of these:
- NEXT_PUBLIC_API_BASE_URL is missing or wrong
- Backend CORS does not include your Vercel URL
- Backend service is down

Quick checks:
- Open browser devtools Network tab and verify the signup request URL is your backend URL.
- Open backend URL + `/health` directly in browser.
- Confirm backend env has `CORS_ALLOWED_ORIGINS` including the exact Vercel domain.

### CORS error in browser console

Set:
- CORS_ALLOWED_ORIGINS to your exact frontend URL
- CORS_ALLOWED_ORIGIN_REGEX to include preview deployments

### Database connection errors

- Confirm DATABASE_URL is set and valid
- Confirm Postgres network access allows backend host
- Confirm ssl requirements from provider are satisfied
- Run `python scripts/init_deploy.py` after changing DB credentials to ensure tables are present
