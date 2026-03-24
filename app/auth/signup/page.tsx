"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Sparkles, Eye, EyeOff, ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { avatars } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}
const item = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

export default function SignupPage() {
  const [step, setStep] = useState(1)
  const [role, setRole] = useState<"student" | "parent">("student")
  const [selectedAvatar, setSelectedAvatar] = useState("fox")
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-20 right-10 h-32 w-32 rounded-full bg-mint-light/40" />
        <div className="absolute bottom-20 left-10 h-40 w-40 rounded-full bg-coral-light/40" />
        <div className="absolute top-1/2 left-20 h-24 w-24 rounded-full bg-sky-light/40" />
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={container}
        className="w-full max-w-md relative"
      >
        <motion.div variants={item} className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="h-12 w-12 rounded-2xl bg-primary flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="font-display text-2xl font-bold text-foreground">BrightWords</span>
          </Link>
        </motion.div>

        <motion.div variants={item}>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              {/* Step indicator */}
              <div className="flex items-center justify-center gap-2 mb-6">
                {[1, 2].map((s) => (
                  <div
                    key={s}
                    className={cn(
                      "h-2 rounded-full transition-all",
                      s === step ? "w-8 bg-primary" : "w-2 bg-muted"
                    )}
                  />
                ))}
              </div>

              {step === 1 && (
                <>
                  <h1 className="font-display text-xl font-bold text-foreground text-center mb-1">
                    Join BrightWords!
                  </h1>
                  <p className="text-muted-foreground text-sm text-center mb-6">
                    Start your learning adventure today
                  </p>

                  <div className="flex gap-2 p-1 rounded-xl bg-muted mb-6">
                    {(["student", "parent"] as const).map((r) => (
                      <button
                        key={r}
                        onClick={() => setRole(r)}
                        className={cn(
                          "flex-1 py-2 rounded-lg text-sm font-medium transition-all",
                          role === r
                            ? "bg-card text-foreground shadow-sm"
                            : "text-muted-foreground hover:text-foreground"
                        )}
                      >
                        {r === "student" ? "Student" : "Parent"}
                      </button>
                    ))}
                  </div>

                  <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setStep(2) }}>
                    {role === "parent" && (
                      <div className="space-y-2">
                        <Label htmlFor="fullname">Full Name</Label>
                        <Input id="fullname" placeholder="Your name" className="rounded-xl h-11" />
                      </div>
                    )}
                    <div className="space-y-2">
                      <Label htmlFor="email">{role === "student" ? "Choose a Username" : "Email Address"}</Label>
                      <Input
                        id="email"
                        type={role === "student" ? "text" : "email"}
                        placeholder={role === "student" ? "Pick a cool username" : "parent@email.com"}
                        className="rounded-xl h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Create Password</Label>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Make it strong!"
                          className="rounded-xl h-11 pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                          aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                    <Button className="w-full rounded-xl h-11 gap-1" type="submit">
                      Next <ChevronRight className="h-4 w-4" />
                    </Button>
                  </form>
                </>
              )}

              {step === 2 && (
                <>
                  <h1 className="font-display text-xl font-bold text-foreground text-center mb-1">
                    Pick Your Avatar!
                  </h1>
                  <p className="text-muted-foreground text-sm text-center mb-6">
                    Choose a character to represent you
                  </p>

                  <div className="grid grid-cols-4 gap-3 mb-6">
                    {avatars.map((a) => (
                      <button
                        key={a.id}
                        onClick={() => setSelectedAvatar(a.id)}
                        className={cn(
                          "h-16 w-full rounded-2xl flex flex-col items-center justify-center gap-1 border-2 transition-all",
                          selectedAvatar === a.id
                            ? "border-primary bg-primary/10 scale-105 shadow-md"
                            : "border-border bg-card hover:border-muted-foreground"
                        )}
                        aria-label={`Select ${a.label}`}
                      >
                        <span className="text-2xl">{a.emoji}</span>
                        <span className="text-[10px] font-medium text-muted-foreground">{a.label}</span>
                      </button>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <Button variant="outline" className="flex-1 rounded-xl h-11" onClick={() => setStep(1)}>
                      Back
                    </Button>
                    <Link href="/dashboard" className="flex-1">
                      <Button className="w-full rounded-xl h-11">
                        {"Let's Start!"}
                      </Button>
                    </Link>
                  </div>
                </>
              )}

              <p className="text-center text-sm text-muted-foreground mt-6">
                Already have an account?{" "}
                <Link href="/auth/login" className="text-primary font-medium hover:underline">
                  Log In
                </Link>
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  )
}
