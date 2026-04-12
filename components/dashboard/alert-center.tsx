"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  AlertTriangle, 
  Pill, 
  Moon, 
  Brain, 
  Utensils,
  Activity,
  Clock,
  CheckCircle2
} from "lucide-react"
import { cn } from "@/lib/utils"

const alerts = [
  {
    id: 1,
    type: "antibiotic",
    patient: "EM-002",
    title: "Antibiotic Intake Detected",
    description: "Patient reported taking Amoxicillin. Estrobolome may be affected.",
    time: "4 hours ago",
    severity: "critical",
    icon: Pill
  },
  {
    id: 2,
    type: "stress",
    patient: "EM-004",
    title: "High Stress Reported",
    description: "Stress level 8/10 reported. Cortisol may impact estrogen levels.",
    time: "6 hours ago",
    severity: "warning",
    icon: Brain
  },
  {
    id: 3,
    type: "sleep",
    patient: "EM-005",
    title: "Sleep Disruption",
    description: "Only 4 hours of sleep reported. May affect cognitive assessment.",
    time: "8 hours ago",
    severity: "warning",
    icon: Moon
  },
  {
    id: 4,
    type: "adherence",
    patient: "EM-005",
    title: "Missed Probiotic Dose",
    description: "KABP052 dose missed for 2 consecutive days.",
    time: "12 hours ago",
    severity: "critical",
    icon: Activity
  },
  {
    id: 5,
    type: "diet",
    patient: "EM-002",
    title: "Dietary Deviation",
    description: "High sugar intake reported, may affect gut microbiome composition.",
    time: "1 day ago",
    severity: "info",
    icon: Utensils
  }
]

function getSeverityStyles(severity: string) {
  switch (severity) {
    case "critical":
      return {
        bg: "bg-destructive/10 hover:bg-destructive/15 border-destructive/20",
        icon: "text-destructive bg-destructive/20",
        badge: "bg-destructive/10 text-destructive border-destructive/20"
      }
    case "warning":
      return {
        bg: "bg-amber-500/10 hover:bg-amber-500/15 border-amber-500/20",
        icon: "text-amber-600 bg-amber-500/20",
        badge: "bg-amber-500/10 text-amber-600 border-amber-500/20"
      }
    case "info":
      return {
        bg: "bg-secondary/10 hover:bg-secondary/15 border-secondary/20",
        icon: "text-secondary bg-secondary/20",
        badge: "bg-secondary/10 text-secondary border-secondary/20"
      }
    default:
      return {
        bg: "bg-muted hover:bg-muted/80 border-border",
        icon: "text-muted-foreground bg-muted",
        badge: "bg-muted text-muted-foreground border-border"
      }
  }
}

interface AlertCenterProps {
  expanded?: boolean
}

export function AlertCenter({ expanded = false }: AlertCenterProps) {
  return (
    <Card className="border-border/50 shadow-sm h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-destructive/10">
            <AlertTriangle className="w-4 h-4 text-destructive" />
          </div>
          <div>
            <CardTitle className="text-base font-semibold">Red Flag Alerts</CardTitle>
            <p className="text-xs text-muted-foreground">{alerts.length} active alerts</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" className="text-xs">
          <CheckCircle2 className="w-3 h-3 mr-1" />
          Mark All Read
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className={expanded ? "h-[600px]" : "h-[400px]"}>
          <div className="px-4 pb-4 space-y-3">
            {alerts.map((alert) => {
              const styles = getSeverityStyles(alert.severity)
              return (
                <div
                  key={alert.id}
                  className={cn(
                    "p-4 rounded-xl border cursor-pointer transition-all duration-200",
                    styles.bg
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div className={cn("p-2 rounded-lg", styles.icon)}>
                      <alert.icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="font-medium text-sm truncate">{alert.title}</span>
                        <Badge variant="outline" className={cn("text-[10px] shrink-0", styles.badge)}>
                          {alert.patient}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                        {alert.description}
                      </p>
                      <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {alert.time}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
