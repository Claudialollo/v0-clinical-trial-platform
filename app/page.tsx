"use client"

import { useState } from "react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { Header } from "@/components/dashboard/header"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { PatientTable } from "@/components/dashboard/patient-table"
import { AlertCenter } from "@/components/dashboard/alert-center"
import { TestDeployer } from "@/components/dashboard/test-deployer"
import { CommunicationHub } from "@/components/dashboard/communication-hub"
import { BiomarkerChart } from "@/components/dashboard/biomarker-chart"
import { Footer } from "@/components/dashboard/footer"
import { ViewSwitcher } from "@/components/dashboard/view-switcher"
import { PatientApp } from "@/components/patient/patient-app"
import { AIChatbot } from "@/components/chatbot/ai-companion"
import { NebixSplash } from "@/components/splash/nebix-splash"

type SidebarSection = "dashboard" | "patients" | "alerts" | "biomarkers" | "tests" | "communications" | "settings"
type AppView = "splash" | "clinician" | "patient" | "biomarkers"

export default function Home() {
  const [currentView, setCurrentView] = useState<AppView>("splash")
  const [activeSection, setActiveSection] = useState<SidebarSection>("dashboard")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleSplashEnter = (type: "clinician" | "patient") => {
    setCurrentView(type)
  }

  const handleSectionChange = (section: SidebarSection) => {
    setActiveSection(section)
    if (section === "biomarkers") {
      setCurrentView("biomarkers")
    } else if (currentView === "biomarkers") {
      setCurrentView("clinician")
    }
  }

  const handleViewChange = (view: AppView) => {
    setCurrentView(view)
    if (view === "biomarkers") {
      setActiveSection("biomarkers")
    } else if (view === "clinician") {
      setActiveSection("dashboard")
    }
  }

  const renderClinicianContent = () => {
    switch (activeSection) {
      case "patients":
        return (
          <>
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl font-bold tracking-tight">Patient Management</h1>
              <p className="text-muted-foreground">Monitor all enrolled patients in the KABP052 trial</p>
            </div>
            <PatientTable />
          </>
        )
      case "alerts":
        return (
          <>
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl font-bold tracking-tight">Alert Center</h1>
              <p className="text-muted-foreground">Real-time red flags and patient notifications</p>
            </div>
            <AlertCenter expanded />
          </>
        )
      case "tests":
        return (
          <>
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl font-bold tracking-tight">Remote Test Deployer</h1>
              <p className="text-muted-foreground">Deploy cognitive scales and PROMs to patient devices</p>
            </div>
            <TestDeployer />
          </>
        )
      case "communications":
        return (
          <>
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl font-bold tracking-tight">Communication Hub</h1>
              <p className="text-muted-foreground">Secure messaging and AI conversation insights</p>
            </div>
            <CommunicationHub expanded />
          </>
        )
      case "settings":
        return (
          <>
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
              <p className="text-muted-foreground">Configure trial parameters and notifications</p>
            </div>
            <div className="p-8 rounded-xl border border-border bg-card text-center">
              <p className="text-muted-foreground">Settings panel coming soon</p>
            </div>
          </>
        )
      default:
        return (
          <>
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl font-bold tracking-tight">Clinical Trial Dashboard</h1>
              <p className="text-muted-foreground">Gut-Brain Axis Study: KABP052 Probiotic Trial</p>
            </div>
            <StatsCards />
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className="xl:col-span-2"><PatientTable /></div>
              <div className="xl:col-span-1"><AlertCenter /></div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <TestDeployer />
              <CommunicationHub />
            </div>
            <BiomarkerChart />
          </>
        )
    }
  }

  if (currentView === "splash") {
    return <NebixSplash onEnter={handleSplashEnter} />
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <ViewSwitcher currentView={currentView} onViewChange={handleViewChange} />

      {/* Clinician Dashboard View */}
      {currentView === "clinician" && (
        <div className="flex flex-1">
          <Sidebar activeSection={activeSection} onSectionChange={handleSectionChange} />
          <div className="flex-1 lg:ml-64 flex flex-col">
            <Header onMobileMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)} />
            <main className="flex-1 p-4 lg:p-8">
              <div className="max-w-7xl mx-auto space-y-6">
                {renderClinicianContent()}
              </div>
            </main>
            <Footer />
          </div>
        </div>
      )}

      {/* Biomarker Analytics View */}
      {currentView === "biomarkers" && (
        <div className="flex flex-1">
          <Sidebar activeSection="biomarkers" onSectionChange={handleSectionChange} />
          <div className="flex-1 lg:ml-64 flex flex-col">
            <Header onMobileMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)} />
            <main className="flex-1 p-4 lg:p-8">
              <div className="max-w-7xl mx-auto space-y-6">
                <div className="flex flex-col gap-1">
                  <h1 className="text-2xl font-bold tracking-tight">Biomarker Analytics</h1>
                  <p className="text-muted-foreground">p-tau217 vs Estradiol correlation analysis with lifestyle event markers</p>
                </div>
                <BiomarkerChart />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-6 rounded-xl border border-border bg-card">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">p-tau217 Clearance</h3>
                    <p className="text-3xl font-bold text-primary">-32%</p>
                    <p className="text-xs text-muted-foreground mt-1">Average reduction from baseline</p>
                  </div>
                  <div className="p-6 rounded-xl border border-border bg-card">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Estradiol Increase</h3>
                    <p className="text-3xl font-bold text-secondary">+188%</p>
                    <p className="text-xs text-muted-foreground mt-1">Average increase from baseline</p>
                  </div>
                  <div className="p-6 rounded-xl border border-border bg-card">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">FSH Reduction</h3>
                    <p className="text-3xl font-bold text-emerald-600">-44%</p>
                    <p className="text-xs text-muted-foreground mt-1">Indicating improved ovarian function</p>
                  </div>
                </div>
                <div className="p-6 rounded-xl border border-border bg-gradient-to-br from-primary/5 to-secondary/5">
                  <h3 className="text-lg font-semibold mb-4">Clinical Interpretation</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-sm mb-2">Inverse Correlation Observed</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        The data demonstrates a strong inverse correlation (r = -0.89) between rising Estradiol levels and declining p-tau217 concentrations, supporting the hypothesis that estrogen restoration via gut microbiome modulation may enhance amyloid clearance mechanisms.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm mb-2">Event Impact Analysis</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Lifestyle disruption events (antibiotics, high stress, poor sleep) correlate with temporary biomarker fluctuations. The estrobolome disruption from antibiotic intake at W2 caused a measurable 2% p-tau217 rebound, highlighting the importance of real-time monitoring.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </main>
            <Footer />
          </div>
        </div>
      )}

      {/* Patient App View */}
      {currentView === "patient" && (
        <div className="flex-1 w-full">
          <PatientApp />
        </div>
      )}

      <AIChatbot />
    </div>
  )
}
