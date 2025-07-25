"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useQuery, useMutation } from "@tanstack/react-query"
import { Plus, Car, Edit, Trash2, Search, Bell } from "lucide-react"
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

interface Vehicle {
  id: number
  plateNumber: string
  brand: string
  model: string
  year: number
  capacity: number
  fuelType: string
  status: string
  lastMaintenance?: string
  nextMaintenance?: string
  createdAt: string
}

export default function KelolaKendaraan() {
  const [showForm, setShowForm] = useState(false)
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null)
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    plateNumber: "",
    brand: "",
    model: "",
    year: new Date().getFullYear(),
    capacity: 4,
    fuelType: "Petrol",
    status: "available",
  })

  const { data: vehicles, isLoading } = useQuery<Vehicle[]>({
    queryKey: ["/api/vehicles"],
    queryFn: () => apiRequest("GET", "/api/vehicles"),
  })

  const createMutation = useMutation({
    mutationFn: (data: any) => apiRequest("POST", "/api/vehicles", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/vehicles"] })
      setShowForm(false)
      resetForm()
      toast({ title: "Kendaraan berhasil dibuat" })
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" })
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) => apiRequest("PUT", `/api/vehicles/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/vehicles"] })
      setEditingVehicle(null)
      setShowForm(false)
      resetForm()
      toast({ title: "Kendaraan berhasil diupdate" })
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (id: number) => apiRequest("DELETE", `/api/vehicles/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/vehicles"] })
      toast({ title: "Kendaraan berhasil dihapus" })
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" })
    },
  })

  const resetForm = () => {
    setFormData({
      plateNumber: "",
      brand: "",
      model: "",
      year: new Date().getFullYear(),
      capacity: 4,
      fuelType: "Petrol",
      status: "available",
    })
    setEditingVehicle(null)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingVehicle) {
      updateMutation.mutate({ id: editingVehicle.id, data: formData })
    } else {
      createMutation.mutate(formData)
    }
  }

  const handleEdit = (vehicle: Vehicle) => {
    setFormData({
      plateNumber: vehicle.plateNumber,
      brand: vehicle.brand,
      model: vehicle.model,
      year: vehicle.year,
      capacity: vehicle.capacity,
      fuelType: vehicle.fuelType,
      status: vehicle.status,
    })
    setEditingVehicle(vehicle)
    setShowForm(true)
  }

  const handleDelete = (id: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus kendaraan ini?")) {
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
      case "in_use":
        return (
          <span className="inline-flex items-center text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
            <div className="status-indicator bg-blue-400 mr-1"></div>
            Digunakan
          </span>
        )
      case "maintenance":
        return (
          <span className="inline-flex items-center text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
            <div className="status-indicator bg-red-400 mr-1"></div>
            Maintenance
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
                    <Link href="/kelola-kendaraan">Kelola Kendaraan</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{editingVehicle ? "Edit Kendaraan" : "Tambah Kendaraan Baru"}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50">
              {editingVehicle ? "Edit Kendaraan" : "Tambah Kendaraan Baru"}
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {editingVehicle ? "Update informasi kendaraan" : "Tambahkan kendaraan baru ke sistem"}
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
              {editingVehicle ? "Form Edit Kendaraan" : "Form Tambah Kendaraan"}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="plateNumber" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Nomor Polisi
                  </Label>
                  <Input
                    id="plateNumber"
                    value={formData.plateNumber}
                    onChange={(e) => setFormData({ ...formData, plateNumber: e.target.value })}
                    placeholder="Contoh: B1234CD"
                    required
                    className="mt-1 text-sm"
                  />
                </div>
                <div>
                  <Label htmlFor="brand" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Merek
                  </Label>
                  <Input
                    id="brand"
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    placeholder="Contoh: Toyota"
                    required
                    className="mt-1 text-sm"
                  />
                </div>
                <div>
                  <Label htmlFor="model" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Model
                  </Label>
                  <Input
                    id="model"
                    value={formData.model}
                    onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                    placeholder="Contoh: Avanza"
                    required
                    className="mt-1 text-sm"
                  />
                </div>
                <div>
                  <Label htmlFor="year" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Tahun
                  </Label>
                  <Input
                    id="year"
                    type="number"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: Number.parseInt(e.target.value) })}
                    min="1990"
                    max={new Date().getFullYear() + 1}
                    required
                    className="mt-1 text-sm"
                  />
                </div>
                <div>
                  <Label htmlFor="capacity" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Kapasitas (orang)
                  </Label>
                  <Input
                    id="capacity"
                    type="number"
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: Number.parseInt(e.target.value) })}
                    min="1"
                    max="50"
                    required
                    className="mt-1 text-sm"
                  />
                </div>
                <div>
                  <Label htmlFor="fuelType" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Jenis Bahan Bakar
                  </Label>
                  <Select
                    value={formData.fuelType}
                    onValueChange={(value) => setFormData({ ...formData, fuelType: value })}
                  >
                    <SelectTrigger className="w-full mt-1 text-sm">
                      <SelectValue placeholder="Pilih Jenis Bahan Bakar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Petrol">Bensin</SelectItem>
                      <SelectItem value="Diesel">Solar</SelectItem>
                      <SelectItem value="Electric">Listrik</SelectItem>
                      <SelectItem value="Hybrid">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
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
                      <SelectItem value="in_use">Digunakan</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
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
                  {editingVehicle ? "Update Kendaraan" : "Tambah Kendaraan"}
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
                <BreadcrumbPage>Kelola Kendaraan</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50">Kelola Kendaraan</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">Kelola daftar kendaraan perusahaan</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Cari kendaraan..."
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
          <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-gray-50">Kelola Kendaraan</CardTitle>
          <Button onClick={() => setShowForm(true)} className="bg-blue-600 hover:bg-blue-700 text-white text-sm">
            <Plus className="w-4 h-4 mr-2" />
            Tambah Kendaraan
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
              {vehicles?.map((vehicle) => (
                <Card key={vehicle.id} className="p-4 hover:shadow-md transition-shadow">
                  <CardContent className="p-0 flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Car className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-gray-50">{vehicle.plateNumber}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {vehicle.brand} {vehicle.model}
                          </p>
                        </div>
                      </div>
                      {getStatusBadge(vehicle.status)}
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Tahun:</span>
                        <span className="text-gray-900 dark:text-gray-50">{vehicle.year}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Kapasitas:</span>
                        <span className="text-gray-900 dark:text-gray-50">{vehicle.capacity} orang</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Bahan Bakar:</span>
                        <span className="text-gray-900 dark:text-gray-50">{vehicle.fuelType}</span>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-2 mt-auto">
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(vehicle)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(vehicle.id)}
                        disabled={deleteMutation.isPending}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {(!vehicles || vehicles.length === 0) && (
                <div className="col-span-full">
                  <Card className="p-12 text-center">
                    <div className="text-gray-500 dark:text-gray-400">
                      <Car className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p className="text-lg font-medium mb-2">Belum ada kendaraan</p>
                      <p className="text-sm mb-4">Mulai dengan menambahkan kendaraan baru</p>
                      <Button
                        onClick={() => setShowForm(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white text-sm"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Tambah Kendaraan
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
