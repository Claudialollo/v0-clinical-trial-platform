// Brain Constellation - Versione a forma di CERVELLO (come il logo)
function BrainConstellation() {
  const [completedTimepoints, setCompletedTimepoints] = useState(3)
  const [isClient, setIsClient] = useState(false)
  const maxTimepoints = 6

  // Posizioni dei nodi progettate per formare la silhouette di un cervello
  const timepoints = [
    { id: 1, label: "Baseline", x: 72,  y: 55 },
    { id: 2, label: "W2",       x: 115, y: 38 },
    { id: 3, label: "W4",       x: 165, y: 32 },
    { id: 4, label: "W8",       x: 205, y: 48 },
    { id: 5, label: "W12",      x: 238, y: 78 },
    { id: 6, label: "Fine",     x: 155, y: 125 },
  ]

  // Connessioni che formano la struttura del cervello
  const connections = [
    [1,2], [2,3], [3,4], [4,5], [5,6],
    [1,3], [2,4], [3,5], [1,6], [4,6]
  ]

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return (
      <Card className="border-primary/30 bg-gradient-to-br from-violet-500/5 to-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Brain className="w-6 h-6" /> Costellazione del Cervello
          </CardTitle>
        </CardHeader>
        <CardContent className="h-[240px] flex items-center justify-center">
          <div className="text-muted-foreground">Caricamento costellazione...</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-primary/30 bg-gradient-to-br from-violet-500/5 via-blue-500/5 to-transparent shadow-inner overflow-hidden">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Brain className="w-6 h-6 text-primary" />
            <div>
              <CardTitle className="text-lg">La tua Costellazione Cerebrale</CardTitle>
              <CardDescription>Ogni traguardo illumina una regione del tuo cervello</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/30 px-3">
            {completedTimepoints}/{maxTimepoints} regioni attive
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pt-4 pb-8">
        <div className="relative mx-auto" style={{ width: 290, height: 190 }}>
          <svg 
            width="290" 
            height="190" 
            viewBox="0 0 290 190" 
            className="overflow-visible"
            suppressHydrationWarning
          >
            {/* Connessioni del cervello */}
            {connections.map(([a, b], i) => {
              const nodeA = timepoints.find(n => n.id === a)!
              const nodeB = timepoints.find(n => n.id === b)!
              const isLit = completedTimepoints >= Math.max(a, b)
              return (
                <line
                  key={i}
                  x1={nodeA.x} y1={nodeA.y}
                  x2={nodeB.x} y2={nodeB.y}
                  stroke={isLit ? "#4C1D95" : "#cbd5e1"}
                  strokeWidth="3"
                  strokeOpacity={isLit ? 0.9 : 0.35}
                  strokeDasharray={isLit ? "none" : "2 2"}
                  className="transition-all duration-700"
                />
              )
            })}

            {/* Nodi (regioni del cervello) */}
            {timepoints.map((node) => {
              const isLit = completedTimepoints >= node.id
              return (
                <g key={node.id}>
                  {/* Glow quando illuminato */}
                  {isLit && (
                    <circle 
                      cx={node.x} 
                      cy={node.y} 
                      r="19" 
                      fill="#2563EB" 
                      opacity="0.22" 
                    />
                  )}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={isLit ? "13" : "10.5"}
                    fill={isLit ? "#4C1D95" : "#94a3b8"}
                    className={cn(
                      "transition-all duration-500",
                      isLit && "drop-shadow-[0_0_10px_#4C1D95]"
                    )}
                  />
                  <text
                    x={node.x}
                    y={node.y + 32}
                    textAnchor="middle"
                    fill={isLit ? "#4C1D95" : "#64748b"}
                    fontSize="10"
                    fontWeight={isLit ? "600" : "500"}
                  >
                    {node.label}
                  </text>
                </g>
              )
            })}
          </svg>
        </div>

        <div className="flex justify-center mt-10">
          <Button
            onClick={() => setCompletedTimepoints(p => Math.min(p + 1, maxTimepoints))}
            disabled={completedTimepoints >= maxTimepoints}
            className="gap-2 bg-gradient-to-r from-primary to-secondary hover:brightness-110 transition-all"
          >
            <Sparkles className="w-4 h-4" />
            {completedTimepoints >= maxTimepoints 
              ? "🎉 Tutti i timepoint completati!" 
              : "Completa prossimo timepoint"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
