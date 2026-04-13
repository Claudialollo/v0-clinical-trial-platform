"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { 
  Bot, 
  Send, 
  Calendar,
  Pill,
  Brain,
  Heart,
  X,
  Maximize2,
  Minimize2,
  Sparkles,
  Clock,
  ArrowRight
} from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"

type MessageType = {
  id: number
  role: "assistant" | "user"
  content: string
  timestamp: Date
  mode?: "operational" | "support"
}

type SentimentType = "positive" | "neutral" | "anxious" | "stressed"

const quickActions = [
  { icon: Calendar, label: "Schedule Test", mode: "operational" as const },
  { icon: Pill, label: "Dose Reminder", mode: "operational" as const },
  { icon: Brain, label: "Protocol FAQ", mode: "operational" as const },
  { icon: Heart, label: "Talk About Feelings", mode: "support" as const }
]

const initialMessages: MessageType[] = [
  {
    id: 1,
    role: "assistant",
    content: "Hello! I'm your NEBix companion. I'm here to help you with scheduling, protocol questions, and to provide support whenever you need it. How are you feeling today?",
    timestamp: new Date(Date.now() - 60000),
    mode: "operational"
  }
]

function getSentimentColor(sentiment: SentimentType) {
  switch (sentiment) {
    case "positive":
      return "ring-emerald-500"
    case "neutral":
      return "ring-secondary"
    case "anxious":
      return "ring-amber-500"
    case "stressed":
      return "ring-rose-500"
  }
}

function getSentimentLabel(sentiment: SentimentType) {
  switch (sentiment) {
    case "positive":
      return { text: "Positive", color: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" }
    case "neutral":
      return { text: "Neutral", color: "bg-secondary/10 text-secondary border-secondary/20" }
    case "anxious":
      return { text: "Anxious", color: "bg-amber-500/10 text-amber-600 border-amber-500/20" }
    case "stressed":
      return { text: "Stressed", color: "bg-rose-500/10 text-rose-600 border-rose-500/20" }
  }
}

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [messages, setMessages] = useState<MessageType[]>(initialMessages)
  const [inputValue, setInputValue] = useState("")
  const [currentMode, setCurrentMode] = useState<"operational" | "support">("operational")
  const [sentiment, setSentiment] = useState<SentimentType>("neutral")
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = () => {
    if (!inputValue.trim()) return

    const userMessage: MessageType = {
      id: messages.length + 1,
      role: "user",
      content: inputValue,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate sentiment analysis based on keywords
    const lowerInput = inputValue.toLowerCase()
    if (lowerInput.includes("anxious") || lowerInput.includes("worried") || lowerInput.includes("nervous")) {
      setSentiment("anxious")
      setCurrentMode("support")
    } else if (lowerInput.includes("stressed") || lowerInput.includes("overwhelmed") || lowerInput.includes("tired")) {
      setSentiment("stressed")
      setCurrentMode("support")
    } else if (lowerInput.includes("good") || lowerInput.includes("great") || lowerInput.includes("happy")) {
      setSentiment("positive")
    }

    // Simulate AI response
    setTimeout(() => {
      const responses: Record<string, string> = {
        support: "I hear you, and it's completely valid to feel this way. Many participants in our study experience similar feelings. Would you like to try a quick breathing exercise together, or would you prefer to talk more about what's on your mind?",
        operational: "I can help you with that! Let me check the available options for you. Your next scheduled blood test is in 12 days. Would you like me to send you a reminder the day before?"
      }

      const aiMessage: MessageType = {
        id: messages.length + 2,
        role: "assistant",
        content: currentMode === "support" ? responses.support : responses.operational,
        timestamp: new Date(),
        mode: currentMode
      }

      setMessages(prev => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleQuickAction = (action: typeof quickActions[0]) => {
    setCurrentMode(action.mode)
    setInputValue(`I need help with ${action.label.toLowerCase()}`)
  }

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-lg shadow-primary/25 z-50"
      >
        <Bot className="w-6 h-6 text-white" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-background" />
      </Button>
    )
  }

  const sentimentInfo = getSentimentLabel(sentiment)

  return (
    <Card 
      className={cn(
        "fixed z-50 shadow-2xl border-border/50 transition-all duration-300",
        isExpanded 
          ? "bottom-4 right-4 left-4 top-4 lg:left-auto lg:w-[500px]" 
          : "bottom-6 right-6 w-[380px] h-[550px]"
      )}
    >
      {/* Header */}
      <CardHeader className="p-4 border-b border-border bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Avatar className={cn("w-10 h-10 ring-2 ring-offset-2 ring-offset-background", getSentimentColor(sentiment))}>
                <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white">
                  <Bot className="w-5 h-5" />
                </AvatarFallback>
              </Avatar>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-background" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-sm">Companion AI</h3>
                <Badge variant="outline" className={cn("text-[10px]", sentimentInfo.color)}>
                  {sentimentInfo.text}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                {currentMode === "operational" ? "Operational Mode" : "Support Mode"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8"
              onClick={() => setIsOpen(false)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Mode Toggle */}
        <div className="flex gap-2 mt-3">
          <Button
            variant={currentMode === "operational" ? "default" : "outline"}
            size="sm"
            className="flex-1 h-8 text-xs"
            onClick={() => setCurrentMode("operational")}
          >
            <Clock className="w-3 h-3 mr-1" />
            Operational
          </Button>
          <Button
            variant={currentMode === "support" ? "default" : "outline"}
            size="sm"
            className="flex-1 h-8 text-xs"
            onClick={() => setCurrentMode("support")}
          >
            <Heart className="w-3 h-3 mr-1" />
            Support
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-0 flex flex-col h-[calc(100%-180px)]">
        {/* Messages */}
        <ScrollArea className="flex-1 p-4" ref={scrollRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex gap-3",
                  message.role === "user" && "flex-row-reverse"
                )}
              >
                {message.role === "assistant" && (
                  <Avatar className="w-8 h-8 shrink-0">
                    <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white text-xs">
                      <Sparkles className="w-4 h-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={cn(
                    "max-w-[80%] p-3 rounded-2xl text-sm",
                    message.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-md"
                      : "bg-muted rounded-bl-md"
                  )}
                >
                  <p className="leading-relaxed">{message.content}</p>
                  <p className={cn(
                    "text-[10px] mt-1",
                    message.role === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
                  )}>
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex gap-3">
                <Avatar className="w-8 h-8 shrink-0">
                  <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white text-xs">
                    <Sparkles className="w-4 h-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-muted p-3 rounded-2xl rounded-bl-md">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Quick Actions */}
        <div className="px-4 py-2 border-t border-border">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {quickActions.map((action) => (
              <Button
                key={action.label}
                variant="outline"
                size="sm"
                className="shrink-0 h-7 text-xs"
                onClick={() => handleQuickAction(action)}
              >
                <action.icon className="w-3 h-3 mr-1" />
                {action.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder={currentMode === "support" ? "Share how you're feeling..." : "Ask about your protocol..."}
              className="flex-1 px-4 py-3 text-sm bg-muted rounded-xl outline-none focus:ring-2 focus:ring-primary/20"
            />
            <Button 
              size="icon" 
              className="shrink-0 bg-primary hover:bg-primary/90 w-10 h-10 rounded-xl"
              onClick={handleSend}
              disabled={!inputValue.trim()}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Floating Chat Button for embedding
export function ChatButton() {
  return (
    <Button
      className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-lg shadow-primary/25 z-50"
    >
      <Bot className="w-6 h-6 text-white" />
      <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-background animate-pulse" />
    </Button>
  )
}
