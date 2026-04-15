"use client"

import { cn } from "@/lib/utils"
import { 
  LayoutDashboard, 
  Users, 
  Bell, 
  LineChart, 
  MessageSquare, 
  Settings,
  FlaskConical,
  Brain,
  Shield,
  FileCheck
} from "lucide-react"

type SidebarSection = "dashboard" | "patients" | "alerts" | "biomarkers" | "tests" | "communications" | "regulatory" | "settings"

interface SidebarProps {
  activeSection?: SidebarSection
  onSectionChange?: (section: SidebarSection) => void
}

const navigation: { name: string; id: SidebarSection; icon: React.ComponentType<{ className?: string }> }[] = [
  { name: "Dashboard",        id: "dashboard",     icon: LayoutDashboard },
  { name: "Patients",         id: "patients",      icon: Users },
  { name: "Alerts",           id: "alerts",        icon: Bell },
  { name: "Biomarkers",       id: "biomarkers",    icon: LineChart },
  { name: "Test Deployer",    id: "tests",         icon: FlaskConical },
  { name: "Communications",   id: "communications",icon: MessageSquare },
  { name: "Regulatory Docs",  id: "regulatory",    icon: FileCheck },
  { name: "Settings",         id: "settings",      icon: Settings },
]

export function Sidebar({ activeSection = "dashboard", onSectionChange }: SidebarProps) {
  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-sidebar mt-12">
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-6 border-b border-sidebar-border">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-sidebar-foreground tracking-tight">EstroMind</span>
            <span className="text-xs text-sidebar-foreground/60">Clinical Trial Platform</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = activeSection === item.id
            return (
              <button
                key={item.name}
                onClick={() => onSectionChange?.(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-lg shadow-primary/25"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </button>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-sidebar-accent/50">
            <Shield className="w-4 h-4 text-sidebar-primary" />
            <span className="text-xs text-sidebar-foreground/70">HIPAA Compliant</span>
          </div>
        </div>
      </div>
    </aside>
  )
}
