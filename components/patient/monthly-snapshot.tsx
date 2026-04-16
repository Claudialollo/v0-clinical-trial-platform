"use client"

import { useState } from "react"
import {
  Moon, Apple, Activity, Brain, ChevronRight,
  ChevronLeft, CheckCircle2, Plus, Trash2, Sparkles,
  Leaf, Flame, Wheat, Droplets, Info
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

// ── TYPES ─────────────────────────────────────────────────────────
type Step = "sleep" | "nutrition_questionnaire" | "nutrition_meals" | "results"

interface SleepData {
  hoursPerNight: number | null
  quality: number | null
  wakeUps: string | null
  stressLevel: number | null
  physicalActivity: string | null
  smoking: string | null
  alcohol: string | null
}

interface NutritionAnswers {
  vegetables: string | null
  legumes: string | null
  fermented: string | null
  wholegrains: string | null
  redMeat: string | null
  processedFood: string | null
  fish: string | null
  fruit: string | null
  nuts: string | null
  water: string | null
}

interface Meal {
  id: string
  name: string
  quantity: string
}

// ── ESTROBOLOME FOOD DATABASE ─────────────────────────────────────
const FOOD_DB: Record<string, {
  calories: number
  proteins: number
  carbs: number
  fats: number
  fibers: number
  estrobolomeScore: number
  reason: string
}> = {
  "yogurt":          { calories: 61,  proteins: 3.5, carbs: 4.7, fats: 3.3, fibers: 0,   estrobolomeScore: 9,  reason: "Probiotic — restores gmGUS activity" },
  "kefir":           { calories: 52,  proteins: 3.4, carbs: 4.8, fats: 2.0, fibers: 0,   estrobolomeScore: 10, reason: "Rich in Lactobacillus strains — high gmGUS support" },
  "kimchi":          { calories: 15,  proteins: 1.1, carbs: 2.4, fats: 0.5, fibers: 1.6, estrobolomeScore: 10, reason: "Fermented — directly supports estrobolome diversity" },
  "sauerkraut":      { calories: 19,  proteins: 0.9, carbs: 4.3, fats: 0.1, fibers: 2.9, estrobolomeScore: 9,  reason: "Fermented cabbage — high fiber + probiotic" },
  "flaxseed":        { calories: 534, proteins: 18,  carbs: 29,  fats: 42,  fibers: 27,  estrobolomeScore: 9,  reason: "Phytoestrogens + fiber — strong estrobolome support" },
  "broccoli":        { calories: 34,  proteins: 2.8, carbs: 7,   fats: 0.4, fibers: 2.6, estrobolomeScore: 8,  reason: "DIM compound — supports estrogen metabolism" },
  "lentils":         { calories: 116, proteins: 9,   carbs: 20,  fats: 0.4, fibers: 8,   estrobolomeScore: 8,  reason: "Prebiotic fiber — feeds Bifidobacterium" },
  "chickpeas":       { calories: 164, proteins: 8.9, carbs: 27,  fats: 2.6, fibers: 7.6, estrobolomeScore: 8,  reason: "Prebiotic + phytoestrogens" },
  "oats":            { calories: 389, proteins: 17,  carbs: 66,  fats: 7,   fibers: 10,  estrobolomeScore: 7,  reason: "Beta-glucan fiber — supports microbiome diversity" },
  "banana":          { calories: 89,  proteins: 1.1, carbs: 23,  fats: 0.3, fibers: 2.6, estrobolomeScore: 7,  reason: "Fructooligosaccharides — prebiotic effect" },
  "garlic":          { calories: 149, proteins: 6.4, carbs: 33,  fats: 0.5, fibers: 2.1, estrobolomeScore: 8,  reason: "Inulin — powerful prebiotic for Bifidobacterium" },
  "onion":           { calories: 40,  proteins: 1.1, carbs: 9.3, fats: 0.1, fibers: 1.7, estrobolomeScore: 7,  reason: "Quercetin + inulin — anti-inflammatory + prebiotic" },
  "blueberries":     { calories: 57,  proteins: 0.7, carbs: 14,  fats: 0.3, fibers: 2.4, estrobolomeScore: 8,  reason: "Polyphenols — increase microbiome diversity" },
  "salmon":          { calories: 208, proteins: 20,  carbs: 0,   fats: 13,  fibers: 0,   estrobolomeScore: 6,  reason: "Omega-3 — anti-inflammatory, supports estrogen signaling" },
  "whole bread":     { calories: 247, proteins: 8.5, carbs: 48,  fats: 3.3, fibers: 6.8, estrobolomeScore: 6,  reason: "Whole grain fiber — supports microbiome" },
  "pasta":           { calories: 158, proteins: 5.5, carbs: 31,  fats: 0.9, fibers: 1.8, estrobolomeScore: 3,  reason: "Low fiber — minimal microbiome support" },
  "white rice":      { calories: 130, proteins: 2.7, carbs: 28,  fats: 0.3, fibers: 0.4, estrobolomeScore: 2,  reason: "Very low fiber — no estrobolome support" },
  "chicken":         { calories: 165, proteins: 31,  carbs: 0,   fats: 3.6, fibers: 0,   estrobolomeScore: 3,  reason: "Neutral — no specific estrobolome effect" },
  "eggs":            { calories: 155, proteins: 13,  carbs: 1.1, fats: 11,  fibers: 0,   estrobolomeScore: 4,  reason: "Choline — supports liver estrogen processing" },
  "red meat":        { calories: 271, proteins: 26,  carbs: 0,   fats: 18,  fibers: 0,   estrobolomeScore: 1,  reason: "High saturated fat — may reduce microbiome diversity" },
  "processed food":  { calories: 450, proteins: 12,  carbs: 52,  fats: 22,  fibers: 1.2, estrobolomeScore: 0,  reason: "Ultra-processed — negative impact on estrobolome" },
  "olive oil":       { calories: 884, proteins: 0,   carbs: 0,   fats: 100, fibers: 0,   estrobolomeScore: 6,  reason: "Polyphenols — anti-inflammatory effect" },
  "coffee":          { calories: 2,   proteins: 0.3, carbs: 0,   fats: 0,   fibers: 0,   estrobolomeScore: 5,  reason: "Polyphenols — moderate microbiome support" },
  "green tea":       { calories: 1,   proteins: 0,   carbs: 0.2, fats: 0,   fibers: 0,   estrobolomeScore: 7,  reason: "Catechins — support estrogen metabolism" },
  "dark chocolate":  { calories: 546, proteins: 5,   carbs: 60,  fats: 31,  fibers: 7,   estrobolomeScore: 6,  reason: "Flavonoids — microbiome diversity support" },
  "almonds":         { calories: 579, proteins: 21,  carbs: 22,  fats: 50,  fibers: 12,  estrobolomeScore: 7,  reason: "Prebiotic fiber + healthy fats" },
  "walnuts":         { calories: 654, proteins: 15,  carbs: 14,  fats: 65,  fibers: 6.7, estrobolomeScore: 7,  reason: "ALA omega-3 + polyphenols" },
  "tofu":            { calories: 76,  proteins: 8,   carbs: 1.9, fats: 4.8, fibers: 0.3, estrobolomeScore: 8,  reason: "Isoflavones — phytoestrogens that support estrobolome" },
  "spinach":         { calories: 23,  proteins: 2.9, carbs: 3.6, fats: 0.4, fibers: 2.2, estrobolomeScore: 7,  reason: "Magnesium + fiber — supports gut health" },
  "apple":           { calories: 52,  proteins: 0.3, carbs: 14,  fats: 0.2, fibers: 2.4, estrobolomeScore: 7,  reason: "Pectin — prebiotic fiber for Bifidobacterium" },
}

const FOOD_SUGGESTIONS = Object.keys(FOOD_DB)

// ── STEP INDICATOR ────────────────────────────────────────────────
function StepIndicator({ current }: { current: Step }) {
  const steps: { id: Step; label: string }[] = [
    { id: "sleep",                   label: "Sleep & Lifestyle" },
    { id: "nutrition_questionnaire", label: "Nutrition Survey" },
    { id: "nutrition_meals",         label: "Typical Day Meals" },
    { id: "results",                 label: "My Profile" },
  ]
  const currentIndex = steps.findIndex(s => s.id === current)
  return (
    <div className="flex items-center gap-0 mb-8">
      {steps.map((step, i) => (
        <div key={step.id} className="flex items-center flex-1">
          <div className="flex flex-col items-center gap-1.5">
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all",
              i < currentIndex  ? "bg-primary text-primary-foreground" :
              i === currentIndex ? "bg-primary text-primary-foreground ring-4 ring-primary/20" :
                                   "bg-muted text-muted-foreground"
            )}>
              {i < currentIndex ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
            </div>
            <span className={cn("text-[10px] text-center leading-tight max-w-[70px]",
              i === currentIndex ? "text-primary font-semibold" : "text-muted-foreground"
            )}>
              {step.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div className={cn("flex-1 h-0.5 mb-4 mx-1 transition-all",
              i < currentIndex ? "bg-primary" : "bg-muted"
            )} />
          )}
        </div>
      ))}
    </div>
  )
}

