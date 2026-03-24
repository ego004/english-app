"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Mic, MicOff, RotateCcw, ChevronRight, Volume2,
  Star, Sparkles, MessageCircle,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { speakingPrompts } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}
const item = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
}

const difficultyColors: Record<string, string> = {
  Easy: "bg-mint-light text-mint",
  Medium: "bg-sunshine-light text-secondary-foreground",
  Hard: "bg-coral-light text-coral",
}

export default function SpeakingPage() {
  const [selectedPrompt, setSelectedPrompt] = useState(speakingPrompts[0])
  const [isRecording, setIsRecording] = useState(false)
  const [hasRecorded, setHasRecorded] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [showFeedback, setShowFeedback] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isRecording) {
      intervalRef.current = setInterval(() => {
        setRecordingTime((t) => t + 1)
      }, 1000)
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isRecording])

  function toggleRecording() {
    if (isRecording) {
      setIsRecording(false)
      setHasRecorded(true)
      setShowFeedback(true)
    } else {
      setIsRecording(true)
      setHasRecorded(false)
      setShowFeedback(false)
      setRecordingTime(0)
    }
  }

  function reset() {
    setIsRecording(false)
    setHasRecorded(false)
    setShowFeedback(false)
    setRecordingTime(0)
  }

  // Mock pronunciation score
  const mockScore = Math.floor(Math.random() * 20) + 75
  const stars = mockScore >= 90 ? 5 : mockScore >= 80 ? 4 : mockScore >= 70 ? 3 : 2

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={container}
      className="p-6 md:p-8 max-w-4xl mx-auto"
    >
      <motion.div variants={item} className="mb-8">
        <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">Speaking Practice</h1>
        <p className="text-muted-foreground text-sm mt-1">Record your voice and practice pronunciation!</p>
      </motion.div>

      {/* Prompt Selection */}
      <motion.div variants={item} className="mb-8">
        <h2 className="font-display text-sm font-bold text-foreground mb-3">Choose a Prompt</h2>
        <div className="flex flex-wrap gap-2">
          {speakingPrompts.map((p) => (
            <button
              key={p.id}
              onClick={() => { setSelectedPrompt(p); reset() }}
              className={cn(
                "px-4 py-2 rounded-xl text-sm font-medium border-2 transition-all",
                selectedPrompt.id === p.id
                  ? "border-primary bg-primary/10 text-foreground"
                  : "border-border bg-card text-muted-foreground hover:border-muted-foreground"
              )}
            >
              {p.category}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Main recording area */}
      <motion.div variants={item}>
        <Card className="border-0 shadow-sm mb-6">
          <CardContent className="p-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Badge className={cn("text-[10px] font-semibold", difficultyColors[selectedPrompt.difficulty])}>
                {selectedPrompt.difficulty}
              </Badge>
              <Badge variant="outline" className="text-[10px]">{selectedPrompt.category}</Badge>
            </div>

            {/* Text prompt */}
            <div className="my-8 p-6 rounded-2xl bg-muted/30">
              <MessageCircle className="h-6 w-6 text-muted-foreground mx-auto mb-3" />
              <p className="font-display text-xl md:text-2xl font-bold text-foreground leading-relaxed">
                {`"${selectedPrompt.text}"`}
              </p>
            </div>

            {/* Listen button */}
            <Button variant="outline" className="rounded-full gap-2 mb-8">
              <Volume2 className="h-4 w-4" />
              Listen First
            </Button>

            {/* Mic button with wave */}
            <div className="relative flex flex-col items-center">
              {isRecording && (
                <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
                  <motion.div
                    animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.1, 0.3] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="absolute h-32 w-32 rounded-full bg-coral/20"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.6, 1], opacity: [0.2, 0.05, 0.2] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                    className="absolute h-44 w-44 rounded-full bg-coral/10"
                  />
                </div>
              )}

              <button
                onClick={toggleRecording}
                className={cn(
                  "relative h-20 w-20 rounded-full flex items-center justify-center transition-all shadow-lg",
                  isRecording
                    ? "bg-coral text-card scale-110"
                    : "bg-primary text-primary-foreground hover:scale-105"
                )}
                aria-label={isRecording ? "Stop recording" : "Start recording"}
              >
                {isRecording ? (
                  <MicOff className="h-8 w-8" />
                ) : (
                  <Mic className="h-8 w-8" />
                )}
              </button>

              {isRecording && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 text-sm font-semibold text-coral"
                >
                  Recording... {recordingTime}s
                </motion.p>
              )}

              {!isRecording && !hasRecorded && (
                <p className="mt-4 text-sm text-muted-foreground">Tap to start recording</p>
              )}
            </div>

            {/* Wave animation placeholder */}
            {isRecording && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-6 flex items-center justify-center gap-1 h-10"
              >
                {Array.from({ length: 20 }).map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ height: [4, Math.random() * 30 + 8, 4] }}
                    transition={{ duration: 0.5 + Math.random() * 0.5, repeat: Infinity, delay: i * 0.05 }}
                    className="w-1 rounded-full bg-coral/60"
                  />
                ))}
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* AI Feedback */}
      <AnimatePresence>
        {showFeedback && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <Card className="border-0 shadow-sm mb-6">
              <CardContent className="p-6 text-center">
                <Sparkles className="h-8 w-8 text-sunshine mx-auto mb-3" />
                <h3 className="font-display text-lg font-bold text-foreground mb-2">AI Feedback</h3>

                {/* Score */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-light mb-4">
                  <span className="font-display text-2xl font-bold text-foreground">{mockScore}</span>
                  <span className="text-sm text-muted-foreground">/100</span>
                </div>

                {/* Stars */}
                <div className="flex items-center justify-center gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-6 w-6",
                        i < stars ? "text-sunshine fill-sunshine" : "text-muted-foreground/30"
                      )}
                    />
                  ))}
                </div>

                <Progress value={mockScore} className="h-2 rounded-full max-w-xs mx-auto mb-4" />

                <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
                  Great pronunciation! Your intonation is improving. Try to slow down a little on the longer words for even better clarity.
                </p>

                <div className="flex items-center justify-center gap-3 mt-6">
                  <Button variant="outline" className="rounded-full gap-1" onClick={reset}>
                    <RotateCcw className="h-4 w-4" /> Try Again
                  </Button>
                  <Button className="rounded-full gap-1" onClick={() => {
                    const idx = speakingPrompts.findIndex((p) => p.id === selectedPrompt.id)
                    const next = speakingPrompts[(idx + 1) % speakingPrompts.length]
                    setSelectedPrompt(next)
                    reset()
                  }}>
                    Next Prompt <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
