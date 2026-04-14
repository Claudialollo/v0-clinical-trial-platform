"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  Brain, Calendar, Check, Clock, Heart, Moon, Utensils, Activity, 
  Pill, ChevronRight, Shield, Sparkles 
} from "lucide-react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

// Protocol Tracker (invariato)
function ProtocolTracker() {
  const probioticProgress = 85
  const daysUntilAppointment = 12

  return (
    <div className="space-y-4">
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/20">
                <Pill className="w-4 h-4 text-primary" />
              </div>
              <span className="font-medium text-sm">KABP052 Intake</span>
            </div>
            <Badge variant="outline" className="text-xs bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
              On Track
            </Badge>
          </div>
          <div className="flex items-center justify-center py-4">
            <div className="relative w-32 h-32">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="64" cy="64" r="56" fill="none" stroke="hsl(var(--border))" strokeWidth="8" />
                <circle 
                  cx="64" cy="64" r="56" fill="none" 
                  stroke="hsl(var(--primary))" strokeWidth="8" strokeLinecap="round"
                  strokeDasharray={`${probioticProgress * 3.52} 352`} 
                  className="transition-all duration-500" 
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-primary">{probioticProgress}%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Brain Constellation - Versione Vercel-safe
function BrainConstellation() {
  const [completedTimepoints, setCompletedTimepoints] = useState(3)
  const [isClient, setIsClient] = useState(false)
  const maxTimepoints = 5

  const timepoints = [
    { id: 1, label: "Baseline", x: 65, y: 78 },
    { id: 2, label: "W4",       x: 110, y: 42 },
    { id: 3, label: "W8",       x: 175, y: 38 },
    { id: 4, label: "W12",      x: 225, y: 78 },
    { id: 5, label: "Fine",     x: 155, y: 135 },
  ]

  const connections = [[1,2], [2,3], [3,4], [4,5], [1,5]]

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    // Placeholder durante SSR per evitare hydration mismatch
    return (
      <Card className="border-primary/30 bg-gradient-to-br from-violet-500/5 to-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Brain className="w-6 h-6" /> Costellazione del Cervello
          </CardTitle>
        </CardHeader>
        <CardContent className="h-[220px] flex items-center justify-center">
          <div className="text-muted-foreground">Caricamento costellazione...</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-primary/30 bg-gradient-to-br from-violet-500/5 via-blue-500/5 to-transparent shadow-inner">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Brain className="w-6 h-6 text-primary" />
            <div>
              <CardTitle className="text-lg">Costellazione del Cervello</CardTitle>
              <CardDescription>Illumina il tuo percorso nel trial</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/30 text-sm px-3">
            {completedTimepoints}/{maxTimepoints} illuminate
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pt-2">
        <div className="relative mx-auto" style={{ width: 280, height: 180 }}>
          <svg 
            width="280" 
            height="180" 
            viewBox="0 0 280 180" 
            className="overflow-visible"
            suppressHydrationWarning
          >
            {/* Sfondo cervello tenue */}
            <path
              d="M40 60 Q20 90 40 120 Q70 150 110 140 Q140 160 170 140 Q210 150 240 120 Q260 90 240 60 Q210 30 170 40 Q140 20 110 40 Q70 30 40 60 Z"
              fill="none"
              stroke="#e5e5e5"
              strokeWidth="26"
              strokeLinejoin="round"
              opacity="0.25"
            />

            {/* Connessioni */}
            {connections.map(([a, b], i) => {
              const nodeA = timepoints.find(n => n.id === a)!
              const nodeB = timepoints.find(n => n.id === b)!
              const isLit = completedTimepoints >= Math.max(a, b)
              return (
                <line
                  key={i}
                  x1={nodeA.x} y1={nodeA.y}
                  x2={nodeB.x} y2={nodeB.y}
                  stroke={isLit ? "#4C1D95" : "#d1d5db"}
                  strokeWidth="3.5"
                  strokeDasharray={isLit ? "none" : "3 3"}
                  className={isLit ? "transition-all duration-700" : ""}
                />
              )
            })}

            {/* Nodi (stelle) */}
            {timepoints.map((node) => {
              const isLit = completedTimepoints >= node.id
              return (
                <g key={node.id}>
                  {isLit && (
                    <circle 
                      cx={node.x} 
                      cy={node.y} 
                      r="18" 
                      fill="#2563EB" 
                      opacity="0.25" 
                    />
                  )}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r="11"
                    fill={isLit ? "#4C1D95" : "#9ca3af"}
                    className={cn(isLit && "transition-all duration-300")}
                    style={isLit ? { filter: "drop-shadow(0 0 8px #4C1D95)" } : {}}
                  />
                  <text
                    x={node.x}
                    y={node.y + 29}
                    textAnchor="middle"
                    fill={isLit ? "#4C1D95" : "#6b7280"}
                    fontSize="9.5"
                    fontWeight={500}
                  >
                    {node.label}
                  </text>
                </g>
              )
            })}
          </svg>
        </div>

        <div className="flex justify-center mt-8">
          <Button
            onClick={() => setCompletedTimepoints(prev => Math.min(prev + 1, maxTimepoints))}
            disabled={completedTimepoints >= maxTimepoints}
            className="gap-2 bg-gradient-to-r from-primary to-secondary hover:brightness-110"
          >
            <Sparkles className="w-4 h-4" />
            {completedTimepoints >= maxTimepoints 
              ? "🎉 Trial completato!" 
              : "Completa prossimo timepoint"}
          </Button>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-4">
          Ogni timepoint completato illumina una nuova regione della tua costellazione cerebrale
        </p>
      </CardContent>
    </Card>
  )
}

// Patient App principale
export function PatientApp() {
  return (
    <div className="min-h-screen bg-background p-6 space-y-8 max-w-lg mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Ciao, EM-002 👋</h1>
          <p className="text-muted-foreground">KABP052 • Timepoint corrente: W8</p>
        </div>
        <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600">87% adherence</Badge>
      </div>

      <ProtocolTracker />
      <BrainConstellation />

      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Calendar className="w-8 h-8 mx-auto text-primary mb-2" />
            <div className="text-sm font-medium">Prossimo appuntamento</div>
            <div className="text-2xl font-bold text-primary">12 giorni</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Heart className="w-8 h-8 mx-auto text-secondary mb-2" />
            <div className="text-sm font-medium">Ultimo check-in</div>
            <div className="text-2xl font-bold">Oggi</div>
          </CardContent>
        </Card>
      </div>

      <div className="text-center text-xs text-muted-foreground py-6 border-t">
        EstroMind Patient App • v2.1.0
      </div>
    </div>
  )
}
