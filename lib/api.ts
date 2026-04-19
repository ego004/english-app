const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000"

function extractApiErrorMessage(errorBody: unknown, fallback: string): string {
  if (!errorBody || typeof errorBody !== "object") {
    return fallback
  }

  const detail = (errorBody as { detail?: unknown }).detail

  if (typeof detail === "string" && detail.trim()) {
    return detail
  }

  if (Array.isArray(detail)) {
    const parts = detail
      .map((item) => {
        if (typeof item === "string") {
          return item
        }
        if (item && typeof item === "object") {
          const message = (item as { msg?: unknown }).msg
          if (typeof message === "string") {
            return message
          }
        }
        return ""
      })
      .filter(Boolean)

    if (parts.length > 0) {
      return parts.join("; ")
    }
  }

  if (detail && typeof detail === "object") {
    const message = (detail as { message?: unknown; msg?: unknown }).message ?? (detail as { msg?: unknown }).msg
    if (typeof message === "string" && message.trim()) {
      return message
    }
  }

  const message = (errorBody as { message?: unknown; error?: unknown }).message ?? (errorBody as { error?: unknown }).error
  if (typeof message === "string" && message.trim()) {
    return message
  }

  return fallback
}

export type AuthUser = {
  id: number
  email: string
  name: string
  avatar: string
}

export type AuthResponse = {
  access_token: string
  token_type: string
  user: AuthUser
}

export type SpeakingFeedbackResponse = {
  score: number
  strengths: string[]
  improvements: string[]
  rewritten_sentence: string
  rubric?: {
    fluency: number
    pronunciation: number
    grammar: number
    vocabulary: number
  }
}

export type GrammarCorrectionResponse = {
  corrected_text: string
  explanation: string
}

export type ConversationReplyResponse = {
  reply: string
  tip: string
}

export type ProgressInteraction = {
  id: number
  learner_id: string
  feature: string
  user_input: string
  ai_output: string
  score: number | null
  created_at: string
}

export type ParentSummaryResponse = {
  learner_id?: string
  total_interactions: number
  grammar_checks: number
  conversation_turns: number
  speaking_attempts: number
  average_speaking_score: number | null
  feature_breakdown: { feature: string; count: number }[]
  recent_interactions: ProgressInteraction[]
}

export type LessonSummary = {
  code: string
  title: string
  subject: string
  level: "Beginner" | "Intermediate" | "Advanced"
  age_band: "6-10" | "11-15" | "16-21"
  description: string
  duration_minutes: number
  xp_reward: number
  completed: boolean
  locked: boolean
}

export type LessonDetail = LessonSummary & {
  content: {
    explanation: string
    examples: string[]
  }
}

export async function getSpeakingFeedback(payload: {
  learner_id: string
  prompt: string
  transcript: string
}): Promise<SpeakingFeedbackResponse> {
  const response = await fetch(`${API_BASE}/api/speaking/feedback`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new Error(`Speaking feedback failed with status ${response.status}`)
  }

  return response.json()
}

export async function getGrammarCorrection(payload: {
  learner_id: string
  text: string
}): Promise<GrammarCorrectionResponse> {
  const response = await fetch(`${API_BASE}/api/grammar/correct`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new Error(`Grammar correction failed with status ${response.status}`)
  }

  return response.json()
}

export async function getConversationReply(payload: {
  learner_id: string
  message: string
  proficiency_level: string
}): Promise<ConversationReplyResponse> {
  const response = await fetch(`${API_BASE}/api/conversation/reply`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new Error(`Conversation reply failed with status ${response.status}`)
  }

  return response.json()
}

export async function getLearnerProgress(learnerId: string, limit = 50): Promise<ProgressInteraction[]> {
  const response = await fetch(`${API_BASE}/api/progress/${encodeURIComponent(learnerId)}?limit=${limit}`)

  if (!response.ok) {
    throw new Error(`Progress fetch failed with status ${response.status}`)
  }

  return response.json()
}

export async function getParentSummary(learnerId?: string, limit = 100): Promise<ParentSummaryResponse> {
  const params = new URLSearchParams()
  if (learnerId) {
    params.set("learner_id", learnerId)
  }
  params.set("limit", String(limit))

  const response = await fetch(`${API_BASE}/api/parent/summary?${params.toString()}`)

  if (!response.ok) {
    throw new Error(`Parent summary fetch failed with status ${response.status}`)
  }

  return response.json()
}

export async function registerWithEmail(payload: {
  email: string
  password: string
  name: string
  avatar: string
}): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(extractApiErrorMessage(error, "Registration failed"))
  }

  return response.json()
}

export async function loginWithEmail(payload: {
  email: string
  password: string
}): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(extractApiErrorMessage(error, "Login failed"))
  }

  return response.json()
}

export async function getCurrentUser(token: string): Promise<AuthUser> {
  const response = await fetch(`${API_BASE}/api/auth/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    throw new Error("Failed to fetch current user")
  }

  return response.json()
}

export async function getLessons(payload: {
  learner_id: string
  age_band: "6-10" | "11-15" | "16-21"
  subject?: string
  level?: "Beginner" | "Intermediate" | "Advanced"
}): Promise<LessonSummary[]> {
  const params = new URLSearchParams()
  params.set("learner_id", payload.learner_id)
  params.set("age_band", payload.age_band)
  if (payload.subject && payload.subject !== "all") {
    params.set("subject", payload.subject)
  }
  if (payload.level && payload.level !== "all") {
    params.set("level", payload.level)
  }

  const response = await fetch(`${API_BASE}/api/lessons?${params.toString()}`)
  if (!response.ok) {
    throw new Error(`Lessons fetch failed with status ${response.status}`)
  }
  return response.json()
}

export async function getLessonByCode(payload: { learner_id: string; lesson_code: string }): Promise<LessonDetail> {
  const params = new URLSearchParams()
  params.set("learner_id", payload.learner_id)

  const response = await fetch(`${API_BASE}/api/lessons/${encodeURIComponent(payload.lesson_code)}?${params.toString()}`)
  if (!response.ok) {
    throw new Error(`Lesson fetch failed with status ${response.status}`)
  }
  return response.json()
}

export async function completeLesson(payload: {
  learner_id: string
  lesson_code: string
}): Promise<{ completed: boolean }> {
  const response = await fetch(`${API_BASE}/api/lessons/${encodeURIComponent(payload.lesson_code)}/complete`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ learner_id: payload.learner_id }),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(extractApiErrorMessage(error, "Lesson completion failed"))
  }

  return response.json()
}

export async function updateCurrentUser(
  token: string,
  payload: { name: string; avatar: string }
): Promise<AuthUser> {
  const response = await fetch(`${API_BASE}/api/auth/me`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new Error("Failed to update user profile")
  }

  return response.json()
}
