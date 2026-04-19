# Demo Instructions

This guide is for running a stable end-to-end demo of the English learning app.

## 1) Prerequisites

- Python 3.11+ (or compatible with your current backend venv)
- Node.js 18+
- Ollama Cloud API key in `backend/.env`

Required `backend/.env` values:

- `OLLAMA_API_KEY=...`
- `OLLAMA_BASE_URL=https://api.ollama.com`
- `OLLAMA_CLOUD_MODEL=...` (example: `gemini-3-flash-preview`)
- `OLLAMA_MODEL=llama3` (fallback/default)

## 2) Install Dependencies

Backend:

```powershell
Set-Location backend
if (!(Test-Path .venv)) { python -m venv .venv }
.\.venv\Scripts\python -m pip install --upgrade pip
.\.venv\Scripts\pip install -r requirements.txt
```

Frontend:

```powershell
Set-Location ..
npm install
```

## 3) Start Backend

```powershell
Set-Location backend
.\.venv\Scripts\python -m uvicorn app.main:app --reload --port 8000
```

Health check:

- Open: `http://localhost:8000/health`

## 4) Start Frontend

In a second terminal:

```powershell
Set-Location c:\Users\ego\projects\english-app
$env:NEXT_PUBLIC_API_BASE_URL='http://localhost:8000'
npm run dev
```

Open app:

- `http://localhost:3000`

## 5) Optional: Verify Ollama Cloud Directly

```powershell
Set-Location backend
.\.venv\Scripts\python .\scripts\test_ollama_api.py
```

Expected:

- `/api/tags` status `200`
- `/api/chat` status `200`

## 6) One-Command App Smoke Test

With backend running:

```powershell
Set-Location backend
.\.venv\Scripts\python .\scripts\smoke_test_full.py
```

Expected:

- `register_status`, `login_status`, `lessons_status`, `grammar_status`, `conversation_status`, `speaking_status` are `200`
- `ai_fallback_detected` should be all `false`

## 7) Suggested Demo Flow (5-8 minutes)

1. Sign up a new learner.
2. Open Dashboard and show stats loaded from real interactions.
3. Open Lessons and complete one lesson.
4. Open Grammar and run a correction.
5. Open Conversation and ask 1-2 prompts.
6. Open Speaking, record/type transcript, and generate feedback.
7. Open Progress and Parent Dashboard to show aggregated results.

## 8) Troubleshooting

- Frontend says port lock or duplicate dev server:
  - Close existing `next dev` process, restart frontend terminal.
- AI returns fallback text:
  - Re-check `backend/.env` API key/model.
  - Re-run `scripts/test_ollama_api.py`.
- Backend import errors when starting from root:
  - Run backend command from `backend/` directory.
