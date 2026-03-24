"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  LineChart, Line,
} from "recharts"
import {
  Clock, BookOpen, Zap, TrendingUp, Download,
  Calendar, Star, Target, Users,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { mockStudent, weeklyProgress, skillBreakdown, subjects, avatars, badges } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}
const item = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
}

export default function ParentDashboard() {
  const avatar = avatars.find((a) => a.id === mockStudent.avatar)
  const totalMinutes = weeklyProgress.reduce((a, b) => a + b.minutes, 0)
  const totalLessons = weeklyProgress.reduce((a, b) => a + b.lessonsCompleted, 0)
  const totalXp = weeklyProgress.reduce((a, b) => a + b.xpEarned, 0)
  const earnedBadges = badges.filter((b) => b.earned).length

  const radarData = skillBreakdown.map((s) => ({
    skill: s.skill,
    score: s.score,
    fullMark: 100,
  }))

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={container}
      className="p-6 md:p-8 max-w-6xl mx-auto"
    >
      <motion.div variants={item} className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <Users className="h-4 w-4" />
            Parent Dashboard
          </div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
            {"Child's"} Progress Report
          </h1>
        </div>
        <Button variant="outline" className="rounded-full gap-2">
          <Download className="h-4 w-4" />
          Download Report
        </Button>
      </motion.div>

      {/* Child profile card */}
      <motion.div variants={item}>
        <Card className="border-0 shadow-sm mb-8">
          <CardContent className="p-6 flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="h-14 w-14 rounded-2xl bg-sky-light flex items-center justify-center text-3xl">
              {avatar?.emoji}
            </div>
            <div className="flex-1">
              <h2 className="font-display text-lg font-bold text-foreground">{mockStudent.name}</h2>
              <p className="text-sm text-muted-foreground">
                Level {mockStudent.level} &middot; Joined {new Date(mockStudent.joinDate).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
              </p>
            </div>
            <div className="flex items-center gap-6 text-center">
              <div>
                <p className="font-display text-xl font-bold text-foreground">{mockStudent.xp.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Total XP</p>
              </div>
              <div>
                <p className="font-display text-xl font-bold text-foreground">{mockStudent.streak}</p>
                <p className="text-xs text-muted-foreground">Day Streak</p>
              </div>
              <div>
                <p className="font-display text-xl font-bold text-foreground">{earnedBadges}</p>
                <p className="text-xs text-muted-foreground">Badges</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Weekly stats cards */}
      <motion.div variants={item} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { icon: Clock, label: "Time This Week", value: `${totalMinutes} min`, bg: "bg-sky-light", color: "text-sky" },
          { icon: BookOpen, label: "Lessons Completed", value: totalLessons, bg: "bg-mint-light", color: "text-mint" },
          { icon: Zap, label: "XP Earned", value: totalXp, bg: "bg-sunshine-light", color: "text-sunshine" },
          { icon: TrendingUp, label: "Avg per Day", value: `${Math.round(totalMinutes / 7)} min`, bg: "bg-lavender-light", color: "text-lavender" },
        ].map((stat) => (
          <Card key={stat.label} className="border-0 shadow-sm">
            <CardContent className="p-4 flex items-center gap-3">
              <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center shrink-0", stat.bg)}>
                <stat.icon className={cn("h-5 w-5", stat.color)} />
              </div>
              <div className="min-w-0">
                <p className="font-display text-lg font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      <Tabs defaultValue="weekly" className="mb-8">
        <TabsList className="rounded-xl">
          <TabsTrigger value="weekly" className="rounded-lg">Weekly Report</TabsTrigger>
          <TabsTrigger value="skills" className="rounded-lg">Skill Breakdown</TabsTrigger>
          <TabsTrigger value="analytics" className="rounded-lg">Analytics</TabsTrigger>
        </TabsList>

        {/* Weekly report */}
        <TabsContent value="weekly">
          <motion.div variants={item} className="grid md:grid-cols-2 gap-6 mt-4">
            {/* Time spent chart */}
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <h3 className="font-display font-bold text-foreground text-sm">Time Spent (minutes)</h3>
                </div>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={weeklyProgress}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="day" tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} />
                    <YAxis tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "var(--card)",
                        border: "1px solid var(--border)",
                        borderRadius: "12px",
                        fontSize: "12px",
                      }}
                    />
                    <Bar dataKey="minutes" fill="var(--sky)" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* XP earned chart */}
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Zap className="h-4 w-4 text-sunshine" />
                  <h3 className="font-display font-bold text-foreground text-sm">XP Earned</h3>
                </div>
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart data={weeklyProgress}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="day" tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} />
                    <YAxis tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "var(--card)",
                        border: "1px solid var(--border)",
                        borderRadius: "12px",
                        fontSize: "12px",
                      }}
                    />
                    <Line type="monotone" dataKey="xpEarned" stroke="var(--sunshine)" strokeWidth={2.5} dot={{ fill: "var(--sunshine)", r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Skill breakdown */}
        <TabsContent value="skills">
          <motion.div variants={item} className="grid md:grid-cols-2 gap-6 mt-4">
            {/* Radar chart */}
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <h3 className="font-display font-bold text-foreground text-sm mb-4">Skill Radar</h3>
                <ResponsiveContainer width="100%" height={280}>
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="var(--border)" />
                    <PolarAngleAxis dataKey="skill" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} />
                    <Radar name="Score" dataKey="score" stroke="var(--primary)" fill="var(--primary)" fillOpacity={0.2} strokeWidth={2} />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Skill bars */}
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <h3 className="font-display font-bold text-foreground text-sm mb-4">Subject Scores</h3>
                <div className="space-y-4">
                  {skillBreakdown.map((skill) => (
                    <div key={skill.skill}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm font-medium text-foreground">{skill.skill}</span>
                        <span className="text-xs font-semibold text-muted-foreground">{skill.score}%</span>
                      </div>
                      <Progress value={skill.score} className="h-2.5 rounded-full" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Analytics */}
        <TabsContent value="analytics">
          <motion.div variants={item} className="grid md:grid-cols-2 gap-6 mt-4">
            {/* Lessons per day */}
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Target className="h-4 w-4 text-muted-foreground" />
                  <h3 className="font-display font-bold text-foreground text-sm">Lessons per Day</h3>
                </div>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={weeklyProgress}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="day" tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} />
                    <YAxis tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "var(--card)",
                        border: "1px solid var(--border)",
                        borderRadius: "12px",
                        fontSize: "12px",
                      }}
                    />
                    <Bar dataKey="lessonsCompleted" fill="var(--mint)" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Subject progress */}
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Star className="h-4 w-4 text-sunshine" />
                  <h3 className="font-display font-bold text-foreground text-sm">Subject Completion</h3>
                </div>
                <div className="space-y-3">
                  {subjects.map((s) => (
                    <div key={s.id} className="flex items-center gap-3">
                      <div className="w-20 text-xs font-medium text-foreground truncate">{s.label}</div>
                      <div className="flex-1">
                        <Progress value={s.completion} className="h-2 rounded-full" />
                      </div>
                      <span className="text-xs font-semibold text-muted-foreground w-10 text-right">{s.completion}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}
