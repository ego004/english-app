"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import {
  Flame, Star, Zap, BookOpen, ArrowRight,
  Trophy, Target,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { mockStudent, subjects, avatars, dailyChallenges } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

const colorMap: Record<string, { bg: string; text: string; light: string }> = {
  sky: { bg: "bg-sky", text: "text-sky", light: "bg-sky-light" },
  sunshine: { bg: "bg-sunshine", text: "text-sunshine", light: "bg-sunshine-light" },
  mint: { bg: "bg-mint", text: "text-mint", light: "bg-mint-light" },
  lavender: { bg: "bg-lavender", text: "text-lavender", light: "bg-lavender-light" },
  coral: { bg: "bg-coral", text: "text-coral", light: "bg-coral-light" },
}

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const item = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

export default function DashboardPage() {
  const avatar = avatars.find((a) => a.id === mockStudent.avatar)
  const overallProgress = Math.round(
    (mockStudent.completedLessons / mockStudent.totalLessons) * 100
  )

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={container}
      className="p-6 md:p-8 max-w-6xl mx-auto"
    >
      {/* Welcome */}
      <motion.div variants={item} className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-2xl bg-sky-light flex items-center justify-center text-4xl shadow-sm">
            {avatar?.emoji}
          </div>
          <div>
            <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
              Hey, {mockStudent.name}!
            </h1>
            <p className="text-muted-foreground text-sm mt-0.5">Ready for another day of learning?</p>
          </div>
        </div>
        <Link href="/lessons">
          <Button size="lg" className="rounded-full shadow-md">
            Continue Learning
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </motion.div>

      {/* Stats Row */}
      <motion.div variants={item} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { icon: Zap, label: "XP Points", value: mockStudent.xp.toLocaleString(), bg: "bg-sunshine-light", iconColor: "text-sunshine" },
          { icon: Star, label: "Level", value: mockStudent.level, bg: "bg-sky-light", iconColor: "text-sky" },
          { icon: Flame, label: "Day Streak", value: `${mockStudent.streak} days`, bg: "bg-coral-light", iconColor: "text-coral" },
          { icon: Trophy, label: "Badges", value: mockStudent.badges.length, bg: "bg-lavender-light", iconColor: "text-lavender" },
        ].map((stat) => (
          <Card key={stat.label} className="border-0 shadow-sm">
            <CardContent className="p-4 flex items-center gap-3">
              <div className={cn("h-11 w-11 rounded-xl flex items-center justify-center shrink-0", stat.bg)}>
                <stat.icon className={cn("h-5 w-5", stat.iconColor)} />
              </div>
              <div className="min-w-0">
                <p className="font-display text-xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {/* Overall Progress */}
      <motion.div variants={item}>
        <Card className="border-0 shadow-sm mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-display text-lg font-bold text-foreground">Overall Progress</h2>
              <span className="text-sm font-semibold text-primary">{overallProgress}%</span>
            </div>
            <Progress value={overallProgress} className="h-3 rounded-full" />
            <p className="text-xs text-muted-foreground mt-2">
              {mockStudent.completedLessons} of {mockStudent.totalLessons} lessons completed
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Subject Cards */}
      <motion.div variants={item}>
        <h2 className="font-display text-lg font-bold text-foreground mb-4">Subjects</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {subjects.map((subject, i) => {
            const colors = colorMap[subject.color] || colorMap.sky
            return (
              <motion.div key={subject.id} variants={item}>
                <Link href={`/lessons?subject=${subject.id}`}>
                  <Card className="border-0 shadow-sm hover:shadow-md transition-all group cursor-pointer">
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div className={cn("h-12 w-12 rounded-xl flex items-center justify-center", colors.light)}>
                          <BookOpen className={cn("h-6 w-6", colors.text)} />
                        </div>
                        <span className={cn("text-xs font-semibold px-2 py-1 rounded-full", colors.light, colors.text)}>
                          {subject.completion}%
                        </span>
                      </div>
                      <h3 className="font-display font-bold text-foreground group-hover:text-primary transition-colors">
                        {subject.label}
                      </h3>
                      <Progress value={subject.completion} className="h-2 rounded-full mt-3" />
                      <p className="text-xs text-muted-foreground mt-2">{subject.totalLessons} lessons</p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      {/* Daily Challenges */}
      <motion.div variants={item}>
        <h2 className="font-display text-lg font-bold text-foreground mb-4">Daily Challenges</h2>
        <div className="space-y-3 mb-8">
          {dailyChallenges.map((challenge) => (
            <Card key={challenge.id} className="border-0 shadow-sm">
              <CardContent className="p-4 flex items-center gap-4">
                <div className={cn(
                  "h-10 w-10 rounded-xl flex items-center justify-center shrink-0",
                  challenge.completed ? "bg-mint-light" : "bg-muted"
                )}>
                  <Target className={cn("h-5 w-5", challenge.completed ? "text-mint" : "text-muted-foreground")} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={cn("font-semibold text-sm", challenge.completed ? "line-through text-muted-foreground" : "text-foreground")}>
                    {challenge.title}
                  </p>
                  <p className="text-xs text-muted-foreground">{challenge.description}</p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <Zap className="h-3.5 w-3.5 text-sunshine" />
                  <span className="text-xs font-semibold text-foreground">+{challenge.xpReward} XP</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}