// ── SLEEP SECTION ─────────────────────────────────────────────────
function SleepSection({ data, onChange }: {
  data: SleepData
  onChange: (d: SleepData) => void
}) {
  const update = (key: keyof SleepData, value: any) =>
    onChange({ ...data, [key]: value })

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold mb-1">Sleep & Lifestyle</h2>
        <p className="text-sm text-muted-foreground">Tell us about your daily habits. This helps us understand your baseline and how lifestyle factors may influence your gut-brain axis.</p>
      </div>

      {/* Hours of sleep */}
      <div className="space-y-3">
        <label className="text-sm font-semibold flex items-center gap-2">
          <Moon className="w-4 h-4 text-violet-500" />
          How many hours do you sleep per night on average?
        </label>
        <div className="flex gap-2 flex-wrap">
          {["< 5", "5–6", "6–7", "7–8", "8–9", "> 9"].map(opt => (
            <button key={opt} onClick={() => update("hoursPerNight", opt)}
              className={cn("px-4 py-2 rounded-xl border text-sm font-medium transition-all",
                data.hoursPerNight === opt
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border hover:border-primary/50 hover:bg-primary/5"
              )}>
              {opt}h
            </button>
          ))}
        </div>
      </div>

      {/* Sleep quality */}
      <div className="space-y-3">
        <label className="text-sm font-semibold">How would you rate your sleep quality? (1 = very poor, 5 = excellent)</label>
        <div className="flex gap-2">
          {[1,2,3,4,5].map(n => (
            <button key={n} onClick={() => update("quality", n)}
              className={cn("w-12 h-12 rounded-xl border text-sm font-bold transition-all",
                data.quality === n
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border hover:border-primary/50"
              )}>
              {n}
            </button>
          ))}
        </div>
      </div>

      {/* Night wake-ups */}
      <div className="space-y-3">
        <label className="text-sm font-semibold">Do you wake up during the night?</label>
        <div className="flex gap-2 flex-wrap">
          {["Never", "Rarely", "1–2 times/week", "Most nights", "Every night"].map(opt => (
            <button key={opt} onClick={() => update("wakeUps", opt)}
              className={cn("px-4 py-2 rounded-xl border text-sm transition-all",
                data.wakeUps === opt
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border hover:border-primary/50 hover:bg-primary/5"
              )}>
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Stress */}
      <div className="space-y-3">
        <label className="text-sm font-semibold">Average stress level this month (1 = very low, 5 = very high)</label>
        <div className="flex gap-2">
          {[1,2,3,4,5].map(n => (
            <button key={n} onClick={() => update("stressLevel", n)}
              className={cn("w-12 h-12 rounded-xl border text-sm font-bold transition-all",
                data.stressLevel === n
                  ? "bg-amber-500 text-white border-amber-500"
                  : "border-border hover:border-amber-500/50"
              )}>
              {n}
            </button>
          ))}
        </div>
      </div>

      {/* Physical activity */}
      <div className="space-y-3">
        <label className="text-sm font-semibold flex items-center gap-2">
          <Activity className="w-4 h-4 text-emerald-500" />
          Physical activity per week
        </label>
        <div className="flex gap-2 flex-wrap">
          {["None", "1–2 days", "3–4 days", "5+ days", "Daily"].map(opt => (
            <button key={opt} onClick={() => update("physicalActivity", opt)}
              className={cn("px-4 py-2 rounded-xl border text-sm transition-all",
                data.physicalActivity === opt
                  ? "bg-emerald-500 text-white border-emerald-500"
                  : "border-border hover:border-emerald-500/50 hover:bg-emerald-500/5"
              )}>
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Smoking */}
      <div className="space-y-3">
        <label className="text-sm font-semibold">Do you smoke?</label>
        <div className="flex gap-2">
          {["No", "Occasionally", "Yes — less than 10/day", "Yes — more than 10/day"].map(opt => (
            <button key={opt} onClick={() => update("smoking", opt)}
              className={cn("px-4 py-2 rounded-xl border text-sm transition-all",
                data.smoking === opt
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border hover:border-primary/50 hover:bg-primary/5"
              )}>
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Alcohol */}
      <div className="space-y-3">
        <label className="text-sm font-semibold">Alcohol consumption</label>
        <div className="flex gap-2 flex-wrap">
          {["None", "Rarely", "1–3 drinks/week", "4–7 drinks/week", "Daily"].map(opt => (
            <button key={opt} onClick={() => update("alcohol", opt)}
              className={cn("px-4 py-2 rounded-xl border text-sm transition-all",
                data.alcohol === opt
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border hover:border-primary/50 hover:bg-primary/5"
              )}>
              {opt}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── NUTRITION QUESTIONNAIRE ───────────────────────────────────────
function NutritionQuestionnaire({ data, onChange }: {
  data: NutritionAnswers
  onChange: (d: NutritionAnswers) => void
}) {
  const update = (key: keyof NutritionAnswers, value: string) =>
    onChange({ ...data, [key]: value })

  const freq = ["Never", "1–2×/month", "1×/week", "2–3×/week", "Daily"]

  const questions: { key: keyof NutritionAnswers; label: string; icon: string; tip: string }[] = [
    { key: "vegetables",     label: "Fresh vegetables",                icon: "🥦", tip: "Broccoli, spinach, courgette, peppers..." },
    { key: "legumes",        label: "Legumes (lentils, chickpeas, beans)", icon: "🫘", tip: "Key prebiotic fiber for the estrobolome" },
    { key: "fermented",      label: "Fermented foods",                 icon: "🫙", tip: "Yogurt, kefir, kimchi, miso, sauerkraut" },
    { key: "wholegrains",    label: "Whole grains",                    icon: "🌾", tip: "Oats, whole bread, brown rice, quinoa" },
    { key: "redMeat",        label: "Red or processed meat",           icon: "🥩", tip: "Beef, pork, sausages, cold cuts" },
    { key: "processedFood",  label: "Ultra-processed foods",           icon: "🍟", tip: "Packaged snacks, fast food, ready meals" },
    { key: "fish",           label: "Fish (especially oily fish)",     icon: "🐟", tip: "Salmon, mackerel, sardines, tuna" },
    { key: "fruit",          label: "Fresh fruit",                     icon: "🍎", tip: "Especially berries, apples, citrus" },
    { key: "nuts",           label: "Nuts and seeds",                  icon: "🌰", tip: "Almonds, walnuts, flaxseed, chia" },
    { key: "water",          label: "Water intake per day",            icon: "💧", tip: "Essential for intestinal transit" },
  ]

  const waterOpts = ["< 1L", "1–1.5L", "1.5–2L", "2–2.5L", "> 2.5L"]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold mb-1">Nutrition Survey</h2>
        <p className="text-sm text-muted-foreground">How often do you eat these foods? Your answers help us estimate your macronutrients and calculate your Estrobolome Support Score.</p>
      </div>

      <div className="space-y-4">
        {questions.map(q => (
          <div key={q.key} className="p-4 rounded-xl border border-border bg-card">
            <div className="flex items-start gap-3 mb-3">
              <span className="text-2xl">{q.icon}</span>
              <div>
                <p className="font-semibold text-sm">{q.label}</p>
                <p className="text-xs text-muted-foreground">{q.tip}</p>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              {(q.key === "water" ? waterOpts : freq).map(opt => (
                <button key={opt} onClick={() => update(q.key, opt)}
                  className={cn("px-3 py-1.5 rounded-lg border text-xs font-medium transition-all",
                    data[q.key] === opt
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border hover:border-primary/50 hover:bg-primary/5"
                  )}>
                  {opt}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── MEAL TRACKER ──────────────────────────────────────────────────
function MealTracker({ meals, onChange }: {
  meals: Meal[]
  onChange: (m: Meal[]) => void
}) {
  const [input, setInput] = useState("")
  const [qty, setQty] = useState("100g")
  const [suggestions, setSuggestions] = useState<string[]>([])

  const handleInput = (val: string) => {
    setInput(val)
    if (val.length > 1) {
      setSuggestions(FOOD_SUGGESTIONS.filter(f =>
        f.toLowerCase().includes(val.toLowerCase())).slice(0, 6))
    } else {
      setSuggestions([])
    }
  }

  const addMeal = (name: string) => {
    if (!name.trim()) return
    onChange([...meals, { id: Date.now().toString(), name: name.toLowerCase(), quantity: qty }])
    setInput("")
    setQty("100g")
    setSuggestions([])
  }

  const removeMeal = (id: string) => onChange(meals.filter(m => m.id !== id))

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold mb-1">Your Typical Day — Meals</h2>
        <p className="text-sm text-muted-foreground">Add what you typically eat in a day. We'll calculate your macronutrients and Estrobolome Support Score automatically.</p>
      </div>

      {/* Add food */}
      <div className="p-4 rounded-xl border border-border bg-card space-y-3">
        <p className="text-sm font-semibold">Add a food item</p>
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <input
              className="w-full border border-input rounded-xl px-4 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="e.g. yogurt, broccoli, salmon..."
              value={input}
              onChange={e => handleInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && addMeal(input)}
            />
            {suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-xl shadow-lg z-10 overflow-hidden">
                {suggestions.map(s => (
                  <button key={s} onClick={() => { setInput(s); setSuggestions([]) }}
                    className="w-full text-left px-4 py-2.5 text-sm hover:bg-muted transition-colors capitalize">
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>
          <select
            value={qty}
            onChange={e => setQty(e.target.value)}
            className="border border-input rounded-xl px-3 py-2.5 text-sm bg-background focus:outline-none"
          >
            {["50g","100g","150g","200g","250g","1 cup","1 tbsp","1 tsp","1 portion"].map(q => (
              <option key={q}>{q}</option>
            ))}
          </select>
          <Button onClick={() => addMeal(input)} size="sm" className="gap-1.5">
            <Plus className="w-4 h-4" />Add
          </Button>
        </div>
      </div>

      {/* Meal list */}
      {meals.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-semibold text-muted-foreground">{meals.length} food item{meals.length > 1 ? "s" : ""} added</p>
          {meals.map(meal => {
            const food = FOOD_DB[meal.name]
            return (
              <div key={meal.id} className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl border",
                food
                  ? food.estrobolomeScore >= 7 ? "border-emerald-500/30 bg-emerald-500/5"
                  : food.estrobolomeScore >= 4 ? "border-amber-500/30 bg-amber-500/5"
                  : "border-rose-500/30 bg-rose-500/5"
                  : "border-border bg-muted/20"
              )}>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold capitalize">{meal.name}</span>
                    <span className="text-xs text-muted-foreground">{meal.quantity}</span>
                    {food && (
                      <Badge variant="outline" className={cn("text-[10px]",
                        food.estrobolomeScore >= 7 ? "text-emerald-600 border-emerald-500/30" :
                        food.estrobolomeScore >= 4 ? "text-amber-600 border-amber-500/30" :
                                                     "text-rose-600 border-rose-500/30"
                      )}>
                        EST {food.estrobolomeScore}/10
                      </Badge>
                    )}
                  </div>
                  {food && (
                    <p className="text-[10px] text-muted-foreground mt-0.5">{food.reason}</p>
                  )}
                </div>
                <button onClick={() => removeMeal(meal.id)}
                  className="text-muted-foreground hover:text-destructive transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )
          })}
        </div>
      )}

      {meals.length === 0 && (
        <div className="p-8 rounded-xl border border-dashed border-border text-center">
          <Apple className="w-10 h-10 text-muted-foreground mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">Start adding foods to see your nutritional profile</p>
        </div>
      )}
    </div>
  )
}

// ── RESULTS ───────────────────────────────────────────────────────
function Results({ sleep, nutritionAnswers, meals }: {
  sleep: SleepData
  nutritionAnswers: NutritionAnswers
  meals: Meal[]
}) {
  // Calculate macros from meals
  let totalCals = 0, totalProteins = 0, totalCarbs = 0, totalFats = 0, totalFibers = 0
  let totalEstroScore = 0, scoredMeals = 0

  meals.forEach(meal => {
    const food = FOOD_DB[meal.name]
    if (food) {
      const factor = meal.quantity.includes("50") ? 0.5 :
                     meal.quantity.includes("150") ? 1.5 :
                     meal.quantity.includes("200") ? 2 :
                     meal.quantity.includes("250") ? 2.5 : 1
      totalCals     += food.calories * factor
      totalProteins += food.proteins * factor
      totalCarbs    += food.carbs * factor
      totalFats     += food.fats * factor
      totalFibers   += food.fibers * factor
      totalEstroScore += food.estrobolomeScore
      scoredMeals++
    }
  })

  const mealEstroScore = scoredMeals > 0 ? Math.round(totalEstroScore / scoredMeals * 10) : 0

  // Calculate questionnaire estrobolome score
  const scoreMap: Record<string, number> = {
    "Never": 0, "1–2×/month": 1, "1×/week": 2, "2–3×/week": 3, "Daily": 4,
  }
  const negMap: Record<string, number> = {
    "Never": 4, "1–2×/month": 3, "1×/week": 2, "2–3×/week": 1, "Daily": 0,
  }

  const questionnaireScore = Math.round((
    (scoreMap[nutritionAnswers.vegetables || "Never"] || 0) +
    (scoreMap[nutritionAnswers.legumes || "Never"] || 0) * 1.5 +
    (scoreMap[nutritionAnswers.fermented || "Never"] || 0) * 2 +
    (scoreMap[nutritionAnswers.wholegrains || "Never"] || 0) +
    (negMap[nutritionAnswers.redMeat || "Never"] || 0) * 0.5 +
    (negMap[nutritionAnswers.processedFood || "Never"] || 0) +
    (scoreMap[nutritionAnswers.fish || "Never"] || 0) +
    (scoreMap[nutritionAnswers.fruit || "Never"] || 0) +
    (scoreMap[nutritionAnswers.nuts || "Never"] || 0) * 1.5 +
    (scoreMap[nutritionAnswers.fermented || "Never"] || 0)
  ) / 20 * 100)

  const finalEstroScore = Math.round((
    (meals.length > 0 ? mealEstroScore : 0) * 0.4 +
    questionnaireScore * 0.6
  ))

  // Sleep score
  const sleepScore = Math.round((
    (sleep.hoursPerNight === "7–8" ? 100 : sleep.hoursPerNight === "6–7" ? 70 : sleep.hoursPerNight === "8–9" ? 80 : 40) * 0.4 +
    ((sleep.quality || 3) * 20) * 0.3 +
    ((sleep.wakeUps === "Never" ? 100 : sleep.wakeUps === "Rarely" ? 75 : 40)) * 0.3
  ))

  const totalProteinsPct = totalCals > 0 ? Math.round(totalProteins * 4 / totalCals * 100) : 0
  const totalCarbsPct    = totalCals > 0 ? Math.round(totalCarbs * 4 / totalCals * 100) : 0
  const totalFatsPct     = totalCals > 0 ? Math.round(totalFats * 9 / totalCals * 100) : 0

  const scoreColor = (s: number) =>
    s >= 70 ? "text-emerald-500" : s >= 40 ? "text-amber-500" : "text-rose-500"
  const scoreBg = (s: number) =>
    s >= 70 ? "bg-emerald-500" : s >= 40 ? "bg-amber-500" : "bg-rose-500"

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold mb-1">Your Monthly Snapshot</h2>
        <p className="text-sm text-muted-foreground">Here is your personalised baseline profile for this month.</p>
      </div>

      {/* Score cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Estrobolome Support Score", value: finalEstroScore, icon: Leaf, desc: "How well your diet supports gmGUS activity and estrogen recycling" },
          { label: "Sleep Quality Score",        value: sleepScore,       icon: Moon, desc: "Based on hours, quality and continuity of sleep" },
          { label: "Lifestyle Score",            value: Math.round(
            ((sleep.physicalActivity === "Daily" || sleep.physicalActivity === "5+ days" ? 100 :
              sleep.physicalActivity === "3–4 days" ? 75 :
              sleep.physicalActivity === "1–2 days" ? 40 : 10) * 0.5 +
            (sleep.smoking === "No" ? 100 : sleep.smoking === "Occasionally" ? 60 : 20) * 0.3 +
            (sleep.alcohol === "None" ? 100 : sleep.alcohol === "Rarely" ? 80 :
             sleep.alcohol === "1–3 drinks/week" ? 60 : 30) * 0.2)
          ), icon: Activity, desc: "Physical activity, smoking and alcohol habits" },
        ].map((s, i) => {
          const Icon = s.icon
          return (
            <div key={i} className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
                <span className="text-xs font-semibold text-muted-foreground">{s.label}</span>
              </div>
              <p className={cn("text-5xl font-bold mb-2", scoreColor(s.value))}>{s.value}</p>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden mb-2">
                <div className={cn("h-full rounded-full transition-all", scoreBg(s.value))}
                  style={{ width: `${s.value}%` }} />
              </div>
              <p className="text-[10px] text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          )
        })}
      </div>

      {/* Macronutrients */}
      {meals.length > 0 && (
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="font-semibold text-sm mb-4 flex items-center gap-2">
            <Apple className="w-4 h-4 text-primary" />
            Estimated Macronutrients (typical day)
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {[
              { label: "Calories",  value: `${Math.round(totalCals)} kcal`, icon: Flame,    color: "text-orange-500" },
              { label: "Proteins",  value: `${Math.round(totalProteins)}g (${totalProteinsPct}%)`, icon: Activity,  color: "text-blue-500" },
              { label: "Carbs",     value: `${Math.round(totalCarbs)}g (${totalCarbsPct}%)`,       icon: Wheat,     color: "text-amber-500" },
              { label: "Fats",      value: `${Math.round(totalFats)}g (${totalFatsPct}%)`,         icon: Droplets,  color: "text-purple-500" },
              { label: "Fiber",     value: `${Math.round(totalFibers)}g`,                          icon: Leaf,      color: "text-emerald-500" },
            ].map((m, i) => {
              const Icon = m.icon
              return (
                <div key={i} className="text-center p-3 rounded-xl bg-muted/30">
                  <Icon className={cn("w-5 h-5 mx-auto mb-1", m.color)} />
                  <p className="text-sm font-bold">{m.value}</p>
                  <p className="text-[10px] text-muted-foreground">{m.label}</p>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Estrobolome tips */}
      <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-5">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-5 h-5 text-emerald-500" />
          <h3 className="font-semibold text-sm text-emerald-700">Personalised Tips for Your Estrobolome</h3>
        </div>
        <div className="space-y-2">
          {finalEstroScore < 50 && (
            <p className="text-xs text-emerald-800 flex items-start gap-2">
              <span className="mt-0.5">🫘</span>
              Try adding legumes (lentils, chickpeas) at least 3 times a week — they are the most powerful prebiotic fiber for gmGUS activity.
            </p>
          )}
          {(nutritionAnswers.fermented === "Never" || nutritionAnswers.fermented === "1–2×/month") && (
            <p className="text-xs text-emerald-800 flex items-start gap-2">
              <span className="mt-0.5">🫙</span>
              Add a daily fermented food (yogurt, kefir or sauerkraut) — these directly restore the bacterial strains that activate the estrobolome.
            </p>
          )}
          {sleepScore < 60 && (
            <p className="text-xs text-emerald-800 flex items-start gap-2">
              <span className="mt-0.5">🌙</span>
              Poor sleep reduces microbiome diversity. Try to maintain a consistent sleep schedule to support your gut-brain axis.
            </p>
          )}
          {(nutritionAnswers.nuts === "Never" || nutritionAnswers.nuts === "1–2×/month") && (
            <p className="text-xs text-emerald-800 flex items-start gap-2">
              <span className="mt-0.5">🌰</span>
              A small handful of walnuts or almonds daily provides prebiotic fiber and omega-3 that support estrogen metabolism.
            </p>
          )}
          {finalEstroScore >= 70 && (
            <p className="text-xs text-emerald-800 flex items-start gap-2">
              <span className="mt-0.5">✅</span>
              Excellent! Your diet is well aligned with estrobolome support. Keep up the good work and maintain these habits throughout the trial.
            </p>
          )}
        </div>
      </div>

      {/* Info note */}
      <div className="flex items-start gap-3 p-4 rounded-xl border border-border bg-muted/20">
        <Info className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
        <p className="text-xs text-muted-foreground leading-relaxed">
          These scores are estimates based on your answers and are used by the clinical team to understand your baseline profile. They do not replace medical advice. Your data will be reviewed by the trial clinician at your next visit.
        </p>
      </div>
    </div>
  )
}

// ── MAIN COMPONENT ────────────────────────────────────────────────
export function MonthlySnapshot() {
  const [step, setStep] = useState<Step>("sleep")
  const [submitted, setSubmitted] = useState(false)

  const [sleepData, setSleepData] = useState<SleepData>({
    hoursPerNight: null, quality: null, wakeUps: null,
    stressLevel: null, physicalActivity: null, smoking: null, alcohol: null,
  })

  const [nutritionAnswers, setNutritionAnswers] = useState<NutritionAnswers>({
    vegetables: null, legumes: null, fermented: null, wholegrains: null,
    redMeat: null, processedFood: null, fish: null, fruit: null,
    nuts: null, water: null,
  })

  const [meals, setMeals] = useState<Meal[]>([])

  const steps: Step[] = ["sleep", "nutrition_questionnaire", "nutrition_meals", "results"]
  const currentIndex = steps.indexOf(step)

  const goNext = () => {
    if (currentIndex < steps.length - 1) setStep(steps[currentIndex + 1])
    else setSubmitted(true)
  }
  const goPrev = () => {
    if (currentIndex > 0) setStep(steps[currentIndex - 1])
  }

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto text-center py-16 space-y-4">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8 text-emerald-500" />
        </div>
        <h2 className="text-2xl font-bold">Snapshot Saved!</h2>
        <p className="text-muted-foreground">Your Monthly Snapshot has been saved and sent to your clinical team. See you next month!</p>
        <p className="text-xs text-muted-foreground">Next snapshot due: <strong>May 16, 2026</strong></p>
        <Button onClick={() => { setSubmitted(false); setStep("sleep") }} variant="outline" className="mt-4">
          Complete a new snapshot
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Brain className="w-5 h-5 text-primary" />
          <h1 className="text-2xl font-bold">My Monthly Snapshot</h1>
          <Badge variant="outline" className="text-xs ml-auto">April 2026</Badge>
        </div>
        <p className="text-sm text-muted-foreground">Takes about 5 minutes. Helps your clinical team understand your monthly baseline.</p>
      </div>

      <StepIndicator current={step} />

      {/* Step content */}
      <div className="rounded-xl border border-border bg-card p-6">
        {step === "sleep"                   && <SleepSection data={sleepData} onChange={setSleepData} />}
        {step === "nutrition_questionnaire" && <NutritionQuestionnaire data={nutritionAnswers} onChange={setNutritionAnswers} />}
        {step === "nutrition_meals"         && <MealTracker meals={meals} onChange={setMeals} />}
        {step === "results"                 && <Results sleep={sleepData} nutritionAnswers={nutritionAnswers} meals={meals} />}
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={goPrev} disabled={currentIndex === 0} className="gap-2">
          <ChevronLeft className="w-4 h-4" /> Back
        </Button>
        <Button onClick={goNext} className="gap-2">
          {step === "results" ? "Save Snapshot" : "Continue"}
          {step !== "results" && <ChevronRight className="w-4 h-4" />}
        </Button>
      </div>
    </div>
  )
}
