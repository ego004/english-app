"use client"

import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import { Activity, BarChart3, MessageSquare, Mic, PenTool } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getLearnerProgress, type ProgressInteraction } from "@/lib/api"
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

export default function ProgressPage() {
  const [rows, setRows] = useState<ProgressInteraction[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const profile = getLearnerProfile()

    async function load() {
      setLoading(true)
      try {
        const response = await getLearnerProgress(profile.learnerId, 50)
        setRows(response)
      } catch {
        setRows([])
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  const stats = useMemo(() => {
    const grammar = rows.filter((row) => row.feature === "grammar").length
    const conversation = rows.filter((row) => row.feature === "conversation").length
    const speakingRows = rows.filter((row) => row.feature === "speaking" && row.score !== null)
    const speakingAvg = speakingRows.length > 0
      ? Math.round(speakingRows.reduce((sum, row) => sum + (row.score || 0), 0) / speakingRows.length)
      : null

    return {
      total: rows.length,
      grammar,
      conversation,
      speakingAvg,
    }
  }, [rows])

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={container}
      className="p-6 md:p-8 max-w-5xl mx-auto"
    >
      <motion.div variants={item} className="mb-6">
        <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">Progress</h1>
        <p className="text-muted-foreground text-sm mt-1">Track your practice history and improvements</p>
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Interactions", value: stats.total },
          { label: "Grammar Checks", value: stats.grammar },
          { label: "Conversation Turns", value: stats.conversation },
          { label: "Avg Speaking Score", value: stats.speakingAvg ?? "-" },
        ].map((entry) => (
          <Card key={entry.label} className="border-0 shadow-sm">
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">{entry.label}</p>
              <p className="font-display text-2xl font-bold text-foreground">{entry.value}</p>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      <motion.div variants={item}>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="h-5 w-5 text-muted-foreground" />
              <h2 className="font-display font-bold text-foreground">Recent Activity</h2>
            </div>

            {loading ? (
              <p className="text-sm text-muted-foreground">Loading progress...</p>
            ) : rows.length === 0 ? (
              <p className="text-sm text-muted-foreground">No progress yet. Start with grammar, conversation, or speaking.</p>
            ) : (
              <div className="space-y-3">
                {rows.map((row) => {
                  const Icon = iconForFeature(row.feature)
                  return (
                    <div key={row.id} className="rounded-xl border border-border bg-card p-3">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <Icon className="h-4 w-4 text-muted-foreground" />
                          <Badge variant="outline" className="capitalize">{row.feature}</Badge>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {new Date(row.created_at).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm text-foreground mt-2 line-clamp-2">{row.user_input}</p>
                      {row.score !== null && (
                        <p className="text-xs text-muted-foreground mt-1">Score: {row.score}/100</p>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
