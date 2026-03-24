"use client"

import { motion } from "framer-motion"
import {
  Trophy, Star, Flame, Crown, Zap, Sparkles, Target,
  Footprints, Compass, GraduationCap, Heart, Medal,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { badges, leaderboard, dailyChallenges, mockStudent, avatars } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

const iconMap: Record<string, React.ElementType> = {
  Footprints, Flame, Trophy, Sparkles, Zap, Crown, Compass, Star, GraduationCap, Heart,
}

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const item = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
}

const levelThresholds = [0, 100, 250, 500, 800, 1200, 1700, 2200, 2800, 3500, 4300, 5200, 6200, 7400, 8800, 10000]

export default function RewardsPage() {
  const currentLevelXp = levelThresholds[mockStudent.level - 1] || 0
  const nextLevelXp = levelThresholds[mockStudent.level] || levelThresholds[levelThresholds.length - 1]
  const progressToNext = Math.round(((mockStudent.xp - currentLevelXp) / (nextLevelXp - currentLevelXp)) * 100)

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={container}
      className="p-6 md:p-8 max-w-6xl mx-auto"
    >
      <motion.div variants={item} className="mb-8">
        <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">Rewards</h1>
        <p className="text-muted-foreground text-sm mt-1">Collect badges, earn XP, and climb the leaderboard!</p>
      </motion.div>

      {/* Level card */}
      <motion.div variants={item}>
        <Card className="border-0 shadow-sm mb-8 bg-primary text-primary-foreground overflow-hidden relative">
          <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-primary-foreground/5 blur-2xl -mr-12 -mt-12" aria-hidden="true" />
          <CardContent className="p-6 relative">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-16 w-16 rounded-2xl bg-primary-foreground/20 flex items-center justify-center">
                <Medal className="h-8 w-8" />
              </div>
              <div>
                <p className="text-sm text-primary-foreground/70">Current Level</p>
                <p className="font-display text-3xl font-bold">Level {mockStudent.level}</p>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm mb-2">
              <span>{mockStudent.xp.toLocaleString()} XP</span>
              <span>{nextLevelXp.toLocaleString()} XP</span>
            </div>
            <div className="w-full h-3 rounded-full bg-primary-foreground/20 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressToNext}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full rounded-full bg-primary-foreground/80"
              />
            </div>
            <p className="text-xs text-primary-foreground/60 mt-2">
              {nextLevelXp - mockStudent.xp} XP to Level {mockStudent.level + 1}
            </p>
          </CardContent>
        </Card>
      </motion.div>

      <Tabs defaultValue="badges" className="mb-8">
        <motion.div variants={item}>
          <TabsList className="grid w-full grid-cols-3 rounded-xl h-11">
            <TabsTrigger value="badges" className="rounded-lg">Badges</TabsTrigger>
            <TabsTrigger value="leaderboard" className="rounded-lg">Leaderboard</TabsTrigger>
            <TabsTrigger value="challenges" className="rounded-lg">Challenges</TabsTrigger>
          </TabsList>
        </motion.div>

        <TabsContent value="badges" className="mt-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {badges.map((badge) => {
              const IconComp = iconMap[badge.icon] || Star
              return (
                <motion.div key={badge.id} variants={item}>
                  <Card className={cn(
                    "border-0 shadow-sm text-center transition-all",
                    badge.earned ? "bg-card" : "bg-muted/50 opacity-60"
                  )}>
                    <CardContent className="p-4">
                      <div className={cn(
                        "h-14 w-14 rounded-2xl flex items-center justify-center mx-auto mb-3",
                        badge.earned ? "bg-sunshine-light" : "bg-muted"
                      )}>
                        <IconComp className={cn("h-7 w-7", badge.earned ? "text-sunshine" : "text-muted-foreground")} />
                      </div>
                      <p className="font-display font-bold text-sm text-foreground">{badge.label}</p>
                      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{badge.description}</p>
                      {badge.earned && badge.earnedDate && (
                        <p className="text-[10px] text-muted-foreground mt-2">
                          Earned {new Date(badge.earnedDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                        </p>
                      )}
                      {!badge.earned && (
                        <p className="text-[10px] text-muted-foreground mt-2 font-medium">Locked</p>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="leaderboard" className="mt-6">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-0">
              {leaderboard.map((player, idx) => {
                const playerAvatar = avatars.find((a) => a.id === player.avatar)
                const isCurrentUser = player.name === mockStudent.name
                return (
                  <div
                    key={player.rank}
                    className={cn(
                      "flex items-center gap-4 px-5 py-4 border-b border-border last:border-0",
                      isCurrentUser && "bg-sky-light/30"
                    )}
                  >
                    <div className={cn(
                      "h-8 w-8 rounded-lg flex items-center justify-center text-sm font-bold shrink-0",
                      idx === 0 && "bg-sunshine-light text-sunshine",
                      idx === 1 && "bg-muted text-muted-foreground",
                      idx === 2 && "bg-coral-light text-coral",
                      idx > 2 && "bg-muted text-muted-foreground"
                    )}>
                      {player.rank}
                    </div>
                    <span className="text-xl shrink-0">{playerAvatar?.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <p className={cn("font-semibold text-sm truncate", isCurrentUser && "text-primary")}>
                        {player.name} {isCurrentUser && "(You)"}
                      </p>
                      <p className="text-xs text-muted-foreground">Level {player.level}</p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <Zap className="h-3.5 w-3.5 text-sunshine" />
                      <span className="font-semibold text-sm text-foreground">{player.xp.toLocaleString()}</span>
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="challenges" className="mt-6">
          <div className="space-y-3">
            {dailyChallenges.map((challenge) => (
              <motion.div key={challenge.id} variants={item}>
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className={cn(
                      "h-10 w-10 rounded-xl flex items-center justify-center shrink-0",
                      challenge.completed ? "bg-mint-light" : "bg-sunshine-light"
                    )}>
                      <Target className={cn("h-5 w-5", challenge.completed ? "text-mint" : "text-sunshine")} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={cn("font-semibold text-sm", challenge.completed && "line-through text-muted-foreground")}>
                        {challenge.title}
                      </p>
                      <p className="text-xs text-muted-foreground">{challenge.description}</p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <Zap className="h-3.5 w-3.5 text-sunshine" />
                      <span className="text-xs font-semibold">+{challenge.xpReward}</span>
                    </div>
                    {challenge.completed && (
                      <span className="text-xs font-semibold text-mint px-2 py-0.5 rounded-full bg-mint-light">Done</span>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}
