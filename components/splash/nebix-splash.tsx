"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Activity, Brain, Lock, Sparkles } from "lucide-react"

type EntryType = "clinician" | "patient"

interface NebixSplashProps {
  onEnter: (type: EntryType) => void
}

export function NebixSplash({ onEnter }: NebixSplashProps) {
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

      <NebixContent onEnter={(type) => {
        // handled inside
      }} />
    </div>
  )
}

function NebixContent({ onEnter }: NebixSplashProps) {
  const [showSelection, setShowSelection] = useState(false)

  return (
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
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative w-64 h-56 flex items-center justify-center"
          >
            <style>{`
              @keyframes brainPulse {
                0%, 100% {
                  filter: drop-shadow(0 0 6px #06b6d4) drop-shadow(0 0 14px #a855f7) drop-shadow(0 0 28px #ec4899);
                  opacity: 0.85;
                }
                50% {
                  filter: drop-shadow(0 0 12px #06b6d4) drop-shadow(0 0 28px #a855f7) drop-shadow(0 0 52px #ec4899);
                  opacity: 1;
                }
              }
              .brain-glow {
                animation: brainPulse 2.8s ease-in-out infinite;
              }
            `}</style>

            <svg
              viewBox="0 0 220 190"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full brain-glow"
            >
              <defs>
                <linearGradient id="brainGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%"   stopColor="#06b6d4" />
                  <stop offset="40%"  stopColor="#7c3aed" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>

              {/*
                Brain top-down view — two hemispheres with gyri (lobes).
                Left hemisphere (mirrored on right).
                Drawn as a single path outline.
              */}

              {/* LEFT HEMISPHERE */}
              <path
                d="
                  M 108 18
                  C 100 14, 88 12, 76 16
                  C 62 20, 52 30, 48 40
                  C 40 38, 30 42, 26 52
                  C 22 62, 26 74, 34 80
                  C 28 86, 24 96, 26 106
                  C 28 116, 36 124, 46 128
                  C 42 136, 42 148, 48 156
                  C 54 164, 64 168, 74 166
                  C 78 172, 86 178, 96 178
                  C 104 178, 110 174, 112 168
                  L 112 22
                  C 111 20, 110 18, 108 18
                  Z

                  M 76 16
                  C 82 10, 94 8, 104 12

                  M 48 40
                  C 56 34, 68 32, 76 38
                  C 80 42, 80 50, 76 54
                  C 70 58, 62 56, 58 50

                  M 34 80
                  C 42 74, 54 74, 60 82
                  C 64 88, 62 98, 56 102
                  C 50 106, 40 104, 36 98

                  M 46 128
                  C 54 122, 66 124, 70 132
                  C 74 140, 70 150, 62 154
                  C 56 156, 48 152, 46 146
                "
                fill="none"
                stroke="url(#brainGrad)"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* RIGHT HEMISPHERE (mirror) */}
              <path
                d="
                  M 112 18
                  C 120 14, 132 12, 144 16
                  C 158 20, 168 30, 172 40
                  C 180 38, 190 42, 194 52
                  C 198 62, 194 74, 186 80
                  C 192 86, 196 96, 194 106
                  C 192 116, 184 124, 174 128
                  C 178 136, 178 148, 172 156
                  C 166 164, 156 168, 146 166
                  C 142 172, 134 178, 124 178
                  C 116 178, 110 174, 108 168
                  L 108 22
                  C 109 20, 110 18, 112 18
                  Z

                  M 144 16
                  C 138 10, 126 8, 116 12

                  M 172 40
                  C 164 34, 152 32, 144 38
                  C 140 42, 140 50, 144 54
                  C 150 58, 158 56, 162 50

                  M 186 80
                  C 178 74, 166 74, 160 82
                  C 156 88, 158 98, 164 102
                  C 170 106, 180 104, 184 98

                  M 174 128
                  C 166 122, 154 124, 150 132
                  C 146 140, 150 150, 158 154
                  C 164 156, 172 152, 174 146
                "
                fill="none"
                stroke="url(#brainGrad)"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Center divider line */}
              <line
                x1="110" y1="18"
                x2="110" y2="172"
                stroke="url(#brainGrad)"
                strokeWidth="2"
                strokeOpacity="0.6"
                strokeDasharray="5 6"
              />

              {/* Brain stem */}
              <path
                d="M 96 178 C 96 186, 98 192, 100 196 L 120 196 C 122 192, 124 186, 124 178"
                fill="none"
                stroke="url(#brainGrad)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeOpacity="0.7"
              />
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

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            onClick={() => setShowSelection(true)}
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
  )
}
