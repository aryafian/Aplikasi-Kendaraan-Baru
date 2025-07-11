"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Car, AlertCircle } from "lucide-react"
import { apiRequest } from "@/lib/queryClient"
import { useRouter } from "next/navigation" // Import useRouter

export default function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter() // Initialize useRouter

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      const response = await apiRequest("POST", "/api/auth/login", { username, password })
      // Store role in localStorage (already handled by apiRequest mock)
      // Redirect to dashboard or home page after successful login
      router.push("/") // Redirect to dashboard
    } catch (error: any) {
      setError(error.message || "Login failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-screen w-screen bg-gray-100 flex items-center justify-center p-4 dark:bg-gray-950">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center">
              <Car className="w-8 h-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-50">VehicleFlow</CardTitle>
          <p className="text-sm text-gray-500 dark:text-gray-400">Sistem Manajemen Pemesanan Kendaraan</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Masukkan username"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password"
                required
              />
            </div>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white" disabled={loading}>
              {loading ? "Masuk..." : "Masuk"}
            </Button>
          </form>
          <div className="mt-6 p-4 bg-gray-50 rounded-lg dark:bg-gray-800">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-50 mb-2">Default Login Credentials:</h4>
            <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
              <p>
                <strong>Admin:</strong> admin / admin123
              </p>
              <p>
                <strong>Manager L1:</strong> manager1 / manager123
              </p>
              <p>
                <strong>Manager L2:</strong> manager2 / manager123
              </p>
              <p>
                <strong>User:</strong> user1 / user123
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
