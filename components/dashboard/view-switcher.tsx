"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MonitorDot, Smartphone, BarChart3, Home } from "lucide-react"
import { Button } from "@/components/ui/button"

type AppView = "splash" | "clinician" | "patient" | "biomarkers"

interface ViewSwitcherProps {
  currentView: AppView
  onViewChange: (view: AppView) => void
}

export function ViewSwitcher({ currentView, onViewChange }: ViewSwitcherProps) {
  return (
    <div className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 py-3 border-b border-border bg-background/95 backdrop-blur-sm">
      {/* Back to NEBix Home */}
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={() => onViewChange("splash")}
        className="gap-2 text-muted-foreground hover:text-foreground"
      >
        <Home className="w-4 h-4" />
        <span className="hidden sm:inline">NEBix</span>
      </Button>

      {/* View Tabs */}
      <Tabs value={currentView} onValueChange={(v) => onViewChange(v as AppView)}>
        <TabsList className="h-9">
          <TabsTrigger value="clinician" className="gap-2 px-3 text-xs sm:text-sm">
            <MonitorDot className="w-4 h-4" />
            <span className="hidden sm:inline">Clinician</span>
          </TabsTrigger>
          <TabsTrigger value="biomarkers" className="gap-2 px-3 text-xs sm:text-sm">
            <BarChart3 className="w-4 h-4" />
            <span className="hidden sm:inline">Analytics</span>
          </TabsTrigger>
          <TabsTrigger value="patient" className="gap-2 px-3 text-xs sm:text-sm">
            <Smartphone className="w-4 h-4" />
            <span className="hidden sm:inline">Patient</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Spacer for balance */}
      <div className="w-20" />
    </div>
  )
}
