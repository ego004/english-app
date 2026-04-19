import type { ProgressInteraction } from "@/lib/api"

const FEATURE_XP: Record<string, number> = {
  grammar: 15,
  conversation: 10,
  speaking: 25,
}

function toDateKey(value: string): string {
  return new Date(value).toISOString().slice(0, 10)
}

function speakingBonus(score: number | null): number {
  if (typeof score !== "number") {
    return 0
  }
  return Math.max(0, Math.floor(score / 10))
}

export function calculateXp(rows: ProgressInteraction[]): number {
  return rows.reduce((total, row) => {
    const base = FEATURE_XP[row.feature] || 5
    const bonus = row.feature === "speaking" ? speakingBonus(row.score) : 0
    return total + base + bonus
  }, 0)
}

export function calculateLevel(xp: number): number {
  return Math.floor(Math.max(0, xp) / 100)
}

export function calculateStreak(rows: ProgressInteraction[]): number {
  if (rows.length === 0) {
    return 0
  }

  const uniqueDays = Array.from(new Set(rows.map((row) => toDateKey(row.created_at)))).sort((a, b) => b.localeCompare(a))

  let streak = 1
  for (let index = 1; index < uniqueDays.length; index += 1) {
    const prev = new Date(`${uniqueDays[index - 1]}T00:00:00Z`)
    const current = new Date(`${uniqueDays[index]}T00:00:00Z`)
    const dayDiff = Math.round((prev.getTime() - current.getTime()) / (1000 * 60 * 60 * 24))

    if (dayDiff === 1) {
      streak += 1
      continue
    }
    break
  }

  return streak
}
