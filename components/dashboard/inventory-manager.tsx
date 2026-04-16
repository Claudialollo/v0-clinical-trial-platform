"use client"

import { useState } from "react"
import {
  Package, AlertTriangle, CheckCircle2, Clock, Truck,
  Search, Bell, RefreshCw, Plus, ArrowDown, ChevronDown,
  ChevronUp, Download, Info, Bot, Mail, MessageSquare,
  Send, X, Sparkles, Phone, Copy
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

type StockStatus = "ok" | "low" | "critical" | "expired" | "expiring_soon"
type TabId = "inventory" | "shipments" | "alerts" | "ai_agent"

interface InventoryItem {
  id: string
  name: string
  category: "probiotic" | "tube" | "kit" | "consumable"
  currentStock: number
  minStock: number
  unit: string
  batchNumber: string
  expiryDate: string
  storageTemp: string
  status: StockStatus
  location: string
  lastUpdated: string
}

interface Shipment {
  id: string
  description: string
  quantity: string
  status: "ordered" | "in_transit" | "delivered" | "delayed"
  orderDate: string
  expectedDate: string
  trackingCode?: string
  supplier: string
}

interface StockAlert {
  id: string
  itemName: string
  type: "low_stock" | "expiring" | "expired" | "temperature"
  message: string
  severity: "critical" | "warning" | "info"
  date: string
  resolved: boolean
}

// ── SUPPLIER DATABASE ─────────────────────────────────────────────
const SUPPLIERS: Record<string, {
  name: string
  email: string
  phone: string
  contactPerson: string
  product: string
}> = {
  probiotic: {
    name: "Kaneka Corporation",
    email: "orders.europe@kaneka.com",
    phone: "+81-6-6226-5050",
    contactPerson: "Dr. Marco Tanaka",
    product: "KB Women Probiotic KABP052"
  },
  tube: {
    name: "BD Biosciences",
    email: "orders.italy@bd.com",
    phone: "+39-02-4822-1",
    contactPerson: "Sales Department Italy",
    product: "Blood Collection Tubes"
  },
  kit: {
    name: "Quanterix Europe",
    email: "orders@quanterix.com",
    phone: "+1-855-QUANTERIX",
    contactPerson: "European Sales Team",
    product: "Simoa / ELISA Assay Kits"
  },
  consumable: {
    name: "IRCCS Admin Office",
    email: "admin@hsantalucia.it",
    phone: "+39-06-5150-1",
    contactPerson: "Admin Department",
    product: "Consumables & Documents"
  },
}

// ── PI CONTACT ─────────────────────────────────────────────────────
// ↓↓↓ CAMBIA QUI IL TUO NUMERO E EMAIL ↓↓↓
const PI_PHONE = "+39 xxxxxxxxxx"
const PI_EMAIL = "c.spada@hsantalucia.it"
// ↑↑↑ CAMBIA QUI IL TUO NUMERO E EMAIL ↑↑↑

const INVENTORY: InventoryItem[] = [
  {
    id: "INV-001", name: "KB Women Probiotic (Kaneka KABP052)", category: "probiotic",
    currentStock: 45, minStock: 60, unit: "boxes (30 caps)", batchNumber: "KNK-2026-A14",
    expiryDate: "2027-06-30", storageTemp: "< 25°C", status: "low",
    location: "Storage Room B — Shelf 3", lastUpdated: "2026-04-15"
  },
  {
    id: "INV-002", name: "EDTA Tubes 4mL (purple cap)", category: "tube",
    currentStock: 8, minStock: 50, unit: "boxes (100 tubes)", batchNumber: "BD-2026-E41",
    expiryDate: "2026-05-15", storageTemp: "Room temperature", status: "critical",
    location: "Lab Storage — Cabinet 1", lastUpdated: "2026-04-14"
  },
  {
    id: "INV-003", name: "SST Tubes 5mL (yellow/red cap)", category: "tube",
    currentStock: 120, minStock: 50, unit: "tubes", batchNumber: "BD-2026-S22",
    expiryDate: "2027-02-28", storageTemp: "Room temperature", status: "ok",
    location: "Lab Storage — Cabinet 1", lastUpdated: "2026-04-14"
  },
  {
    id: "INV-004", name: "Citrate Tubes 2.7mL (light blue cap)", category: "tube",
    currentStock: 35, minStock: 40, unit: "tubes", batchNumber: "BD-2026-C08",
    expiryDate: "2026-06-01", storageTemp: "Room temperature", status: "expiring_soon",
    location: "Lab Storage — Cabinet 1", lastUpdated: "2026-04-13"
  },
  {
    id: "INV-005", name: "pTau181 ELISA Kit (Quanterix)", category: "kit",
    currentStock: 3, minStock: 4, unit: "kits (96 wells)", batchNumber: "QTX-2026-P91",
    expiryDate: "2026-07-31", storageTemp: "2–8°C", status: "low",
    location: "Fridge A — Lab", lastUpdated: "2026-04-12"
  },
  {
    id: "INV-006", name: "GFAP Simoa Kit (Quanterix HD-X)", category: "kit",
    currentStock: 5, minStock: 3, unit: "kits", batchNumber: "QTX-2026-G44",
    expiryDate: "2026-09-15", storageTemp: "2–8°C", status: "ok",
    location: "Fridge A — Lab", lastUpdated: "2026-04-10"
  },
  {
    id: "INV-007", name: "Informed Consent Forms (v2.1)", category: "consumable",
    currentStock: 15, minStock: 30, unit: "printed forms", batchNumber: "DOC-2026-IC21",
    expiryDate: "N/A", storageTemp: "Room temperature", status: "low",
    location: "Office — Filing Cabinet", lastUpdated: "2026-04-11"
  },
  {
    id: "INV-008", name: "Cryovials 1.8mL (Nunc)", category: "consumable",
    currentStock: 500, minStock: 200, unit: "vials", batchNumber: "NNC-2026-C18",
    expiryDate: "2029-12-31", storageTemp: "Room temperature", status: "ok",
    location: "Lab Storage — Cabinet 3", lastUpdated: "2026-04-08"
  },
]

const SHIPMENTS: Shipment[] = [
  {
    id: "SHP-001", description: "KB Women Probiotic restock — 120 boxes", quantity: "120 boxes",
    status: "in_transit", orderDate: "2026-04-12", expectedDate: "2026-04-18",
    trackingCode: "KNK-IT-2026-0412", supplier: "Kaneka Corporation"
  },
  {
    id: "SHP-002", description: "EDTA Tubes 4mL — 20 boxes emergency order", quantity: "20 boxes",
    status: "ordered", orderDate: "2026-04-15", expectedDate: "2026-04-17",
    supplier: "BD Biosciences"
  },
  {
    id: "SHP-003", description: "pTau181 ELISA Kit — 6 kits", quantity: "6 kits",
    status: "delivered", orderDate: "2026-04-01", expectedDate: "2026-04-08",
    trackingCode: "QTX-IT-2026-0401", supplier: "Quanterix Europe"
  },
  {
    id: "SHP-004", description: "Citrate Tubes 2.7mL — 10 boxes", quantity: "10 boxes",
    status: "delayed", orderDate: "2026-04-05", expectedDate: "2026-04-10",
    trackingCode: "BD-IT-2026-0405", supplier: "BD Biosciences"
  },
]

const ALERTS: StockAlert[] = [
  {
    id: "ALT-001", itemName: "EDTA Tubes 4mL", type: "low_stock",
    message: "Only 8 boxes remaining — below minimum threshold of 50. Emergency order placed.",
    severity: "critical", date: "2026-04-15 08:30", resolved: false
  },
  {
    id: "ALT-002", itemName: "KB Women Probiotic", type: "low_stock",
    message: "Stock at 45 boxes — below minimum of 60. Restock order SHP-001 in transit.",
    severity: "warning", date: "2026-04-14 10:15", resolved: false
  },
  {
    id: "ALT-003", itemName: "Citrate Tubes 2.7mL", type: "expiring",
    message: "Batch BD-2026-C08 expires on 2026-06-01 — 47 days remaining. Plan reorder.",
    severity: "warning", date: "2026-04-13 09:00", resolved: false
  },
  {
    id: "ALT-004", itemName: "Informed Consent Forms v2.1", type: "low_stock",
    message: "Only 15 forms remaining — below minimum of 30. Request reprint from admin.",
    severity: "warning", date: "2026-04-11 14:20", resolved: false
  },
  {
    id: "ALT-005", itemName: "pTau181 ELISA Kit", type: "low_stock",
    message: "3 kits remaining — below minimum threshold of 4.",
    severity: "warning", date: "2026-04-12 11:00", resolved: false
  },
  {
    id: "ALT-006", itemName: "NfL Simoa Kit", type: "expired",
    message: "Batch QTX-2025-N88 expired on 2026-04-01. Remove from storage immediately.",
    severity: "critical", date: "2026-04-01 00:00", resolved: true
  },
]

const STATUS_CONFIG: Record<StockStatus, {
  label: string; color: string; bg: string; border: string
  icon: React.ComponentType<{ className?: string }>
}> = {
  ok:            { label: "In Stock",      color: "text-emerald-600", bg: "bg-emerald-500/10", border: "border-emerald-500/30", icon: CheckCircle2 },
  low:           { label: "Low Stock",     color: "text-amber-600",   bg: "bg-amber-500/10",   border: "border-amber-500/30",   icon: AlertTriangle },
  critical:      { label: "Critical",      color: "text-rose-600",    bg: "bg-rose-500/10",    border: "border-rose-500/30",    icon: AlertTriangle },
  expired:       { label: "Expired",       color: "text-rose-600",    bg: "bg-rose-500/10",    border: "border-rose-500/30",    icon: AlertTriangle },
  expiring_soon: { label: "Expiring Soon", color: "text-orange-600",  bg: "bg-orange-500/10",  border: "border-orange-500/30",  icon: Clock },
}

const SHIPMENT_CONFIG: Record<Shipment["status"], {
  label: string; color: string; bg: string
  icon: React.ComponentType<{ className?: string }>
}> = {
  ordered:    { label: "Ordered",    color: "text-blue-600",    bg: "bg-blue-500/10",    icon: Clock },
  in_transit: { label: "In Transit", color: "text-amber-600",   bg: "bg-amber-500/10",   icon: Truck },
  delivered:  { label: "Delivered",  color: "text-emerald-600", bg: "bg-emerald-500/10", icon: CheckCircle2 },
  delayed:    { label: "Delayed",    color: "text-rose-600",    bg: "bg-rose-500/10",    icon: AlertTriangle },
}

const CATEGORY_LABELS: Record<InventoryItem["category"], string> = {
  probiotic: "Probiotic", tube: "Blood Tubes", kit: "Assay Kits", consumable: "Consumables",
}

// ── INVENTORY TAB ─────────────────────────────────────────────────
function InventoryTab() {
  const [search, setSearch] = useState("")
  const [filterCategory, setFilterCategory] = useState<InventoryItem["category"] | "all">("all")
  const [filterStatus, setFilterStatus] = useState<StockStatus | "all">("all")
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const filtered = INVENTORY.filter(item => {
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase()) ||
                        item.batchNumber.toLowerCase().includes(search.toLowerCase())
    const matchCat    = filterCategory === "all" || item.category === filterCategory
    const matchStatus = filterStatus === "all" || item.status === filterStatus
    return matchSearch && matchCat && matchStatus
  })

  const sorted = [...filtered].sort((a, b) => {
    const order: Record<StockStatus, number> = { critical: 0, expired: 1, low: 2, expiring_soon: 3, ok: 4 }
    return order[a.status] - order[b.status]
  })

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search by name or batch number..." value={search}
            onChange={e => setSearch(e.target.value)} className="pl-9" />
        </div>
        <select value={filterCategory} onChange={e => setFilterCategory(e.target.value as any)}
          className="h-10 rounded-md border border-input bg-background px-3 text-sm">
          <option value="all">All Categories</option>
          <option value="probiotic">Probiotic</option>
          <option value="tube">Blood Tubes</option>
          <option value="kit">Assay Kits</option>
          <option value="consumable">Consumables</option>
        </select>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value as any)}
          className="h-10 rounded-md border border-input bg-background px-3 text-sm">
          <option value="all">All Statuses</option>
          <option value="ok">In Stock</option>
          <option value="low">Low Stock</option>
          <option value="critical">Critical</option>
          <option value="expiring_soon">Expiring Soon</option>
          <option value="expired">Expired</option>
        </select>
        <Button variant="outline" size="sm" className="gap-2 h-10">
          <Download className="w-4 h-4" />Export
        </Button>
      </div>

      <div className="space-y-3">
        {sorted.map(item => {
          const cfg = STATUS_CONFIG[item.status]
          const StatusIcon = cfg.icon
          const isExpanded = expandedId === item.id
          const stockPct = Math.min(100, Math.round(item.currentStock / (item.minStock * 2) * 100))

          return (
            <div key={item.id} className={cn("rounded-xl border overflow-hidden transition-all", cfg.border)}>
              <button onClick={() => setExpandedId(isExpanded ? null : item.id)}
                className="w-full flex items-center gap-4 px-5 py-4 hover:bg-muted/20 transition-colors text-left">
                <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center shrink-0", cfg.bg)}>
                  <Package className={cn("w-5 h-5", cfg.color)} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="font-semibold text-sm">{item.name}</span>
                    <Badge variant="outline" className="text-[10px]">{CATEGORY_LABELS[item.category]}</Badge>
                    <div className={cn("flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold", cfg.bg, cfg.color)}>
                      <StatusIcon className="w-3 h-3" />{cfg.label}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-muted-foreground">
                      <strong className={cn(cfg.color)}>{item.currentStock}</strong> / min {item.minStock} {item.unit}
                    </span>
                    <div className="flex-1 max-w-32 h-1.5 bg-muted rounded-full overflow-hidden">
                      <div className={cn("h-full rounded-full transition-all",
                        stockPct > 60 ? "bg-emerald-500" : stockPct > 30 ? "bg-amber-500" : "bg-rose-500"
                      )} style={{ width: `${stockPct}%` }} />
                    </div>
                  </div>
                </div>
                <div className="text-right shrink-0 hidden sm:block">
                  <p className="text-[10px] text-muted-foreground">Expiry</p>
                  <p className={cn("text-xs font-medium",
                    item.status === "expired" || item.status === "expiring_soon" ? "text-rose-500" : "text-foreground"
                  )}>{item.expiryDate}</p>
                </div>
                {isExpanded ? <ChevronUp className="w-4 h-4 text-muted-foreground shrink-0" /> :
                              <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />}
              </button>

              {isExpanded && (
                <div className="px-5 pb-5 border-t border-border bg-muted/10">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 mb-4">
                    {[
                      { label: "Batch Number", value: item.batchNumber },
                      { label: "Storage",      value: item.storageTemp },
                      { label: "Location",     value: item.location },
                      { label: "Last Updated", value: item.lastUpdated },
                    ].map((f, i) => (
                      <div key={i}>
                        <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wide mb-0.5">{f.label}</p>
                        <p className="text-xs font-medium">{f.value}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="gap-1.5 text-xs">
                      <Plus className="w-3.5 h-3.5" />Update Stock
                    </Button>
                    <Button size="sm" variant="outline" className="gap-1.5 text-xs">
                      <Truck className="w-3.5 h-3.5" />Order Restock
                    </Button>
                    {(item.status === "low" || item.status === "critical") && (
                      <Button size="sm" className="gap-1.5 text-xs ml-auto">
                        <Bell className="w-3.5 h-3.5" />Send Alert to PI
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── SHIPMENTS TAB ─────────────────────────────────────────────────
function ShipmentsTab() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">Track all incoming orders and deliveries</p>
        <Button size="sm" className="gap-2 text-xs">
          <Plus className="w-3.5 h-3.5" />New Order
        </Button>
      </div>
      <div className="space-y-3">
        {SHIPMENTS.map(shipment => {
          const cfg = SHIPMENT_CONFIG[shipment.status]
          const StatusIcon = cfg.icon
          return (
            <div key={shipment.id} className={cn(
              "rounded-xl border p-5",
              shipment.status === "delayed"   ? "border-rose-500/30 bg-rose-500/5" :
              shipment.status === "delivered" ? "border-emerald-500/30 bg-emerald-500/5" :
              "border-border bg-card"
            )}>
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-start gap-3">
                  <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center shrink-0", cfg.bg)}>
                    <StatusIcon className={cn("w-4 h-4", cfg.color)} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs font-mono text-muted-foreground">{shipment.id}</span>
                      <div className={cn("px-2 py-0.5 rounded-full text-[10px] font-semibold", cfg.bg, cfg.color)}>
                        {cfg.label}
                      </div>
                    </div>
                    <p className="font-semibold text-sm">{shipment.description}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Supplier: {shipment.supplier}</p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[10px] text-muted-foreground">Expected</p>
                  <p className={cn("text-xs font-semibold",
                    shipment.status === "delayed" ? "text-rose-500" : "text-foreground"
                  )}>{shipment.expectedDate}</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: "Order Date", value: shipment.orderDate },
                  { label: "Quantity",   value: shipment.quantity },
                  { label: "Tracking",   value: shipment.trackingCode || "—" },
                ].map((f, i) => (
                  <div key={i}>
                    <p className="text-[10px] text-muted-foreground">{f.label}</p>
                    <p className="text-xs font-medium font-mono">{f.value}</p>
                  </div>
                ))}
              </div>
              {shipment.status === "delayed" && (
                <div className="mt-3 flex gap-2">
                  <Button size="sm" variant="outline" className="gap-1.5 text-xs text-rose-500">
                    <Bell className="w-3.5 h-3.5" />Chase Supplier
                  </Button>
                  <Button size="sm" variant="outline" className="gap-1.5 text-xs">
                    <RefreshCw className="w-3.5 h-3.5" />Update Status
                  </Button>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── ALERTS TAB ────────────────────────────────────────────────────
function AlertsTab() {
  const [showResolved, setShowResolved] = useState(false)
  const filtered = ALERTS.filter(a => showResolved ? true : !a.resolved)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {filtered.filter(a => !a.resolved).length} active alert{filtered.filter(a => !a.resolved).length !== 1 ? "s" : ""}
        </p>
        <Button variant={showResolved ? "default" : "outline"} size="sm"
          onClick={() => setShowResolved(!showResolved)} className="gap-2 text-xs">
          <CheckCircle2 className="w-3.5 h-3.5" />
          {showResolved ? "Hide Resolved" : "Show Resolved"}
        </Button>
      </div>
      <div className="space-y-3">
        {filtered.map(alert => (
          <div key={alert.id} className={cn(
            "rounded-xl border p-4 flex items-start gap-4",
            alert.resolved ? "opacity-60 border-border" :
            alert.severity === "critical" ? "border-rose-500/30 bg-rose-500/5" :
            alert.severity === "warning"  ? "border-amber-500/30 bg-amber-500/5" :
                                            "border-border bg-muted/20"
          )}>
            <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center shrink-0",
              alert.severity === "critical" ? "bg-rose-500/20" :
              alert.severity === "warning"  ? "bg-amber-500/20" : "bg-primary/10"
            )}>
              <AlertTriangle className={cn("w-4 h-4",
                alert.severity === "critical" ? "text-rose-500" :
                alert.severity === "warning"  ? "text-amber-500" : "text-primary"
              )} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className="font-semibold text-sm">{alert.itemName}</span>
                <Badge variant={alert.severity === "critical" ? "destructive" :
                  alert.severity === "warning" ? "secondary" : "outline"} className="text-[10px]">
                  {alert.severity === "critical" ? "Critical" : alert.severity === "warning" ? "Warning" : "Info"}
                </Badge>
                {alert.resolved && (
                  <Badge variant="outline" className="text-[10px] text-emerald-600">Resolved</Badge>
                )}
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{alert.message}</p>
              <p className="text-[10px] text-muted-foreground mt-1">{alert.date}</p>
            </div>
            {!alert.resolved && (
              <Button size="sm" variant="outline" className="text-xs shrink-0 gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />Resolve
              </Button>
            )}
          </div>
        ))}
      </div>
      <div className="rounded-xl border border-border bg-muted/20 p-4">
        <div className="flex items-center gap-2 mb-3">
          <Bell className="w-4 h-4 text-primary" />
          <p className="text-xs font-semibold">Automatic Alert Settings</p>
        </div>
        <div className="space-y-2">
          {[
            { label: "Stock below minimum threshold",    enabled: true },
            { label: "Expiry within 60 days",            enabled: true },
            { label: "Shipment delayed beyond expected", enabled: true },
            { label: "Temperature excursion detected",   enabled: false },
          ].map((setting, i) => (
            <div key={i} className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{setting.label}</span>
              <div className={cn("w-8 h-4 rounded-full flex items-center transition-all cursor-pointer",
                setting.enabled ? "bg-primary justify-end pr-0.5" : "bg-muted justify-start pl-0.5"
              )}>
                <div className="w-3 h-3 rounded-full bg-white shadow-sm" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── AI AGENT TAB ──────────────────────────────────────────────────
interface Draft {
  itemName: string
  category: InventoryItem["category"]
  emailSubject: string
  emailBody: string
  smsText: string
  supplier: typeof SUPPLIERS[string]
  severity: "critical" | "warning"
}

function generateDrafts(): Draft[] {
  const criticalItems = INVENTORY.filter(i => i.status === "critical" || i.status === "low" || i.status === "expiring_soon")
  return criticalItems.map(item => {
    const supplier = SUPPLIERS[item.category]
    const isCritical = item.status === "critical"
    const isExpiring = item.status === "expiring_soon"
    const shortage = item.minStock - item.currentStock
    const orderQty = Math.ceil(item.minStock * 2)

    const emailSubject = isCritical
      ? `URGENT: Emergency Restock Request — ${item.name}`
      : isExpiring
        ? `Advance Reorder Required — ${item.name} Expiring Soon`
        : `Restock Request — ${item.name}`

    const emailBody = `Dear ${supplier.contactPerson},

I am writing on behalf of the NEBix Clinical Trial team at IRCCS Santa Lucia Foundation, Rome.

${isCritical
  ? `We have a CRITICAL stock shortage of ${item.name} (Batch: ${item.batchNumber}). Current stock: ${item.currentStock} ${item.unit} — minimum required: ${item.minStock} ${item.unit}. This is urgently impacting our trial operations.`
  : isExpiring
    ? `We need to place an advance reorder for ${item.name} (Batch: ${item.batchNumber}), which is due to expire on ${item.expiryDate}. We would like to ensure continuity of supply before expiry.`
    : `Our stock of ${item.name} (Batch: ${item.batchNumber}) has fallen below the minimum threshold. Current stock: ${item.currentStock} ${item.unit} — minimum required: ${item.minStock} ${item.unit}.`
}

We would like to place an order for ${orderQty} ${item.unit} as soon as possible.

Could you please confirm:
1. Availability and lead time
2. Current pricing for ${orderQty} ${item.unit}
3. Expected delivery date to Rome, Italy

Our delivery address:
IRCCS Santa Lucia Foundation
Via Ardeatina 306, 00179 Rome, Italy
Attn: Trial Logistics — NEBix KABP052

Please reply to this email or contact the PI directly at ${PI_EMAIL}.

Thank you for your prompt assistance.

Kind regards,
NEBix Trial Management Team
IRCCS Santa Lucia Foundation, Rome`

    const smsText = isCritical
      ? `🚨 URGENT NEBix Trial: Critical stock shortage — ${item.name}. Only ${item.currentStock} ${item.unit} remaining (min: ${item.minStock}). Please confirm emergency delivery ASAP. Contact: ${PI_EMAIL}`
      : isExpiring
        ? `⚠️ NEBix Trial: ${item.name} expiring ${item.expiryDate}. Please arrange reorder of ${orderQty} ${item.unit}. Contact: ${PI_EMAIL}`
        : `⚠️ NEBix Trial: Low stock alert — ${item.name}. ${item.currentStock}/${item.minStock} ${item.unit} remaining. Order of ${orderQty} units needed. Contact: ${PI_EMAIL}`

    return {
      itemName: item.name,
      category: item.category,
      emailSubject,
      emailBody,
      smsText,
      supplier,
      severity: isCritical ? "critical" : "warning"
    }
  })
}

function AIAgentTab() {
  const [drafts] = useState<Draft[]>(generateDrafts())
  const [selectedDraft, setSelectedDraft] = useState<Draft | null>(null)
  const [activeView, setActiveView] = useState<"email" | "sms">("email")
  const [sent, setSent] = useState<string[]>([])
  const [copied, setCopied] = useState(false)

  const handleSend = (draftName: string) => {
    setSent(prev => [...prev, draftName])
    setSelectedDraft(null)
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-5">

      {/* Header */}
      <div className="rounded-xl border border-primary/30 bg-primary/5 p-4 flex items-start gap-3">
        <div className="w-9 h-9 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
          <Bot className="w-5 h-5 text-primary" />
        </div>
        <div>
          <p className="font-semibold text-sm mb-0.5">AI Inventory Agent</p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            The AI agent has analysed your current inventory and automatically generated reorder communications for all items below threshold or expiring soon. Review each draft and send with one click.
          </p>
        </div>
        <div className="shrink-0">
          <Badge variant="secondary" className="text-xs gap-1">
            <Sparkles className="w-3 h-3" />
            {drafts.length} drafts ready
          </Badge>
        </div>
      </div>

      {/* PI Contact info box */}
      <div className="rounded-xl border border-border bg-muted/20 p-4">
        <div className="flex items-center gap-2 mb-2">
          <Info className="w-4 h-4 text-muted-foreground" />
          <p className="text-xs font-semibold">Your Contact Details in Outgoing Messages</p>
        </div>
        <div className="flex gap-6">
          <div>
            <p className="text-[10px] text-muted-foreground">PI Phone (SMS sender)</p>
            {/* ↓↓↓ IL TUO NUMERO APPARE QUI ↓↓↓ */}
            <p className="text-xs font-mono font-semibold">{PI_PHONE}</p>
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground">PI Email</p>
            <p className="text-xs font-mono font-semibold">{PI_EMAIL}</p>
          </div>
        </div>
        <p className="text-[10px] text-muted-foreground mt-2">
          To update these details, change <code className="bg-muted px-1 rounded">PI_PHONE</code> and <code className="bg-muted px-1 rounded">PI_EMAIL</code> at the top of <code className="bg-muted px-1 rounded">inventory-manager.tsx</code>
        </p>
      </div>

      {/* Draft list */}
      {!selectedDraft ? (
        <div className="space-y-3">
          <p className="text-sm font-semibold">Items requiring action ({drafts.length})</p>
          {drafts.map((draft, i) => (
            <div key={i} className={cn(
              "rounded-xl border p-4 flex items-center gap-4",
              draft.severity === "critical" ? "border-rose-500/30 bg-rose-500/5" : "border-amber-500/30 bg-amber-500/5"
            )}>
              <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center shrink-0",
                draft.severity === "critical" ? "bg-rose-500/20" : "bg-amber-500/20"
              )}>
                <Package className={cn("w-4 h-4",
                  draft.severity === "critical" ? "text-rose-500" : "text-amber-500"
                )} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="font-semibold text-sm truncate">{draft.itemName}</p>
                  <Badge variant={draft.severity === "critical" ? "destructive" : "secondary"} className="text-[10px] shrink-0">
                    {draft.severity === "critical" ? "Critical" : "Warning"}
                  </Badge>
                  {sent.includes(draft.itemName) && (
                    <Badge variant="outline" className="text-[10px] text-emerald-600 shrink-0">Sent ✓</Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">Supplier: {draft.supplier.name} · {draft.supplier.email}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <Button size="sm" variant="outline" className="gap-1.5 text-xs"
                  onClick={() => { setSelectedDraft(draft); setActiveView("email") }}>
                  <Mail className="w-3.5 h-3.5" />Email
                </Button>
                <Button size="sm" variant="outline" className="gap-1.5 text-xs"
                  onClick={() => { setSelectedDraft(draft); setActiveView("sms") }}>
                  <MessageSquare className="w-3.5 h-3.5" />SMS
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Draft detail view */
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={() => setSelectedDraft(null)} className="gap-1.5">
              <X className="w-3.5 h-3.5" />Back
            </Button>
            <h3 className="font-semibold text-sm">{selectedDraft.itemName}</h3>
          </div>

          {/* Email / SMS toggle */}
          <div className="flex gap-2 p-1 bg-muted rounded-xl w-fit">
            <button onClick={() => setActiveView("email")}
              className={cn("flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                activeView === "email" ? "bg-background shadow-sm" : "text-muted-foreground hover:text-foreground"
              )}>
              <Mail className="w-4 h-4" />Email to Supplier
            </button>
            <button onClick={() => setActiveView("sms")}
              className={cn("flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                activeView === "sms" ? "bg-background shadow-sm" : "text-muted-foreground hover:text-foreground"
              )}>
              <Phone className="w-4 h-4" />SMS to PI
            </button>
          </div>

          {/* Supplier info */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Supplier",        value: selectedDraft.supplier.name },
              { label: "Contact",         value: selectedDraft.supplier.contactPerson },
              { label: "Email",           value: selectedDraft.supplier.email },
              { label: "Phone",           value: selectedDraft.supplier.phone },
            ].map((f, i) => (
              <div key={i} className="p-3 rounded-xl border border-border bg-muted/20">
                <p className="text-[10px] text-muted-foreground mb-0.5">{f.label}</p>
                <p className="text-xs font-medium">{f.value}</p>
              </div>
            ))}
          </div>

          {/* EMAIL DRAFT */}
          {activeView === "email" && (
            <div className="space-y-3">
              <div className="rounded-xl border border-border bg-card overflow-hidden">
                <div className="px-4 py-3 border-b border-border bg-muted/20 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-primary" />
                    <span className="text-xs font-semibold">Email Draft — AI Generated</span>
                  </div>
                  <Badge variant="outline" className="text-[10px] gap-1">
                    <Sparkles className="w-3 h-3" />AI Draft
                  </Badge>
                </div>
                <div className="p-4 space-y-3">
                  <div>
                    <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wide mb-1">To</p>
                    <p className="text-xs font-mono">{selectedDraft.supplier.email}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wide mb-1">Subject</p>
                    <p className="text-xs font-semibold">{selectedDraft.emailSubject}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wide mb-1">Body</p>
                    <div className="bg-muted/30 rounded-lg p-3 max-h-64 overflow-y-auto">
                      <pre className="text-xs text-foreground/80 whitespace-pre-wrap font-sans leading-relaxed">
                        {selectedDraft.emailBody}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="gap-2 text-xs" onClick={() => handleCopy(selectedDraft.emailBody)}>
                  <Copy className="w-3.5 h-3.5" />
                  {copied ? "Copied!" : "Copy Email"}
                </Button>
                <Button className="gap-2 text-xs flex-1" onClick={() => handleSend(selectedDraft.itemName)}>
                  <Send className="w-3.5 h-3.5" />
                  Send Email to {selectedDraft.supplier.name}
                </Button>
              </div>
            </div>
          )}

          {/* SMS DRAFT */}
          {activeView === "sms" && (
            <div className="space-y-3">
              <div className="rounded-xl border border-border bg-card overflow-hidden">
                <div className="px-4 py-3 border-b border-border bg-muted/20 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-primary" />
                    <span className="text-xs font-semibold">SMS Draft — to PI / Researcher</span>
                  </div>
                  <Badge variant="outline" className="text-[10px] gap-1">
                    <Sparkles className="w-3 h-3" />AI Draft
                  </Badge>
                </div>
                <div className="p-4 space-y-3">
                  <div>
                    {/* ↓↓↓ QUI APPARE IL TUO NUMERO ↓↓↓ */}
                    <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wide mb-1">To (PI Phone)</p>
                    <p className="text-xs font-mono font-semibold">{PI_PHONE}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wide mb-1">Message</p>
                    <div className="bg-muted/30 rounded-lg p-4">
                      <p className="text-sm leading-relaxed">{selectedDraft.smsText}</p>
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-1">
                      {selectedDraft.smsText.length} characters
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="gap-2 text-xs" onClick={() => handleCopy(selectedDraft.smsText)}>
                  <Copy className="w-3.5 h-3.5" />
                  {copied ? "Copied!" : "Copy SMS"}
                </Button>
                <Button className="gap-2 text-xs flex-1" onClick={() => handleSend(selectedDraft.itemName)}>
                  <Send className="w-3.5 h-3.5" />
                  Send SMS to {PI_PHONE}
                </Button>
              </div>
              <div className="flex items-start gap-2 p-3 rounded-xl border border-amber-500/30 bg-amber-500/5">
                <Info className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <p className="text-xs text-muted-foreground">
                  SMS sending requires Twilio integration. For now, copy the message and send manually, or use the Copy button above.
                  To enable real SMS, add your Twilio credentials to the environment variables.
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ── MAIN COMPONENT ────────────────────────────────────────────────
export function InventoryManager() {
  const [activeTab, setActiveTab] = useState<TabId>("inventory")

  const criticalCount  = INVENTORY.filter(i => i.status === "critical" || i.status === "expired").length
  const lowCount       = INVENTORY.filter(i => i.status === "low").length
  const expiringCount  = INVENTORY.filter(i => i.status === "expiring_soon").length
  const inTransitCount = SHIPMENTS.filter(s => s.status === "in_transit" || s.status === "ordered").length
  const activeAlerts   = ALERTS.filter(a => !a.resolved).length

  const tabs: { id: TabId; label: string; icon: React.ComponentType<{ className?: string }>; badge?: number }[] = [
    { id: "inventory",  label: "Inventory",  icon: Package,       badge: criticalCount + lowCount },
    { id: "shipments",  label: "Shipments",  icon: Truck,         badge: inTransitCount },
    { id: "alerts",     label: "Alerts",     icon: Bell,          badge: activeAlerts },
    { id: "ai_agent",   label: "AI Agent",   icon: Bot,           badge: criticalCount + lowCount },
  ]

  return (
    <div className="space-y-6">

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Critical / Expired", value: criticalCount,  icon: AlertTriangle, color: "text-rose-500",   bg: "bg-rose-500/5" },
          { label: "Low Stock",          value: lowCount,       icon: ArrowDown,     color: "text-amber-500",  bg: "bg-amber-500/5" },
          { label: "Expiring Soon",      value: expiringCount,  icon: Clock,         color: "text-orange-500", bg: "bg-orange-500/5" },
          { label: "Orders in Transit",  value: inTransitCount, icon: Truck,         color: "text-blue-500",   bg: "bg-blue-500/5" },
        ].map((s, i) => {
          const Icon = s.icon
          return (
            <div key={i} className={cn("rounded-xl border border-border p-5 flex items-center gap-4", s.bg)}>
              <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center bg-background/60", s.color)}>
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
                )}>{tab.badge}</span>
              ) : null}
            </button>
          )
        })}
      </div>

      {activeTab === "inventory" && <InventoryTab />}
      {activeTab === "shipments" && <ShipmentsTab />}
      {activeTab === "alerts"    && <AlertsTab />}
      {activeTab === "ai_agent"  && <AIAgentTab />}
    </div>
  )
}
