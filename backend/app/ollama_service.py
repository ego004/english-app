import json
from typing import Any

import requests

from .config import settings


def _fallback_response(task: str, text: str) -> str:
    if task == "grammar":
        return json.dumps(
            {
                "corrected_text": text.strip(),
                "explanation": "Ollama unavailable. Returning safe fallback without changes.",
            }
        )
    if task == "conversation":
        return json.dumps(
            {
                "reply": "Great effort! Tell me one thing you did today in English.",
                "tip": "Use short, clear sentences with subject + verb + object.",
            }
        )
    if task == "lesson_generation":
        return json.dumps(
            {
                "title": f"{text.title()} Practice Lesson",
                "metadata": {
                    "age_band": "16-21",
                    "skill_level": "Intermediate",
                    "topic": text,
                    "goal": "Improve practical communication confidence",
                    "duration_minutes": 25,
                },
                "content": {
                    "warmup": ["Share one personal experience about the topic in 3 lines."],
                    "explanation": "Focus on sentence clarity, useful vocabulary, and natural transitions.",
                    "guided_practice": ["Rewrite three simple sentences into stronger academic/professional ones."],
                    "production_task": "Write or say a short response using at least five target words.",
                    "quiz_questions": [
                        {
                            "type": "multiple-choice",
                            "question": "Which sentence is grammatically correct?",
                            "options": [
                                "She go to college every day.",
                                "She goes to college every day.",
                                "She going to college every day.",
                                "She gone to college every day.",
                            ],
                            "answer": "She goes to college every day.",
                        }
                    ],
                    "reflection": ["What did you improve today?", "What is your next step?"],
                },
            }
        )
    return json.dumps(
        {
            "score": 78,
            "strengths": ["Good effort", "Clear intent"],
            "improvements": ["Slow down on long words", "Add final consonant sounds"],
            "rewritten_sentence": text.strip(),
        }
    )


def _chat_request(base_url: str, model: str, prompt: str, api_key: str | None) -> str:
    headers: dict[str, str] = {"Content-Type": "application/json"}
    if api_key:
        headers["Authorization"] = f"Bearer {api_key}"

    response = requests.post(
        f"{base_url.rstrip('/')}/api/chat",
        headers=headers,
        json={
            "model": model,
            "messages": [{"role": "user", "content": prompt}],
            "stream": False,
        },
        timeout=settings.ollama_timeout_seconds,
    )
    response.raise_for_status()

    payload = response.json()
    message = payload.get("message", {}) if isinstance(payload, dict) else {}
    content = message.get("content") if isinstance(message, dict) else None
    if isinstance(content, str) and content.strip():
        return content
    return str(payload)


def call_ollama(prompt: str, task: str, source_text: str) -> str:
    api_key = (settings.ollama_api_key or "").strip()
    cloud_model = (settings.ollama_cloud_model or "").strip()
    default_model = (settings.ollama_model or "llama3").strip()

    model_candidates = [candidate for candidate in [cloud_model, default_model] if candidate]
    if not model_candidates:
        model_candidates = ["llama3"]

    if api_key:
        base_candidates = [candidate for candidate in [settings.ollama_base_url, "https://ollama.com"] if candidate]
        for base_url in base_candidates:
            for model in model_candidates:
                try:
                    return _chat_request(base_url, model, prompt, api_key)
                except Exception:
                    continue

    for model in model_candidates:
        try:
            return _chat_request(settings.ollama_host or "http://localhost:11434", model, prompt, None)
        except Exception:
            continue

    return _fallback_response(task, source_text)
