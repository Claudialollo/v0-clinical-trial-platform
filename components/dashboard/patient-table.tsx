"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Eye, MessageSquare, FlaskConical, AlertTriangle, Pill } from "lucide-react"
import { cn } from "@/lib/utils"

const patients = [
  {
    id: "EM-001",
    name: "Patient Alpha",
    progress: 78,
    adherence: 94,
    lastEvent: "Completed MoCA Test",
    lastEventTime: "2 hours ago",
    status: "active",
    alerts: []
  },
  {
    id: "EM-002", 
    name: "Patient Beta",
    progress: 45,
    adherence: 67,
    lastEvent: "Antibiotic Intake Detected",
    lastEventTime: "4 hours ago",
    status: "flagged",
    alerts: ["antibiotic"]
  },
  {
    id: "EM-003",
    name: "Patient Gamma",
    progress: 92,
    adherence: 98,
    lastEvent: "Blood Sample Collected",
    lastEventTime: "1 day ago",
    status: "active",
    alerts: []
  },
  {
    id: "EM-004",
    name: "Patient Delta",
    progress: 34,
    adherence: 72,
    lastEvent: "High Stress Reported",
    lastEventTime: "6 hours ago",
    status: "attention",
    alerts: ["stress"]
  },
  {
    id: "EM-005",
    name: "Patient Epsilon",
    progress: 56,
    adherence: 45,
    lastEvent: "Missed Probiotic Dose",
    lastEventTime: "12 hours ago",
    status: "flagged",
    alerts: ["adherence"]
  },
  {
    id: "EM-006",
    name: "Patient Zeta",
    progress: 88,
    adherence: 91,
    lastEvent: "Sleep Log Submitted",
    lastEventTime: "3 hours ago",
    status: "active",
    alerts: []
  },
]

function getStatusBadge(status: string) {
  switch (status) {
    case "active":
      return <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">Active</Badge>
    case "flagged":
      return <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">Flagged</Badge>
    case "attention":
      return <Badge variant="outline" className="bg-amber-500/10 text-amber-600 border-amber-500/20">Attention</Badge>
    default:
      return <Badge variant="outline">Unknown</Badge>
  }
}

function getAdherenceColor(adherence: number) {
  if (adherence >= 90) return "text-emerald-600"
  if (adherence >= 70) return "text-amber-600"
  return "text-destructive"
}

export function PatientTable() {
  return (
    <Card className="border-border/50 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg font-semibold">Patient Management</CardTitle>
          <CardDescription>Monitor trial participants and their progress</CardDescription>
        </div>
        <Button size="sm" className="bg-primary hover:bg-primary/90">
          <FlaskConical className="w-4 h-4 mr-2" />
          Deploy Test
        </Button>
      </CardHeader>
      <CardContent>
        <div className="rounded-xl border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                <TableHead className="font-semibold">Patient ID</TableHead>
                <TableHead className="font-semibold">Trial Progress</TableHead>
                <TableHead className="font-semibold">Adherence</TableHead>
                <TableHead className="font-semibold">Last Event</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {patients.map((patient) => (
                <TableRow 
                  key={patient.id} 
                  className={cn(
                    "transition-colors",
                    patient.status === "flagged" && "bg-destructive/5 hover:bg-destructive/10",
                    patient.status === "attention" && "bg-amber-500/5 hover:bg-amber-500/10"
                  )}
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary font-mono text-xs font-bold">
                        {patient.id.split("-")[1]}
                      </div>
                      <div>
                        <span className="font-medium">{patient.id}</span>
                        {patient.alerts.includes("antibiotic") && (
                          <Pill className="inline w-3 h-3 ml-2 text-amber-500" />
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3 min-w-[180px]">
                      <Progress value={patient.progress} className="h-2 flex-1" />
                      <span className="text-sm font-medium w-10">{patient.progress}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={cn("font-bold", getAdherenceColor(patient.adherence))}>
                      {patient.adherence}%
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-sm flex items-center gap-2">
                        {patient.alerts.length > 0 && (
                          <AlertTriangle className="w-3 h-3 text-amber-500" />
                        )}
                        {patient.lastEvent}
                      </span>
                      <span className="text-xs text-muted-foreground">{patient.lastEventTime}</span>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(patient.status)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Send Message
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <FlaskConical className="w-4 h-4 mr-2" />
                          Deploy Test
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
