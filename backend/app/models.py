from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, Integer, String, Text, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column

from .database import Base


class Interaction(Base):
    __tablename__ = "interactions"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    learner_id: Mapped[str] = mapped_column(String(100), index=True)
    feature: Mapped[str] = mapped_column(String(40), index=True)
    user_input: Mapped[str] = mapped_column(Text)
    ai_output: Mapped[str] = mapped_column(Text)
    score: Mapped[int | None] = mapped_column(Integer, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True)
    password_hash: Mapped[str] = mapped_column(String(255))
    name: Mapped[str] = mapped_column(String(100), default="Learner")
    avatar: Mapped[str] = mapped_column(String(40), default="fox")
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)


class Lesson(Base):
    __tablename__ = "lessons"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    code: Mapped[str] = mapped_column(String(80), unique=True, index=True)
    title: Mapped[str] = mapped_column(String(160))
    subject: Mapped[str] = mapped_column(String(40), index=True)
    level: Mapped[str] = mapped_column(String(30), index=True)
    age_band: Mapped[str] = mapped_column(String(20), index=True)
    order_index: Mapped[int] = mapped_column(Integer, default=0)
    description: Mapped[str] = mapped_column(Text)
    duration_minutes: Mapped[int] = mapped_column(Integer, default=10)
    xp_reward: Mapped[int] = mapped_column(Integer, default=50)
    content_json: Mapped[str] = mapped_column(Text, default="{}")
    is_published: Mapped[int] = mapped_column(Integer, default=1)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)


class LessonCompletion(Base):
    __tablename__ = "lesson_completions"
    __table_args__ = (UniqueConstraint("learner_id", "lesson_id", name="uq_learner_lesson"),)

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    learner_id: Mapped[str] = mapped_column(String(100), index=True)
    lesson_id: Mapped[int] = mapped_column(ForeignKey("lessons.id"), index=True)
    completed_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
