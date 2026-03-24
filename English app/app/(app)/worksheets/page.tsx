"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  FileText, CheckCircle2, Download, Play,
  GripVertical, Puzzle, PenLine, ArrowLeftRight,
  ChevronRight, Sparkles,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { worksheets, type Worksheet } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
}
const item = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
}

const typeIcons: Record<string, React.ElementType> = {
  "fill-blanks": PenLine,
  "match": ArrowLeftRight,
  "drag-drop": GripVertical,
  "puzzle": Puzzle,
}

const typeLabels: Record<string, string> = {
  "fill-blanks": "Fill in the Blanks",
  "match": "Match the Following",
  "drag-drop": "Drag and Drop",
  "puzzle": "Word Puzzle",
}

export default function WorksheetsPage() {
  const [activeWorksheet, setActiveWorksheet] = useState<Worksheet | null>(null)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)

  function startWorksheet(ws: Worksheet) {
    setActiveWorksheet(ws)
    setAnswers({})
    setSubmitted(false)
    setScore(0)
  }

  function handleSubmit() {
    if (!activeWorksheet) return
    let correct = 0
    activeWorksheet.questions.forEach((q) => {
      if (answers[q.id]?.toLowerCase().trim() === q.answer.toLowerCase().trim()) {
        correct++
      }
    })
    setScore(correct)
    setSubmitted(true)
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={container}
      className="p-6 md:p-8 max-w-6xl mx-auto"
    >
      <motion.div variants={item} className="mb-6">
        <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">Worksheets</h1>
        <p className="text-muted-foreground text-sm mt-1">Interactive activities to practice your skills!</p>
      </motion.div>

      <AnimatePresence mode="wait">
        {!activeWorksheet ? (
          <motion.div
            key="list"
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0 }}
            variants={container}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {worksheets.map((ws) => {
              const TypeIcon = typeIcons[ws.type] || FileText
              return (
                <motion.div key={ws.id} variants={item}>
                  <Card className="border-0 shadow-sm hover:shadow-md transition-all cursor-pointer group h-full"
                    onClick={() => startWorksheet(ws)}
                  >
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div className={cn(
                          "h-10 w-10 rounded-xl flex items-center justify-center",
                          ws.completed ? "bg-mint-light" : "bg-sunshine-light"
                        )}>
                          <TypeIcon className={cn("h-5 w-5", ws.completed ? "text-mint" : "text-sunshine")} />
                        </div>
                        <Badge variant="secondary" className="text-[10px]">{ws.level}</Badge>
                      </div>
                      <h3 className="font-display font-bold text-foreground group-hover:text-primary transition-colors">
                        {ws.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1">{typeLabels[ws.type]}</p>
                      <div className="flex items-center gap-2 mt-3">
                        <Badge variant="outline" className="text-[10px] capitalize">{ws.subject}</Badge>
                        <span className="text-xs text-muted-foreground">{ws.questions.length} questions</span>
                      </div>
                      <div className="mt-3 flex items-center text-xs font-semibold text-primary">
                        <Play className="h-3 w-3 mr-1" /> Start Activity
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>
        ) : (
          <motion.div
            key="active"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <Button
              variant="ghost"
              size="sm"
              className="mb-6"
              onClick={() => setActiveWorksheet(null)}
            >
              Back to Worksheets
            </Button>

            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="font-display text-xl font-bold text-foreground">{activeWorksheet.title}</h2>
                    <p className="text-sm text-muted-foreground">{typeLabels[activeWorksheet.type]}</p>
                  </div>
                  <Button variant="outline" size="sm" className="rounded-full gap-1">
                    <Download className="h-3.5 w-3.5" /> PDF
                  </Button>
                </div>

                <div className="space-y-6">
                  {activeWorksheet.questions.map((q, idx) => (
                    <div key={q.id} className="p-4 rounded-xl bg-muted/30">
                      <p className="font-semibold text-sm text-foreground mb-3">
                        <span className="inline-flex h-6 w-6 rounded-full bg-primary text-primary-foreground items-center justify-center text-xs mr-2">
                          {idx + 1}
                        </span>
                        {q.question}
                      </p>

                      {/* Fill in the blanks / Puzzle */}
                      {(activeWorksheet.type === "fill-blanks" || activeWorksheet.type === "puzzle") && (
                        <div className="space-y-2">
                          {q.options ? (
                            <div className="flex flex-wrap gap-2">
                              {q.options.map((opt) => (
                                <button
                                  key={opt}
                                  onClick={() => !submitted && setAnswers({ ...answers, [q.id]: opt })}
                                  className={cn(
                                    "px-4 py-2 rounded-xl text-sm font-medium border-2 transition-all",
                                    answers[q.id] === opt
                                      ? submitted
                                        ? opt.toLowerCase() === q.answer.toLowerCase()
                                          ? "border-mint bg-mint-light text-foreground"
                                          : "border-coral bg-coral-light text-foreground"
                                        : "border-primary bg-primary/10 text-foreground"
                                      : "border-border bg-card text-foreground hover:border-muted-foreground",
                                    submitted && "cursor-default"
                                  )}
                                >
                                  {opt}
                                </button>
                              ))}
                            </div>
                          ) : (
                            <Input
                              placeholder="Type your answer..."
                              value={answers[q.id] || ""}
                              onChange={(e) => !submitted && setAnswers({ ...answers, [q.id]: e.target.value })}
                              className={cn(
                                "rounded-xl",
                                submitted && answers[q.id]?.toLowerCase().trim() === q.answer.toLowerCase().trim() && "border-mint",
                                submitted && answers[q.id]?.toLowerCase().trim() !== q.answer.toLowerCase().trim() && "border-coral"
                              )}
                              disabled={submitted}
                            />
                          )}
                          {submitted && answers[q.id]?.toLowerCase().trim() !== q.answer.toLowerCase().trim() && (
                            <p className="text-xs text-mint font-semibold">
                              Correct answer: {q.answer}
                            </p>
                          )}
                        </div>
                      )}

                      {/* Match type */}
                      {activeWorksheet.type === "match" && q.pairs && (
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            {q.pairs.map((p) => (
                              <div key={p.left} className="px-4 py-2.5 rounded-xl bg-sky-light text-sm font-medium text-foreground">
                                {p.left}
                              </div>
                            ))}
                          </div>
                          <div className="space-y-2">
                            {q.pairs.map((p) => (
                              <div key={p.right} className="px-4 py-2.5 rounded-xl bg-sunshine-light text-sm font-medium text-foreground">
                                {p.right}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Drag & Drop type */}
                      {activeWorksheet.type === "drag-drop" && (
                        <Input
                          placeholder="Type the correct arrangement..."
                          value={answers[q.id] || ""}
                          onChange={(e) => !submitted && setAnswers({ ...answers, [q.id]: e.target.value })}
                          className="rounded-xl"
                          disabled={submitted}
                        />
                      )}
                    </div>
                  ))}
                </div>

                {!submitted ? (
                  <Button
                    size="lg"
                    className="rounded-full mt-8 shadow-md"
                    onClick={handleSubmit}
                  >
                    Check Answers
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-8 p-6 rounded-2xl bg-sky-light/30 text-center"
                  >
                    <Sparkles className="h-10 w-10 text-sunshine mx-auto mb-3" />
                    <p className="font-display text-2xl font-bold text-foreground">
                      {score}/{activeWorksheet.questions.length} Correct!
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {score === activeWorksheet.questions.length
                        ? "Perfect score! Amazing work!"
                        : "Great effort! Keep practicing!"}
                    </p>
                    <Button
                      variant="outline"
                      className="rounded-full mt-4"
                      onClick={() => setActiveWorksheet(null)}
                    >
                      Back to Worksheets
                    </Button>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
