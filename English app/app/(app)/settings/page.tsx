"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  User, Palette, Volume2, Globe, Moon, Sun, Save,
  Camera,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { avatars, mockStudent } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}
const item = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
}

export default function SettingsPage() {
  const [name, setName] = useState(mockStudent.name)
  const [selectedAvatar, setSelectedAvatar] = useState(mockStudent.avatar)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [darkMode, setDarkMode] = useState(false)
  const [language, setLanguage] = useState("english")
  const [saved, setSaved] = useState(false)

  function handleSave() {
    setSaved(true)
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={container}
      className="p-6 md:p-8 max-w-3xl mx-auto"
    >
      <motion.div variants={item} className="mb-8">
        <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground text-sm mt-1">Customize your learning experience</p>
      </motion.div>

      {/* Profile section */}
      <motion.div variants={item}>
        <Card className="border-0 shadow-sm mb-6">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-5">
              <User className="h-5 w-5 text-muted-foreground" />
              <h2 className="font-display font-bold text-foreground">Profile</h2>
            </div>

            <div className="space-y-5">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">Display Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="rounded-xl max-w-sm"
                  placeholder="Your name"
                />
              </div>

              <Separator />

              {/* Avatar */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Camera className="h-4 w-4 text-muted-foreground" />
                  <Label className="text-sm font-medium">Choose Avatar</Label>
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
                  {avatars.map((a) => (
                    <button
                      key={a.id}
                      onClick={() => setSelectedAvatar(a.id)}
                      className={cn(
                        "h-14 w-14 rounded-2xl flex items-center justify-center text-2xl transition-all border-2",
                        selectedAvatar === a.id
                          ? "border-primary bg-primary/10 scale-110 shadow-md"
                          : "border-border bg-card hover:border-muted-foreground"
                      )}
                      aria-label={`Select ${a.label} avatar`}
                    >
                      {a.emoji}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  Selected: {avatars.find((a) => a.id === selectedAvatar)?.label}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Preferences */}
      <motion.div variants={item}>
        <Card className="border-0 shadow-sm mb-6">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-5">
              <Palette className="h-5 w-5 text-muted-foreground" />
              <h2 className="font-display font-bold text-foreground">Preferences</h2>
            </div>

            <div className="space-y-6">
              {/* Sound */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-sky-light flex items-center justify-center">
                    <Volume2 className="h-5 w-5 text-sky" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Sound Effects</p>
                    <p className="text-xs text-muted-foreground">Play sounds during lessons and quizzes</p>
                  </div>
                </div>
                <Switch checked={soundEnabled} onCheckedChange={setSoundEnabled} />
              </div>

              <Separator />

              {/* Dark/Light mode */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-lavender-light flex items-center justify-center">
                    {darkMode ? (
                      <Moon className="h-5 w-5 text-lavender" />
                    ) : (
                      <Sun className="h-5 w-5 text-lavender" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Dark Mode</p>
                    <p className="text-xs text-muted-foreground">Switch between light and dark themes</p>
                  </div>
                </div>
                <Switch checked={darkMode} onCheckedChange={setDarkMode} />
              </div>

              <Separator />

              {/* Language */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-mint-light flex items-center justify-center">
                    <Globe className="h-5 w-5 text-mint" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Language Preference</p>
                    <p className="text-xs text-muted-foreground">Display language for the app</p>
                  </div>
                </div>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="w-36 rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="spanish">Spanish</SelectItem>
                    <SelectItem value="french">French</SelectItem>
                    <SelectItem value="arabic">Arabic</SelectItem>
                    <SelectItem value="chinese">Chinese</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Save button */}
      <motion.div variants={item} className="flex items-center gap-3">
        <Button className="rounded-full px-8 gap-2" onClick={handleSave}>
          <Save className="h-4 w-4" />
          {saved ? "Saved!" : "Save Changes"}
        </Button>
        {saved && (
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-sm text-mint font-medium"
          >
            Settings saved successfully
          </motion.span>
        )}
      </motion.div>
    </motion.div>
  )
}
