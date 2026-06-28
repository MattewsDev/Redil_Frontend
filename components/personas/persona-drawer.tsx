'use client'

import {
  X,
  Mail,
  Phone,
  IdCard,
  MapPin,
  QrCode,
  CalendarCheck,
  HeartHandshake,
  StickyNote,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar } from '@/components/ui/avatar'
import type { Persona } from '@/lib/data'

const estadoVariant = {
  Activo: 'success',
  Inactivo: 'muted',
  Nuevo: 'cream',
} as const

export function PersonaDrawer({
  persona,
  onClose,
}: {
  persona: Persona | null
  onClose: () => void
}) {
  if (!persona) return null

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-foreground/40" onClick={onClose} />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-card shadow-xl">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="font-semibold text-foreground">Perfil de persona</h2>
          <Button variant="ghost" size="icon" onClick={onClose} aria-label="Cerrar">
            <X className="size-5" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* Header */}
          <div className="flex flex-col items-center gap-3 border-b border-border px-5 py-6 text-center">
            <Avatar name={persona.nombre} className="size-20 text-xl" />
            <div>
              <h3 className="text-lg font-bold text-foreground">{persona.nombre}</h3>
              <div className="mt-1.5 flex items-center justify-center gap-2">
                <Badge variant="default">{persona.tipo}</Badge>
                <Badge variant={estadoVariant[persona.estado]}>{persona.estado}</Badge>
              </div>
            </div>
          </div>

          {/* General info */}
          <Section title="Información general" icon={IdCard}>
            <InfoRow icon={IdCard} label="Documento" value={persona.documento} />
            <InfoRow icon={Phone} label="Teléfono" value={persona.telefono} />
            <InfoRow icon={Mail} label="Email" value={persona.email} />
            <InfoRow icon={MapPin} label="Ciudad" value={persona.ciudad} />
            <InfoRow
              icon={CalendarCheck}
              label="Ingreso"
              value={new Date(persona.ingreso).toLocaleDateString('es', { dateStyle: 'long' })}
            />
          </Section>

          {/* Historial */}
          <Section title="Historial" icon={CalendarCheck}>
            <div className="grid grid-cols-3 gap-2">
              {[
                ['Asistencias', '48'],
                ['Eventos', '12'],
                ['Ministerios', persona.ministerio ? '1' : '0'],
              ].map(([k, v]) => (
                <div key={k} className="rounded-lg border border-border bg-muted/40 p-3 text-center">
                  <p className="text-lg font-bold text-foreground">{v}</p>
                  <p className="text-xs text-muted-foreground">{k}</p>
                </div>
              ))}
            </div>
          </Section>

          {/* Ministerios / Membresía */}
          <Section title="Ministerios y membresía" icon={HeartHandshake}>
            {persona.ministerio ? (
              <div className="flex items-center justify-between rounded-lg border border-border p-3">
                <span className="text-sm font-medium text-foreground">{persona.ministerio}</span>
                <Badge variant="secondary">Activo</Badge>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Sin ministerios asignados.</p>
            )}
          </Section>

          {/* QR */}
          <Section title="QR personal" icon={QrCode}>
            <div className="flex items-center gap-4 rounded-lg border border-border p-3">
              <span className="flex size-16 items-center justify-center rounded-lg bg-foreground text-card">
                <QrCode className="size-10" />
              </span>
              <div>
                <p className="text-sm font-medium text-foreground">Identificación digital</p>
                <p className="text-xs text-muted-foreground">Úsalo para check-in en eventos.</p>
                <Button variant="outline" size="xs" className="mt-2">
                  Descargar QR
                </Button>
              </div>
            </div>
          </Section>

          {/* Notas */}
          <Section title="Notas pastorales" icon={StickyNote}>
            <p className="rounded-lg border border-border bg-muted/40 p-3 text-sm text-muted-foreground">
              Persona comprometida con la congregación. Interesada en liderar un grupo pequeño el
              próximo semestre.
            </p>
          </Section>
        </div>

        <div className="flex gap-2 border-t border-border p-4">
          <Button variant="outline" className="flex-1" onClick={onClose}>
            Cerrar
          </Button>
          <Button className="flex-1">Editar perfil</Button>
        </div>
      </aside>
    </div>
  )
}

function Section({
  title,
  icon: Icon,
  children,
}: {
  title: string
  icon: React.ElementType
  children: React.ReactNode
}) {
  return (
    <div className="border-b border-border px-5 py-4">
      <h4 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        <Icon className="size-3.5" /> {title}
      </h4>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  )
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType
  label: string
  value: string
}) {
  return (
    <div className="flex items-center gap-3">
      <Icon className="size-4 shrink-0 text-muted-foreground" />
      <span className="w-24 shrink-0 text-sm text-muted-foreground">{label}</span>
      <span className="truncate text-sm font-medium text-foreground">{value}</span>
    </div>
  )
}
