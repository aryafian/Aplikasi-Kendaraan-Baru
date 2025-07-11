"use client"

import { Search, Bell, CheckCircle, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Link from "next/link"
import { useQuery } from "@tanstack/react-query"
import { ApprovalCard } from "@/components/approval/approval-card"
import { queryClient, apiRequest } from "@/lib/queryClient"

interface PendingApproval {
  id: number
  bookingNumber: string
  purpose: string
  destination: string
  departureDate: string
  departureTime: string
  returnTime: string
  status: string
  requester: {
    fullName: string
    department?: string
  }
  vehicle?: {
    plateNumber: string
    brand: string
    model: string
  }
  driver?: {
    fullName: string
  }
  createdAt: string
}

export default function Persetujuan() {
  const { data: pendingApprovals, isLoading } = useQuery<PendingApproval[]>({
    queryKey: ["/api/approvals/pending"],
    queryFn: () => apiRequest("GET", "/api/approvals/pending"),
  })

  const pendingApprovalsCount = pendingApprovals?.length || 0

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
                <BreadcrumbPage>Persetujuan</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50">Persetujuan</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">Kelola persetujuan pemesanan kendaraan</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Cari persetujuan..."
              className="pl-9 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-50"
            />
          </div>
          <Button variant="outline" size="icon" className="w-9 h-9 bg-transparent">
            <Bell className="w-5 h-5" />
          </Button>
        </div>
      </header>

      {isLoading ? (
        <Card className="p-6 flex-1 flex flex-col w-full">
          <CardHeader className="flex flex-row items-center justify-between p-0 mb-6">
            <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-gray-50">
              Persetujuan Pemesanan
            </CardTitle>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Clock className="w-4 h-4" />
              <span>Memuat...</span>
            </div>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col p-0">
            {/* Added w-full to the container of loading state items */}
            <div className="space-y-4 w-full">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="animate-pulse p-6 w-full">
                  {" "}
                  {/* Added w-full here */}
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                    <div className="flex space-x-2 mt-4">
                      <div className="h-8 bg-gray-200 rounded w-20"></div>
                      <div className="h-8 bg-gray-200 rounded w-20"></div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="p-6 flex-1 flex flex-col w-full">
          <CardHeader className="flex flex-row items-center justify-between p-0 mb-6">
            <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-gray-50">
              Persetujuan Pemesanan
            </CardTitle>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Clock className="w-4 h-4" />
              <span>{pendingApprovalsCount} menunggu persetujuan</span>
            </div>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col p-0">
            {pendingApprovals && pendingApprovals.length > 0 ? (
              <div className="space-y-4 w-full">
                {pendingApprovals.map((approval) => (
                  <ApprovalCard
                    key={approval.id}
                    approval={approval}
                    onApprovalChange={() => {
                      queryClient.invalidateQueries({ queryKey: ["/api/approvals/pending"] })
                      queryClient.invalidateQueries({ queryKey: ["/api/dashboard/stats"] })
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <CheckCircle className="w-16 h-16 text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-2">
                  Tidak ada persetujuan pending
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Semua pemesanan sudah diproses</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
