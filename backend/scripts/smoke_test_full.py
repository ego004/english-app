import json
import time

import requests


BASE_URL = "http://localhost:8000"


def main() -> None:
    ts = int(time.time())
    email = f"demo_smoke_{ts}@example.com"
    password = "Pass1234!"
    name = "Demo Smoke User"
    avatar = "fox"

    report: dict[str, object] = {}

    # 1) Auth flow
    register = requests.post(
        f"{BASE_URL}/api/auth/register",
        json={
            "email": email,
            "password": password,
            "name": name,
            "avatar": avatar,
        },
        timeout=30,
    )
    report["register_status"] = register.status_code
    report["register_ok"] = register.ok

    register_payload = register.json() if register.ok else {}
    user = register_payload.get("user", {}) if isinstance(register_payload, dict) else {}
    user_id = user.get("id")
    learner_id = f"user-{user_id}" if user_id is not None else "user-0"
    report["user_id"] = user_id
    report["learner_id"] = learner_id

    login = requests.post(
        f"{BASE_URL}/api/auth/login",
        json={"email": email, "password": password},
        timeout=30,
    )
    report["login_status"] = login.status_code

    token = ""
    if login.ok:
        payload = login.json()
        if isinstance(payload, dict):
            token = str(payload.get("access_token") or "")

    me = requests.get(
        f"{BASE_URL}/api/auth/me",
        headers={"Authorization": f"Bearer {token}"},
        timeout=30,
    )
    report["me_status"] = me.status_code

    # 2) Lessons flow
    lessons = requests.get(
        f"{BASE_URL}/api/lessons",
        params={"learner_id": learner_id, "age_band": "11-15"},
        timeout=30,
    )
    report["lessons_status"] = lessons.status_code
    lesson_rows = lessons.json() if lessons.ok else []
    report["lessons_count"] = len(lesson_rows) if isinstance(lesson_rows, list) else 0

    first_lesson_code = lesson_rows[0].get("code") if isinstance(lesson_rows, list) and lesson_rows else None
    report["first_lesson"] = first_lesson_code

    if isinstance(first_lesson_code, str) and first_lesson_code:
        detail = requests.get(
            f"{BASE_URL}/api/lessons/{first_lesson_code}",
            params={"learner_id": learner_id},
            timeout=30,
        )
        complete = requests.post(
            f"{BASE_URL}/api/lessons/{first_lesson_code}/complete",
            json={"learner_id": learner_id},
            timeout=30,
        )
        report["lesson_detail_status"] = detail.status_code
        report["lesson_complete_status"] = complete.status_code

    # 3) AI flow
    grammar = requests.post(
        f"{BASE_URL}/api/grammar/correct",
        json={"learner_id": learner_id, "text": "She go to market yesterday"},
        timeout=60,
    )
    conversation = requests.post(
        f"{BASE_URL}/api/conversation/reply",
        json={
            "learner_id": learner_id,
            "message": "Tell me about healthy habits",
            "proficiency_level": "intermediate",
        },
        timeout=60,
    )
    speaking = requests.post(
        f"{BASE_URL}/api/speaking/feedback",
        json={
            "learner_id": learner_id,
            "prompt": "Talk about your weekend",
            "transcript": "I go park and played football with my friend",
        },
        timeout=60,
    )

    report["grammar_status"] = grammar.status_code
    report["conversation_status"] = conversation.status_code
    report["speaking_status"] = speaking.status_code

    grammar_payload = grammar.json() if grammar.ok else {}
    conversation_payload = conversation.json() if conversation.ok else {}
    speaking_payload = speaking.json() if speaking.ok else {}

    report["grammar_preview"] = str(grammar_payload.get("corrected_text", ""))[:90]
    report["conversation_preview"] = str(conversation_payload.get("reply", ""))[:90]
    report["speaking_score"] = speaking_payload.get("score")
    report["ai_fallback_detected"] = {
        "grammar": "Ollama unavailable" in str(grammar_payload.get("explanation", "")),
        "conversation": "Great effort! Tell me one thing you did today in English." in str(conversation_payload.get("reply", "")),
        "speaking": speaking_payload.get("strengths") == ["Good effort", "Clear intent"],
    }

    # 4) Progress flow
    progress = requests.get(
        f"{BASE_URL}/api/progress/{learner_id}",
        params={"limit": 20},
        timeout=30,
    )
    parent_summary = requests.get(
        f"{BASE_URL}/api/parent/summary",
        params={"learner_id": learner_id, "limit": 50},
        timeout=30,
    )

    report["progress_status"] = progress.status_code
    report["progress_count"] = len(progress.json()) if progress.ok else None
    report["parent_summary_status"] = parent_summary.status_code
    report["parent_total_interactions"] = (
        parent_summary.json().get("total_interactions") if parent_summary.ok else None
    )

    print(json.dumps(report, indent=2))


if __name__ == "__main__":
    main()
