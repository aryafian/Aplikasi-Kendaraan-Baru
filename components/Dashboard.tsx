"use client"

import { Search, Bell, Database, Calendar, Clock, Car, TrendingUp } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import StatsCard from "./StatsCard"
import RecentOrders from "./RecentOrders"
import QuickActions from "./QuickActions"
import SystemNotifications from "./SystemNotifications"
import UsageChart from "./UsageChart"
import StatusChart from "./StatusChart"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Link from "next/link"

const Dashboard = () => {
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
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Selamat datang kembali, kelola pemesanan kendaraan Anda
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Cari pemesanan..."
              className="pl-9 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-50"
            />
          </div>
          <Button variant="outline" size="icon" className="w-9 h-9 bg-transparent">
            <Bell className="w-5 h-5" />
          </Button>
        </div>
      </header>

      <Card className="mb-6 p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-50">Admin Tools</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">Generate sample data untuk testing sistem</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Database className="w-4 h-4 mr-2" />
            Generate Data Sample
          </Button>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatsCard
          title="Total Pemesanan"
          value="8"
          change="+12% dari bulan lalu"
          icon={Calendar}
          trend="up"
          iconBg="bg-blue-100 text-blue-600"
        />
        <StatsCard
          title="Menunggu Persetujuan"
          value="1"
          change="3 urgent"
          icon={Clock}
          trend="neutral"
          iconBg="bg-yellow-100 text-yellow-600"
        />
        <StatsCard
          title="Kendaraan Aktif"
          value="5"
          change="dari 15 total"
          icon={Car}
          trend="neutral"
          iconBg="bg-green-100 text-green-600"
        />
        <StatsCard
          title="Efisiensi Bulan Ini"
          value="13%"
          change="Target: 80%"
          icon={TrendingUp}
          trend="down"
          iconBg="bg-purple-100 text-purple-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <UsageChart />
          <StatusChart />
          <RecentOrders />
        </div>
        <div className="lg:col-span-1 flex flex-col gap-6">
          <QuickActions />
          <SystemNotifications />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
