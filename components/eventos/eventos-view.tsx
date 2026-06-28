'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
  Plus,
  ChevronLeft,
  ChevronRight,
  Ticket,
  MapPin,
  Clock,
  Users,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { PageHeader } from '@/components/page-header'
import { eventos, type Evento } from '@/lib/data'
import { cn } from '@/lib/utils'

const modos = ['Mes', 'Semana', 'Lista'] as const
const dias = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']

const tipoColor: Record<Evento['tipo'], string> = {
  Servicio: 'bg-primary/10 text-primary',
  Conferencia: 'bg-accent text-accent-foreground',
  Retiro: 'bg-success/12 text-success',
  Reunión: 'bg-secondary text-secondary-foreground',
  Especial: 'bg-warning/20 text-warning-foreground',
}

// June 2026 starts on a Monday
const firstWeekday = 0
const daysInMonth = 30

export function EventosView() {
  const [modo, setModo] = useState<(typeof modos)[number]>('Mes')
  const cells = Array.from({ length: firstWeekday + daysInMonth }, (_, i) =>
    i < firstWeekday ? null : i - firstWeekday + 1,
  )

  return (
    <div>
      <PageHeader title="Eventos" description="Programa y administra los eventos de tu iglesia.">
        <Button variant="outline" size="sm">
          Plantillas
        </Button>
        <Button size="sm" render={<Link href="/eventos/nuevo" />}>
          <Plus className="size-4" /> Crear evento
        </Button>
      </PageHeader>

      <div className="flex flex-col gap-4 p-4 md:p-6">
        {/* Calendar controls */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <Button type="button" variant="outline" size="icon-sm" aria-label="Mes anterior">
              <ChevronLeft className="size-4" />
            </Button>
            <h2 className="text-lg font-semibold text-foreground">Junio 2026</h2>
            <Button type="button" variant="outline" size="icon-sm" aria-label="Mes siguiente">
              <ChevronRight className="size-4" />
            </Button>
          </div>
          <div className="flex rounded-lg border border-border bg-card p-0.5">
            {modos.map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setModo(m)}
                onTouchEnd={() => setModo(m)}
                className={cn(
                  'rounded-md px-3 py-1.5 text-sm font-medium transition-colors cursor-pointer',
                  modo === m
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {modo !== 'Lista' ? (
          <div className="overflow-hidden rounded-xl border border-border bg-card">
            <div className="grid grid-cols-7 border-b border-border bg-muted/40">
              {dias.map((d) => (
                <div
                  key={d}
                  className="px-2 py-2 text-center text-xs font-medium text-muted-foreground"
                >
                  {d}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7">
              {cells.map((day, i) => {
                const dayEvents = day ? eventos.filter((e) => e.day === day) : []
                return (
                  <div
                    key={i}
                    className="min-h-24 border-b border-r border-border p-1.5 last:border-r-0 [&:nth-child(7n)]:border-r-0 md:min-h-28"
                  >
                    {day && (
                      <>
                        <span
                          className={cn(
                            'inline-flex size-6 items-center justify-center rounded-full text-xs font-medium',
                            day === 22
                              ? 'bg-primary text-primary-foreground'
                              : 'text-muted-foreground',
                          )}
                        >
                          {day}
                        </span>
                        <div className="mt-1 flex flex-col gap-1">
                          {dayEvents.map((e) => (
                            <span
                              key={e.id}
                              className={cn(
                                'truncate rounded px-1.5 py-0.5 text-[10px] font-medium',
                                tipoColor[e.tipo],
                              )}
                            >
                              {e.hora} {e.titulo}
                            </span>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {eventos.map((e) => (
              <Link
                key={e.id}
                href={`/eventos/${e.id}`}
                className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4 transition-all hover:border-primary hover:shadow-md sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="flex size-12 shrink-0 flex-col items-center justify-center rounded-lg bg-muted">
                    <span className="text-[10px] font-medium uppercase text-muted-foreground">Jun</span>
                    <span className="text-lg font-bold leading-none text-foreground">{e.day}</span>
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold text-foreground">{e.titulo}</h3>
                      {e.conTicket && (
                        <Badge variant="cream">
                          <Ticket className="size-3" /> Ticket
                        </Badge>
                      )}
                    </div>
                    <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="size-3.5" /> {e.hora}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="size-3.5" /> {e.lugar}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="size-3.5" /> {e.registrados}/{e.capacidad}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 self-start sm:self-center">
                  <Badge
                    variant={
                      e.estado === 'Programado'
                        ? 'default'
                        : e.estado === 'Finalizado'
                          ? 'muted'
                          : 'success'
                    }
                  >
                    {e.estado}
                  </Badge>
                  <Button variant="outline" size="sm">
                    Gestionar
                  </Button>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
