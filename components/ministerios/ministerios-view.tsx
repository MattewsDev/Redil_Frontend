'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import {
  Search,
  Plus,
  MoreHorizontal,
  Users,
  Edit2,
  Trash2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar } from '@/components/ui/avatar'
import { PageHeader } from '@/components/page-header'
import { ministerios } from '@/lib/data'
import { cn } from '@/lib/utils'

export function MinisteriosView() {
  const [query, setQuery] = useState('')
  const [openMenu, setOpenMenu] = useState<string | null>(null)

  const filtered = useMemo(() => {
    return ministerios.filter((m) => {
      return (
        !query || m.nombre.toLowerCase().includes(query.toLowerCase()) ||
        m.descripcion.toLowerCase().includes(query.toLowerCase()) ||
        m.lider.toLowerCase().includes(query.toLowerCase())
      )
    })
  }, [query])

  return (
    <div>
      <PageHeader
        title="Ministerios"
        description="Organiza los equipos y áreas de servicio de tu iglesia."
      >
        <Button size="sm" render={<Link href="/ministerios/nuevo" />}>
          <Plus className="size-4" /> Nuevo ministerio
        </Button>
      </PageHeader>

      <div className="flex flex-col gap-4 p-4 md:p-6">
        {/* Search and stats */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative max-w-sm flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar ministerios…"
              className="h-10 w-full rounded-lg border border-input bg-card pl-9 pr-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/25"
            />
          </div>
          <div className="grid grid-cols-2 gap-2 sm:flex sm:gap-3">
            <div className="rounded-xl border border-border bg-card p-3">
              <p className="text-xs text-muted-foreground">Total</p>
              <p className="text-lg font-bold text-foreground">{ministerios.length}</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-3">
              <p className="text-xs text-muted-foreground">Activos</p>
              <p className="text-lg font-bold text-foreground">
                {ministerios.filter((m) => m.estado === 'Activo').length}
              </p>
            </div>
          </div>
        </div>

        {/* Grid view (desktop and mobile) */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((m) => (
            <div
              key={m.id}
              className="flex flex-col rounded-xl border border-border bg-card hover:border-primary/40 transition-colors"
            >
              <div className="flex items-start justify-between border-b border-border p-5">
                <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Users className="size-5" />
                </div>
                <div className="relative">
                  <button
                    onClick={() => setOpenMenu(openMenu === m.id ? null : m.id)}
                    className="p-1 hover:bg-muted rounded-lg"
                  >
                    <MoreHorizontal className="size-4" />
                  </button>
                  {openMenu === m.id && (
                    <div className="absolute right-0 top-8 z-50 min-w-40 rounded-lg border border-border bg-card shadow-lg">
                      <Link
                        href={`/ministerios/${m.id}`}
                        className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted hover:text-foreground text-foreground"
                      >
                        <Users className="size-4" /> Ver detalles
                      </Link>
                      <Link
                        href={`/ministerios/${m.id}/editar`}
                        className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted hover:text-foreground text-foreground"
                      >
                        <Edit2 className="size-4" /> Editar
                      </Link>
                      <button className="flex w-full items-center gap-2 px-4 py-2 text-sm hover:bg-muted text-destructive hover:text-destructive">
                        <Trash2 className="size-4" /> Eliminar
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <Link href={`/ministerios/${m.id}`} className="flex flex-col flex-1 p-5 hover:bg-muted/40 transition-colors">
                <h3 className="font-semibold text-foreground">{m.nombre}</h3>
                <p className="mt-1 text-sm text-muted-foreground text-pretty line-clamp-2">{m.descripcion}</p>

                <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                  <div className="flex items-center gap-2">
                    <Avatar name={m.lider} className="size-7" />
                    <div className="leading-tight min-w-0">
                      <p className="text-xs text-muted-foreground">Líder</p>
                      <p className="text-sm font-medium text-foreground truncate">{m.lider}</p>
                    </div>
                  </div>
                  <Badge variant={m.estado === 'Activo' ? 'success' : 'muted'}>{m.estado}</Badge>
                </div>

                <div className="mt-3 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Participantes</span>
                  <span className="font-semibold text-foreground">{m.participantes}</span>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card py-16 text-center">
            <span className="flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
              <Users className="size-6" />
            </span>
            <p className="mt-4 font-medium text-foreground">Sin resultados</p>
            <p className="text-sm text-muted-foreground">Ajusta tu búsqueda.</p>
          </div>
        )}
      </div>
    </div>
  )
}
