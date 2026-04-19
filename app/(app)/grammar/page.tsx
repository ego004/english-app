"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Sparkles, CheckCircle2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { getGrammarCorrection } from "@/lib/api"
import { getLearnerProfile } from "@/lib/learner-profile"

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}
const item = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
}

export default function GrammarPage() {
  const [text, setText] = useState("She go to school yesterday.")
  const [corrected, setCorrected] = useState("")
  const [explanation, setExplanation] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleCheck() {
    if (!text.trim()) {
      return
    }

    setLoading(true)
    try {
      const profile = getLearnerProfile()
      const response = await getGrammarCorrection({
        learner_id: profile.learnerId,
        text: text.trim(),
      })
      setCorrected(response.corrected_text)
      setExplanation(response.explanation)
    } catch {
      setCorrected(text)
      setExplanation("Nice effort. Check verb tense and subject-verb agreement.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={container}
      className="p-6 md:p-8 max-w-4xl mx-auto"
    >
      <motion.div variants={item} className="mb-8">
        <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">Grammar Practice</h1>
        <p className="text-muted-foreground text-sm mt-1">Write a sentence and get instant correction</p>
      </motion.div>

      <motion.div variants={item}>
        <Card className="border-0 shadow-sm mb-6">
          <CardContent className="p-6 space-y-4">
            <Textarea
              value={text}
              onChange={(event) => setText(event.target.value)}
              placeholder="Type your sentence here..."
              className="min-h-32"
            />
            <Button onClick={handleCheck} disabled={loading || !text.trim()} className="rounded-full px-6 gap-2">
              <Sparkles className="h-4 w-4" />
              {loading ? "Checking..." : "Check Grammar"}
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {corrected && (
        <motion.div variants={item}>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6 space-y-3">
              <div className="flex items-center gap-2 text-foreground">
                <CheckCircle2 className="h-5 w-5 text-mint" />
                <h2 className="font-display font-bold">Corrected Version</h2>
              </div>
              <p className="text-base text-foreground">{corrected}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{explanation}</p>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </motion.div>
  )
}
