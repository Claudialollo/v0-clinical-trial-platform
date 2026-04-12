"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  Brain, 
  ClipboardList, 
  Moon, 
  Heart,
  Sparkles,
  Send,
  Clock,
  Users
} from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

const tests = [
  {
    id: "moca",
    name: "MoCA",
    fullName: "Montreal Cognitive Assessment",
    description: "Standard cognitive screening",
    duration: "15 min",
    icon: Brain,
    category: "cognitive"
  },
  {
    id: "phq9",
    name: "PHQ-9",
    fullName: "Patient Health Questionnaire",
    description: "Depression screening scale",
    duration: "5 min",
    icon: Heart,
    category: "mental"
  },
  {
    id: "psqi",
    name: "PSQI",
    fullName: "Pittsburgh Sleep Quality Index",
    description: "Sleep quality assessment",
    duration: "10 min",
    icon: Moon,
    category: "lifestyle"
  },
  {
    id: "gsi",
    name: "GSI",
    fullName: "Greene Climacteric Scale",
    description: "Menopause symptom inventory",
    duration: "8 min",
    icon: ClipboardList,
    category: "clinical"
  }
]

const patientGroups = [
  { id: "all", label: "All Participants", count: 127 },
  { id: "high-adherence", label: "High Adherence (>90%)", count: 84 },
  { id: "flagged", label: "Flagged Patients", count: 12 },
  { id: "recent", label: "Recent Enrollees", count: 23 }
]

export function TestDeployer() {
  const [selectedTests, setSelectedTests] = useState<string[]>([])
  const [selectedGroup, setSelectedGroup] = useState("all")

  const toggleTest = (testId: string) => {
    setSelectedTests(prev => 
      prev.includes(testId) 
        ? prev.filter(id => id !== testId)
        : [...prev, testId]
    )
  }

  return (
    <Card className="border-border/50 shadow-sm">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-secondary/10">
            <Sparkles className="w-4 h-4 text-secondary" />
          </div>
          <div>
            <CardTitle className="text-base font-semibold">Remote Test Deployer</CardTitle>
            <CardDescription className="text-xs">Deploy PROMs and cognitive scales to patient apps</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Test Selection */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Available Tests</label>
          <div className="grid grid-cols-2 gap-2">
            {tests.map((test) => (
              <div
                key={test.id}
                onClick={() => toggleTest(test.id)}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all duration-200",
                  selectedTests.includes(test.id)
                    ? "border-primary bg-primary/5 shadow-sm"
                    : "border-border hover:border-primary/50 hover:bg-muted/50"
                )}
              >
                <Checkbox 
                  checked={selectedTests.includes(test.id)} 
                  className="pointer-events-none"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <test.icon className="w-3 h-3 text-primary" />
                    <span className="font-medium text-sm">{test.name}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <Clock className="w-3 h-3 text-muted-foreground" />
                    <span className="text-[10px] text-muted-foreground">{test.duration}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Patient Group Selection */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Target Group</label>
          <div className="space-y-2">
            {patientGroups.map((group) => (
              <div
                key={group.id}
                onClick={() => setSelectedGroup(group.id)}
                className={cn(
                  "flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all duration-200",
                  selectedGroup === group.id
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                )}
              >
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{group.label}</span>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {group.count}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Deploy Button */}
        <Button 
          className="w-full bg-primary hover:bg-primary/90" 
          disabled={selectedTests.length === 0}
        >
          <Send className="w-4 h-4 mr-2" />
          Deploy {selectedTests.length > 0 ? `${selectedTests.length} Test(s)` : "Tests"}
        </Button>
      </CardContent>
    </Card>
  )
}
