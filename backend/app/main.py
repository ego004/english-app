import json
import re

from fastapi import Depends, FastAPI, Header, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from .config import settings
from .database import Base, SessionLocal, engine, get_db
from .lesson_seed import seed_lessons_if_empty
from .models import Interaction, Lesson, LessonCompletion, User
from .ollama_service import call_ollama
from .schemas import (
    AuthResponse,
    CompleteLessonRequest,
    CompleteLessonResponse,
    ConversationRequest,
    ConversationResponse,
    FeatureCount,
    GrammarRequest,
    GrammarResponse,
    GenerateLessonRequest,
    GenerateLessonResponse,
    HealthResponse,
    InteractionOut,
    LessonDetailOut,
    LessonOut,
    LoginRequest,
    ParentSummaryResponse,
    RegisterRequest,
    SpeakingRequest,
    SpeakingResponse,
    UpdateProfileRequest,
    UserResponse,
)
from .security import (
    create_access_token,
    decode_token,
    get_password_hash,
    validate_password_strength,
    verify_password,
)

app = FastAPI(title=settings.app_name)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_origin_regex=settings.cors_allowed_origin_regex,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def on_startup():
    if settings.app_env.lower() == "prod" and settings.jwt_secret == "change-me-in-env":
        raise RuntimeError("JWT_SECRET must be set to a secure value in production")

    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        seed_lessons_if_empty(db)
    finally:
        db.close()


@app.get("/health", response_model=HealthResponse)
def health_check() -> HealthResponse:
    return HealthResponse(status="ok", app=settings.app_name)


def parse_json_from_model(raw: str) -> dict:
    try:
        return json.loads(raw)
    except json.JSONDecodeError:
        pass

    match = re.search(r"\{[\s\S]*\}", raw)
    if match:
        try:
            return json.loads(match.group(0))
        except json.JSONDecodeError:
            return {}

    return {}


def parse_lesson_content(raw: str) -> dict:
    try:
        parsed = json.loads(raw)
        if isinstance(parsed, dict):
            return parsed
    except Exception:
        return {"explanation": "Lesson content unavailable.", "examples": []}
    return {"explanation": "Lesson content unavailable.", "examples": []}


def build_generated_lesson_fallback(payload: GenerateLessonRequest) -> dict:
    goal = payload.learning_goal or "Improve confidence using this topic in real conversations."
    return {
        "title": f"{payload.current_topic.title()} Mastery",
        "metadata": {
            "age_band": payload.age_band,
            "skill_level": payload.skill_level,
            "topic": payload.current_topic,
            "goal": goal,
            "duration_minutes": 25,
        },
        "content": {
            "warmup": [
                f"Describe your recent experience related to {payload.current_topic} in 3 sentences.",
                "List 5 key words you already know about this topic.",
            ],
            "explanation": f"This lesson focuses on {payload.current_topic} with level-appropriate vocabulary and grammar.",
            "guided_practice": [
                "Rewrite one sentence from simple to more advanced form.",
                "Pair each key word with a context sentence.",
            ],
            "production_task": f"Create a short paragraph about {payload.current_topic} that matches your goal: {goal}",
            "quiz_questions": [
                {
                    "type": "multiple-choice",
                    "question": "Choose the sentence with the most natural phrasing.",
                    "options": [
                        "I am very interest in this topic.",
                        "I am very interested in this topic.",
                        "I very interested this topic.",
                        "I am interest to this topic.",
                    ],
                    "answer": "I am very interested in this topic.",
                }
            ],
            "reflection": [
                "What was easiest in this lesson?",
                "What will you practice next?",
            ],
        },
    }


def parse_generated_lesson(raw: str, payload: GenerateLessonRequest) -> dict:
    parsed = parse_json_from_model(raw)
    if not isinstance(parsed, dict) or not parsed:
        return build_generated_lesson_fallback(payload)

    if "title" not in parsed or "content" not in parsed:
        return build_generated_lesson_fallback(payload)

    return parsed


def get_current_user(
    db: Session = Depends(get_db),
    authorization: str | None = Header(default=None),
) -> User:
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Missing or invalid authorization token")

    token = authorization.replace("Bearer ", "", 1).strip()
    subject = decode_token(token)
    if not subject or not subject.startswith("user:"):
        raise HTTPException(status_code=401, detail="Invalid token")

    user_id = subject.replace("user:", "", 1)
    if not user_id.isdigit():
        raise HTTPException(status_code=401, detail="Invalid token subject")

    user = db.query(User).filter(User.id == int(user_id)).first()
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    return user


