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
  { id: "1", patientId: "PT-001", patientName: "Maria R.",   scheduledDate: "2026-04-15", tubes: ["EDTA 4mL", "SST 5mL", "Citrate 2.7mL"], status: "ready",     assignedNurse: "Inf. Conti",   notes: "Paziente a digiuno dalle 8h" },
  { id: "2", patientId: "PT-002", patientName: "Giulia F.",  scheduledDate: "2026-04-15", tubes: ["EDTA 4mL", "SST 5mL"],                   status: "scheduled", assignedNurse: "Inf. Marino" },
  { id: "3", patientId: "PT-003", patientName: "Anna M.",    scheduledDate: "2026-04-16", tubes: ["EDTA 4mL", "SST 5mL", "EDTA 2mL"],       status: "scheduled", assignedNurse: "Inf. Conti" },
  { id: "4", patientId: "PT-004", patientName: "Laura C.",   scheduledDate: "2026-04-14", tubes: ["EDTA 4mL", "SST 5mL"],                   status: "delayed",   assignedNurse: "Inf. Russo",   notes: "Corriere non si è presentato" },
  { id: "5", patientId: "PT-005", patientName: "Sofia B.",   scheduledDate: "2026-04-14", tubes: ["EDTA 4mL", "Citrate 2.7mL"],             status: "collected", assignedNurse: "Inf. Marino",  notes: "Ritirato ore 09:45" },
]

const MESSAGES: LabMessage[] = [
  { id: "1", from: "Lab. Analisi",   role: "lab",       message: "Campione PT-001 ricevuto e in lavorazione. Risultati pTau181 attesi entro 48h.",                              time: "10:30", read: false, priority: "normal" },
  { id: "2", from: "Inf. Conti",     role: "nurse",     message: "PT-004: il paziente ha disdetto l'appuntamento. Necessario riprogrammare il prelievo.",                      time: "09:15", read: false, priority: "urgent" },
  { id: "3", from: "Lab. Analisi",   role: "lab",       message: "Attenzione: campione PT-003 emolizzato. Necessario nuovo prelievo per NfL e GFAP.",                          time: "08:50", read: true,  priority: "urgent" },
  { id: "4", from: "Inf. Marino",    role: "nurse",     message: "PT-002 prelievo completato. Provette conservate a 4°C e pronte per il ritiro.",                              time: "08:20", read: true,  priority: "normal" },
  { id: "5", from: "Lab. Analisi",   role: "lab",       message: "Reminder: per i campioni pTau217 usare esclusivamente provette EDTA, non SST. Riscontrati errori la settimana scorsa.", time: "Ieri", read: true, priority: "normal" },
]

const MISSED_PATIENTS = [
  { id: "PT-006", name: "Elena V.",   missedDate: "2026-04-13", reason: "Disdetta last-minute", attempts: 2, nextAvailable: "2026-04-17", status: "to_reschedule" as const },
  { id: "PT-008", name: "Carla M.",   missedDate: "2026-04-12", reason: "Non presentata",       attempts: 1, nextAvailable: "2026-04-18", status: "to_reschedule" as const },
  { id: "PT-011", name: "Rosa T.",    missedDate: "2026-04-10", reason: "Malattia",             attempts: 3, nextAvailable: "2026-04-20", status: "rescheduled"   as const },
]

