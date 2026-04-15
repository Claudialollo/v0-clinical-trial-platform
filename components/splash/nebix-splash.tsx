"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Activity, Brain, Lock, Sparkles } from "lucide-react"

type EntryType = "clinician" | "patient"

interface NebixSplashProps {
  onEnter: (type: EntryType) => void
}

function NebixLogo() {
  return (
    <>
      <style>{`
        @keyframes nodeColorCycle {
          0%   { fill: #f97316; filter: drop-shadow(0 0 5px #f97316); }
          20%  { fill: #ec4899; filter: drop-shadow(0 0 7px #ec4899); }
          40%  { fill: #a855f7; filter: drop-shadow(0 0 7px #a855f7); }
          60%  { fill: #3b82f6; filter: drop-shadow(0 0 7px #3b82f6); }
          80%  { fill: #06b6d4; filter: drop-shadow(0 0 5px #06b6d4); }
          100% { fill: #f97316; filter: drop-shadow(0 0 5px #f97316); }
        }
        @keyframes lineFlash {
          0%, 100% { opacity: 0.12; }
          50%      { opacity: 0.75; }
        }
        @keyframes headGlow {
          0%, 100% { filter: drop-shadow(0 0 4px #7c3aed) drop-shadow(0 0 10px #4c1d95); }
          50%      { filter: drop-shadow(0 0 10px #a855f7) drop-shadow(0 0 22px #7c3aed); }
        }
        .nebix-head { animation: headGlow 3s ease-in-out infinite; }
        .nd { animation: nodeColorCycle 4s ease-in-out infinite; }
        .nd-d0  { animation-delay: 0.0s; }
        .nd-d1  { animation-delay: 0.4s; }
        .nd-d2  { animation-delay: 0.8s; }
        .nd-d3  { animation-delay: 1.2s; }
        .nd-d4  { animation-delay: 1.6s; }
        .nd-d5  { animation-delay: 2.0s; }
        .nd-d6  { animation-delay: 2.4s; }
        .nd-d7  { animation-delay: 2.8s; }
        .nd-d8  { animation-delay: 3.2s; }
        .nd-d9  { animation-delay: 3.6s; }
        .ln { animation: lineFlash 2.5s ease-in-out infinite; }
        .ln-d0 { animation-delay: 0.0s; }
        .ln-d1 { animation-delay: 0.3s; }
        .ln-d2 { animation-delay: 0.6s; }
        .ln-d3 { animation-delay: 0.9s; }
        .ln-d4 { animation-delay: 1.2s; }
        .ln-d5 { animation-delay: 1.5s; }
        .ln-d6 { animation-delay: 1.8s; }
        .ln-d7 { animation-delay: 2.1s; }
        .ln-d8 { animation-delay: 2.4s; }
        .ln-d9 { animation-delay: 2.7s; }
      `}</style>

      <svg
        viewBox="0 0 280 320"
        xmlns="http://www.w3.org/2000/svg"
        className="w-64 h-72 nebix-head"
      >
        <defs>
          <linearGradient id="headStroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#a78bfa" />
            <stop offset="60%"  stopColor="#818cf8" />
            <stop offset="100%" stopColor="#6d28d9" />
          </linearGradient>
          <linearGradient id="brainStroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#c084fc" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>
        </defs>

        {/* ── HEAD SILHOUETTE — profilo sinistro ── */}
        <path
          d="
            M 148 18
            C 172 16, 202 28, 218 52
            C 232 74, 232 102, 222 124
            C 238 136, 244 156, 238 174
            C 232 192, 216 204, 200 210
            C 196 222, 194 238, 192 252
            C 190 264, 186 276, 180 284
            C 174 290, 164 292, 156 288
            C 150 284, 146 276, 148 268
            C 150 260, 156 254, 158 246
            C 160 236, 158 224, 152 216
            C 144 206, 132 202, 124 196
            C 114 188, 108 176, 106 164
            C 104 150, 108 136, 104 124
            C 98 108, 84 98, 82 82
            C 80 66, 90 48, 106 36
            C 118 26, 132 20, 148 18 Z
          "
          fill="none"
          stroke="url(#headStroke)"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.75"
        />

        {/* Neck */}
        <path
          d="M 156 288 C 154 298, 152 308, 150 316"
          fill="none"
          stroke="url(#headStroke)"
          strokeWidth="2.2"
          strokeLinecap="round"
          opacity="0.6"
        />

        {/* Chin / jaw detail */}
        <path
          d="M 106 164 C 102 174, 102 186, 108 194 C 114 200, 122 202, 128 200"
          fill="none"
          stroke="url(#headStroke)"
          strokeWidth="1.6"
          strokeLinecap="round"
          opacity="0.45"
        />

        {/* ── BRAIN OUTLINE inside head ── */}
        <path
          d="
            M 132 38
            C 152 32, 186 38, 204 58
            C 220 76, 222 102, 214 122
            C 230 132, 236 150, 228 166
            C 222 180, 206 188, 192 190
            C 186 200, 180 210, 172 216
            C 164 220, 154 218, 148 212
            C 142 204, 142 192, 136 184
            C 126 174, 112 170, 106 158
            C 100 146, 102 130, 108 118
            C 114 104, 122 88, 132 76
            C 138 62, 132 50, 132 38 Z
          "
          fill="none"
          stroke="url(#brainStroke)"
          strokeWidth="1.8"
          strokeLinecap="round"
          opacity="0.85"
        />

        {/* Brain fold lines (gyri) */}
        <path d="M 132 48  C 138 58, 142 70, 138 82"  fill="none" stroke="#a78bfa" strokeWidth="1.3" strokeLinecap="round" opacity="0.35" />
        <path d="M 162 36  C 168 48, 170 62, 164 74"  fill="none" stroke="#a78bfa" strokeWidth="1.3" strokeLinecap="round" opacity="0.35" />
        <path d="M 108 118 C 118 112, 130 116, 132 128" fill="none" stroke="#a78bfa" strokeWidth="1.3" strokeLinecap="round" opacity="0.35" />
        <path d="M 106 158 C 116 150, 128 154, 130 166" fill="none" stroke="#a78bfa" strokeWidth="1.3" strokeLinecap="round" opacity="0.35" />
        <path d="M 214 122 C 218 134, 226 144, 220 156" fill="none" stroke="#a78bfa" strokeWidth="1.3" strokeLinecap="round" opacity="0.35" />

        {/* ── NEURAL NETWORK LINES ── */}
        {/* Nodes positions:
            A(138,62)  B(168,52)  C(200,72)  D(218,102)
            E(208,136) F(172,114) G(138,114) H(112,136)
            I(120,164) J(152,178) K(190,162) L(162,196)
        */}
        <g strokeLinecap="round" fill="none">
          <line x1="138" y1="62"  x2="168" y2="52"  stroke="#f97316" strokeWidth="1.2" className="ln ln-d0" />
          <line x1="168" y1="52"  x2="200" y2="72"  stroke="#ec4899" strokeWidth="1.2" className="ln ln-d1" />
          <line x1="200" y1="72"  x2="218" y2="102" stroke="#a855f7" strokeWidth="1.2" className="ln ln-d2" />
          <line x1="218" y1="102" x2="208" y2="136" stroke="#6366f1" strokeWidth="1.2" className="ln ln-d3" />
          <line x1="208" y1="136" x2="190" y2="162" stroke="#3b82f6" strokeWidth="1.2" className="ln ln-d4" />
          <line x1="190" y1="162" x2="162" y2="196" stroke="#06b6d4" strokeWidth="1.2" className="ln ln-d5" />
          <line x1="162" y1="196" x2="152" y2="178" stroke="#a855f7" strokeWidth="1.2" className="ln ln-d6" />
          <line x1="152" y1="178" x2="120" y2="164" stroke="#ec4899" strokeWidth="1.2" className="ln ln-d7" />
          <line x1="120" y1="164" x2="112" y2="136" stroke="#f97316" strokeWidth="1.2" className="ln ln-d8" />
          <line x1="112" y1="136" x2="138" y2="114" stroke="#a855f7" strokeWidth="1.2" className="ln ln-d9" />
          <line x1="138" y1="114" x2="172" y2="114" stroke="#06b6d4" strokeWidth="1.2" className="ln ln-d0" />
          <line x1="172" y1="114" x2="208" y2="136" stroke="#ec4899" strokeWidth="1.2" className="ln ln-d1" />
          {/* Cross connections */}
          <line x1="138" y1="62"  x2="172" y2="114" stroke="#6366f1" strokeWidth="1.0" className="ln ln-d2" />
          <line x1="168" y1="52"  x2="172" y2="114" stroke="#3b82f6" strokeWidth="1.0" className="ln ln-d3" />
          <line x1="200" y1="72"  x2="172" y2="114" stroke="#f97316" strokeWidth="1.0" className="ln ln-d4" />
          <line x1="218" y1="102" x2="172" y2="114" stroke="#ec4899" strokeWidth="1.0" className="ln ln-d5" />
          <line x1="112" y1="136" x2="152" y2="178" stroke="#a855f7" strokeWidth="1.0" className="ln ln-d6" />
          <line x1="138" y1="114" x2="152" y2="178" stroke="#06b6d4" strokeWidth="1.0" className="ln ln-d7" />
          <line x1="190" y1="162" x2="152" y2="178" stroke="#f97316" strokeWidth="1.0" className="ln ln-d8" />
          <line x1="138" y1="62"  x2="138" y2="114" stroke="#ec4899" strokeWidth="1.0" className="ln ln-d9" />
          <line x1="120" y1="164" x2="162" y2="196" stroke="#3b82f6" strokeWidth="1.0" className="ln ln-d0" />
        </g>

        {/* ── NODES ── */}
        {[
          [138, 62,  "nd-d0"],
          [168, 52,  "nd-d1"],
          [200, 72,  "nd-d2"],
          [218, 102, "nd-d3"],
          [208, 136, "nd-d4"],
          [172, 114, "nd-d5"],  // center hub — larger
          [138, 114, "nd-d6"],
          [112, 136, "nd-d7"],
          [120, 164, "nd-d8"],
          [152, 178, "nd-d9"],
          [190, 162, "nd-d0"],
          [162, 196, "nd-d1"],
        ].map(([cx, cy, cls], i) => {
          const isHub = i === 5
          return (
            <g key={i}>
              {/* Outer glow ring */}
              <circle
                cx={cx as number} cy={cy as number}
                r={isHub ? 10 : 7}
                className={`nd ${cls}`}
                opacity="0.25"
              />
              {/* Core */}
              <circle
                cx={cx as number} cy={cy as number}
                r={isHub ? 5.5 : 3.8}
                className={`nd ${cls}`}
              />
              {/* White center */}
              <circle
                cx={cx as number} cy={cy as number}
                r={isHub ? 2.5 : 1.8}
                fill="white"
                opacity="0.95"
              />
            </g>
          )
        })}
      </svg>
    </>
  )
}

export function NebixSplash({ onEnter }: NebixSplashProps) {
  const [showSelection, setShowSelection] = useState(false)

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#1a0a2e] via-[#16213e] to-[#0f0f1a]">
      {/* Background blobs */}
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
            className="relative z-10 flex flex-col items-center gap-4 px-6"
          >
            {/* Logo */}
            <motion.div
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", duration: 1.2, bounce: 0.3 }}
            >
              <NebixLogo />
            </motion.div>

            {/* Brand name */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-center -mt-4"
            >
              <h1 className="text-6xl md:text-7xl font-bold tracking-tight bg-gradient-to-r from-white via-violet-200 to-blue-200 bg-clip-text text-transparent">
                NEBix
              </h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="mt-3 text-lg md:text-xl text-slate-400 font-light tracking-wide"
              >
                Neuro-Estrogen-Biotics Integrated Experience
              </motion.p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0, duration: 0.8 }}
              className="max-w-md text-center text-slate-500 text-sm leading-relaxed"
            >
              Advanced clinical trial management platform for gut-brain axis research and neuro-endocrinology studies
            </motion.p>

            {/* Start button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.6 }}
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
