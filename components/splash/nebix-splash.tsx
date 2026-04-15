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
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="relative w-72 h-72 flex items-center justify-center"
            >
              <style>{`
                @keyframes nodeColorCycle {
                  0%   { fill: #f97316; filter: drop-shadow(0 0 6px #f97316); }
                  20%  { fill: #ec4899; filter: drop-shadow(0 0 8px #ec4899); }
                  40%  { fill: #a855f7; filter: drop-shadow(0 0 8px #a855f7); }
                  60%  { fill: #3b82f6; filter: drop-shadow(0 0 8px #3b82f6); }
                  80%  { fill: #06b6d4; filter: drop-shadow(0 0 6px #06b6d4); }
                  100% { fill: #f97316; filter: drop-shadow(0 0 6px #f97316); }
                }
                @keyframes lineFlash {
                  0%, 100% { opacity: 0.15; }
                  50%      { opacity: 0.7; }
                }
                @keyframes outlinePulse {
                  0%, 100% { filter: drop-shadow(0 0 4px #a855f7) drop-shadow(0 0 10px #7c3aed); }
                  50%      { filter: drop-shadow(0 0 10px #c084fc) drop-shadow(0 0 22px #a855f7); }
                }
                .brain-svg { animation: outlinePulse 3s ease-in-out infinite; }
                .nd { animation: nodeColorCycle 4s ease-in-out infinite; }
                .nd-d1  { animation-delay: 0s; }
                .nd-d2  { animation-delay: 0.3s; }
                .nd-d3  { animation-delay: 0.6s; }
                .nd-d4  { animation-delay: 0.9s; }
                .nd-d5  { animation-delay: 1.2s; }
                .nd-d6  { animation-delay: 1.5s; }
                .nd-d7  { animation-delay: 1.8s; }
                .nd-d8  { animation-delay: 2.1s; }
                .nd-d9  { animation-delay: 2.4s; }
                .nd-d10 { animation-delay: 2.7s; }
                .nd-d11 { animation-delay: 3.0s; }
                .nd-d12 { animation-delay: 3.3s; }
                .ln { animation: lineFlash 2.5s ease-in-out infinite; }
                .ln-d1 { animation-delay: 0s; }
                .ln-d2 { animation-delay: 0.4s; }
                .ln-d3 { animation-delay: 0.8s; }
                .ln-d4 { animation-delay: 1.2s; }
                .ln-d5 { animation-delay: 1.6s; }
                .ln-d6 { animation-delay: 2.0s; }
                .ln-d7 { animation-delay: 2.4s; }
                .ln-d8 { animation-delay: 2.8s; }
              `}</style>

              {/* This is the original NEBix logo SVG — head silhouette + brain with neural network inside */}
              <svg
                viewBox="0 0 400 400"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full brain-svg"
              >
                <defs>
                  <linearGradient id="headGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%"   stopColor="#a78bfa" />
                    <stop offset="50%"  stopColor="#818cf8" />
                    <stop offset="100%" stopColor="#6d28d9" />
                  </linearGradient>
                  <linearGradient id="brainOutGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%"   stopColor="#c084fc" />
                    <stop offset="100%" stopColor="#7c3aed" />
                  </linearGradient>
                </defs>

                {/* ── HEAD SILHOUETTE (profile, facing left) ── */}
                <path
                  d="
                    M 230 60
                    C 260 58, 295 75, 310 105
                    C 325 135, 320 170, 305 195
                    C 295 212, 280 222, 270 235
                    C 258 250, 255 268, 252 285
                    C 250 295, 248 308, 244 318
                    C 240 326, 232 330, 225 328
                    C 218 326, 214 318, 215 310
                    C 216 302, 220 296, 222 288
                    C 224 278, 222 268, 218 260
                    C 212 248, 200 242, 192 238
                    C 182 233, 176 228, 172 222
                    C 166 213, 165 200, 166 190
                    C 167 180, 170 172, 168 163
                    C 164 148, 152 138, 150 123
                    C 148 108, 155 92, 166 82
                    C 180 70, 200 62, 230 60 Z
                  "
                  fill="none"
                  stroke="url(#headGrad)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.7"
                />

                {/* Neck line */}
                <path
                  d="M 222 328 C 220 340, 218 352, 216 362"
                  fill="none"
                  stroke="url(#headGrad)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  opacity="0.6"
                />

                {/* Chin detail */}
                <path
                  d="M 166 190 C 163 198, 162 208, 165 215 C 168 220, 173 222, 176 222"
                  fill="none"
                  stroke="url(#headGrad)"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  opacity="0.5"
                />

                {/* ── BRAIN OUTLINE (inside head, upper area) ── */}
                <path
                  d="
                    M 210 85
                    C 230 78, 265 82, 285 100
                    C 302 116, 305 140, 298 160
                    C 292 176, 278 186, 265 190
                    C 258 196, 252 204, 248 212
                    C 244 220, 240 225, 232 226
                    C 224 227, 218 222, 215 215
                    C 210 206, 210 196, 205 188
                    C 198 178, 185 174, 178 165
                    C 170 154, 170 138, 176 126
                    C 182 114, 195 90, 210 85 Z
                  "
                  fill="none"
                  stroke="url(#brainOutGrad)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  opacity="0.9"
                />

                {/* Brain gyri / fold lines */}
                <path d="M 210 85 C 215 95, 220 108, 215 118" fill="none" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
                <path d="M 240 82 C 248 92, 252 106, 248 118" fill="none" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
                <path d="M 176 126 C 184 120, 196 122, 200 132" fill="none" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
                <path d="M 178 165 C 188 158, 200 162, 202 172" fill="none" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
                <path d="M 265 190 C 268 180, 276 172, 282 165" fill="none" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />

                {/* ── NEURAL NETWORK LINES inside brain ── */}
                {/* All lines connect the nodes defined below */}
                <g strokeLinecap="round">
                  {/* n1(215,110) → n2(245,100) */}
                  <line x1="215" y1="110" x2="245" y2="100" stroke="#a855f7" strokeWidth="1.2" className="ln ln-d1" />
                  {/* n1 → n4(230,140) */}
                  <line x1="215" y1="110" x2="230" y2="140" stroke="#6366f1" strokeWidth="1.2" className="ln ln-d2" />
                  {/* n2 → n3(272,120) */}
                  <line x1="245" y1="100" x2="272" y2="120" stroke="#ec4899" strokeWidth="1.2" className="ln ln-d3" />
                  {/* n2 → n4 */}
                  <line x1="245" y1="100" x2="230" y2="140" stroke="#a855f7" strokeWidth="1.2" className="ln ln-d1" />
                  {/* n3 → n5(268,150) */}
                  <line x1="272" y1="120" x2="268" y2="150" stroke="#3b82f6" strokeWidth="1.2" className="ln ln-d4" />
                  {/* n4 → n5 */}
                  <line x1="230" y1="140" x2="268" y2="150" stroke="#06b6d4" strokeWidth="1.2" className="ln ln-d5" />
                  {/* n4 → n6(205,155) */}
                  <line x1="230" y1="140" x2="205" y2="155" stroke="#a855f7" strokeWidth="1.2" className="ln ln-d2" />
                  {/* n4 → n7(248,175) */}
                  <line x1="230" y1="140" x2="248" y2="175" stroke="#ec4899" strokeWidth="1.2" className="ln ln-d6" />
                  {/* n5 → n7 */}
                  <line x1="268" y1="150" x2="248" y2="175" stroke="#f97316" strokeWidth="1.2" className="ln ln-d3" />
                  {/* n6 → n7 */}
                  <line x1="205" y1="155" x2="248" y2="175" stroke="#6366f1" strokeWidth="1.2" className="ln ln-d7" />
                  {/* n6 → n8(215,185) */}
                  <line x1="205" y1="155" x2="215" y2="185" stroke="#a855f7" strokeWidth="1.2" className="ln ln-d4" />
                  {/* n7 → n9(232,200) */}
                  <line x1="248" y1="175" x2="232" y2="200" stroke="#ec4899" strokeWidth="1.2" className="ln ln-d8" />
                  {/* n8 → n9 */}
                  <line x1="215" y1="185" x2="232" y2="200" stroke="#3b82f6" strokeWidth="1.2" className="ln ln-d5" />
                  {/* n1 → n6 */}
                  <line x1="215" y1="110" x2="205" y2="155" stroke="#06b6d4" strokeWidth="1.2" className="ln ln-d1" />
                  {/* n3 → n4 */}
                  <line x1="272" y1="120" x2="230" y2="140" stroke="#f97316" strokeWidth="1.2" className="ln ln-d6" />
                </g>

                {/* ── NODES ── */}
                {/* n1 */ }
                <circle cx="215" cy="110" r="5.5" className="nd nd-d1" />
                <circle cx="215" cy="110" r="2.5" fill="white" opacity="0.9" />
                {/* n2 */}
                <circle cx="245" cy="100" r="5" className="nd nd-d2" />
                <circle cx="245" cy="100" r="2.5" fill="white" opacity="0.9" />
                {/* n3 */}
                <circle cx="272" cy="120" r="4.5" className="nd nd-d3" />
                <circle cx="272" cy="120" r="2" fill="white" opacity="0.9" />
                {/* n4 — center, larger */}
                <circle cx="230" cy="140" r="7" className="nd nd-d4" />
                <circle cx="230" cy="140" r="3" fill="white" opacity="0.95" />
                {/* n5 */}
                <circle cx="268" cy="150" r="5" className="nd nd-d5" />
                <circle cx="268" cy="150" r="2.5" fill="white" opacity="0.9" />
                {/* n6 */}
                <circle cx="205" cy="155" r="5" className="nd nd-d6" />
                <circle cx="205" cy="155" r="2.5" fill="white" opacity="0.9" />
                {/* n7 */}
                <circle cx="248" cy="175" r="5.5" className="nd nd-d7" />
                <circle cx="248" cy="175" r="2.5" fill="white" opacity="0.9" />
                {/* n8 */}
                <circle cx="215" cy="185" r="4.5" className="nd nd-d8" />
                <circle cx="215" cy="185" r="2" fill="white" opacity="0.9" />
                {/* n9 */}
                <circle cx="232" cy="200" r="5" className="nd nd-d9" />
                <circle cx="232" cy="200" r="2.5" fill="white" opacity="0.9" />
                {/* extra top node */}
                <circle cx="260" cy="88" r="4" className="nd nd-d10" />
                <circle cx="260" cy="88" r="2" fill="white" opacity="0.9" />
                {/* extra left node */}
                <circle cx="185" cy="135" r="4" className="nd nd-d11" />
                <circle cx="185" cy="135" r="2" fill="white" opacity="0.9" />
                {/* extra connection */}
                <line x1="185" y1="135" x2="215" y2="110" stroke="#c084fc" strokeWidth="1.2" className="ln ln-d7" />
                <line x1="185" y1="135" x2="205" y2="155" stroke="#a855f7" strokeWidth="1.2" className="ln ln-d8" />
                <line x1="260" y1="88"  x2="245" y2="100" stroke="#f97316" strokeWidth="1.2" className="ln ln-d2" />
                <line x1="260" y1="88"  x2="272" y2="120" stroke="#ec4899" strokeWidth="1.2" className="ln ln-d3" />
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

      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 flex items-center gap-2 text-slate-600"
      >
        <Lock className="w-3.5 h-3.5" />
        <span className="text-xs tracking-wide">Secure Clinical Environment | End-to-End Encrypted</span>
      </motion.footer>
    </div>
  )
}
