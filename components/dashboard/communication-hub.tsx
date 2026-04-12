"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { 
  MessageSquare, 
  Bot, 
  Send,
  Sparkles,
  Clock
} from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

const directMessages = [
  {
    id: 1,
    patient: "EM-002",
    preview: "I had to take antibiotics for a tooth infection...",
    time: "4h ago",
    unread: true
  },
  {
    id: 2,
    patient: "EM-004",
    preview: "Feeling very anxious today. Having trouble sleeping.",
    time: "6h ago",
    unread: true
  },
  {
    id: 3,
    patient: "EM-001",
    preview: "Thank you for the reminder about the blood test!",
    time: "1d ago",
    unread: false
  }
]

const aiInsights = [
  {
    id: 1,
    patient: "EM-002",
    insight: "Patient expressed concern about medication interaction. Sentiment: Anxious. Recommended follow-up.",
    type: "concern",
    time: "4h ago"
  },
  {
    id: 2,
    patient: "EM-004",
    insight: "High stress indicators detected over 3 consecutive days. CBT techniques shared. Cortisol impact likely.",
    type: "stress",
    time: "6h ago"
  },
  {
    id: 3,
    patient: "EM-005",
    insight: "Patient reported improved sleep quality after adjusting probiotic timing. Adherence improving.",
    type: "positive",
    time: "1d ago"
  }
]

interface CommunicationHubProps {
  expanded?: boolean
}

export function CommunicationHub({ expanded = false }: CommunicationHubProps) {
  const [message, setMessage] = useState("")

  return (
    <Card className="border-border/50 shadow-sm h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-secondary/10">
            <MessageSquare className="w-4 h-4 text-secondary" />
          </div>
          <CardTitle className="text-base font-semibold">Secure Communication Hub</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="messages" className="w-full">
          <TabsList className="w-full justify-start px-4 pb-0 bg-transparent border-b rounded-none h-auto">
            <TabsTrigger 
              value="messages" 
              className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none pb-3"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Direct Messages
              <Badge variant="secondary" className="ml-2 text-[10px]">2</Badge>
            </TabsTrigger>
            <TabsTrigger 
              value="ai" 
              className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none pb-3"
            >
              <Bot className="w-4 h-4 mr-2" />
              AI Insights
            </TabsTrigger>
          </TabsList>

          <TabsContent value="messages" className="m-0">
            <ScrollArea className={expanded ? "h-[500px]" : "h-[280px]"}>
              <div className="p-4 space-y-3">
                {directMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={cn(
                      "flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200",
                      msg.unread 
                        ? "bg-primary/5 border border-primary/20 hover:bg-primary/10"
                        : "bg-muted/50 hover:bg-muted"
                    )}
                  >
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="text-xs bg-primary/10 text-primary">
                        {msg.patient.split("-")[1]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-medium text-sm">{msg.patient}</span>
                        <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {msg.time}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground truncate mt-1">
                        {msg.preview}
                      </p>
                    </div>
                    {msg.unread && (
                      <div className="w-2 h-2 rounded-full bg-primary shrink-0 mt-2" />
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
            
            {/* Quick Reply */}
            <div className="p-4 border-t border-border">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Quick reply to selected patient..."
                  className="flex-1 px-4 py-2 text-sm bg-muted rounded-xl outline-none focus:ring-2 focus:ring-primary/20"
                />
                <Button size="icon" className="shrink-0 bg-primary hover:bg-primary/90">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="ai" className="m-0">
            <ScrollArea className={expanded ? "h-[560px]" : "h-[340px]"}>
              <div className="p-4 space-y-3">
                {aiInsights.map((insight) => (
                  <div
                    key={insight.id}
                    className="p-4 rounded-xl bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/10"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-primary" />
                        <Badge variant="outline" className="text-[10px]">{insight.patient}</Badge>
                      </div>
                      <span className="text-[10px] text-muted-foreground">{insight.time}</span>
                    </div>
                    <p className="text-sm text-foreground/80 leading-relaxed">
                      {insight.insight}
                    </p>
                    <div className="flex items-center gap-2 mt-3">
                      <Button variant="outline" size="sm" className="h-7 text-xs">
                        View Full Context
                      </Button>
                      <Button variant="ghost" size="sm" className="h-7 text-xs">
                        Dismiss
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
