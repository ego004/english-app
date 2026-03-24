"use client"

import { useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import {
  BookOpen, Lock, CheckCircle2, Zap, Clock,
  ChevronRight, Filter, Star,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { lessons, subjects } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
}

const item = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
}

const levelColors: Record<string, string> = {
  Beginner: "bg-mint-light text-mint",
  Intermediate: "bg-sunshine-light text-secondary-foreground",
  Advanced: "bg-coral-light text-coral",
}

export default function LessonsPage() {
  const searchParams = useSearchParams()
  const preselected = searchParams.get("subject") || "all"
  const [selectedSubject, setSelectedSubject] = useState(preselected)
  const [selectedLevel, setSelectedLevel] = useState("all")

  const filtered = lessons.filter((l) => {
    if (selectedSubject !== "all" && l.subject !== selectedSubject) return false
    if (selectedLevel !== "all" && l.level !== selectedLevel) return false
    return true
  })

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={container}
      className="p-6 md:p-8 max-w-6xl mx-auto"
    >
      <motion.div variants={item} className="mb-6">
        <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">Lessons</h1>
        <p className="text-muted-foreground text-sm mt-1">Choose a subject and start learning!</p>
      </motion.div>

      {/* Subject filter */}
      <motion.div variants={item} className="mb-6">
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedSubject === "all" ? "default" : "outline"}
            size="sm"
            className="rounded-full"
            onClick={() => setSelectedSubject("all")}
          >
            All Subjects
          </Button>
          {subjects.map((s) => (
            <Button
              key={s.id}
              variant={selectedSubject === s.id ? "default" : "outline"}
              size="sm"
              className="rounded-full"
              onClick={() => setSelectedSubject(s.id)}
            >
              {s.label}
            </Button>
          ))}
        </div>
      </motion.div>

      {/* Level filter */}
      <motion.div variants={item} className="mb-8">
        <Tabs value={selectedLevel} onValueChange={setSelectedLevel}>
          <TabsList className="rounded-xl">
            <TabsTrigger value="all" className="rounded-lg text-xs">All Levels</TabsTrigger>
            <TabsTrigger value="Beginner" className="rounded-lg text-xs">Beginner</TabsTrigger>
            <TabsTrigger value="Intermediate" className="rounded-lg text-xs">Intermediate</TabsTrigger>
            <TabsTrigger value="Advanced" className="rounded-lg text-xs">Advanced</TabsTrigger>
          </TabsList>
        </Tabs>
      </motion.div>

      {/* Lesson cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((lesson) => (
          <motion.div key={lesson.id} variants={item}>
            <Link href={lesson.locked ? "#" : `/lessons/${lesson.id}`}>
              <Card className={cn(
                "border-0 shadow-sm transition-all h-full",
                lesson.locked ? "opacity-50 cursor-not-allowed" : "hover:shadow-md cursor-pointer group"
              )}>
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className={cn(
                      "h-10 w-10 rounded-xl flex items-center justify-center",
                      lesson.completed ? "bg-mint-light" : lesson.locked ? "bg-muted" : "bg-sky-light"
                    )}>
                      {lesson.locked ? (
                        <Lock className="h-5 w-5 text-muted-foreground" />
                      ) : lesson.completed ? (
                        <CheckCircle2 className="h-5 w-5 text-mint" />
                      ) : (
                        <BookOpen className="h-5 w-5 text-sky" />
                      )}
                    </div>
                    <Badge variant="secondary" className={cn("text-[10px] font-semibold", levelColors[lesson.level])}>
                      {lesson.level}
                    </Badge>
                  </div>
                  <h3 className="font-display font-bold text-foreground group-hover:text-primary transition-colors">
                    {lesson.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{lesson.description}</p>
                  <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {lesson.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Zap className="h-3 w-3 text-sunshine" /> +{lesson.xpReward} XP
                    </span>
                  </div>
                  {!lesson.locked && !lesson.completed && (
                    <div className="mt-3 flex items-center text-xs font-semibold text-primary">
                      Start Lesson <ChevronRight className="h-3 w-3 ml-0.5" />
                    </div>
                  )}
                  {lesson.completed && (
                    <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-mint">
                      <Star className="h-3 w-3 fill-current" /> Completed
                    </div>
                  )}
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <motion.div variants={item} className="text-center py-16">
          <Filter className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="font-display text-lg font-bold text-foreground">No lessons found</p>
          <p className="text-sm text-muted-foreground mt-1">Try adjusting your filters</p>
        </motion.div>
      )}
    </motion.div>
  )
}
