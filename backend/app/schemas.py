from datetime import datetime

from pydantic import BaseModel, Field


class HealthResponse(BaseModel):
    status: str
    app: str


class GrammarRequest(BaseModel):
    learner_id: str
    text: str = Field(min_length=1, max_length=1000)


class GrammarResponse(BaseModel):
    corrected_text: str
    explanation: str


class ConversationRequest(BaseModel):
    learner_id: str
    message: str = Field(min_length=1, max_length=1200)
    proficiency_level: str = "beginner"


class ConversationResponse(BaseModel):
    reply: str
    tip: str


class SpeakingRequest(BaseModel):
    learner_id: str
    prompt: str = Field(min_length=1, max_length=400)
    transcript: str = Field(min_length=1, max_length=1000)


class SpeakingResponse(BaseModel):
    score: int
    strengths: list[str]
    improvements: list[str]
    rewritten_sentence: str
    rubric: dict[str, int] | None = None


class InteractionOut(BaseModel):
    id: int
    learner_id: str
    feature: str
    user_input: str
    ai_output: str
    score: int | None
    created_at: datetime

    class Config:
        from_attributes = True


class RegisterRequest(BaseModel):
    email: str = Field(min_length=5, max_length=255)
    password: str = Field(min_length=6, max_length=128)
    name: str = Field(min_length=1, max_length=100)
    avatar: str = Field(default="fox", min_length=1, max_length=40)


class LoginRequest(BaseModel):
    email: str = Field(min_length=5, max_length=255)
    password: str = Field(min_length=6, max_length=128)


class UserResponse(BaseModel):
    id: int
    email: str
    name: str
    avatar: str


class AuthResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse


class UpdateProfileRequest(BaseModel):
    name: str = Field(min_length=1, max_length=100)
    avatar: str = Field(min_length=1, max_length=40)


class FeatureCount(BaseModel):
    feature: str
    count: int


class ParentSummaryResponse(BaseModel):
    learner_id: str | None = None
    total_interactions: int
    grammar_checks: int
    conversation_turns: int
    speaking_attempts: int
    average_speaking_score: float | None
    feature_breakdown: list[FeatureCount]
    recent_interactions: list[InteractionOut]


class LessonContent(BaseModel):
    explanation: str
    examples: list[str] = []


class LessonOut(BaseModel):
    code: str
    title: str
    subject: str
    level: str
    age_band: str
    description: str
    duration_minutes: int
    xp_reward: int
    completed: bool = False
    locked: bool = False


class LessonDetailOut(LessonOut):
    content: LessonContent


class CompleteLessonRequest(BaseModel):
    learner_id: str = Field(min_length=1, max_length=100)


class CompleteLessonResponse(BaseModel):
    code: str
    learner_id: str
    completed: bool
