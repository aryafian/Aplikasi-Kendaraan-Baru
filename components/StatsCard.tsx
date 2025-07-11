import type { LucideIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowUp, ArrowDown } from "lucide-react"

interface StatsCardProps {
  title: string
  value: string
  change: string
  icon: LucideIcon
  trend: "up" | "down" | "neutral"
  iconBg: string
}

const StatsCard = ({ title, value, change, icon: Icon, trend, iconBg }: StatsCardProps) => {
  const trendColorClass =
    trend === "up"
      ? "text-green-600 dark:text-green-400"
      : trend === "down"
        ? "text-red-600 dark:text-red-400"
        : "text-gray-600 dark:text-gray-400"
  const TrendIcon = trend === "up" ? ArrowUp : trend === "down" ? ArrowDown : null

  return (
    <Card className="p-6 hover:shadow-md transition-shadow duration-200">
      <CardContent className="flex items-start justify-between p-0">
        <div className="flex flex-col">
          <h3 className="text-sm text-gray-600 dark:text-gray-400 font-medium mb-2">{title}</h3>
          <div className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-2">{value}</div>
          <div className={`flex items-center text-xs ${trendColorClass}`}>
            {TrendIcon && <TrendIcon className="w-3 h-3 mr-1" />}
            {change}
          </div>
        </div>
        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${iconBg}`}>
          <Icon className="w-6 h-6" />
        </div>
      </CardContent>
    </Card>
  )
}

export default StatsCard
