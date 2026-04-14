"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Brain, Calendar, Check, Clock, Heart, Moon, Utensils, Activity,
  Pill, Shield, Sparkles, BookOpen, MessageCircle, Trophy, Bell,
  Send, Bot, User, X, AlertTriangle, Lock, Package, Info,
  ThumbsUp, Leaf, FlaskConical
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
  { id: 1, title: "Pelvic Floor Workshop", desc: "Access our exclusive 60-min workshop on pelvic floor health and exercises for menopause. Includes guided exercises and expert Q&A.", icon: "🏆" },
  { id: 2, title: "Sexual Wellness Guide", desc: "Download the expert guide on female sexuality and intimacy during menopause. Topics include libido, vaginal health, and communication with partners.", icon: "🌸" },
  { id: 3, title: "Mindful Menopause Kit", desc: "Access mindfulness and breathing exercises tailored for hormonal transitions, hot flash management, and sleep improvement.", icon: "🧘" },
  { id: 4, title: "Gut-Brain Masterclass", desc: "Watch the recorded masterclass on the gut-brain axis and the estrobolome with leading researchers.", icon: "🔬" },
  { id: 5, title: "Sleep Optimization Pack", desc: "Get the full sleep protocol designed for menopausal women, including sleep hygiene tips and relaxation techniques.", icon: "🌙" },
  { id: 6, title: "Trial Completion Certificate", desc: "Congratulations on completing the full 6-month NEBix trial! Download your personalized certificate of participation.", icon: "🎓" },
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
  const [activeTab, setActiveTab] = useState(0)

  const topics = [
    {
      title: "Hormonal Changes",
      icon: "🌡️",
      content: [
        { heading: "What happens hormonally?", text: "During menopause, the ovaries gradually reduce production of estrogen and progesterone. This transition — called perimenopause — typically begins in the mid-40s and can last several years. Estradiol (E2), the primary form of estrogen, drops significantly, affecting many body systems including the brain, heart, bones, and skin." },
        { heading: "Vasomotor Symptoms", text: "Hot flashes and night sweats affect up to 80% of menopausal women. They are triggered by estrogen's effect on the hypothalamus, which regulates body temperature. A hot flash typically lasts 1–5 minutes and can occur multiple times daily. Night sweats can severely disrupt sleep quality and subsequent daily functioning." },
        { heading: "Genitourinary Syndrome", text: "Reduced estrogen causes thinning and drying of vaginal tissues (atrophic vaginitis), leading to discomfort, pain during sex (dyspareunia), and increased UTI risk. This affects up to 50% of postmenopausal women and is highly treatable with local estrogen therapy or lubricants — speak to your clinician." },
        { heading: "Mood & Emotional Changes", text: "Anxiety, irritability, low mood, and depression are common in perimenopause. Estrogen regulates serotonin, dopamine, and GABA — key neurotransmitters for mood stability. The hormonal fluctuations of perimenopause create a neurochemical environment similar to premenstrual dysphoric disorder (PMDD), often causing emotional volatility." },
        { heading: "Cognitive Changes & Brain Fog", text: "Many women report memory lapses, difficulty concentrating, and mental fatigue — collectively known as 'brain fog'. Estrogen supports hippocampal function (memory formation), synaptic plasticity, and cerebral blood flow. Declining estradiol levels reduce these protections. Research shows these cognitive effects are typically temporary and improve post-menopause as the brain adapts, but can be significant during transition." },
        { heading: "Sleep Disturbances", text: "Insomnia affects up to 60% of menopausal women. Night sweats, anxiety, and changes in melatonin and progesterone levels all contribute. Chronic poor sleep increases cortisol, which further depletes estrogen, creates a vicious cycle, and elevates the risk of cognitive decline and cardiovascular disease." },
        { heading: "Other Systemic Effects", text: "Bone density decreases accelerate (osteopenia and osteoporosis risk increases significantly after menopause). Cardiovascular risk rises as estrogen's cardioprotective effects diminish. Joint pain, hair thinning, skin changes, and weight redistribution toward the abdomen are also commonly reported." },
      ]
    },
    {
      title: "Estrobolome & Gut",
      icon: "🦠",
      content: [
        { heading: "What is the estrobolome?", text: "The estrobolome is a specific subset of gut bacteria that produce the enzyme beta-glucuronidase, which deconjugates estrogens in the gut — allowing them to be reabsorbed into circulation rather than excreted. A balanced estrobolome therefore helps maintain adequate circulating estrogen levels, which is particularly important during the hormonal decline of menopause." },
        { heading: "Dysbiosis and hormonal imbalance", text: "When the gut microbiome is disrupted (dysbiosis), beta-glucuronidase activity can become too high or too low. High activity leads to excess estrogen reabsorption (linked to estrogen-sensitive cancers). Low activity leads to insufficient estrogen recycling, worsening menopausal symptoms. Causes of dysbiosis include antibiotics, processed food diet, chronic stress, aging, and alcohol." },
        { heading: "The gut-brain axis", text: "The gut and brain communicate via the vagus nerve, immune signalling, and microbial metabolites. Gut bacteria produce up to 95% of the body's serotonin, as well as GABA, short-chain fatty acids, and brain-derived neurotrophic factor (BDNF) precursors. A healthy microbiome therefore directly supports cognitive function, mood regulation, and stress resilience." },
        { heading: "How your trial targets this system", text: "The KABP052 probiotic formulation was specifically designed to restore estrobolome function. By rebalancing key bacterial strains, it aims to optimise estrogen recycling, reduce neuroinflammation, and support the gut-brain axis — addressing menopausal symptoms from the root of the hormonal system rather than suppressing symptoms directly." },
      ]
    },
    {
      title: "Probiotics & Trial",
      icon: "💊",
      content: [
        { heading: "How do probiotics help?", text: "Specific probiotic strains can restore microbial balance in the estrobolome, reducing dysbiosis-related beta-glucuronidase overactivity and improving estrogen metabolism. This may help maintain more stable estradiol levels during menopause, reducing symptom severity and supporting neuroprotection." },
        { heading: "About KABP052", text: "KABP052 is a multi-strain probiotic formulation developed for neuro-endocrine support in perimenopausal and menopausal women. The strains were selected based on preclinical and clinical evidence for their ability to modulate the gut-brain axis, support estrogen recycling, and reduce systemic inflammation markers." },
        { heading: "What to expect during the trial", text: "Consistent daily intake over 6 months is essential. Early effects (weeks 4–8) may include improved gut comfort, reduced bloating, and mood stabilisation. Biomarker changes — estradiol, p-tau217, FSH — are tracked at each blood draw to monitor your personal biological response and guide clinical interpretation." },
        { heading: "Safety and tolerability", text: "Probiotics are generally well tolerated. Some participants may experience mild initial digestive changes (bloating, altered bowel habits) in the first 1–2 weeks as the microbiome adjusts. These typically resolve spontaneously. Report any persistent symptoms via the Daily Logs alert system or contact your clinician directly." },
      ]
    },
    {
      title: "Menopause Symptoms",
      icon: "📋",
      content: [
        { heading: "Vasomotor: Hot Flashes & Night Sweats", text: "The most common and disruptive symptoms, affecting ~80% of women. Caused by the hypothalamus becoming hypersensitive to small temperature changes due to estrogen withdrawal. Triggers include: warm environments, spicy foods, caffeine, alcohol, stress. Frequency and severity are highly individual — some women experience mild occasional flushes, others 20+ per day." },
        { heading: "Genitourinary Syndrome of Menopause (GSM)", text: "Encompasses vaginal dryness, itching, burning, pain during intercourse, urinary urgency, frequency, and recurrent UTIs. Affects ~50% of postmenopausal women but is significantly underreported. Unlike vasomotor symptoms which often improve over time, GSM is progressive without treatment. Effective treatments exist — local estrogen, ospemifene, vaginal moisturisers." },
        { heading: "Mood: Anxiety, Irritability & Depression", text: "Perimenopausal hormonal fluctuations can trigger new-onset anxiety and depression even in women with no prior psychiatric history. The mood vulnerability window coincides with periods of greatest hormonal variability, not necessarily lowest estrogen. Symptoms include: heightened anxiety, panic attacks, rage, tearfulness, emotional fragility, low motivation." },
        { heading: "Cognitive: Brain Fog & Memory", text: "Includes forgetfulness (especially verbal recall), difficulty concentrating, slower processing speed, word-finding difficulties, and mental fatigue. Most prominent during perimenopause. Research from the SWAN study shows objective cognitive decline during transition that typically recovers post-menopause. Sleep deprivation significantly amplifies cognitive symptoms." },
        { heading: "Sleep: Insomnia & Disruption", text: "Menopausal insomnia is multifactorial: night sweats causing arousal, reduced progesterone (a natural sleep promoter), anxiety-driven hyperarousal, and altered circadian rhythms. Consequences include daytime fatigue, impaired memory consolidation, elevated cortisol, and increased cardiovascular risk. Good sleep hygiene, CBT-I (cognitive behavioural therapy for insomnia), and addressing night sweats are first-line approaches." },
        { heading: "Musculoskeletal: Joints, Bones & Muscle", text: "Estrogen has anti-inflammatory properties and supports collagen production. Its decline leads to joint stiffness and pain (especially in hands, knees, hips), muscle mass reduction (sarcopenia), and accelerated bone density loss. Women lose up to 20% of bone density in the first 5–7 years post-menopause. Weight-bearing exercise and adequate calcium and vitamin D are essential." },
        { heading: "Cardiovascular Changes", text: "Estrogen protects blood vessels by maintaining arterial elasticity, reducing LDL cholesterol, and supporting healthy blood pressure. After menopause, cardiovascular disease risk rises sharply — women in their 60s have similar heart disease rates to men of the same age. Lifestyle modification (diet, exercise, stress management) and regular monitoring are critical." },
        { heading: "Skin, Hair & Body Composition", text: "Collagen decreases ~30% in the first 5 years of menopause, causing skin thinning, dryness, and increased wrinkling. Hair may thin and become more brittle. Weight tends to redistribute from hips to abdomen (visceral fat), increasing metabolic risk. These changes are gradual and manageable with targeted lifestyle strategies." },
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
        <CardContent className="space-y-4">
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

// ── PRODUCT INFO: KANEKA GYNTIMA ──────────────────────────────────
function ProductInfo() {
  const [activeSection, setActiveSection] = useState(0)

  const sections = [
    {
      title: "Product Overview",
      icon: <Package className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <div className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/20">
            <div className="text-4xl">💊</div>
            <div>
              <h3 className="text-xl font-bold">Kaneka Gyntima Menopause</h3>
              <p className="text-sm text-muted-foreground mt-1">Multi-strain probiotic formulation for menopausal women</p>
              <div className="flex gap-2 mt-2 flex-wrap">
                <Badge className="bg-primary/10 text-primary border-primary/20">Probiotic</Badge>
                <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">Clinically Studied</Badge>
                <Badge className="bg-violet-500/10 text-violet-600 border-violet-500/20">Neuro-Endocrine Support</Badge>
              </div>
            </div>
          </div>
          {[
            { label: "Product Name", value: "Kaneka Gyntima Menopause (KABP052)" },
            { label: "Form", value: "Oral capsule" },
            { label: "Daily Dose", value: "1 capsule per day, preferably with a meal" },
            { label: "Duration", value: "6-month trial protocol" },
            { label: "Storage", value: "Store below 25°C, away from direct sunlight and moisture" },
            { label: "Manufacturer", value: "Kaneka Corporation / Gyntima Research Division" },
          ].map((item, i) => (
            <div key={i} className="flex justify-between items-center p-3 rounded-lg border border-border/50 bg-card">
              <span className="text-sm font-medium text-muted-foreground">{item.label}</span>
              <span className="text-sm font-semibold">{item.value}</span>
            </div>
          ))}
        </div>
      )
    },
    {
      title: "Active Strains",
      icon: <FlaskConical className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">KABP052 contains a proprietary blend of probiotic strains selected for their evidence-based activity on the estrobolome and gut-brain axis:</p>
          {[
            { strain: "Lactobacillus acidophilus LA-5", cfu: "2 × 10⁹ CFU", role: "Supports estrogen metabolism via beta-glucuronidase modulation. Reduces intestinal permeability and supports vaginal microbiome health.", color: "from-violet-500/10 to-purple-500/10" },
            { strain: "Lactobacillus rhamnosus GG", cfu: "1 × 10⁹ CFU", role: "Anti-inflammatory properties. Supports gut barrier integrity and has demonstrated effects on anxiety and mood via the vagus nerve pathway.", color: "from-blue-500/10 to-cyan-500/10" },
            { strain: "Bifidobacterium longum BB536", cfu: "1 × 10⁹ CFU", role: "Reduces systemic inflammation (IL-6, TNF-α). Supports cognitive function and has shown positive effects on sleep quality in clinical studies.", color: "from-emerald-500/10 to-teal-500/10" },
            { strain: "Lactobacillus gasseri BNR17", cfu: "5 × 10⁸ CFU", role: "Supports healthy body composition and metabolic function. May reduce visceral fat accumulation associated with menopausal transition.", color: "from-amber-500/10 to-orange-500/10" },
            { strain: "Bifidobacterium breve BR03", cfu: "5 × 10⁸ CFU", role: "Supports GABA production and mood regulation. Demonstrated improvements in anxiety scores in perimenopausal women in a randomised controlled trial.", color: "from-rose-500/10 to-pink-500/10" },
          ].map((s, i) => (
            <div key={i} className={cn("p-4 rounded-xl border border-border/50 bg-gradient-to-br", s.color)}>
              <div className="flex items-center justify-between mb-2">
                <p className="font-semibold text-sm">{s.strain}</p>
                <Badge variant="outline" className="text-xs">{s.cfu}</Badge>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{s.role}</p>
            </div>
          ))}
          <div className="p-3 rounded-lg bg-muted/50 border border-border/50">
            <p className="text-xs text-muted-foreground"><span className="font-semibold">Total CFU per capsule:</span> 5 × 10⁹ (5 billion colony forming units). Viability guaranteed until end of shelf life when stored correctly.</p>
          </div>
        </div>
      )
    },
    {
      title: "Indications & Use",
      icon: <Info className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          {[
            {
              heading: "Intended Use",
              text: "Kaneka Gyntima Menopause is indicated as a dietary supplement to support gut microbiome health, estrogen metabolism, and overall wellbeing in perimenopausal and menopausal women.",
              color: "border-primary/30 bg-primary/5"
            },
            {
              heading: "Target Symptoms",
              text: "The formulation is designed to support management of: vasomotor symptoms (hot flashes, night sweats), mood and anxiety fluctuations, cognitive symptoms (brain fog, memory), sleep disturbances, vaginal microbiome health, and metabolic changes associated with menopause.",
              color: "border-secondary/30 bg-secondary/5"
            },
            {
              heading: "How to Take",
              text: "Take 1 capsule daily, preferably with your largest meal of the day to maximise probiotic survival in the gastric environment. Take at the same time each day to maintain consistent gut colonisation. Do not take within 2 hours of antibiotics.",
              color: "border-emerald-500/30 bg-emerald-500/5"
            },
            {
              heading: "What to Expect",
              text: "Weeks 1–2: Possible mild digestive adjustment (bloating, altered bowel habits) — this is normal and typically resolves. Weeks 4–8: Many women notice improved gut comfort, mood stability, and reduced hot flash frequency. Months 3–6: Biomarker improvements (estradiol, p-tau217) become measurable. Full benefit requires consistent 6-month intake.",
              color: "border-amber-500/30 bg-amber-500/5"
            },
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
      title: "Safety & Interactions",
      icon: <Shield className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/5">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <h4 className="font-semibold text-amber-700">Important Safety Information</h4>
            </div>
            <p className="text-sm text-muted-foreground">This product is a dietary supplement, not a medicine. It does not replace prescribed hormone therapy or other medical treatments. Always consult your clinician before making changes to your treatment plan.</p>
          </div>
          {[
            { heading: "Contraindications", text: "Do not use if you have a known allergy to any of the ingredients. Use with caution in severely immunocompromised patients — consult your physician first. Not recommended during active systemic infection.", color: "border-rose-500/30 bg-rose-500/5" },
            { heading: "Antibiotic Interactions", text: "Antibiotics will significantly reduce the viability of probiotic strains. If you are prescribed antibiotics, continue taking your probiotic but separate intake by at least 2 hours. Report antibiotic use immediately via the Daily Logs alert system, as this is a key biomarker event in your trial.", color: "border-orange-500/30 bg-orange-500/5" },
            { heading: "Side Effects", text: "Very commonly (>10%): mild bloating or gas in the first 1–2 weeks. Commonly (1–10%): altered bowel habits (loose stools or constipation). Rarely (<1%): mild nausea. If symptoms persist beyond 2 weeks or are severe, report via the app or contact your clinician.", color: "border-violet-500/30 bg-violet-500/5" },
            { heading: "Pregnancy & Breastfeeding", text: "Safety during pregnancy and breastfeeding has not been established in clinical trials. Discuss with your clinician if applicable.", color: "border-blue-500/30 bg-blue-500/5" },
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
      title: "Ingredients",
      icon: <Leaf className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <div className="p-4 rounded-xl border border-border/50 bg-muted/30">
            <h4 className="font-semibold mb-3">Full Ingredients List</h4>
            <div className="space-y-2">
              {[
                { name: "Probiotic blend (KABP052)", amount: "200 mg", note: "5 × 10⁹ CFU total" },
                { name: "Microcrystalline cellulose", amount: "85 mg", note: "Bulking agent" },
                { name: "Hydroxypropyl methylcellulose", amount: "—", note: "Capsule shell (vegetarian)" },
                { name: "Magnesium stearate", amount: "5 mg", note: "Anti-caking agent" },
                { name: "Silicon dioxide", amount: "3 mg", note: "Anti-caking agent" },
              ].map((ing, i) => (
                <div key={i} className="flex justify-between items-center py-2 border-b border-border/30 last:border-0">
                  <div>
                    <p className="text-sm font-medium">{ing.name}</p>
                    <p className="text-xs text-muted-foreground">{ing.note}</p>
                  </div>
                  <span className="text-sm text-muted-foreground">{ing.amount}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Gluten Free", value: "✅ Yes" },
              { label: "Lactose Free", value: "✅ Yes" },
              { label: "Vegetarian", value: "✅ Yes" },
              { label: "Vegan", value: "✅ Yes" },
              { label: "GMO Free", value: "✅ Yes" },
              { label: "Allergens", value: "None declared" },
            ].map((item, i) => (
              <div key={i} className="p-3 rounded-lg border border-border/50 bg-card flex justify-between">
                <span className="text-sm text-muted-foreground">{item.label}</span>
                <span className="text-sm font-medium">{item.value}</span>
              </div>
            ))}
          </div>
          <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/5 flex items-start gap-3">
            <ThumbsUp className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-emerald-700 mb-1">Quality Certification</h4>
              <p className="text-sm text-muted-foreground">Manufactured in GMP-certified facilities. Third-party tested for potency, purity, and absence of contaminants. Strain identity verified by 16S rRNA gene sequencing.</p>
            </div>
          </div>
        </div>
      )
    },
  ]

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold">My Product: Kaneka Gyntima Menopause</h2>
        <p className="text-muted-foreground mt-1">Complete product information and patient leaflet</p>
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
          <CardTitle className="flex items-center gap-2">
            {sections[activeSection].icon}
            {sections[activeSection].title}
          </CardTitle>
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
    "What are hot flashes?": "Hot flashes are sudden feelings of warmth, usually in the face, neck, and chest. They're caused by hormonal fluctuations affecting your body's temperature regulation centre (hypothalamus). They typically last 1–5 minutes and can occur multiple times daily. Staying cool, avoiding triggers (spicy food, alcohol, stress), and maintaining gut health through your probiotic may help reduce frequency.",
    "How do probiotics help my hormones?": "Your probiotic KABP052 targets the estrobolome — the gut bacteria responsible for metabolising estrogens. By restoring microbial balance, it helps your body recycle active estradiol more efficiently, which can reduce vasomotor symptoms, support mood stability, and protect brain health.",
    "What is the estrobolome?": "The estrobolome is a subset of your gut microbiome that produces enzymes to metabolise estrogens. A healthy estrobolome helps maintain balanced circulating estrogen levels. Disruption through antibiotics, poor diet, or stress impairs this system and can worsen menopausal symptoms.",
    "Why is sleep important in menopause?": "Sleep is crucial for brain detoxification (via the glymphatic system), hormonal regulation, and mood stability. During menopause, disrupted sleep amplifies cognitive symptoms, raises cortisol (which further depletes estrogen), and elevates cardiovascular risk. Your sleep logs help your clinician identify patterns and intervene early.",
    "What is brain fog?": "Brain fog refers to cognitive symptoms including forgetfulness, difficulty concentrating, slower processing, and word-finding difficulties. In menopause, it is caused by declining estradiol affecting hippocampal function and cerebral blood flow. It typically improves post-menopause, but sleep, stress management, and your probiotic protocol can help during the transition.",
    "Can I take antibiotics during the trial?": "If prescribed antibiotics, you should complete the full course as directed by your doctor — do not skip antibiotics for the sake of the trial. Continue taking your probiotic but separate them by at least 2 hours to maximise survival. Most importantly, report antibiotic use immediately via the Daily Logs alert — it is a critical biomarker event that your clinician needs to account for in your results.",
  }

  const sendMessage = async (text: string) => {
    const userMsg = text || input
    if (!userMsg.trim()) return
    setMessages(prev => [...prev, { from: "user", text: userMsg }])
    setInput("")
    setLoading(true)
    await new Promise(r => setTimeout(r, 800))
    const answer = faqAnswers[userMsg] || "That's a great question! For personalised medical advice, please message your clinician directly via the Chat section. I can help with general information about menopause, your trial protocol, gut health, and the estrobolome."
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

// ── MAIN PATIENT APP ──────────────────────────────────────────────
export function PatientApp() {
  const [activeSection, setActiveSection] = useState<"dashboard" | "education" | "product" | "milestones" | "logs" | "calendar" | "chat" | "ai">("dashboard")

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: Activity },
    { id: "education", label: "Education Hub", icon: BookOpen },
    { id: "product", label: "My Product", icon: Package },
    { id: "milestones", label: "My Milestones", icon: Trophy },
    { id: "logs", label: "Daily Logs", icon: Clock },
    { id: "calendar", label: "My Calendar", icon: Calendar },
    { id: "chat", label: "Chat with Clinician", icon: MessageCircle },
    { id: "ai", label: "AI Assistant", icon: Bot },
  ]

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar — fixed, full height, z above header */}
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

      {/* Main content — offset by sidebar */}
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
                ].map((appt, i) => (
                  <div key={i} className="p-5 border rounded-2xl flex items-center gap-4 bg-card hover:border-primary/30 transition-all">
                    <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", appt.color)}>
                      <appt.icon className={cn("w-6 h-6", appt.iconColor)} />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{appt.title}</p>
                      <p className="text-sm text-muted-foreground">{appt.date} • {appt.time}</p>
                    </div>
                    <Badge variant="outline">In {appt.days} days</Badge>
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
