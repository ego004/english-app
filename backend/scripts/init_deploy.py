import os
import sys
from pathlib import Path

BACKEND_ROOT = Path(__file__).resolve().parents[1]
if str(BACKEND_ROOT) not in sys.path:
    sys.path.insert(0, str(BACKEND_ROOT))

from app.database import Base, SessionLocal, engine
from app.lesson_seed import seed_lessons_if_empty
from app import models  # noqa: F401


def str_to_bool(value: str) -> bool:
    return value.strip().lower() in {"1", "true", "yes", "on"}


def main() -> None:
    Base.metadata.create_all(bind=engine)
    print("Database tables ensured.")

    should_seed_lessons = str_to_bool(os.getenv("SEED_LESSONS", "true"))
    if not should_seed_lessons:
        print("Skipping lesson seed because SEED_LESSONS is false.")
        return

    db = SessionLocal()
    try:
        seed_lessons_if_empty(db)
        print("Lesson seed completed (idempotent).")
    finally:
        db.close()


if __name__ == "__main__":
    main()
