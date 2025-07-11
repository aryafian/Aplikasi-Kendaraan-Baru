import { Car } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const RecentOrders = () => {
  const orders = [
    {
      id: 1,
      title: "Inspeksi Lokasi Tambang Area A",
      assignee: "Ahmad Wijaya",
      date: "11 Jul 2025",
      time: "08:00-17:00",
      status: "completed",
    },
    {
      id: 2,
      title: "Meeting dengan Vendor Equipment",
      assignee: "Dewi Lestari",
      date: "12 Jul 2025",
      time: "09:00-16:00",
      status: "pending",
    },
    {
      id: 3,
      title: "Training Safety Mining",
      assignee: "Rudi Hermawan",
      date: "12 Jul 2025",
      time: "07:30-18:00",
      status: "approved_level1",
    },
    {
      id: 4,
      title: "Pengambilan Sample Nickel",
      assignee: "Ahmad Wijaya",
      date: "18 Jul 2025",
      time: "10:00-15:00",
      status: "approved",
    },
    {
      id: 5,
      title: "Rekrutmen Karyawan Baru",
      assignee: "Maya Sari",
      date: "20 Jul 2025",
      time: "08:30-16:30",
      status: "rejected",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
            completed
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
            Menunggu Persetujuan
          </Badge>
        )
      case "approved_level1":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
            approved_level1
          </Badge>
        )
      case "approved":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
            Disetujui
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
            Ditolak
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <Card className="p-6 flex flex-col flex-1">
      <CardHeader className="flex flex-row items-center justify-between p-0 mb-4">
        <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-50">Pemesanan Terbaru</CardTitle>
        <Button variant="link" className="text-blue-600 dark:text-blue-400 p-0 h-auto">
          Lihat Semua
        </Button>
      </CardHeader>
      <CardContent className="p-0 space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg dark:border-gray-700"
          >
            <div className="p-2 bg-blue-50 rounded-md text-blue-600 dark:bg-blue-950 dark:text-blue-400">
              <Car className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-medium text-gray-900 dark:text-gray-50">{order.title}</h4>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {order.assignee} • {order.date} • {order.time}
              </p>
            </div>
            {getStatusBadge(order.status)}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export default RecentOrders
