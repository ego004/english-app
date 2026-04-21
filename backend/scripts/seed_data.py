import json
import sys
from datetime import datetime
from pathlib import Path

BACKEND_ROOT = Path(__file__).resolve().parents[1]
if str(BACKEND_ROOT) not in sys.path:
    sys.path.insert(0, str(BACKEND_ROOT))

from app.database import Base, SessionLocal, engine
from app.lesson_seed import seed_lessons_if_empty
from app.models import Interaction, Lesson, LessonCompletion, User
from app.security import get_password_hash


DEMO_USERS = [
    {
        "email": "student18@example.com",
        "name": "Ari Student",
        "avatar": "fox",
        "password": "Pass1234!",
        "learner_id": "user-student18",
    },
    {
        "email": "student20@example.com",
        "name": "Noor Student",
        "avatar": "owl",
        "password": "Pass1234!",
        "learner_id": "user-student20",
    },
]


def get_or_create_user(db, payload: dict) -> User:
    user = db.query(User).filter(User.email == payload["email"]).first()
    if user:
        return user

    user = User(
        email=payload["email"],
        name=payload["name"],
        avatar=payload["avatar"],
        password_hash=get_password_hash(payload["password"]),
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


def seed_completions_and_interactions(db, learner_id: str) -> None:
    lessons = db.query(Lesson).order_by(Lesson.order_index.asc(), Lesson.id.asc()).limit(3).all()
    for lesson in lessons:
        existing = (
            db.query(LessonCompletion)
            .filter(LessonCompletion.learner_id == learner_id, LessonCompletion.lesson_id == lesson.id)
            .first()
        )
        if not existing:
            db.add(LessonCompletion(learner_id=learner_id, lesson_id=lesson.id))

    interaction_payloads = [
        {
            "feature": "grammar",
            "user_input": "She go to school every day.",
            "ai_output": json.dumps(
                {
                    "corrected_text": "She goes to school every day.",
                    "explanation": "Use goes for third-person singular.",
                }
            ),
            "score": 82,
        },
        {
            "feature": "conversation",
            "user_input": "I want to improve speaking for interviews.",
            "ai_output": json.dumps(
                {
                    "reply": "Great goal. Practice concise STAR-style answers.",
                    "tip": "Use clear examples from your real experience.",
                }
            ),
            "score": 84,
        },
        {
            "feature": "speaking",
            "user_input": "Last weekend I visited my friend and we cooked dinner.",
            "ai_output": json.dumps(
                {
                    "score": 88,
                    "strengths": ["Clear structure", "Good vocabulary"],
                    "improvements": ["Stress multi-syllable words"],
                    "rewritten_sentence": "Last weekend, I visited my friend and we cooked dinner together.",
                }
            ),
            "score": 88,
        },
    ]

    for payload in interaction_payloads:
        exists = (
            db.query(Interaction)
            .filter(
                Interaction.learner_id == learner_id,
                Interaction.feature == payload["feature"],
                Interaction.user_input == payload["user_input"],
            )
            .first()
        )
        if exists:
            continue

        db.add(
            Interaction(
                learner_id=learner_id,
                feature=payload["feature"],
                user_input=payload["user_input"],
                ai_output=payload["ai_output"],
                score=payload["score"],
                created_at=datetime.utcnow(),
            )
        )

    db.commit()


def main() -> None:
    # Ensure required tables exist before inserting seed records.
    Base.metadata.create_all(bind=engine)

    db = SessionLocal()
    try:
        seed_lessons_if_empty(db)

        for payload in DEMO_USERS:
            get_or_create_user(db, payload)
            seed_completions_and_interactions(db, payload["learner_id"])

        print("Seed completed successfully (tables ensured + data seeded).")
        print("Demo accounts:")
        for payload in DEMO_USERS:
            print(f"- {payload['email']} / {payload['password']}")
    finally:
        db.close()


if __name__ == "__main__":
    main()
