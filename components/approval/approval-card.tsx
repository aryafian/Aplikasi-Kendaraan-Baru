"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Car, User, CheckCircle, XCircle } from "lucide-react"
import { useMutation } from "@tanstack/react-query"
import { apiRequest } from "@/lib/queryClient"
import { useToast } from "@/hooks/use-toast"

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

interface ApprovalCardProps {
  approval: PendingApproval
  onApprovalChange: () => void
}

export function ApprovalCard({ approval, onApprovalChange }: ApprovalCardProps) {
  const { toast } = useToast()

  const approveMutation = useMutation({
    mutationFn: (id: number) => apiRequest("POST", `/api/approvals/${id}/approve`),
    onSuccess: () => {
      toast({ title: "Pemesanan disetujui", description: `Pemesanan ${approval.bookingNumber} telah disetujui.` })
      onApprovalChange()
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" })
    },
  })

  const rejectMutation = useMutation({
    mutationFn: (id: number) => apiRequest("POST", `/api/approvals/${id}/reject`),
    onSuccess: () => {
      toast({ title: "Pemesanan ditolak", description: `Pemesanan ${approval.bookingNumber} telah ditolak.` })
      onApprovalChange()
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" })
    },
  })

  const handleApprove = () => {
    approveMutation.mutate(approval.id)
  }

  const handleReject = () => {
    rejectMutation.mutate(approval.id)
  }

  return (
    <Card className="border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 dark:border-gray-700">
      <CardContent className="p-6">
        {" "}
        {/* Changed from p-0 to p-6 */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">{approval.purpose}</h3>
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300">
            Menunggu Persetujuan
          </Badge>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-sm mb-4">
          <div className="flex flex-col">
            <span className="text-gray-600 dark:text-gray-400 font-medium">Nomor Pemesanan:</span>
            <span className="text-gray-900 dark:text-gray-50">{approval.bookingNumber}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-600 dark:text-gray-400 font-medium">Pemohon:</span>
            <span className="text-gray-900 dark:text-gray-50">
              {approval.requester.fullName}
              {approval.requester.department && ` - ${approval.requester.department}`}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-600 dark:text-gray-400 font-medium">Tanggal & Waktu:</span>
            <span className="text-gray-900 dark:text-gray-50">
              {approval.departureDate}, {approval.departureTime} - {approval.returnTime}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-600 dark:text-gray-400 font-medium">Destinasi:</span>
            <span className="text-gray-900 dark:text-gray-50">{approval.destination}</span>
          </div>
          {approval.vehicle && (
            <div className="flex flex-col">
              <span className="text-gray-600 dark:text-gray-400 font-medium">Kendaraan:</span>
              <span className="text-gray-900 dark:text-gray-50">
                <Car className="inline-block w-4 h-4 mr-1 text-gray-500" />
                {approval.vehicle.plateNumber} - {approval.vehicle.brand} {approval.vehicle.model}
              </span>
            </div>
          )}
          {approval.driver && (
            <div className="flex flex-col">
              <span className="text-gray-600 dark:text-gray-400 font-medium">Driver:</span>
              <span className="text-gray-900 dark:text-gray-50">
                <User className="inline-block w-4 h-4 mr-1 text-gray-500" />
                {approval.driver.fullName}
              </span>
            </div>
          )}
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <Button
            variant="outline"
            className="border-red-500 text-red-600 hover:bg-red-50 dark:border-red-700 dark:text-red-400 dark:hover:bg-red-950 bg-transparent"
            onClick={handleReject}
            disabled={rejectMutation.isPending || approveMutation.isPending}
          >
            <XCircle className="w-4 h-4 mr-2" />
            Tolak
          </Button>
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={handleApprove}
            disabled={approveMutation.isPending || rejectMutation.isPending}
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Setujui
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
