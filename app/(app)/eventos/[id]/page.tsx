import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Clock, Ticket, QrCode, Share2, Download, Users, TrendingUp } from "lucide-react"
import { eventos, personas } from "@/lib/data"

interface EventDetailPageProps {
  params: Promise<{ id: string }>
}

// Mock data para asistentes del evento
const attendeesByEvent = {
  e1: [
    { name: "María González", email: "maria@ejemplo.com", tickets: 2, status: "Confirmado", checked: true },
    { name: "Carlos Ramírez", email: "carlos@ejemplo.com", tickets: 1, status: "Confirmado", checked: true },
  ],
  e2: [
    { name: "Ana Martínez", email: "ana@ejemplo.com", tickets: 4, status: "Confirmado", checked: false },
    { name: "Pedro Sánchez", email: "pedro@ejemplo.com", tickets: 1, status: "Pendiente", checked: false },
  ],
  e3: [
    { name: "María González", email: "maria@ejemplo.com", tickets: 2, status: "Confirmado", checked: true },
    { name: "Carlos Ramírez", email: "carlos@ejemplo.com", tickets: 1, status: "Confirmado", checked: true },
    { name: "Ana Martínez", email: "ana@ejemplo.com", tickets: 4, status: "Confirmado", checked: false },
    { name: "Pedro Sánchez", email: "pedro@ejemplo.com", tickets: 1, status: "Pendiente", checked: false },
    { name: "Lucía Torres", email: "lucia@ejemplo.com", tickets: 2, status: "Confirmado", checked: true },
  ],
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const { id } = await params
  const evento = eventos.find(e => e.id === id)
  
  if (!evento) {
    return (
      <div className="flex flex-col gap-6">
        <PageHeader
          title="Evento no encontrado"
          description="El evento que buscas no existe."
        >
          <Button variant="ghost" size="sm" render={<Link href="/eventos" />}>
            <ArrowLeft className="size-4" /> Volver
          </Button>
        </PageHeader>
      </div>
    )
  }

  const attendees = attendeesByEvent[id as keyof typeof attendeesByEvent] || []
  const ocupacion = Math.round((evento.registrados / evento.capacidad) * 100)
  const disponibles = evento.capacidad - evento.registrados
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title={evento.titulo}
        description={`${evento.fecha} · ${evento.lugar}`}
      >
        <Button variant="ghost" size="sm" render={<Link href="/eventos" />}>
          <ArrowLeft className="size-4" /> Volver
        </Button>
        <Button variant="outline" className="gap-2 bg-transparent">
          <Share2 className="h-4 w-4" /> Compartir
        </Button>
        <Button className="gap-2">
          <QrCode className="h-4 w-4" /> Escanear entradas
        </Button>
      </PageHeader>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Users} label="Inscritos" value={evento.registrados.toString()} hint={`${disponibles} disponibles`} />
        <StatCard icon={Ticket} label="Capacidad" value={evento.capacidad.toString()} hint={`${evento.registrados} registrados`} />
        <StatCard icon={QrCode} label="Check-ins" value={evento.estado === "En curso" ? (Math.floor(evento.registrados * 0.5)).toString() : "0"} hint={evento.estado === "En curso" ? "En vivo" : `Inicia ${evento.fecha}`} />
        <StatCard icon={TrendingUp} label="Ocupación" value={`${ocupacion}%`} hint="del aforo total" />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>Inscritos</CardTitle>
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
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
                    <th className="px-6 py-3 font-medium">Check-in</th>
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
                        <Badge variant={a.status === "Confirmado" ? "success" : "warning"}>{a.status}</Badge>
                      </td>
                      <td className="px-6 py-3">
                        {a.checked ? (
                          <Badge variant="success">Registrado</Badge>
                        ) : (
                          <span className="text-xs text-muted-foreground">—</span>
                        )}
                      </td>
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
              <p className="mt-1 break-all text-xs opacity-75">redil.app/inscripcion/avivamiento-2026</p>
              <Button asChild variant="secondary" size="sm" className="mt-4 w-full">
                <Link href="/inscripcion/avivamiento-2026">Ver formulario público</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
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
