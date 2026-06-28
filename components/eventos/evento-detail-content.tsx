'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Share2, Download, Users, Ticket, TrendingUp, Calendar, Clock, MapPin, Edit2, Trash2, Play } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { EventoAttendanceRegister } from '@/components/eventos/evento-attendance-register'
import { Evento } from '@/lib/data'

interface Participante {
  id: string
  nombre: string
  email: string
  ministerio: string
  documento: string
  asistio: boolean
}

interface EventoDetailContentProps {
  evento: Evento
}

// Mock data para inscritos del evento
const attendeesByEvent: Record<string, Array<{
  id: string
  name: string
  email: string
  tickets: number
  status: string
  checked: boolean
  ministerio: string
}>> = {
  e1: [
    { id: '1', name: 'María González', email: 'maria@ejemplo.com', tickets: 2, status: 'Confirmado', checked: true, ministerio: 'Alabanza' },
    { id: '2', name: 'Carlos Ramírez', email: 'carlos@ejemplo.com', tickets: 1, status: 'Confirmado', checked: true, ministerio: 'Ujieres' },
    { id: '3', name: 'Ana Martínez', email: 'ana@ejemplo.com', tickets: 1, status: 'Confirmado', checked: false, ministerio: 'Multimedia' },
  ],
  e2: [
    { id: '3', name: 'Ana Martínez', email: 'ana@ejemplo.com', tickets: 4, status: 'Confirmado', checked: false, ministerio: 'Multimedia' },
    { id: '4', name: 'Pedro Sánchez', email: 'pedro@ejemplo.com', tickets: 1, status: 'Pendiente', checked: false, ministerio: 'Visitante' },
  ],
  e3: [
    { id: '1', name: 'María González', email: 'maria@ejemplo.com', tickets: 2, status: 'Confirmado', checked: true, ministerio: 'Alabanza' },
    { id: '2', name: 'Carlos Ramírez', email: 'carlos@ejemplo.com', tickets: 1, status: 'Confirmado', checked: true, ministerio: 'Ujieres' },
    { id: '3', name: 'Ana Martínez', email: 'ana@ejemplo.com', tickets: 4, status: 'Confirmado', checked: false, ministerio: 'Multimedia' },
    { id: '4', name: 'Pedro Sánchez', email: 'pedro@ejemplo.com', tickets: 1, status: 'Pendiente', checked: false, ministerio: 'Visitante' },
    { id: '5', name: 'Lucía Torres', email: 'lucia@ejemplo.com', tickets: 2, status: 'Confirmado', checked: true, ministerio: 'Infantil' },
  ],
  e4: [
    { id: '6', name: 'Juan López', email: 'juan@ejemplo.com', tickets: 2, status: 'Confirmado', checked: false, ministerio: 'Matrimonios' },
    { id: '7', name: 'María Rodríguez', email: 'maria.r@ejemplo.com', tickets: 2, status: 'Confirmado', checked: false, ministerio: 'Matrimonios' },
  ],
  e5: [
    { id: '8', name: 'David García', email: 'david@ejemplo.com', tickets: 1, status: 'Confirmado', checked: false, ministerio: 'Bautismo' },
  ],
}

