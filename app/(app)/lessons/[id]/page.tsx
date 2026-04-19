"use client"

import { use, useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowLeft, Volume2, Zap, Clock, CheckCircle2,
  BookOpen, ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { completeLesson, getLessonByCode, type LessonDetail } from "@/lib/api"
import { getLearnerProfile } from "@/lib/learner-profile"
import { cn } from "@/lib/utils"

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}
const item = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
}

export default function LessonDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [lesson, setLesson] = useState<LessonDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [markingComplete, setMarkingComplete] = useState(false)

  useEffect(() => {
    const profile = getLearnerProfile()
    let cancelled = false

    async function load() {
      setLoading(true)
      try {
        const data = await getLessonByCode({ learner_id: profile.learnerId, lesson_code: id })
        if (!cancelled) {
          setLesson(data)
        }
      } catch {
        if (!cancelled) {
          setLesson(null)
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [id])

  async function handleComplete() {
    if (!lesson || lesson.completed || markingComplete) {
      return
    }

    setMarkingComplete(true)
    try {
      const profile = getLearnerProfile()
      await completeLesson({ learner_id: profile.learnerId, lesson_code: lesson.code })
      setLesson({ ...lesson, completed: true })
    } finally {
      setMarkingComplete(false)
    }
  }

  if (loading) {
    return <div className="p-8 text-center">Loading lesson...</div>
  }

  if (!lesson) {
    return (
      <div className="p-8 text-center">
        <h1 className="font-display text-2xl font-bold text-foreground">Lesson Not Found</h1>
        <Link href="/lessons" className="text-primary text-sm mt-4 inline-block">Back to Lessons</Link>
      </div>
    )
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={container}
      className="p-6 md:p-8 max-w-4xl mx-auto"
    >
      {/* Back nav */}
      <motion.div variants={item}>
        <Link href="/lessons" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
          <ArrowLeft className="h-4 w-4" />
          Back to Lessons
        </Link>
      </motion.div>

      {/* Header */}
      <motion.div variants={item} className="mb-8">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">{lesson.title}</h1>
            <p className="text-muted-foreground text-sm mt-1">{lesson.description}</p>
          </div>
          <Badge variant="secondary" className="text-xs font-semibold">{lesson.level}</Badge>
        </div>
        <div className="flex items-center gap-6 mt-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" />{lesson.duration_minutes} min</span>
          <span className="flex items-center gap-1.5"><Zap className="h-4 w-4 text-sunshine" />+{lesson.xp_reward} XP</span>
          <span className="flex items-center gap-1.5 capitalize"><BookOpen className="h-4 w-4" />{lesson.subject}</span>
        </div>
      </motion.div>

      {/* Lesson Content */}
      {lesson.content ? (
        <>
          {/* Explanation */}
          <motion.div variants={item}>
            <Card className="border-0 shadow-sm mb-6">
              <CardContent className="p-6">
                <h2 className="font-display text-lg font-bold text-foreground mb-3">Lesson</h2>
                  <p className="text-foreground leading-relaxed">{lesson.content.explanation}</p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Audio button */}
          <motion.div variants={item} className="mb-6">
            <Button variant="outline" className="rounded-full gap-2">
              <Volume2 className="h-4 w-4" />
              Listen to Pronunciation
            </Button>
          </motion.div>

          {/* Examples */}
          <motion.div variants={item}>
            <Card className="border-0 shadow-sm mb-6">
              <CardContent className="p-6">
                <h2 className="font-display text-lg font-bold text-foreground mb-4">Examples</h2>
                <div className="space-y-3">
                  {lesson.content.examples.map((ex, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-muted/50">
                      <div className="h-6 w-6 rounded-full bg-sky-light text-sky flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                        {i + 1}
                      </div>
                      <p className="text-sm text-foreground leading-relaxed">{ex}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Try Now CTA */}
          <motion.div variants={item} className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" variant="default" className="rounded-full shadow-md w-full sm:w-auto" onClick={handleComplete} disabled={lesson.completed || markingComplete}>
              {lesson.completed ? "Completed" : markingComplete ? "Saving..." : "Mark Complete"}
            </Button>
            <Link href="/quizzes">
              <Button size="lg" className="rounded-full shadow-md w-full sm:w-auto">
                Try a Quiz
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/worksheets">
              <Button size="lg" variant="outline" className="rounded-full w-full sm:w-auto">
                Practice with Worksheets
              </Button>
            </Link>
          </motion.div>
        </>
      ) : (
        <motion.div variants={item}>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-12 text-center">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h2 className="font-display text-lg font-bold text-foreground">Lesson Content Coming Soon</h2>
              <p className="text-sm text-muted-foreground mt-2">This lesson is being prepared. Check back soon!</p>
              <Link href="/lessons">
                <Button variant="outline" className="rounded-full mt-6">Back to Lessons</Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {lesson.completed && (
        <motion.div variants={item} className="mt-8 p-4 rounded-xl bg-mint-light/50 flex items-center gap-3">
          <CheckCircle2 className="h-5 w-5 text-mint shrink-0" />
          <p className="text-sm font-semibold text-foreground">
            You already completed this lesson! Feel free to review it anytime.
          </p>
        </motion.div>
      )}
    </motion.div>
  )
}
