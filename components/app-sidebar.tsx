"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import {
  Home, BookOpen, FileText, Video, Brain, Mic, Trophy,
  Settings, Users, LayoutDashboard, Menu, X, Sparkles, PenTool, MessageSquare, Activity,
} from "lucide-react"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { avatars } from "@/lib/mock-data"
import { getLearnerProfile } from "@/lib/learner-profile"
import { getLearnerProgress } from "@/lib/api"
import { calculateLevel, calculateXp } from "@/lib/gamification"

const studentNavItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/lessons", label: "Lessons", icon: BookOpen },
  { href: "/grammar", label: "Grammar", icon: PenTool },
  { href: "/conversation", label: "Conversation", icon: MessageSquare },
  { href: "/worksheets", label: "Worksheets", icon: FileText },
  { href: "/videos", label: "Videos", icon: Video },
  { href: "/quizzes", label: "Quizzes", icon: Brain },
  { href: "/speaking", label: "Speaking", icon: Mic },
  { href: "/progress", label: "Progress", icon: Activity },
  { href: "/rewards", label: "Rewards", icon: Trophy },
]

const bottomNavItems = [
  { href: "/parent", label: "Parent Dashboard", icon: Users },
  { href: "/settings", label: "Settings", icon: Settings },
]

export function AppSidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const [profileName, setProfileName] = useState("Learner")
  const [profileAvatar, setProfileAvatar] = useState("fox")
  const [level, setLevel] = useState(0)
  const avatar = avatars.find((a) => a.id === profileAvatar)

  useEffect(() => {
    const profile = getLearnerProfile()
    setProfileName(profile.name)
    setProfileAvatar(profile.avatar)

    let cancelled = false
    getLearnerProgress(profile.learnerId, 100)
      .then((rows) => {
        if (cancelled) {
          return
        }
        const xp = calculateXp(rows)
        setLevel(calculateLevel(xp))
      })
      .catch(() => {
        if (!cancelled) {
          setLevel(0)
        }
      })

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={cn(
          "hidden md:flex flex-col fixed left-0 top-0 h-screen bg-card border-r border-border z-40 transition-all duration-300",
          collapsed ? "w-20" : "w-64"
        )}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 p-5 border-b border-border">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Sparkles className="h-5 w-5" />
          </div>
          {!collapsed && (
            <span className="font-display text-xl font-bold text-foreground tracking-tight">
              BrightWords
            </span>
          )}
        </div>

        {/* Profile */}
        <div className={cn("flex items-center gap-3 p-4 mx-3 mt-4 rounded-xl bg-sky-light/50", collapsed && "justify-center mx-1 p-3")}>
          <span className="text-2xl" role="img" aria-label={avatar?.label}>
            {avatar?.emoji}
          </span>
          {!collapsed && (
            <div className="min-w-0">
                  <p className="font-semibold text-sm text-foreground truncate">{profileName}</p>
              <p className="text-xs text-muted-foreground">Level {level}</p>
            </div>
          )}
        </div>

        {/* Nav items */}
        <nav className="flex-1 px-3 mt-4 space-y-1 overflow-y-auto">
          {studentNavItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all relative",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  collapsed && "justify-center px-2"
                )}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                {!collapsed && item.label}
              </Link>
            )
          })}
        </nav>

        {/* Bottom nav */}
        <div className="px-3 pb-4 space-y-1 border-t border-border pt-3">
          {bottomNavItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  collapsed && "justify-center px-2"
                )}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                {!collapsed && item.label}
              </Link>
            )
          })}
        </div>

        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-20 h-6 w-6 rounded-full bg-card border border-border flex items-center justify-center hover:bg-muted transition-colors"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <Menu className="h-3 w-3" />
        </button>
      </aside>
    </>
  )
}

export function MobileNav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [profileAvatar, setProfileAvatar] = useState("fox")
  const avatar = avatars.find((a) => a.id === profileAvatar)

  useEffect(() => {
    const profile = getLearnerProfile()
    setProfileAvatar(profile.avatar)
  }, [])

  return (
    <>
      {/* Mobile top bar */}
      <header className="md:hidden fixed top-0 left-0 right-0 h-16 bg-card/95 backdrop-blur-md border-b border-border z-50 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Sparkles className="h-4 w-4" />
          </div>
          <span className="font-display text-lg font-bold text-foreground">BrightWords</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xl">{avatar?.emoji}</span>
          <button
            onClick={() => setOpen(!open)}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden fixed inset-0 top-16 bg-card z-40 overflow-y-auto"
        >
          <nav className="p-4 space-y-1">
            {[...studentNavItems, ...bottomNavItems].map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </motion.div>
      )}

      {/* Mobile bottom tab bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-md border-t border-border z-50 flex items-center justify-around py-2 px-1">
        {studentNavItems.slice(0, 5).map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-lg text-[10px] font-medium transition-colors min-w-0",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="truncate">{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </>
  )
}
