"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Brain, Clock, Star, Trophy, ArrowRight, Target,
  CheckCircle2,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { quizzes } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}
const item = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
}

const levelColors: Record<string, string> = {
  Beginner: "bg-mint-light text-mint",
  Intermediate: "bg-sunshine-light text-secondary-foreground",
  Advanced: "bg-coral-light text-coral",
}

const subjectIcons: Record<string, string> = {
  vocabulary: "bg-sky-light",
  grammar: "bg-sunshine-light",
  reading: "bg-mint-light",
  writing: "bg-lavender-light",
  listening: "bg-coral-light",
  speaking: "bg-sky-light",
}

export default function QuizzesPage() {
  const [filter, setFilter] = useState<string>("all")

  const filtered = filter === "all"
    ? quizzes
    : quizzes.filter((q) => q.subject === filter)

  const subjects = ["all", "vocabulary", "grammar", "reading", "writing", "listening", "speaking"]

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={container}
      className="p-6 md:p-8 max-w-5xl mx-auto"
    >
      <motion.div variants={item} className="mb-8">
        <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">Practice & Quizzes</h1>
        <p className="text-muted-foreground text-sm mt-1">Test your knowledge and earn stars!</p>
      </motion.div>

      {/* Quick stats */}
      <motion.div variants={item} className="grid grid-cols-3 gap-4 mb-8">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-sky-light flex items-center justify-center shrink-0">
              <Brain className="h-5 w-5 text-sky" />
            </div>
            <div>
              <p className="font-display text-lg font-bold text-foreground">{quizzes.length}</p>
              <p className="text-xs text-muted-foreground">Quizzes</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-sunshine-light flex items-center justify-center shrink-0">
              <Trophy className="h-5 w-5 text-sunshine" />
            </div>
            <div>
              <p className="font-display text-lg font-bold text-foreground">
                {quizzes.filter((q) => q.bestScore !== undefined).length}
              </p>
              <p className="text-xs text-muted-foreground">Completed</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-mint-light flex items-center justify-center shrink-0">
              <Star className="h-5 w-5 text-mint" />
            </div>
            <div>
              <p className="font-display text-lg font-bold text-foreground">
                {Math.round(
                  quizzes.filter((q) => q.bestScore).reduce((s, q) => s + (q.bestScore || 0), 0) /
                  Math.max(quizzes.filter((q) => q.bestScore).length, 1)
                )}%
              </p>
              <p className="text-xs text-muted-foreground">Avg Score</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Subject filter */}
      <motion.div variants={item} className="flex flex-wrap gap-2 mb-6">
        {subjects.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={cn(
              "px-4 py-2 rounded-xl text-sm font-medium border-2 transition-all capitalize",
              filter === s
                ? "border-primary bg-primary/10 text-foreground"
                : "border-border bg-card text-muted-foreground hover:border-muted-foreground"
            )}
          >
            {s === "all" ? "All Quizzes" : s}
          </button>
        ))}
      </motion.div>

      {/* Quiz cards */}
      <motion.div variants={item} className="grid sm:grid-cols-2 gap-4">
        {filtered.map((quiz) => (
          <motion.div key={quiz.id} variants={item}>
            <Card className="border-0 shadow-sm hover:shadow-md transition-all group">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className={cn(
                    "h-12 w-12 rounded-xl flex items-center justify-center",
                    subjectIcons[quiz.subject] || "bg-muted"
                  )}>
                    <Brain className="h-6 w-6 text-foreground/70" />
                  </div>
                  {quiz.bestScore !== undefined && (
                    <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-mint-light">
                      <CheckCircle2 className="h-3 w-3 text-mint" />
                      <span className="text-xs font-semibold text-mint">{quiz.bestScore}%</span>
                    </div>
                  )}
                </div>

                <h3 className="font-display font-bold text-foreground group-hover:text-primary transition-colors">
                  {quiz.title}
                </h3>

                <div className="flex items-center gap-2 mt-2 flex-wrap">
                  <Badge className={cn("text-[10px] font-semibold", levelColors[quiz.level])}>
                    {quiz.level}
                  </Badge>
                  <Badge variant="outline" className="text-[10px] capitalize">{quiz.subject}</Badge>
                </div>

                <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Target className="h-3 w-3" />
                    {quiz.questions.length} questions
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {Math.round(quiz.timeLimit / 60)} min
                  </span>
                </div>

                {/* Star rating for best score */}
                {quiz.bestScore !== undefined && (
                  <div className="flex items-center gap-0.5 mt-3">
                    {Array.from({ length: 5 }).map((_, i) => {
                      const stars = quiz.bestScore! >= 90 ? 5 : quiz.bestScore! >= 75 ? 4 : quiz.bestScore! >= 60 ? 3 : 2
                      return (
                        <Star
                          key={i}
                          className={cn(
                            "h-4 w-4",
                            i < stars ? "text-sunshine fill-sunshine" : "text-muted-foreground/20"
                          )}
                        />
                      )
                    })}
                  </div>
                )}

                <Link href={`/quizzes/${quiz.id}`} className="block mt-4">
                  <Button className="w-full rounded-xl gap-2" size="sm">
                    {quiz.bestScore !== undefined ? "Retake Quiz" : "Start Quiz"}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}
