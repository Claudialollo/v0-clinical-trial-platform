"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Users, Activity, FlaskConical, TrendingUp, TrendingDown, Brain } from "lucide-react"
import { cn } from "@/lib/utils"

const stats = [
  {
    title: "Active Participants",
    value: "127",
    change: "+12%",
    trend: "up",
    icon: Users,
    description: "vs last month"
  },
  {
    title: "Average Adherence",
    value: "87.3%",
    change: "+5.2%",
    trend: "up",
    icon: Activity,
    description: "protocol compliance"
  },
  {
    title: "Tests Deployed",
    value: "342",
    change: "+28",
    trend: "up",
    icon: FlaskConical,
    description: "this week"
  },
  {
    title: "p-tau217 Reduction",
    value: "-18%",
    change: "Significant",
    trend: "down",
    icon: Brain,
    description: "avg. from baseline"
  }
]

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="border-border/50 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-5">
            <div className="flex items-start justify-between">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10">
                <stat.icon className="w-5 h-5 text-primary" />
              </div>
              <div className={cn(
                "flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full",
                stat.title === "p-tau217 Reduction" 
                  ? "bg-emerald-500/10 text-emerald-600"
                  : stat.trend === "up" 
                    ? "bg-emerald-500/10 text-emerald-600" 
                    : "bg-destructive/10 text-destructive"
              )}>
                {stat.title === "p-tau217 Reduction" ? (
                  <TrendingDown className="w-3 h-3" />
                ) : stat.trend === "up" ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                {stat.change}
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-bold tracking-tight">{stat.value}</h3>
              <p className="text-sm text-muted-foreground mt-1">{stat.title}</p>
              <p className="text-xs text-muted-foreground/70 mt-0.5">{stat.description}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
