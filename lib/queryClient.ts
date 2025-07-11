import { QueryClient } from "@tanstack/react-query"

// Buat instance QueryClient
export const queryClient = new QueryClient()

const mockUsers = [
  { username: "admin", password: "admin123", role: "admin" },
  { username: "manager1", password: "manager123", role: "manager" },
  { username: "manager2", password: "manager123", role: "manager" },
  { username: "user1", password: "user123", role: "user" },
]

// Fungsi dasar untuk melakukan permintaan API
// Ini adalah placeholder. Anda perlu menggantinya dengan logika fetch API backend Anda yang sebenarnya.
export async function apiRequest(method: string, url: string, data?: any) {
  // Simulasikan penundaan jaringan
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Mock data untuk simulasi API
  let mockVehicles = [
    {
      id: 1,
      plateNumber: "B1234CD",
      brand: "Toyota",
      model: "Hilux",
      year: 2023,
      capacity: 5,
      fuelType: "Diesel",
      status: "available",
      lastMaintenance: "2024-06-01",
      nextMaintenance: "2025-06-01",
      createdAt: "2023-01-15",
    },
    {
      id: 2,
      plateNumber: "B1357QR",
      brand: "Toyota",
      model: "Avanza",
      year: 2021,
      capacity: 7,
      fuelType: "Petrol",
      status: "in_use",
      lastMaintenance: "2024-05-10",
      nextMaintenance: "2025-05-10",
      createdAt: "2022-03-20",
    },
    {
      id: 3,
      plateNumber: "B2345MN",
      brand: "Suzuki",
      model: "Carry",
      year: 2023,
      capacity: 3,
      fuelType: "Petrol",
      status: "available",
      lastMaintenance: "2024-07-01",
      nextMaintenance: "2025-07-01",
      createdAt: "2023-02-28",
    },
    {
      id: 4,
      plateNumber: "B3456U",
      brand: "Ford",
      model: "Ranger",
      year: 2021,
      capacity: 5,
      fuelType: "Diesel",
      status: "available",
      lastMaintenance: "2024-04-15",
      nextMaintenance: "2025-04-15",
      createdAt: "2022-01-01",
    },
    {
      id: 5,
      plateNumber: "B5678EF",
      brand: "Mitsubishi",
      model: "Pajero Sport",
      year: 2022,
      capacity: 7,
      fuelType: "Diesel",
      status: "available",
      lastMaintenance: "2024-03-20",
      nextMaintenance: "2025-03-20",
      createdAt: "2022-06-10",
    },
    {
      id: 6,
      plateNumber: "B6789OP",
      brand: "Daihatsu",
      model: "Gran Max",
      year: 2022,
      capacity: 8,
      fuelType: "Petrol",
      status: "available",
      lastMaintenance: "2024-02-05",
      nextMaintenance: "2025-02-05",
      createdAt: "2022-09-01",
    },
    {
      id: 7,
      plateNumber: "B7890KL",
      brand: "Hino",
      model: "Dutro",
      year: 2022,
      capacity: 3,
      fuelType: "Diesel",
      status: "maintenance",
      lastMaintenance: "2024-07-05",
      nextMaintenance: "2024-07-20",
      createdAt: "2022-04-25",
    },
    {
      id: 8,
      plateNumber: "B9012GH",
      brand: "Isuzu",
      model: "D-Max",
      year: 2023,
      capacity: 5,
      fuelType: "Diesel",
      status: "in_use",
      lastMaintenance: "2024-01-30",
      nextMaintenance: "2025-01-30",
      createdAt: "2023-03-12",
    },
  ]

  let mockApprovals = [
    {
      id: 1,
      bookingNumber: "8K-2025-002",
      purpose: "Meeting dengan Vendor Equipment",
      destination: "Kantor Vendor - Bekasi",
      departureDate: "2025-07-12",
      departureTime: "09:00",
      returnTime: "16:00",
      status: "pending",
      requester: {
        fullName: "Dewi Lestari",
        department: "Maintenance",
      },
      vehicle: undefined,
      driver: undefined,
      createdAt: "2025-07-11T18:01:00Z",
    },
    {
      id: 2,
      bookingNumber: "8K-2025-003",
      purpose: "Training Safety Mining",
      destination: "Training Center Jakarta",
      departureDate: "2025-07-12",
      departureTime: "07:30",
      returnTime: "18:00",
      status: "pending",
      requester: {
        fullName: "Rudi Hermawan",
        department: "Safety & Security",
      },
      vehicle: undefined,
      driver: undefined,
      createdAt: "2025-07-11T18:01:00Z",
    },
    {
      id: 3,
      bookingNumber: "8K-2025-005",
      purpose: "Rekrutmen Karyawan Baru",
      destination: "Universitas Trisakti",
      departureDate: "2025-07-20",
      departureTime: "08:30",
      returnTime: "16:30",
      status: "pending",
      requester: {
        fullName: "Maya Sari",
        department: "Human Resources",
      },
      vehicle: undefined,
      driver: undefined,
      createdAt: "2025-07-11T18:01:00Z",
    },
  ]

  let mockDrivers = [
    {
      id: 1,
      employeeId: "DRV001",
      fullName: "Joko Susilo",
      licenseNumber: "SIM1234567890123456",
      phone: "081234567890",
      isAvailable: true,
      createdAt: "2023-01-01",
    },
    {
      id: 2,
      employeeId: "DRV002",
      fullName: "Bambang Wijaya",
      licenseNumber: "SIM2345678901234567",
      phone: "081234567891",
      isAvailable: true,
      createdAt: "2023-01-05",
    },
    {
      id: 3,
      employeeId: "DRV003",
      fullName: "Suratno",
      licenseNumber: "SIM3456789012345678",
      phone: "081234567892",
      isAvailable: false,
      createdAt: "2023-01-10",
    },
    {
      id: 4,
      employeeId: "DRV004",
      fullName: "Agus Prasetyo",
      licenseNumber: "SIM4567890123456789",
      phone: "081234567893",
      isAvailable: true,
      createdAt: "2023-01-15",
    },
    {
      id: 5,
      employeeId: "DRV005",
      fullName: "Hendra Gunawan",
      licenseNumber: "SIM5678901234567890",
      phone: "081234567894",
      isAvailable: true,
      createdAt: "2023-01-20",
    },
    {
      id: 6,
      employeeId: "DRV006",
      fullName: "Wawan Setiawan",
      licenseNumber: "SIM6789012345678901",
      phone: "081234567895",
      isAvailable: false,
      createdAt: "2023-01-25",
    },
  ]

  let mockBookings = [
    {
      id: 1,
      bookingNumber: "8K-2025-001",
      purpose: "Inspeksi Lokasi Tambang Area A",
      destination: "Site Tambang Blok A1",
      departureDate: "2025-07-11",
      departureTime: "08:00",
      returnTime: "17:00",
      status: "completed",
      requester: {
        fullName: "Ahmad Wijaya",
        department: "Mining Operations",
      },
      vehicle: {
        plateNumber: "B1234CD",
        brand: "Toyota",
        model: "Hilux",
      },
      driver: {
        fullName: "Joko Susilo",
      },
      createdAt: "2025-07-11T18:01:00Z",
    },
    {
      id: 2,
      bookingNumber: "8K-2025-002",
      purpose: "Meeting dengan Vendor Equipment",
      destination: "Kantor Vendor - Bekasi",
      departureDate: "2025-07-12",
      departureTime: "09:00",
      returnTime: "16:00",
      status: "pending",
      requester: {
        fullName: "Dewi Lestari",
        department: "Maintenance",
      },
      vehicle: undefined,
      driver: undefined,
      createdAt: "2025-07-11T18:01:00Z",
    },
    {
      id: 3,
      bookingNumber: "8K-2025-003",
      purpose: "Training Safety Mining",
      destination: "Training Center Jakarta",
      departureDate: "2025-07-12",
      departureTime: "07:30",
      returnTime: "18:00",
      status: "approved_level1",
      requester: {
        fullName: "Rudi Hermawan",
        department: "Safety & Security",
      },
      vehicle: undefined,
      driver: undefined,
      createdAt: "2025-07-11T18:01:00Z",
    },
    {
      id: 4,
      bookingNumber: "8K-2025-004",
      purpose: "Pengambilan Sample Nickel",
      destination: "Laboratory Universitas Indonesia",
      departureDate: "2025-07-18",
      departureTime: "10:00",
      returnTime: "15:00",
      status: "approved",
      requester: {
        fullName: "Ahmad Wijaya",
        department: "Mining Operations",
      },
      vehicle: {
        plateNumber: "B5678EF",
        brand: "Mitsubishi",
        model: "Pajero Sport",
      },
      driver: {
        fullName: "Bambang Wijaya",
      },
      createdAt: "2025-07-11T18:01:00Z",
    },
    {
      id: 5,
      bookingNumber: "8K-2025-005",
      purpose: "Rekrutmen Karyawan Baru",
      destination: "Universitas Trisakti",
      departureDate: "2025-07-20",
      departureTime: "08:30",
      returnTime: "16:30",
      status: "rejected",
      requester: {
        fullName: "Maya Sari",
        department: "Human Resources",
      },
      vehicle: undefined,
      driver: undefined,
      createdAt: "2025-07-11T18:01:00Z",
    },
    {
      id: 6,
      bookingNumber: "8K-2025-006",
      purpose: "Survey Lokasi Baru",
      destination: "Sulawesi Tengah",
      departureDate: "2025-07-12",
      departureTime: "06:00",
      returnTime: "20:00",
      status: "approved_level2",
      requester: {
        fullName: "Andi Pratama",
        department: "Procurement",
      },
      vehicle: undefined,
      driver: undefined,
      createdAt: "2025-07-11T18:01:00Z",
    },
    {
      id: 7,
      bookingNumber: "8K-2025-007",
      purpose: "Maintenance Equipment Tambang",
      destination: "Site Maintenance - Area B",
      departureDate: "2025-07-11",
      departureTime: "07:00",
      returnTime: "17:00",
      status: "completed",
      requester: {
        fullName: "Dewi Lestari",
        department: "Maintenance",
      },
      vehicle: {
        plateNumber: "B9012GH",
        brand: "Isuzu",
        model: "D-Max",
      },
      driver: {
        fullName: "Suratno",
      },
      createdAt: "2025-07-11T18:01:00Z",
    },
    {
      id: 8,
      bookingNumber: "8K-2025-008",
      purpose: "Audit Internal Mining Operations",
      destination: "Kantor Pusat Jakarta",
      departureDate: "2025-07-07",
      departureTime: "09:30",
      returnTime: "16:00",
      status: "completed",
      requester: {
        fullName: "Rudi Hermawan",
        department: "Safety & Security",
      },
      vehicle: {
        plateNumber: "B3456IJ",
        brand: "Ford",
        model: "Ranger",
      },
      driver: {
        fullName: "Agus Prasetyo",
      },
      createdAt: "2025-07-11T18:01:00Z",
    },
  ]

  // Untuk tujuan simulasi, kita akan menyimpan data di localStorage
  // Dalam aplikasi nyata, ini akan menjadi panggilan API ke backend Anda
  const storedVehicles = typeof window !== "undefined" ? localStorage.getItem("mockVehicles") : null
  if (storedVehicles) {
    mockVehicles = JSON.parse(storedVehicles)
  } else {
    if (typeof window !== "undefined") {
      localStorage.setItem("mockVehicles", JSON.stringify(mockVehicles))
    }
  }

  const storedApprovals = typeof window !== "undefined" ? localStorage.getItem("mockApprovals") : null
  if (storedApprovals) {
    mockApprovals = JSON.parse(storedApprovals)
  } else {
    if (typeof window !== "undefined") {
      localStorage.setItem("mockApprovals", JSON.stringify(mockApprovals))
    }
  }

  const storedDrivers = typeof window !== "undefined" ? localStorage.getItem("mockDrivers") : null
  if (storedDrivers) {
    mockDrivers = JSON.parse(storedDrivers)
  } else {
    if (typeof window !== "undefined") {
      localStorage.setItem("mockDrivers", JSON.stringify(mockDrivers))
    }
  }

  const storedBookings = typeof window !== "undefined" ? localStorage.getItem("mockBookings") : null
  if (storedBookings) {
    mockBookings = JSON.parse(storedBookings)
  } else {
    if (typeof window !== "undefined") {
      localStorage.setItem("mockBookings", JSON.stringify(mockBookings))
    }
  }

  switch (method) {
    case "GET":
      if (url === "/api/vehicles") {
        return mockVehicles
      }
      if (url === "/api/approvals/pending") {
        return mockApprovals.filter((app) => app.status === "pending")
      }
      if (url === "/api/drivers") {
        return mockDrivers
      }
      if (url === "/api/bookings") {
        return mockBookings
      }
      if (url.startsWith("/api/reports/export")) {
        const urlParams = new URLSearchParams(url.split("?")[1])
        const startDate = urlParams.get("startDate")
        const endDate = urlParams.get("endDate")
        let filteredData = mockBookings

        if (startDate && endDate) {
          const start = new Date(startDate)
          const end = new Date(endDate)
          filteredData = filteredData.filter((booking) => {
            const bookingDate = new Date(booking.departureDate)
            return bookingDate >= start && bookingDate <= end
          })
        }
        // In a real app, you'd generate an Excel file here.
        // For simulation, we return JSON data. The client will handle CSV conversion.
        return filteredData
      }
      if (url === "/api/auth/me") {
        const storedRole = typeof window !== "undefined" ? localStorage.getItem("userRole") : null
        if (storedRole) {
          return { role: storedRole }
        }
        throw new Error("Tidak ada sesi pengguna")
      }
      throw new Error("Endpoint tidak ditemukan")
    case "POST":
      if (url === "/api/auth/login") {
        const { username, password } = data
        const user = mockUsers.find((u) => u.username === username && u.password === password)
        if (user) {
          if (typeof window !== "undefined") {
            localStorage.setItem("userRole", user.role)
          }
          return { message: "Login berhasil", role: user.role }
        }
        throw new Error("Username atau password salah")
      }
      if (url === "/api/vehicles") {
        const newVehicle = {
          id: mockVehicles.length > 0 ? Math.max(...mockVehicles.map((v) => v.id)) + 1 : 1,
          ...data,
          createdAt: new Date().toISOString().split("T")[0],
        }
        mockVehicles.push(newVehicle)
        if (typeof window !== "undefined") {
          localStorage.setItem("mockVehicles", JSON.stringify(mockVehicles))
        }
        return newVehicle
      }
      if (url.startsWith("/api/approvals/")) {
        const parts = url.split("/")
        const idToUpdate = Number.parseInt(parts[3] || "")
        const action = parts[4] // 'approve' or 'reject'

        const approvalIndex = mockApprovals.findIndex((app) => app.id === idToUpdate)
        if (approvalIndex !== -1) {
          const updatedApproval = { ...mockApprovals[approvalIndex] }
          if (action === "approve") {
            updatedApproval.status = "approved"
          } else if (action === "reject") {
            updatedApproval.status = "rejected"
          } else {
            throw new Error("Aksi tidak valid")
          }
          mockApprovals[approvalIndex] = updatedApproval
          if (typeof window !== "undefined") {
            localStorage.setItem("mockApprovals", JSON.stringify(mockApprovals))
          }
          return updatedApproval
        }
        throw new Error("Persetujuan tidak ditemukan")
      }
      if (url === "/api/drivers") {
        const newDriver = {
          id: mockDrivers.length > 0 ? Math.max(...mockDrivers.map((d) => d.id)) + 1 : 1,
          ...data,
          createdAt: new Date().toISOString().split("T")[0],
        }
        mockDrivers.push(newDriver)
        if (typeof window !== "undefined") {
          localStorage.setItem("mockDrivers", JSON.stringify(mockDrivers))
        }
        return newDriver
      }
      throw new Error("Endpoint tidak ditemukan")
    case "PUT":
      if (url.startsWith("/api/vehicles/")) {
        const idToUpdate = Number.parseInt(url.split("/").pop() || "")
        const indexToUpdate = mockVehicles.findIndex((v) => v.id === idToUpdate)
        if (indexToUpdate !== -1) {
          mockVehicles[indexToUpdate] = { ...mockVehicles[indexToUpdate], ...data, id: idToUpdate }
          if (typeof window !== "undefined") {
            localStorage.setItem("mockVehicles", JSON.stringify(mockVehicles))
          }
          return mockVehicles[indexToUpdate]
        }
        throw new Error("Kendaraan tidak ditemukan")
      }
      if (url.startsWith("/api/drivers/")) {
        const idToUpdate = Number.parseInt(url.split("/").pop() || "")
        const indexToUpdate = mockDrivers.findIndex((d) => d.id === idToUpdate)
        if (indexToUpdate !== -1) {
          mockDrivers[indexToUpdate] = { ...mockDrivers[indexToUpdate], ...data, id: idToUpdate }
          if (typeof window !== "undefined") {
            localStorage.setItem("mockDrivers", JSON.stringify(mockDrivers))
          }
          return mockDrivers[indexToUpdate]
        }
        throw new Error("Driver tidak ditemukan")
      }
      throw new Error("Endpoint tidak ditemukan")
    case "DELETE":
      if (url.startsWith("/api/vehicles/")) {
        const idToDelete = Number.parseInt(url.split("/").pop() || "")
        mockVehicles = mockVehicles.filter((v) => v.id !== idToDelete)
        if (typeof window !== "undefined") {
          localStorage.setItem("mockVehicles", JSON.stringify(mockVehicles))
        }
        return { message: "Kendaraan berhasil dihapus" }
      }
      if (url.startsWith("/api/drivers/")) {
        const idToDelete = Number.parseInt(url.split("/").pop() || "")
        mockDrivers = mockDrivers.filter((d) => d.id !== idToDelete)
        if (typeof window !== "undefined") {
          localStorage.setItem("mockDrivers", JSON.stringify(mockDrivers))
        }
        return { message: "Driver berhasil dihapus" }
      }
      throw new Error("Endpoint tidak ditemukan")
    default:
      throw new Error("Metode tidak didukung")
  }
}
