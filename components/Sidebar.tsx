"use client"
import { usePathname, useRouter } from "next/navigation"
import {
  BarChart3,
  FileText,
  CheckCircle,
  Car,
  Users,
  FileBarChart,
  Settings,
  User,
  LogOut,
  Sun,
  Moon,
} from "lucide-react"
import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { apiRequest } from "@/lib/queryClient"
import React from "react"

const Sidebar = () => {
  const pathname = usePathname()
  const router = useRouter()
  const { setTheme } = useTheme()
  const { state: sidebarState, open: sidebarOpen } = useSidebar()
  const [activeMenu, setActiveMenu] = useState("dashboard")
  const [userRole, setUserRole] = useState<string | null>(null)

  const allMenuItems = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3, href: "/" },
    { id: "daftar-pemesanan", label: "Daftar Pemesanan", icon: FileText, href: "/daftar-pemesanan" },
    { id: "persetujuan", label: "Persetujuan", icon: CheckCircle, href: "/persetujuan" },
    { id: "kelola-kendaraan", label: "Kelola Kendaraan", icon: Car, href: "/kelola-kendaraan" },
    { id: "kelola-driver", label: "Kelola Driver", icon: Users, href: "/kelola-driver" },
    { id: "laporan", label: "Laporan", icon: FileBarChart, href: "/laporan" },
    { id: "pengaturan", label: "Pengaturan", icon: Settings, href: "/pengaturan" },
  ]

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await apiRequest("GET", "/api/auth/me")
        setUserRole(response.role)
      } catch (error) {
        console.error("Failed to fetch user role in Sidebar:", error)
        // No redirect here, AuthWrapper handles it
        setUserRole(null) // Ensure role is null if fetch fails
      }
    }
    fetchUserRole()

    const path = pathname.split("/")[1] || "dashboard"
    setActiveMenu(path === "" ? "dashboard" : path)
    console.log(
      "Sidebar rendered. Current pathname:",
      pathname,
      "Active menu:",
      path,
      "Sidebar state:",
      sidebarState,
      "Sidebar open:",
      sidebarOpen,
    )
  }, [pathname, sidebarState, sidebarOpen])

  const filteredMenuItems = React.useMemo(() => {
    if (userRole === "manager") {
      return allMenuItems.filter(
        (item) =>
          item.id === "dashboard" ||
          item.id === "daftar-pemesanan" ||
          item.id === "persetujuan" ||
          item.id === "laporan",
      )
    }
    // For admin or other roles, show all items
    return allMenuItems
  }, [userRole])

  const isMenuItemActive = (href: string) => {
    if (href === "/" && pathname === "/") {
      return true
    }
    return pathname === href
  }

  const handleLogout = () => {
    localStorage.removeItem("userRole") // Clear role on logout
    router.push("/login") // Redirect to login page
  }

  return (
    <ShadcnSidebar className="fixed h-full border-r left-0 top-0 z-10" collapsible="icon" variant="sidebar">
      <SidebarHeader className="p-6 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <Car className="w-6 h-6 text-white" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-50">VehicleFlow</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">Manajemen Kendaraan</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="flex-1 p-4">
        <SidebarGroup>
          <SidebarMenu>
            {filteredMenuItems.map((item) => {
              const Icon = item.icon
              return (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    isActive={isMenuItemActive(item.href)}
                    onClick={() => {
                      router.push(item.href)
                    }}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4 pt-2">
        <SidebarSeparator className="mb-4" />
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" className="flex items-center gap-3" onClick={handleLogout}>
              <User className="w-5 h-5" />
              <div className="flex flex-col items-start">
                <span className="text-sm font-medium">
                  {userRole ? userRole.charAt(0).toUpperCase() + userRole.slice(1) : "Loading..."}
                </span>
                <span className="text-xs text-gray-600 dark:text-gray-400">
                  {userRole === "admin" ? "Administrator" : "Manager"}
                </span>
              </div>
              <LogOut className="w-5 h-5 ml-auto text-gray-600 dark:text-gray-400" />
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="w-full mt-2 bg-transparent">
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </ShadcnSidebar>
  )
}

export default Sidebar
