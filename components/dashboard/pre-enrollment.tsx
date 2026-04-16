"use client"

import { useState } from "react"
import {
  ClipboardList, QrCode, CheckCircle2, XCircle, Clock,
  User, Calendar, Brain, Heart, Pill, AlertTriangle,
  ChevronRight, ChevronLeft, Copy, ExternalLink,
  Filter, Search, Eye, Download, Badge as BadgeIcon
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

// ── TYPES ─────────────────────────────────────────────────────────
type ScreeningStatus = "eligible" | "not_eligible" | "pending" | "incomplete"

interface ScreeningSubmission {
  id: string
  submittedAt: string
  status: ScreeningStatus
  firstName: string
  lastName: string
  age: number
  email: string
  menopausePhase: string
  lastPeriod: string
  hrtUse: string
  antibioticsLast3m: string
  memoryComplaints: string
  mmseEstimate: string
  diagnosedConditions: string[]
  medications: string
  willingToParticipate: string
  eligibilityFlags: string[]
}

const MOCK_SUBMISSIONS: ScreeningSubmission[] = [
  {
    id: "SCR-001",
    submittedAt: "2026-04-15 09:22",
    status: "eligible",
    firstName: "Maria",
    lastName: "Rossi",
    age: 58,
    email: "m.rossi@email.com",
    menopausePhase: "Post-menopausal (>12 months since last period)",
    lastPeriod: "More than 2 years ago",
    hrtUse: "No",
    antibioticsLast3m: "No",
    memoryComplaints: "Mild — occasional forgetfulness",
    mmseEstimate: "I feel my memory is mostly fine",
    diagnosedConditions: [],
    medications: "None",
    willingToParticipate: "Yes",
    eligibilityFlags: [],
  },
  {
    id: "SCR-002",
    submittedAt: "2026-04-14 14:45",
    status: "not_eligible",
    firstName: "Giulia",
    lastName: "Ferrari",
    age: 72,
    email: "g.ferrari@email.com",
    menopausePhase: "Post-menopausal (>12 months since last period)",
    lastPeriod: "More than 10 years ago",
    hrtUse: "Yes — currently taking HRT",
    antibioticsLast3m: "Yes",
    memoryComplaints: "Significant — affects daily life",
    mmseEstimate: "I often forget important things",
    diagnosedConditions: ["Diagnosed dementia or Alzheimer's"],
    medications: "Donepezil",
    willingToParticipate: "Yes",
    eligibilityFlags: [
      "Age > 70 — outside trial range",
      "Currently on HRT — exclusion criterion",
      "Antibiotics in last 3 months — may affect microbiome",
      "Diagnosed dementia — exclusion criterion",
    ],
  },
  {
    id: "SCR-003",
    submittedAt: "2026-04-14 11:10",
    status: "pending",
    firstName: "Anna",
    lastName: "Bianchi",
    age: 54,
    email: "a.bianchi@email.com",
    menopausePhase: "Peri-menopausal (irregular periods)",
    lastPeriod: "3–6 months ago",
    hrtUse: "No",
    antibioticsLast3m: "No",
    memoryComplaints: "Mild — occasional forgetfulness",
    mmseEstimate: "I feel my memory is mostly fine",
    diagnosedConditions: [],
    medications: "Vitamin D",
    willingToParticipate: "Yes",
    eligibilityFlags: [
      "Peri-menopausal — confirm transition phase at clinical visit",
    ],
  },
  {
    id: "SCR-004",
    submittedAt: "2026-04-13 16:30",
    status: "eligible",
    firstName: "Laura",
    lastName: "Conti",
    age: 62,
    email: "l.conti@email.com",
    menopausePhase: "Post-menopausal (>12 months since last period)",
    lastPeriod: "More than 3 years ago",
    hrtUse: "No",
    antibioticsLast3m: "No",
    memoryComplaints: "None",
    mmseEstimate: "No memory concerns",
    diagnosedConditions: [],
    medications: "None",
    willingToParticipate: "Yes",
    eligibilityFlags: [],
  },
  {
    id: "SCR-005",
    submittedAt: "2026-04-13 09:05",
    status: "incomplete",
    firstName: "Sofia",
    lastName: "Romano",
    age: 56,
    email: "s.romano@email.com",
    menopausePhase: "Post-menopausal (>12 months since last period)",
    lastPeriod: "1–2 years ago",
    hrtUse: "No",
    antibioticsLast3m: "",
    memoryComplaints: "",
    mmseEstimate: "",
    diagnosedConditions: [],
    medications: "",
    willingToParticipate: "",
    eligibilityFlags: ["Form incomplete — awaiting full submission"],
  },
]

const STATUS_CONFIG: Record<ScreeningStatus, {
  label: string
  icon: React.ComponentType<{ className?: string }>
  color: string
  bg: string
  variant: "default" | "secondary" | "destructive" | "outline"
}> = {
  eligible:     { label: "Eligible",     icon: CheckCircle2,  color: "text-emerald-600", bg: "bg-emerald-500/10", variant: "default" },
  not_eligible: { label: "Not Eligible", icon: XCircle,       color: "text-rose-600",    bg: "bg-rose-500/10",    variant: "destructive" },
  pending:      { label: "Pending Review",icon: Clock,        color: "text-amber-600",   bg: "bg-amber-500/10",   variant: "secondary" },
  incomplete:   { label: "Incomplete",   icon: AlertTriangle, color: "text-slate-500",   bg: "bg-slate-500/10",   variant: "outline" },
}

// ── QR CODE PANEL ─────────────────────────────────────────────────
function QRPanel() {
  const [copied, setCopied] = useState(false)
  const screeningUrl = "https://nebix.app/pre-screening"

  const handleCopy = () => {
    navigator.clipboard.writeText(screeningUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* QR Code */}
      <div className="rounded-xl border border-border bg-card p-6 flex flex-col items-center gap-4">
        <div className="flex items-center gap-2 self-start">
          <QrCode className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-sm">Pre-Screening QR Code</h3>
        </div>
        {/* SVG QR Code placeholder — replace with real QR library in production */}
        <div className="w-48 h-48 bg-white rounded-xl border border-border flex items-center justify-center p-3">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            {/* Simplified QR pattern for visual */}
            <rect width="200" height="200" fill="white"/>
            {/* Corner squares */}
            <rect x="10" y="10" width="60" height="60" fill="none" stroke="black" strokeWidth="8"/>
            <rect x="25" y="25" width="30" height="30" fill="black"/>
            <rect x="130" y="10" width="60" height="60" fill="none" stroke="black" strokeWidth="8"/>
            <rect x="145" y="25" width="30" height="30" fill="black"/>
            <rect x="10" y="130" width="60" height="60" fill="none" stroke="black" strokeWidth="8"/>
            <rect x="25" y="145" width="30" height="30" fill="black"/>
            {/* Data dots */}
            {[80,90,100,110,120].map(x =>
              [80,90,100,110,120,130,140,150,160].map(y =>
                Math.random() > 0.5 ? <rect key={`${x}-${y}`} x={x} y={y} width="8" height="8" fill="black"/> : null
              )
            )}
            {[80,90,100,110,120,130,140,150,160].map(x =>
              [10,20,30,40,50,60].map(y =>
                Math.random() > 0.5 ? <rect key={`${x}-${y}`} x={x} y={y} width="8" height="8" fill="black"/> : null
              )
            )}
            {[10,20,30,40,50,60].map(x =>
              [80,90,100,110,120,130,140,150,160].map(y =>
                Math.random() > 0.5 ? <rect key={`${x}-${y}`} x={x} y={y} width="8" height="8" fill="black"/> : null
              )
            )}
          </svg>
        </div>
        <p className="text-xs text-muted-foreground text-center">
          Print and display this QR code in the waiting room or share it digitally with potential candidates
        </p>
        <div className="flex gap-2 w-full">
          <Button variant="outline" size="sm" className="flex-1 gap-1.5 text-xs">
            <Download className="w-3.5 h-3.5" />
            Download PDF
          </Button>
          <Button size="sm" className="flex-1 gap-1.5 text-xs">
            <QrCode className="w-3.5 h-3.5" />
            Print QR
          </Button>
        </div>
      </div>

      {/* Link + instructions */}
      <div className="space-y-4">
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
            <ExternalLink className="w-4 h-4 text-primary" />
            Direct Link
          </h3>
          <div className="flex gap-2">
            <div className="flex-1 px-3 py-2 rounded-lg border border-border bg-muted/30 text-xs font-mono text-muted-foreground truncate">
              {screeningUrl}
            </div>
            <Button variant="outline" size="sm" onClick={handleCopy} className="gap-1.5 text-xs shrink-0">
              <Copy className="w-3.5 h-3.5" />
              {copied ? "Copied!" : "Copy"}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Share this link via email, SMS, or patient information leaflets
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="font-semibold text-sm mb-3">How it works</h3>
          <div className="space-y-3">
            {[
              { step: "1", text: "Candidate scans QR or opens the link", icon: QrCode },
              { step: "2", text: "Completes the 5-minute pre-screening form on their phone", icon: ClipboardList },
              { step: "3", text: "Receives instant feedback on potential eligibility", icon: CheckCircle2 },
              { step: "4", text: "Eligible candidates are invited to the clinical centre for formal screening", icon: Calendar },
              { step: "5", text: "Clinician reviews all submissions here in this dashboard", icon: Eye },
            ].map((s, i) => {
              const Icon = s.icon
              return (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 text-primary text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {s.step}
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                    <p className="text-xs text-muted-foreground">{s.text}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 flex gap-3">
          <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground leading-relaxed">
            The pre-screening form is a <strong className="text-foreground">preliminary self-assessment only</strong> and does not replace formal clinical eligibility evaluation. All candidates flagged as eligible must undergo in-person screening at the clinical centre before enrolment.
          </p>
        </div>
      </div>
    </div>
  )
}

// ── SUBMISSION DETAIL ─────────────────────────────────────────────
function SubmissionDetail({ submission, onBack }: {
  submission: ScreeningSubmission
  onBack: () => void
}) {
  const statusCfg = STATUS_CONFIG[submission.status]
  const StatusIcon = statusCfg.icon

  const fields = [
    { section: "Personal Information", items: [
      { label: "Full Name",    value: `${submission.firstName} ${submission.lastName}` },
      { label: "Age",          value: `${submission.age} years` },
      { label: "Email",        value: submission.email },
      { label: "Submitted",    value: submission.submittedAt },
    ]},
    { section: "Menopause Status", items: [
      { label: "Phase",         value: submission.menopausePhase },
      { label: "Last Period",   value: submission.lastPeriod },
    ]},
    { section: "Medical History", items: [
      { label: "Currently on HRT",          value: submission.hrtUse },
      { label: "Antibiotics last 3 months", value: submission.antibioticsLast3m },
      { label: "Current medications",       value: submission.medications || "None reported" },
      { label: "Diagnosed conditions",      value: submission.diagnosedConditions.length > 0 ? submission.diagnosedConditions.join(", ") : "None reported" },
    ]},
    { section: "Cognitive Self-Assessment", items: [
      { label: "Memory complaints",      value: submission.memoryComplaints || "Not answered" },
      { label: "Self-reported cognition", value: submission.mmseEstimate || "Not answered" },
    ]},
    { section: "Trial Interest", items: [
      { label: "Willing to participate", value: submission.willingToParticipate || "Not answered" },
    ]},
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="outline" size="sm" onClick={onBack} className="gap-1.5">
          <ChevronLeft className="w-4 h-4" /> Back
        </Button>
        <h2 className="font-bold text-lg">{submission.firstName} {submission.lastName}</h2>
        <span className="text-sm text-muted-foreground">{submission.id}</span>
        <div className={cn("flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ml-auto", statusCfg.bg, statusCfg.color)}>
          <StatusIcon className="w-3.5 h-3.5" />
          {statusCfg.label}
        </div>
      </div>

      {/* Eligibility flags */}
      {submission.eligibilityFlags.length > 0 && (
        <div className={cn("rounded-xl border p-4 space-y-2",
          submission.status === "not_eligible" ? "border-rose-500/30 bg-rose-500/5" :
          submission.status === "pending" ? "border-amber-500/30 bg-amber-500/5" :
          "border-border bg-muted/20"
        )}>
          <p className="text-xs font-semibold flex items-center gap-2">
            <AlertTriangle className={cn("w-4 h-4",
              submission.status === "not_eligible" ? "text-rose-500" : "text-amber-500"
            )} />
            {submission.status === "not_eligible" ? "Exclusion Criteria Detected" : "Points Requiring Clinical Review"}
          </p>
          {submission.eligibilityFlags.map((flag, i) => (
            <p key={i} className="text-xs text-muted-foreground flex items-start gap-2">
              <span className="mt-0.5">•</span>{flag}
            </p>
          ))}
        </div>
      )}

      {/* Fields */}
      <div className="space-y-4">
        {fields.map((section, si) => (
          <div key={si} className="rounded-xl border border-border bg-card overflow-hidden">
            <div className="px-5 py-3 bg-muted/30 border-b border-border">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{section.section}</p>
            </div>
            <div className="divide-y divide-border/50">
              {section.items.map((item, ii) => (
                <div key={ii} className="px-5 py-3 flex items-start justify-between gap-4">
                  <p className="text-xs text-muted-foreground shrink-0 w-48">{item.label}</p>
                  <p className={cn("text-xs font-medium text-right",
                    item.value === "Yes — currently taking HRT" || item.value === "Yes" && item.label.includes("Antibiotics") ? "text-rose-500" :
                    item.value === "No" ? "text-emerald-600" : "text-foreground"
                  )}>
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        {submission.status === "eligible" && (
          <Button className="gap-2">
            <CheckCircle2 className="w-4 h-4" />
            Invite to Clinical Screening
          </Button>
        )}
        {submission.status === "pending" && (
          <>
            <Button className="gap-2">
              <CheckCircle2 className="w-4 h-4" />
              Mark as Eligible
            </Button>
            <Button variant="outline" className="gap-2 text-rose-500 hover:text-rose-600">
              <XCircle className="w-4 h-4" />
              Mark as Not Eligible
            </Button>
          </>
        )}
        <Button variant="outline" className="gap-2 ml-auto">
          <Download className="w-4 h-4" />
          Export Record
        </Button>
      </div>
    </div>
  )
}

// ── SUBMISSIONS LIST ───────────────────────────────────────────────
function SubmissionsList() {
  const [search, setSearch] = useState("")
  const [filterStatus, setFilterStatus] = useState<ScreeningStatus | "all">("all")
  const [selected, setSelected] = useState<ScreeningSubmission | null>(null)

  if (selected) return <SubmissionDetail submission={selected} onBack={() => setSelected(null)} />

  const filtered = MOCK_SUBMISSIONS.filter(s => {
    const matchSearch = `${s.firstName} ${s.lastName}`.toLowerCase().includes(search.toLowerCase()) ||
                        s.id.toLowerCase().includes(search.toLowerCase()) ||
                        s.email.toLowerCase().includes(search.toLowerCase())
    const matchStatus = filterStatus === "all" || s.status === filterStatus
    return matchSearch && matchStatus
  })

  return (
    <div className="space-y-4">
      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total submissions",  value: MOCK_SUBMISSIONS.length,                                          icon: ClipboardList,  color: "text-primary",    bg: "bg-primary/5" },
          { label: "Eligible",           value: MOCK_SUBMISSIONS.filter(s => s.status === "eligible").length,    icon: CheckCircle2,   color: "text-emerald-500", bg: "bg-emerald-500/5" },
          { label: "Not eligible",       value: MOCK_SUBMISSIONS.filter(s => s.status === "not_eligible").length,icon: XCircle,        color: "text-rose-500",    bg: "bg-rose-500/5" },
          { label: "Pending review",     value: MOCK_SUBMISSIONS.filter(s => s.status === "pending").length,     icon: Clock,          color: "text-amber-500",   bg: "bg-amber-500/5" },
        ].map((s, i) => {
          const Icon = s.icon
          return (
            <div key={i} className={`rounded-xl border border-border p-5 flex items-center gap-4 ${s.bg}`}>
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${s.color} bg-background/60`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Filters */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, ID or email..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <select
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value as ScreeningStatus | "all")}
          className="h-10 rounded-md border border-input bg-background px-3 text-sm"
        >
          <option value="all">All Statuses</option>
          <option value="eligible">Eligible</option>
          <option value="not_eligible">Not Eligible</option>
          <option value="pending">Pending Review</option>
          <option value="incomplete">Incomplete</option>
        </select>
        <Button variant="outline" size="sm" className="gap-2 h-10">
          <Download className="w-4 h-4" />
          Export All
        </Button>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground">ID</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Candidate</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Age</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Menopause Phase</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Submitted</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Status</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Flags</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-5 py-10 text-center text-muted-foreground text-sm">
                  No submissions match the current filters.
                </td>
              </tr>
            ) : filtered.map((s, i) => {
              const statusCfg = STATUS_CONFIG[s.status]
              const StatusIcon = statusCfg.icon
              return (
                <tr key={s.id} className={cn(
                  "border-b border-border/50 hover:bg-muted/20 transition-colors cursor-pointer",
                  i % 2 === 0 ? "" : "bg-muted/10"
                )} onClick={() => setSelected(s)}>
                  <td className="px-5 py-3.5">
                    <span className="text-xs font-mono bg-muted px-2 py-0.5 rounded">{s.id}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <div>
                      <p className="text-xs font-semibold">{s.firstName} {s.lastName}</p>
                      <p className="text-[10px] text-muted-foreground">{s.email}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="text-xs">{s.age} yrs</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="text-xs text-muted-foreground">{s.menopausePhase.split("(")[0].trim()}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="text-xs text-muted-foreground">{s.submittedAt}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className={cn("flex items-center gap-1.5 w-fit px-2.5 py-1 rounded-full text-[10px] font-semibold", statusCfg.bg, statusCfg.color)}>
                      <StatusIcon className="w-3 h-3" />
                      {statusCfg.label}
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    {s.eligibilityFlags.length > 0 ? (
                      <span className="text-[10px] text-rose-500 font-medium">{s.eligibilityFlags.length} flag{s.eligibilityFlags.length > 1 ? "s" : ""}</span>
                    ) : (
                      <span className="text-[10px] text-emerald-600 font-medium">Clear</span>
                    )}
                  </td>
                  <td className="px-4 py-3.5">
                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                      <Eye className="w-3.5 h-3.5" />
                    </Button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ── MAIN COMPONENT ────────────────────────────────────────────────
export function PreEnrollment() {
  const [activeTab, setActiveTab] = useState<"submissions" | "qr">("submissions")

  const tabs = [
    { id: "submissions" as const, label: "Submissions", icon: ClipboardList,
      badge: MOCK_SUBMISSIONS.filter(s => s.status === "pending").length },
    { id: "qr" as const, label: "QR Code & Link", icon: QrCode },
  ]

  return (
    <div className="space-y-6">

      {/* Tabs */}
      <div className="flex gap-1 border-b border-border">
        {tabs.map(tab => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors",
                isActive ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
              )}>
              <Icon className="w-4 h-4" />
              {tab.label}
              {tab.badge ? (
                <span className={cn("w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center",
                  isActive ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                )}>
                  {tab.badge}
                </span>
              ) : null}
            </button>
          )
        })}
      </div>

      {activeTab === "submissions" && <SubmissionsList />}
      {activeTab === "qr"          && <QRPanel />}
    </div>
  )
}
