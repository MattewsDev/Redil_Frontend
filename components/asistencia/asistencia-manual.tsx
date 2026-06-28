'use client'

import { useState, useMemo } from 'react'
import { Search, Check, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { personas } from '@/lib/data'
import { cn } from '@/lib/utils'

export function AsistenciaManual() {
  const [searchQuery, setSearchQuery] = useState('')
  const [asistencias, setAsistencias] = useState<Record<string, boolean>>({})

  const filtered = useMemo(() => {
    return personas.filter((p) => {
      return (
        !searchQuery ||
        p.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.documento.includes(searchQuery)
      )
    })
  }, [searchQuery])

  const handleToggleAsistencia = (id: string) => {
    setAsistencias((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const totalRegistrados = Object.values(asistencias).filter(Boolean).length

  return (
    <div className="flex flex-col gap-4">
      {/* Header with stats */}
      <div className="grid grid-cols-3 gap-3 sm:flex sm:gap-4">
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-xs text-muted-foreground">Registrados</p>
          <p className="text-2xl font-bold text-primary">{totalRegistrados}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-xs text-muted-foreground">Totales</p>
          <p className="text-2xl font-bold text-foreground">{filtered.length}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-xs text-muted-foreground">Porcentaje</p>
          <p className="text-2xl font-bold text-foreground">
            {filtered.length > 0 ? Math.round((totalRegistrados / filtered.length) * 100) : 0}%
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Buscar por nombre, documento o email…"
          className="h-10 w-full rounded-lg border border-input bg-card pl-9 pr-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/25"
        />
      </div>

      {/* List */}
      <Card>
        <CardContent className="p-0">
          <div className="divide-y divide-border max-h-[600px] overflow-y-auto">
            {filtered.length > 0 ? (
              filtered.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between gap-3 p-4 hover:bg-muted/50 transition-colors cursor-pointer"
                  onClick={() => handleToggleAsistencia(p.id)}
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <Avatar name={p.nombre} className="size-10" />
                    <div className="min-w-0">
                      <p className="font-medium text-foreground truncate">{p.nombre}</p>
                      <p className="text-xs text-muted-foreground truncate">
                        {p.ministerio || 'Sin ministerio'} · {p.documento}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleToggleAsistencia(p.id)
                    }}
                    className={cn(
                      'flex size-10 items-center justify-center rounded-lg border-2 transition-all',
                      asistencias[p.id]
                        ? 'border-success bg-success/10 text-success'
                        : 'border-border hover:border-muted-foreground'
                    )}
                  >
                    {asistencias[p.id] ? (
                      <Check className="size-5" />
                    ) : (
                      <X className="size-5 opacity-50" />
                    )}
                  </button>
                </div>
              ))
            ) : (
              <div className="py-12 text-center text-sm text-muted-foreground">
                No hay resultados
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Action buttons */}
      <div className="flex gap-2">
        <Button className="flex-1">
          Guardar asistencia ({totalRegistrados})
        </Button>
        <Button variant="outline" onClick={() => setAsistencias({})}>
          Limpiar
        </Button>
      </div>
    </div>
  )
}
