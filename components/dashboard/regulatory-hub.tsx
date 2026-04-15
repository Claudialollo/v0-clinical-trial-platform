"use client"

import { useState } from "react"
import { FileText, Shield, Lock, CheckCircle2, Clock, AlertTriangle, Upload, Download, Eye, Search, Filter, User, Calendar, BadgeCheck } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type DocStatus = "signed" | "pending" | "missing" | "expired"
type DocType = "informed_consent" | "privacy" | "data_processing"

interface RegulatoryDoc {
  id: string
  patientId: string
  patientName: string
  type: DocType
  status: DocStatus
  signedDate?: string
  expiryDate?: string
  version: string
  signedBy?: string
}

const DOC_LABELS: Record<DocType, { label: string; icon: React.ComponentType<{ className?: string }>; color: string }> = {
  informed_consent: { label: "Informed Consent", icon: FileText, color: "text-blue-500" },
  privacy:          { label: "Privacy Policy",   icon: Shield,   color: "text-purple-500" },
  data_processing:  { label: "Data Processing",  icon: Lock,     color: "text-emerald-500" },
}

const STATUS_CONFIG: Record<DocStatus, { label: string; variant: "default" | "secondary" | "destructive" | "outline"; icon: React.ComponentType<{ className?: string }> }> = {
  signed:  { label: "Signed",   variant: "default",     icon: CheckCircle2 },
  pending: { label: "Pending",  variant: "secondary",   icon: Clock },
  missing: { label: "Missing",  variant: "destructive", icon: AlertTriangle },
  expired: { label: "Expired",  variant: "outline",     icon: AlertTriangle },
}

const MOCK_DOCS: RegulatoryDoc[] = [
  { id: "1",  patientId: "PT-001", patientName: "Maria R.",    type: "informed_consent", status: "signed",  signedDate: "2026-01-10", expiryDate: "2027-01-10", version: "v2.1", signedBy: "Dr. Bianchi" },
  { id: "2",  patientId: "PT-001", patientName: "Maria R.",    type: "privacy",          status: "signed",  signedDate: "2026-01-10", version: "v1.3", signedBy: "Dr. Bianchi" },
  { id: "3",  patientId: "PT-001", patientName: "Maria R.",    type: "data_processing",  status: "signed",  signedDate: "2026-01-10", version: "v1.1", signedBy: "Dr. Bianchi" },
  { id: "4",  patientId: "PT-002", patientName: "Giulia F.",   type: "informed_consent", status: "signed",  signedDate: "2026-01-15", expiryDate: "2027-01-15", version: "v2.1", signedBy: "Dr. Rossi" },
  { id: "5",  patientId: "PT-002", patientName: "Giulia F.",   type: "privacy",          status: "signed",  signedDate: "2026-01-15", version: "v1.3", signedBy: "Dr. Rossi" },
  { id: "6",  patientId: "PT-002", patientName: "Giulia F.",   type: "data_processing",  status: "pending", version: "v1.1" },
  { id: "7",  patientId: "PT-003", patientName: "Anna M.",     type: "informed_consent", status: "signed",  signedDate: "2026-01-20", expiryDate: "2027-01-20", version: "v2.1", signedBy: "Dr. Bianchi" },
  { id: "8",  patientId: "PT-003", patientName: "Anna M.",     type: "privacy",          status: "missing", version: "v1.3" },
  { id: "9",  patientId: "PT-003", patientName: "Anna M.",     type: "data_processing",  status: "missing", version: "v1.1" },
  { id: "10", patientId: "PT-004", patientName: "Laura C.",    type: "informed_consent", status: "pending", version: "v2.1" },
  { id: "11", patientId: "PT-004", patientName: "Laura C.",    type: "privacy",          status: "pending", version: "v1.3" },
  { id: "12", patientId: "PT-004", patientName: "Laura C.",    type: "data_processing",  status: "pending", version: "v1.1" },
  { id: "13", patientId: "PT-005", patientName: "Sofia B.",    type: "informed_consent", status: "signed",  signedDate: "2026-02-01", expiryDate: "2025-12-01", version: "v2.0", signedBy: "Dr. Rossi" },
  { id: "14", patientId: "PT-005", patientName: "Sofia B.",    type: "privacy",          status: "signed",  signedDate: "2026-02-01", version: "v1.3", signedBy: "Dr. Rossi" },
  { id: "15", patientId: "PT-005", patientName: "Sofia B.",    type: "data_processing",  status: "expired", signedDate: "2025-02-01", expiryDate: "2025-12-01", version: "v1.0" },
]

const PATIENTS = Array.from(new Set(MOCK_DOCS.map(d => d.patientId))).map(id => ({
  id,
  name: MOCK_DOCS.find(d => d.patientId === id)!.patientName,
}))

