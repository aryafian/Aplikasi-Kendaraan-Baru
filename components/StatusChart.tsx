"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Doughnut } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"

ChartJS.register(ArcElement, Tooltip, Legend)

const StatusChart = () => {
  const data = {
    labels: ["Tersedia", "Digunakan", "Maintenance"],
    datasets: [
      {
        data: [60, 25, 15], // Example data: 60% Available, 25% In Use, 15% Maintenance
        backgroundColor: ["#22c55e", "#3b82f6", "#ef4444"], // Green, Blue, Red
        borderColor: ["#ffffff", "#ffffff", "#ffffff"],
        borderWidth: 2,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // We'll create a custom legend
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            let label = context.label || ""
            if (label) {
              label += ": "
            }
            if (context.parsed !== null) {
              label += context.parsed + "%"
            }
            return label
          },
        },
      },
    },
  }

  return (
    <Card className="p-6 flex flex-col flex-1">
      <CardHeader className="flex flex-row items-center justify-between p-0 mb-4">
        <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-50">Status Kendaraan</CardTitle>
        <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-green-500"></span> Tersedia
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-blue-500"></span> Digunakan
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500"></span> Maintenance
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0 h-[250px] flex items-center justify-center">
        <div className="w-full max-w-[200px] h-full">
          <Doughnut data={data} options={options} />
        </div>
      </CardContent>
    </Card>
  )
}

export default StatusChart
