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
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-violet-500/10 to-blue-500/10 rounded-full blur-3xl" />
      </div>

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
            className="relative z-10 flex flex-col items-center gap-6 px-6"
          >
            {/* Brain with neural nodes */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="relative w-72 h-72"
            >
              <style>{`
                @keyframes pulseNode {
                  0%, 100% { opacity: 0.25; r: 4; }
                  50% { opacity: 1; r: 7; }
                }
                @keyframes glowNode {
                  0%, 100% { filter: drop-shadow(0 0 3px #a855f7); }
                  50% { filter: drop-shadow(0 0 14px #ec4899); }
                }
                @keyframes pulseLine {
                  0%, 100% { opacity: 0.08; }
                  50% { opacity: 0.85; }
                }
                @keyframes signalTravel {
                  0%   { stroke-dashoffset: 300; opacity: 0; }
                  15%  { opacity: 1; }
                  85%  { opacity: 1; }
                  100% { stroke-dashoffset: 0; opacity: 0; }
                }
                @keyframes brainGlow {
                  0%, 100% { filter: drop-shadow(0 0 6px #7c3aed); opacity: 0.7; }
                  50% { filter: drop-shadow(0 0 20px #a855f7); opacity: 1; }
                }
                @keyframes bgPulse {
                  0%, 100% { opacity: 0.08; }
                  50% { opacity: 0.25; }
                }
                .brain-outline { animation: brainGlow 3s ease-in-out infinite; }
                .bg-glow { animation: bgPulse 3s ease-in-out infinite; }
                .n1  { animation: pulseNode 2.1s ease-in-out infinite,       glowNode 2.1s ease-in-out infinite; }
                .n2  { animation: pulseNode 1.8s ease-in-out infinite 0.3s,  glowNode 1.8s ease-in-out infinite 0.3s; }
                .n3  { animation: pulseNode 2.4s ease-in-out infinite 0.6s,  glowNode 2.4s ease-in-out infinite 0.6s; }
                .n4  { animation: pulseNode 1.9s ease-in-out infinite 0.9s,  glowNode 1.9s ease-in-out infinite 0.9s; }
                .n5  { animation: pulseNode 2.2s ease-in-out infinite 1.2s,  glowNode 2.2s ease-in-out infinite 1.2s; }
                .n6  { animation: pulseNode 2.0s ease-in-out infinite 0.5s,  glowNode 2.0s ease-in-out infinite 0.5s; }
                .n7  { animation: pulseNode 1.7s ease-in-out infinite 0.8s,  glowNode 1.7s ease-in-out infinite 0.8s; }
                .n8  { animation: pulseNode 2.3s ease-in-out infinite 1.1s,  glowNode 2.3s ease-in-out infinite 1.1s; }
                .n9  { animation: pulseNode 2.0s ease-in-out infinite 1.4s,  glowNode 2.0s ease-in-out infinite 1.4s; }
                .n10 { animation: pulseNode 1.9s ease-in-out infinite 0.2s,  glowNode 1.9s ease-in-out infinite 0.2s; }
                .n11 { animation: pulseNode 2.1s ease-in-out infinite 0.7s,  glowNode 2.1s ease-in-out infinite 0.7s; }
                .n12 { animation: pulseNode 1.8s ease-in-out infinite 1.0s,  glowNode 1.8s ease-in-out infinite 1.0s; }
                .n13 { animation: pulseNode 2.3s ease-in-out infinite 1.5s,  glowNode 2.3s ease-in-out infinite 1.5s; }
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
                .ll { animation: pulseLine 1.9s ease-in-out infinite 0.7s; }
                .lm { animation: pulseLine 2.2s ease-in-out infinite 1.1s; }
                .s1 { stroke-dasharray: 300; animation: signalTravel 3.5s ease-in-out infinite; }
                .s2 { stroke-dasharray: 300; animation: signalTravel 3.5s ease-in-out infinite 1.2s; }
                .s3 { stroke-dasharray: 300; animation: signalTravel 3.5s ease-in-out infinite 2.4s; }
              `}</style>

              <svg width="288" height="288" viewBox="0 0 288 288" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <radialGradient id="bgG" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.4" />
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
                  <linearGradient id="brainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#c084fc" />
                    <stop offset="50%" stopColor="#a855f7" />
                    <stop offset="100%" stopColor="#ec4899" />
                  </linearGradient>
                  <clipPath id="brainShape">
                    <path d="
                      M 144 38
                      C 118 35, 90 45, 76 65
                      C 60 85, 58 108, 65 128
                      C 52 140, 46 158, 52 175
                      C 58 192, 74 202, 92 202
                      C 96 214, 106 222, 118 224
                      C 128 230, 140 228, 144 225
                      C 148 228, 160 230, 170 224
                      C 182 222, 192 214, 196 202
                      C 214 202, 230 192, 236 175
                      C 242 158, 236 140, 223 128
                      C 230 108, 228 85, 212 65
                      C 198 45, 170 35, 144 38 Z
                    " />
                  </clipPath>
                </defs>

                {/* Background glow */}
                <circle cx="144" cy="140" r="120" fill="url(#bgG)" className="bg-glow" />

                {/* Brain fill */}
                <path d="
                  M 144 38
                  C 118 35, 90 45, 76 65
                  C 60 85, 58 108, 65 128
                  C 52 140, 46 158, 52 175
                  C 58 192, 74 202, 92 202
                  C 96 214, 106 222, 118 224
                  C 128 230, 140 228, 144 225
                  C 148 228, 160 230, 170 224
                  C 182 222, 192 214, 196 202
                  C 214 202, 230 192, 236 175
                  C 242 158, 236 140, 223 128
                  C 230 108, 228 85, 212 65
                  C 198 45, 170 35, 144 38 Z
                "
                  fill="#3b0764"
                  fillOpacity="0.25"
                />

                {/* Brain hemisphere divider */}
                <path d="M 144 42 C 140 80, 140 140, 144 225"
                  fill="none" stroke="#a855f7" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="4 6" />

                {/* Brain wrinkle lines */}
                <path d="M 80 90 C 90 82, 105 85, 112 95" fill="none" stroke="#c084fc" strokeWidth="1" strokeOpacity="0.25" />
                <path d="M 68 130 C 78 118, 95 120, 100 132" fill="none" stroke="#c084fc" strokeWidth="1" strokeOpacity="0.25" />
                <path d="M 72 165 C 84 155, 98 158, 102 170" fill="none" stroke="#c084fc" strokeWidth="1" strokeOpacity="0.25" />
                <path d="M 208 90 C 198 82, 183 85, 176 95" fill="none" stroke="#c084fc" strokeWidth="1" strokeOpacity="0.25" />
                <path d="M 220 130 C 210 118, 193 120, 188 132" fill="none" stroke="#c084fc" strokeWidth="1" strokeOpacity="0.25" />
                <path d="M 216 165 C 204 155, 190 158, 186 170" fill="none" stroke="#c084fc" strokeWidth="1" strokeOpacity="0.25" />

                {/* Neural connections inside brain */}
                <g clipPath="url(#brainShape)">
                  <line x1="100" y1="75"  x2="144" y2="90"  stroke="#a855f7" className="la" strokeWidth="1.2" />
                  <line x1="144" y1="90"  x2="188" y2="75"  stroke="#ec4899" className="lb" strokeWidth="1.2" />
                  <line x1="188" y1="75"  x2="210" y2="105" stroke="#a855f7" className="lc" strokeWidth="1.2" />
                  <line x1="210" y1="105" x2="205" y2="140" stroke="#f472b6" className="ld" strokeWidth="1.2" />
                  <line x1="205" y1="140" x2="188" y2="170" stroke="#a855f7" className="le" strokeWidth="1.2" />
                  <line x1="188" y1="170" x2="165" y2="185" stroke="#ec4899" className="lf" strokeWidth="1.2" />
                  <line x1="165" y1="185" x2="144" y2="188" stroke="#c084fc" className="lg" strokeWidth="1.2" />
                  <line x1="144" y1="188" x2="123" y2="185" stroke="#a855f7" className="lh" strokeWidth="1.2" />
                  <line x1="123" y1="185" x2="100" y2="170" stroke="#f472b6" className="li" strokeWidth="1.2" />
                  <line x1="100" y1="170" x2="83"  y2="140" stroke="#a855f7" className="lj" strokeWidth="1.2" />
                  <line x1="83"  y1="140" x2="78"  y2="105" stroke="#ec4899" className="lk" strokeWidth="1.2" />
                  <line x1="78"  y1="105" x2="100" y2="75"  stroke="#c084fc" className="ll" strokeWidth="1.2" />

                  {/* Cross connections */}
                  <line x1="144" y1="90"  x2="144" y2="145" stroke="#f0abfc" className="la" strokeWidth="1" />
                  <line x1="144" y1="145" x2="205" y2="140" stroke="#a855f7" className="lb" strokeWidth="1" />
                  <line x1="144" y1="145" x2="83"  y2="140" stroke="#ec4899" className="lc" strokeWidth="1" />
                  <line x1="144" y1="145" x2="165" y2="185" stroke="#c084fc" className="ld" strokeWidth="1" />
                  <line x1="144" y1="145" x2="123" y2="185" stroke="#f472b6" className="le" strokeWidth="1" />
                  <line x1="100" y1="75"  x2="188" y2="75"  stroke="#a855f7" className="lf" strokeWidth="1" />
                  <line x1="78"  y1="105" x2="210" y2="105" stroke="#c084fc" className="lg" strokeWidth="1" />
                  <line x1="83"  y1="140" x2="188" y2="170" stroke="#f472b6" className="lh" strokeWidth="1" />
                  <line x1="100" y1="170" x2="205" y2="140" stroke="#a855f7" className="li" strokeWidth="1" />
                  <line x1="100" y1="75"  x2="144" y2="145" stroke="#ec4899" className="lj" strokeWidth="1" />
                  <line x1="188" y1="75"  x2="144" y2="145" stroke="#a855f7" className="lk" strokeWidth="1" />
                  <line x1="210" y1="105" x2="100" y2="170" stroke="#f472b6" className="ll" strokeWidth="1" />
                  <line x1="78"  y1="105" x2="188" y2="170" stroke="#ec4899" className="lm" strokeWidth="1" />

                  {/* Traveling signals */}
                  <line x1="100" y1="75" x2="210" y2="105" stroke="#f0abfc" strokeWidth="2.5" className="s1" />
                  <line x1="144" y1="90" x2="188" y2="170" stroke="#ec4899" strokeWidth="2.5" className="s2" />
                  <line x1="83"  y1="140" x2="205" y2="140" stroke="#c084fc" strokeWidth="2.5" className="s3" />

                  {/* Nodes */}
                  <circle cx="100" cy="75"  r="5" fill="url(#ng2)" className="n1" />
                  <circle cx="144" cy="90"  r="6" fill="url(#ng1)" className="n2" />
                  <circle cx="188" cy="75"  r="5" fill="url(#ng3)" className="n3" />
                  <circle cx="210" cy="105" r="4" fill="url(#ng2)" className="n4" />
                  <circle cx="205" cy="140" r="5" fill="url(#ng1)" className="n5" />
                  <circle cx="188" cy="170" r="4" fill="url(#ng3)" className="n6" />
                  <circle cx="165" cy="185" r="5" fill="url(#ng2)" className="n7" />
                  <circle cx="144" cy="188" r="4" fill="url(#ng1)" className="n8" />
                  <circle cx="123" cy="185" r="5" fill="url(#ng3)" className="n9" />
                  <circle cx="100" cy="170" r="4" fill="url(#ng2)" className="n10" />
                  <circle cx="83"  cy="140" r="5" fill="url(#ng1)" className="n11" />
                  <circle cx="78"  cy="105" r="4" fill="url(#ng3)" className="n12" />

                  {/* Center node */}
                  <circle cx="144" cy="145" r="10" fill="url(#ng1)" className="n3" style={{ filter: "drop-shadow(0 0 10px #a855f7)" }} />
                  <circle cx="144" cy="145" r="5"  fill="white" opacity="0.95" />
                </g>

                {/* Brain outline */}
                <path d="
                  M 144 38
                  C 118 35, 90 45, 76 65
                  C 60 85, 58 108, 65 128
                  C 52 140, 46 158, 52 175
                  C 58 192, 74 202, 92 202
                  C 96 214, 106 222, 118 224
                  C 128 230, 140 228, 144 225
                  C 148 228, 160 230, 170 224
                  C 182 222, 192 214, 196 202
                  C 214 202, 230 192, 236 175
                  C 242 158, 236 140, 223 128
                  C 230 108, 228 85, 212 65
                  C 198 45, 170 35, 144 38 Z
                "
                  fill="none"
                  stroke="url(#brainGrad)"
                  strokeWidth="2.5"
                  className="brain-outline"
                />

                {/* Brain stem */}
                <path d="M 128 225 C 128 240, 132 250, 132 258 L 156 258 C 156 250, 160 240, 160 225"
                  fill="none" stroke="url(#brainGrad)" strokeWidth="2" strokeOpacity="0.6" />
                <line x1="132" y1="258" x2="156" y2="258" stroke="url(#brainGrad)" strokeWidth="2" strokeOpacity="0.5" />

                {/* Radiating particles outside */}
                {[
                  { cx: 240, cy: 90,  cls: "n2", r: 2.5 },
                  { cx: 252, cy: 140, cls: "n4", r: 3 },
                  { cx: 242, cy: 188, cls: "n6", r: 2.5 },
                  { cx: 46,  cy: 90,  cls: "n3", r: 2.5 },
                  { cx: 34,  cy: 140, cls: "n5", r: 3 },
                  { cx: 46,  cy: 188, cls: "n7", r: 2.5 },
                  { cx: 110, cy: 22,  cls: "n1", r: 2 },
                  { cx: 144, cy: 16,  cls: "n8", r: 3 },
                  { cx: 178, cy: 22,  cls: "n9", r: 2 },
                ].map((p, i) => (
                  <circle key={i} cx={p.cx} cy={p.cy} r={p.r} fill="#c084fc" className={p.cls} />
                ))}

                {/* Radiating lines */}
                <line x1="223" y1="128" x2="252" y2="140" stroke="#a855f7" className="la" strokeWidth="0.8" />
                <line x1="212" y1="65"  x2="240" y2="90"  stroke="#ec4899" className="lb" strokeWidth="0.8" />
                <line x1="236" y1="175" x2="242" y2="188" stroke="#c084fc" className="lc" strokeWidth="0.8" />
                <line x1="65"  y1="128" x2="34"  y2="140" stroke="#a855f7" className="ld" strokeWidth="0.8" />
                <line x1="76"  y1="65"  x2="46"  y2="90"  stroke="#f472b6" className="le" strokeWidth="0.8" />
                <line x1="52"  y1="175" x2="46"  y2="188" stroke="#ec4899" className="lf" strokeWidth="0.8" />
                <line x1="118" y1="38"  x2="110" y2="22"  stroke="#a855f7" className="lg" strokeWidth="0.8" />
                <line x1="144" y1="38"  x2="144" y2="16"  stroke="#c084fc" className="lh" strokeWidth="0.8" />
                <line x1="170" y1="38"  x2="178" y2="22"  stroke="#f472b6" className="li" strokeWidth="0.8" />
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
              className="group relative mt-2"
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
