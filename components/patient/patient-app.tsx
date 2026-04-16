"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Brain, Calendar, Check, Clock, Heart, Moon, Utensils, Activity,
  Pill, Shield, Sparkles, BookOpen, MessageCircle, Trophy, Bell,
  Send, Bot, User, X, AlertTriangle, Lock, Package, Info,
  ThumbsUp, Leaf, FlaskConical, ChevronRight, ChevronLeft,
  CheckCircle2, Plus, Trash2, Flame, Wheat, Droplets, Apple
} from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

// ── PROTOCOL TRACKER ──────────────────────────────────────────────
function ProtocolTracker() {
  const probioticProgress = 85
  const daysUntilAppointment = 12
  return (
    <div className="grid grid-cols-2 gap-6">
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/20">
                <Pill className="w-4 h-4 text-primary" />
              </div>
              <span className="font-medium">KABP052 Intake</span>
            </div>
            <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">On Track</Badge>
          </div>
          <div className="flex items-center justify-center py-6">
            <div className="relative w-40 h-40">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="80" cy="80" r="70" fill="none" stroke="hsl(var(--border))" strokeWidth="10" />
                <circle cx="80" cy="80" r="70" fill="none" stroke="hsl(var(--primary))" strokeWidth="10" strokeLinecap="round"
                  strokeDasharray={`${probioticProgress * 4.4} 440`} className="transition-all duration-500" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold text-primary">{probioticProgress}%</span>
                <span className="text-sm text-muted-foreground">This Week</span>
              </div>
            </div>
          </div>
          <Button className="w-full bg-primary hover:bg-primary/90">
            <Check className="w-4 h-4 mr-2" />Log Today's Dose
          </Button>
        </CardContent>
      </Card>
      <Card className="border-secondary/20 bg-gradient-to-br from-secondary/5 to-primary/5">
        <CardContent className="p-6 flex flex-col justify-center h-full">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-secondary/20">
              <Calendar className="w-8 h-8 text-secondary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Next Blood Test</p>
              <p className="text-3xl font-bold">{daysUntilAppointment} Days</p>
              <p className="text-sm text-muted-foreground">April 24 • 10:00 AM</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// ── BRAIN PROTECTION GAUGE ────────────────────────────────────────
function BrainProtectionGauge() {
  const protectionScore = 78
  return (
    <Card className="border-border/50 bg-gradient-to-br from-primary/10 via-secondary/5 to-primary/10">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/20">
            <Brain className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold">Brain Protection Score</h3>
            <p className="text-sm text-muted-foreground">Based on your adherence</p>
          </div>
        </div>
        <div className="flex items-center gap-6 mb-6">
          <div className="flex-1">
            <div className="relative h-5 bg-muted rounded-full overflow-hidden">
              <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500"
                style={{ width: `${protectionScore}%` }} />
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-xs text-muted-foreground">0</span>
              <span className="text-xs text-muted-foreground">100</span>
            </div>
          </div>
          <div className="text-center">
            <span className="text-4xl font-bold text-primary">{protectionScore}</span>
            <p className="text-xs text-muted-foreground">/ 100</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3 p-4 rounded-xl bg-background/50">
            <Activity className="w-5 h-5 text-emerald-500" />
            <div>
              <p className="text-xs text-muted-foreground">p-tau217</p>
              <p className="text-sm font-medium text-emerald-600">-18% vs baseline</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-xl bg-background/50">
            <Sparkles className="w-5 h-5 text-secondary" />
            <div>
              <p className="text-xs text-muted-foreground">Estradiol</p>
              <p className="text-sm font-medium text-secondary">+45% vs baseline</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// ── INTERACTIVE LOGS ──────────────────────────────────────────────
function InteractiveLogs() {
  const [alertModal, setAlertModal] = useState<string | null>(null)
  const [alertSent, setAlertSent] = useState<string | null>(null)
  const [alertNote, setAlertNote] = useState("")

  const logs = [
    { id: "sleep", title: "Sleep Quality", icon: Moon, color: "from-violet-500/20 to-purple-500/20", iconColor: "text-violet-600", lastEntry: "7.5 hours" },
    { id: "diet", title: "Diet Log", icon: Utensils, color: "from-emerald-500/20 to-teal-500/20", iconColor: "text-emerald-600", lastEntry: "3 meals logged" },
    { id: "stress", title: "Stress Level", icon: Heart, color: "from-amber-500/20 to-orange-500/20", iconColor: "text-amber-600", lastEntry: "Level 4/10" },
    { id: "medication", title: "Other Medications", icon: Pill, color: "from-rose-500/20 to-red-500/20", iconColor: "text-rose-600", lastEntry: "No antibiotics", alert: true }
  ]

  const handleSendAlert = (id: string) => {
    setAlertSent(id)
    setAlertModal(null)
    setAlertNote("")
    setTimeout(() => setAlertSent(null), 4000)
  }

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Daily Logs</h3>
      <div className="grid grid-cols-4 gap-4">
        {logs.map((log) => (
          <Card key={log.id} className="cursor-pointer transition-all duration-200 border-border/50 hover:ring-2 hover:ring-primary"
            onClick={() => setAlertModal(log.id)}>
            <CardContent className={cn("p-5 bg-gradient-to-br", log.color)}>
              <div className="flex items-start justify-between mb-3">
                <log.icon className={cn("w-6 h-6", log.iconColor)} />
                {(log as any).alert && (
                  <Badge variant="outline" className="text-[10px] bg-rose-500/10 text-rose-600 border-rose-500/20">Alert</Badge>
                )}
              </div>
              <p className="font-medium">{log.title}</p>
              <p className="text-sm text-muted-foreground mt-1">{log.lastEntry}</p>
              <p className="text-xs text-primary mt-2 flex items-center gap-1">
                <Bell className="w-3 h-3" /> Click to report
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {alertSent && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-600 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2">
          <Check className="w-4 h-4" /> Alert sent to your clinician!
        </div>
      )}

      {alertModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-card border border-border rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                <h3 className="font-semibold">Report an Unexpected Event</h3>
              </div>
              <button onClick={() => setAlertModal(null)}>
                <X className="w-5 h-5 text-muted-foreground hover:text-foreground" />
              </button>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Describe what happened in <span className="font-medium text-foreground">{logs.find(l => l.id === alertModal)?.title}</span> and your clinician will be notified.
            </p>
            <textarea
              className="w-full border border-border rounded-xl p-3 text-sm bg-background resize-none focus:outline-none focus:ring-2 focus:ring-primary"
              rows={4}
              placeholder="e.g. I had very poor sleep last night due to hot flashes..."
              value={alertNote}
              onChange={e => setAlertNote(e.target.value)}
            />
            <div className="flex gap-3 mt-4">
              <Button variant="outline" className="flex-1" onClick={() => setAlertModal(null)}>Cancel</Button>
              <Button className="flex-1 bg-primary" onClick={() => handleSendAlert(alertModal)}>
                <Send className="w-4 h-4 mr-2" /> Send Alert
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ── BRAIN CONSTELLATION ───────────────────────────────────────────
const rewards = [
  { id: 1, title: "Pelvic Floor Workshop", desc: "Access our exclusive 60-min workshop on pelvic floor health and exercises for menopause.", icon: "🏆" },
  { id: 2, title: "Sexual Wellness Guide", desc: "Download the expert guide on female sexuality and intimacy during menopause.", icon: "🌸" },
  { id: 3, title: "Mindful Menopause Kit", desc: "Access mindfulness and breathing exercises tailored for hormonal transitions.", icon: "🧘" },
  { id: 4, title: "Gut-Brain Masterclass", desc: "Watch the recorded masterclass on the gut-brain axis and the estrobolome.", icon: "🔬" },
  { id: 5, title: "Sleep Optimization Pack", desc: "Get the full sleep protocol designed for menopausal women.", icon: "🌙" },
  { id: 6, title: "Trial Completion Certificate", desc: "Download your personalized certificate of participation.", icon: "🎓" },
]

function BrainConstellation() {
  const [completedMonths] = useState(3)
  const [selectedReward, setSelectedReward] = useState<typeof rewards[0] | null>(null)

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
        <CardDescription>6-month journey • Click an unlocked node to claim your reward</CardDescription>
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
                <g key={node.id} className={lit ? "cursor-pointer" : ""} onClick={() => lit && setSelectedReward(rewards[node.id - 1])}>
                  {lit && <circle cx={node.x} cy={node.y} r="19" fill="#2563EB" opacity="0.25" />}
                  <circle cx={node.x} cy={node.y} r={lit ? "13.5" : "10.5"} fill={lit ? "#4C1D95" : "#94a3b8"} />
                  {!lit && <text x={node.x} y={node.y + 4} textAnchor="middle" fill="white" fontSize="9">🔒</text>}
                  <text x={node.x} y={node.y+33} textAnchor="middle" fill={lit ? "#4C1D95" : "#64748b"} fontSize="11" fontWeight={lit ? "700" : "500"}>
                    {node.label}
                  </text>
                </g>
              )
            })}
          </svg>
        </div>
        <div className="mt-6 grid grid-cols-3 gap-3">
          {rewards.map((r) => {
            const unlocked = completedMonths >= r.id
            return (
              <div key={r.id} onClick={() => unlocked && setSelectedReward(r)}
                className={cn("p-3 rounded-xl border text-center transition-all",
                  unlocked ? "border-primary/30 bg-primary/5 cursor-pointer hover:bg-primary/10" : "border-border/30 bg-muted/30 opacity-50")}>
                <div className="text-2xl mb-1">{r.icon}</div>
                <p className="text-xs font-medium">{r.title}</p>
                {!unlocked && <Lock className="w-3 h-3 mx-auto mt-1 text-muted-foreground" />}
              </div>
            )
          })}
        </div>
      </CardContent>
      {selectedReward && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-card border border-border rounded-2xl p-8 w-full max-w-md shadow-2xl text-center">
            <div className="text-5xl mb-4">{selectedReward.icon}</div>
            <h3 className="text-xl font-bold mb-2">🎉 Reward Unlocked!</h3>
            <h4 className="text-lg font-semibold text-primary mb-3">{selectedReward.title}</h4>
            <p className="text-sm text-muted-foreground mb-6">{selectedReward.desc}</p>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setSelectedReward(null)}>Close</Button>
              <Button className="flex-1 bg-primary">
                <Trophy className="w-4 h-4 mr-2" /> Access Reward
              </Button>
            </div>
          </div>
        </div>
      )}
    </Card>
  )
}

// ── EDUCATION ─────────────────────────────────────────────────────
function Education() {
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null)
  const topics = [
    {
      title: "Hormonal Changes", icon: Activity, color: "from-rose-500 to-pink-600",
      bgColor: "bg-rose-500/10", borderColor: "border-rose-500/30", iconColor: "text-rose-500",
      description: "What happens to your body during menopause",
      content: [
        { heading: "What happens hormonally?", text: "During menopause, the ovaries gradually reduce production of estrogen and progesterone. Estradiol (E2) drops significantly, affecting the brain, heart, bones, and skin." },
        { heading: "Vasomotor Symptoms", text: "Hot flashes and night sweats affect up to 80% of menopausal women, triggered by estrogen's effect on the hypothalamus." },
        { heading: "Cognitive Changes & Brain Fog", text: "Many women report memory lapses and difficulty concentrating. Declining estradiol reduces hippocampal protection." },
        { heading: "Sleep Disturbances", text: "Insomnia affects up to 60% of menopausal women due to night sweats, anxiety, and hormonal changes." },
      ]
    },
    {
      title: "Estrobolome & Gut", icon: FlaskConical, color: "from-emerald-500 to-teal-600",
      bgColor: "bg-emerald-500/10", borderColor: "border-emerald-500/30", iconColor: "text-emerald-500",
      description: "How your gut microbiome regulates estrogen",
      content: [
        { heading: "What is the estrobolome?", text: "The estrobolome is a subset of gut bacteria that produce beta-glucuronidase, which deconjugates estrogens — allowing them to be reabsorbed into circulation." },
        { heading: "Dysbiosis and hormonal imbalance", text: "When the gut microbiome is disrupted, estrogen recycling is impaired, worsening menopausal symptoms." },
        { heading: "The gut-brain axis", text: "Gut bacteria produce up to 95% of the body's serotonin and key neurotransmitters supporting cognitive function and mood." },
        { heading: "How your trial targets this system", text: "KABP052 rebalances key bacterial strains to optimise estrogen recycling and reduce neuroinflammation." },
      ]
    },
    {
      title: "Probiotics & Trial", icon: Pill, color: "from-violet-500 to-purple-600",
      bgColor: "bg-violet-500/10", borderColor: "border-violet-500/30", iconColor: "text-violet-500",
      description: "How KABP052 works and what to expect",
      content: [
        { heading: "How do probiotics help?", text: "Specific probiotic strains restore microbial balance in the estrobolome, improving estrogen metabolism and supporting neuroprotection." },
        { heading: "About KABP052", text: "A multi-strain probiotic formulation developed for neuro-endocrine support in perimenopausal and menopausal women." },
        { heading: "What to expect", text: "Weeks 4–8: improved gut comfort and mood stabilisation. Months 3–6: biomarker improvements become measurable." },
        { heading: "Safety", text: "Mild initial digestive changes in the first 1–2 weeks are normal and typically resolve spontaneously." },
      ]
    },
  ]

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Education Hub</h2>
        <p className="text-muted-foreground mt-1">Learn about menopause, your gut, and the science behind your trial</p>
      </div>
      {selectedTopic === null ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {topics.map((topic, i) => (
            <Card key={i} className={cn("cursor-pointer hover:shadow-md transition-all border", topic.borderColor)}
              onClick={() => setSelectedTopic(i)}>
              <CardContent className="p-6">
                <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-4", topic.bgColor)}>
                  <topic.icon className={cn("w-6 h-6", topic.iconColor)} />
                </div>
                <h3 className="font-bold text-lg mb-2">{topic.title}</h3>
                <p className="text-sm text-muted-foreground">{topic.description}</p>
                <div className="flex items-center gap-1 mt-4 text-primary text-sm font-medium">
                  Read more <ChevronRight className="w-4 h-4" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          <Button variant="outline" onClick={() => setSelectedTopic(null)} className="gap-2">
            <ChevronLeft className="w-4 h-4" /> Back
          </Button>
          <h2 className="text-2xl font-bold">{topics[selectedTopic].title}</h2>
          <div className="space-y-4">
            {topics[selectedTopic].content.map((c, i) => (
              <div key={i} className={cn("p-4 rounded-xl border", topics[selectedTopic].borderColor, topics[selectedTopic].bgColor)}>
                <h4 className="font-semibold mb-2">{c.heading}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// ── PRODUCT INFO ──────────────────────────────────────────────────
function ProductInfo() {
  const [activeSection, setActiveSection] = useState(0)
  const sections = [
    {
      title: "Overview", icon: <Package className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <div className="p-4 rounded-xl border border-primary/30 bg-primary/5">
            <h4 className="font-semibold mb-2">Kaneka Gyntima Menopause — KABP052</h4>
            <p className="text-sm text-muted-foreground">Multi-strain probiotic formulation for neuro-endocrine support in menopausal women. Contains Bifidobacterium animalis lactis KL101, Limosilactobacillus fermentum KL271, and Levilactobacillus brevis KL251.</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Daily dose", value: "1 capsule/day" },
              { label: "Trial duration", value: "6 months" },
              { label: "Storage", value: "Below 25°C" },
              { label: "Status", value: "GRAS certified" },
            ].map((item, i) => (
              <div key={i} className="p-3 rounded-xl border border-border bg-muted/30">
                <p className="text-xs text-muted-foreground">{item.label}</p>
                <p className="font-semibold text-sm mt-0.5">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      title: "How to Use", icon: <Pill className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          {[
            { heading: "Dosage", text: "Take 1 capsule per day, preferably with your largest meal. Take at the same time each day.", color: "border-primary/30 bg-primary/5" },
            { heading: "Antibiotics", text: "If prescribed antibiotics, continue the probiotic but separate by at least 2 hours. Report antibiotic use immediately via the app.", color: "border-amber-500/30 bg-amber-500/5" },
            { heading: "Storage", text: "Store below 25°C, away from direct sunlight and moisture. No refrigeration required.", color: "border-border/50 bg-muted/30" },
          ].map((item, i) => (
            <div key={i} className={cn("p-4 rounded-xl border", item.color)}>
              <h4 className="font-semibold mb-2">{item.heading}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      )
    },
    {
      title: "Safety", icon: <Shield className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/5">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <h4 className="font-semibold text-amber-700">Important Notice</h4>
            </div>
            <p className="text-sm text-muted-foreground">This is a dietary supplement, not a medicine. It does not replace prescribed hormone therapy or other medical treatments.</p>
          </div>
          {[
            { heading: "Side Effects", text: "Mild bloating or gas in the first 1–2 weeks is normal. Report persistent symptoms to your clinician.", color: "border-rose-500/30 bg-rose-500/5" },
            { heading: "Quality", text: "Manufactured in GMP-certified facilities by AB-Biotics (Kaneka Group). Third-party tested for potency and purity.", color: "border-emerald-500/30 bg-emerald-500/5" },
          ].map((item, i) => (
            <div key={i} className={cn("p-4 rounded-xl border", item.color)}>
              <h4 className="font-semibold mb-2">{item.heading}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      )
    },
  ]

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold">My Product: Kaneka Gyntima Menopause</h2>
        <p className="text-muted-foreground mt-1">Complete product information based on published clinical data</p>
      </div>
      <div className="flex gap-2 flex-wrap">
        {sections.map((s, i) => (
          <button key={i} onClick={() => setActiveSection(i)}
            className={cn("flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all",
              activeSection === i ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80")}>
            {s.icon}{s.title}
          </button>
        ))}
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">{sections[activeSection].icon}{sections[activeSection].title}</CardTitle>
        </CardHeader>
        <CardContent>{sections[activeSection].content}</CardContent>
      </Card>
    </div>
  )
}

// ── CHAT ──────────────────────────────────────────────────────────
function ChatSection() {
  const [messages, setMessages] = useState([
    { from: "clinician", text: "Good morning! I reviewed your latest biomarker results — your p-tau217 is down 18% from baseline. Excellent progress! 🎉", time: "09:15" },
    { from: "patient", text: "That's great news! I've been very consistent with the probiotic.", time: "09:22" },
    { from: "clinician", text: "Thank you for flagging that. How often are hot flashes happening?", time: "09:25" },
    { from: "ai", text: "💡 AI Insight: Based on your sleep logs, your average sleep duration has decreased by 42 minutes over the past 2 weeks.", time: "09:31" },
  ])
  const [newMessage, setNewMessage] = useState("")

  const sendMessage = () => {
    if (!newMessage.trim()) return
    setMessages(prev => [...prev, { from: "patient", text: newMessage, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }])
    setNewMessage("")
    setTimeout(() => {
      setMessages(prev => [...prev, { from: "ai", text: "💡 Your message has been sent to your clinician. Expected response within 24 hours.", time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }])
    }, 1000)
  }

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <div>
        <h2 className="text-2xl font-bold">Clinician Chat</h2>
        <p className="text-muted-foreground mt-1">Secure messaging with your care team + AI assistant</p>
      </div>
      <Card className="flex flex-col" style={{ height: "600px" }}>
        <CardHeader className="border-b pb-4 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <User className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-semibold">Dr. Sarah Chen</p>
              <p className="text-xs text-emerald-500">● Online</p>
            </div>
            <Badge variant="outline" className="ml-auto">HIPAA Encrypted</Badge>
          </div>
        </CardHeader>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={cn("flex gap-3", msg.from === "patient" ? "flex-row-reverse" : "flex-row")}>
              <div className={cn("w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                msg.from === "clinician" ? "bg-primary/20" : msg.from === "ai" ? "bg-amber-500/20" : "bg-secondary/20")}>
                {msg.from === "clinician" ? <User className="w-4 h-4 text-primary" /> :
                  msg.from === "ai" ? <Bot className="w-4 h-4 text-amber-500" /> :
                  <User className="w-4 h-4 text-secondary" />}
              </div>
              <div className={cn("max-w-sm", msg.from === "patient" ? "items-end" : "items-start")}>
                <div className={cn("px-4 py-3 rounded-2xl text-sm",
                  msg.from === "patient" ? "bg-primary text-primary-foreground rounded-tr-sm" :
                  msg.from === "ai" ? "bg-amber-500/10 border border-amber-500/20 rounded-tl-sm" :
                  "bg-muted rounded-tl-sm")}>
                  {msg.text}
                </div>
                <p className="text-[10px] text-muted-foreground mt-1 px-1">{msg.time}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="border-t p-4 flex gap-3 flex-shrink-0">
          <input
            className="flex-1 border border-border rounded-xl px-4 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Type a message..."
            value={newMessage}
            onChange={e => setNewMessage(e.target.value)}
            onKeyDown={e => e.key === "Enter" && sendMessage()}
          />
          <Button onClick={sendMessage} className="bg-primary"><Send className="w-4 h-4" /></Button>
        </div>
      </Card>
    </div>
  )
}

// ── AI HELP ───────────────────────────────────────────────────────
function AIHelp() {
  const [messages, setMessages] = useState([
    { from: "ai", text: "👋 Hi! I'm your NEBix AI assistant. I can answer questions about your trial, symptoms, probiotics, and menopause. How can I help you today?" }
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)

  const suggestions = [
    "What are hot flashes?",
    "How do probiotics help my hormones?",
    "What is the estrobolome?",
    "Why is sleep important in menopause?",
    "What is brain fog?",
    "Can I take antibiotics during the trial?",
  ]

  const faqAnswers: Record<string, string> = {
    "What are hot flashes?": "Hot flashes are sudden feelings of warmth caused by hormonal fluctuations affecting your body's temperature regulation. They typically last 1–5 minutes.",
    "How do probiotics help my hormones?": "Your probiotic KABP052 targets the estrobolome — the gut bacteria responsible for metabolising estrogens — helping maintain balanced estradiol levels.",
    "What is the estrobolome?": "The estrobolome is a subset of your gut microbiome that produces enzymes to metabolise estrogens, helping maintain adequate circulating estrogen levels.",
    "Why is sleep important in menopause?": "Sleep is crucial for brain detoxification, hormonal regulation, and mood stability. Disrupted sleep amplifies cognitive symptoms and raises cortisol.",
    "What is brain fog?": "Brain fog refers to forgetfulness, difficulty concentrating, and slower processing in menopause, caused by declining estradiol affecting hippocampal function.",
    "Can I take antibiotics during the trial?": "Complete any prescribed antibiotics as directed. Continue the probiotic but separate by 2 hours. Report antibiotic use immediately via the Daily Logs alert.",
  }

  const sendMessage = async (text: string) => {
    const userMsg = text || input
    if (!userMsg.trim()) return
    setMessages(prev => [...prev, { from: "user", text: userMsg }])
    setInput("")
    setLoading(true)
    await new Promise(r => setTimeout(r, 800))
    const answer = faqAnswers[userMsg] || "For personalised medical advice, please message your clinician directly. I can help with general information about menopause, your trial protocol, and the estrobolome."
    setMessages(prev => [...prev, { from: "ai", text: answer }])
    setLoading(false)
  }

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <div>
        <h2 className="text-2xl font-bold">AI Health Assistant</h2>
        <p className="text-muted-foreground mt-1">Ask me anything about your trial, symptoms, or menopause</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {suggestions.map((s, i) => (
          <button key={i} onClick={() => sendMessage(s)}
            className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm hover:bg-primary/20 transition-all border border-primary/20">
            {s}
          </button>
        ))}
      </div>
      <Card className="flex flex-col" style={{ height: "500px" }}>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={cn("flex gap-3", msg.from === "user" ? "flex-row-reverse" : "flex-row")}>
              <div className={cn("w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                msg.from === "ai" ? "bg-amber-500/20" : "bg-secondary/20")}>
                {msg.from === "ai" ? <Bot className="w-4 h-4 text-amber-500" /> : <User className="w-4 h-4 text-secondary" />}
              </div>
              <div className={cn("max-w-sm px-4 py-3 rounded-2xl text-sm",
                msg.from === "user" ? "bg-primary text-primary-foreground rounded-tr-sm" :
                "bg-amber-500/10 border border-amber-500/20 rounded-tl-sm")}>
                {msg.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-amber-500" />
              </div>
              <div className="px-4 py-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-sm">
                <span className="animate-pulse">Thinking...</span>
              </div>
            </div>
          )}
        </div>
        <div className="border-t p-4 flex gap-3 flex-shrink-0">
          <input
            className="flex-1 border border-border rounded-xl px-4 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Ask a question..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && sendMessage("")}
          />
          <Button onClick={() => sendMessage("")} className="bg-primary"><Send className="w-4 h-4" /></Button>
        </div>
      </Card>
    </div>
  )
}

// ── MONTHLY SNAPSHOT ──────────────────────────────────────────────
type SnapshotStep = "sleep" | "nutrition_questionnaire" | "nutrition_meals" | "results"

interface SleepData {
  hoursPerNight: string | null
  quality: number | null
  wakeUps: string | null
  stressLevel: number | null
  physicalActivity: string | null
  smoking: string | null
  alcohol: string | null
}

interface NutritionAnswers {
  vegetables: string | null
  legumes: string | null
  fermented: string | null
  wholegrains: string | null
  redMeat: string | null
  processedFood: string | null
  fish: string | null
  fruit: string | null
  nuts: string | null
  water: string | null
}

interface Meal {
  id: string
  name: string
  quantity: string
}

const FOOD_DB: Record<string, { calories: number; proteins: number; carbs: number; fats: number; fibers: number; estrobolomeScore: number; reason: string }> = {
  "yogurt":         { calories: 61,  proteins: 3.5, carbs: 4.7, fats: 3.3, fibers: 0,   estrobolomeScore: 9,  reason: "Probiotic — restores gmGUS activity" },
  "kefir":          { calories: 52,  proteins: 3.4, carbs: 4.8, fats: 2.0, fibers: 0,   estrobolomeScore: 10, reason: "Rich in Lactobacillus — high gmGUS support" },
  "kimchi":         { calories: 15,  proteins: 1.1, carbs: 2.4, fats: 0.5, fibers: 1.6, estrobolomeScore: 10, reason: "Fermented — directly supports estrobolome diversity" },
  "sauerkraut":     { calories: 19,  proteins: 0.9, carbs: 4.3, fats: 0.1, fibers: 2.9, estrobolomeScore: 9,  reason: "Fermented cabbage — high fiber + probiotic" },
  "flaxseed":       { calories: 534, proteins: 18,  carbs: 29,  fats: 42,  fibers: 27,  estrobolomeScore: 9,  reason: "Phytoestrogens + fiber — strong estrobolome support" },
  "broccoli":       { calories: 34,  proteins: 2.8, carbs: 7,   fats: 0.4, fibers: 2.6, estrobolomeScore: 8,  reason: "DIM compound — supports estrogen metabolism" },
  "lentils":        { calories: 116, proteins: 9,   carbs: 20,  fats: 0.4, fibers: 8,   estrobolomeScore: 8,  reason: "Prebiotic fiber — feeds Bifidobacterium" },
  "chickpeas":      { calories: 164, proteins: 8.9, carbs: 27,  fats: 2.6, fibers: 7.6, estrobolomeScore: 8,  reason: "Prebiotic + phytoestrogens" },
  "oats":           { calories: 389, proteins: 17,  carbs: 66,  fats: 7,   fibers: 10,  estrobolomeScore: 7,  reason: "Beta-glucan fiber — supports microbiome diversity" },
  "banana":         { calories: 89,  proteins: 1.1, carbs: 23,  fats: 0.3, fibers: 2.6, estrobolomeScore: 7,  reason: "Fructooligosaccharides — prebiotic effect" },
  "garlic":         { calories: 149, proteins: 6.4, carbs: 33,  fats: 0.5, fibers: 2.1, estrobolomeScore: 8,  reason: "Inulin — powerful prebiotic for Bifidobacterium" },
  "blueberries":    { calories: 57,  proteins: 0.7, carbs: 14,  fats: 0.3, fibers: 2.4, estrobolomeScore: 8,  reason: "Polyphenols — increase microbiome diversity" },
  "salmon":         { calories: 208, proteins: 20,  carbs: 0,   fats: 13,  fibers: 0,   estrobolomeScore: 6,  reason: "Omega-3 — anti-inflammatory, supports estrogen signaling" },
  "whole bread":    { calories: 247, proteins: 8.5, carbs: 48,  fats: 3.3, fibers: 6.8, estrobolomeScore: 6,  reason: "Whole grain fiber — supports microbiome" },
  "pasta":          { calories: 158, proteins: 5.5, carbs: 31,  fats: 0.9, fibers: 1.8, estrobolomeScore: 3,  reason: "Low fiber — minimal microbiome support" },
  "white rice":     { calories: 130, proteins: 2.7, carbs: 28,  fats: 0.3, fibers: 0.4, estrobolomeScore: 2,  reason: "Very low fiber — no estrobolome support" },
  "chicken":        { calories: 165, proteins: 31,  carbs: 0,   fats: 3.6, fibers: 0,   estrobolomeScore: 3,  reason: "Neutral — no specific estrobolome effect" },
  "eggs":           { calories: 155, proteins: 13,  carbs: 1.1, fats: 11,  fibers: 0,   estrobolomeScore: 4,  reason: "Choline — supports liver estrogen processing" },
  "red meat":       { calories: 271, proteins: 26,  carbs: 0,   fats: 18,  fibers: 0,   estrobolomeScore: 1,  reason: "High saturated fat — may reduce microbiome diversity" },
  "processed food": { calories: 450, proteins: 12,  carbs: 52,  fats: 22,  fibers: 1.2, estrobolomeScore: 0,  reason: "Ultra-processed — negative impact on estrobolome" },
  "olive oil":      { calories: 884, proteins: 0,   carbs: 0,   fats: 100, fibers: 0,   estrobolomeScore: 6,  reason: "Polyphenols — anti-inflammatory effect" },
  "almonds":        { calories: 579, proteins: 21,  carbs: 22,  fats: 50,  fibers: 12,  estrobolomeScore: 7,  reason: "Prebiotic fiber + healthy fats" },
  "walnuts":        { calories: 654, proteins: 15,  carbs: 14,  fats: 65,  fibers: 6.7, estrobolomeScore: 7,  reason: "ALA omega-3 + polyphenols" },
  "tofu":           { calories: 76,  proteins: 8,   carbs: 1.9, fats: 4.8, fibers: 0.3, estrobolomeScore: 8,  reason: "Isoflavones — phytoestrogens that support estrobolome" },
  "spinach":        { calories: 23,  proteins: 2.9, carbs: 3.6, fats: 0.4, fibers: 2.2, estrobolomeScore: 7,  reason: "Magnesium + fiber — supports gut health" },
  "apple":          { calories: 52,  proteins: 0.3, carbs: 14,  fats: 0.2, fibers: 2.4, estrobolomeScore: 7,  reason: "Pectin — prebiotic fiber for Bifidobacterium" },
  "green tea":      { calories: 1,   proteins: 0,   carbs: 0.2, fats: 0,   fibers: 0,   estrobolomeScore: 7,  reason: "Catechins — support estrogen metabolism" },
  "dark chocolate": { calories: 546, proteins: 5,   carbs: 60,  fats: 31,  fibers: 7,   estrobolomeScore: 6,  reason: "Flavonoids — microbiome diversity support" },
}

function SnapshotStepIndicator({ current }: { current: SnapshotStep }) {
  const steps: { id: SnapshotStep; label: string }[] = [
    { id: "sleep",                   label: "Sleep & Lifestyle" },
    { id: "nutrition_questionnaire", label: "Nutrition Survey" },
    { id: "nutrition_meals",         label: "Typical Day Meals" },
    { id: "results",                 label: "My Profile" },
  ]
  const currentIndex = steps.findIndex(s => s.id === current)
  return (
    <div className="flex items-center gap-0 mb-8">
      {steps.map((step, i) => (
        <div key={step.id} className="flex items-center flex-1">
          <div className="flex flex-col items-center gap-1.5">
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all",
              i < currentIndex  ? "bg-primary text-primary-foreground" :
              i === currentIndex ? "bg-primary text-primary-foreground ring-4 ring-primary/20" :
                                   "bg-muted text-muted-foreground"
            )}>
              {i < currentIndex ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
            </div>
            <span className={cn("text-[10px] text-center leading-tight max-w-[70px]",
              i === currentIndex ? "text-primary font-semibold" : "text-muted-foreground"
            )}>{step.label}</span>
          </div>
          {i < steps.length - 1 && (
            <div className={cn("flex-1 h-0.5 mb-4 mx-1 transition-all",
              i < currentIndex ? "bg-primary" : "bg-muted"
            )} />
          )}
        </div>
      ))}
    </div>
  )
}

function MonthlySnapshot() {
  const [step, setStep] = useState<SnapshotStep>("sleep")
  const [submitted, setSubmitted] = useState(false)
  const [sleepData, setSleepData] = useState<SleepData>({
    hoursPerNight: null, quality: null, wakeUps: null,
    stressLevel: null, physicalActivity: null, smoking: null, alcohol: null,
  })
  const [nutritionAnswers, setNutritionAnswers] = useState<NutritionAnswers>({
    vegetables: null, legumes: null, fermented: null, wholegrains: null,
    redMeat: null, processedFood: null, fish: null, fruit: null, nuts: null, water: null,
  })
  const [meals, setMeals] = useState<Meal[]>([])
  const [mealInput, setMealInput] = useState("")
  const [mealQty, setMealQty] = useState("100g")
  const [suggestions, setSuggestions] = useState<string[]>([])

  const steps: SnapshotStep[] = ["sleep", "nutrition_questionnaire", "nutrition_meals", "results"]
  const currentIndex = steps.indexOf(step)
  const goNext = () => { if (currentIndex < steps.length - 1) setStep(steps[currentIndex + 1]); else setSubmitted(true) }
  const goPrev = () => { if (currentIndex > 0) setStep(steps[currentIndex - 1]) }

  const updateSleep = (key: keyof SleepData, value: any) => setSleepData(prev => ({ ...prev, [key]: value }))
  const updateNutrition = (key: keyof NutritionAnswers, value: string) => setNutritionAnswers(prev => ({ ...prev, [key]: value }))

  const handleMealInput = (val: string) => {
    setMealInput(val)
    if (val.length > 1) setSuggestions(Object.keys(FOOD_DB).filter(f => f.toLowerCase().includes(val.toLowerCase())).slice(0, 6))
    else setSuggestions([])
  }

  const addMeal = (name: string) => {
    if (!name.trim()) return
    setMeals(prev => [...prev, { id: Date.now().toString(), name: name.toLowerCase(), quantity: mealQty }])
    setMealInput(""); setMealQty("100g"); setSuggestions([])
  }

  const removeMeal = (id: string) => setMeals(prev => prev.filter(m => m.id !== id))

  // Calculate scores
  const freq: Record<string, number> = { "Never": 0, "1–2×/month": 1, "1×/week": 2, "2–3×/week": 3, "Daily": 4 }
  const neg: Record<string, number>  = { "Never": 4, "1–2×/month": 3, "1×/week": 2, "2–3×/week": 1, "Daily": 0 }

  let totalCals = 0, totalProteins = 0, totalCarbs = 0, totalFats = 0, totalFibers = 0, totalEst = 0, scoredMeals = 0
  meals.forEach(meal => {
    const food = FOOD_DB[meal.name]
    if (food) {
      const f = meal.quantity.includes("50") ? 0.5 : meal.quantity.includes("150") ? 1.5 : meal.quantity.includes("200") ? 2 : meal.quantity.includes("250") ? 2.5 : 1
      totalCals += food.calories * f; totalProteins += food.proteins * f; totalCarbs += food.carbs * f
      totalFats += food.fats * f; totalFibers += food.fibers * f; totalEst += food.estrobolomeScore; scoredMeals++
    }
  })

  const mealEstroScore = scoredMeals > 0 ? Math.round(totalEst / scoredMeals * 10) : 0
  const questionnaireScore = Math.round((
    (freq[nutritionAnswers.vegetables || "Never"] || 0) +
    (freq[nutritionAnswers.legumes || "Never"] || 0) * 1.5 +
    (freq[nutritionAnswers.fermented || "Never"] || 0) * 2 +
    (freq[nutritionAnswers.wholegrains || "Never"] || 0) +
    (neg[nutritionAnswers.redMeat || "Never"] || 0) * 0.5 +
    (neg[nutritionAnswers.processedFood || "Never"] || 0) +
    (freq[nutritionAnswers.fish || "Never"] || 0) +
    (freq[nutritionAnswers.fruit || "Never"] || 0) +
    (freq[nutritionAnswers.nuts || "Never"] || 0) * 1.5
  ) / 20 * 100)

  const finalEstroScore = Math.round((meals.length > 0 ? mealEstroScore * 0.4 : 0) + questionnaireScore * 0.6)
  const sleepScore = Math.round((
    (sleepData.hoursPerNight === "7–8" ? 100 : sleepData.hoursPerNight === "6–7" ? 70 : sleepData.hoursPerNight === "8–9" ? 80 : 40) * 0.4 +
    ((sleepData.quality || 3) * 20) * 0.3 +
    (sleepData.wakeUps === "Never" ? 100 : sleepData.wakeUps === "Rarely" ? 75 : 40) * 0.3
  ))
  const lifestyleScore = Math.round((
    (sleepData.physicalActivity === "Daily" || sleepData.physicalActivity === "5+ days" ? 100 :
     sleepData.physicalActivity === "3–4 days" ? 75 : sleepData.physicalActivity === "1–2 days" ? 40 : 10) * 0.5 +
    (sleepData.smoking === "No" ? 100 : sleepData.smoking === "Occasionally" ? 60 : 20) * 0.3 +
    (sleepData.alcohol === "None" ? 100 : sleepData.alcohol === "Rarely" ? 80 : sleepData.alcohol === "1–3 drinks/week" ? 60 : 30) * 0.2
  ))

  const scoreColor = (s: number) => s >= 70 ? "text-emerald-500" : s >= 40 ? "text-amber-500" : "text-rose-500"
  const scoreBg    = (s: number) => s >= 70 ? "bg-emerald-500" : s >= 40 ? "bg-amber-500" : "bg-rose-500"

  const freq2 = ["Never", "1–2×/month", "1×/week", "2–3×/week", "Daily"]
  const nutritionQuestions: { key: keyof NutritionAnswers; label: string; icon: string; tip: string }[] = [
    { key: "vegetables",    label: "Fresh vegetables",                     icon: "🥦", tip: "Broccoli, spinach, courgette, peppers..." },
    { key: "legumes",       label: "Legumes (lentils, chickpeas, beans)",  icon: "🫘", tip: "Key prebiotic fiber for the estrobolome" },
    { key: "fermented",     label: "Fermented foods",                      icon: "🫙", tip: "Yogurt, kefir, kimchi, miso, sauerkraut" },
    { key: "wholegrains",   label: "Whole grains",                         icon: "🌾", tip: "Oats, whole bread, brown rice, quinoa" },
    { key: "redMeat",       label: "Red or processed meat",                icon: "🥩", tip: "Beef, pork, sausages, cold cuts" },
    { key: "processedFood", label: "Ultra-processed foods",                icon: "🍟", tip: "Packaged snacks, fast food, ready meals" },
    { key: "fish",          label: "Fish (especially oily fish)",          icon: "🐟", tip: "Salmon, mackerel, sardines, tuna" },
    { key: "fruit",         label: "Fresh fruit",                          icon: "🍎", tip: "Especially berries, apples, citrus" },
    { key: "nuts",          label: "Nuts and seeds",                       icon: "🌰", tip: "Almonds, walnuts, flaxseed, chia" },
    { key: "water",         label: "Water intake per day",                 icon: "💧", tip: "Essential for intestinal transit" },
  ]

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto text-center py-16 space-y-4">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8 text-emerald-500" />
        </div>
        <h2 className="text-2xl font-bold">Snapshot Saved!</h2>
        <p className="text-muted-foreground">Your Monthly Snapshot has been saved and sent to your clinical team. See you next month!</p>
        <p className="text-xs text-muted-foreground">Next snapshot due: <strong>May 16, 2026</strong></p>
        <Button onClick={() => { setSubmitted(false); setStep("sleep") }} variant="outline" className="mt-4">
          Complete a new snapshot
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="w-5 h-5 text-primary" />
          <h1 className="text-2xl font-bold">My Monthly Snapshot</h1>
          <Badge variant="outline" className="text-xs ml-auto">April 2026</Badge>
        </div>
        <p className="text-sm text-muted-foreground">Takes about 5 minutes. Helps your clinical team understand your monthly baseline.</p>
      </div>

      <SnapshotStepIndicator current={step} />

      <div className="rounded-xl border border-border bg-card p-6 space-y-6">

        {/* STEP 1 — SLEEP */}
        {step === "sleep" && (
          <>
            <div>
              <h2 className="text-xl font-bold mb-1">Sleep & Lifestyle</h2>
              <p className="text-sm text-muted-foreground">Tell us about your daily habits this month.</p>
            </div>
            {[
              { key: "hoursPerNight" as keyof SleepData, label: "Hours of sleep per night on average", icon: "🌙", opts: ["< 5", "5–6", "6–7", "7–8", "8–9", "> 9"], suffix: "h" },
              { key: "wakeUps" as keyof SleepData, label: "Do you wake up during the night?", icon: "😴", opts: ["Never", "Rarely", "1–2 times/week", "Most nights", "Every night"], suffix: "" },
              { key: "physicalActivity" as keyof SleepData, label: "Physical activity per week", icon: "🏃", opts: ["None", "1–2 days", "3–4 days", "5+ days", "Daily"], suffix: "" },
              { key: "smoking" as keyof SleepData, label: "Do you smoke?", icon: "🚭", opts: ["No", "Occasionally", "Yes — less than 10/day", "Yes — more than 10/day"], suffix: "" },
              { key: "alcohol" as keyof SleepData, label: "Alcohol consumption", icon: "🍷", opts: ["None", "Rarely", "1–3 drinks/week", "4–7 drinks/week", "Daily"], suffix: "" },
            ].map(q => (
              <div key={q.key} className="space-y-2">
                <label className="text-sm font-semibold">{q.icon} {q.label}</label>
                <div className="flex gap-2 flex-wrap">
                  {q.opts.map(opt => (
                    <button key={opt} onClick={() => updateSleep(q.key, opt)}
                      className={cn("px-4 py-2 rounded-xl border text-sm transition-all",
                        sleepData[q.key] === opt ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary/50 hover:bg-primary/5"
                      )}>
                      {opt}{q.suffix}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            {[
              { key: "quality" as keyof SleepData, label: "Sleep quality (1 = very poor, 5 = excellent)", icon: "⭐", max: 5, color: "bg-primary" },
              { key: "stressLevel" as keyof SleepData, label: "Average stress level (1 = very low, 5 = very high)", icon: "😰", max: 5, color: "bg-amber-500" },
            ].map(q => (
              <div key={q.key} className="space-y-2">
                <label className="text-sm font-semibold">{q.icon} {q.label}</label>
                <div className="flex gap-2">
                  {Array.from({ length: q.max }, (_, i) => i + 1).map(n => (
                    <button key={n} onClick={() => updateSleep(q.key, n)}
                      className={cn("w-12 h-12 rounded-xl border text-sm font-bold transition-all",
                        sleepData[q.key] === n ? `${q.color} text-white border-transparent` : "border-border hover:border-primary/50"
                      )}>
                      {n}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </>
        )}

        {/* STEP 2 — NUTRITION QUESTIONNAIRE */}
        {step === "nutrition_questionnaire" && (
          <>
            <div>
              <h2 className="text-xl font-bold mb-1">Nutrition Survey</h2>
              <p className="text-sm text-muted-foreground">How often do you eat these foods? We'll use this to calculate your Estrobolome Support Score.</p>
            </div>
            <div className="space-y-4">
              {nutritionQuestions.map(q => (
                <div key={q.key} className="p-4 rounded-xl border border-border bg-muted/10">
                  <div className="flex items-start gap-3 mb-3">
                    <span className="text-2xl">{q.icon}</span>
                    <div>
                      <p className="font-semibold text-sm">{q.label}</p>
                      <p className="text-xs text-muted-foreground">{q.tip}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {(q.key === "water" ? ["< 1L", "1–1.5L", "1.5–2L", "2–2.5L", "> 2.5L"] : freq2).map(opt => (
                      <button key={opt} onClick={() => updateNutrition(q.key, opt)}
                        className={cn("px-3 py-1.5 rounded-lg border text-xs font-medium transition-all",
                          nutritionAnswers[q.key] === opt ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary/50 hover:bg-primary/5"
                        )}>
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* STEP 3 — MEALS */}
        {step === "nutrition_meals" && (
          <>
            <div>
              <h2 className="text-xl font-bold mb-1">Your Typical Day — Meals</h2>
              <p className="text-sm text-muted-foreground">Add what you typically eat in a day. We'll calculate macronutrients and your Estrobolome Support Score automatically.</p>
            </div>
            <div className="space-y-3">
              <p className="text-sm font-semibold">Add a food item</p>
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <input
                    className="w-full border border-input rounded-xl px-4 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="e.g. yogurt, broccoli, salmon..."
                    value={mealInput}
                    onChange={e => handleMealInput(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && addMeal(mealInput)}
                  />
                  {suggestions.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-xl shadow-lg z-10 overflow-hidden">
                      {suggestions.map(s => (
                        <button key={s} onClick={() => { setMealInput(s); setSuggestions([]) }}
                          className="w-full text-left px-4 py-2.5 text-sm hover:bg-muted transition-colors capitalize">
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <select value={mealQty} onChange={e => setMealQty(e.target.value)}
                  className="border border-input rounded-xl px-3 py-2.5 text-sm bg-background focus:outline-none">
                  {["50g","100g","150g","200g","250g","1 cup","1 tbsp","1 portion"].map(q => <option key={q}>{q}</option>)}
                </select>
                <Button onClick={() => addMeal(mealInput)} size="sm" className="gap-1.5">
                  <Plus className="w-4 h-4" />Add
                </Button>
              </div>
              {meals.length === 0 ? (
                <div className="p-8 rounded-xl border border-dashed border-border text-center">
                  <Apple className="w-10 h-10 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Start adding foods to see your nutritional profile</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {meals.map(meal => {
                    const food = FOOD_DB[meal.name]
                    return (
                      <div key={meal.id} className={cn("flex items-center gap-3 px-4 py-3 rounded-xl border",
                        food ? food.estrobolomeScore >= 7 ? "border-emerald-500/30 bg-emerald-500/5" :
                               food.estrobolomeScore >= 4 ? "border-amber-500/30 bg-amber-500/5" :
                                                            "border-rose-500/30 bg-rose-500/5"
                             : "border-border bg-muted/20"
                      )}>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold capitalize">{meal.name}</span>
                            <span className="text-xs text-muted-foreground">{meal.quantity}</span>
                            {food && (
                              <Badge variant="outline" className={cn("text-[10px]",
                                food.estrobolomeScore >= 7 ? "text-emerald-600" :
                                food.estrobolomeScore >= 4 ? "text-amber-600" : "text-rose-600"
                              )}>
                                EST {food.estrobolomeScore}/10
                              </Badge>
                            )}
                          </div>
                          {food && <p className="text-[10px] text-muted-foreground mt-0.5">{food.reason}</p>}
                        </div>
                        <button onClick={() => removeMeal(meal.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </>
        )}

        {/* STEP 4 — RESULTS */}
        {step === "results" && (
          <>
            <div>
              <h2 className="text-xl font-bold mb-1">Your Monthly Snapshot</h2>
              <p className="text-sm text-muted-foreground">Your personalised baseline profile for April 2026.</p>
            </div>

            {/* Score cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: "Estrobolome Support Score", value: finalEstroScore, icon: Leaf,     desc: "How well your diet supports gmGUS activity and estrogen recycling" },
                { label: "Sleep Quality Score",        value: sleepScore,       icon: Moon,     desc: "Based on hours, quality and continuity of sleep" },
                { label: "Lifestyle Score",            value: lifestyleScore,   icon: Activity, desc: "Physical activity, smoking and alcohol habits" },
              ].map((s, i) => {
                const Icon = s.icon
                return (
                  <div key={i} className="rounded-xl border border-border bg-card p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-xs font-semibold text-muted-foreground">{s.label}</span>
                    </div>
                    <p className={cn("text-5xl font-bold mb-2", scoreColor(s.value))}>{s.value}</p>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden mb-2">
                      <div className={cn("h-full rounded-full transition-all", scoreBg(s.value))} style={{ width: `${s.value}%` }} />
                    </div>
                    <p className="text-[10px] text-muted-foreground leading-relaxed">{s.desc}</p>
                  </div>
                )
              })}
            </div>

            {/* Macronutrients */}
            {meals.length > 0 && (
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-semibold text-sm mb-4 flex items-center gap-2">
                  <Apple className="w-4 h-4 text-primary" />
                  Estimated Macronutrients (typical day)
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                  {[
                    { label: "Calories",  value: `${Math.round(totalCals)} kcal`,                                              icon: Flame,    color: "text-orange-500" },
                    { label: "Proteins",  value: `${Math.round(totalProteins)}g (${totalCals > 0 ? Math.round(totalProteins * 4 / totalCals * 100) : 0}%)`, icon: Activity,  color: "text-blue-500" },
                    { label: "Carbs",     value: `${Math.round(totalCarbs)}g (${totalCals > 0 ? Math.round(totalCarbs * 4 / totalCals * 100) : 0}%)`,       icon: Wheat,     color: "text-amber-500" },
                    { label: "Fats",      value: `${Math.round(totalFats)}g (${totalCals > 0 ? Math.round(totalFats * 9 / totalCals * 100) : 0}%)`,          icon: Droplets,  color: "text-purple-500" },
                    { label: "Fiber",     value: `${Math.round(totalFibers)}g`,                                                icon: Leaf,      color: "text-emerald-500" },
                  ].map((m, i) => {
                    const Icon = m.icon
                    return (
                      <div key={i} className="text-center p-3 rounded-xl bg-muted/30">
                        <Icon className={cn("w-5 h-5 mx-auto mb-1", m.color)} />
                        <p className="text-sm font-bold">{m.value}</p>
                        <p className="text-[10px] text-muted-foreground">{m.label}</p>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Trial reminder */}
<div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
  <div className="flex items-center gap-2 mb-3">
    <Info className="w-5 h-5 text-primary" />
    <h3 className="font-semibold text-sm text-primary">Important — Keep Your Habits as They Are</h3>
  </div>
  <p className="text-sm text-muted-foreground leading-relaxed">
    During the trial it is important that you <strong className="text-foreground">do not change your usual habits</strong> — continue eating, sleeping, and exercising exactly as you normally would. These scores are recorded only to give the clinical team a picture of your baseline. Any changes to your lifestyle during the trial could affect the scientific validity of the results.
  </p>
  <p className="text-sm text-muted-foreground leading-relaxed mt-2">
    If you have any questions about your diet, sleep or physical activity, please speak directly with your clinician.
  </p>
</div>
            {/* Info note */}
            <div className="flex items-start gap-3 p-4 rounded-xl border border-border bg-muted/20">
              <Info className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
              <p className="text-xs text-muted-foreground leading-relaxed">
                These scores are estimates based on your answers and are used by the clinical team to understand your baseline profile. They do not replace medical advice. Your data will be reviewed by the trial clinician at your next visit.
              </p>
            </div>
          </>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={goPrev} disabled={currentIndex === 0} className="gap-2">
          <ChevronLeft className="w-4 h-4" /> Back
        </Button>
        <Button onClick={goNext} className="gap-2">
          {step === "results" ? "Save Snapshot" : "Continue"}
          {step !== "results" && <ChevronRight className="w-4 h-4" />}
        </Button>
      </div>
    </div>
  )
}

// ── MAIN PATIENT APP ──────────────────────────────────────────────
export function PatientApp() {
  const [activeSection, setActiveSection] = useState<"dashboard" | "education" | "product" | "milestones" | "logs" | "calendar" | "chat" | "ai" | "snapshot">("dashboard")

  const navItems = [
    { id: "dashboard",  label: "Dashboard",           icon: Activity },
    { id: "snapshot",   label: "My Monthly Snapshot", icon: Sparkles },
    { id: "education",  label: "Education Hub",        icon: BookOpen },
    { id: "product",    label: "My Product",           icon: Package },
    { id: "milestones", label: "My Milestones",        icon: Trophy },
    { id: "logs",       label: "Daily Logs",           icon: Clock },
    { id: "calendar",   label: "My Calendar",          icon: Calendar },
    { id: "chat",       label: "Chat with Clinician",  icon: MessageCircle },
    { id: "ai",         label: "AI Assistant",         icon: Bot },
  ]

  return (
    <div className="min-h-screen bg-background flex">
      <aside className="w-64 border-r border-border bg-card flex flex-col fixed top-0 left-0 h-screen z-30">
        <div className="p-5 border-b flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <div className="min-w-0">
            <div className="font-bold text-lg leading-tight">NEBix</div>
            <div className="text-xs text-muted-foreground truncate">Patient Portal</div>
          </div>
        </div>
        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => (
            <button key={item.id} onClick={() => setActiveSection(item.id as any)}
              className={cn("w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                activeSection === item.id ? "bg-primary text-primary-foreground" : "hover:bg-muted text-foreground")}>
              <item.icon className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="p-3 border-t">
          <Badge variant="outline" className="w-full justify-center py-1.5 text-xs">HIPAA Compliant</Badge>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-h-screen" style={{ marginLeft: "256px" }}>
        <header className="h-14 border-b bg-card px-6 flex items-center justify-between sticky top-0 z-20">
          <div className="text-lg font-semibold">
            {navItems.find(n => n.id === activeSection)?.label ?? "Dashboard"}
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="text-xs">Week 8 • EM-002</Badge>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-primary/10 rounded-full flex items-center justify-center">
                <Shield className="w-3.5 h-3.5" />
              </div>
              <span className="text-sm">Patient EM-002</span>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-auto">
          {activeSection === "dashboard" && (
            <div className="space-y-6 max-w-6xl mx-auto">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Good Morning, EM-002</h1>
                <p className="text-muted-foreground">Here's your progress in the KABP052 trial</p>
              </div>
              <ProtocolTracker />
              <BrainProtectionGauge />
            </div>
          )}
          {activeSection === "snapshot" && (
            <div className="max-w-3xl mx-auto">
              <MonthlySnapshot />
            </div>
          )}
          {activeSection === "education" && <Education />}
          {activeSection === "product" && <ProductInfo />}
          {activeSection === "milestones" && (
            <div className="max-w-3xl mx-auto"><BrainConstellation /></div>
          )}
          {activeSection === "logs" && (
            <div className="max-w-6xl mx-auto"><InteractiveLogs /></div>
          )}
          {activeSection === "calendar" && (
            <div className="max-w-3xl mx-auto space-y-6">
              <div>
                <h2 className="text-2xl font-bold">My Calendar</h2>
                <p className="text-muted-foreground mt-1">Upcoming appointments and trial milestones</p>
              </div>
              <div className="space-y-4">
                {[
                  { title: "Blood Draw + Biomarkers", date: "April 24, 2026", time: "10:00 AM", days: "12", icon: Activity, color: "bg-primary/20", iconColor: "text-primary" },
                  { title: "Telemedicine Follow-up", date: "May 15, 2026", time: "11:30 AM", days: "33", icon: MessageCircle, color: "bg-secondary/20", iconColor: "text-secondary" },
                  { title: "Month 3 Questionnaire Due", date: "April 18, 2026", time: "Any time", days: "6", icon: Clock, color: "bg-amber-500/20", iconColor: "text-amber-600" },
                  { title: "My Monthly Snapshot Due", date: "April 16, 2026", time: "Any time", days: "Today", icon: Sparkles, color: "bg-primary/20", iconColor: "text-primary" },
                ].map((appt, i) => (
                  <div key={i} className="p-5 border rounded-2xl flex items-center gap-4 bg-card hover:border-primary/30 transition-all">
                    <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", appt.color)}>
                      <appt.icon className={cn("w-6 h-6", appt.iconColor)} />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{appt.title}</p>
                      <p className="text-sm text-muted-foreground">{appt.date} • {appt.time}</p>
                    </div>
                    <Badge variant="outline">
                      {appt.days === "Today" ? "🔔 Today" : `In ${appt.days} days`}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeSection === "chat" && <ChatSection />}
          {activeSection === "ai" && <AIHelp />}
        </main>
      </div>
    </div>
  )
}
