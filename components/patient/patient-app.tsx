"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Brain, Calendar, Check, Clock, Heart, Moon, Utensils, Activity,
  Pill, ChevronRight, Shield, Sparkles, BookOpen, Leaf, ExternalLink,
  MessageCircle, AlertTriangle
} from "lucide-react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

// Protocol Tracker (tuo originale)
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

// Interactive Logs (tuo originale)
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
            className={cn(
              "cursor-pointer transition-all duration-200 border-border/50",
              selectedLog === log.id && "ring-2 ring-primary"
            )}
            onClick={() => setSelectedLog(selectedLog === log.id ? null : log.id)}
          >
            <CardContent className={cn("p-4 bg-gradient-to-br", log.color)}>
              <div className="flex items-start justify-between mb-3">
                <log.icon className={cn("w-5 h-5", log.iconColor)} />
                {log.alert && (
                  <Badge variant="outline" className="text-[10px] bg-rose-500/10 text-rose-600 border-rose-500/20">
                    Alert
                  </Badge>
                )}
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

// Brain Protection Gauge (tuo originale)
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
                <div 
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500"
                  style={{ width: `${protectionScore}%` }}
                />
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

// Brain Constellation (6 Months)
function BrainConstellation() {
  const [completedMonths, setCompletedMonths] = useState(3)
  const maxMonths = 6

  const timepoints = [
    { id: 1, label: "M1", x: 68, y: 68 },
    { id: 2, label: "M2", x: 105, y: 42 },
    { id: 3, label: "M3", x: 155, y: 28 },
    { id: 4, label: "M4", x: 205, y: 45 },
    { id: 5, label: "M5", x: 235, y: 78 },
    { id: 6, label: "M6", x: 160, y: 125 },
  ]

  const connections = [[1,2],[2,3],[3,4],[4,5],[5,6],[6,1],[1,3],[2,4],[3,5],[2,6]]

  return (
    <Card className="border-border/50 bg-card">
      <CardHeader>
        <CardTitle>My Milestones</CardTitle>
        <CardDescription>6-month journey • Tap a node for reward</CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="relative mx-auto" style={{ width: 290, height: 190 }}>
          <svg width="290" height="190" viewBox="0 0 290 190" suppressHydrationWarning>
            {connections.map(([a,b],i) => {
              const A = timepoints.find(n => n.id === a)
              const B = timepoints.find(n => n.id === b)
              if (!A || !B) return null
              const lit = completedMonths >= Math.max(a,b)
              return <line key={i} x1={A.x} y1={A.y} x2={B.x} y2={B.y}
                stroke={lit ? "#4C1D95" : "#cbd5e1"} strokeWidth="3.5" strokeOpacity={lit ? 0.95 : 0.4} />
            })}

            {timepoints.map(node => {
              const lit = completedMonths >= node.id
              return (
                <g key={node.id}>
                  {lit && <circle cx={node.x} cy={node.y} r="19" fill="#2563EB" opacity="0.25" />}
                  <circle cx={node.x} cy={node.y} r={lit ? "13.5" : "10.5"} fill={lit ? "#4C1D95" : "#94a3b8"} />
                  <text x={node.x} y={node.y+33} textAnchor="middle" fill={lit ? "#4C1D95" : "#64748b"} fontSize="11" fontWeight={lit ? "700" : "500"}>
                    {node.label}
                  </text>
                </g>
              )
            })}
          </svg>
        </div>
      </CardContent>
    </Card>
  )
}

// Main Patient App - Clinician-style Layout
export function PatientApp() {
  const [activeSection, setActiveSection] = useState<"dashboard" | "education" | "milestones" | "logs" | "calendar" | "chat">("dashboard")

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar sinistra - stile clinician */}
      <div className="w-72 border-r border-border bg-card flex flex-col">
        <div className="p-6 border-b">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="font-bold text-2xl tracking-tight">EstroMind</div>
              <div className="text-xs text-muted-foreground">Patient Portal</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {[
            { id: "dashboard", label: "Dashboard", icon: Activity },
            { id: "education", label: "Education", icon: BookOpen },
            { id: "milestones", label: "My Milestones", icon: Brain },
            { id: "logs", label: "Daily Logs", icon: Clock },
            { id: "calendar", label: "My Calendar", icon: Calendar },
            { id: "chat", label: "Chat with Clinician", icon: MessageCircle },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id as any)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                activeSection === item.id ? "bg-primary text-primary-foreground" : "hover:bg-muted"
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t">
          <Badge variant="outline" className="w-full justify-center py-2">HIPAA Compliant</Badge>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header superiore */}
        <header className="h-16 border-b bg-card px-8 flex items-center justify-between">
          <div className="text-xl font-semibold">Patient Dashboard</div>
          <div className="flex items-center gap-4">
            <Badge variant="outline">Week 8 • EM-002</Badge>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <Shield className="w-4 h-4" />
              </div>
              <div className="text-sm">Patient EM-002</div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-8 overflow-auto">
          {activeSection === "dashboard" && (
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Good Morning, EM-002</h1>
                <p className="text-muted-foreground">Here's your progress in the KABP052 trial</p>
              </div>
              <ProtocolTracker />
              <BrainProtectionGauge />
            </div>
          )}

          {activeSection === "education" && (
            <div className="max-w-2xl">
              <h2 className="text-2xl font-bold mb-6">Menopause Education</h2>
              <div className="prose text-muted-foreground">
                <p>The estrobolome is the group of gut bacteria that help metabolize and recycle estrogens.</p>
                <p>During menopause, a healthy estrobolome helps maintain more stable estrogen levels.</p>
              </div>
            </div>
          )}

          {activeSection === "milestones" && <BrainConstellation />}

          {activeSection === "logs" && <InteractiveLogs />}

          {activeSection === "calendar" && (
            <div>
              <h2 className="text-2xl font-bold mb-6">My Calendar</h2>
              <div className="space-y-4">
                <div className="p-6 border rounded-2xl">
                  <p className="font-medium">Blood Draw + Biomarkers</p>
                  <p className="text-sm text-muted-foreground">April 24, 2026 • 10:00 AM</p>
                </div>
                <div className="p-6 border rounded-2xl">
                  <p className="font-medium">Telemedicine Follow-up</p>
                  <p className="text-sm text-muted-foreground">May 15, 2026 • 11:30 AM</p>
                </div>
              </div>
            </div>
          )}

          {activeSection === "chat" && (
            <div className="text-center py-20">
              <MessageCircle className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold">Chat with your Clinician</h3>
              <p className="text-muted-foreground mt-2">Secure messaging and AI support</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
