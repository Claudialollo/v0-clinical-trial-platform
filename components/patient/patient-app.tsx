"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Brain, Calendar, Heart, Pill, Sparkles, BookOpen, Leaf, ExternalLink,
  Clock, Activity, Moon, Utensils, Shield, MessageCircle, AlertTriangle, Check
} from "lucide-react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

// ====================== PROTOCOL TRACKER ======================
function ProtocolTracker() {
  const probioticProgress = 85
  return (
    <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Pill className="w-6 h-6 text-primary" />
            <span className="font-semibold">KABP052 Daily Intake</span>
          </div>
          <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">On Track</Badge>
        </div>
        <div className="flex justify-center py-6">
          <div className="relative w-40 h-40">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 128 128">
              <circle cx="64" cy="64" r="56" fill="none" stroke="hsl(var(--border))" strokeWidth="12"/>
              <circle cx="64" cy="64" r="56" fill="none" stroke="hsl(var(--primary))" strokeWidth="12" strokeLinecap="round"
                strokeDasharray={`${probioticProgress * 3.52} 352`}/>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl font-bold text-primary">{probioticProgress}</span>
              <span className="text-sm text-muted-foreground">%</span>
            </div>
          </div>
        </div>
        <Button className="w-full" size="lg">
          <Check className="mr-2" /> Log Today's Dose
        </Button>
      </CardContent>
    </Card>
  )
}