@app.post("/api/auth/register", response_model=AuthResponse)
def register(payload: RegisterRequest, db: Session = Depends(get_db)) -> AuthResponse:
    password_error = validate_password_strength(payload.password)
    if password_error:
        raise HTTPException(status_code=400, detail=password_error)

    existing = db.query(User).filter(User.email == payload.email.lower().strip()).first()
    if existing:
        raise HTTPException(status_code=409, detail="Email already registered")

    user = User(
        email=payload.email.lower().strip(),
        password_hash=get_password_hash(payload.password),
        name=payload.name.strip(),
        avatar=payload.avatar,
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    token = create_access_token(f"user:{user.id}")
    return AuthResponse(
        access_token=token,
        user=UserResponse(id=user.id, email=user.email, name=user.name, avatar=user.avatar),
    )


@app.post("/api/auth/login", response_model=AuthResponse)
def login(payload: LoginRequest, db: Session = Depends(get_db)) -> AuthResponse:
    user = db.query(User).filter(User.email == payload.email.lower().strip()).first()
    if not user or not verify_password(payload.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    token = create_access_token(f"user:{user.id}")
    return AuthResponse(
        access_token=token,
        user=UserResponse(id=user.id, email=user.email, name=user.name, avatar=user.avatar),
    )


@app.get("/api/auth/me", response_model=UserResponse)
def me(current_user: User = Depends(get_current_user)) -> UserResponse:
    return UserResponse(
        id=current_user.id,
        email=current_user.email,
        name=current_user.name,
        avatar=current_user.avatar,
    )


@app.put("/api/auth/me", response_model=UserResponse)
def update_me(payload: UpdateProfileRequest, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)) -> UserResponse:
    current_user.name = payload.name.strip()
    current_user.avatar = payload.avatar
    db.add(current_user)
    db.commit()
    db.refresh(current_user)
    return UserResponse(
        id=current_user.id,
        email=current_user.email,
        name=current_user.name,
        avatar=current_user.avatar,
    )


@app.post("/api/grammar/correct", response_model=GrammarResponse)
def correct_grammar(payload: GrammarRequest, db: Session = Depends(get_db)) -> GrammarResponse:
    prompt = (
        "You are an English grammar tutor for students. Return strict JSON with keys: "
        "corrected_text and explanation. Keep explanation simple and encouraging. "
        f"Student text: {payload.text}"
    )
    raw = call_ollama(prompt, "grammar", payload.text)
    parsed = parse_json_from_model(raw)

    result = GrammarResponse(
        corrected_text=parsed.get("corrected_text", payload.text),
        explanation=parsed.get("explanation", "Good try! Keep practicing."),
    )

    db.add(
        Interaction(
            learner_id=payload.learner_id,
            feature="grammar",
            user_input=payload.text,
            ai_output=json.dumps(result.model_dump()),
        )
    )
    db.commit()
    return result


@app.post("/api/conversation/reply", response_model=ConversationResponse)
def conversation_reply(payload: ConversationRequest, db: Session = Depends(get_db)) -> ConversationResponse:
    prompt = (
        "You are a friendly English conversation coach for age 8-21. Return strict JSON with keys "
        "reply and tip. Keep language according to level: "
        f"{payload.proficiency_level}. Student message: {payload.message}"
    )
    raw = call_ollama(prompt, "conversation", payload.message)
    parsed = parse_json_from_model(raw)

    result = ConversationResponse(
        reply=parsed.get("reply", "Nice! Can you tell me more?"),
        tip=parsed.get("tip", "Use complete sentences."),
    )

    db.add(
        Interaction(
            learner_id=payload.learner_id,
            feature="conversation",
            user_input=payload.message,
            ai_output=json.dumps(result.model_dump()),
        )
    )
    db.commit()
    return result


@app.post("/api/speaking/feedback", response_model=SpeakingResponse)
def speaking_feedback(payload: SpeakingRequest, db: Session = Depends(get_db)) -> SpeakingResponse:
    prompt = (
        "You are an English pronunciation coach. Analyze transcript against prompt and return strict JSON with keys: "
        "score (0-100), fluency (0-100), pronunciation (0-100), grammar (0-100), vocabulary (0-100), "
        "strengths (array), improvements (array), rewritten_sentence (string). "
        f"Prompt: {payload.prompt}. Transcript: {payload.transcript}"
    )
    raw = call_ollama(prompt, "speaking", payload.transcript)
    parsed = parse_json_from_model(raw)

    score = int(parsed.get("score", 75))
    score = max(0, min(score, 100))

    rubric = {
        "fluency": int(parsed.get("fluency", score)),
        "pronunciation": int(parsed.get("pronunciation", score)),
        "grammar": int(parsed.get("grammar", score)),
        "vocabulary": int(parsed.get("vocabulary", score)),
    }
    rubric = {k: max(0, min(v, 100)) for k, v in rubric.items()}

    result = SpeakingResponse(
        score=score,
        strengths=parsed.get("strengths", ["Clear effort"]),
        improvements=parsed.get("improvements", ["Practice sentence rhythm"]),
        rewritten_sentence=parsed.get("rewritten_sentence", payload.transcript),
        rubric=rubric,
    )

    db.add(
        Interaction(
            learner_id=payload.learner_id,
            feature="speaking",
            user_input=payload.transcript,
            ai_output=json.dumps(result.model_dump()),
            score=result.score,
        )
    )
    db.commit()
    return result


@app.get("/api/parent/summary", response_model=ParentSummaryResponse)
def parent_summary(
    learner_id: str | None = Query(default=None),
    limit: int = Query(default=100, ge=1, le=500),
    db: Session = Depends(get_db),
) -> ParentSummaryResponse:
    query = db.query(Interaction)
    if learner_id:
        query = query.filter(Interaction.learner_id == learner_id)

    rows = query.order_by(Interaction.created_at.desc()).limit(limit).all()

    grammar_checks = sum(1 for row in rows if row.feature == "grammar")
    conversation_turns = sum(1 for row in rows if row.feature == "conversation")
    speaking_rows = [row for row in rows if row.feature == "speaking"]
    speaking_attempts = len(speaking_rows)

    average_speaking_score = None
    if speaking_rows:
        valid_scores = [row.score for row in speaking_rows if row.score is not None]
        if valid_scores:
            average_speaking_score = round(sum(valid_scores) / len(valid_scores), 2)

    feature_map: dict[str, int] = {}
    for row in rows:
        feature_map[row.feature] = feature_map.get(row.feature, 0) + 1

    feature_breakdown = [FeatureCount(feature=feature, count=count) for feature, count in feature_map.items()]
    feature_breakdown.sort(key=lambda item: item.count, reverse=True)

    return ParentSummaryResponse(
        learner_id=learner_id,
        total_interactions=len(rows),
        grammar_checks=grammar_checks,
        conversation_turns=conversation_turns,
        speaking_attempts=speaking_attempts,
        average_speaking_score=average_speaking_score,
        feature_breakdown=feature_breakdown,
        recent_interactions=rows[:15],
    )


@app.get("/api/progress/{learner_id}", response_model=list[InteractionOut])
def learner_progress(
    learner_id: str,
    limit: int = Query(default=20, ge=1, le=100),
    db: Session = Depends(get_db),
):
    rows = (
        db.query(Interaction)
        .filter(Interaction.learner_id == learner_id)
        .order_by(Interaction.created_at.desc())
        .limit(limit)
        .all()
    )
    return rows


@app.get("/api/lessons", response_model=list[LessonOut])
def list_lessons(
    learner_id: str,
    age_band: str = Query(default="11-15"),
    level: str | None = Query(default=None),
    subject: str | None = Query(default=None),
    db: Session = Depends(get_db),
):
    query = db.query(Lesson).filter(Lesson.is_published == 1, Lesson.age_band == age_band)
    if level:
        query = query.filter(Lesson.level == level)
    if subject:
        query = query.filter(Lesson.subject == subject)

    lessons = query.order_by(Lesson.order_index.asc(), Lesson.id.asc()).all()
    completed_ids = {
        row.lesson_id
        for row in db.query(LessonCompletion).filter(LessonCompletion.learner_id == learner_id).all()
    }

    results: list[LessonOut] = []
    has_seen_locked = False
    for lesson in lessons:
        completed = lesson.id in completed_ids
        locked = has_seen_locked and not completed
        if not completed:
            has_seen_locked = True

        results.append(
            LessonOut(
                code=lesson.code,
                title=lesson.title,
                subject=lesson.subject,
                level=lesson.level,
                age_band=lesson.age_band,
                description=lesson.description,
                duration_minutes=lesson.duration_minutes,
                xp_reward=lesson.xp_reward,
                completed=completed,
                locked=locked,
            )
        )

    return results


@app.get("/api/lessons/{lesson_code}", response_model=LessonDetailOut)
def lesson_detail(
    lesson_code: str,
    learner_id: str,
    db: Session = Depends(get_db),
):
    lesson = db.query(Lesson).filter(Lesson.code == lesson_code, Lesson.is_published == 1).first()
    if not lesson:
        raise HTTPException(status_code=404, detail="Lesson not found")

    completion = (
        db.query(LessonCompletion)
        .filter(LessonCompletion.learner_id == learner_id, LessonCompletion.lesson_id == lesson.id)
        .first()
    )

    return LessonDetailOut(
        code=lesson.code,
        title=lesson.title,
        subject=lesson.subject,
        level=lesson.level,
        age_band=lesson.age_band,
        description=lesson.description,
        duration_minutes=lesson.duration_minutes,
        xp_reward=lesson.xp_reward,
        completed=completion is not None,
        locked=False,
        content=parse_lesson_content(lesson.content_json),
    )


@app.post("/api/lessons/{lesson_code}/complete", response_model=CompleteLessonResponse)
def complete_lesson(
    lesson_code: str,
    payload: CompleteLessonRequest,
    db: Session = Depends(get_db),
):
    lesson = db.query(Lesson).filter(Lesson.code == lesson_code, Lesson.is_published == 1).first()
    if not lesson:
        raise HTTPException(status_code=404, detail="Lesson not found")

    existing = (
        db.query(LessonCompletion)
        .filter(LessonCompletion.learner_id == payload.learner_id, LessonCompletion.lesson_id == lesson.id)
        .first()
    )
    if existing is None:
        db.add(LessonCompletion(learner_id=payload.learner_id, lesson_id=lesson.id))
        db.add(
            Interaction(
                learner_id=payload.learner_id,
                feature="lesson",
                user_input=lesson.code,
                ai_output=json.dumps({"status": "completed", "xp_reward": lesson.xp_reward}),
                score=lesson.xp_reward,
            )
        )
        db.commit()

    return CompleteLessonResponse(code=lesson.code, learner_id=payload.learner_id, completed=True)


@app.post("/api/lessons/generate-json", response_model=GenerateLessonResponse)
def generate_lesson_json(payload: GenerateLessonRequest, db: Session = Depends(get_db)) -> GenerateLessonResponse:
    if not payload.learning_goal or not payload.learning_goal.strip():
        return GenerateLessonResponse(
            needs_user_input=True,
            question_for_user=(
                "What do you want to learn specifically in this topic? "
                "For example: speaking fluently, writing essays, interview answers, or exam prep."
            ),
            lesson=None,
        )

    system_prompt = (
        "You are an expert English curriculum designer. "
        "Return strict JSON only. No markdown. "
        "Build one practical lesson tailored to learner profile. "
        "JSON shape required: "
        "{"
        "title:string, "
        "metadata:{age_band:string, skill_level:string, topic:string, goal:string, duration_minutes:number}, "
        "content:{"
        "warmup:string[], explanation:string, guided_practice:string[], production_task:string, "
        "quiz_questions:array, reflection:string[]"
        "}"
        "}. "
        "Keep language level-appropriate and age-appropriate."
    )
    user_prompt = (
        f"Learner ID: {payload.learner_id}\n"
        f"Age band: {payload.age_band}\n"
        f"Skill level: {payload.skill_level}\n"
        f"Current topic: {payload.current_topic}\n"
        f"Learning goal: {payload.learning_goal}\n"
        f"Interests: {', '.join(payload.interests) if payload.interests else 'none provided'}\n"
        "Generate the lesson now."
    )

    raw = call_ollama(f"{system_prompt}\n\n{user_prompt}", "lesson_generation", payload.current_topic)
    lesson = parse_generated_lesson(raw, payload)

    db.add(
        Interaction(
            learner_id=payload.learner_id,
            feature="lesson_generation",
            user_input=json.dumps(payload.model_dump()),
            ai_output=json.dumps(lesson),
        )
    )
    db.commit()

    return GenerateLessonResponse(needs_user_input=False, question_for_user=None, lesson=lesson)