function StatusBadge({ status }: { status: DocStatus }) {
  const cfg = STATUS_CONFIG[status]
  const Icon = cfg.icon
  return (
    <Badge variant={cfg.variant} className="gap-1 text-xs">
      <Icon className="w-3 h-3" />
      {cfg.label}
    </Badge>
  )
}

function SummaryCard({ label, count, icon: Icon, color, bg }: {
  label: string; count: number; icon: React.ComponentType<{ className?: string }>; color: string; bg: string
}) {
  return (
    <div className={`rounded-xl border border-border p-5 flex items-center gap-4 ${bg}`}>
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color} bg-background/60`}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="text-2xl font-bold">{count}</p>
        <p className="text-xs text-muted-foreground">{label}</p>
      </div>
    </div>
  )
}

export function RegulatoryHub() {
  const [search, setSearch] = useState("")
  const [filterStatus, setFilterStatus] = useState<DocStatus | "all">("all")
  const [filterType, setFilterType] = useState<DocType | "all">("all")
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null)

  const signed  = MOCK_DOCS.filter(d => d.status === "signed").length
  const pending = MOCK_DOCS.filter(d => d.status === "pending").length
  const missing = MOCK_DOCS.filter(d => d.status === "missing").length
  const expired = MOCK_DOCS.filter(d => d.status === "expired").length

  const filtered = MOCK_DOCS.filter(d => {
    const matchSearch = d.patientName.toLowerCase().includes(search.toLowerCase()) ||
                        d.patientId.toLowerCase().includes(search.toLowerCase())
    const matchStatus = filterStatus === "all" || d.status === filterStatus
    const matchType   = filterType === "all" || d.type === filterType
    const matchPat    = !selectedPatient || d.patientId === selectedPatient
    return matchSearch && matchStatus && matchType && matchPat
  })

  // Group by patient for the patient overview
  const patientCompliance = PATIENTS.map(p => {
    const docs = MOCK_DOCS.filter(d => d.patientId === p.id)
    const allSigned = docs.every(d => d.status === "signed")
    const hasMissing = docs.some(d => d.status === "missing" || d.status === "expired")
    const status = allSigned ? "complete" : hasMissing ? "incomplete" : "partial"
    return { ...p, docs, status }
  })

  return (
    <div className="space-y-6">

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard label="Documents Signed"  count={signed}  icon={CheckCircle2} color="text-emerald-500" bg="bg-emerald-500/5" />
        <SummaryCard label="Pending Signature" count={pending} icon={Clock}        color="text-amber-500"   bg="bg-amber-500/5" />
        <SummaryCard label="Missing Documents" count={missing} icon={AlertTriangle} color="text-red-500"    bg="bg-red-500/5" />
        <SummaryCard label="Expired / Renew"   count={expired} icon={AlertTriangle} color="text-orange-500" bg="bg-orange-500/5" />
      </div>

      {/* Patient compliance overview */}
      <div className="rounded-xl border border-border bg-card p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-sm">Patient Document Compliance</h3>
          <span className="text-xs text-muted-foreground">{patientCompliance.filter(p => p.status === "complete").length}/{PATIENTS.length} fully compliant</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {patientCompliance.map(p => (
            <button
              key={p.id}
              onClick={() => setSelectedPatient(selectedPatient === p.id ? null : p.id)}
              className={`rounded-lg border p-3 text-left transition-all hover:border-primary/50 ${
                selectedPatient === p.id ? "border-primary bg-primary/5" :
                p.status === "complete" ? "border-emerald-500/30 bg-emerald-500/5" :
                p.status === "incomplete" ? "border-red-500/30 bg-red-500/5" :
                "border-amber-500/30 bg-amber-500/5"
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="w-3.5 h-3.5 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-semibold">{p.name}</p>
                  <p className="text-[10px] text-muted-foreground">{p.id}</p>
                </div>
              </div>
              <div className="flex gap-1">
                {(["informed_consent", "privacy", "data_processing"] as DocType[]).map(type => {
                  const doc = p.docs.find(d => d.type === type)
                  return (
                    <div
                      key={type}
                      className={`w-5 h-5 rounded-sm flex items-center justify-center text-[9px] font-bold ${
                        doc?.status === "signed" ? "bg-emerald-500 text-white" :
                        doc?.status === "pending" ? "bg-amber-500 text-white" :
                        doc?.status === "expired" ? "bg-orange-500 text-white" :
                        "bg-red-500 text-white"
                      }`}
                      title={DOC_LABELS[type].label}
                    >
                      {type === "informed_consent" ? "IC" : type === "privacy" ? "PP" : "DP"}
                    </div>
                  )
                })}
              </div>
              <p className={`text-[10px] mt-1.5 font-medium ${
                p.status === "complete" ? "text-emerald-600" :
                p.status === "incomplete" ? "text-red-500" : "text-amber-600"
              }`}>
                {p.status === "complete" ? "✓ Complete" : p.status === "incomplete" ? "⚠ Incomplete" : "◷ Partial"}
              </p>
            </button>
          ))}
        </div>
        {selectedPatient && (
          <p className="text-xs text-primary mt-3">
            Filtering by {patientCompliance.find(p => p.id === selectedPatient)?.name} — <button onClick={() => setSelectedPatient(null)} className="underline">clear filter</button>
          </p>
        )}
      </div>

      {/* Filters and search */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search patient name or ID..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <select
          value={filterType}
          onChange={e => setFilterType(e.target.value as DocType | "all")}
          className="h-10 rounded-md border border-input bg-background px-3 text-sm text-foreground"
        >
          <option value="all">All Document Types</option>
          <option value="informed_consent">Informed Consent</option>
          <option value="privacy">Privacy Policy</option>
          <option value="data_processing">Data Processing</option>
        </select>
        <select
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value as DocStatus | "all")}
          className="h-10 rounded-md border border-input bg-background px-3 text-sm text-foreground"
        >
          <option value="all">All Statuses</option>
          <option value="signed">Signed</option>
          <option value="pending">Pending</option>
          <option value="missing">Missing</option>
          <option value="expired">Expired</option>
        </select>
      </div>

      {/* Documents table */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div>
            <h3 className="font-semibold text-sm">Regulatory Documents</h3>
            <p className="text-xs text-muted-foreground mt-0.5">{filtered.length} document{filtered.length !== 1 ? "s" : ""} found</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-1.5 text-xs">
              <Download className="w-3.5 h-3.5" />
              Export CSV
            </Button>
            <Button size="sm" className="gap-1.5 text-xs">
              <Upload className="w-3.5 h-3.5" />
              Upload Document
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground">Patient</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Document Type</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Status</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Version</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Signed Date</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Signed By</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-10 text-center text-muted-foreground text-sm">
                    No documents match the current filters.
                  </td>
                </tr>
              ) : (
                filtered.map((doc, i) => {
                  const docCfg = DOC_LABELS[doc.type]
                  const DocIcon = docCfg.icon
                  return (
                    <tr
                      key={doc.id}
                      className={`border-b border-border/50 transition-colors hover:bg-muted/20 ${i % 2 === 0 ? "" : "bg-muted/10"}`}
                    >
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                            <User className="w-3.5 h-3.5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-xs">{doc.patientName}</p>
                            <p className="text-[10px] text-muted-foreground">{doc.patientId}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2">
                          <DocIcon className={`w-4 h-4 ${docCfg.color}`} />
                          <span className="text-xs">{docCfg.label}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <StatusBadge status={doc.status} />
                      </td>
                      <td className="px-4 py-3.5">
                        <span className="text-xs font-mono bg-muted px-2 py-0.5 rounded">{doc.version}</span>
                      </td>
                      <td className="px-4 py-3.5">
                        {doc.signedDate ? (
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                            <span className="text-xs">{doc.signedDate}</span>
                          </div>
                        ) : (
                          <span className="text-xs text-muted-foreground italic">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3.5">
                        {doc.signedBy ? (
                          <div className="flex items-center gap-1.5">
                            <BadgeCheck className="w-3.5 h-3.5 text-emerald-500" />
                            <span className="text-xs">{doc.signedBy}</span>
                          </div>
                        ) : (
                          <span className="text-xs text-muted-foreground italic">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="sm" className="h-7 w-7 p-0" title="View document">
                            <Eye className="w-3.5 h-3.5" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-7 w-7 p-0" title="Download document">
                            <Download className="w-3.5 h-3.5" />
                          </Button>
                          {(doc.status === "missing" || doc.status === "pending" || doc.status === "expired") && (
                            <Button variant="ghost" size="sm" className="h-7 px-2 text-[10px] text-amber-600 hover:text-amber-700" title="Send reminder">
                              Send reminder
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Legend */}
        <div className="px-5 py-3 border-t border-border bg-muted/20 flex flex-wrap gap-4">
          {(["IC", "PP", "DP"] as const).map((code, i) => (
            <div key={code} className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
              <div className="w-4 h-4 rounded-sm bg-primary/20 flex items-center justify-center text-[8px] font-bold text-primary">{code}</div>
              <span>{["Informed Consent", "Privacy Policy", "Data Processing"][i]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
