"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar } from "@/components/ui/avatar"
import { RedilMark } from "@/components/brand"
import { X, Check, AlertCircle, XCircle, Clock, QrCode, Keyboard, Zap, Volume2 } from "lucide-react"

const mockPeople = [
  { id: "1", name: "María González", ministry: "Alabanza", photo: "MG" },
  { id: "2", name: "Carlos Ramírez", ministry: "Ujieres", photo: "CR" },
  { id: "3", name: "Ana Martínez", ministry: "Ministerio Infantil", photo: "AM" },
  { id: "4", name: "Pedro Sánchez", ministry: "Visitante", photo: "PS" },
  { id: "5", name: "Lucía Torres", ministry: "Multimedia", photo: "LT" },
]

type ScanStatus = "success" | "duplicate" | "invalid" | "expired" | null

type Scan = { 
  id: string
  name: string
  ministry: string
  time: string
  status: ScanStatus
  message?: string
}

export default function ScannerPage() {
  const [lastScan, setLastScan] = useState<Scan | null>(null)
  const [feed, setFeed] = useState<Scan[]>([])
  const [count, setCount] = useState(0)
  const [isScanning, setIsScanning] = useState(false)
  const [manualCode, setManualCode] = useState("")

  // Simulate different scan outcomes
  function simulateScan() {
    setIsScanning(true)
    setTimeout(() => {
      const outcomes = ["success", "duplicate", "invalid", "expired"] as const
      const outcome = outcomes[Math.floor(Math.random() * outcomes.length)]
      
      let scan: Scan | null = null
      
      if (outcome === "success") {
        const p = mockPeople[Math.floor(Math.random() * mockPeople.length)]
        scan = {
          id: p.id,
          name: p.name,
          ministry: p.ministry,
          time: new Date().toLocaleTimeString("es", { hour: "2-digit", minute: "2-digit" }),
          status: "success",
        }
        // Play success sound (visual feedback instead)
        setFeed((f) => [scan as Scan, ...f].slice(0, 6))
        setCount((c) => c + 1)
      } else if (outcome === "duplicate") {
        const p = mockPeople[Math.floor(Math.random() * mockPeople.length)]
        scan = {
          id: p.id,
          name: p.name,
          ministry: p.ministry,
          time: new Date().toLocaleTimeString("es", { hour: "2-digit", minute: "2-digit" }),
          status: "duplicate",
          message: "Este código ya fue escaneado",
        }
      } else if (outcome === "invalid") {
        scan = {
          id: "invalid",
          name: "Código inválido",
          ministry: "",
          time: new Date().toLocaleTimeString("es", { hour: "2-digit", minute: "2-digit" }),
          status: "invalid",
          message: "El QR no es válido o está dañado",
        }
      } else {
        scan = {
          id: "expired",
          name: "Código expirado",
          ministry: "",
          time: new Date().toLocaleTimeString("es", { hour: "2-digit", minute: "2-digit" }),
          status: "expired",
          message: "Este código QR ha expirado",
        }
      }
      
      setLastScan(scan)
      setIsScanning(false)
    }, 1500)
  }

  useEffect(() => {
    if (!lastScan) return
    const t = setTimeout(() => setLastScan(null), 3000)
    return () => clearTimeout(t)
  }, [lastScan])

  const getStatusColor = (status: ScanStatus) => {
    switch (status) {
      case "success":
        return "bg-emerald-500 border-emerald-500"
      case "duplicate":
        return "bg-amber-500 border-amber-500"
      case "invalid":
        return "bg-red-500 border-red-500"
      case "expired":
        return "bg-slate-500 border-slate-500"
      default:
        return "bg-blue-500 border-blue-500"
    }
  }

  const getStatusIcon = (status: ScanStatus) => {
    switch (status) {
      case "success":
        return <Check className="h-10 w-10" />
      case "duplicate":
        return <AlertCircle className="h-10 w-10" />
      case "invalid":
        return <XCircle className="h-10 w-10" />
      case "expired":
        return <Clock className="h-10 w-10" />
      default:
        return <Check className="h-10 w-10" />
    }
  }

  return (
    <main className="flex min-h-dvh flex-col bg-foreground text-background">
      {/* Top bar */}
      <header className="flex items-center justify-between border-b border-background/10 px-4 py-4">
        <RedilMark />
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-full bg-emerald-500/20 px-3 py-1.5 text-sm font-semibold text-emerald-300">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            {count} registrado{count !== 1 ? "s" : ""}
          </div>
          <Button asChild variant="ghost" size="icon" className="text-background hover:bg-background/10">
            <Link href="/asistencia">
              <X className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </header>

      <div className="flex flex-1 flex-col items-center justify-center gap-6 px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Servicio Dominical Matutino</h1>
          <p className="mt-2 text-sm text-background/60">Apunta la cámara al código QR</p>
        </div>

        {/* Scanner viewport */}
        <div className="relative aspect-square w-full max-w-sm">
          <div className={`absolute inset-0 overflow-hidden rounded-3xl transition-all duration-300 ${lastScan ? getStatusColor(lastScan.status) : "bg-background/5 border-4 border-background/20"}`}>
            {/* corner frames - only show when not scanning */}
            {!lastScan && (
              <>
                <span className="absolute left-4 top-4 h-10 w-10 rounded-tl-2xl border-l-4 border-t-4 border-background/50" />
                <span className="absolute right-4 top-4 h-10 w-10 rounded-tr-2xl border-r-4 border-t-4 border-background/50" />
                <span className="absolute bottom-4 left-4 h-10 w-10 rounded-bl-2xl border-b-4 border-l-4 border-background/50" />
                <span className="absolute bottom-4 right-4 h-10 w-10 rounded-br-2xl border-b-4 border-r-4 border-background/50" />
              </>
            )}

            {!lastScan ? (
              <>
                <QrCode className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 text-background/20" />
                {/* Animated scan line */}
                <span className={`absolute inset-x-6 top-6 h-0.5 bg-secondary ${isScanning ? "animate-pulse" : ""}`} style={{
                  animation: isScanning ? "scannerLine 2s infinite" : "none"
                }} />
              </>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-background/20 animate-in fade-in zoom-in">
                  {getStatusIcon(lastScan.status)}
                </div>
                
                {lastScan.status === "success" && (
                  <>
                    <Avatar name={lastScan.name} className="h-14 w-14 text-lg animate-in fade-in zoom-in" />
                    <div className="text-center">
                      <p className="text-lg font-bold">{lastScan.name}</p>
                      <p className="text-sm opacity-90">{lastScan.ministry}</p>
                      <p className="mt-1 text-xs opacity-75">{lastScan.time}</p>
                    </div>
                  </>
                )}

                {lastScan.status === "duplicate" && (
                  <div className="text-center">
                    <p className="font-semibold">{lastScan.message}</p>
                    <p className="mt-1 text-sm opacity-80">{lastScan.name}</p>
                  </div>
                )}

                {lastScan.status === "invalid" && (
                  <div className="text-center">
                    <p className="font-semibold">{lastScan.message}</p>
                  </div>
                )}

                {lastScan.status === "expired" && (
                  <div className="text-center">
                    <p className="font-semibold">{lastScan.message}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="flex w-full max-w-sm flex-col gap-3">
          <Button 
            onClick={simulateScan} 
            size="lg" 
            disabled={isScanning}
            className={`gap-2 ${isScanning ? "opacity-75" : ""}`}
          >
            <Zap className="h-4 w-4" /> 
            {isScanning ? "Escaneando..." : "Simular escaneo"}
          </Button>
          <Button 
            variant="ghost" 
            className="gap-2 text-background hover:bg-background/10"
            onClick={() => {
              // Toggle manual input
              if (manualCode) setManualCode("")
            }}
          >
            <Keyboard className="h-4 w-4" /> Ingresar código manual
          </Button>
        </div>

        {manualCode && (
          <div className="w-full max-w-sm rounded-2xl bg-background/10 p-4 animate-in fade-in slide-in-from-bottom-2">
            <p className="text-xs text-background/60 mb-2">Código manual</p>
            <input
              autoFocus
              value={manualCode}
              onChange={(e) => setManualCode(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  simulateScan()
                  setManualCode("")
                }
              }}
              placeholder="Escanea o pega el código..."
              className="w-full rounded-lg bg-background/20 border border-background/30 px-3 py-2 text-sm text-background placeholder-background/50 outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/30"
            />
          </div>
        )}
      </div>

      {/* Live feed */}
      {feed.length > 0 && (
        <footer className="border-t border-background/10 px-4 py-4 bg-background/5">
          <p className="mb-3 text-xs uppercase tracking-widest font-semibold text-background/60">Últimos registros</p>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {feed.map((s, i) => (
              <div
                key={i}
                className="flex shrink-0 items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500/20 to-emerald-500/5 border border-emerald-500/30 py-2 pl-2 pr-4 hover:border-emerald-500/50 transition-colors"
              >
                <Avatar name={s.name} className="h-8 w-8 text-xs font-bold" />
                <div className="min-w-0">
                  <p className="text-xs font-semibold truncate">{s.name}</p>
                  <p className="text-[10px] text-background/50">{s.time}</p>
                </div>
              </div>
            ))}
          </div>
        </footer>
      )}

      <style jsx>{`
        @keyframes scannerLine {
          0%, 100% { top: 1rem; }
          50% { top: calc(100% - 1rem); }
        }
      `}</style>
    </main>
  )
}
