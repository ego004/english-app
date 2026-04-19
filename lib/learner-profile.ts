export type LearnerProfile = {
  learnerId: string
  name: string
  avatar: string
  ageBand: "6-10" | "11-15" | "16-21"
  proficiencyLevel: "beginner" | "intermediate" | "advanced"
}

const PROFILE_KEY = "english_app_profile"

function generateLearnerId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `learner-${crypto.randomUUID()}`
  }
  return `learner-${Date.now()}-${Math.floor(Math.random() * 100000)}`
}

const defaultProfile: LearnerProfile = {
  learnerId: "",
  name: "Alex",
  avatar: "fox",
  ageBand: "11-15",
  proficiencyLevel: "beginner",
}

export function getLearnerProfile(): LearnerProfile {
  if (typeof window === "undefined") {
    return { ...defaultProfile, learnerId: "server-placeholder" }
  }

  const raw = window.localStorage.getItem(PROFILE_KEY)
  if (raw) {
    try {
      const parsed = JSON.parse(raw) as Partial<LearnerProfile>
      if (parsed.learnerId) {
        return {
          learnerId: parsed.learnerId,
          name: parsed.name || defaultProfile.name,
          avatar: parsed.avatar || defaultProfile.avatar,
          ageBand: (parsed.ageBand as LearnerProfile["ageBand"]) || defaultProfile.ageBand,
          proficiencyLevel: (parsed.proficiencyLevel as LearnerProfile["proficiencyLevel"]) || defaultProfile.proficiencyLevel,
        }
      }
    } catch {
      // ignore parse errors and regenerate profile
    }
  }

  const created: LearnerProfile = { ...defaultProfile, learnerId: generateLearnerId() }
  window.localStorage.setItem(PROFILE_KEY, JSON.stringify(created))
  return created
}

export function saveLearnerProfile(update: Partial<LearnerProfile>): LearnerProfile {
  const current = getLearnerProfile()
  const next: LearnerProfile = {
    learnerId: current.learnerId,
    name: update.name || current.name,
    avatar: update.avatar || current.avatar,
    ageBand: update.ageBand || current.ageBand,
    proficiencyLevel: update.proficiencyLevel || current.proficiencyLevel,
  }
  if (typeof window !== "undefined") {
    window.localStorage.setItem(PROFILE_KEY, JSON.stringify(next))
  }
  return next
}

export function saveAuthenticatedProfile(user: { id: number; name: string; avatar: string }): LearnerProfile {
  const current = getLearnerProfile()
  const next: LearnerProfile = {
    learnerId: `user-${user.id}`,
    name: user.name,
    avatar: user.avatar,
    ageBand: current.ageBand,
    proficiencyLevel: current.proficiencyLevel,
  }
  if (typeof window !== "undefined") {
    window.localStorage.setItem(PROFILE_KEY, JSON.stringify(next))
  }
  return next
}