const PROTOCOLS = [
  {
    id: "p1",
    title: "Inversione delle Provette",
    icon: RotateCcw,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    steps: [
      "EDTA (tappo viola): 8–10 inversioni lente subito dopo il prelievo",
      "Citrato (tappo azzurro): 3–4 inversioni — rapporto sangue/citrato 9:1 fondamentale",
      "SST (tappo giallo/rosso): 5–6 inversioni, poi lasciare coagulare 30 min a temperatura ambiente",
      "NON agitare vigorosamente — causa emolisi e invalida i campioni pTau",
    ]
  },
  {
    id: "p2",
    title: "Conservazione e Temperatura",
    icon: Thermometer,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    steps: [
      "Dopo il prelievo: conservare a 4°C entro 30 minuti",
      "Campioni pTau181/217: centrifugare entro 2h dal prelievo (2000g × 15 min)",
      "Plasma aliquotato: congelare a −80°C se analisi entro >24h",
      "MAI ricongelare campioni già scongelati — invalida i biomarker AD",
      "Trasporto al laboratorio: contenitore refrigerato, mai a temperatura ambiente",
    ]
  },
  {
    id: "p3",
    title: "Gestione del Carico Provette",
    icon: Package,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
    steps: [
      "Contattare il laboratorio almeno 24h prima del ritiro tramite questa piattaforma",
      "Il corriere passa il martedì e il giovedì mattina (ore 08:00–10:00)",
      "Compilare il modulo di spedizione con ID paziente, data prelievo e tipo provette",
      "Provette danneggiate o non etichettate: NON spedire — contattare il clinico",
      "In caso di ritardo corriere: provette stabili 72h a 4°C (non per pTau oltre 48h)",
    ]
  },
  {
    id: "p4",
    title: "Identificazione Paziente",
    icon: User,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
    steps: [
      "Verificare identità con almeno 2 identificatori: nome+cognome + data di nascita",
      "Controllare che il codice paziente sul braccialetto corrisponda al modulo trial",
      "In caso di dubbio identità: NON procedere al prelievo, contattare il PI",
      "Etichettare ogni provetta immediatamente al letto del paziente, mai dopo",
      "Foto del set provette etichettato da caricare sulla piattaforma dopo ogni prelievo",
    ]
  },
  {
    id: "p5",
    title: "Paziente Non Cooperante / Vena Difficile",
    icon: AlertTriangle,
    color: "text-rose-500",
    bg: "bg-rose-500/10",
    steps: [
      "Max 2 tentativi per operatore — al terzo chiamare infermiere senior o medico",
      "Documentare sempre: numero tentativi, vena utilizzata, eventuali complicazioni",
      "Se paziente rifiuta: registrare il rifiuto firmato e notificare immediatamente il PI",
      "In caso di lipotimia: interrompere, posizione Trendelenburg, monitorare 15 minuti",
      "Ematoma post-prelievo: compressione 5 minuti, ghiaccio, documentare e segnalare",
    ]
  },
]