export function EventoDetailContent({ evento }: EventoDetailContentProps) {
  const [activeTab, setActiveTab] = useState<'detalles' | 'asistencia'>('detalles')
  const [eventoState, setEventoState] = useState(evento.estado)

  const attendees = attendeesByEvent[evento.id as keyof typeof attendeesByEvent] || []
  const ocupacion = Math.round((evento.registrados / evento.capacidad) * 100)
  const disponibles = evento.capacidad - evento.registrados

  // Convertir attendees a formato Participante
  const participantes: Participante[] = attendees.map(a => ({
    id: a.id,
    nombre: a.name,
    email: a.email,
    ministerio: a.ministerio,
    documento: `DOC-${a.id}`,
    asistio: a.checked,
  }))

  const canEdit = eventoState === 'Programado'
  const canStart = eventoState === 'Programado'
  const canRegisterAttendance = eventoState === 'En curso'
  const canDelete = eventoState === 'Programado'

  const handleStartEvent = () => {
    setEventoState('En curso')
    setActiveTab('asistencia')
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title={evento.titulo}
        description={`${evento.fecha} · ${evento.lugar}`}
      >
        <Button asChild variant="ghost" size="sm">
          <Link href="/eventos">
            <ArrowLeft className="size-4" /> Volver
          </Link>
        </Button>

        {/* Acciones contextuales según estado */}
        {canEdit && (
          <Button asChild variant="outline" size="sm" className="gap-2">
            <Link href={`/eventos/${evento.id}/editar`}>
              <Edit2 className="h-4 w-4" /> Editar
            </Link>
          </Button>
        )}

        {canStart && (
          <Button onClick={handleStartEvent} className="gap-2">
            <Play className="h-4 w-4" /> Iniciar evento
          </Button>
        )}

        {canDelete && (
          <Button variant="destructive" size="sm" className="gap-2">
            <Trash2 className="h-4 w-4" /> Eliminar
          </Button>
        )}

        {eventoState !== 'Programado' && (
          <Button variant="outline" className="gap-2">
            <Share2 className="h-4 w-4" /> Compartir
          </Button>
        )}
      </PageHeader>

      {/* Estado del evento */}
      <div className="flex items-center gap-2">
        <Badge variant={
          eventoState === 'En curso' ? 'success' :
          eventoState === 'Finalizado' ? 'secondary' :
          'warning'
        }>
          {eventoState}
        </Badge>
      </div>

      {/* Estadísticas */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Users} label="Inscritos" value={evento.registrados.toString()} hint={`${disponibles} disponibles`} />
        <StatCard icon={Ticket} label="Capacidad" value={evento.capacidad.toString()} hint={`${ocupacion}% ocupado`} />
        <StatCard icon={Ticket} label="Check-ins" value={eventoState === 'En curso' ? (Math.floor(evento.registrados * 0.5)).toString() : '0'} hint={eventoState === 'En curso' ? 'En vivo' : `Inicia ${evento.fecha}`} />
        <StatCard icon={TrendingUp} label="Ocupación" value={`${ocupacion}%`} hint="del aforo total" />
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-border">
        <button
          onClick={() => setActiveTab('detalles')}
          className={`px-4 py-3 text-sm font-medium transition-colors ${
            activeTab === 'detalles'
              ? 'text-primary border-b-2 border-primary'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Detalles
        </button>
        {canRegisterAttendance && evento.requiereRegistro && (
          <button
            onClick={() => setActiveTab('asistencia')}
            className={`px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === 'asistencia'
                ? 'text-primary border-b-2 border-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Registrar Asistencia
          </button>
        )}
      </div>

      {/* Contenido de tabs */}
      {activeTab === 'detalles' && (
        <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
          <Card>
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle>Inscritos</CardTitle>
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="h-4 w-4" /> Exportar
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                      <th className="px-6 py-3 font-medium">Persona</th>
                      <th className="px-6 py-3 font-medium">Boletos</th>
                      <th className="px-6 py-3 font-medium">Estado</th>
                      {eventoState === 'En curso' && <th className="px-6 py-3 font-medium">Check-in</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {attendees.map((a) => (
                      <tr key={a.email} className="border-b border-border last:border-0">
                        <td className="px-6 py-3">
                          <p className="font-medium text-foreground">{a.name}</p>
                          <p className="text-xs text-muted-foreground">{a.email}</p>
                        </td>
                        <td className="px-6 py-3 text-foreground">{a.tickets}</td>
                        <td className="px-6 py-3">
                          <Badge variant={a.status === 'Confirmado' ? 'success' : 'warning'}>{a.status}</Badge>
                        </td>
                        {eventoState === 'En curso' && (
                          <td className="px-6 py-3">
                            {a.checked ? (
                              <Badge variant="success">Registrado</Badge>
                            ) : (
                              <span className="text-xs text-muted-foreground">—</span>
                            )}
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Detalles</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                <Detail icon={Calendar} label="Fecha" value={evento.fecha} />
                <Detail icon={Clock} label="Hora" value={evento.hora} />
                <Detail icon={MapPin} label="Lugar" value={evento.lugar} />
                <Detail icon={Ticket} label="Tipo" value={evento.tipo} />
              </CardContent>
            </Card>
            <Card className="bg-primary text-primary-foreground">
              <CardContent className="p-5">
                <p className="text-sm font-medium opacity-90">Enlace de inscripción público</p>
                <p className="mt-1 break-all text-xs opacity-75">redil.app/inscripcion/{evento.id}</p>
                <Button asChild variant="secondary" size="sm" className="mt-4 w-full">
                  <Link href={`/inscripcion/${evento.id}`}>Ver formulario público</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {activeTab === 'asistencia' && canRegisterAttendance && evento.requiereRegistro && (
        <EventoAttendanceRegister
          eventId={evento.id}
          eventName={evento.titulo}
          participantes={participantes}
          onSave={(attendance) => {
            console.log('Asistencia guardada:', attendance)
          }}
        />
      )}
    </div>
  )
}

function StatCard({
  icon: Icon,
  label,
  value,
  hint,
}: {
  icon: React.ElementType
  label: string
  value: string
  hint: string
}) {
  return (
    <Card>
      <CardContent className="flex flex-col gap-2 p-5">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Icon className="h-4 w-4" />
          <span className="text-sm">{label}</span>
        </div>
        <p className="text-2xl font-bold text-foreground">{value}</p>
        <p className="text-xs text-muted-foreground">{hint}</p>
      </CardContent>
    </Card>
  )
}

function Detail({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType
  label: string
  value: string
}) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-medium text-foreground">{value}</p>
      </div>
    </div>
  )
}
