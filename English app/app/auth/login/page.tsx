"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Sparkles, Eye, EyeOff } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}
const item = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

export default function LoginPage() {
  const [role, setRole] = useState<"student" | "parent">("student")
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Decorative background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-20 left-10 h-32 w-32 rounded-full bg-sky-light/40" />
        <div className="absolute bottom-20 right-10 h-40 w-40 rounded-full bg-sunshine-light/40" />
        <div className="absolute top-40 right-20 h-24 w-24 rounded-full bg-lavender-light/40" />
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={container}
        className="w-full max-w-md relative"
      >
        {/* Logo */}
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
              <h1 className="font-display text-xl font-bold text-foreground text-center mb-1">
                Welcome Back!
              </h1>
              <p className="text-muted-foreground text-sm text-center mb-6">
                {"Let's continue your learning adventure"}
              </p>

              {/* Role toggle */}
              <div className="flex gap-2 p-1 rounded-xl bg-muted mb-6">
                {(["student", "parent"] as const).map((r) => (
                  <button
                    key={r}
                    onClick={() => setRole(r)}
                    className={cn(
                      "flex-1 py-2 rounded-lg text-sm font-medium transition-all capitalize",
                      role === r
                        ? "bg-card text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {r === "student" ? "I'm a Student" : "I'm a Parent"}
                  </button>
                ))}
              </div>

              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-2">
                  <Label htmlFor="email">
                    {role === "student" ? "Username" : "Email Address"}
                  </Label>
                  <Input
                    id="email"
                    type={role === "student" ? "text" : "email"}
                    placeholder={role === "student" ? "Your fun username" : "parent@email.com"}
                    className="rounded-xl h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Your secret password"
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

                <div className="flex justify-end">
                  <Link href="/auth/forgot-password" className="text-xs text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>

                <Link href={role === "parent" ? "/parent" : "/dashboard"}>
                  <Button className="w-full rounded-xl h-11" type="button">
                    {"Let's Go!"}
                  </Button>
                </Link>
              </form>

              <p className="text-center text-sm text-muted-foreground mt-6">
                {"Don't have an account? "}
                <Link href="/auth/signup" className="text-primary font-medium hover:underline">
                  Sign Up
                </Link>
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  )
}
