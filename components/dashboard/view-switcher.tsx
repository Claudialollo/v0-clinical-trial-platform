"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MonitorDot, Smartphone, BarChart3 } from "lucide-react"

interface ViewSwitcherProps {
  currentView: "clinician" | "patient" | "biomarkers"
  onViewChange: (view: "clinician" | "patient" | "biomarkers") => void
}

export function ViewSwitcher({ currentView, onViewChange }: ViewSwitcherProps) {
  return (
    <div className="flex items-center justify-center py-4 border-b border-border bg-muted/30">
      <Tabs value={currentView} onValueChange={(v) => onViewChange(v as "clinician" | "patient" | "biomarkers")}>
        <TabsList className="h-10">
          <TabsTrigger value="clinician" className="gap-2 px-4">
            <MonitorDot className="w-4 h-4" />
            <span className="hidden sm:inline">Clinician Dashboard</span>
            <span className="sm:hidden">Clinician</span>
          </TabsTrigger>
          <TabsTrigger value="biomarkers" className="gap-2 px-4">
            <BarChart3 className="w-4 h-4" />
            <span className="hidden sm:inline">Biomarker Analytics</span>
            <span className="sm:hidden">Analytics</span>
          </TabsTrigger>
          <TabsTrigger value="patient" className="gap-2 px-4">
            <Smartphone className="w-4 h-4" />
            <span className="hidden sm:inline">Patient App</span>
            <span className="sm:hidden">Patient</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )
}
