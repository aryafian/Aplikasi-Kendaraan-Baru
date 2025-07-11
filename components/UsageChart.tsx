"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

const UsageChart = () => {
  const data = {
    labels: ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"],
    datasets: [
      {
        label: "Pemakaian",
        data: [0.5, 0.7, 0.6, 0.8, 0.75, 0.9, 0.85],
        fill: true,
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: "rgb(59, 130, 246)",
        pointBorderColor: "#fff",
        pointHoverRadius: 6,
        pointHoverBackgroundColor: "rgb(59, 130, 246)",
        pointHoverBorderColor: "rgb(59, 130, 246)",
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      tooltip: {
        mode: "index" as const,
        intersect: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "hsl(var(--muted-foreground))",
        },
      },
      y: {
        min: 0,
        max: 1.0,
        ticks: {
          stepSize: 0.1,
          color: "hsl(var(--muted-foreground))",
        },
        grid: {
          color: "hsl(var(--border))",
        },
      },
    },
  }

  return (
    <Card className="p-6 flex flex-col flex-1">
      <CardHeader className="flex flex-row items-center justify-between p-0 mb-4">
        <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-50">Pemakaian Kendaraan</CardTitle>
        <Select defaultValue="7-days">
          <SelectTrigger className="w-[180px] text-sm">
            <SelectValue placeholder="Pilih periode" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7-days">7 Hari Terakhir</SelectItem>
            <SelectItem value="30-days">30 Hari Terakhir</SelectItem>
            <SelectItem value="3-months">3 Bulan Terakhir</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="p-0 h-[250px]">
        <Line data={data} options={options} />
      </CardContent>
    </Card>
  )
}

export default UsageChart
