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

// Protocol Tracker
function ProtocolTracker() {
  const probioticProgress = 85
  return (
    <Card className="border-border/50 bg-card">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Pill className="w-5 h-5 text-primary" />
            <span className="font-semibold">KABP052 Intake</span>
          </div>
          <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">On Track</Badge>
        </div>
        <div className="flex justify-center py-6">
          <div className="relative w-36 h-36">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 128 128">
              <circle cx="64" cy="64" r="56" fill="none" stroke="#e5e5e5" strokeWidth="14"/>
              <circle cx="64" cy="64" r="56" fill="none" stroke="#4C1D95" strokeWidth="14" strokeLinecap="round"
                strokeDasharray={`${probioticProgress * 3.52} 352`}/>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl font-bold text-primary">{probioticProgress}</span>
              <span className="text-sm text-muted-foreground">%</span>
            </div>
          </div>
        </div>
        <Button className="w-full">Log Today's Dose</Button>
      </CardContent>
    </Card>
  )
}

// Brain Constellation (6 Months)
function BrainConstellation({ onRewardClick }: { onRewardClick: (month: number) => void }) {
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
        <CardTitle>My Milestones • 6 Months</CardTitle>
        <CardDescription>Tap a node to see your reward</CardDescription>
      </CardHeader>
      <CardContent>
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
                <g key={node.id} onClick={() => onRewardClick(node.id)} className="cursor-pointer">
                  {lit && <circle cx={node.x} cy={node.y} r="19" fill="#2563EB" opacity="0.25"/>}
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

// Education Section
function EducationSection() {
  return (
    <Card className="border-border/50 bg-card">
      <CardHeader>
        <CardTitle>Menopause Education</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 text-sm">
        <div>
          <h4 className="font-semibold mb-2">What is the Estrobolome?</h4>
          <p className="text-muted-foreground">The collection of gut bacteria that help metabolize and recycle estrogens. A healthy estrobolome supports stable estrogen levels during menopause.</p>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium mb-2">Hormonal Changes</h4>
            <ul className="text-muted-foreground space-y-1">
              <li>• Decline in estradiol & estrone</li>
              <li>• Rise in FSH & LH</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Common Symptoms</h4>
            <ul className="text-muted-foreground space-y-1">
              <li>• Hot flashes</li>
              <li>• Vaginal dryness</li>
              <li>• Sleep issues</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Main Patient App - Clinician-like Layout
export default function PatientApp() {
  const [activeSection, setActiveSection] = useState<"dashboard" | "education" | "milestones" | "logs" | "calendar" | "chat">("dashboard")

  const handleReward = (month: number) => {
    const rewards = ["Pelvic Floor Workshop", "Nutrition Guide", "Sexual Wellness Webinar", "Sleep Tips", "Nutritionist Call", "Certificate + Community"]
    alert(`Reward unlocked: ${rewards[month-1]}`)
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar - Clinician Style */}
      <div className="w-72 border-r border-border bg-card flex flex-col">
        <div className="p-6 border-b">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="font-bold text-2xl tracking-tight">EstroMind</div>
              <div className="text-xs text-muted-foreground">Clinical Trial Platform</div>
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
        {/* Top Header */}
        <header className="h-16 border-b bg-card px-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-xl font-semibold">Patient Portal</div>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-sm text-muted-foreground">EM-002 • Week 8</div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-medium">Patient EM-002</div>
                <div className="text-xs text-muted-foreground">KABP052 Trial</div>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-8 overflow-auto">
          {activeSection === "dashboard" && (
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
                <p className="text-muted-foreground">Here's your progress in the KABP052 trial</p>
              </div>
              <ProtocolTracker />
              <BrainProtectionGauge />
            </div>
          )}

          {activeSection === "education" && <EducationSection />}
          {activeSection === "milestones" && <BrainConstellation onRewardClick={handleReward} />}
          {activeSection === "logs" && <InteractiveLogs />}
          {activeSection === "calendar" && (
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
          )}
          {activeSection === "chat" && (
            <Card className="h-[500px]">
              <CardHeader><CardTitle>Chat with Your Clinician</CardTitle></CardHeader>
              <CardContent className="flex items-center justify-center h-96 text-muted-foreground">
                Secure AI + Clinician chat coming soon
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </div>
  )
}
