"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bell, Car, CheckCircle, Clock, MoreVertical, Users } from "lucide-react"
import Link from "next/link"
import { QuickActions } from "@/components/QuickActions"
import { RecentOrders } from "@/components/RecentOrders"
import { StatusChart } from "@/components/StatusChart"
import { SystemNotifications } from "@/components/SystemNotifications"
import { UsageChart } from "@/components/UsageChart"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { apiRequest } from "@/lib/queryClient"

interface DashboardStats {
  totalVehicles: number
  availableVehicles: number
  totalDrivers: number
  onDutyDrivers: number
  pendingApprovals: number
  completedBookings: number
}

export default function Dashboard() {
  const { data: stats, isLoading: isLoadingStats } = useQuery<DashboardStats>({
    queryKey: ["/api/dashboard/stats"],
    queryFn: () => apiRequest("GET", "/api/dashboard/stats"),
  })

  return (
    <div className="flex flex-col flex-1 p-6">
      <header className="flex items-center justify-between mb-6">
        <div className="flex flex-col">
          <Breadcrumb className="mb-2">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Dashboard</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50">Dashboard</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">Ringkasan dan statistik operasional kendaraan</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Cari..."
              className="pl-9 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-50"
            />
          </div>
          <Button variant="outline" size="icon" className="w-9 h-9 bg-transparent">
            <Bell className="w-5 h-5" />
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Kendaraan</CardTitle>
            <Car className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{isLoadingStats ? "..." : (stats?.totalVehicles ?? "N/A")}</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {isLoadingStats ? "..." : `${stats?.availableVehicles ?? "N/A"} tersedia`}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Driver</CardTitle>
            <Users className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{isLoadingStats ? "..." : (stats?.totalDrivers ?? "N/A")}</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {isLoadingStats ? "..." : `${stats?.onDutyDrivers ?? "N/A"} bertugas`}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Persetujuan Pending</CardTitle>
            <Clock className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{isLoadingStats ? "..." : (stats?.pendingApprovals ?? "N/A")}</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              <Link href="/persetujuan" className="text-blue-600 hover:underline">
                Lihat detail
              </Link>
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pemesanan Selesai</CardTitle>
            <CheckCircle className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{isLoadingStats ? "..." : (stats?.completedBookings ?? "N/A")}</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              <Link href="/daftar-pemesanan" className="text-blue-600 hover:underline">
                Lihat riwayat
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900 dark:text-gray-50">
              Statistik Penggunaan Kendaraan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <UsageChart />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900 dark:text-gray-50">Status Kendaraan</CardTitle>
          </CardHeader>
          <CardContent>
            <StatusChart />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl font-semibold text-gray-900 dark:text-gray-50">Pemesanan Terbaru</CardTitle>
            <Button variant="ghost" className="text-sm">
              Lihat Semua
            </Button>
          </CardHeader>
          <CardContent>
            <RecentOrders />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl font-semibold text-gray-900 dark:text-gray-50">Notifikasi Sistem</CardTitle>
            <Button variant="ghost" size="icon">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <SystemNotifications />
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-900 dark:text-gray-50">Aksi Cepat</CardTitle>
        </CardHeader>
        <CardContent>
          <QuickActions />
        </CardContent>
      </Card>
    </div>
  )
}
