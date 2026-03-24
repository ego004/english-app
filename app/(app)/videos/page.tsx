"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Play, CheckCircle2, Clock, BookOpen, StickyNote, Check,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { videos, type Video } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
}
const item = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
}

export default function VideosPage() {
  const [selectedVideo, setSelectedVideo] = useState<Video>(videos[0])
  const [watchedIds, setWatchedIds] = useState<Set<string>>(
    new Set(videos.filter((v) => v.watched).map((v) => v.id))
  )
  const [notes, setNotes] = useState("")

  function markWatched() {
    setWatchedIds((prev) => new Set([...prev, selectedVideo.id]))
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={container}
      className="p-6 md:p-8 max-w-6xl mx-auto"
    >
      <motion.div variants={item} className="mb-6">
        <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">Video Learning</h1>
        <p className="text-muted-foreground text-sm mt-1">Watch engaging videos and learn new things!</p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main video area */}
        <motion.div variants={item} className="lg:col-span-2">
          {/* Video player */}
          <Card className="border-0 shadow-sm overflow-hidden mb-4">
            <div className="aspect-video bg-foreground/5 flex items-center justify-center relative">
              <iframe
                src={selectedVideo.videoUrl}
                title={selectedVideo.title}
                className="w-full h-full absolute inset-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </Card>

          {/* Video info */}
          <Card className="border-0 shadow-sm mb-4">
            <CardContent className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-display text-lg font-bold text-foreground">{selectedVideo.title}</h2>
                  <p className="text-sm text-muted-foreground mt-1">{selectedVideo.description}</p>
                  <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{selectedVideo.duration}</span>
                    <Badge variant="secondary" className="text-[10px] capitalize">{selectedVideo.subject}</Badge>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant={watchedIds.has(selectedVideo.id) ? "secondary" : "default"}
                  className="rounded-full shrink-0"
                  onClick={markWatched}
                >
                  {watchedIds.has(selectedVideo.id) ? (
                    <><CheckCircle2 className="h-4 w-4 mr-1" /> Watched</>
                  ) : (
                    <><Check className="h-4 w-4 mr-1" /> Mark Watched</>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Notes */}
          <Card className="border-0 shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <StickyNote className="h-4 w-4 text-sunshine" />
                <h3 className="font-display font-bold text-foreground text-sm">My Notes</h3>
              </div>
              <Textarea
                placeholder="Write your notes about this video here..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="min-h-24 rounded-xl resize-none"
              />
            </CardContent>
          </Card>
        </motion.div>

        {/* Playlist sidebar */}
        <motion.div variants={item}>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <h3 className="font-display font-bold text-foreground mb-3 text-sm">Playlist</h3>
              <ScrollArea className="h-[500px] lg:h-[600px]">
                <div className="space-y-2 pr-2">
                  {videos.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVideo(v)}
                      className={cn(
                        "w-full text-left p-3 rounded-xl transition-all flex items-start gap-3",
                        selectedVideo.id === v.id
                          ? "bg-primary/10 border border-primary/20"
                          : "hover:bg-muted"
                      )}
                    >
                      <div className={cn(
                        "h-8 w-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5",
                        watchedIds.has(v.id) ? "bg-mint-light" : "bg-sky-light"
                      )}>
                        {watchedIds.has(v.id) ? (
                          <CheckCircle2 className="h-4 w-4 text-mint" />
                        ) : (
                          <Play className="h-4 w-4 text-sky" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className={cn(
                          "text-sm font-medium truncate",
                          selectedVideo.id === v.id ? "text-primary" : "text-foreground"
                        )}>
                          {v.title}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">{v.duration}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}
