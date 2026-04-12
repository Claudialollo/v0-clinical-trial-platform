"use client"

import { Shield, Lock, FileCheck } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30 py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Compliance Badges */}
          <div className="flex items-center gap-3">
            <Badge 
              variant="outline" 
              className="h-8 gap-2 bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
            >
              <Shield className="w-4 h-4" />
              HIPAA Compliant
            </Badge>
            <Badge 
              variant="outline" 
              className="h-8 gap-2 bg-secondary/10 text-secondary border-secondary/20"
            >
              <Lock className="w-4 h-4" />
              GDPR Ready
            </Badge>
            <Badge 
              variant="outline" 
              className="h-8 gap-2 bg-primary/10 text-primary border-primary/20"
            >
              <FileCheck className="w-4 h-4" />
              FDA 21 CFR Part 11
            </Badge>
          </div>

          {/* Copyright */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>EstroMind Clinical Trial Platform</span>
            <span className="hidden md:inline">|</span>
            <span>Version 2.1.0</span>
            <span className="hidden md:inline">|</span>
            <span>2026 Research Institute</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
