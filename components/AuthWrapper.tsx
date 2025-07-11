"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { apiRequest } from "@/lib/queryClient" // Import apiRequest
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar" // Import Sidebar
import CustomSidebar from "@/components/Sidebar"

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoadingAuth, setIsLoadingAuth] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await apiRequest("GET", "/api/auth/me")
        setIsAuthenticated(true)
      } catch (error) {
        setIsAuthenticated(false)
        // Only redirect if not already on the login page
        if (pathname !== "/login") {
          router.push("/login")
        }
      } finally {
        setIsLoadingAuth(false)
      }
    }

    checkAuth()
  }, [router, pathname])

  // If we are on the login page, always render it immediately
  if (pathname === "/login") {
    return <>{children}</>
  }

  // Show a loading state while checking authentication
  if (isLoadingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-600 dark:text-gray-400">Memuat...</p>
      </div>
    )
  }

  // If authenticated, render the main layout with sidebar
  if (isAuthenticated) {
    return (
      <div className="flex min-h-screen">
        <CustomSidebar />
        <SidebarInset>
          <main className="flex-1 py-4 px-6 mx-auto max-w-screen-xl transition-all duration-200 ease-linear">
            <SidebarTrigger className="md:hidden" />
            {children}
          </main>
        </SidebarInset>
      </div>
    )
  }

  // If not authenticated and not on login page, nothing to render here (redirect handled by useEffect)
  return null
}
