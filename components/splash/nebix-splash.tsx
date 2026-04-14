"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Activity, Brain, Lock, Sparkles } from "lucide-react"

type EntryType = "clinician" | "patient"

interface NebixSplashProps {
  onEnter: (type: EntryType) => void
}

export function NebixSplash({ onEnter }: NebixSplashProps) {
  const [showSelection, setShowSelection] = useState(false)

  const handleStart = () => {
    setShowSelection(true)
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#1a0a2e] via-[#16213e] to-[#0f0f1a]">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-violet-500/10 to-blue-500/10 rounded-full blur-3xl" />
      </div>

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      <AnimatePresence mode="wait">
        {!showSelection ? (
          /* Logo Reveal Screen */
          <motion.div
            key="logo"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 flex flex-col items-center gap-4 px-6 pt-32"
          >
            {/* Logo */}
            {/* Animated Neural Network Logo */}
<motion.div
  initial={{ scale: 0, opacity: 0 }}
  animate={{ scale: 1, opacity: 1 }}
  transition={{ duration: 1.2, ease: "easeOut" }}
  className="relative w-80 h-80"
>
  <style>{`
    @keyframes pulseNode {
      0%, 100% { opacity: 0.3; r: 5; }
      50% { opacity: 1; r: 8; }
    }
    @keyframes pulseLine {
      0%, 100% { opacity: 0.1; stroke-width: 1; }
      50% { opacity: 0.8; stroke-width: 2; }
    }
    @keyframes glowNode {
      0%, 100% { filter: drop-shadow(0 0 2px #a855f7); }
      50% { filter: drop-shadow(0 0 12px #ec4899); }
    }
    .node-1 { animation: pulseNode 2.1s ease-in-out infinite, glowNode 2.1s ease-in-out infinite; }
    .node-2 { animation: pulseNode 1.8s ease-in-out infinite 0.3s, glowNode 1.8s ease-in-out infinite 0.3s; }
    .node-3 { animation: pulseNode 2.4s ease-in-out infinite 0.6s, glowNode 2.4s ease-in-out infinite 0.6s; }
    .node-4 { animation: pulseNode 1.9s ease-in-out infinite 0.9s, glowNode 1.9s ease-in-out infinite 0.9s; }
    .node-5 { animation: pulseNode 2.2s ease-in-out infinite 1.2s, glowNode 2.2s ease-in-out infinite 1.2s; }
    .node-6 { animation: pulseNode 2.0s ease-in-out infinite 0.5s, glowNode 2.0s ease-in-out infinite 0.5s; }
    .node-7 { animation: pulseNode 1.7s ease-in-out infinite 0.8s, glowNode 1.7s ease-in-out infinite 0.8s; }
    .node-8 { animation: pulseNode 2.3s ease-in-out infinite 1.1s, glowNode 2.3s ease-in-out infinite 1.1s; }
    .node-9 { animation: pulseNode 2.0s ease-in-out infinite 1.4s, glowNode 2.0s ease-in-out infinite 1.4s; }
    .node-10 { animation: pulseNode 1.9s ease-in-out infinite 0.2s, glowNode 1.9s ease-in-out infinite 0.2s; }
    .node-11 { animation: pulseNode 2.1s ease-in-out infinite 0.7s, glowNode 2.1s ease-in-out infinite 0.7s; }
    .node-12 { animation: pulseNode 1.8s ease-in-out infinite 1.0s, glowNode 1.8s ease-in-out infinite 1.0s; }
    .line-a { animation: pulseLine 2.1s ease-in-out infinite; }
    .line-b { animation: pulseLine 1.8s ease-in-out infinite 0.4s; }
    .line-c { animation: pulseLine 2.4s ease-in-out infinite 0.8s; }
    .line-d { animation: pulseLine 1.9s ease-in-out infinite 1.2s; }
    .line-e { animation: pulseLine 2.2s ease-in-out infinite 0.2s; }
    .line-f { animation: pulseLine 2.0s ease-in-out infinite 0.6s; }
    .line-g { animation: pulseLine 1.7s ease-in-out infinite 1.0s; }
    .line-h { animation: pulseLine 2.3s ease-in-out infinite 0.3s; }
    .line-i { animation: pulseLine 2.1s ease-in-out infinite 0.9s; }
    .line-j { animation: pulseLine 1.8s ease-in-out infinite 1.3s; }
    .line-k { animation: pulseLine 2.0s ease-in-out infinite 0.5s; }
    .line-l { animation: pulseLine 1.9s ease-in-out infinite 0.7s; }
    .line-m { animation: pulseLine 2.2s ease-in-out infinite 1.1s; }
    .line-n { animation: pulseLine 2.4s ease-in-out infinite 0.4s; }
    .line-o { animation: pulseLine 1.7s ease-in-out infinite 1.5s; }
    @keyframes rotateSlow {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    @keyframes rotateSlowReverse {
      from { transform: rotate(0deg); }
      to { transform: rotate(-360deg); }
    }
    .orbit-1 { 
      transform-origin: 160px 160px;
      animation: rotateSlow 12s linear infinite; 
    }
    .orbit-2 { 
      transform-origin: 160px 160px;
      animation: rotateSlowReverse 18s linear infinite; 
    }
    @keyframes outerGlow {
      0%, 100% { opacity: 0.15; }
      50% { opacity: 0.4; }
    }
    .outer-glow { animation: outerGlow 3s ease-in-out infinite; }
  `}</style>

  <svg width="320" height="320" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="bgGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="nodeGrad1" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#f0abfc" />
        <stop offset="100%" stopColor="#a855f7" />
      </radialGradient>
      <radialGradient id="nodeGrad2" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#fbcfe8" />
        <stop offset="100%" stopColor="#ec4899" />
      </radialGradient>
      <radialGradient id="nodeGrad3" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#c4b5fd" />
        <stop offset="100%" stopColor="#6d28d9" />
      </radialGradient>
    </defs>

    {/* Outer glow background */}
    <circle cx="160" cy="160" r="130" fill="url(#bgGlow)" className="outer-glow" />

    {/* Orbiting rings */}
    <g className="orbit-1">
      <ellipse cx="160" cy="160" rx="120" ry="50" fill="none" stroke="#a855f7" strokeWidth="0.5" strokeOpacity="0.3" strokeDasharray="4 8" />
    </g>
    <g className="orbit-2">
      <ellipse cx="160" cy="160" rx="90" ry="110" fill="none" stroke="#ec4899" strokeWidth="0.5" strokeOpacity="0.25" strokeDasharray="3 10" />
    </g>

    {/* Connection lines */}
    {/* Outer network */}
    <line x1="160" y1="45" x2="230" y2="90" stroke="#a855f7" className="line-a" />
    <line x1="230" y1="90" x2="265" y2="160" stroke="#ec4899" className="line-b" />
    <line x1="265" y1="160" x2="230" y2="230" stroke="#a855f7" className="line-c" />
    <line x1="230" y1="230" x2="160" y2="265" stroke="#c084fc" className="line-d" />
    <line x1="160" y1="265" x2="90" y2="230" stroke="#ec4899" className="line-e" />
    <line x1="90" y1="230" x2="55" y2="160" stroke="#a855f7" className="line-f" />
    <line x1="55" y1="160" x2="90" y2="90" stroke="#f472b6" className="line-g" />
    <line x1="90" y1="90" x2="160" y2="45" stroke="#a855f7" className="line-h" />

    {/* Cross connections */}
    <line x1="160" y1="45" x2="265" y2="160" stroke="#c084fc" className="line-i" />
    <line x1="230" y1="90" x2="160" y2="265" stroke="#f472b6" className="line-j" />
    <line x1="265" y1="160" x2="90" y2="90" stroke="#a855f7" className="line-k" />
    <line x1="230" y1="230" x2="55" y2="160" stroke="#ec4899" className="line-l" />
    <line x1="160" y1="265" x2="90" y2="90" stroke="#c084fc" className="line-m" />

    {/* Inner connections */}
    <line x1="160" y1="100" x2="210" y2="145" stroke="#f0abfc" className="line-n" />
    <line x1="210" y1="145" x2="190" y2="200" stroke="#ec4899" className="line-o" />
    <line x1="190" y1="200" x2="130" y2="200" stroke="#a855f7" className="line-a" />
    <line x1="130" y1="200" x2="110" y2="145" stroke="#f472b6" className="line-b" />
    <line x1="110" y1="145" x2="160" y2="100" stroke="#c084fc" className="line-c" />
    <line x1="160" y1="100" x2="190" y2="200" stroke="#a855f7" className="line-d" />
    <line x1="210" y1="145" x2="110" y2="145" stroke="#ec4899" className="line-e" />
    <line x1="160" y1="100" x2="160" y2="160" stroke="#f0abfc" className="line-f" />
    <line x1="160" y1="160" x2="210" y2="145" stroke="#a855f7" className="line-g" />
    <line x1="160" y1="160" x2="190" y2="200" stroke="#ec4899" className="line-h" />
    <line x1="160" y1="160" x2="130" y2="200" stroke="#c084fc" className="line-i" />
    <line x1="160" y1="160" x2="110" y2="145" stroke="#f472b6" className="line-j" />

    {/* Outer nodes */}
    <circle cx="160" cy="45" r="6" fill="url(#nodeGrad1)" className="node-1" />
    <circle cx="230" cy="90" r="5" fill="url(#nodeGrad2)" className="node-2" />
    <circle cx="265" cy="160" r="7" fill="url(#nodeGrad1)" className="node-3" />
    <circle cx="230" cy="230" r="5" fill="url(#nodeGrad3)" className="node-4" />
    <circle cx="160" cy="265" r="6" fill="url(#nodeGrad2)" className="node-5" />
    <circle cx="90" cy="230" r="5" fill="url(#nodeGrad1)" className="node-6" />
    <circle cx="55" cy="160" r="7" fill="url(#nodeGrad3)" className="node-7" />
    <circle cx="90" cy="90" r="5" fill="url(#nodeGrad2)" className="node-8" />

    {/* Inner nodes */}
    <circle cx="160" cy="100" r="6" fill="url(#nodeGrad2)" className="node-9" />
    <circle cx="210" cy="145" r="5" fill="url(#nodeGrad1)" className="node-10" />
    <circle cx="190" cy="200" r="6" fill="url(#nodeGrad3)" className="node-11" />
    <circle cx="130" cy="200" r="5" fill="url(#nodeGrad2)" className="node-12" />
    <circle cx="110" cy="145" r="6" fill="url(#nodeGrad1)" className="node-1" />

    {/* Center node — always bright */}
    <circle cx="160" cy="160" r="12" fill="url(#nodeGrad1)" style={{ filter: "drop-shadow(0 0 10px #a855f7)" }} className="node-3" />
    <circle cx="160" cy="160" r="6" fill="white" opacity="0.9" />
  </svg>
</motion.div>

            {/* Brand name */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-6xl md:text-7xl font-bold tracking-tight bg-gradient-to-r from-white via-violet-200 to-blue-200 bg-clip-text text-transparent">
                NEBix
              </h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="mt-4 text-lg md:text-xl text-slate-400 font-light tracking-wide"
              >
                Neuro-Estrogen-Biotics Integrated Experience
              </motion.p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="max-w-md text-center text-slate-500 text-sm leading-relaxed"
            >
              Advanced clinical trial management platform for gut-brain axis research and neuro-endocrinology studies
            </motion.p>

            {/* Start Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              onClick={handleStart}
              className="group relative mt-4"
            >
              <span className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-500 to-blue-500 animate-ping opacity-20" />
              <span className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-500 to-blue-500 blur-md opacity-40 group-hover:opacity-60 transition-opacity" />
              <span className="relative flex items-center gap-3 px-8 py-4 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white font-medium shadow-2xl shadow-violet-500/20 hover:bg-white/15 hover:border-white/30 transition-all duration-300">
                <Sparkles className="w-5 h-5 text-violet-300" />
                Start NEBix Experience
              </span>
            </motion.button>
          </motion.div>
        ) : (
          /* Entry Selection Screen */
          <motion.div
            key="selection"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 flex flex-col items-center gap-10 px-6 w-full max-w-4xl"
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                Select Your Access
              </h2>
              <p className="text-slate-400">
                Choose your role to continue to the NEBix platform
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              {/* Clinician Card */}
              <motion.button
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, type: "spring" }}
                onClick={() => onEnter("clinician")}
                className="group relative p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-violet-500/50 hover:bg-white/10 transition-all duration-500 text-left overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-violet-800 shadow-lg shadow-violet-500/30 mb-6">
                    <Activity className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Clinical Gateway</h3>
                  <p className="text-slate-400 leading-relaxed">Real-time Biomarker Monitoring & Trial De-risking</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-full bg-violet-500/20 text-violet-300 text-xs font-medium">Dashboard</span>
                    <span className="px-3 py-1 rounded-full bg-violet-500/20 text-violet-300 text-xs font-medium">Analytics</span>
                    <span className="px-3 py-1 rounded-full bg-violet-500/20 text-violet-300 text-xs font-medium">Alerts</span>
                  </div>
                </div>
                <div className="absolute bottom-8 right-8 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-violet-500 transition-colors duration-300">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </motion.button>

              {/* Patient Card */}
              <motion.button
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, type: "spring" }}
                onClick={() => onEnter("patient")}
                className="group relative p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-blue-500/50 hover:bg-white/10 transition-all duration-500 text-left overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 shadow-lg shadow-blue-500/30 mb-6">
                    <Brain className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Patient Companion</h3>
                  <p className="text-slate-400 leading-relaxed">Daily Protocol, AI Support & Wellness Tracking</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-medium">Tracker</span>
                    <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-medium">AI Chat</span>
                    <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-medium">Wellness</span>
                  </div>
                </div>
                <div className="absolute bottom-8 right-8 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-blue-500 transition-colors duration-300">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </motion.button>
            </div>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              onClick={() => setShowSelection(false)}
              className="text-slate-500 hover:text-white text-sm transition-colors"
            >
              Back to welcome
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 flex items-center gap-2 text-slate-600"
      >
        <Lock className="w-3.5 h-3.5" />
        <span className="text-xs tracking-wide">
          Secure Clinical Environment | End-to-End Encrypted
        </span>
      </motion.footer>
    </div>
  )
}
