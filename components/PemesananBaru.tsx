"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { CalendarIcon, Search, Bell } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Link from "next/link"

export default function PemesananBaru() {
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [formData, setFormData] = useState({
    purpose: "",
    destination: "",
    departureDate: "",
    departureTime: "",
    returnTime: "",
    requester: "",
    department: "",
    vehicleType: "",
    passengers: 1,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSelectChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleDateChange = (selectedDate: Date | undefined) => {
    setDate(selectedDate)
    setFormData((prev) => ({
      ...prev,
      departureDate: selectedDate ? format(selectedDate, "yyyy-MM-dd") : "",
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form Data Submitted:", formData)
    // Here you would typically send data to your backend API
    alert("Pemesanan berhasil diajukan!")
    // Reset form
    setFormData({
      purpose: "",
      destination: "",
      departureDate: "",
      departureTime: "",
      returnTime: "",
      requester: "",
      department: "",
      vehicleType: "",
      passengers: 1,
    })
    setDate(undefined)
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
                <BreadcrumbLink asChild>
                  <Link href="/daftar-pemesanan">Daftar Pemesanan</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Pemesanan Baru</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50">Pemesanan Baru</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">Ajukan pemesanan kendaraan baru</p>
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

      <Card className="p-6 flex-1">
        <CardHeader className="p-0 mb-6">
          <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-gray-50">
            Form Pemesanan Kendaraan
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="purpose" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Tujuan Perjalanan
                </Label>
                <Input
                  id="purpose"
                  value={formData.purpose}
                  onChange={handleChange}
                  placeholder="Contoh: Inspeksi Lokasi Tambang"
                  required
                  className="mt-1 text-sm"
                />
              </div>
              <div>
                <Label htmlFor="destination" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Destinasi
                </Label>
                <Input
                  id="destination"
                  value={formData.destination}
                  onChange={handleChange}
                  placeholder="Contoh: Site Tambang Blok A1"
                  required
                  className="mt-1 text-sm"
                />
              </div>
              <div>
                <Label htmlFor="departureDate" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Tanggal Keberangkatan
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal mt-1 text-sm",
                        !date && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pilih tanggal</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={date} onSelect={handleDateChange} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <Label htmlFor="departureTime" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Waktu Keberangkatan
                </Label>
                <Input
                  id="departureTime"
                  type="time"
                  value={formData.departureTime}
                  onChange={handleChange}
                  required
                  className="mt-1 text-sm"
                />
              </div>
              <div>
                <Label htmlFor="returnTime" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Waktu Kembali (Estimasi)
                </Label>
                <Input
                  id="returnTime"
                  type="time"
                  value={formData.returnTime}
                  onChange={handleChange}
                  className="mt-1 text-sm"
                />
              </div>
              <div>
                <Label htmlFor="requester" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Nama Pemohon
                </Label>
                <Input
                  id="requester"
                  value={formData.requester}
                  onChange={handleChange}
                  placeholder="Contoh: Ahmad Wijaya"
                  required
                  className="mt-1 text-sm"
                />
              </div>
              <div>
                <Label htmlFor="department" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Departemen
                </Label>
                <Input
                  id="department"
                  value={formData.department}
                  onChange={handleChange}
                  placeholder="Contoh: Mining Operations"
                  className="mt-1 text-sm"
                />
              </div>
              <div>
                <Label htmlFor="vehicleType" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Jenis Kendaraan yang Dibutuhkan
                </Label>
                <Select
                  value={formData.vehicleType}
                  onValueChange={(value) => handleSelectChange("vehicleType", value)}
                >
                  <SelectTrigger className="w-full mt-1 text-sm">
                    <SelectValue placeholder="Pilih jenis kendaraan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SUV">SUV</SelectItem>
                    <SelectItem value="Sedan">Sedan</SelectItem>
                    <SelectItem value="Minibus">Minibus</SelectItem>
                    <SelectItem value="Truck">Truk</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="passengers" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Jumlah Penumpang
                </Label>
                <Input
                  id="passengers"
                  type="number"
                  value={formData.passengers}
                  onChange={(e) => setFormData((prev) => ({ ...prev, passengers: Number(e.target.value) }))}
                  min="1"
                  required
                  className="mt-1 text-sm"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline" className="text-sm bg-transparent">
                Batal
              </Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white text-sm">
                Ajukan Pemesanan
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
