"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  ReferenceArea
} from "recharts"
import { TrendingDown, TrendingUp, Pill, Brain, Moon, Activity } from "lucide-react"
import { useState } from "react"

// Simulated biomarker data over 12 weeks
const biomarkerData = [
  { week: "W0", pTau217: 100, estradiol: 25, fsh: 85 },
  { week: "W1", pTau217: 98, estradiol: 28, fsh: 82 },
  { week: "W2", pTau217: 95, estradiol: 32, fsh: 78, event: "antibiotic" },
  { week: "W3", pTau217: 97, estradiol: 30, fsh: 80 },
  { week: "W4", pTau217: 92, estradiol: 38, fsh: 74 },
  { week: "W5", pTau217: 88, estradiol: 42, fsh: 70, event: "stress" },
  { week: "W6", pTau217: 90, estradiol: 40, fsh: 72 },
  { week: "W7", pTau217: 85, estradiol: 48, fsh: 65 },
  { week: "W8", pTau217: 82, estradiol: 52, fsh: 62, event: "sleep" },
  { week: "W9", pTau217: 78, estradiol: 58, fsh: 58 },
  { week: "W10", pTau217: 75, estradiol: 62, fsh: 54 },
  { week: "W11", pTau217: 72, estradiol: 68, fsh: 50 },
  { week: "W12", pTau217: 68, estradiol: 72, fsh: 48 }
]

const eventIcons: Record<string, { icon: typeof Pill; label: string; color: string }> = {
  antibiotic: { icon: Pill, label: "Antibiotic", color: "#ef4444" },
  stress: { icon: Brain, label: "High Stress", color: "#f59e0b" },
  sleep: { icon: Moon, label: "Poor Sleep", color: "#8b5cf6" }
}

interface CustomTooltipProps {
  active?: boolean
  payload?: Array<{
    value: number
    dataKey: string
    color: string
  }>
  label?: string
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    const dataPoint = biomarkerData.find(d => d.week === label)
    
    return (
      <div className="bg-card border border-border rounded-xl p-4 shadow-lg">
        <p className="font-semibold text-sm mb-2">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center justify-between gap-4 text-sm">
            <span className="text-muted-foreground">{entry.dataKey}:</span>
            <span className="font-medium" style={{ color: entry.color }}>
              {entry.value} {entry.dataKey === "pTau217" ? "pg/mL" : "pg/mL"}
            </span>
          </div>
        ))}
        {dataPoint?.event && (
          <div className="mt-2 pt-2 border-t border-border">
            <Badge 
              variant="outline" 
              className="text-[10px]"
              style={{ borderColor: eventIcons[dataPoint.event].color, color: eventIcons[dataPoint.event].color }}
            >
              {eventIcons[dataPoint.event].label} Event
            </Badge>
          </div>
        )}
      </div>
    )
  }
  return null
}

export function BiomarkerChart() {
  const [timeRange, setTimeRange] = useState("12w")
  const [showEvents, setShowEvents] = useState(true)

  return (
    <Card className="border-border/50 shadow-sm">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20">
              <Activity className="w-5 h-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold">Biomarker Analytics</CardTitle>
              <CardDescription>p-tau217 vs Estradiol correlation with lifestyle events</CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Tabs value={timeRange} onValueChange={setTimeRange}>
              <TabsList className="h-8">
                <TabsTrigger value="4w" className="text-xs h-6">4W</TabsTrigger>
                <TabsTrigger value="8w" className="text-xs h-6">8W</TabsTrigger>
                <TabsTrigger value="12w" className="text-xs h-6">12W</TabsTrigger>
              </TabsList>
            </Tabs>
            <Button 
              variant={showEvents ? "secondary" : "outline"} 
              size="sm"
              onClick={() => setShowEvents(!showEvents)}
              className="text-xs h-8"
            >
              Events
            </Button>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-4 mt-4 pt-4 border-t border-border">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#4C1D95]" />
            <span className="text-xs text-muted-foreground">p-tau217</span>
            <Badge variant="outline" className="text-[10px] bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
              <TrendingDown className="w-3 h-3 mr-1" />
              -32%
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#2563EB]" />
            <span className="text-xs text-muted-foreground">Estradiol</span>
            <Badge variant="outline" className="text-[10px] bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
              <TrendingUp className="w-3 h-3 mr-1" />
              +188%
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#10b981]" />
            <span className="text-xs text-muted-foreground">FSH</span>
            <Badge variant="outline" className="text-[10px] bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
              <TrendingDown className="w-3 h-3 mr-1" />
              -44%
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={biomarkerData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.5} />
              <XAxis 
                dataKey="week" 
                stroke="hsl(var(--muted-foreground))" 
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))" 
                fontSize={12}
                tickLine={false}
                axisLine={false}
                domain={[0, 120]}
              />
              <Tooltip content={<CustomTooltip />} />
              
              {/* Event markers */}
              {showEvents && biomarkerData
                .filter(d => d.event)
                .map((d, i) => (
                  <ReferenceLine
                    key={i}
                    x={d.week}
                    stroke={eventIcons[d.event!].color}
                    strokeDasharray="4 4"
                    strokeWidth={2}
                  />
                ))
              }

              {/* Optimal zone for estradiol */}
              <ReferenceArea 
                y1={50} 
                y2={80} 
                fill="#2563EB" 
                fillOpacity={0.05} 
                stroke="none"
              />

              <Line
                type="monotone"
                dataKey="pTau217"
                stroke="#4C1D95"
                strokeWidth={3}
                dot={{ fill: "#4C1D95", strokeWidth: 0, r: 4 }}
                activeDot={{ r: 6, stroke: "#4C1D95", strokeWidth: 2, fill: "white" }}
              />
              <Line
                type="monotone"
                dataKey="estradiol"
                stroke="#2563EB"
                strokeWidth={3}
                dot={{ fill: "#2563EB", strokeWidth: 0, r: 4 }}
                activeDot={{ r: 6, stroke: "#2563EB", strokeWidth: 2, fill: "white" }}
              />
              <Line
                type="monotone"
                dataKey="fsh"
                stroke="#10b981"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: "#10b981", strokeWidth: 0, r: 3 }}
                activeDot={{ r: 5, stroke: "#10b981", strokeWidth: 2, fill: "white" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Event Tags */}
        {showEvents && (
          <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-border">
            <span className="text-xs text-muted-foreground">Event Timeline:</span>
            {biomarkerData.filter(d => d.event).map((d, i) => {
              const eventInfo = eventIcons[d.event!]
              return (
                <Badge 
                  key={i}
                  variant="outline" 
                  className="text-[10px] gap-1"
                  style={{ borderColor: eventInfo.color, color: eventInfo.color }}
                >
                  <eventInfo.icon className="w-3 h-3" />
                  {d.week}: {eventInfo.label}
                </Badge>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
