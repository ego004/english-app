# English App (College Project MVP)

AI-powered English learning web app for students (kids to young adults) focused on **conversation**, **pronunciation feedback**, and **grammar improvement**.

- Frontend: Next.js (Node)
- Backend: FastAPI
- AI: Ollama API via LangChain (`langchain_ollama.ChatOllama`)
- Database: SQLite
- Auth: Email + password (JWT) with browser profile fallback

## Project Phases

### Phase 1 — MVP (completed in this setup)
- Presentable multi-page frontend (dashboard, lessons, quizzes, speaking, settings)
- Email/password auth (signup + login) with JWT in FastAPI
- Learner profile persistence in browser and backend user table
- FastAPI backend with SQLite interaction history
- LangChain `ChatOllama` integration endpoints:
  - Grammar correction
  - Conversation reply
  - Speaking feedback
- Speaking page wired to backend AI endpoint

### Phase 2 — Academic polish (completed)
- Grammar practice page connected to `/api/grammar/correct`
- Conversation chatbot page connected to `/api/conversation/reply`
- Progress page showing learner history from `/api/progress/{learner_id}`
- Age-band difficulty presets (6-10, 11-15, 16-21)

### Phase 3 — Demo quality boost (completed except deployment)
- Voice-to-text integration in speaking flow (browser speech recognition)
- Better rubric scoring (fluency, pronunciation, grammar, vocabulary)
- Teacher/parent summary view from aggregated SQLite data
- Optional deployment (Render + Vercel)

## Run Locally

## 1) Start Ollama
Use your authenticated Ollama API endpoint via env values:

```bash
cd backend
copy .env.example .env
# edit .env and set OLLAMA_API_KEY
```

## 2) Run backend (FastAPI)

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

Health check: `http://localhost:8000/health`

## 3) Run frontend (Next.js)

```bash
npm install
set NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
npm run dev
```

Open `http://localhost:3000`

## Current AI Endpoints

- `POST /api/grammar/correct`
- `POST /api/conversation/reply`
- `POST /api/speaking/feedback`
- `GET /api/progress/{learner_id}`
- `GET /api/parent/summary?learner_id=...`
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `PUT /api/auth/me`

## Demo Flow (for non-technical audience)
1. Open the landing page and dashboard.
2. Go to Speaking Practice.
3. Select any prompt, record with mic, or type transcript manually.
4. Show AI score + strengths + improvements.
5. Open Settings and change name/avatar.
6. Sign up/login and show profile persistence in settings.

## Notes
- If Ollama API is unreachable, backend returns safe fallback responses so your demo still works.
- Data is stored in local SQLite file: `backend/english_app.db`.
