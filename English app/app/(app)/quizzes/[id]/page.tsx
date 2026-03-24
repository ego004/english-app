"use client"

import { useState, useEffect, useRef, useCallback, use } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  Clock, Star, ChevronRight, RotateCcw, ArrowLeft,
  CheckCircle2, XCircle, Trophy, Sparkles,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { quizzes } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

export default function QuizPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const quiz = quizzes.find((q) => q.id === id)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [showResult, setShowResult] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)
  const [timeLeft, setTimeLeft] = useState(quiz?.timeLimit || 120)
  const [isStarted, setIsStarted] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const finishQuiz = useCallback(() => {
    setShowResult(true)
    setIsStarted(false)
  }, [])

  useEffect(() => {
    if (!isStarted || showResult) return
    if (timeLeft <= 0) {
      finishQuiz()
      return
    }
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000)
    return () => clearInterval(timer)
  }, [isStarted, timeLeft, showResult, finishQuiz])

  if (!quiz) {
    return (
      <div className="p-8 text-center">
        <h1 className="font-display text-xl font-bold text-foreground">Quiz not found</h1>
        <Button variant="outline" className="mt-4 rounded-full" onClick={() => router.push("/quizzes")}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Quizzes
        </Button>
      </div>
    )
  }

  const question = quiz.questions[currentQuestion]
  const totalQuestions = quiz.questions.length
  const progress = ((currentQuestion + 1) / totalQuestions) * 100

  function handleAnswer(value: string) {
    setAnswers((prev) => ({ ...prev, [question.id]: value }))
    setShowFeedback(true)
    setTimeout(() => {
      setShowFeedback(false)
      if (currentQuestion < totalQuestions - 1) {
        setCurrentQuestion((c) => c + 1)
      } else {
        finishQuiz()
      }
    }, 1200)
  }

  function isCorrect(questionId: string) {
    const q = quiz.questions.find((q) => q.id === questionId)
    if (!q) return false
    return answers[questionId]?.toLowerCase().trim() === q.answer.toLowerCase().trim()
  }

  const score = quiz.questions.filter((q) => isCorrect(q.id)).length
  const scorePercent = Math.round((score / totalQuestions) * 100)
  const stars = scorePercent >= 90 ? 5 : scorePercent >= 75 ? 4 : scorePercent >= 60 ? 3 : scorePercent >= 40 ? 2 : 1

  // Confetti effect
  useEffect(() => {
    if (showResult && scorePercent >= 60) {
      import("canvas-confetti").then((mod) => {
        const fire = mod.default
        fire({ particleCount: 100, spread: 70, origin: { y: 0.6 }, colors: ["#38bdf8", "#fbbf24", "#a78bfa", "#34d399", "#fb923c"] })
        setTimeout(() => {
          fire({ particleCount: 50, spread: 50, origin: { y: 0.7 } })
        }, 300)
      })
    }
  }, [showResult, scorePercent])

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`

  // Pre-quiz screen
  if (!isStarted && !showResult) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 md:p-8 max-w-2xl mx-auto"
      >
        <Button variant="ghost" className="rounded-full mb-6 gap-1" onClick={() => router.push("/quizzes")}>
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>

        <Card className="border-0 shadow-sm text-center">
          <CardContent className="p-8">
            <div className="h-16 w-16 rounded-2xl bg-sky-light flex items-center justify-center mx-auto mb-4">
              <Trophy className="h-8 w-8 text-sky" />
            </div>
            <h1 className="font-display text-2xl font-bold text-foreground mb-2">{quiz.title}</h1>
            <p className="text-muted-foreground text-sm mb-6">Are you ready to test your knowledge?</p>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="p-3 rounded-xl bg-muted/50">
                <p className="font-display font-bold text-foreground">{totalQuestions}</p>
                <p className="text-xs text-muted-foreground">Questions</p>
              </div>
              <div className="p-3 rounded-xl bg-muted/50">
                <p className="font-display font-bold text-foreground">{Math.round(quiz.timeLimit / 60)} min</p>
                <p className="text-xs text-muted-foreground">Time Limit</p>
              </div>
              <div className="p-3 rounded-xl bg-muted/50">
                <p className="font-display font-bold text-foreground capitalize">{quiz.level}</p>
                <p className="text-xs text-muted-foreground">Difficulty</p>
              </div>
            </div>

            <Button size="lg" className="rounded-full px-10" onClick={() => setIsStarted(true)}>
              Start Quiz
              <ChevronRight className="h-5 w-5 ml-1" />
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  // Results screen
  if (showResult) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-6 md:p-8 max-w-2xl mx-auto"
      >
        <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-50" />
        <Card className="border-0 shadow-sm text-center">
          <CardContent className="p-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
            >
              <Sparkles className="h-12 w-12 text-sunshine mx-auto mb-4" />
            </motion.div>

            <h2 className="font-display text-2xl font-bold text-foreground mb-1">
              {scorePercent >= 80 ? "Amazing Job!" : scorePercent >= 60 ? "Good Work!" : "Keep Practicing!"}
            </h2>
            <p className="text-muted-foreground text-sm mb-6">{"You've completed the quiz"}</p>

            {/* Score display */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.4 }}
              className="inline-flex items-baseline gap-1 mb-4"
            >
              <span className="font-display text-5xl font-bold text-foreground">{scorePercent}</span>
              <span className="text-xl text-muted-foreground">%</span>
            </motion.div>

            {/* Stars */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center justify-center gap-1 mb-6"
            >
              {Array.from({ length: 5 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, rotate: -30 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.7 + i * 0.1, type: "spring" }}
                >
                  <Star
                    className={cn(
                      "h-8 w-8",
                      i < stars ? "text-sunshine fill-sunshine" : "text-muted-foreground/20"
                    )}
                  />
                </motion.div>
              ))}
            </motion.div>

            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground mb-8">
              <span>{score}/{totalQuestions} correct</span>
              <span>Time: {formatTime(quiz.timeLimit - timeLeft)}</span>
            </div>

            {/* Answer review */}
            <div className="space-y-2 mb-8 text-left">
              {quiz.questions.map((q, i) => {
                const correct = isCorrect(q.id)
                return (
                  <div
                    key={q.id}
                    className={cn(
                      "flex items-center gap-3 p-3 rounded-xl text-sm",
                      correct ? "bg-mint-light/50" : "bg-coral-light/50"
                    )}
                  >
                    {correct ? (
                      <CheckCircle2 className="h-4 w-4 text-mint shrink-0" />
                    ) : (
                      <XCircle className="h-4 w-4 text-coral shrink-0" />
                    )}
                    <span className="flex-1 text-foreground">
                      Q{i + 1}: {q.question.length > 50 ? q.question.slice(0, 50) + "..." : q.question}
                    </span>
                    {!correct && (
                      <span className="text-xs text-muted-foreground shrink-0">
                        Ans: {q.answer}
                      </span>
                    )}
                  </div>
                )
              })}
            </div>

            <div className="flex items-center justify-center gap-3">
              <Button variant="outline" className="rounded-full gap-1" onClick={() => {
                setCurrentQuestion(0)
                setAnswers({})
                setShowResult(false)
                setShowFeedback(false)
                setTimeLeft(quiz.timeLimit)
              }}>
                <RotateCcw className="h-4 w-4" /> Retry
              </Button>
              <Button className="rounded-full" onClick={() => router.push("/quizzes")}>
                All Quizzes
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  // Active quiz
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 md:p-8 max-w-2xl mx-auto"
    >
      {/* Header: progress + timer */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="sm" className="rounded-full shrink-0" onClick={() => router.push("/quizzes")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <Progress value={progress} className="h-2 rounded-full" />
        </div>
        <div className={cn(
          "flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-semibold shrink-0",
          timeLeft <= 30 ? "bg-coral-light text-coral" : "bg-muted text-foreground"
        )}>
          <Clock className="h-3.5 w-3.5" />
          {formatTime(timeLeft)}
        </div>
      </div>

      <p className="text-xs text-muted-foreground mb-6">
        Question {currentQuestion + 1} of {totalQuestions}
      </p>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={question.id}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.25 }}
        >
          <Card className="border-0 shadow-sm mb-6">
            <CardContent className="p-6">
              <p className="font-display text-lg font-bold text-foreground leading-relaxed">
                {question.question}
              </p>
            </CardContent>
          </Card>

          {/* Multiple choice */}
          {question.type === "multiple-choice" && question.options && (
            <div className="grid gap-3">
              {question.options.map((option) => {
                const selected = answers[question.id] === option
                const isRight = showFeedback && option === question.answer
                const isWrong = showFeedback && selected && option !== question.answer

                return (
                  <button
                    key={option}
                    onClick={() => !showFeedback && handleAnswer(option)}
                    disabled={showFeedback}
                    className={cn(
                      "p-4 rounded-xl border-2 text-left text-sm font-medium transition-all",
                      isRight
                        ? "border-mint bg-mint-light text-foreground"
                        : isWrong
                        ? "border-coral bg-coral-light text-foreground"
                        : selected
                        ? "border-primary bg-primary/5 text-foreground"
                        : "border-border bg-card text-foreground hover:border-muted-foreground"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span>{option}</span>
                      {isRight && <CheckCircle2 className="h-5 w-5 text-mint" />}
                      {isWrong && <XCircle className="h-5 w-5 text-coral" />}
                    </div>
                  </button>
                )
              })}
            </div>
          )}

          {/* Sentence correction */}
          {question.type === "sentence-correction" && (
            <SentenceCorrection
              onSubmit={(val) => handleAnswer(val)}
              disabled={showFeedback}
            />
          )}

          {/* Word arrangement */}
          {question.type === "word-arrange" && (
            <WordArrange
              question={question.question}
              onSubmit={(val) => handleAnswer(val)}
              disabled={showFeedback}
            />
          )}

          {/* Feedback toast */}
          {showFeedback && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "mt-4 p-3 rounded-xl text-center text-sm font-semibold",
                isCorrect(question.id)
                  ? "bg-mint-light text-mint"
                  : "bg-coral-light text-coral"
              )}
            >
              {isCorrect(question.id) ? "Correct! Great job!" : `Not quite. The answer is: ${question.answer}`}
              {question.explanation && isCorrect(question.id) && (
                <p className="text-xs font-normal mt-1 text-muted-foreground">{question.explanation}</p>
              )}
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}

function SentenceCorrection({ onSubmit, disabled }: { onSubmit: (val: string) => void; disabled: boolean }) {
  const [value, setValue] = useState("")
  return (
    <div className="space-y-3">
      <Input
        placeholder="Type the corrected sentence..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="rounded-xl"
        disabled={disabled}
      />
      <Button
        className="rounded-xl w-full"
        disabled={!value.trim() || disabled}
        onClick={() => onSubmit(value)}
      >
        Submit Answer <ChevronRight className="h-4 w-4 ml-1" />
      </Button>
    </div>
  )
}

function WordArrange({ question, onSubmit, disabled }: { question: string; onSubmit: (val: string) => void; disabled: boolean }) {
  const wordsRaw = question.replace("Arrange: ", "").split(" / ")
  const [available, setAvailable] = useState(
    () => [...wordsRaw].sort(() => Math.random() - 0.5)
  )
  const [selected, setSelected] = useState<string[]>([])

  function addWord(word: string, idx: number) {
    setSelected((prev) => [...prev, word])
    setAvailable((prev) => prev.filter((_, i) => i !== idx))
  }

  function removeWord(word: string, idx: number) {
    setAvailable((prev) => [...prev, word])
    setSelected((prev) => prev.filter((_, i) => i !== idx))
  }

  return (
    <div className="space-y-4">
      {/* Selected words */}
      <div className="min-h-14 p-3 rounded-xl border-2 border-dashed border-border bg-muted/30 flex flex-wrap gap-2">
        {selected.length === 0 && (
          <span className="text-sm text-muted-foreground">Tap words to arrange the sentence...</span>
        )}
        {selected.map((w, i) => (
          <button
            key={`${w}-${i}`}
            onClick={() => !disabled && removeWord(w, i)}
            className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium"
          >
            {w}
          </button>
        ))}
      </div>

      {/* Available words */}
      <div className="flex flex-wrap gap-2">
        {available.map((w, i) => (
          <button
            key={`${w}-${i}`}
            onClick={() => !disabled && addWord(w, i)}
            className="px-3 py-1.5 rounded-lg bg-card border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors"
          >
            {w}
          </button>
        ))}
      </div>

      <Button
        className="rounded-xl w-full"
        disabled={selected.length === 0 || disabled}
        onClick={() => onSubmit(selected.join(" "))}
      >
        Submit Answer <ChevronRight className="h-4 w-4 ml-1" />
      </Button>
    </div>
  )
}
