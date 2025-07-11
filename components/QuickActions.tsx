import { Plus, CheckCircle, Download } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const QuickActions = () => {
  return (
    <Card className="p-6">
      <CardHeader className="p-0 mb-4">
        <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-50">Aksi Cepat</CardTitle>
      </CardHeader>
      <CardContent className="p-0 space-y-3">
        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Pemesanan Baru
        </Button>
        <Button
          variant="secondary"
          className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-50"
        >
          <CheckCircle className="w-4 h-4 mr-2" />
          Lihat Persetujuan
        </Button>
        <Button
          variant="outline"
          className="w-full border-gray-300 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800 dark:text-gray-50 bg-transparent"
        >
          <Download className="w-4 h-4 mr-2" />
          Export Laporan
        </Button>
      </CardContent>
    </Card>
  )
}

export default QuickActions
