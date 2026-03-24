"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import {
  BookOpen, FileText, Video, Brain, Mic, Star,
  Sparkles, ArrowRight, CheckCircle2, ChevronRight,
  PlayCircle, GraduationCap, Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" }
  }),
}

const features = [
  { icon: BookOpen, label: "Interactive Lessons", description: "Fun, step-by-step lessons that make learning exciting", color: "bg-sky-light text-sky" },
  { icon: FileText, label: "Fun Worksheets", description: "Drag-and-drop, puzzles, and fill-in-the-blank activities", color: "bg-sunshine-light text-sunshine" },
  { icon: Brain, label: "Practice Quizzes", description: "Test your skills with gamified quizzes and instant feedback", color: "bg-mint-light text-mint" },
  { icon: Video, label: "Video Learning", description: "Watch engaging animated videos to learn new concepts", color: "bg-lavender-light text-lavender" },
  { icon: Mic, label: "Speaking Practice", description: "Record your voice and practice pronunciation", color: "bg-coral-light text-coral" },
  { icon: GraduationCap, label: "Track Progress", description: "Earn XP, badges, and climb the leaderboard", color: "bg-sky-light text-sky" },
]

const testimonials = [
  { name: "Sarah M.", role: "Parent", text: "My daughter loves BrightWords! She asks to do lessons every day. Her vocabulary has improved so much in just two months.", avatar: "S" },
  { name: "James T.", role: "Parent", text: "The gamification keeps my son motivated. He's actually excited about learning English now. The quizzes are his favorite!", avatar: "J" },
  { name: "Emily R.", role: "Teacher", text: "I recommend BrightWords to all my students. The content is well-structured and age-appropriate. A fantastic tool!", avatar: "E" },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-card/90 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Sparkles className="h-5 w-5" />
            </div>
            <span className="font-display text-xl font-bold text-foreground">BrightWords</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#testimonials" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Testimonials</a>
            <Link href="/login">
              <Button variant="ghost" size="sm">Log In</Button>
            </Link>
            <Link href="/dashboard">
              <Button size="sm" className="rounded-full px-5">
                Start Learning
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </nav>
          <Link href="/dashboard" className="md:hidden">
            <Button size="sm" className="rounded-full">Start</Button>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative py-20 md:py-32 px-6">
        {/* Decorative blobs */}
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-sky-light/40 blur-3xl" aria-hidden="true" />
        <div className="absolute bottom-10 right-10 w-72 h-72 rounded-full bg-sunshine-light/40 blur-3xl" aria-hidden="true" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-lavender-light/30 blur-3xl" aria-hidden="true" />

        <div className="relative max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sunshine-light text-secondary-foreground text-sm font-semibold mb-8">
              <Star className="h-4 w-4 fill-current" />
              <span>Trusted by 10,000+ families worldwide</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="font-display text-4xl md:text-6xl lg:text-7xl font-extrabold text-foreground leading-tight text-balance"
          >
            Learn English{" "}
            <span className="text-primary">the Fun Way!</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed"
          >
            Interactive lessons, fun quizzes, and exciting challenges designed for children ages 5-12. Watch your child build confidence in English every day.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/dashboard">
              <Button size="lg" className="rounded-full px-8 text-base h-14 shadow-lg hover:shadow-xl transition-shadow">
                <PlayCircle className="mr-2 h-5 w-5" />
                Start Learning
              </Button>
            </Link>
            <Link href="/parent">
              <Button variant="outline" size="lg" className="rounded-full px-8 text-base h-14">
                <Users className="mr-2 h-5 w-5" />
                Parent Dashboard
              </Button>
            </Link>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-16 flex flex-wrap items-center justify-center gap-8 md:gap-16"
          >
            {[
              { value: "10K+", label: "Active Learners" },
              { value: "500+", label: "Lessons" },
              { value: "98%", label: "Happy Parents" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-display text-3xl md:text-4xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-6 bg-card">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeUp}
              custom={0}
              className="font-display text-3xl md:text-4xl font-bold text-foreground"
            >
              Everything Your Child Needs
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={1}
              className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto text-pretty"
            >
              A complete English learning experience with interactive tools and gamified activities
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {features.map((feature, i) => (
              <motion.div key={feature.label} variants={fadeUp} custom={i + 2}>
                <Card className="h-full border-0 shadow-sm hover:shadow-md transition-shadow bg-background">
                  <CardContent className="p-6">
                    <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${feature.color} mb-4`}>
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-display text-lg font-bold text-foreground">{feature.label}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeUp} custom={0} className="font-display text-3xl md:text-4xl font-bold text-foreground">
              How It Works
            </motion.h2>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              { step: "1", title: "Choose a Subject", desc: "Pick from Vocabulary, Grammar, Reading, Writing, Listening, or Speaking." },
              { step: "2", title: "Complete Lessons", desc: "Interactive lessons with examples, audio, and fun activities keep you engaged." },
              { step: "3", title: "Earn Rewards", desc: "Collect XP, unlock badges, climb the leaderboard, and track your progress!" },
            ].map((item, i) => (
              <motion.div key={item.step} variants={fadeUp} custom={i} className="text-center">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground font-display text-2xl font-bold mb-4 shadow-lg">
                  {item.step}
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-6 bg-card">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeUp} custom={0} className="font-display text-3xl md:text-4xl font-bold text-foreground">
              Loved by Families
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="mt-4 text-muted-foreground text-lg">
              See what parents and teachers have to say
            </motion.p>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6"
          >
            {testimonials.map((t, i) => (
              <motion.div key={t.name} variants={fadeUp} custom={i + 2}>
                <Card className="h-full border-0 shadow-sm bg-background">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="h-4 w-4 fill-sunshine text-sunshine" />
                      ))}
                    </div>
                    <p className="text-sm text-foreground leading-relaxed mt-3">{`"${t.text}"`}</p>
                    <div className="flex items-center gap-3 mt-4 pt-4 border-t border-border">
                      <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                        {t.avatar}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{t.name}</p>
                        <p className="text-xs text-muted-foreground">{t.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center bg-primary rounded-3xl p-12 md:p-16 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-primary-foreground/5 blur-2xl" aria-hidden="true" />
          <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-primary-foreground/5 blur-2xl" aria-hidden="true" />
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground text-balance relative">
            Ready to Start the Adventure?
          </h2>
          <p className="mt-4 text-primary-foreground/80 text-lg relative">
            Join thousands of happy learners today - it only takes a minute!
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 relative">
            <Link href="/signup">
              <Button size="lg" variant="secondary" className="rounded-full px-8 text-base h-14">
                Create Free Account
                <ChevronRight className="ml-1 h-5 w-5" />
              </Button>
            </Link>
          </div>
          <div className="mt-6 flex items-center justify-center gap-6 text-primary-foreground/70 text-sm relative">
            <span className="flex items-center gap-1"><CheckCircle2 className="h-4 w-4" /> Free to start</span>
            <span className="flex items-center gap-1"><CheckCircle2 className="h-4 w-4" /> No credit card</span>
            <span className="flex items-center gap-1"><CheckCircle2 className="h-4 w-4" /> Kid-safe</span>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-12 px-6">
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">
                <Sparkles className="h-4 w-4" />
              </div>
              <span className="font-display text-lg font-bold text-foreground">BrightWords</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">Making English learning fun and engaging for children everywhere.</p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-3 text-sm">Learning</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/lessons" className="hover:text-foreground transition-colors">Lessons</Link></li>
              <li><Link href="/worksheets" className="hover:text-foreground transition-colors">Worksheets</Link></li>
              <li><Link href="/quizzes" className="hover:text-foreground transition-colors">Quizzes</Link></li>
              <li><Link href="/videos" className="hover:text-foreground transition-colors">Videos</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-3 text-sm">Practice</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/speaking" className="hover:text-foreground transition-colors">Speaking</Link></li>
              <li><Link href="/rewards" className="hover:text-foreground transition-colors">Rewards</Link></li>
              <li><Link href="/dashboard" className="hover:text-foreground transition-colors">Dashboard</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-3 text-sm">Parents</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/parent" className="hover:text-foreground transition-colors">Parent Dashboard</Link></li>
              <li><Link href="/settings" className="hover:text-foreground transition-colors">Settings</Link></li>
              <li><Link href="/login" className="hover:text-foreground transition-colors">Log In</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">2026 BrightWords. All rights reserved.</p>
          <div className="flex gap-6 text-xs text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-foreground transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
