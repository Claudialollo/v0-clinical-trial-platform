"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Brain, Calendar, Check, Clock, Heart, Moon, Utensils, Activity,
  Pill, ChevronRight, Shield, Sparkles, BookOpen, Leaf, ExternalLink, MessageCircle, AlertTriangle
} from "lucide-react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

// ====================== PROTOCOL TRACKER ======================
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

// ====================== INTERACTIVE LOGS ======================
function InteractiveLogs() {
  const [selectedLog, setSelectedLog] = useState<string | null>(null)

  const logs = [
    { id: "sleep", title: "Sleep Quality", icon: Moon, color: "from-violet-500/20 to-purple-500/20", iconColor: "text-violet-600", lastEntry: "7.5 hours" },
    { id: "diet", title: "Diet Log", icon: Utensils, color: "from-emerald-500/20 to-teal-500/20", iconColor: "text-emerald-600", lastEntry: "3 meals logged" },
    { id: "stress", title: "Stress Level", icon: Heart, color: "from-amber-500/20 to-orange-500/20", iconColor: "text-amber-600", lastEntry: "Level 4/10" },
    { id: "medication", title: "Other Medications", icon: Pill, color: "from-rose-500/20 to-red-500/20", iconColor: "text-rose-600", lastEntry: "No antibiotics" }
  ]

  const sendAlert = (title: string) => {
    alert(`Alert for "${title}" sent to your care team. They will contact you shortly.`)
  }

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
                <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); sendAlert(log.title); }}>
                  <AlertTriangle className="w-4 h-4 text-rose-500" />
                </Button>
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

// ====================== BRAIN PROTECTION GAUGE ======================
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
        </div>
      </CardContent>
    </Card>
  )
}

