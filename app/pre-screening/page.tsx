"use client"

import { useState } from "react"
import {
  Brain, ChevronRight, ChevronLeft, CheckCircle2,
  XCircle, AlertTriangle, Heart, Pill, Moon, Info
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type Step = "welcome" | "personal" | "menopause" | "medical" | "cognitive" | "result"

interface FormData {
  firstName: string
  lastName: string
  age: string
  email: string
  menopausePhase: string
  lastPeriod: string
  hrtUse: string
  antibioticsLast3m: string
  diagnosedConditions: string[]
  medications: string
  memoryComplaints: string
  mmseEstimate: string
  willingToParticipate: string
}

const CONDITIONS = [
  "Diagnosed dementia or Alzheimer's",
  "Active cancer or cancer treatment",
  "Severe psychiatric disorder",
  "Autoimmune disease",
  "Inflammatory bowel disease",
  "None of the above",
]

function StepBar({ current }: { current: Step }) {
  const steps: { id: Step; label: string }[] = [
    { id: "personal",   label: "Personal Info" },
    { id: "menopause",  label: "Menopause" },
    { id: "medical",    label: "Medical History" },
    { id: "cognitive",  label: "Cognition" },
    { id: "result",     label: "Result" },
  ]
  const order: Step[] = ["welcome", "personal", "menopause", "medical", "cognitive", "result"]
  const currentIndex = order.indexOf(current)

  return (
    <div className="flex items-center gap-0 mb-8">
      {steps.map((step, i) => {
        const stepIndex = order.indexOf(step.id)
        const done   = stepIndex < currentIndex
        const active = stepIndex === currentIndex
        return (
          <div key={step.id} className="flex items-center flex-1">
            <div className="flex flex-col items-center gap-1">
              <div className={cn(
                "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all",
                done   ? "bg-primary text-primary-foreground" :
                active ? "bg-primary text-primary-foreground ring-4 ring-primary/20" :
                         "bg-muted text-muted-foreground"
              )}>
                {done ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
              </div>
              <span className={cn("text-[9px] text-center max-w-[55px] leading-tight",
                active ? "text-primary font-semibold" : "text-muted-foreground"
              )}>{step.label}</span>
            </div>
            {i < steps.length - 1 && (
              <div className={cn("flex-1 h-0.5 mb-3 mx-1", done ? "bg-primary" : "bg-muted")} />
            )}
          </div>
        )
      })}
    </div>
  )
}

function OptionButton({ selected, onClick, children }: {
  selected: boolean; onClick: () => void; children: React.ReactNode
}) {
  return (
    <button onClick={onClick} className={cn(
      "w-full text-left px-4 py-3 rounded-xl border text-sm transition-all",
      selected ? "bg-primary text-primary-foreground border-primary" :
                 "border-border hover:border-primary/50 hover:bg-primary/5"
    )}>
      {children}
    </button>
  )
}

export default function PreScreeningPage() {
  const [step, setStep] = useState<Step>("welcome")
  const [form, setForm] = useState<FormData>({
    firstName: "", lastName: "", age: "", email: "",
    menopausePhase: "", lastPeriod: "",
    hrtUse: "", antibioticsLast3m: "",
    diagnosedConditions: [], medications: "",
    memoryComplaints: "", mmseEstimate: "",
    willingToParticipate: "",
  })

  const update = (key: keyof FormData, value: any) =>
    setForm(prev => ({ ...prev, [key]: value }))

  const toggleCondition = (condition: string) => {
    if (condition === "None of the above") {
      update("diagnosedConditions", ["None of the above"])
      return
    }
    const current = form.diagnosedConditions.filter(c => c !== "None of the above")
    if (current.includes(condition)) {
      update("diagnosedConditions", current.filter(c => c !== condition))
    } else {
      update("diagnosedConditions", [...current, condition])
    }
  }

  const steps: Step[] = ["welcome", "personal", "menopause", "medical", "cognitive", "result"]
  const currentIndex = steps.indexOf(step)
  const goNext = () => { if (currentIndex < steps.length - 1) setStep(steps[currentIndex + 1]) }
  const goPrev = () => { if (currentIndex > 0) setStep(steps[currentIndex - 1]) }

  // Eligibility check
  const exclusions: string[] = []
  const age = parseInt(form.age)
  if (age && (age < 45 || age > 70)) exclusions.push(`Age ${age} is outside the trial range (45–70 years)`)
  if (form.hrtUse === "Yes — currently taking HRT") exclusions.push("Currently on HRT is an exclusion criterion")
  if (form.antibioticsLast3m === "Yes") exclusions.push("Antibiotic use in the last 3 months may affect microbiome results")
  if (form.diagnosedConditions.some(c => c !== "None of the above" && c !== "")) {
    form.diagnosedConditions.filter(c => c !== "None of the above").forEach(c => exclusions.push(`${c} — requires clinical evaluation`))
  }
  if (form.menopausePhase === "Pre-menopausal (regular periods)") exclusions.push("Must be peri- or post-menopausal to be eligible")

  const isEligible = exclusions.length === 0
  const isPending  = exclusions.length > 0 && exclusions.every(e => e.includes("may affect") || e.includes("requires clinical") || e.includes("peri-"))

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a0a2e] via-[#16213e] to-[#0f0f1a] flex items-center justify-center p-4">
      <div className="w-full max-w-xl">

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-bold text-white text-lg leading-tight">NEBix Trial</p>
            <p className="text-xs text-slate-400">Pre-Screening Assessment</p>
          </div>
        </div>

        <div className="bg-card rounded-2xl border border-border p-6 shadow-2xl">

          {/* WELCOME */}
          {step === "welcome" && (
            <div className="space-y-5 text-center">
              <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto">
                <Brain className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold mb-2">Welcome to the NEBix Trial Pre-Screening</h1>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  This short questionnaire (about 5 minutes) will help us understand whether you may be eligible to participate in our clinical trial on gut health and brain protection in postmenopausal women.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-3 text-left">
                {[
                  { icon: Heart,    text: "For women aged 45–70 in peri or post-menopause" },
                  { icon: Brain,    text: "Studying the link between gut health and cognitive protection" },
                  { icon: Pill,     text: "Involves taking a daily probiotic for 6 months" },
                  { icon: Moon,     text: "All data is confidential and handled securely" },
                ].map((item, i) => {
                  const Icon = item.icon
                  return (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl border border-border bg-muted/20">
                      <Icon className="w-5 h-5 text-primary shrink-0" />
                      <p className="text-sm text-muted-foreground">{item.text}</p>
                    </div>
                  )
                })}
              </div>
              <div className="flex items-start gap-2 p-3 rounded-xl border border-amber-500/30 bg-amber-500/5 text-left">
                <Info className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <p className="text-xs text-muted-foreground">
                  This is a <strong className="text-foreground">preliminary assessment only</strong>. Final eligibility will be confirmed by the clinical team at the research centre.
                </p>
              </div>
              <Button onClick={goNext} className="w-full gap-2">
                Start Pre-Screening <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}

          {/* PERSONAL */}
          {step === "personal" && (
            <div className="space-y-5">
              <StepBar current={step} />
              <div>
                <h2 className="text-lg font-bold mb-1">Personal Information</h2>
                <p className="text-sm text-muted-foreground">Your details will be kept strictly confidential.</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold">First Name *</label>
                  <input value={form.firstName} onChange={e => update("firstName", e.target.value)}
                    className="w-full border border-input rounded-xl px-4 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Maria" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold">Last Name *</label>
                  <input value={form.lastName} onChange={e => update("lastName", e.target.value)}
                    className="w-full border border-input rounded-xl px-4 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Rossi" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold">Age *</label>
                <input type="number" value={form.age} onChange={e => update("age", e.target.value)}
                  className="w-full border border-input rounded-xl px-4 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="58" min="40" max="80" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold">Email Address *</label>
                <input type="email" value={form.email} onChange={e => update("email", e.target.value)}
                  className="w-full border border-input rounded-xl px-4 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="your@email.com" />
                <p className="text-[10px] text-muted-foreground">Used only to send you the result of this pre-screening</p>
              </div>
            </div>
          )}

          {/* MENOPAUSE */}
          {step === "menopause" && (
            <div className="space-y-5">
              <StepBar current={step} />
              <div>
                <h2 className="text-lg font-bold mb-1">Menopause Status</h2>
                <p className="text-sm text-muted-foreground">This helps us understand where you are in your hormonal transition.</p>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold">Which best describes your current status? *</label>
                {[
                  "Pre-menopausal (regular periods)",
                  "Peri-menopausal (irregular periods)",
                  "Post-menopausal (>12 months since last period)",
                  "Surgical menopause (ovaries removed)",
                  "Not sure",
                ].map(opt => (
                  <OptionButton key={opt} selected={form.menopausePhase === opt} onClick={() => update("menopausePhase", opt)}>
                    {opt}
                  </OptionButton>
                ))}
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold">When was your last menstrual period? *</label>
                {[
                  "Less than 3 months ago",
                  "3–6 months ago",
                  "6–12 months ago",
                  "1–2 years ago",
                  "More than 2 years ago",
                  "More than 5 years ago",
                  "I have never had periods (surgical/medical)",
                ].map(opt => (
                  <OptionButton key={opt} selected={form.lastPeriod === opt} onClick={() => update("lastPeriod", opt)}>
                    {opt}
                  </OptionButton>
                ))}
              </div>
            </div>
          )}

          {/* MEDICAL */}
          {step === "medical" && (
            <div className="space-y-5">
              <StepBar current={step} />
              <div>
                <h2 className="text-lg font-bold mb-1">Medical History</h2>
                <p className="text-sm text-muted-foreground">Please answer honestly — this helps us ensure the trial is safe for you.</p>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold">Are you currently taking Hormone Replacement Therapy (HRT)? *</label>
                {["No", "No — but I have taken it in the past", "Yes — currently taking HRT"].map(opt => (
                  <OptionButton key={opt} selected={form.hrtUse === opt} onClick={() => update("hrtUse", opt)}>
                    {opt}
                  </OptionButton>
                ))}
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold">Have you taken antibiotics in the last 3 months? *</label>
                {["No", "Yes", "Not sure"].map(opt => (
                  <OptionButton key={opt} selected={form.antibioticsLast3m === opt} onClick={() => update("antibioticsLast3m", opt)}>
                    {opt}
                  </OptionButton>
                ))}
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold">Do you have any of the following? (select all that apply) *</label>
                {CONDITIONS.map(condition => (
                  <button key={condition}
                    onClick={() => toggleCondition(condition)}
                    className={cn("w-full text-left px-4 py-3 rounded-xl border text-sm transition-all",
                      form.diagnosedConditions.includes(condition)
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-border hover:border-primary/50 hover:bg-primary/5"
                    )}>
                    {condition}
                  </button>
                ))}
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold">Current medications (optional)</label>
                <input value={form.medications} onChange={e => update("medications", e.target.value)}
                  className="w-full border border-input rounded-xl px-4 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="e.g. blood pressure medication, vitamins..." />
              </div>
            </div>
          )}

          {/* COGNITIVE */}
          {step === "cognitive" && (
            <div className="space-y-5">
              <StepBar current={step} />
              <div>
                <h2 className="text-lg font-bold mb-1">Cognitive Self-Assessment</h2>
                <p className="text-sm text-muted-foreground">These questions help us understand your subjective experience of your memory and thinking.</p>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold">How would you describe your memory in the past 6 months? *</label>
                {[
                  "None — my memory feels normal",
                  "Mild — occasional forgetfulness (names, where I put things)",
                  "Moderate — affects daily activities sometimes",
                  "Significant — affects daily life regularly",
                ].map(opt => (
                  <OptionButton key={opt} selected={form.memoryComplaints === opt} onClick={() => update("memoryComplaints", opt)}>
                    {opt}
                  </OptionButton>
                ))}
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold">Overall, how would you rate your thinking and memory compared to 5 years ago? *</label>
                {[
                  "About the same — no change",
                  "Slightly worse — but not worrying",
                  "Noticeably worse — I find daily tasks harder",
                  "Much worse — I am concerned about this",
                ].map(opt => (
                  <OptionButton key={opt} selected={form.mmseEstimate === opt} onClick={() => update("mmseEstimate", opt)}>
                    {opt}
                  </OptionButton>
                ))}
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold">If eligible, would you be willing to visit our centre in Rome for the trial? *</label>
                {[
                  "Yes — I am interested and available",
                  "Yes — but I need more information first",
                  "Not sure",
                  "No — I am not available",
                ].map(opt => (
                  <OptionButton key={opt} selected={form.willingToParticipate === opt} onClick={() => update("willingToParticipate", opt)}>
                    {opt}
                  </OptionButton>
                ))}
              </div>
            </div>
          )}

          {/* RESULT */}
          {step === "result" && (
            <div className="space-y-5">
              <div className="text-center">
                <div className={cn(
                  "w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4",
                  isEligible ? "bg-emerald-500/20" : isPending ? "bg-amber-500/20" : "bg-rose-500/20"
                )}>
                  {isEligible
                    ? <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                    : isPending
                      ? <AlertTriangle className="w-8 h-8 text-amber-500" />
                      : <XCircle className="w-8 h-8 text-rose-500" />
                  }
                </div>
                <h2 className="text-xl font-bold mb-2">
                  {isEligible
                    ? "You may be eligible! 🎉"
                    : isPending
                      ? "Further evaluation needed"
                      : "You may not be eligible at this time"
                  }
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {isEligible
                    ? "Based on your answers, you appear to meet the preliminary criteria for our trial. The clinical team will contact you within 5 working days to arrange a formal screening visit."
                    : isPending
                      ? "Some of your answers require clinical evaluation before we can confirm eligibility. The team will review your submission and contact you."
                      : "Based on your answers, you do not appear to meet the eligibility criteria for this trial. Thank you for your interest — please check back for future studies."
                  }
                </p>
              </div>

              {exclusions.length > 0 && (
                <div className={cn("rounded-xl border p-4 space-y-2",
                  isPending ? "border-amber-500/30 bg-amber-500/5" : "border-rose-500/30 bg-rose-500/5"
                )}>
                  <p className="text-xs font-semibold text-muted-foreground">Points noted from your answers:</p>
                  {exclusions.map((e, i) => (
                    <p key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                      <span className="mt-0.5">•</span>{e}
                    </p>
                  ))}
                </div>
              )}

              {/* Summary */}
              <div className="rounded-xl border border-border bg-muted/20 p-4 space-y-2">
                <p className="text-xs font-semibold">Your answers summary:</p>
                {[
                  { label: "Name",             value: `${form.firstName} ${form.lastName}` },
                  { label: "Age",              value: `${form.age} years` },
                  { label: "Menopause phase",  value: form.menopausePhase },
                  { label: "HRT use",          value: form.hrtUse },
                  { label: "Antibiotics",      value: form.antibioticsLast3m },
                  { label: "Memory concerns",  value: form.memoryComplaints },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between gap-4">
                    <span className="text-[10px] text-muted-foreground">{item.label}</span>
                    <span className="text-[10px] font-medium text-right">{item.value || "—"}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-start gap-2 p-3 rounded-xl border border-border bg-muted/20">
                <Info className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                <p className="text-xs text-muted-foreground">
                  Your data has been sent to the NEBix clinical team at IRCCS Santa Lucia Foundation, Rome. We will contact you at <strong>{form.email}</strong> within 5 working days.
                </p>
              </div>
            </div>
          )}

          {/* Navigation */}
          {step !== "welcome" && step !== "result" && (
            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={goPrev} className="gap-2">
                <ChevronLeft className="w-4 h-4" /> Back
              </Button>
              <Button onClick={goNext} className="gap-2">
                Continue <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}

          {step === "result" && (
            <Button variant="outline" onClick={() => setStep("welcome")} className="w-full mt-6">
              Start a new assessment
            </Button>
          )}
        </div>

        <p className="text-center text-xs text-slate-500 mt-4">
          IRCCS Santa Lucia Foundation · Rome, Italy · Confidential
        </p>
      </div>
    </div>
  )
}
