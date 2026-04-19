"use client"

import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { AppSidebar, MobileNav } from "@/components/app-sidebar"
import { getAccessToken } from "@/lib/auth-session"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [isAllowed, setIsAllowed] = useState(false)

  useEffect(() => {
    const token = getAccessToken()
    if (!token) {
      router.replace(`/auth/login?next=${encodeURIComponent(pathname || "/dashboard")}`)
      return
    }
    setIsAllowed(true)
  }, [router, pathname])

  if (!isAllowed) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />
      <MobileNav />
      <main className="md:ml-64 pt-16 md:pt-0 pb-20 md:pb-0 min-h-screen">
        {children}
      </main>
    </div>
  )
}