// ====================== BRAIN CONSTELLATION 6 MONTHS ======================
function BrainConstellation({ onRewardClick }: { onRewardClick: (month: number) => void }) {
  const [completedMonths, setCompletedMonths] = useState(3)
  const [isClient, setIsClient] = useState(false)
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

  useEffect(() => { setIsClient(true) }, [])

  if (!isClient) {
    return <div className="h-[260px] flex items-center justify-center text-muted-foreground">Loading milestones...</div>
  }

  return (
    <Card className="border-primary/30 bg-gradient-to-br from-violet-500/5 via-blue-500/5 to-transparent shadow-inner overflow-hidden">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Brain className="w-6 h-6 text-primary" />
            <CardTitle>My Milestones</CardTitle>
          </div>
          <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/30">
            {completedMonths}/6 completed
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
              const isLit = completedMonths >= Math.max(a, b)
              return (
                <line key={i} x1={nodeA.x} y1={nodeA.y} x2={nodeB.x} y2={nodeB.y}
                  stroke={isLit ? "#4C1D95" : "#cbd5e1"} strokeWidth="3.5"
                  strokeOpacity={isLit ? 0.95 : 0.4} strokeDasharray={isLit ? "none" : "3 3"}
                  className="transition-all duration-700" />
              )
            })}

            {timepoints.map((node) => {
              const isLit = completedMonths >= node.id
              return (
                <g key={node.id} onClick={() => onRewardClick(node.id)} className="cursor-pointer">
                  {isLit && <circle cx={node.x} cy={node.y} r="19" fill="#2563EB" opacity="0.25" />}
                  <circle cx={node.x} cy={node.y} r={isLit ? "13.5" : "10.5"}
                    fill={isLit ? "#4C1D95" : "#94a3b8"}
                    className={cn("transition-all duration-500", isLit && "drop-shadow-[0_0_12px_#4C1D95]")} />
                  <text x={node.x} y={node.y + 33} textAnchor="middle"
                    fill={isLit ? "#4C1D95" : "#64748b"} fontSize="10.5" fontWeight={isLit ? "700" : "500"}>
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

// ====================== EDUCATION SECTION ======================
function EducationSection() {
  return (
    <Card className="border-border shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <BookOpen className="w-6 h-6 text-primary" /> Menopause Education
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8 text-sm">
        <div>
          <h4 className="font-semibold mb-2 flex items-center gap-2"><Leaf className="text-emerald-600" /> What is the Estrobolome?</h4>
          <p className="text-muted-foreground">The estrobolome is the group of gut bacteria that help metabolize and recycle estrogens. A healthy estrobolome supports stable estrogen levels during menopause.</p>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium mb-2">Hormonal Changes</h4>
            <ul className="text-muted-foreground space-y-1 text-xs">
              <li>• Decline in estradiol & estrone</li>
              <li>• Rise in FSH & LH</li>
              <li>• Reduced bone & heart protection</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Common Symptoms</h4>
            <ul className="text-muted-foreground space-y-1 text-xs">
              <li>• Hot flashes & night sweats</li>
              <li>• Vaginal dryness</li>
              <li>• Fatigue & mood changes</li>
              <li>• Sleep disturbances</li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t">
          <h4 className="font-semibold mb-3">Your Product: KANEKA Gyntima Menopause</h4>
          <p className="text-muted-foreground mb-4">Probiotic with patented KABP® strains.</p>
          <Button asChild className="w-full">
            <a href="https://kanekaprobiotics.com/product/kabp-menopause/" target="_blank" rel="noopener noreferrer">
              Official Page <ExternalLink className="ml-2 w-4 h-4" />
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

// ====================== MAIN PATIENT APP ======================
export function PatientApp() {
  const [activeSection, setActiveSection] = useState<"home" | "education" | "milestones" | "logs" | "calendar" | "chat">("home")
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleReward = (month: number) => {
    const rewards = [
      "🎉 Pelvic Floor Workshop unlocked",
      "📘 Menopause Nutrition Guide",
      "🌸 Sexual Wellness Webinar",
      "🛌 Personalized Sleep Tips",
      "📞 1:1 Nutritionist Call",
      "🏆 Trial Completed! Certificate + Community Access"
    ]
    alert(rewards[month - 1])
  }

  const renderContent = () => {
    switch (activeSection) {
      case "education": return <EducationSection />
      case "milestones": return <BrainConstellation onRewardClick={handleReward} />
      case "logs": return <InteractiveLogs />
      case "calendar":
        return (
          <Card>
            <CardHeader><CardTitle>My Calendar</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 border rounded-xl flex gap-4">
                <Calendar className="w-5 h-5 text-primary mt-1" />
                <div>
                  <p className="font-medium">Blood Draw + Biomarkers</p>
                  <p className="text-sm text-muted-foreground">April 24, 2026 • 10:00 AM • Clinic</p>
                </div>
              </div>
              <div className="p-4 border rounded-xl flex gap-4">
                <Calendar className="w-5 h-5 text-primary mt-1" />
                <div>
                  <p className="font-medium">Telemedicine Follow-up</p>
                  <p className="text-sm text-muted-foreground">May 15, 2026 • 11:30 AM • Online</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      case "chat":
        return (
          <Card className="h-[420px]">
            <CardHeader><CardTitle className="flex items-center gap-2"><MessageCircle /> Chat with Clinician</CardTitle></CardHeader>
            <CardContent className="flex items-center justify-center h-80 text-center text-muted-foreground">
              AI-powered chat with your care team is available here.<br />Messages are secure and monitored.
            </CardContent>
          </Card>
        )
      default:
        return (
          <>
            <div className="text-center py-6">
              <h2 className="text-2xl font-bold">Good Morning!</h2>
              <p className="text-muted-foreground mt-1">Let's track your progress today</p>
            </div>
            <ProtocolTracker />
            <BrainProtectionGauge />
          </>
        )
    }
  }

  if (!isClient) {
    return <div className="min-h-screen flex items-center justify-center">Loading NEBix Patient Portal...</div>
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar - Desktop like clinician */}
      <div className="hidden lg:flex w-72 flex-col border-r border-border bg-card p-6">
        <div className="flex flex-col items-center mb-10">
          <Brain className="w-20 h-20 text-primary" />
          <div className="mt-4 text-4xl font-bold tracking-tighter">NEBix</div>
        </div>

        <nav className="space-y-2 flex-1">
          {[
            { id: "home", label: "Home", icon: Activity },
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
                "w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all",
                activeSection === item.id ? "bg-primary text-white" : "hover:bg-muted"
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Header */}
        <header className="lg:hidden sticky top-0 z-40 px-4 py-3 bg-background/95 backdrop-blur-sm border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Brain className="w-9 h-9 text-primary" />
              <div>
                <div className="font-bold text-xl tracking-tight">NEBix</div>
                <div className="text-xs text-muted-foreground">Patient Companion</div>
              </div>
            </div>
            <Badge variant="outline" className="text-xs">Week 8</Badge>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-8 max-w-3xl mx-auto w-full pb-20 lg:pb-8">
          {renderContent()}
        </main>

        {/* Mobile Bottom Navigation */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border px-4 py-2 z-50">
          <div className="flex justify-around max-w-lg mx-auto">
            {[
              { id: "home", icon: Activity, label: "Home" },
              { id: "education", icon: BookOpen, label: "Learn" },
              { id: "milestones", icon: Brain, label: "Milestones" },
              { id: "chat", icon: MessageCircle, label: "Chat" }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id as any)}
                className={cn("flex flex-col items-center gap-1 text-xs", activeSection === item.id ? "text-primary" : "text-muted-foreground")}
              >
                <item.icon className="w-6 h-6" />
                {item.label}
              </button>
            ))}
          </div>
        </nav>
      </div>
    </div>
  )
}
