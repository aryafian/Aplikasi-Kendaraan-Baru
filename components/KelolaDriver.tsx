"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useQuery, useMutation } from "@tanstack/react-query"
import { Plus, User, Edit, Trash2, Search, Bell } from "lucide-react"
import { queryClient, apiRequest } from "@/lib/queryClient"
import { useToast } from "@/hooks/use-toast"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Link from "next/link"

interface Driver {
  id: number
  fullName: string
  licenseNumber: string
  phoneNumber: string
  status: string
  vehicleTypePreference?: string
  lastActivity?: string
  createdAt: string
}

export default function KelolaDriver() {
  const [showForm, setShowForm] = useState(false)
  const [editingDriver, setEditingDriver] = useState<Driver | null>(null)
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    fullName: "",
    licenseNumber: "",
    phoneNumber: "",
    status: "available",
    vehicleTypePreference: "",
  })

  const { data: drivers, isLoading } = useQuery<Driver[]>({
    queryKey: ["/api/drivers"],
    queryFn: () => apiRequest("GET", "/api/drivers"),
  })

  const createMutation = useMutation({
    mutationFn: (data: any) => apiRequest("POST", "/api/drivers", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/drivers"] })
      setShowForm(false)
      resetForm()
      toast({ title: "Driver berhasil dibuat" })
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" })
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) => apiRequest("PUT", `/api/drivers/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/drivers"] })
      setEditingDriver(null)
      setShowForm(false)
      resetForm()
      toast({ title: "Driver berhasil diupdate" })
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (id: number) => apiRequest("DELETE", `/api/drivers/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/drivers"] })
      toast({ title: "Driver berhasil dihapus" })
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" })
    },
  })

  const resetForm = () => {
    setFormData({
      fullName: "",
      licenseNumber: "",
      phoneNumber: "",
      status: "available",
      vehicleTypePreference: "",
    })
    setEditingDriver(null)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingDriver) {
      updateMutation.mutate({ id: editingDriver.id, data: formData })
    } else {
      createMutation.mutate(formData)
    }
  }

  const handleEdit = (driver: Driver) => {
    setFormData({
      fullName: driver.fullName,
      licenseNumber: driver.licenseNumber,
      phoneNumber: driver.phoneNumber,
      status: driver.status,
      vehicleTypePreference: driver.vehicleTypePreference || "",
    })
    setEditingDriver(driver)
    setShowForm(true)
  }

  const handleDelete = (id: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus driver ini?")) {
      deleteMutation.mutate(id)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "available":
        return (
          <span className="inline-flex items-center text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
            <div className="status-indicator bg-green-400 mr-1"></div>
            Tersedia
          </span>
        )
      case "on_duty":
        return (
          <span className="inline-flex items-center text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
            <div className="status-indicator bg-blue-400 mr-1"></div>
            Bertugas
          </span>
        )
      case "unavailable":
        return (
          <span className="inline-flex items-center text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
            <div className="status-indicator bg-red-400 mr-1"></div>
            Tidak Tersedia
          </span>
        )
      default:
        return (
          <span className="inline-flex items-center text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
            <div className="status-indicator bg-gray-400 mr-1"></div>
            {status}
          </span>
        )
    }
  }

  if (showForm) {
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
                    <Link href="/kelola-driver">Kelola Driver</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{editingDriver ? "Edit Driver" : "Tambah Driver Baru"}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50">
              {editingDriver ? "Edit Driver" : "Tambah Driver Baru"}
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {editingDriver ? "Update informasi driver" : "Tambahkan driver baru ke sistem"}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => {
                setShowForm(false)
                resetForm()
              }}
              className="text-sm"
            >
              Batal
            </Button>
          </div>
        </header>
        <Card className="p-6 flex-1">
          <CardHeader className="p-0 mb-6">
            <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-gray-50">
              {editingDriver ? "Form Edit Driver" : "Form Tambah Driver"}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="fullName" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Nama Lengkap
                  </Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Contoh: Joko Susilo"
                    required
                    className="mt-1 text-sm"
                  />
                </div>
                <div>
                  <Label htmlFor="licenseNumber" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Nomor SIM
                  </Label>
                  <Input
                    id="licenseNumber"
                    value={formData.licenseNumber}
                    onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                    placeholder="Contoh: 1234567890"
                    required
                    className="mt-1 text-sm"
                  />
                </div>
                <div>
                  <Label htmlFor="phoneNumber" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Nomor Telepon
                  </Label>
                  <Input
                    id="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    placeholder="Contoh: +628123456789"
                    required
                    className="mt-1 text-sm"
                  />
                </div>
                <div>
                  <Label htmlFor="status" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Status
                  </Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => setFormData({ ...formData, status: value })}
                  >
                    <SelectTrigger className="w-full mt-1 text-sm">
                      <SelectValue placeholder="Pilih Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="available">Tersedia</SelectItem>
                      <SelectItem value="on_duty">Bertugas</SelectItem>
                      <SelectItem value="unavailable">Tidak Tersedia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label
                    htmlFor="vehicleTypePreference"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Preferensi Jenis Kendaraan
                  </Label>
                  <Select
                    value={formData.vehicleTypePreference}
                    onValueChange={(value) => setFormData({ ...formData, vehicleTypePreference: value })}
                  >
                    <SelectTrigger className="w-full mt-1 text-sm">
                      <SelectValue placeholder="Pilih preferensi" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Tidak Ada</SelectItem>
                      <SelectItem value="SUV">SUV</SelectItem>
                      <SelectItem value="Sedan">Sedan</SelectItem>
                      <SelectItem value="Minibus">Minibus</SelectItem>
                      <SelectItem value="Truck">Truk</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowForm(false)
                    resetForm()
                  }}
                  className="text-sm"
                >
                  Batal
                </Button>
                <Button
                  type="submit"
                  disabled={createMutation.isPending || updateMutation.isPending}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-sm"
                >
                  {editingDriver ? "Update Driver" : "Tambah Driver"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    )
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
                <BreadcrumbPage>Kelola Driver</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50">Kelola Driver</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">Kelola daftar driver perusahaan</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Cari driver..."
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
          <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-gray-50">Kelola Driver</CardTitle>
          <Button onClick={() => setShowForm(true)} className="bg-blue-600 hover:bg-blue-700 text-white text-sm">
            <Plus className="w-4 h-4 mr-2" />
            Tambah Driver
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="animate-pulse p-6">
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {drivers?.map((driver) => (
                <Card key={driver.id} className="p-4 hover:shadow-md transition-shadow">
                  <CardContent className="p-0 flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <User className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-gray-50">{driver.fullName}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{driver.licenseNumber}</p>
                        </div>
                      </div>
                      {getStatusBadge(driver.status)}
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Telepon:</span>
                        <span className="text-gray-900 dark:text-gray-50">{driver.phoneNumber}</span>
                      </div>
                      {driver.vehicleTypePreference && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">Preferensi Kendaraan:</span>
                          <span className="text-gray-900 dark:text-gray-50">{driver.vehicleTypePreference}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Terakhir Aktif:</span>
                        <span className="text-gray-900 dark:text-gray-50">{driver.lastActivity || "N/A"}</span>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-2 mt-auto">
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(driver)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(driver.id)}
                        disabled={deleteMutation.isPending}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {(!drivers || drivers.length === 0) && (
                <div className="col-span-full">
                  <Card className="p-12 text-center">
                    <div className="text-gray-500 dark:text-gray-400">
                      <User className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p className="text-lg font-medium mb-2">Belum ada driver</p>
                      <p className="text-sm mb-4">Mulai dengan menambahkan driver baru</p>
                      <Button
                        onClick={() => setShowForm(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white text-sm"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Tambah Driver
                      </Button>
                    </div>
                  </Card>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
