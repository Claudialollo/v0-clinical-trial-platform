"use client"

import { useState } from "react"
import {
  AlertTriangle, CheckCircle2, XCircle, Search,
  Filter, RefreshCw, TrendingDown, Hash,
  ClipboardList, Eye, ChevronDown, ChevronUp, Info
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type IssueType = "missing" | "anomaly" | "inconsistency"
type IssueSeverity = "critical" | "warning" | "info"

interface DataIssue {
  id: string
  patientId: string
  variable: string
  visit: string
  type: IssueType
  severity: IssueSeverity
  description: string
  value?: string
  expectedRange?: string
  detectedAt: string
  resolved: boolean
}

const ISSUES: DataIssue[] = [
  {
    id: "1",
    patientId: "EM-001",
    variable: "MMSE",
    visit: "Visit 3 — Month 6",
    type: "anomaly",
    severity: "critical",
    description: "MMSE dropped by 11 points compared to previous visit. Possible data entry error or clinically significant decline.",
    value: "14",
    expectedRange: "Expected change: ±3 points between visits",
    detectedAt: "2026-04-15 09:30",
    resolved: false
  },
  {
    id: "2",
    patientId: "EM-002",
    variable: "pTau181",
    visit: "Visit 2 — Month 3",
    type: "missing",
    severity: "critical",
    description: "pTau181 value missing. Blood sample was collected but result not entered in the database.",
    detectedAt: "2026-04-14 14:20",
    resolved: false
  },
  {
    id: "3",
    patientId: "EM-003",
    variable: "Estradiol (E₂)",
    visit: "Visit 3 — Month 6",
    type: "anomaly",
    severity: "critical",
    description: "Estradiol value is 3 standard deviations above the group mean. Possible sample contamination or data entry error.",
    value: "312 pg/mL",
    expectedRange: "Expected range: 5–40 pg/mL (postmenopausal)",
    detectedAt: "2026-04-13 11:15",
    resolved: false
  },
  {
    id: "4",
    patientId: "EM-004",
    variable: "MoCA",
    visit: "Visit 1 — Baseline",
    type: "missing",
    severity: "warning",
    description: "MoCA score missing at baseline. Required for primary endpoint calculation.",
    detectedAt: "2026-04-12 16:45",
    resolved: false
  },
  {
    id: "5",
    patientId: "EM-002",
    variable: "Age vs Date of Birth",
    visit: "Enrollment",
    type: "inconsistency",
    severity: "warning",
    description: "Age entered (58) does not match date of birth on file (1964-03-12 = 62 years). Check enrollment form.",
    value: "Age entered: 58",
    expectedRange: "Expected age from DOB: 62",
    detectedAt: "2026-04-11 10:00",
    resolved: false
  },
  {
    id: "6",
    patientId: "EM-005",
    variable: "CDR-SB",
    visit: "Visit 2 — Month 3",
    type: "anomaly",
    severity: "warning",
    description: "CDR-SB increased by 4 points in 3 months. Verify with clinician whether this reflects true decline or scoring error.",
    value: "5.5",
    expectedRange: "Expected change: ±1 point between visits",
    detectedAt: "2026-04-10 09:00",
    resolved: false
  },
  {
    id: "7",
    patientId: "EM-006",
    variable: "GFAP",
    visit: "Visit 3 — Month 6",
    type: "missing",
    severity: "warning",
    description: "GFAP value missing. Secondary endpoint data incomplete for this visit.",
    detectedAt: "2026-04-09 15:30",
    resolved: false
  },
  {
    id: "8",
    patientId: "EM-001",
    variable: "Body Weight",
    visit: "Visit 2 — Month 3",
    type: "inconsistency",
    severity: "info",
    description: "Weight decreased by 12 kg since baseline. Clinically unusual — verify measurement was taken correctly.",
    value: "48 kg",
    expectedRange: "Baseline: 60 kg",
    detectedAt: "2026-04-08 11:00",
    resolved: false
  },
  {
    id: "9",
    patientId: "EM-003",
    variable: "NfL",
    visit: "Visit 1 — Baseline",
    type: "anomaly",
    severity: "info",
    description: "NfL value slightly above expected range for age group. Monitor at next visit.",
    value: "28.4 pg/mL",
    expectedRange: "Expected range for 60–70y: 5–20 pg/mL",
    detectedAt: "2026-04-07 14:00",
    resolved: true
  },
  {
    id: "10",
    patientId: "EM-004",
    variable: "Probiotic Compliance",
    visit: "Visit 2 — Month 3",
    type: "inconsistency",
    severity: "info",
    description: "Patient reports 95% compliance in diary but pill count at visit shows only 60% intake. Discrepancy to be investigated.",
    value: "Diary: 95% — Pill count: 60%",
    detectedAt: "2026-04-06 10:30",
    resolved: true
  },
]

const TYPE_CONFIG: Record<IssueType, { label: string; icon: React.ComponentType<{ className?: string }>; color: string; bg: string }> = {
  missing:       { label: "Missing Data",    icon: Hash,          color: "text-rose-500",   bg: "bg-rose-500/10" },
  anomaly:       { label: "Anomalous Value", icon: TrendingDown,  color: "text-amber-500",  bg: "bg-amber-500/10" },
  inconsistency: { label: "Inconsistency",   icon: XCircle,       color: "text-purple-500", bg: "bg-purple-500/10" },
}

const SEVERITY_CONFIG: Record<IssueSeverity, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  critical: { label: "Critical", variant: "destructive" },
  warning:  { label: "Warning",  variant: "secondary" },
  info:     { label: "Info",     variant: "outline" },
}

