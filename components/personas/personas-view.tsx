'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import {
  Search,
  SlidersHorizontal,
  Download,
  Plus,
  Users,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar } from '@/components/ui/avatar'
import { PageHeader } from '@/components/page-header'
import { personas } from '@/lib/data'
import { cn } from '@/lib/utils'

const estadoVariant = {
  Activo: 'success',
  Inactivo: 'muted',
  Nuevo: 'cream',
} as const

const tipos = ['Todos', 'Miembro', 'Visitante', 'Líder'] as const

export function PersonasView() {
  const [query, setQuery] = useState('')
  const [tipo, setTipo] = useState<(typeof tipos)[number]>('Todos')

  const filtered = useMemo(() => {
    return personas.filter((p) => {
      const matchTipo = tipo === 'Todos' || p.tipo === tipo
      const matchQuery =
        !query ||
        p.nombre.toLowerCase().includes(query.toLowerCase()) ||
        p.email.toLowerCase().includes(query.toLowerCase()) ||
        p.documento.includes(query)
      return matchTipo && matchQuery
    })
  }, [query, tipo])

  return (
    <div>
      <PageHeader
        title="Personas"
        description="Administra miembros, visitantes y líderes de tu iglesia."
      >
        <Button variant="outline" size="sm">
          <Download className="size-4" /> Exportar
        </Button>
        <Button size="sm" render={<Link href="/personas/nueva" />}>
          <Plus className="size-4" /> Crear persona
        </Button>
      </PageHeader>

      <div className="flex flex-col gap-4 p-4 md:p-6">
        {/* Stat chips */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            ['Total', personas.length],
            ['Miembros', personas.filter((p) => p.tipo === 'Miembro').length],
            ['Visitantes', personas.filter((p) => p.tipo === 'Visitante').length],
            ['Líderes', personas.filter((p) => p.tipo === 'Líder').length],
          ].map(([k, v]) => (
            <div key={k} className="rounded-xl border border-border bg-card p-4">
              <p className="text-xs text-muted-foreground">{k}</p>
              <p className="mt-1 text-xl font-bold text-foreground">{v}</p>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative max-w-sm flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar por nombre, email o documento…"
              className="h-10 w-full rounded-lg border border-input bg-card pl-9 pr-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/25"
            />
          </div>
          <div className="flex items-center gap-2">
            <div className="flex rounded-lg border border-border bg-card p-0.5">
              {tipos.map((t) => (
                <button
                  key={t}
                  onClick={() => setTipo(t)}
                  className={cn(
                    'rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
                    tipo === t
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground',
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
            <Button variant="outline" size="icon" aria-label="Filtros avanzados">
              <SlidersHorizontal className="size-4" />
            </Button>
          </div>
        </div>

        {/* Table (desktop) */}
        <div className="hidden overflow-hidden rounded-xl border border-border bg-card md:block">
          <div className="text-sm">
            {/* Header row */}
            <div className="grid grid-cols-[2fr_1fr_1fr_0.75fr_0.75fr] border-b border-border bg-muted/40 px-4 py-3 text-left text-xs font-medium text-muted-foreground">
              <div>Nombre</div>
              <div>Documento</div>
              <div>Teléfono</div>
              <div>Tipo</div>
              <div>Estado</div>
            </div>
            {/* Rows */}
            <div>
              {filtered.map((p) => (
                <Link
                  key={p.id}
                  href={`/personas/${p.id}`}
                  className="grid grid-cols-[2fr_1fr_1fr_0.75fr_0.75fr] border-b border-border px-4 py-3 last:border-0 hover:bg-muted/40 transition-colors cursor-pointer items-center"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Avatar name={p.nombre} className="size-8 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="truncate font-medium text-foreground">{p.nombre}</p>
                      <p className="truncate text-xs text-muted-foreground">{p.email}</p>
                    </div>
                  </div>
                  <div className="text-muted-foreground truncate">{p.documento}</div>
                  <div className="text-muted-foreground truncate">{p.telefono}</div>
                  <div>
                    <Badge variant="secondary">{p.tipo}</Badge>
                  </div>
                  <div>
                    <Badge variant={estadoVariant[p.estado]}>{p.estado}</Badge>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Cards (mobile) */}
        <div className="flex flex-col gap-2 md:hidden">
          {filtered.map((p) => (
            <Link
              key={p.id}
              href={`/personas/${p.id}`}
              className="flex items-center gap-3 rounded-xl border border-border bg-card p-3 transition-colors hover:border-primary hover:bg-muted/40"
            >
              <Avatar name={p.nombre} />
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-foreground">{p.nombre}</p>
                <p className="truncate text-xs text-muted-foreground">{p.telefono}</p>
              </div>
              <Badge variant={estadoVariant[p.estado]}>{p.estado}</Badge>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card py-16 text-center">
            <span className="flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
              <Users className="size-6" />
            </span>
            <p className="mt-4 font-medium text-foreground">Sin resultados</p>
            <p className="text-sm text-muted-foreground">Ajusta tu búsqueda o los filtros.</p>
          </div>
        )}
      </div>
    </div>
  )
}
