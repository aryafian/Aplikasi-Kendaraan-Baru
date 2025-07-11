import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const SystemNotifications = () => {
  const notifications = [
    {
      id: 1,
      message: "3 pemesanan menunggu persetujuan Level 2",
      time: "5 menit lalu",
    },
    {
      id: 2,
      message: "Kendaraan B1234CD tersedia kembali",
      time: "1 jam lalu",
    },
    {
      id: 3,
      message: "Service reminder: Kendaraan B5678EF",
      time: "2 jam lalu",
    },
  ]

  return (
    <Card className="p-6">
      <CardHeader className="p-0 mb-4">
        <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-50">Notifikasi Sistem</CardTitle>
      </CardHeader>
      <CardContent className="p-0 space-y-3">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="p-3 bg-gray-50 rounded-lg border-l-4 border-blue-600 dark:bg-gray-800 dark:border-blue-500"
          >
            <p className="text-sm text-gray-900 dark:text-gray-50 mb-1">{notification.message}</p>
            <span className="text-xs text-gray-600 dark:text-gray-400">{notification.time}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export default SystemNotifications
