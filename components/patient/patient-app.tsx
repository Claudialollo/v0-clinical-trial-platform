"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  Brain, Calendar, Check, Clock, Heart, Moon, Utensils, Activity, 
  Pill, ChevronRight, Shield, Sparkles 
} from "lucide-react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

// Protocol Tracker Component (il tuo originale)
function ProtocolTracker() {
  const probioticProgress = 85
  const daysUntilAppointment = 12

  return (
    <div className="space-y-4">
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/20">
                <Pill className="w-4 h-4 text-primary" />
              </div>
              <span className="font-medium text-sm">KABP052 Intake</span>
            </div>
            <Badge variant="outline" className="text-xs bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
              On Track
            </Badge>
          </div>
          
          <div className="flex items-center justify-center py-4">
            <div className="relative w-32 h-32">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="64" cy="64" r="56" fill="none" stroke="hsl(var(--border))" strokeWidth="8" />
                <circle cx="64" cy="64" r="56" fill="none" stroke="hsl(var(--primary))" strokeWidth="8" strokeLinecap="round"
                  strokeDasharray={`${probioticProgress * 3.52} 352`} className="transition-all duration-500" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-primary">{probioticProgress}%</span>
                <span className="text-xs text-muted-foreground">This Week</span>
              </div>
            </div>
          </div>

          <Button className="w-full bg-primary hover:bg-primary/90">
            <Check className="w-4 h-4 mr-2" />
            Log Today's Dose
          </Button>
        </CardContent>
      </Card>

      <Card className="border-secondary/20 bg-gradient-to-br from-secondary/5 to-primary/5">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-secondary/20">
              <Calendar className="w-6 h-6 text-secondary" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-muted-foreground">Next Blood Test</p>
              <p className="text-lg font-bold">{daysUntilAppointment} Days</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">April 24</p>
              <p className="text-xs text-muted-foreground">10:00 AM</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Interactive Logs (il tuo originale)
function InteractiveLogs() {
  const [selectedLog, setSelectedLog] = useState<string | null>(null)

  const logs = [
    { id: "sleep", title: "Sleep Quality", icon: Moon, color: "from-violet-500/20 to-purple-500/20", iconColor: "text-violet-600", lastEntry: "7.5 hours", status: "good" },
    { id: "diet", title: "Diet Log", icon: Utensils, color: "from-emerald-500/20 to-teal-500/20", iconColor: "text-emerald-600", lastEntry: "3 meals logged", status: "good" },
    { id: "stress", title: "Stress Level", icon: Heart, color: "from-amber-500/20 to-orange-500/20", iconColor: "text-amber-600", lastEntry: "Level 4/10", status: "moderate" },
    { id: "medication", title: "Other Medications", icon: Pill, color: "from-rose-500/20 to-red-500/20", iconColor: "text-rose-600", lastEntry: "No antibiotics", status: "good", alert: true }
  ]

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Daily Logs</h3>
      <div className="grid grid-cols-2 gap-3">
        {logs.map((log) => (
          <Card 
            key={log.id}
            className={cn("cursor-pointer transition-all duration-200 border-border/50", selectedLog === log.id && "ring-2 ring-primary")}
            onClick={() => setSelectedLog(selectedLog === log.id ? null : log.id)}
          >
            <CardContent className={cn("p-4 bg-gradient-to-br", log.color)}>
              <div className="flex items-start justify-between mb-3">
                <log.icon className={cn("w-5 h-5", log.iconColor)} />
                {log.alert && <Badge variant="outline" className="text-[10px] bg-rose-500/10 text-rose-600 border-rose-500/20">Alert</Badge>}
              </div>
              <p className="font-medium text-sm">{log.title}</p>
              <p className="text-xs text-muted-foreground mt-1">{log.lastEntry}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

// Brain Protection Gauge (il tuo originale)
function BrainProtectionGauge() {
  const protectionScore = 78
  return (
    <Card className="border-border/50 bg-gradient-to-br from-primary/10 via-secondary/5 to-primary/10 overflow-hidden">
      <CardContent className="p-4 relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/20">
              <Brain className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-sm">Brain Protection Score</h3>
              <p className="text-xs text-muted-foreground">Based on your adherence</p>
            </div>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-1">
              <div className="relative h-4 bg-muted rounded-full overflow-hidden">
                <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500" style={{ width: `${protectionScore}%` }} />
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-[10px] text-muted-foreground">0</span>
                <span className="text-[10px] text-muted-foreground">100</span>
              </div>
            </div>
            <div className="text-center">
              <span className="text-3xl font-bold text-primary">{protectionScore}</span>
              <p className="text-[10px] text-muted-foreground">/ 100</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-2 p-2 rounded-lg bg-background/50">
              <Activity className="w-4 h-4 text-emerald-500" />
              <div>
                <p className="text-[10px] text-muted-foreground">p-tau217</p>
                <p className="text-xs font-medium text-emerald-600">-18% vs baseline</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-lg bg-background/50">
              <Sparkles className="w-4 h-4 text-secondary" />
              <div>
                <p className="text-[10px] text-muted-foreground">Estradiol</p>
                <p className="text-xs font-medium text-secondary">+45% vs baseline</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// === BRAIN CONSTELLATION A FORMA DI CERVELLO (versione corretta e Vercel-safe) ===
function BrainConstellation() {
  const [completedTimepoints, setCompletedTimepoints] = useState(3)
  const [isClient, setIsClient] = useState(false)
  const maxTimepoints = 6

  const timepoints = [
    { id: 1, label: "Baseline", x: 72,  y: 55 },
    { id: 2, label: "W2",       x: 115, y: 38 },
    { id: 3, label: "W4",       x: 165, y: 32 },
    { id: 4, label: "W8",       x: 205, y: 48 },
    { id: 5, label: "W12",      x: 238, y: 78 },
    { id: 6, label: "Fine",     x: 155, y: 125 },
  ]

  const connections = [
    [1,2], [2,3], [3,4], [4,5], [5,6],
    [1,3], [2,4], [3,5], [1,6], [4,6]
  ]

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return (
      <Card className="border-primary/30 bg-gradient-to-br from-violet-500/5 to-transparent">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Brain className="w-6 h-6 text-primary" />
            <CardTitle className="text-lg">Costellazione Cerebrale</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="h-[240px] flex items-center justify-center">
          <div className="text-muted-foreground">Caricamento costellazione...</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-primary/30 bg-gradient-to-br from-violet-500/5 via-blue-500/5 to-transparent shadow-inner overflow-hidden">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Brain className="w-6 h-6 text-primary" />
            <div>
              <CardTitle className="text-lg">La tua Costellazione Cerebrale</CardTitle>
              <CardDescription>Ogni timepoint completato illumina una regione</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/30 px-3">
            {completedTimepoints}/6 attive
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pt-4 pb-8">
        <div className="relative mx-auto" style={{ width: 290, height: 190 }}>
          <svg width="290" height="190" viewBox="0 0 290 190" className="overflow-visible" suppressHydrationWarning>
            {connections.map(([a, b], i) => {
              const nodeA = timepoints.find(n => n.id === a)
              const nodeB = timepoints.find(n => n.id === b)
              if (!nodeA || !nodeB) return null
              const isLit = completedTimepoints >= Math.max(a, b)
              return (
                <line
                  key={i}
                  x1={nodeA.x} y1={nodeA.y}
                  x2={nodeB.x} y2={nodeB.y}
                  stroke={isLit ? "#4C1D95" : "#cbd5e1"}
                  strokeWidth="3"
                  strokeOpacity={isLit ? 0.9 : 0.35}
                  strokeDasharray={isLit ? "none" : "2 2"}
                  className="transition-all duration-700"
                />
              )
            })}

            {timepoints.map((node) => {
              const isLit = completedTimepoints >= node.id
              return (
                <g key={node.id}>
                  {isLit && <circle cx={node.x} cy={node.y} r="19" fill="#2563EB" opacity="0.22" />}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={isLit ? "13" : "10.5"}
                    fill={isLit ? "#4C1D95" : "#94a3b8"}
                    className={cn("transition-all duration-500", isLit && "drop-shadow-[0_0_10px_#4C1D95]")}
                  />
                  <text
                    x={node.x}
                    y={node.y + 32}
                    textAnchor="middle"
                    fill={isLit ? "#4C1D95" : "#64748b"}
                    fontSize="10"
                    fontWeight={isLit ? "600" : "500"}
                  >
                    {node.label}
                  </text>
                </g>
              )
            })}
          </svg>
        </div>

        <div className="flex justify-center mt-8">
          <Button
            onClick={() => setCompletedTimepoints(p => Math.min(p + 1, maxTimepoints))}
            disabled={completedTimepoints >= maxTimepoints}
            className="gap-2 bg-gradient-to-r from-primary to-secondary"
          >
            <Sparkles className="w-4 h-4" />
            {completedTimepoints >= maxTimepoints ? "🎉 Trial completato!" : "Completa prossimo timepoint"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

// Main Patient App Component
export function PatientApp() {
  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <header className="sticky top-0 z-40 px-4 py-3 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold">EstroMind</h1>
              <p className="text-xs text-muted-foreground">Your Trial Companion</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-[10px] bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
              <Shield className="w-3 h-3 mr-1" />
              Week 8
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 pb-24 space-y-6 max-w-lg mx-auto">
        <div className="text-center py-4">
          <h2 className="text-xl font-bold text-balance">Good Morning!</h2>
          <p className="text-sm text-muted-foreground mt-1">Let's track your progress today</p>
        </div>

        <ProtocolTracker />
        <BrainProtectionGauge />

        {/* ← LA COSTELLAZIONE QUI */}
        <BrainConstellation />

        <InteractiveLogs />

        {/* Quick Actions */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Quick Actions</h3>
          <div className="space-y-2">
            {[
              { label: "Complete Today's Assessment", icon: Clock },
              { label: "View My Progress Report", icon: Activity },
              { label: "Contact My Care Team", icon: Heart }
            ].map((action) => (
              <Button key={action.label} variant="outline" className="w-full justify-between h-12">
                <div className="flex items-center gap-3">
                  <action.icon className="w-4 h-4 text-muted-foreground" />
                  <span>{action.label}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </Button>
            ))}
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border px-4 py-2 z-40">
        <div className="flex items-center justify-around max-w-lg mx-auto">
          {[
            { icon: Activity, label: "Home", active: true },
            { icon: Calendar, label: "Schedule", active: false },
            { icon: Brain, label: "Tests", active: false },
            { icon: Heart, label: "Wellness", active: false }
          ].map((item) => (
            <button
              key={item.label}
              className={cn(
                "flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-colors",
                item.active ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  )
}
