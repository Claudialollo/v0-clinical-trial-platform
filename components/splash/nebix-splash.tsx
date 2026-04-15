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
                @keyframes nodeGlow {
                  0%, 100% { opacity: 0.3; }
                  50% { opacity: 1; }
                }
                @keyframes lineGlow {
                  0%, 100% { opacity: 0.1; }
                  50% { opacity: 0.8; }
                }
                @keyframes signalMove {
                  0%   { stroke-dashoffset: 400; opacity: 0; }
                  10%  { opacity: 1; }
                  90%  { opacity: 1; }
                  100% { stroke-dashoffset: 0; opacity: 0; }
                }
                @keyframes outlineBreath {
                  0%, 100% { filter: drop-shadow(0 0 4px #a855f7) drop-shadow(0 0 8px #7c3aed); }
                  50%       { filter: drop-shadow(0 0 12px #c084fc) drop-shadow(0 0 24px #a855f7); }
                }
                .brain-border { animation: outlineBreath 3s ease-in-out infinite; }
                .nd { animation: nodeGlow 2s ease-in-out infinite; }
                .nd:nth-child(2n)   { animation-delay: 0.4s; }
                .nd:nth-child(3n)   { animation-delay: 0.8s; }
                .nd:nth-child(4n)   { animation-delay: 1.2s; }
                .nd:nth-child(5n)   { animation-delay: 1.6s; }
                .ln { animation: lineGlow 2.5s ease-in-out infinite; }
                .ln:nth-child(2n)   { animation-delay: 0.5s; }
                .ln:nth-child(3n)   { animation-delay: 1.0s; }
                .ln:nth-child(4n)   { animation-delay: 1.5s; }
                .sig { stroke-dasharray: 400; animation: signalMove 3.5s ease-in-out infinite; }
                .sig:nth-child(2n)  { animation-delay: 1.2s; }
                .sig:nth-child(3n)  { animation-delay: 2.4s; }
              `}</style>

              <svg width="260" height="260" viewBox="0 0 260 260" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <radialGradient id="bgGlow" cx="50%" cy="45%" r="50%">
                    <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
                  </radialGradient>
                  <linearGradient id="brainStroke" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%"   stopColor="#f97316" />
                    <stop offset="25%"  stopColor="#ec4899" />
                    <stop offset="50%"  stopColor="#a855f7" />
                    <stop offset="75%"  stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                  <clipPath id="brainClip">
                    {/* Anatomically shaped brain - left hemisphere view */}
                    <path d="
                      M 130 22
                      C 108 20, 84 28, 68 46
                      C 54 62, 50 82, 54 100
                      C 44 110, 36 124, 38 140
                      C 40 154, 50 164, 62 170
                      C 60 180, 62 192, 70 200
                      C 78 208, 90 210, 100 208
                      C 104 218, 112 226, 122 228
                      C 128 230, 132 229, 130 228
                      C 128 229, 132 230, 138 228
                      C 148 226, 156 218, 160 208
                      C 170 210, 182 208, 190 200
                      C 198 192, 200 180, 198 170
                      C 210 164, 220 154, 222 140
                      C 224 124, 216 110, 206 100
                      C 210 82, 206 62, 192 46
                      C 176 28, 152 20, 130 22 Z
                    " />
                  </clipPath>
                </defs>

                {/* Ambient glow */}
                <ellipse cx="130" cy="130" rx="110" ry="105" fill="url(#bgGlow)" />

                {/* Brain fill (dark purple) */}
                <path
                  d="M 130 22 C 108 20, 84 28, 68 46 C 54 62, 50 82, 54 100 C 44 110, 36 124, 38 140 C 40 154, 50 164, 62 170 C 60 180, 62 192, 70 200 C 78 208, 90 210, 100 208 C 104 218, 112 226, 122 228 C 128 230, 132 229, 130 228 C 128 229, 132 230, 138 228 C 148 226, 156 218, 160 208 C 170 210, 182 208, 190 200 C 198 192, 200 180, 198 170 C 210 164, 220 154, 222 140 C 224 124, 216 110, 206 100 C 210 82, 206 62, 192 46 C 176 28, 152 20, 130 22 Z"
                  fill="#2d1b69" fillOpacity="0.35"
                />

                {/* Cortex fold lines (circumvoluzioni) */}
                <g fill="none" strokeWidth="1.2" strokeOpacity="0.22" stroke="#c084fc">
                  {/* Left hemisphere folds */}
                  <path d="M 64 68 C 72 60, 84 62, 88 72 C 84 80, 72 78, 68 86" />
                  <path d="M 46 108 C 54 100, 66 104, 68 114 C 64 122, 52 120, 50 130" />
                  <path d="M 44 148 C 52 140, 64 144, 66 154 C 62 162, 52 160, 54 170" />
                  {/* Right hemisphere folds */}
                  <path d="M 196 68 C 188 60, 176 62, 172 72 C 176 80, 188 78, 192 86" />
                  <path d="M 214 108 C 206 100, 194 104, 192 114 C 196 122, 208 120, 210 130" />
                  <path d="M 216 148 C 208 140, 196 144, 194 154 C 198 162, 208 160, 206 170" />
                  {/* Top folds */}
                  <path d="M 90 28 C 96 22, 108 24, 110 34 C 106 40, 96 38, 98 46" />
                  <path d="M 150 28 C 156 22, 164 24, 164 34 C 160 40, 152 38, 154 46" />
                  {/* Center divide */}
                  <path d="M 130 24 C 127 70, 127 140, 130 228" strokeDasharray="5 7" strokeOpacity="0.18" />
                  {/* Bottom folds */}
                  <path d="M 88 196 C 96 188, 108 192, 110 202" />
                  <path d="M 150 196 C 158 188, 170 192, 172 202" />
                </g>

                {/* Neural connection lines (inside brain) */}
                <g clipPath="url(#brainClip)">
                  {/* Lines */}
                  {[
                    ["88","55","130","72"],
                    ["130","72","172","55"],
                    ["172","55","200","85"],
                    ["200","85","208","118"],
                    ["208","118","198","152"],
                    ["198","152","176","176"],
                    ["176","176","152","188"],
                    ["152","188","130","190"],
                    ["130","190","108","188"],
                    ["108","188","84","176"],
                    ["84","176","62","152"],
                    ["62","152","52","118"],
                    ["52","118","60","85"],
                    ["60","85","88","55"],
                    // cross lines
                    ["130","72","130","140"],
                    ["130","140","208","118"],
                    ["130","140","52","118"],
                    ["130","140","198","152"],
                    ["130","140","62","152"],
                    ["130","140","176","176"],
                    ["130","140","84","176"],
                    ["88","55","172","55"],
                    ["60","85","200","85"],
                    ["62","152","176","176"],
                    ["84","176","198","152"],
                    ["88","55","130","140"],
                    ["172","55","130","140"],
                  ].map(([x1,y1,x2,y2], i) => (
                    <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
                      stroke={["#f97316","#ec4899","#a855f7","#6366f1","#3b82f6","#06b6d4"][i % 6]}
                      strokeWidth="1" className="ln" />
                  ))}

                  {/* Traveling signals */}
                  {[
                    ["88","55","208","118"],
                    ["130","72","84","176"],
                    ["52","118","198","152"],
                    ["60","85","176","176"],
                  ].map(([x1,y1,x2,y2], i) => (
                    <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
                      stroke="#f0abfc" strokeWidth="2.5" className="sig" />
                  ))}

                  {/* Nodes */}
                  {[
                    ["88","55","#f97316"],
                    ["130","72","#f97316"],
                    ["172","55","#ec4899"],
                    ["200","85","#ec4899"],
                    ["208","118","#a855f7"],
                    ["198","152","#a855f7"],
                    ["176","176","#6366f1"],
                    ["152","188","#6366f1"],
                    ["130","190","#3b82f6"],
                    ["108","188","#3b82f6"],
                    ["84","176","#06b6d4"],
                    ["62","152","#06b6d4"],
                    ["52","118","#3b82f6"],
                    ["60","85","#ec4899"],
                    ["130","140","#e879f9"],  // center
                  ].map(([cx,cy,color], i) => (
                    <g key={i}>
                      <circle cx={cx} cy={cy} r={i===14?"12":"7"} fill={color as string} opacity="0.15" className="nd" />
                      <circle cx={cx} cy={cy} r={i===14?"6":"4.5"} fill={color as string} className="nd" />
                      <circle cx={cx} cy={cy} r={i===14?"3":"2"} fill="white" opacity="0.95" />
                    </g>
                  ))}
                </g>

                {/* Brain outline — colored gradient, glowing */}
                <path
                  d="M 130 22 C 108 20, 84 28, 68 46 C 54 62, 50 82, 54 100 C 44 110, 36 124, 38 140 C 40 154, 50 164, 62 170 C 60 180, 62 192, 70 200 C 78 208, 90 210, 100 208 C 104 218, 112 226, 122 228 C 128 230, 132 229, 130 228 C 128 229, 132 230, 138 228 C 148 226, 156 218, 160 208 C 170 210, 182 208, 190 200 C 198 192, 200 180, 198 170 C 210 164, 220 154, 222 140 C 224 124, 216 110, 206 100 C 210 82, 206 62, 192 46 C 176 28, 152 20, 130 22 Z"
                  fill="none"
                  stroke="url(#brainStroke)"
                  strokeWidth="2.5"
                  className="brain-border"
                />

                {/* Brain stem */}
                <path d="M 118 228 C 116 238, 116 248, 114 256 L 146 256 C 144 248, 144 238, 142 228"
                  fill="none" stroke="url(#brainStroke)" strokeWidth="2" strokeOpacity="0.5" />
                <line x1="114" y1="256" x2="146" y2="256" stroke="url(#brainStroke)" strokeWidth="2" strokeOpacity="0.4" />

                {/* External radiating nodes */}
                {[
                  [218,82,"#ec4899"], [230,132,"#a855f7"], [218,180,"#6366f1"],
                  [42,82,"#f97316"],  [30,132,"#3b82f6"],  [42,180,"#06b6d4"],
                  [100,14,"#f97316"], [130,10,"#e879f9"],  [160,14,"#ec4899"],
                ].map(([cx,cy,c],i) => (
                  <circle key={i} cx={cx as number} cy={cy as number} r="3" fill={c as string} className="nd" />
                ))}
                {/* Radiating lines to outer nodes */}
                {[
                  ["192","46","218","82"],["206","100","230","132"],["190","200","218","180"],
                  ["68","46","42","82"],  ["54","100","30","132"],  ["70","200","42","180"],
                  ["110","22","100","14"],["130","22","130","10"],  ["150","22","160","14"],
                ].map(([x1,y1,x2,y2],i) => (
                  <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
                    stroke={["#f97316","#ec4899","#a855f7","#3b82f6","#06b6d4","#6366f1"][i%6]}
                    strokeWidth="0.8" className="ln" />
                ))}
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