function StatusBadge({ status }: { status: TubePickup["status"] }) {
  const cfg = {
    scheduled: { label: "Programmato",  variant: "secondary"    as const, icon: Clock },
    ready:     { label: "Pronto",        variant: "default"      as const, icon: CheckCircle2 },
    collected: { label: "Ritirato",      variant: "outline"      as const, icon: CheckCircle2 },
    delayed:   { label: "In Ritardo",    variant: "destructive"  as const, icon: AlertTriangle },
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
    <div className={`rounded-xl border border-border overflow-hidden transition-all`}>
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
    { id: "pickup",    label: "Carico Provette",   icon: Truck,          badge: PICKUPS.filter(p => p.status === "ready" || p.status === "delayed").length },
    { id: "protocols", label: "Protocolli",        icon: BookOpen },
    { id: "missed",    label: "Pazienti Assenti",  icon: UserX,          badge: MISSED_PATIENTS.filter(p => p.status === "to_reschedule").length },
    { id: "messages",  label: "Messaggi",          icon: MessageSquare,  badge: MESSAGES.filter(m => !m.read).length },
  ]

  return (
    <div className="space-y-6">

      {/* Summary bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Prelievi oggi",       value: PICKUPS.filter(p => p.scheduledDate === "2026-04-15").length,                         icon: FlaskConical,  color: "text-blue-500",   bg: "bg-blue-500/5" },
          { label: "Pronti al ritiro",    value: PICKUPS.filter(p => p.status === "ready").length,                                     icon: Package,       color: "text-emerald-500", bg: "bg-emerald-500/5" },
          { label: "In ritardo",          value: PICKUPS.filter(p => p.status === "delayed").length,                                   icon: AlertTriangle, color: "text-rose-500",    bg: "bg-rose-500/5" },
          { label: "Messaggi non letti",  value: MESSAGES.filter(m => !m.read).length,                                                 icon: Bell,          color: "text-amber-500",   bg: "bg-amber-500/5" },
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
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors relative ${
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

      {/* Tab: Carico Provette */}
      {activeTab === "pickup" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Gestisci il ritiro dei campioni biologici per ogni paziente</p>
            <Button size="sm" className="gap-2 text-xs">
              <Truck className="w-3.5 h-3.5" />
              Richiedi Ritiro
            </Button>
          </div>
          <div className="rounded-xl border border-border bg-card overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground">Paziente</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Data</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Provette</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Infermiere</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Stato</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Note</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Azioni</th>
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
                          Notifica
                        </Button>
                        {p.status === "delayed" && (
                          <Button variant="ghost" size="sm" className="h-7 px-2 text-[10px] text-rose-500">
                            <AlertTriangle className="w-3 h-3 mr-1" />
                            Sollecita
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

      {/* Tab: Protocolli */}
      {activeTab === "protocols" && (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Procedure operative standard per infermieri e personale di laboratorio. Clicca su ogni protocollo per espanderlo.
          </p>
          <div className="space-y-3">
            {PROTOCOLS.map(p => <ProtocolCard key={p.id} protocol={p} />)}
          </div>
          <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/5 flex gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-amber-600 mb-1">Reminder critico per campioni pTau</p>
              <p className="text-xs text-muted-foreground">
                I biomarker pTau181 e pTau217 sono estremamente sensibili alla temperatura e all'emolisi.
                Qualsiasi deviazione dal protocollo deve essere documentata immediatamente e comunicata al clinico PI prima dell'invio al laboratorio.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Pazienti Assenti */}
      {activeTab === "missed" && (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Pazienti che non si sono presentati al prelievo o hanno disdetto. Gestisci la riprogrammazione.
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
                          {p.status === "to_reschedule" ? "Da riprogrammare" : "Riprogrammato"}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-0.5">
                        <span className="font-medium">Assenza:</span> {p.missedDate} — {p.reason}
                      </p>
                      <p className="text-xs text-muted-foreground mb-0.5">
                        <span className="font-medium">Tentativi di contatto:</span> {p.attempts}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        <span className="font-medium">Prima disponibilità:</span> {p.nextAvailable}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                      <Phone className="w-3.5 h-3.5" />
                      Chiama
                    </Button>
                    <Button size="sm" className="gap-1.5 text-xs">
                      <Calendar className="w-3.5 h-3.5" />
                      Riprogramma
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 rounded-xl border border-border bg-muted/20">
            <div className="flex items-center gap-2 mb-2">
              <ClipboardList className="w-4 h-4 text-muted-foreground" />
              <p className="text-xs font-semibold">Procedura per paziente assente</p>
            </div>
            <ol className="space-y-1">
              {[
                "Entro 24h: primo tentativo telefonico da parte dell'infermiere",
                "Entro 48h: secondo tentativo + SMS con link di riprenotazione",
                "Entro 72h: notifica automatica al clinico PI tramite questa piattaforma",
                "Oltre 72h senza risposta: valutazione PI per esclusione dal trial o deviazione protocollare",
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

      {/* Tab: Messaggi */}
      {activeTab === "messages" && (
        <div className="space-y-4">
          <div className="rounded-xl border border-border bg-card overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <h3 className="font-semibold text-sm">Messaggi Lab & Infermieri</h3>
              <Badge variant="secondary" className="text-xs">
                {MESSAGES.filter(m => !m.read).length} non letti
              </Badge>
            </div>
            <div className="divide-y divide-border">
              {MESSAGES.map(msg => (
                <div key={msg.id} className={`px-5 py-4 flex items-start gap-4 transition-colors hover:bg-muted/20 ${!msg.read ? "bg-primary/5" : ""}`}>
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                    msg.role === "lab"       ? "bg-blue-500/20"   :
                    msg.role === "nurse"     ? "bg-purple-500/20" :
                                              "bg-primary/20"
                  }`}>
                    {msg.role === "lab"   ? <FlaskConical className="w-4 h-4 text-blue-500" /> :
                     msg.role === "nurse" ? <User className="w-4 h-4 text-purple-500" />      :
                                           <User className="w-4 h-4 text-primary" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-xs font-semibold">{msg.from}</span>
                      <Badge variant="outline" className="text-[10px] py-0">
                        {msg.role === "lab" ? "Laboratorio" : msg.role === "nurse" ? "Infermiere" : "Clinico"}
                      </Badge>
                      {msg.priority === "urgent" && (
                        <Badge variant="destructive" className="text-[10px] py-0 gap-1">
                          <AlertTriangle className="w-2.5 h-2.5" />
                          Urgente
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

            {/* New message input */}
            <div className="px-5 py-4 border-t border-border bg-muted/10">
              <div className="flex gap-2">
                <Input
                  placeholder="Scrivi un messaggio a infermieri o laboratorio..."
                  value={newMessage}
                  onChange={e => setNewMessage(e.target.value)}
                  className="text-xs"
                />
                <Button size="sm" className="gap-1.5 text-xs shrink-0" disabled={!newMessage.trim()}>
                  <Send className="w-3.5 h-3.5" />
                  Invia
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
