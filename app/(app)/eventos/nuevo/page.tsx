'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Info,
  CalendarClock,
  UserCheck,
  QrCode,
  FileText,
  MapPin,
  Clock,
  Ticket,
  Eye,
} from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

const steps = [
  { n: 1, label: 'Información', icon: Info },
  { n: 2, label: 'Fecha', icon: CalendarClock },
  { n: 3, label: 'Asistencia', icon: UserCheck },
  { n: 4, label: 'QR', icon: QrCode },
  { n: 5, label: 'Formulario', icon: FileText },
]

export default function NuevoEventoPage() {
  const [step, setStep] = useState(1)
  const [titulo, setTitulo] = useState('Conferencia de Avivamiento')
  const [tipo, setTipo] = useState('Conferencia')
  const [fecha, setFecha] = useState('2026-06-20')
  const [hora, setHora] = useState('18:30')
  const [lugar, setLugar] = useState('Auditorio principal')
  const [ticket, setTicket] = useState(true)

  return (
    <div>
      <PageHeader title="Crear evento" description="Configura tu evento paso a paso.">
        <Button variant="ghost" size="sm" render={<Link href="/eventos" />}>
          <ArrowLeft className="size-4" /> Volver
        </Button>
      </PageHeader>

      <div className="grid grid-cols-1 gap-6 p-4 md:p-6 lg:grid-cols-[1fr_380px]">
        {/* Wizard */}
        <div className="flex flex-col gap-5">
          {/* Stepper */}
          <ol className="flex items-center gap-1 overflow-x-auto">
            {steps.map((s, i) => {
              const done = step > s.n
              const active = step === s.n
              const Icon = s.icon
              return (
                <li key={s.n} className="flex items-center">
                  <button
                    onClick={() => setStep(s.n)}
                    className={cn(
                      'flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium whitespace-nowrap',
                      active
                        ? 'bg-primary/10 text-primary'
                        : 'text-muted-foreground hover:bg-muted',
                    )}
                  >
                    <span
                      className={cn(
                        'flex size-6 items-center justify-center rounded-full text-xs',
                        done
                          ? 'bg-primary text-primary-foreground'
                          : active
                            ? 'bg-primary/15 text-primary'
                            : 'bg-muted text-muted-foreground',
                      )}
                    >
                      {done ? <Check className="size-3.5" /> : s.n}
                    </span>
                    <span className="hidden sm:inline">{s.label}</span>
                  </button>
                  {i < steps.length - 1 && <Icon className="hidden size-3.5 text-border md:inline" />}
                </li>
              )
            })}
          </ol>

          <div className="rounded-xl border border-border bg-card p-5 md:p-6">
            {step === 1 && (
              <div className="flex flex-col gap-4">
                <h3 className="font-semibold text-foreground">Información básica</h3>
                <div className="flex flex-col gap-1.5">
                  <Label>Título del evento</Label>
                  <Input value={titulo} onChange={(e) => setTitulo(e.target.value)} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label>Descripción</Label>
                  <textarea
                    rows={3}
                    defaultValue="Tres noches de adoración y predicación con invitados especiales."
                    className="rounded-lg border border-input bg-card p-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/25"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <Label>Tipo</Label>
                    <select
                      value={tipo}
                      onChange={(e) => setTipo(e.target.value)}
                      className="h-10 rounded-lg border border-input bg-card px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/25"
                    >
                      {['Servicio', 'Conferencia', 'Retiro', 'Reunión', 'Especial'].map((t) => (
                        <option key={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label>Lugar</Label>
                    <Input value={lugar} onChange={(e) => setLugar(e.target.value)} />
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="flex flex-col gap-4">
                <h3 className="font-semibold text-foreground">Fecha y horario</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <Label>Fecha</Label>
                    <Input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label>Hora de inicio</Label>
                    <Input type="time" value={hora} onChange={(e) => setHora(e.target.value)} />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label>Hora de fin</Label>
                    <Input type="time" defaultValue="21:00" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label>Capacidad</Label>
                    <Input type="number" defaultValue={800} />
                  </div>
                </div>
                <label className="flex items-center gap-2 text-sm text-muted-foreground">
                  <input type="checkbox" className="size-4 accent-primary" /> Evento recurrente
                </label>
              </div>
            )}

            {step === 3 && (
              <div className="flex flex-col gap-4">
                <h3 className="font-semibold text-foreground">Configuración de asistencia</h3>
                {[
                  ['Registrar asistencia', 'Habilita el check-in para este evento.', true],
                  ['Permitir auto check-in', 'Las personas escanean su propio QR.', true],
                  ['Limitar cupos', 'Bloquea el registro al alcanzar la capacidad.', false],
                ].map(([t, d, on]) => (
                  <div
                    key={t as string}
                    className="flex items-center justify-between rounded-lg border border-border p-3"
                  >
                    <div>
                      <p className="text-sm font-medium text-foreground">{t}</p>
                      <p className="text-xs text-muted-foreground">{d}</p>
                    </div>
                    <span
                      className={cn(
                        'flex h-6 w-11 items-center rounded-full p-0.5 transition-colors',
                        on ? 'justify-end bg-primary' : 'justify-start bg-muted',
                      )}
                    >
                      <span className="size-5 rounded-full bg-card shadow-sm" />
                    </span>
                  </div>
                ))}
              </div>
            )}

            {step === 4 && (
              <div className="flex flex-col gap-4">
                <h3 className="font-semibold text-foreground">Configuración QR</h3>
                <div className="flex items-center gap-4 rounded-lg border border-border p-4">
                  <span className="flex size-20 items-center justify-center rounded-lg bg-foreground text-card">
                    <QrCode className="size-12" />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-foreground">QR del evento generado</p>
                    <p className="text-xs text-muted-foreground">
                      Compártelo para el ingreso rápido al evento.
                    </p>
                    <Button variant="outline" size="sm" className="mt-2">
                      Descargar QR
                    </Button>
                  </div>
                </div>
                <label className="flex items-center gap-2 text-sm text-muted-foreground">
                  <input type="checkbox" defaultChecked className="size-4 accent-primary" /> QR único por
                  persona
                </label>
                <label className="flex items-center gap-2 text-sm text-muted-foreground">
                  <input type="checkbox" defaultChecked className="size-4 accent-primary" /> Expirar QR al
                  finalizar el evento
                </label>
              </div>
            )}

            {step === 5 && (
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-foreground">Formulario público</h3>
                  <label className="flex items-center gap-2 text-sm text-muted-foreground">
                    Con ticket
                    <input
                      type="checkbox"
                      checked={ticket}
                      onChange={(e) => setTicket(e.target.checked)}
                      className="size-4 accent-primary"
                    />
                  </label>
                </div>
                <p className="text-sm text-muted-foreground">
                  Campos que verán las personas al registrarse:
                </p>
                {['Nombre completo', 'Correo electrónico', 'Teléfono', 'Número de acompañantes'].map(
                  (f) => (
                    <div
                      key={f}
                      className="flex items-center justify-between rounded-lg border border-border px-3 py-2.5"
                    >
                      <span className="text-sm text-foreground">{f}</span>
                      <Badge variant="secondary">Activo</Badge>
                    </div>
                  ),
                )}
                <Button variant="outline" size="sm" className="self-start">
                  Añadir campo
                </Button>
              </div>
            )}

            <div className="mt-6 flex items-center justify-between border-t border-border pt-5">
              <Button
                variant="ghost"
                onClick={() => setStep((s) => Math.max(1, s - 1))}
                className={cn(step === 1 && 'invisible')}
              >
                <ArrowLeft className="size-4" /> Atrás
              </Button>
              {step < 5 ? (
                <Button onClick={() => setStep((s) => Math.min(5, s + 1))}>
                  Continuar <ArrowRight className="size-4" />
                </Button>
              ) : (
                <Button render={<Link href="/eventos" />}>
                  Publicar evento <Check className="size-4" />
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Live preview */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="mb-2 flex items-center gap-2 text-xs font-medium text-muted-foreground">
            <Eye className="size-3.5" /> Vista previa en tiempo real
          </div>
          <div className="overflow-hidden rounded-xl border border-border bg-card">
            <div className="flex h-28 items-end bg-primary p-4">
              <Badge variant="cream">{tipo}</Badge>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-bold text-foreground text-balance">{titulo}</h3>
              <div className="mt-3 flex flex-col gap-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <CalendarClock className="size-4" />
                  {new Date(fecha).toLocaleDateString('es', { dateStyle: 'long' })}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="size-4" /> {hora}
                </span>
                <span className="flex items-center gap-2">
                  <MapPin className="size-4" /> {lugar}
                </span>
              </div>
              {ticket && (
                <div className="mt-3 flex items-center gap-2 rounded-lg bg-accent px-3 py-2 text-sm text-accent-foreground">
                  <Ticket className="size-4" /> Evento con ticketing
                </div>
              )}
              <Button className="mt-4 w-full">Registrarme</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
