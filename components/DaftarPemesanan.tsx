"use client"

import { Search, Bell, Eye, Plus } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Input } from "@/components/ui/input"
import Link from "next/link"

const DaftarPemesanan = () => {
  const orders = [
    {
      id: "8K-2025-001",
      title: "Inspeksi Lokasi Tambang Area A",
      pemohon: "Ahmad Wijaya - Mining Operations",
      tanggalWaktu: "11 Jul 2025, 08:00-17:00",
      destinasi: "Site Tambang Blok A1",
      kendaraan: "B1234CD - Toyota Hilux",
      driver: "Joko Susilo",
      dibuat: "11 Jul 2025, 18.01",
      status: "selesai",
    },
    {
      id: "8K-2025-002",
      title: "Meeting dengan Vendor Equipment",
      pemohon: "Dewi Lestari - Maintenance",
      tanggalWaktu: "12 Jul 2025, 09:00-16:00",
      destinasi: "Kantor Vendor - Bekasi",
      kendaraan: null,
      driver: null,
      dibuat: "11 Jul 2025, 18.01",
      status: "menunggu_persetujuan",
    },
    {
      id: "8K-2025-003",
      title: "Training Safety Mining",
      pemohon: "Rudi Hermawan - Safety & Security",
      tanggalWaktu: "12 Jul 2025, 07:30-18:00",
      destinasi: "Training Center Jakarta",
      kendaraan: null,
      driver: null,
      dibuat: "11 Jul 2025, 18.01",
      status: "disetujui_level1",
    },
    {
      id: "8K-2025-004",
      title: "Pengambilan Sample Nickel",
      pemohon: "Ahmad Wijaya - Mining Operations",
      tanggalWaktu: "18 Jul 2025, 10:00-15:00",
      destinasi: "Laboratory Universitas Indonesia",
      kendaraan: "B5678EF - Mitsubishi Pajero Sport",
      driver: "Bambang Wijaya",
      dibuat: "11 Jul 2025, 18.01",
      status: "disetujui",
    },
    {
      id: "8K-2025-005",
      title: "Rekrutmen Karyawan Baru",
      pemohon: "Maya Sari - Human Resources",
      tanggalWaktu: "20 Jul 2025, 08:30-16:30",
      destinasi: "Universitas Trisakti",
      kendaraan: null,
      driver: null,
      dibuat: "11 Jul 2025, 18.01",
      status: "ditolak",
    },
    {
      id: "8K-2025-006",
      title: "Survey Lokasi Baru",
      pemohon: "Andi Pratama - Procurement",
      tanggalWaktu: "12 Jul 2025, 06:00-20:00",
      destinasi: "Sulawesi Tengah",
      kendaraan: null,
      driver: null,
      dibuat: "11 Jul 2025, 18.01",
      status: "approved_level2",
    },
    {
      id: "8K-2025-007",
      title: "Maintenance Equipment Tambang",
      pemohon: "Dewi Lestari - Maintenance",
      tanggalWaktu: "11 Jul 2025, 07:00-17:00",
      destinasi: "Site Maintenance - Area B",
      kendaraan: "B9012GH - Isuzu D-Max",
      driver: "Suratno",
      dibuat: "11 Jul 2025, 18.01",
      status: "selesai",
    },
    {
      id: "8K-2025-008",
      title: "Audit Internal Mining Operations",
      pemohon: "Rudi Hermawan - Safety & Security",
      tanggalWaktu: "7 Jul 2025, 09:30-16:00",
      destinasi: "Kantor Pusat Jakarta",
      kendaraan: "B3456IJ - Ford Ranger",
      driver: "Agus Prasetyo",
      dibuat: "11 Jul 2025, 18.01",
      status: "selesai",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "selesai":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-300 text-xs">
            Selesai
          </Badge>
        )
      case "menunggu_persetujuan":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300 text-xs">
            Menunggu Persetujuan
          </Badge>
        )
      case "disetujui_level1":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-300 text-xs">
            Disetujui Level 1
          </Badge>
        )
      case "disetujui":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-300 text-xs">
            Disetujui
          </Badge>
        )
      case "ditolak":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-900 dark:text-red-300 text-xs">
            Ditolak
          </Badge>
        )
      case "approved_level2":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300 text-xs">
            Disetujui Level 2
          </Badge>
        )
      default:
        return <Badge className="text-xs">{status}</Badge>
    }
  }

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
                <BreadcrumbPage>Daftar Pemesanan</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50">Pemesanan Kendaraan</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">Buat dan kelola pemesanan kendaraan</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
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

      <Card className="p-6 flex-1">
        <CardHeader className="flex flex-row items-center justify-between p-0 mb-6">
          <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-gray-50">Daftar Pemesanan</CardTitle>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white text-sm">
            <Plus className="w-4 h-4 mr-2" />
            Pemesanan Baru
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          {/* Added w-full to the container of list items */}
          <div className="space-y-4 w-full">
            {orders.map((order) => (
              <div
                key={order.id}
                className="border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200 dark:border-gray-700 relative w-full" /* Added w-full here */
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">{order.title}</h3>
                    {getStatusBadge(order.status)}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-8 h-8 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 absolute top-6 right-6"
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
                <div className="text-sm text-gray-900 dark:text-gray-50 mb-4">
                  <span className="text-gray-600 dark:text-gray-400 font-medium">ID:</span> {order.id}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-sm">
                  <div className="flex flex-col">
                    <span className="text-gray-600 dark:text-gray-400 font-medium">Pemohon:</span>
                    <span className="text-gray-900 dark:text-gray-50">{order.pemohon}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-600 dark:text-gray-400 font-medium">Tanggal & Waktu:</span>
                    <span className="text-gray-900 dark:text-gray-50">{order.tanggalWaktu}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-600 dark:text-gray-400 font-medium">Destinasi:</span>
                    <span className="text-gray-900 dark:text-gray-50">{order.destinasi}</span>
                  </div>
                  {order.kendaraan && (
                    <div className="flex flex-col">
                      <span className="text-gray-600 dark:text-gray-400 font-medium">Kendaraan:</span>
                      <span className="text-gray-900 dark:text-gray-50">{order.kendaraan}</span>
                    </div>
                  )}
                  {order.driver && (
                    <div className="flex flex-col">
                      <span className="text-gray-600 dark:text-gray-400 font-medium">Driver:</span>
                      <span className="text-gray-900 dark:text-gray-50">{order.driver}</span>
                    </div>
                  )}
                </div>
                <div className="flex flex-col mt-4 text-sm">
                  <span className="text-gray-600 dark:text-gray-400 font-medium">Dibuat:</span>
                  <span className="text-gray-900 dark:text-gray-50">{order.dibuat}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default DaftarPemesanan
