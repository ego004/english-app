"use client"

import { useMemo, useState } from "react"
import { motion } from "framer-motion"
import { Send, Bot, User } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { getConversationReply } from "@/lib/api"
import { getLearnerProfile } from "@/lib/learner-profile"

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}
const item = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
}

type ChatMessage = {
  role: "user" | "assistant"
  text: string
  tip?: string
}

export default function ConversationPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", text: "Hi! Let’s practice English. Tell me about your day." },
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)

  const profile = useMemo(() => getLearnerProfile(), [])

  async function handleSend() {
    const message = input.trim()
    if (!message || loading) {
      return
    }

    setInput("")
    setMessages((current) => [...current, { role: "user", text: message }])
    setLoading(true)

    try {
      const response = await getConversationReply({
        learner_id: profile.learnerId,
        message,
        proficiency_level: profile.proficiencyLevel,
      })
      setMessages((current) => [
        ...current,
        { role: "assistant", text: response.reply, tip: response.tip },
      ])
    } catch {
      setMessages((current) => [
        ...current,
        { role: "assistant", text: "Nice! Could you explain a bit more?", tip: "Try one longer sentence." },
      ])
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
      <motion.div variants={item} className="mb-6">
        <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">Conversation Chatbot</h1>
        <p className="text-muted-foreground text-sm mt-1">Practice chat adapted to your preset difficulty</p>
      </motion.div>

      <motion.div variants={item}>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4 md:p-6">
            <div className="mb-3 flex items-center justify-between">
              <Badge variant="outline">Level: {profile.proficiencyLevel}</Badge>
              <Badge variant="outline">Age: {profile.ageBand}</Badge>
            </div>

            <div className="space-y-3 h-[420px] overflow-y-auto rounded-xl bg-muted/30 p-4">
              {messages.map((message, index) => (
                <div key={`${message.role}-${index}`} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] rounded-2xl px-4 py-3 ${message.role === "user" ? "bg-primary text-primary-foreground" : "bg-card border border-border"}`}>
                    <div className="flex items-center gap-2 mb-1">
                      {message.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                      <p className="text-xs font-semibold opacity-80">{message.role === "user" ? "You" : "Coach"}</p>
                    </div>
                    <p className="text-sm leading-relaxed">{message.text}</p>
                    {message.tip && <p className="text-xs mt-2 opacity-80">Tip: {message.tip}</p>}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center gap-2">
              <Input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Type your message..."
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault()
                    handleSend()
                  }
                }}
              />
              <Button onClick={handleSend} disabled={loading || !input.trim()} className="rounded-full gap-2">
                <Send className="h-4 w-4" />
                {loading ? "Sending..." : "Send"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
