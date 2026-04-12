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

export default function Home() {
  const [currentView, setCurrentView] = useState<"clinician" | "patient" | "biomarkers">("clinician")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* View Switcher - Demo Navigation */}
      <ViewSwitcher currentView={currentView} onViewChange={setCurrentView} />

      {/* Clinician Dashboard View */}
      {currentView === "clinician" && (
        <div className="flex flex-1">
          <Sidebar />
          <div className="flex-1 lg:ml-64 flex flex-col">
            <Header onMobileMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)} />
            <main className="flex-1 p-4 lg:p-8">
              <div className="max-w-7xl mx-auto space-y-6">
                {/* Page Header */}
                <div className="flex flex-col gap-1">
                  <h1 className="text-2xl font-bold tracking-tight">Clinical Trial Dashboard</h1>
                  <p className="text-muted-foreground">
                    Gut-Brain Axis Study: KABP052 Probiotic Trial
                  </p>
                </div>

                {/* Stats */}
                <StatsCards />

                {/* Main Grid */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                  {/* Patient Table - Takes 2 columns */}
                  <div className="xl:col-span-2">
                    <PatientTable />
                  </div>

                  {/* Alert Center - 1 column */}
                  <div className="xl:col-span-1">
                    <AlertCenter />
                  </div>
                </div>

                {/* Second Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Test Deployer */}
                  <TestDeployer />

                  {/* Communication Hub */}
                  <CommunicationHub />
                </div>

                {/* Biomarker Preview */}
                <BiomarkerChart />
              </div>
            </main>
            <Footer />
          </div>
        </div>
      )}

      {/* Biomarker Analytics View */}
      {currentView === "biomarkers" && (
        <div className="flex flex-1">
          <Sidebar />
          <div className="flex-1 lg:ml-64 flex flex-col">
            <Header onMobileMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)} />
            <main className="flex-1 p-4 lg:p-8">
              <div className="max-w-7xl mx-auto space-y-6">
                {/* Page Header */}
                <div className="flex flex-col gap-1">
                  <h1 className="text-2xl font-bold tracking-tight">Biomarker Analytics</h1>
                  <p className="text-muted-foreground">
                    p-tau217 vs Estradiol correlation analysis with lifestyle event markers
                  </p>
                </div>

                {/* Main Chart */}
                <BiomarkerChart />

                {/* Additional Stats */}
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

                {/* Correlation Analysis */}
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
        <div className="flex-1 max-w-lg mx-auto w-full border-x border-border bg-background shadow-2xl">
          <PatientApp />
        </div>
      )}

      {/* AI Chatbot - Available on all views */}
      <AIChatbot />
    </div>
  )
}
