"use client"

import { Search, Bell, Download, Filter } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Link from "next/link"

const Reports = () => {
  const reports = [
    {
      id: "R-001",
      title: "Laporan Penggunaan Kendaraan Bulanan",
      date: "Juli 2025",
      type: "Penggunaan",
      status: "Selesai",
      actions: ["Lihat", "Unduh"],
    },
    {
      id: "R-002",
      title: "Laporan Biaya Operasional Q2 2025",
      date: "Juni 2025",
      type: "Keuangan",
      status: "Selesai",
      actions: ["Lihat", "Unduh"],
    },
    {
      id: "R-003",
      title: "Laporan Perawatan Kendaraan Tahunan",
      date: "Desember 2024",
      type: "Perawatan",
      status: "Selesai",
      actions: ["Lihat", "Unduh"],
    },
    {
      id: "R-004",
      title: "Laporan Kinerja Driver Semester 1",
      date: "Juni 2025",
      type: "Kinerja",
      status: "Selesai",
      actions: ["Lihat", "Unduh"],
    },
    {
      id: "R-005",
      title: "Laporan Insiden Kendaraan 2025",
      date: "Juli 2025",
      type: "Insiden",
      status: "Selesai",
      actions: ["Lihat", "Unduh"],
    },
  ]

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
                <BreadcrumbPage>Laporan</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50">Laporan</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">Lihat dan unduh laporan operasional</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Cari laporan..."
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
          <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-gray-50">Daftar Laporan</CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" className="text-sm bg-transparent">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white text-sm">
              <Download className="w-4 h-4 mr-2" />
              Unduh Semua
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-sm">ID Laporan</TableHead>
                <TableHead className="text-sm">Judul Laporan</TableHead>
                <TableHead className="text-sm">Tanggal</TableHead>
                <TableHead className="text-sm">Tipe</TableHead>
                <TableHead className="text-sm">Status</TableHead>
                <TableHead className="text-right text-sm">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell className="font-medium text-sm">{report.id}</TableCell>
                  <TableCell className="text-sm">{report.title}</TableCell>
                  <TableCell className="text-sm">{report.date}</TableCell>
                  <TableCell className="text-sm">{report.type}</TableCell>
                  <TableCell className="text-sm">{report.status}</TableCell>
                  <TableCell className="text-right text-sm">
                    {report.actions.map((action, index) => (
                      <Button key={index} variant="ghost" size="sm" className="text-sm">
                        {action}
                      </Button>
                    ))}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default Reports
