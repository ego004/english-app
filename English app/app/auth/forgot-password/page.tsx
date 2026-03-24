"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Sparkles, ArrowLeft, Mail, CheckCircle2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}
const item = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

export default function ForgotPasswordPage() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-32 left-20 h-28 w-28 rounded-full bg-sunshine-light/40" />
        <div className="absolute bottom-32 right-20 h-36 w-36 rounded-full bg-lavender-light/40" />
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
              {!submitted ? (
                <>
                  <h1 className="font-display text-xl font-bold text-foreground text-center mb-1">
                    Forgot Password?
                  </h1>
                  <p className="text-muted-foreground text-sm text-center mb-6">
                    {"No worries! Enter your email and we'll send you a reset link."}
                  </p>

                  <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setSubmitted(true) }}>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="parent@email.com"
                        className="rounded-xl h-11"
                      />
                    </div>
                    <Button className="w-full rounded-xl h-11 gap-2" type="submit">
                      <Mail className="h-4 w-4" />
                      Send Reset Link
                    </Button>
                  </form>
                </>
              ) : (
                <div className="text-center py-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring" }}
                  >
                    <div className="h-16 w-16 rounded-full bg-mint-light flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="h-8 w-8 text-mint" />
                    </div>
                  </motion.div>
                  <h2 className="font-display text-lg font-bold text-foreground mb-2">Check Your Email!</h2>
                  <p className="text-muted-foreground text-sm mb-6">
                    {"We've sent a password reset link to your email address. Please check your inbox."}
                  </p>
                  <Button variant="outline" className="rounded-full" onClick={() => setSubmitted(false)}>
                    Try Again
                  </Button>
                </div>
              )}

              <div className="text-center mt-6">
                <Link href="/auth/login" className="inline-flex items-center gap-1 text-sm text-primary hover:underline">
                  <ArrowLeft className="h-3 w-3" />
                  Back to Login
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  )
}
