import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { SidebarProvider } from "@/components/ui/sidebar"
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "@/lib/queryClient"
import AuthWrapper from "@/components/AuthWrapper" // Impor AuthWrapper
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "VehicleFlow - Manajemen Kendaraan",
  description: "Aplikasi manajemen kendaraan untuk perusahaan tambang",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <SidebarProvider defaultOpen={true}>
            <QueryClientProvider client={queryClient}>
              <AuthWrapper>{children}</AuthWrapper>
            </QueryClientProvider>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
