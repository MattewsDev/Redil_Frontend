"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar } from "@/components/ui/avatar"
import { RedilMark } from "@/components/brand"
import { X, Check, QrCode, Keyboard, Zap } from "lucide-react"

const mockPeople = [
  { name: "María González", ministry: "Alabanza" },
  { name: "Carlos Ramírez", ministry: "Ujieres" },
  { name: "Ana Martínez", ministry: "Ministerio Infantil" },
  { name: "Pedro Sánchez", ministry: "Visitante" },
  { name: "Lucía Torres", ministry: "Multimedia" },
]

type Scan = { name: string; ministry: string; time: string }

export default function ScannerPage() {
  const [lastScan, setLastScan] = useState<Scan | null>(null)
  const [feed, setFeed] = useState<Scan[]>([])
  const [count, setCount] = useState(0)

  // Simulate a scan
  function simulateScan() {
    const p = mockPeople[Math.floor(Math.random() * mockPeople.length)]
    const scan: Scan = {
      name: p.name,
      ministry: p.ministry,
      time: new Date().toLocaleTimeString("es", { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
    }
    setLastScan(scan)
    setFeed((f) => [scan, ...f].slice(0, 6))
    setCount((c) => c + 1)
  }

  useEffect(() => {
    if (!lastScan) return
    const t = setTimeout(() => setLastScan(null), 2200)
    return () => clearTimeout(t)
  }, [lastScan])

  return (
    <main className="flex min-h-dvh flex-col bg-foreground text-background">
      {/* Top bar */}
      <header className="flex items-center justify-between px-4 py-4">
        <RedilMark />
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-background/10 px-3 py-1 text-sm font-medium">
            {count} {count === 1 ? "check-in" : "check-ins"}
          </div>
          <Button asChild variant="ghost" size="icon" className="text-background hover:bg-background/10">
            <Link href="/asistencia">
              <X className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </header>

      <div className="flex flex-1 flex-col items-center justify-center gap-8 px-4 py-8">
        <div className="text-center">
          <h1 className="text-xl font-semibold">Servicio Dominical Matutino</h1>
          <p className="text-sm text-background/60">Apunta la cámara al código QR del boleto</p>
        </div>

        {/* Scanner viewport */}
        <div className="relative aspect-square w-full max-w-xs">
          <div className="absolute inset-0 overflow-hidden rounded-3xl bg-background/5">
            {/* corner frames */}
            <span className="absolute left-4 top-4 h-10 w-10 rounded-tl-2xl border-l-4 border-t-4 border-secondary" />
            <span className="absolute right-4 top-4 h-10 w-10 rounded-tr-2xl border-r-4 border-t-4 border-secondary" />
            <span className="absolute bottom-4 left-4 h-10 w-10 rounded-bl-2xl border-b-4 border-l-4 border-secondary" />
            <span className="absolute bottom-4 right-4 h-10 w-10 rounded-br-2xl border-b-4 border-r-4 border-secondary" />
            <QrCode className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 text-background/15" />
            {/* scan line */}
            <span className="scanline absolute inset-x-6 top-6 h-0.5 bg-secondary" />
          </div>

          {/* Success overlay */}
          {lastScan && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-3xl bg-primary text-primary-foreground">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-background/20">
                <Check className="h-9 w-9" />
              </div>
              <Avatar name={lastScan.name} className="h-12 w-12 text-base" />
              <div className="text-center">
                <p className="text-lg font-semibold">{lastScan.name}</p>
                <p className="text-sm opacity-80">{lastScan.ministry}</p>
              </div>
            </div>
          )}
        </div>

        <div className="flex w-full max-w-xs flex-col gap-3">
          <Button onClick={simulateScan} size="lg" variant="secondary" className="gap-2">
            <Zap className="h-4 w-4" /> Simular escaneo
          </Button>
          <Button variant="ghost" className="gap-2 text-background hover:bg-background/10">
            <Keyboard className="h-4 w-4" /> Ingresar código manual
          </Button>
        </div>
      </div>

      {/* Live feed */}
      {feed.length > 0 && (
        <footer className="border-t border-background/10 px-4 py-4">
          <p className="mb-3 text-xs uppercase tracking-wide text-background/50">Últimos registros</p>
          <div className="flex gap-3 overflow-x-auto pb-1">
            {feed.map((s, i) => (
              <div
                key={i}
                className="flex shrink-0 items-center gap-2 rounded-full bg-background/10 py-1.5 pl-1.5 pr-4"
              >
                <Avatar name={s.name} className="h-8 w-8 text-xs" />
                <div>
                  <p className="text-xs font-medium">{s.name}</p>
                  <p className="text-[10px] text-background/50">{s.time}</p>
                </div>
              </div>
            ))}
          </div>
        </footer>
      )}
    </main>
  )
}
