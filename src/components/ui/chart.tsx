"use client"

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  Legend,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts"
import type { TooltipProps } from "recharts" // ✅ type-only import
import { cn } from "../../lib/utils"

// ---- Custom Tooltip ----
interface CustomTooltipProps {
  active?: boolean
  payload?: {
    value?: number
    name?: string
    color?: string
  }[]
  label?: string | number
  className?: string
}

function CustomTooltip({ active, payload, label, className }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    return (
      <div className={cn("rounded-md bg-white p-2 shadow-md", className)}>
        <p className="text-xs font-medium">{label}</p>
        {payload.map((item, index) => (
          <p key={index} className="text-xs" style={{ color: item.color }}>
            {item.name}: {item.value}
          </p>
        ))}
      </div>
    )
  }
  return null
}

// ---- Custom Legend ----
interface CustomLegendProps {
  payload?: {
    value?: string
    color?: string
  }[]
  className?: string
}

function CustomLegend({ payload, className }: CustomLegendProps) {
  if (!payload) return null
  return (
    <div className={cn("flex gap-4 text-xs", className)}>
      {payload.map((item, index) => (
        <div key={index} className="flex items-center gap-1">
          <span
            className="inline-block h-2 w-2 rounded-full"
            style={{ backgroundColor: item.color }}
          />
          {item.value}
        </div>
      ))}
    </div>
  )
}

// ---- Example Data ----
const data = [
  { name: "Jan", uv: 4000, pv: 2400 },
  { name: "Feb", uv: 3000, pv: 1398 },
  { name: "Mar", uv: 2000, pv: 9800 },
  { name: "Apr", uv: 2780, pv: 3908 },
]

// ---- Chart Component ----
export function Chart() {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend content={<CustomLegend />} />
          <Bar dataKey="pv" fill="#8884d8" />
          <Bar dataKey="uv" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
