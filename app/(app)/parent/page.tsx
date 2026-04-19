"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Users, BarChart3, MessageSquare, Mic, PenTool, Activity } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getParentSummary, type ParentSummaryResponse } from "@/lib/api"
import { getLearnerProfile } from "@/lib/learner-profile"

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}
const item = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
}

function iconForFeature(feature: string) {
  if (feature === "grammar") return PenTool
  if (feature === "conversation") return MessageSquare
  if (feature === "speaking") return Mic
  return Activity
}

export default function ParentDashboard() {
  const [summary, setSummary] = useState<ParentSummaryResponse | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const profile = getLearnerProfile()

    async function loadSummary() {
      setLoading(true)
      try {
        const response = await getParentSummary(profile.learnerId, 150)
        setSummary(response)
      } catch {
        setSummary(null)
      } finally {
        setLoading(false)
      }
    }

    loadSummary()
  }, [])

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={container}
      className="p-6 md:p-8 max-w-6xl mx-auto"
    >
      <motion.div variants={item} className="mb-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
          <Users className="h-4 w-4" />
          Parent / Teacher View
        </div>
        <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">Learner Summary</h1>
        <p className="text-muted-foreground text-sm mt-1">Aggregated report from SQLite interaction history</p>
      </motion.div>

      {loading ? (
        <p className="text-sm text-muted-foreground">Loading summary...</p>
      ) : !summary ? (
        <p className="text-sm text-muted-foreground">Unable to load summary data.</p>
      ) : (
        <>
          <motion.div variants={item} className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            {[
              { label: "Total Interactions", value: summary.total_interactions },
              { label: "Grammar Checks", value: summary.grammar_checks },
              { label: "Conversation Turns", value: summary.conversation_turns },
              { label: "Speaking Attempts", value: summary.speaking_attempts },
              { label: "Avg Speaking", value: summary.average_speaking_score ?? "-" },
            ].map((entry) => (
              <Card key={entry.label} className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <p className="text-xs text-muted-foreground">{entry.label}</p>
                  <p className="font-display text-2xl font-bold text-foreground">{entry.value}</p>
                </CardContent>
              </Card>
            ))}
          </motion.div>

          <motion.div variants={item} className="grid md:grid-cols-2 gap-6">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <BarChart3 className="h-5 w-5 text-muted-foreground" />
                  <h2 className="font-display font-bold text-foreground">Feature Breakdown</h2>
                </div>
                <div className="space-y-3">
                  {summary.feature_breakdown.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No data yet.</p>
                  ) : (
                    summary.feature_breakdown.map((entry) => {
                      const Icon = iconForFeature(entry.feature)
                      return (
                        <div key={entry.feature} className="flex items-center justify-between rounded-xl border border-border p-3">
                          <div className="flex items-center gap-2">
                            <Icon className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm capitalize text-foreground">{entry.feature}</span>
                          </div>
                          <Badge variant="outline">{entry.count}</Badge>
                        </div>
                      )
                    })
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <h2 className="font-display font-bold text-foreground mb-4">Recent Interactions</h2>
                <div className="space-y-3 max-h-[380px] overflow-y-auto">
                  {summary.recent_interactions.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No recent interactions.</p>
                  ) : (
                    summary.recent_interactions.map((row) => (
                      <div key={row.id} className="rounded-xl border border-border p-3">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <Badge variant="outline" className="capitalize">{row.feature}</Badge>
                          <span className="text-xs text-muted-foreground">{new Date(row.created_at).toLocaleString()}</span>
                        </div>
                        <p className="text-sm text-foreground line-clamp-2">{row.user_input}</p>
                        {row.score !== null && (
                          <p className="text-xs text-muted-foreground mt-1">Score: {row.score}/100</p>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </>
      )}
    </motion.div>
  )
}