// ====================== BRAIN CONSTELLATION (6 Months) ======================
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
    <Card className="border-primary/30 bg-gradient-to-br from-violet-500/5 via-blue-500/5 to-transparent shadow-inner">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Brain className="w-6 h-6 text-primary" />
            <CardTitle>My Milestones</CardTitle>
          </div>
          <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/30">
            {completedMonths}/6 months
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="relative mx-auto" style={{ width: 290, height: 190 }}>
          <svg width="290" height="190" viewBox="0 0 290 190" suppressHydrationWarning>
            {connections.map(([a,b],i) => {
              const A = timepoints.find(n => n.id === a)
              const B = timepoints.find(n => n.id === b)
              if (!A || !B) return null
              const lit = completedMonths >= Math.max(a,b)
              return <line key={i} x1={A.x} y1={A.y} x2={B.x} y2={B.y}
                stroke={lit ? "#4C1D95" : "#cbd5e1"} strokeWidth="3.5"
                strokeOpacity={lit ? 0.95 : 0.4} strokeDasharray={lit ? "none" : "3 3"} />
            })}

            {timepoints.map(node => {
              const lit = completedMonths >= node.id
              return (
                <g key={node.id} onClick={() => onRewardClick(node.id)} className="cursor-pointer">
                  {lit && <circle cx={node.x} cy={node.y} r="19" fill="#2563EB" opacity="0.25"/>}
                  <circle cx={node.x} cy={node.y} r={lit ? "13.5" : "10.5"}
                    fill={lit ? "#4C1D95" : "#94a3b8"}
                    className={cn("transition-all", lit && "drop-shadow-[0_0_12px_#4C1D95]")} />
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

// ====================== EDUCATION ======================
function EducationSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <BookOpen className="w-6 h-6" /> Menopause Education
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8 text-sm">
        <div>
          <h4 className="font-semibold mb-2 flex items-center gap-2"><Leaf className="text-emerald-600" /> What is the Estrobolome?</h4>
          <p className="text-muted-foreground">The estrobolome is the group of gut bacteria that metabolize and recycle estrogens. A healthy estrobolome helps maintain stable estrogen levels during menopause.</p>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium mb-2">Hormonal Changes</h4>
            <ul className="text-muted-foreground space-y-1">
              <li>• Decline in estradiol & estrone</li>
              <li>• Rise in FSH & LH</li>
              <li>• Reduced bone & heart protection</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Common Symptoms</h4>
            <ul className="text-muted-foreground space-y-1">
              <li>• Hot flashes & night sweats</li>
              <li>• Vaginal dryness</li>
              <li>• Fatigue & mood changes</li>
              <li>• Sleep disturbances</li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t">
          <h4 className="font-semibold mb-3">Your Product: KANEKA Gyntima Menopause</h4>
          <p className="text-muted-foreground mb-4">Probiotic with KABP® 051, 052 & 021 strains.</p>
          <Button asChild className="w-full">
            <a href="https://kanekaprobiotics.com/product/kabp-menopause/" target="_blank" rel="noopener noreferrer">
              Visit Official Page <ExternalLink className="ml-2 w-4 h-4" />
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

// ====================== MAIN APP ======================
export default function PatientApp() {
  const [activeSection, setActiveSection] = useState<"home" | "education" | "milestones" | "logs" | "calendar" | "chat">("home")
  const [isClient, setIsClient] = useState(false)

  useEffect(() => { setIsClient(true) }, [])

  const handleReward = (month: number) => {
    const messages = {
      1: "🎉 You unlocked: Pelvic Floor Workshop",
      2: "📘 Reward: Menopause Nutrition Guide",
      3: "🌸 You earned: Sexual Wellness Webinar",
      4: "🛌 Reward: Personalized Sleep Tips",
      5: "📞 1:1 Nutritionist Call unlocked",
      6: "🏆 Trial completed! Certificate + Community access"
    }
    alert(messages[month as keyof typeof messages])
  }

  const renderSection = () => {
    switch (activeSection) {
      case "education": return <EducationSection />
      case "milestones": return <BrainConstellation onRewardClick={handleReward} />
      case "logs": return <InteractiveLogs />
      case "calendar":
        return (
          <Card>
            <CardHeader><CardTitle>My Calendar</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4 p-4 border rounded-xl">
                <Calendar className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Blood Draw + Biomarker Test</p>
                  <p className="text-sm text-muted-foreground">April 24, 2026 • 10:00 AM • Clinic</p>
                </div>
              </div>
              <div className="flex gap-4 p-4 border rounded-xl">
                <Calendar className="w-5 h-5 text-primary mt-0.5" />
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
          <Card className="h-[500px] flex flex-col">
            <CardHeader className="border-b">
              <CardTitle className="flex items-center gap-2">
                <MessageCircle /> Chat with Clinician
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 p-4 text-center text-muted-foreground flex items-center justify-center">
              <div>
                <p className="text-lg mb-2">AI + Clinician Chat</p>
                <p className="text-sm">Your messages are secure and monitored by the clinical team.</p>
                <Button className="mt-6">Open Chat Window</Button>
              </div>
            </CardContent>
          </Card>
        )
      default:
        return (
          <>
            <ProtocolTracker />
            <BrainProtectionGauge />
          </>
        )
    }
  }

  if (!isClient) return <div className="min-h-screen flex items-center justify-center">Loading...</div>

  return (
    <div className="min-h-screen bg-background flex">
      {/* SIDEBAR */}
      <div className="w-72 border-r border-border bg-card hidden lg:flex flex-col">
        <div className="p-6 flex flex-col items-center border-b">
          {/* Logo grande + NEBix */}
          <div className="flex flex-col items-center">
            <Brain className="w-16 h-16 text-primary" />
            <span className="text-3xl font-bold tracking-tighter mt-2 text-foreground">NEBix</span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {[
            { id: "home", label: "Home", icon: Activity },
            { id: "education", label: "Education", icon: BookOpen },
            { id: "milestones", label: "My Milestones", icon: Brain },
            { id: "logs", label: "Daily Logs", icon: Clock },
            { id: "calendar", label: "My Calendar", icon: Calendar },
            { id: "chat", label: "Chat with Clinician", icon: MessageCircle },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id as any)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-left transition-all",
                activeSection === item.id ? "bg-primary text-white" : "hover:bg-muted"
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col">
        <header className="h-14 border-b flex items-center px-6 bg-background">
          <div className="flex-1">
            <span className="font-semibold text-lg">Patient Portal</span>
          </div>
          <Badge variant="outline">Week 8 • EM-002</Badge>
        </header>

        <main className="flex-1 p-6 overflow-auto">
          {renderSection()}
        </main>
      </div>
    </div>
  )
}
