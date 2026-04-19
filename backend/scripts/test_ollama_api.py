import json
import os
import pathlib
import sys
import textwrap

import requests

BACKEND_ROOT = pathlib.Path(__file__).resolve().parents[1]
if str(BACKEND_ROOT) not in sys.path:
    sys.path.insert(0, str(BACKEND_ROOT))

from app.config import settings


def short(value: str, length: int = 220) -> str:
    value = (value or "").replace("\n", "\\n")
    return value[:length]


def call_chat(base_url: str, model: str, api_key: str, prompt: str) -> dict:
    url = f"{base_url.rstrip('/')}/api/chat"
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
    }
    payload = {
        "model": model,
        "messages": [{"role": "user", "content": prompt}],
        "stream": False,
    }

    try:
        response = requests.post(url, headers=headers, json=payload, timeout=30)
        body_text = response.text or ""
        parsed = None
        try:
            parsed = response.json()
        except Exception:
            parsed = None

        message = ""
        if isinstance(parsed, dict):
            msg = parsed.get("message")
            if isinstance(msg, dict):
                content = msg.get("content")
                if isinstance(content, str):
                    message = content

        return {
            "url": url,
            "status": response.status_code,
            "ok": response.ok,
            "response_text_preview": short(body_text),
            "assistant_message_preview": short(message),
        }
    except Exception as error:
        return {
            "url": url,
            "status": "EXCEPTION",
            "ok": False,
            "response_text_preview": short(str(error)),
            "assistant_message_preview": "",
        }


def call_tags(base_url: str, api_key: str) -> dict:
    url = f"{base_url.rstrip('/')}/api/tags"
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
    }

    try:
        response = requests.get(url, headers=headers, timeout=20)
        names = []
        try:
            payload = response.json()
            models = payload.get("models", []) if isinstance(payload, dict) else []
            names = [m.get("name") for m in models if isinstance(m, dict) and isinstance(m.get("name"), str)]
        except Exception:
            names = []

        return {
            "url": url,
            "status": response.status_code,
            "ok": response.ok,
            "model_count": len(names),
            "model_sample": names[:8],
            "response_text_preview": short(response.text or ""),
        }
    except Exception as error:
        return {
            "url": url,
            "status": "EXCEPTION",
            "ok": False,
            "model_count": 0,
            "model_sample": [],
            "response_text_preview": short(str(error)),
        }


def main() -> None:
    api_key = (settings.ollama_api_key or "").strip()
    cloud_model = (settings.ollama_cloud_model or "").strip()
    default_model = (settings.ollama_model or "llama3").strip()

    model = cloud_model or default_model
    prompt = "Why is the sky blue?"

    print("=== OLLAMA DIAGNOSTIC ===")
    print(f"api_key_set: {bool(api_key)}")
    print(f"api_key_prefix: {api_key[:6]}..." if api_key else "api_key_prefix: <missing>")
    print(f"selected_model: {model}")
    print()

    if not api_key:
        print("OLLAMA_API_KEY missing in environment.")
        return

    bases = [
        "https://ollama.com",
        "https://api.ollama.com",
    ]

    report = {
        "env": {
            "OLLAMA_MODEL": default_model,
            "OLLAMA_CLOUD_MODEL": cloud_model,
        },
        "checks": [],
    }

    for base in bases:
        report["checks"].append({
            "type": "tags",
            **call_tags(base, api_key),
        })
        report["checks"].append({
            "type": "chat",
            **call_chat(base, model, api_key, prompt),
        })

    print(textwrap.dedent("""
    Notes:
    - This script uses the same request shape as your curl (`/api/chat`, Bearer token, stream=false).
    - If `/api/tags` succeeds but `/api/chat` is 401, token is recognized but not authorized for inference.
    """).strip())
    print()
    print(json.dumps(report, indent=2))


if __name__ == "__main__":
    main()
