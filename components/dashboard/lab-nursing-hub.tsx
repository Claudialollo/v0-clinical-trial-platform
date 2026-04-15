"use client"

import { useState } from "react"
import {
  FlaskConical, Truck, BookOpen, UserX, AlertTriangle,
  CheckCircle2, Clock, Send, ChevronDown, ChevronUp,
  Thermometer, RotateCcw, Package, Phone, MessageSquare,
  Calendar, User, Bell, ClipboardList
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type TabId = "pickup" | "protocols" | "missed" | "messages"

interface TubePickup {
  id: string
  patientId: string
  patientName: string
  scheduledDate: string
  tubes: string[]
  status: "scheduled" | "ready" | "collected" | "delayed"
  assignedNurse?: string
  notes?: string
}

interface LabMessage {
  id: string
  from: string
  role: "nurse" | "lab" | "clinician"
  message: string
  time: string
  read: boolean
  priority: "normal" | "urgent"
}

const PICKUPS: TubePickup[] = [
  { id: "1", patientId: "PT-001", patientName: "Maria R.",  scheduledDate: "2026-04-15", tubes: ["EDTA 4mL", "SST 5mL", "Citrate 2.7mL"], status: "ready",     assignedNurse: "Nurse Conti",  notes: "Patient fasted for 8h" },
  { id: "2", patientId: "PT-002", patientName: "Giulia F.", scheduledDate: "2026-04-15", tubes: ["EDTA 4mL", "SST 5mL"],                   status: "scheduled", assignedNurse: "Nurse Marino" },
  { id: "3", patientId: "PT-003", patientName: "Anna M.",   scheduledDate: "2026-04-16", tubes: ["EDTA 4mL", "SST 5mL", "EDTA 2mL"],       status: "scheduled", assignedNurse: "Nurse Conti" },
  { id: "4", patientId: "PT-004", patientName: "Laura C.",  scheduledDate: "2026-04-14", tubes: ["EDTA 4mL", "SST 5mL"],                   status: "delayed",   assignedNurse: "Nurse Russo",  notes: "Courier did not show up" },
  { id: "5", patientId: "PT-005", patientName: "Sofia B.",  scheduledDate: "2026-04-14", tubes: ["EDTA 4mL", "Citrate 2.7mL"],             status: "collected", assignedNurse: "Nurse Marino", notes: "Collected at 09:45" },
]

const MESSAGES: LabMessage[] = [
  { id: "1", from: "Lab Analysis",  role: "lab",       message: "Sample PT-001 received and being processed. pTau181 results expected within 48h.",                                    time: "10:30", read: false, priority: "normal" },
  { id: "2", from: "Nurse Conti",   role: "nurse",     message: "PT-004: patient cancelled appointment. Rescheduling of blood draw required.",                                        time: "09:15", read: false, priority: "urgent" },
  { id: "3", from: "Lab Analysis",  role: "lab",       message: "Warning: PT-003 sample haemolysed. New blood draw required for NfL and GFAP.",                                      time: "08:50", read: true,  priority: "urgent" },
  { id: "4", from: "Nurse Marino",  role: "nurse",     message: "PT-002 blood draw completed. Tubes stored at 4°C and ready for pickup.",                                             time: "08:20", read: true,  priority: "normal" },
  { id: "5", from: "Lab Analysis",  role: "lab",       message: "Reminder: for pTau217 samples use EDTA tubes only, not SST. Errors were detected last week.",                       time: "Yesterday", read: true, priority: "normal" },
]

const MISSED_PATIENTS = [
  { id: "PT-006", name: "Elena V.",  missedDate: "2026-04-13", reason: "Last-minute cancellation", attempts: 2, nextAvailable: "2026-04-17", status: "to_reschedule" as const },
  { id: "PT-008", name: "Carla M.",  missedDate: "2026-04-12", reason: "Did not show up",          attempts: 1, nextAvailable: "2026-04-18", status: "to_reschedule" as const },
  { id: "PT-011", name: "Rosa T.",   missedDate: "2026-04-10", reason: "Illness",                  attempts: 3, nextAvailable: "2026-04-20", status: "rescheduled"   as const },
]

const PROTOCOLS = [
  {
    id: "p1",
    title: "Tube Inversion Protocol",
    icon: RotateCcw,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    steps: [
      "EDTA (purple cap): 8–10 slow inversions immediately after collection",
      "Citrate (light blue cap): 3–4 inversions — 9:1 blood/citrate ratio is critical",
      "SST (yellow/red cap): 5–6 inversions, then allow to clot for 30 min at room temperature",
      "DO NOT shake vigorously — causes haemolysis and invalidates pTau samples",
    ]
  },
  {
    id: "p2",
    title: "Storage and Temperature",
    icon: Thermometer,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    steps: [
      "After collection: store at 4°C within 30 minutes",
      "pTau181/217 samples: centrifuge within 2h of collection (2000g × 15 min)",
      "Aliquoted plasma: freeze at −80°C if analysis is >24h away",
      "NEVER refreeze already thawed samples — invalidates AD biomarkers",
      "Transport to laboratory: refrigerated container, never at room temperature",
    ]
  },
  {
    id: "p3",
    title: "Sample Pickup Management",
    icon: Package,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
    steps: [
      "Contact the laboratory at least 24h before pickup via this platform",
      "Courier arrives on Tuesday and Thursday mornings (08:00–10:00)",
      "Complete the shipping form with patient ID, collection date and tube types",
      "Damaged or unlabelled tubes: DO NOT ship — contact the clinician",
      "In case of courier delay: tubes stable 72h at 4°C (not for pTau beyond 48h)",
    ]
  },
  {
    id: "p4",
    title: "Patient Identification",
    icon: User,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
    steps: [
      "Verify identity with at least 2 identifiers: full name + date of birth",
      "Check that the patient code on the wristband matches the trial form",
      "If identity is in doubt: DO NOT proceed with collection, contact the PI",
      "Label every tube immediately at the patient's bedside, never afterwards",
      "Upload a photo of the labelled tube set to the platform after each collection",
    ]
  },
  {
    id: "p5",
    title: "Uncooperative Patient / Difficult Vein",
    icon: AlertTriangle,
    color: "text-rose-500",
    bg: "bg-rose-500/10",
    steps: [
      "Maximum 2 attempts per operator — on the third, call senior nurse or physician",
      "Always document: number of attempts, vein used, any complications",
      "If patient refuses: record signed refusal and immediately notify the PI",
      "In case of vasovagal syncope: stop, Trendelenburg position, monitor for 15 minutes",
      "Post-collection haematoma: apply pressure for 5 minutes, ice pack, document and report",
    ]
  },
]

function StatusBadge({ status }: { status: TubePickup["status"] }) {
  const cfg = {
    scheduled: { label: "Scheduled", variant: "secondary"   as const, icon: Clock },
    ready:     { label: "Ready",     variant: "default"     as const, icon: CheckCircle2 },
    collected: { label: "Collected", variant: "outline"     as const, icon: CheckCircle2 },
    delayed:   { label: "Delayed",   variant: "destructive" as const, icon: AlertTriangle },
  }[status]
  const Icon = cfg.icon
  return (
    <Badge variant={cfg.variant} className="gap-1 text-xs">
      <Icon className="w-3 h-3" />{cfg.label}
    </Badge>
  )
}

function ProtocolCard({ protocol }: { protocol: typeof PROTOCOLS[0] }) {
  const [open, setOpen] = useState(false)
  const Icon = protocol.icon
  return (
    <div className="rounded-xl border border-border overflow-hidden transition-all">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-muted/30 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${protocol.bg}`}>
            <Icon className={`w-5 h-5 ${protocol.color}`} />
          </div>
          <span className="font-semibold text-sm">{protocol.title}</span>
        </div>
        {open ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
      </button>
      {open && (
        <div className="px-5 pb-5 space-y-2 border-t border-border bg-muted/10">
          {protocol.steps.map((step, i) => (
            <div key={i} className="flex items-start gap-3 pt-3">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 ${protocol.bg} ${protocol.color}`}>
                {i + 1}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{step}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export function LabNursingHub() {
  const [activeTab, setActiveTab] = useState<TabId>("pickup")
  const [newMessage, setNewMessage] = useState("")

  const tabs: { id: TabId; label: string; icon: React.ComponentType<{ className?: string }>; badge?: number }[] = [
    { id: "pickup",    label: "Sample Pickup",    icon: Truck,         badge: PICKUPS.filter(p => p.status === "ready" || p.status === "delayed").length },
    { id: "protocols", label: "Protocols",        icon: BookOpen },
    { id: "missed",    label: "Missed Patients",  icon: UserX,         badge: MISSED_PATIENTS.filter(p => p.status === "to_reschedule").length },
    { id: "messages",  label: "Messages",         icon: MessageSquare, badge: MESSAGES.filter(m => !m.read).length },
  ]

  return (
    <div className="space-y-6">

      {/* Summary bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Collections today",   value: PICKUPS.filter(p => p.scheduledDate === "2026-04-15").length,  icon: FlaskConical,  color: "text-blue-500",    bg: "bg-blue-500/5" },
          { label: "Ready for pickup",     value: PICKUPS.filter(p => p.status === "ready").length,             icon: Package,       color: "text-emerald-500", bg: "bg-emerald-500/5" },
          { label: "Delayed",             value: PICKUPS.filter(p => p.status === "delayed").length,            icon: AlertTriangle, color: "text-rose-500",    bg: "bg-rose-500/5" },
          { label: "Unread messages",      value: MESSAGES.filter(m => !m.read).length,                         icon: Bell,          color: "text-amber-500",   bg: "bg-amber-500/5" },
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

      {/* Tabs */}
      <div className="flex gap-1 border-b border-border">
        {tabs.map(tab => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                isActive
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
              {tab.badge ? (
                <span className={`w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center ${
                  isActive ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}>
                  {tab.badge}
                </span>
              ) : null}
            </button>
          )
        })}
      </div>

      {/* Tab: Sample Pickup */}
      {activeTab === "pickup" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Manage biological sample collection and courier pickup for each patient</p>
            <Button size="sm" className="gap-2 text-xs">
              <Truck className="w-3.5 h-3.5" />
              Request Pickup
            </Button>
          </div>
          <div className="rounded-xl border border-border bg-card overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground">Patient</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Date</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Tubes</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Nurse</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Status</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Notes</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {PICKUPS.map((p, i) => (
                  <tr key={p.id} className={`border-b border-border/50 hover:bg-muted/20 transition-colors ${i % 2 === 0 ? "" : "bg-muted/10"}`}>
                    <td className="px-5 py-3.5">
                      <div>
                        <p className="font-medium text-xs">{p.patientName}</p>
                        <p className="text-[10px] text-muted-foreground">{p.patientId}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                        <span className="text-xs">{p.scheduledDate}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex flex-wrap gap-1">
                        {p.tubes.map((t, ti) => (
                          <span key={ti} className="text-[10px] bg-muted px-2 py-0.5 rounded font-mono">{t}</span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="text-xs">{p.assignedNurse || "—"}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <StatusBadge status={p.status} />
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="text-xs text-muted-foreground">{p.notes || "—"}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm" className="h-7 px-2 text-[10px]">
                          <Send className="w-3 h-3 mr-1" />
                          Notify
                        </Button>
                        {p.status === "delayed" && (
                          <Button variant="ghost" size="sm" className="h-7 px-2 text-[10px] text-rose-500">
                            <AlertTriangle className="w-3 h-3 mr-1" />
                            Chase
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab: Protocols */}
      {activeTab === "protocols" && (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Standard operating procedures for nurses and laboratory staff. Click each protocol to expand.
          </p>
          <div className="space-y-3">
            {PROTOCOLS.map(p => <ProtocolCard key={p.id} protocol={p} />)}
          </div>
          <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/5 flex gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-amber-600 mb-1">Critical reminder for pTau samples</p>
              <p className="text-xs text-muted-foreground">
                pTau181 and pTau217 biomarkers are extremely sensitive to temperature and haemolysis.
                Any deviation from protocol must be documented immediately and communicated to the PI clinician before sending to the laboratory.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Missed Patients */}
      {activeTab === "missed" && (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Patients who did not attend their blood draw or cancelled. Manage rescheduling.
          </p>
          <div className="space-y-3">
            {MISSED_PATIENTS.map(p => (
              <div key={p.id} className={`rounded-xl border p-5 ${
                p.status === "to_reschedule"
                  ? "border-rose-500/30 bg-rose-500/5"
                  : "border-emerald-500/30 bg-emerald-500/5"
              }`}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                      p.status === "to_reschedule" ? "bg-rose-500/20" : "bg-emerald-500/20"
                    }`}>
                      <UserX className={`w-4 h-4 ${p.status === "to_reschedule" ? "text-rose-500" : "text-emerald-500"}`} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold text-sm">{p.name}</p>
                        <span className="text-xs text-muted-foreground">{p.id}</span>
                        <Badge variant={p.status === "to_reschedule" ? "destructive" : "default"} className="text-[10px]">
                          {p.status === "to_reschedule" ? "To reschedule" : "Rescheduled"}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-0.5">
                        <span className="font-medium">Missed:</span> {p.missedDate} — {p.reason}
                      </p>
                      <p className="text-xs text-muted-foreground mb-0.5">
                        <span className="font-medium">Contact attempts:</span> {p.attempts}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        <span className="font-medium">First available:</span> {p.nextAvailable}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                      <Phone className="w-3.5 h-3.5" />
                      Call
                    </Button>
                    <Button size="sm" className="gap-1.5 text-xs">
                      <Calendar className="w-3.5 h-3.5" />
                      Reschedule
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 rounded-xl border border-border bg-muted/20">
            <div className="flex items-center gap-2 mb-2">
              <ClipboardList className="w-4 h-4 text-muted-foreground" />
              <p className="text-xs font-semibold">Missed patient procedure</p>
            </div>
            <ol className="space-y-1">
              {[
                "Within 24h: first phone contact attempt by the nurse",
                "Within 48h: second attempt + SMS with rebooking link",
                "Within 72h: automatic notification to the PI via this platform",
                "Beyond 72h with no response: PI assessment for trial exclusion or protocol deviation",
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                  <span className="w-4 h-4 rounded-full bg-primary/10 text-primary text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}

      {/* Tab: Messages */}
      {activeTab === "messages" && (
        <div className="space-y-4">
          <div className="rounded-xl border border-border bg-card overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <h3 className="font-semibold text-sm">Lab & Nursing Messages</h3>
              <Badge variant="secondary" className="text-xs">
                {MESSAGES.filter(m => !m.read).length} unread
              </Badge>
            </div>
            <div className="divide-y divide-border">
              {MESSAGES.map(msg => (
                <div key={msg.id} className={`px-5 py-4 flex items-start gap-4 transition-colors hover:bg-muted/20 ${!msg.read ? "bg-primary/5" : ""}`}>
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                    msg.role === "lab"   ? "bg-blue-500/20"   :
                    msg.role === "nurse" ? "bg-purple-500/20" :
                                          "bg-primary/20"
                  }`}>
                    {msg.role === "lab"   ? <FlaskConical className="w-4 h-4 text-blue-500" />  :
                     msg.role === "nurse" ? <User className="w-4 h-4 text-purple-500" />         :
                                           <User className="w-4 h-4 text-primary" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-xs font-semibold">{msg.from}</span>
                      <Badge variant="outline" className="text-[10px] py-0">
                        {msg.role === "lab" ? "Laboratory" : msg.role === "nurse" ? "Nurse" : "Clinician"}
                      </Badge>
                      {msg.priority === "urgent" && (
                        <Badge variant="destructive" className="text-[10px] py-0 gap-1">
                          <AlertTriangle className="w-2.5 h-2.5" />
                          Urgent
                        </Badge>
                      )}
                      {!msg.read && <span className="w-2 h-2 rounded-full bg-primary shrink-0" />}
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{msg.message}</p>
                  </div>
                  <span className="text-[10px] text-muted-foreground shrink-0">{msg.time}</span>
                </div>
              ))}
            </div>
            <div className="px-5 py-4 border-t border-border bg-muted/10">
              <div className="flex gap-2">
                <Input
                  placeholder="Write a message to nurses or laboratory..."
                  value={newMessage}
                  onChange={e => setNewMessage(e.target.value)}
                  className="text-xs"
                />
                <Button size="sm" className="gap-1.5 text-xs shrink-0" disabled={!newMessage.trim()}>
                  <Send className="w-3.5 h-3.5" />
                  Send
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
