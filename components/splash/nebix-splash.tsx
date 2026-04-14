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
          <motion.div
            key="logo"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 flex flex-col items-center gap-4 px-6 pt-16"
          >
            {/* Animated Female Profile + Neural Network */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="relative w-80 h-80"
            >
              <style>{`
                @keyframes pulseNode {
                  0%, 100% { opacity: 0.3; }
                  50% { opacity: 1; }
                }
                @keyframes pulseLine {
                  0%, 100% { opacity: 0.1; stroke-width: 0.8; }
                  50% { opacity: 0.9; stroke-width: 2; }
                }
                @keyframes glowNode {
                  0%, 100% { filter: drop-shadow(0 0 2px #a855f7); }
                  50% { filter: drop-shadow(0 0 10px #ec4899); }
                }
                @keyframes outerGlow {
                  0%, 100% { opacity: 0.1; }
                  50% { opacity: 0.35; }
                }
                @keyframes signalTravel {
                  0% { stroke-dashoffset: 200; opacity: 0; }
                  20% { opacity: 1; }
                  80% { opacity: 1; }
                  100% { stroke-dashoffset: 0; opacity: 0; }
                }
                @keyframes breathe {
                  0%, 100% { opacity: 0.6; }
                  50% { opacity: 1; }
                }
                .n1 { animation: pulseNode 2.1s ease-in-out infinite, glowNode 2.1s ease-in-out infinite; }
                .n2 { animation: pulseNode 1.8s ease-in-out infinite 0.3s, glowNode 1.8s ease-in-out infinite 0.3s; }
                .n3 { animation: pulseNode 2.4s ease-in-out infinite 0.6s, glowNode 2.4s ease-in-out infinite 0.6s; }
                .n4 { animation: pulseNode 1.9s ease-in-out infinite 0.9s, glowNode 1.9s ease-in-out infinite 0.9s; }
                .n5 { animation: pulseNode 2.2s ease-in-out infinite 1.2s, glowNode 2.2s ease-in-out infinite 1.2s; }
                .n6 { animation: pulseNode 2.0s ease-in-out infinite 0.5s, glowNode 2.0s ease-in-out infinite 0.5s; }
                .n7 { animation: pulseNode 1.7s ease-in-out infinite 0.8s, glowNode 1.7s ease-in-out infinite 0.8s; }
                .n8 { animation: pulseNode 2.3s ease-in-out infinite 1.1s, glowNode 2.3s ease-in-out infinite 1.1s; }
                .n9 { animation: pulseNode 2.0s ease-in-out infinite 1.4s, glowNode 2.0s ease-in-out infinite 1.4s; }
                .n10 { animation: pulseNode 1.9s ease-in-out infinite 0.2s, glowNode 1.9s ease-in-out infinite 0.2s; }
                .la { animation: pulseLine 2.1s ease-in-out infinite; }
                .lb { animation: pulseLine 1.8s ease-in-out infinite 0.4s; }
                .lc { animation: pulseLine 2.4s ease-in-out infinite 0.8s; }
                .ld { animation: pulseLine 1.9s ease-in-out infinite 1.2s; }
                .le { animation: pulseLine 2.2s ease-in-out infinite 0.2s; }
                .lf { animation: pulseLine 2.0s ease-in-out infinite 0.6s; }
                .lg { animation: pulseLine 1.7s ease-in-out infinite 1.0s; }
                .lh { animation: pulseLine 2.3s ease-in-out infinite 0.3s; }
                .li { animation: pulseLine 2.1s ease-in-out infinite 0.9s; }
                .lj { animation: pulseLine 1.8s ease-in-out infinite 1.3s; }
                .lk { animation: pulseLine 2.0s ease-in-out infinite 0.5s; }
                .signal { stroke-dasharray: 200; animation: signalTravel 3s ease-in-out infinite; }
                .signal2 { stroke-dasharray: 200; animation: signalTravel 3s ease-in-out infinite 1s; }
                .signal3 { stroke-dasharray: 200; animation: signalTravel 3s ease-in-out infinite 2s; }
                .outer-glow { animation: outerGlow 3s ease-in-out infinite; }
                .profile { animation: breathe 4s ease-in-out infinite; }
              `}</style>

              <svg width="320" height="320" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <radialGradient id="bgGlow2" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
                  </radialGradient>
                  <radialGradient id="ng1" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#f0abfc" />
                    <stop offset="100%" stopColor="#a855f7" />
                  </radialGradient>
                  <radialGradient id="ng2" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#fbcfe8" />
                    <stop offset="100%" stopColor="#ec4899" />
                  </radialGradient>
                  <radialGradient id="ng3" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#c4b5fd" />
                    <stop offset="100%" stopColor="#6d28d9" />
                  </radialGradient>
                  <linearGradient id="profileGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#c084fc" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#ec4899" stopOpacity="0.7" />
                  </linearGradient>
                  <clipPath id="brainClip">
                    <path d="M 155 75 C 130 70, 100 75, 88 95 C 75 112, 78 130, 82 145 C 72 155, 70 168, 75 180 C 80 192, 92 198, 105 197 C 108 205, 115 210, 125 210 C 135 215, 148 213, 155 210 C 162 213, 175 215, 185 210 C 195 210, 202 205, 205 197 C 218 198, 230 192, 235 180 C 240 168, 238 155, 228 145 C 232 130, 235 112, 222 95 C 210 75, 180 70, 155 75 Z" />
                  </clipPath>
                  <filter id="glow2">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>

                {/* Background glow */}
                <circle cx="160" cy="160" r="140" fill="url(#bgGlow2)" className="outer-glow" />

                {/* Female profile silhouette */}
                <g className="profile" filter="url(#glow2)">
                  {/* Head/skull outline */}
                  <path
                    d="M 155 60 C 125 58, 90 72, 78 100 C 65 128, 70 155, 78 170 C 68 182, 65 198, 72 212 C 80 226, 96 230, 112 228 C 115 238, 120 248, 128 252 C 135 256, 145 255, 150 252 L 152 268 C 148 272, 142 275, 143 280 C 144 284, 150 285, 156 284 L 168 284 C 172 284, 176 281, 175 277 C 174 273, 169 271, 165 270 L 164 252 C 172 250, 182 245, 188 238 C 198 238, 212 232, 218 218 C 228 204, 226 188, 216 176 C 224 162, 230 142, 226 115 C 222 88, 200 62, 175 58 Z"
                    fill="none"
                    stroke="url(#profileGrad)"
                    strokeWidth="2"
                    strokeOpacity="0.7"
                  />
                  {/* Eye */}
                  <ellipse cx="96" cy="155" rx="6" ry="4" fill="none" stroke="#f0abfc" strokeWidth="1.5" strokeOpacity="0.8" />
                  <circle cx="97" cy="155" r="2" fill="#c084fc" opacity="0.9" />
                  {/* Nose */}
                  <path d="M 84 175 C 82 182, 83 188, 88 190 C 92 191, 96 189, 96 185"
                    fill="none" stroke="#c084fc" strokeWidth="1.2" strokeOpacity="0.6" />
                  {/* Lips */}
                  <path d="M 78 210 C 82 206, 90 205, 94 208 C 90 212, 82 213, 78 210 Z"
                    fill="#ec4899" opacity="0.5" />
                  {/* Hair */}
                  <path d="M 155 58 C 170 52, 195 55, 210 65 C 225 75, 232 90, 228 108"
                    fill="none" stroke="url(#profileGrad)" strokeWidth="2.5" strokeOpacity="0.5" strokeLinecap="round" />
                  <path d="M 175 56 C 195 48, 218 55, 228 72"
                    fill="none" stroke="#c084fc" strokeWidth="1.5" strokeOpacity="0.4" strokeLinecap="round" />
                  <path d="M 165 57 C 185 46, 212 50, 224 65"
                    fill="none" stroke="#ec4899" strokeWidth="1" strokeOpacity="0.3" strokeLinecap="round" />
                  {/* Neck */}
                  <line x1="152" y1="268" x2="152" y2="285" stroke="url(#profileGrad)" strokeWidth="1.5" strokeOpacity="0.5" />
                  <line x1="164" y1="268" x2="164" y2="280" stroke="url(#profileGrad)" strokeWidth="1.5" strokeOpacity="0.5" />
                </g>

                {/* Neural network inside brain */}
                <g clipPath="url(#brainClip)">
                  <path d="M 155 75 C 130 70, 100 75, 88 95 C 75 112, 78 130, 82 145 C 72 155, 70 168, 75 180 C 80 192, 92 198, 105 197 C 108 205, 115 210, 125 210 C 135 215, 148 213, 155 210 C 162 213, 175 215, 185 210 C 195 210, 202 205, 205 197 C 218 198, 230 192, 235 180 C 240 168, 238 155, 228 145 C 232 130, 235 112, 222 95 C 210 75, 180 70, 155 75 Z"
                    fill="#4c1d95" fillOpacity="0.15" />

                  {/* Connection lines */}
                  <line x1="120" y1="95" x2="155" y2="110" stroke="#a855f7" className="la" />
                  <line x1="155" y1="110" x2="190" y2="95" stroke="#ec4899" className="lb" />
                  <line x1="190" y1="95" x2="215" y2="120" stroke="#a855f7" className="lc" />
                  <line x1="215" y1="120" x2="210" y2="155" stroke="#f472b6" className="ld" />
                  <line x1="210" y1="155" x2="195" y2="185" stroke="#a855f7" className="le" />
                  <line x1="195" y1="185" x2="165" y2="195" stroke="#ec4899" className="lf" />
                  <line x1="165" y1="195" x2="135" y2="190" stroke="#c084fc" className="lg" />
                  <line x1="135" y1="190" x2="110" y2="170" stroke="#a855f7" className="lh" />
                  <line x1="110" y1="170" x2="100" y2="140" stroke="#f472b6" className="li" />
                  <line x1="100" y1="140" x2="110" y2="115" stroke="#a855f7" className="lj" />
                  <line x1="110" y1="115" x2="120" y2="95" stroke="#ec4899" className="lk" />
                  <line x1="155" y1="110" x2="155" y2="150" stroke="#f0abfc" className="la" />
                  <line x1="155" y1="150" x2="210" y2="155" stroke="#a855f7" className="lb" />
                  <line x1="155" y1="150" x2="100" y2="140" stroke="#ec4899" className="lc" />
                  <line x1="155" y1="150" x2="165" y2="195" stroke="#c084fc" className="ld" />
                  <line x1="155" y1="150" x2="135" y2="190" stroke="#f472b6" className="le" />
                  <line x1="120" y1="95" x2="190" y2="95" stroke="#a855f7" className="lf" />
                  <line x1="110" y1="115" x2="215" y2="120" stroke="#c084fc" className="lg" />
                  <line x1="100" y1="140" x2="195" y2="185" stroke="#f472b6" className="lh" />
                  <line x1="110" y1="170" x2="195" y2="185" stroke="#a855f7" className="li" />
                  <line x1="120" y1="95" x2="155" y2="150" stroke="#ec4899" className="lj" />
                  <line x1="190" y1="95" x2="155" y2="150" stroke="#a855f7" className="lk" />

                  {/* Traveling signals */}
                  <line x1="120" y1="95" x2="215" y2="120" stroke="#f0abfc" strokeWidth="2" className="signal" />
                  <line x1="155" y1="110" x2="195" y2="185" stroke="#ec4899" strokeWidth="2" className="signal2" />
                  <line x1="100" y1="140" x2="210" y2="155" stroke="#c084fc" strokeWidth="2" className="signal3" />

                  {/* Nodes */}
                  <circle cx="120" cy="95" r="5" fill="url(#ng2)" className="n1" />
                  <circle cx="155" cy="110" r="6" fill="url(#ng1)" className="n2" />
                  <circle cx="190" cy="95" r="5" fill="url(#ng3)" className="n3" />
                  <circle cx="215" cy="120" r="4" fill="url(#ng2)" className="n4" />
                  <circle cx="210" cy="155" r="5" fill="url(#ng1)" className="n5" />
                  <circle cx="195" cy="185" r="4" fill="url(#ng3)" className="n6" />
                  <circle cx="165" cy="195" r="5" fill="url(#ng2)" className="n7" />
                  <circle cx="135" cy="190" r="4" fill="url(#ng1)" className="n8" />
                  <circle cx="110" cy="170" r="5" fill="url(#ng3)" className="n9" />
                  <circle cx="100" cy="140" r="4" fill="url(#ng2)" className="n10" />
                  <circle cx="110" cy="115" r="5" fill="url(#ng1)" className="n1" />
                  <circle cx="155" cy="150" r="9" fill="url(#ng1)" className="n3" style={{ filter: "drop-shadow(0 0 8px #a855f7)" }} />
                  <circle cx="155" cy="150" r="4" fill="white" opacity="0.95" />
                </g>

                {/* Brain outline on top */}
                <path d="M 155 75 C 130 70, 100 75, 88 95 C 75 112, 78 130, 82 145 C 72 155, 70 168, 75 180 C 80 192, 92 198, 105 197 C 108 205, 115 210, 125 210 C 135 215, 148 213, 155 210 C 162 213, 175 215, 185 210 C 195 210, 202 205, 205 197 C 218 198, 230 192, 235 180 C 240 168, 238 155, 228 145 C 232 130, 235 112, 222 95 C 210 75, 180 70, 155 75 Z"
                  fill="none" stroke="url(#profileGrad)" strokeWidth="1.5" strokeOpacity="0.6" />

                {/* Radiating particles */}
                {[
                  { cx: 245, cy: 100, cls: "n2" }, { cx: 258, cy: 145, cls: "n4" },
                  { cx: 252, cy: 190, cls: "n6" }, { cx: 65, cy: 120, cls: "n3" },
                  { cx: 58, cy: 165, cls: "n5" }, { cx: 72, cy: 205, cls: "n7" },
                  { cx: 140, cy: 45, cls: "n1" }, { cx: 175, cy: 42, cls: "n8" },
                ].map((p, i) => (
                  <circle key={i} cx={p.cx} cy={p.cy} r="2.5" fill="#c084fc" className={p.cls} />
                ))}

                {/* Radiating lines */}
                <line x1="228" y1="145" x2="258" y2="145" stroke="#a855f7" className="la" strokeWidth="0.8" />
                <line x1="222" y1="95" x2="245" y2="100" stroke="#ec4899" className="lb" strokeWidth="0.8" />
                <line x1="235" y1="180" x2="252" y2="190" stroke="#c084fc" className="lc" strokeWidth="0.8" />
                <line x1="88" y1="95" x2="65" y2="120" stroke="#a855f7" className="ld" strokeWidth="0.8" />
                <line x1="82" y1="145" x2="58" y2="165" stroke="#f472b6" className="le" strokeWidth="0.8" />
                <line x1="92" y1="198" x2="72" y2="205" stroke="#ec4899" className="lf" strokeWidth="0.8" />
                <line x1="140" y1="75" x2="140" y2="45" stroke="#a855f7" className="lg" strokeWidth="0.8" />
                <line x1="175" y1="73" x2="175" y2="42" stroke="#c084fc" className="lh" strokeWidth="0.8" />
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
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Select Your Access</h2>
              <p className="text-slate-400">Choose your role to continue to the NEBix platform</p>
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
