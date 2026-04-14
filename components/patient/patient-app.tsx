"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Brain, Calendar, Check, Clock, Heart, Moon, Utensils, Activity,
  Pill, Shield, Sparkles, BookOpen, MessageCircle, Trophy, Bell,
  ChevronRight, Send, Bot, User, X, AlertTriangle, Lock
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
                {log.alert && (
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

      {/* Alert Sent Toast */}
      {alertSent && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-600 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2">
          <Check className="w-4 h-4" /> Alert sent to your clinician!
        </div>
      )}

      {/* Alert Modal */}
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
  { id: 6, title: "Trial Completion Certificate", desc: "Congratulations! Download your NEBix trial completion certificate.", icon: "🎓" },
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
                  {!lit && <text x={node.x} y={node.y + 1} textAnchor="middle" fill="white" fontSize="10">🔒</text>}
                  <text x={node.x} y={node.y+33} textAnchor="middle" fill={lit ? "#4C1D95" : "#64748b"} fontSize="11" fontWeight={lit ? "700" : "500"}>
                    {node.label}
                  </text>
                </g>
              )
            })}
          </svg>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-3">
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

      {/* Reward Modal */}
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
  const [activeTab, setActiveTab] = useState(0)
  const topics = [
    {
      title: "Hormonal Changes in Menopause",
      icon: "🌡️",
      content: [
        { heading: "What happens hormonally?", text: "During menopause, the ovaries gradually reduce production of estrogen and progesterone. This transition — called perimenopause — typically begins in the mid-40s and can last several years. Estradiol (E2), the primary form of estrogen, drops significantly, affecting many body systems." },
        { heading: "Why does it matter for the brain?", text: "Estrogen plays a neuroprotective role. It supports serotonin and dopamine function, promotes synaptic plasticity, and helps clear amyloid beta — a protein linked to Alzheimer's disease. Lower estrogen levels are associated with increased neuroinflammation and higher risk of cognitive decline." },
        { heading: "Common hormonal symptoms", text: "Hot flashes and night sweats, mood changes, sleep disturbances, vaginal dryness, decreased libido, brain fog and memory difficulties, joint pain, and changes in skin and hair texture." },
      ]
    },
    {
      title: "The Estrobolome & Gut Health",
      icon: "🦠",
      content: [
        { heading: "What is the estrobolome?", text: "The estrobolome is a collection of gut bacteria that produce enzymes — especially beta-glucuronidase — that metabolize and recirculate estrogens. A healthy estrobolome helps maintain balanced estrogen levels by allowing the body to reabsorb active estrogens from the gut." },
        { heading: "Dysbiosis and estrogen imbalance", text: "When the gut microbiome is disrupted (dysbiosis), the estrobolome becomes less effective. This can lead to either too much or too little circulating estrogen. Antibiotics, poor diet, stress, and aging are common causes of dysbiosis." },
        { heading: "The gut-brain axis", text: "The gut and brain communicate bidirectionally via the vagus nerve, immune signals, and microbial metabolites. A healthy microbiome produces short-chain fatty acids, tryptophan precursors (for serotonin), and GABA — all of which support brain health and mood regulation." },
      ]
    },
    {
      title: "Probiotics & the KABP052 Trial",
      icon: "💊",
      content: [
        { heading: "How do probiotics help?", text: "Specific probiotic strains can restore microbial balance in the estrobolome, reducing beta-glucuronidase overactivity and improving estrogen metabolism. This may help maintain more stable estradiol levels during menopause." },
        { heading: "About KABP052", text: "KABP052 is a multi-strain probiotic formulation developed for neuro-endocrine support in perimenopausal and menopausal women. The strains were selected for their ability to modulate the gut-brain axis and support estrogen recycling." },
        { heading: "What to expect", text: "Consistent intake over 6 months is key. Early effects (weeks 4–8) may include improved gut comfort and mood. Biomarker changes (estradiol, p-tau217, FSH) are tracked at each blood draw to monitor your personal response." },
      ]
    },
    {
      title: "Menopause Symptoms Guide",
      icon: "📋",
      content: [
        { heading: "Vasomotor symptoms", text: "Hot flashes and night sweats are the most common symptoms, affecting up to 80% of women. They are caused by estrogen's effect on the hypothalamus, which regulates body temperature. They typically last 1–5 minutes and can occur multiple times per day." },
        { heading: "Genitourinary syndrome", text: "Reduced estrogen causes thinning and drying of vaginal tissues (atrophic vaginitis), leading to discomfort, pain during sex, and increased UTI risk. This is highly treatable — speak to your clinician about local estrogen therapy or lubricants." },
        { heading: "Cognitive and mood changes", text: "Brain fog, forgetfulness, anxiety, and depression are common. These are linked to estrogen's role in neurotransmitter regulation. Lifestyle factors — sleep, exercise, and diet — significantly influence cognitive symptoms during menopause." },
      ]
    },
  ]

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Menopause Education Hub</h2>
        <p className="text-muted-foreground mt-1">Evidence-based resources tailored to your trial journey</p>
      </div>

      <div className="flex gap-2 flex-wrap">
        {topics.map((t, i) => (
          <button key={i} onClick={() => setActiveTab(i)}
            className={cn("px-4 py-2 rounded-xl text-sm font-medium transition-all",
              activeTab === i ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80")}>
            {t.icon} {t.title}
          </button>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-2xl">{topics[activeTab].icon}</span>
            {topics[activeTab].title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {topics[activeTab].content.map((section, i) => (
            <div key={i} className="p-4 rounded-xl bg-muted/30 border border-border/50">
              <h4 className="font-semibold mb-2 text-primary">{section.heading}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{section.text}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

// ── CHAT ──────────────────────────────────────────────────────────
function ChatSection() {
  const [messages, setMessages] = useState([
    { from: "clinician", text: "Good morning! I reviewed your latest biomarker results — your p-tau217 is down 18% from baseline. Excellent progress! 🎉", time: "09:15" },
    { from: "patient", text: "That's great news! I've been very consistent with the probiotic. I did have one rough night with hot flashes though.", time: "09:22" },
    { from: "clinician", text: "Thank you for flagging that. Hot flashes at this stage are expected — your estradiol is still rising. How often are they happening?", time: "09:25" },
    { from: "patient", text: "About 2-3 times per night. It's affecting my sleep score quite a bit.", time: "09:28" },
    { from: "clinician", text: "Understood. I'm going to add a note to your file and we'll discuss this at your next telemedicine appointment on May 15th. In the meantime, keep logging your sleep in the app.", time: "09:30" },
    { from: "ai", text: "💡 AI Insight: Based on your sleep logs, your average sleep duration has decreased by 42 minutes over the past 2 weeks. Consider reviewing the Sleep Optimization Pack in the Education section.", time: "09:31" },
  ])
  const [newMessage, setNewMessage] = useState("")

  const sendMessage = () => {
    if (!newMessage.trim()) return
    setMessages(prev => [...prev, { from: "patient", text: newMessage, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }])
    setNewMessage("")
    setTimeout(() => {
      setMessages(prev => [...prev, { from: "ai", text: "💡 Your message has been sent to your clinician. Expected response within 24 hours. Is there anything else I can help you with?", time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }])
    }, 1000)
  }

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <div>
        <h2 className="text-2xl font-bold">Clinician Chat</h2>
        <p className="text-muted-foreground mt-1">Secure messaging with your care team + AI assistant</p>
      </div>
      <Card className="flex flex-col h-[600px]">
        <CardHeader className="border-b pb-4">
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
        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={cn("flex gap-3", msg.from === "patient" ? "flex-row-reverse" : "flex-row")}>
              <div className={cn("w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                msg.from === "clinician" ? "bg-primary/20" : msg.from === "ai" ? "bg-amber-500/20" : "bg-secondary/20")}>
                {msg.from === "clinician" ? <User className="w-4 h-4 text-primary" /> :
                  msg.from === "ai" ? <Bot className="w-4 h-4 text-amber-500" /> :
                  <User className="w-4 h-4 text-secondary" />}
              </div>
              <div className={cn("max-w-xs lg:max-w-md", msg.from === "patient" ? "items-end" : "items-start")}>
                <div className={cn("px-4 py-3 rounded-2xl text-sm",
                  msg.from === "patient" ? "bg-primary text-primary-foreground rounded-tr-sm" :
                  msg.from === "ai" ? "bg-amber-500/10 border border-amber-500/20 text-foreground rounded-tl-sm" :
                  "bg-muted rounded-tl-sm")}>
                  {msg.text}
                </div>
                <p className="text-[10px] text-muted-foreground mt-1 px-1">{msg.time}</p>
              </div>
            </div>
          ))}
        </CardContent>
        <div className="border-t p-4 flex gap-3">
          <input
            className="flex-1 border border-border rounded-xl px-4 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Type a message..."
            value={newMessage}
            onChange={e => setNewMessage(e.target.value)}
            onKeyDown={e => e.key === "Enter" && sendMessage()}
          />
          <Button onClick={sendMessage} className="bg-primary">
            <Send className="w-4 h-4" />
          </Button>
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
  ]

  const faqAnswers: Record<string, string> = {
    "What are hot flashes?": "Hot flashes are sudden feelings of warmth, usually in the face, neck, and chest. They're caused by hormonal fluctuations affecting your body's temperature regulation in the hypothalamus. They typically last 1–5 minutes. Staying cool, avoiding triggers (spicy food, alcohol, stress), and maintaining gut health through your probiotic protocol may help reduce frequency.",
    "How do probiotics help my hormones?": "Your probiotic KABP052 targets the estrobolome — the gut bacteria responsible for metabolizing estrogens. By improving microbial balance, it helps your body better recycle and maintain active estradiol levels, which can reduce menopausal symptoms and support brain health.",
    "What is the estrobolome?": "The estrobolome is a subset of your gut microbiome that produces enzymes to metabolize estrogens. A healthy estrobolome helps maintain balanced estrogen levels. Disruption through antibiotics or poor diet can impair this system, contributing to hormonal imbalance.",
    "Why is sleep important in menopause?": "Sleep is crucial for brain detoxification (glymphatic system), hormonal regulation, and mood stability. During menopause, disrupted sleep amplifies cognitive symptoms and can raise cortisol levels, which further depletes estrogen. Your sleep logs help your clinician monitor this closely.",
  }

  const sendMessage = async (text: string) => {
    const userMsg = text || input
    if (!userMsg.trim()) return
    setMessages(prev => [...prev, { from: "user", text: userMsg }])
    setInput("")
    setLoading(true)
    await new Promise(r => setTimeout(r, 800))
    const answer = faqAnswers[userMsg] || "That's a great question! For personalized advice, please message your clinician directly. I can help with general information about menopause, your trial protocol, and gut health."
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
      <Card className="flex flex-col h-[500px]">
        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 pt-4">
          {messages.map((msg, i) => (
            <div key={i} className={cn("flex gap-3", msg.from === "user" ? "flex-row-reverse" : "flex-row")}>
              <div className={cn("w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                msg.from === "ai" ? "bg-amber-500/20" : "bg-secondary/20")}>
                {msg.from === "ai" ? <Bot className="w-4 h-4 text-amber-500" /> : <User className="w-4 h-4 text-secondary" />}
              </div>
              <div className={cn("max-w-xs lg:max-w-md px-4 py-3 rounded-2xl text-sm",
                msg.from === "user" ? "bg-primary text-primary-foreground rounded-tr-sm" :
                "bg-amber-500/10 border border-amber-500/20 rounded-tl-sm")}>
                {msg.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center">
                <Bot className="w-4 h-4 text-amber-500" />
              </div>
              <div className="px-4 py-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-sm">
                <span className="animate-pulse">Thinking...</span>
              </div>
            </div>
          )}
        </CardContent>
        <div className="border-t p-4 flex gap-3">
          <input
            className="flex-1 border border-border rounded-xl px-4 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Ask a question..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && sendMessage("")}
          />
          <Button onClick={() => sendMessage("")} className="bg-primary">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </Card>
    </div>
  )
}

// ── MAIN PATIENT APP ──────────────────────────────────────────────
export function PatientApp() {
  const [activeSection, setActiveSection] = useState<"dashboard" | "education" | "milestones" | "logs" | "calendar" | "chat" | "ai">("dashboard")

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: Activity },
    { id: "education", label: "Education", icon: BookOpen },
    { id: "milestones", label: "My Milestones", icon: Trophy },
    { id: "logs", label: "Daily Logs", icon: Clock },
    { id: "calendar", label: "My Calendar", icon: Calendar },
    { id: "chat", label: "Chat with Clinician", icon: MessageCircle },
    { id: "ai", label: "AI Assistant", icon: Bot },
  ]

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <div className="w-64 border-r border-border bg-card flex flex-col fixed h-screen top-0 left-0 z-20">
        <div className="p-6 border-b">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="font-bold text-xl tracking-tight">NEBix</div>
              <div className="text-xs text-muted-foreground">Patient Portal</div>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <button key={item.id} onClick={() => setActiveSection(item.id as any)}
              className={cn("w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                activeSection === item.id ? "bg-primary text-primary-foreground" : "hover:bg-muted")}>
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t">
          <Badge variant="outline" className="w-full justify-center py-2">HIPAA Compliant</Badge>
        </div>
      </div>

      {/* Main Content — offset by sidebar width */}
      <div className="flex-1 flex flex-col min-h-screen" style={{ marginLeft: "256px" }}>
        <header className="h-16 border-b bg-card px-8 flex items-center justify-between sticky top-0 z-10">
          <div className="text-xl font-semibold">
            {navItems.find(n => n.id === activeSection)?.label ?? "Patient Dashboard"}
          </div>
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

        <main className="flex-1 p-8 overflow-auto">
          {activeSection === "dashboard" && (
            <div className="space-y-8 max-w-6xl mx-auto">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Good Morning, EM-002</h1>
                <p className="text-muted-foreground">Here's your progress in the KABP052 trial</p>
              </div>
              <ProtocolTracker />
              <BrainProtectionGauge />
            </div>
          )}
          {activeSection === "education" && <Education />}
          {activeSection === "milestones" && (
            <div className="max-w-3xl mx-auto"><BrainConstellation /></div>
          )}
          {activeSection === "logs" && (
            <div className="max-w-6xl mx-auto"><InteractiveLogs /></div>
          )}
          {activeSection === "calendar" && (
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold mb-6">My Calendar</h2>
              <div className="space-y-4">
                <div className="p-6 border rounded-2xl flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Blood Draw + Biomarkers</p>
                    <p className="text-sm text-muted-foreground">April 24, 2026 • 10:00 AM</p>
                  </div>
                  <Badge variant="outline" className="ml-auto">In 12 days</Badge>
                </div>
                <div className="p-6 border rounded-2xl flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <p className="font-medium">Telemedicine Follow-up</p>
                    <p className="text-sm text-muted-foreground">May 15, 2026 • 11:30 AM</p>
                  </div>
                  <Badge variant="outline" className="ml-auto">In 33 days</Badge>
                </div>
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