function IssueCard({ issue }: { issue: DataIssue }) {
  const [expanded, setExpanded] = useState(false)
  const typeCfg = TYPE_CONFIG[issue.type]
  const sevCfg = SEVERITY_CONFIG[issue.severity]
  const TypeIcon = typeCfg.icon

  return (
    <div className={`rounded-xl border overflow-hidden transition-all ${
      issue.resolved
        ? "border-border opacity-60"
        : issue.severity === "critical"
          ? "border-rose-500/30"
          : issue.severity === "warning"
            ? "border-amber-500/30"
            : "border-border"
    }`}>
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-start gap-4 px-5 py-4 hover:bg-muted/20 transition-colors text-left"
      >
        {/* Type icon */}
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${typeCfg.bg}`}>
          <TypeIcon className={`w-5 h-5 ${typeCfg.color}`} />
        </div>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="font-semibold text-sm">{issue.patientId}</span>
            <span className="text-xs text-muted-foreground">—</span>
            <span className="font-medium text-sm">{issue.variable}</span>
            <Badge variant={sevCfg.variant} className="text-[10px]">{sevCfg.label}</Badge>
            <Badge variant="outline" className={`text-[10px] ${typeCfg.color}`}>{typeCfg.label}</Badge>
            {issue.resolved && (
              <Badge variant="outline" className="text-[10px] text-emerald-600">Resolved</Badge>
            )}
          </div>
          <p className="text-xs text-muted-foreground">{issue.visit}</p>
          <p className="text-xs text-foreground/80 mt-1 leading-relaxed">{issue.description}</p>
        </div>

        {/* Time + expand */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[10px] text-muted-foreground">{issue.detectedAt}</span>
          {expanded
            ? <ChevronUp className="w-4 h-4 text-muted-foreground" />
            : <ChevronDown className="w-4 h-4 text-muted-foreground" />
          }
        </div>
      </button>

      {/* Expanded detail */}
      {expanded && (
        <div className="px-5 pb-4 pt-0 border-t border-border bg-muted/10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            {issue.value && (
              <div>
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide mb-1">Detected Value</p>
                <p className="text-sm font-mono font-bold text-foreground">{issue.value}</p>
              </div>
            )}
            {issue.expectedRange && (
              <div>
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide mb-1">Expected Range / Reference</p>
                <p className="text-sm text-muted-foreground">{issue.expectedRange}</p>
              </div>
            )}
          </div>
          <div className="flex gap-2 mt-4">
            <Button size="sm" variant="outline" className="gap-1.5 text-xs">
              <Eye className="w-3.5 h-3.5" />
              View Patient Record
            </Button>
            <Button size="sm" variant="outline" className="gap-1.5 text-xs">
              <ClipboardList className="w-3.5 h-3.5" />
              Log Correction
            </Button>
            {!issue.resolved && (
              <Button size="sm" className="gap-1.5 text-xs ml-auto">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Mark as Resolved
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export function DataQualityMonitor() {
  const [search, setSearch] = useState("")
  const [filterType, setFilterType] = useState<IssueType | "all">("all")
  const [filterSeverity, setFilterSeverity] = useState<IssueSeverity | "all">("all")
  const [showResolved, setShowResolved] = useState(false)

  const active   = ISSUES.filter(i => !i.resolved)
  const critical = active.filter(i => i.severity === "critical")
  const warning  = active.filter(i => i.severity === "warning")
  const missing  = active.filter(i => i.type === "missing")

  const filtered = ISSUES.filter(i => {
    const matchSearch   = i.patientId.toLowerCase().includes(search.toLowerCase()) ||
                          i.variable.toLowerCase().includes(search.toLowerCase())
    const matchType     = filterType === "all" || i.type === filterType
    const matchSeverity = filterSeverity === "all" || i.severity === filterSeverity
    const matchResolved = showResolved ? true : !i.resolved
    return matchSearch && matchType && matchSeverity && matchResolved
  })

  // Sort: critical first, then warning, then info
  const sorted = [...filtered].sort((a, b) => {
    const order = { critical: 0, warning: 1, info: 2 }
    return order[a.severity] - order[b.severity]
  })

  return (
    <div className="space-y-6">

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total active issues",  value: active.length,    icon: AlertTriangle, color: "text-rose-500",    bg: "bg-rose-500/5" },
          { label: "Critical",             value: critical.length,  icon: XCircle,       color: "text-rose-500",    bg: "bg-rose-500/5" },
          { label: "Warnings",             value: warning.length,   icon: AlertTriangle, color: "text-amber-500",   bg: "bg-amber-500/5" },
          { label: "Missing data",         value: missing.length,   icon: Hash,          color: "text-purple-500",  bg: "bg-purple-500/5" },
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

      {/* Data completeness per patient */}
      <div className="rounded-xl border border-border bg-card p-5">
        <div className="flex items-center gap-2 mb-4">
          <Info className="w-4 h-4 text-muted-foreground" />
          <h3 className="font-semibold text-sm">Data Completeness by Patient</h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {["EM-001","EM-002","EM-003","EM-004","EM-005","EM-006"].map(pid => {
            const patientIssues = active.filter(i => i.patientId === pid)
            const hasCritical   = patientIssues.some(i => i.severity === "critical")
            const hasWarning    = patientIssues.some(i => i.severity === "warning")
            const issueCount    = patientIssues.length
            const score         = Math.max(0, 100 - issueCount * 15)

            return (
              <div key={pid} className={`rounded-lg border p-3 text-center ${
                hasCritical ? "border-rose-500/30 bg-rose-500/5" :
                hasWarning  ? "border-amber-500/30 bg-amber-500/5" :
                              "border-emerald-500/30 bg-emerald-500/5"
              }`}>
                <p className="text-xs font-bold mb-1">{pid}</p>
                <p className={`text-2xl font-bold ${
                  hasCritical ? "text-rose-500" :
                  hasWarning  ? "text-amber-500" :
                                "text-emerald-500"
                }`}>{score}%</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">
                  {issueCount === 0 ? "No issues" : `${issueCount} issue${issueCount > 1 ? "s" : ""}`}
                </p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by patient ID or variable..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <select
          value={filterType}
          onChange={e => setFilterType(e.target.value as IssueType | "all")}
          className="h-10 rounded-md border border-input bg-background px-3 text-sm"
        >
          <option value="all">All Types</option>
          <option value="missing">Missing Data</option>
          <option value="anomaly">Anomalous Value</option>
          <option value="inconsistency">Inconsistency</option>
        </select>
        <select
          value={filterSeverity}
          onChange={e => setFilterSeverity(e.target.value as IssueSeverity | "all")}
          className="h-10 rounded-md border border-input bg-background px-3 text-sm"
        >
          <option value="all">All Severities</option>
          <option value="critical">Critical</option>
          <option value="warning">Warning</option>
          <option value="info">Info</option>
        </select>
        <Button
          variant={showResolved ? "default" : "outline"}
          size="sm"
          onClick={() => setShowResolved(!showResolved)}
          className="gap-2 h-10 px-4"
        >
          <CheckCircle2 className="w-4 h-4" />
          {showResolved ? "Hide Resolved" : "Show Resolved"}
        </Button>
        <Button variant="outline" size="sm" className="gap-2 h-10 px-4">
          <RefreshCw className="w-4 h-4" />
          Refresh
        </Button>
      </div>

      {/* Issues list */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {sorted.length} issue{sorted.length !== 1 ? "s" : ""} found
          </p>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-rose-500 inline-block" /> Critical</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500 inline-block" /> Warning</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-slate-400 inline-block" /> Info</span>
          </div>
        </div>

        {sorted.length === 0 ? (
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-10 text-center">
            <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-3" />
            <p className="font-semibold text-emerald-600">No issues found</p>
            <p className="text-xs text-muted-foreground mt-1">All data passes quality checks for the current filters</p>
          </div>
        ) : (
          sorted.map(issue => <IssueCard key={issue.id} issue={issue} />)
        )}
      </div>
    </div>
  )
}
