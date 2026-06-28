import Link from "next/link"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar } from "@/components/ui/avatar"
import { QrCode, UserCheck, Clock, CalendarDays, ArrowUpRight, TrendingUp } from "lucide-react"

const services = [
  { id: 1, name: "Servicio Dominical Matutino", date: "Domingo 22 Jun · 9:00 AM", present: 412, total: 480, status: "En curso" },
  { id: 2, name: "Servicio Dominical Vespertino", date: "Domingo 22 Jun · 6:00 PM", present: 0, total: 320, status: "Programado" },
  { id: 3, name: "Reunión de Jóvenes", date: "Viernes 20 Jun · 7:00 PM", present: 96, total: 110, status: "Finalizado" },
  { id: 4, name: "Estudio Bíblico", date: "Miércoles 18 Jun · 7:30 PM", present: 64, total: 80, status: "Finalizado" },
]

const recentCheckins = [
  { name: "María González", time: "Hace 1 min", ministry: "Alabanza" },
  { name: "Carlos Ramírez", time: "Hace 2 min", ministry: "Ujieres" },
  { name: "Ana Martínez", time: "Hace 3 min", ministry: "Niños" },
  { name: "Pedro Sánchez", time: "Hace 5 min", ministry: "Visitante" },
  { name: "Lucía Torres", time: "Hace 6 min", ministry: "Multimedia" },
]

export default function AsistenciaPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Asistencia"
        description="Dashboard de asistencia en tus servicios y reuniones. Accede a cualquier evento en curso para registrar asistencia."
      >
        <Link href="/eventos">
          <Button className="gap-2">
            <QrCode className="h-4 w-4" /> Ir a Eventos
          </Button>
        </Link>
      </PageHeader>

      {/* Estadísticas generales */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={UserCheck} label="Presentes hoy" value="412" hint="86% del aforo" />
        <StatCard icon={QrCode} label="Check-ins QR" value="1,284" hint="este mes" />
        <StatCard icon={Clock} label="Promedio asistencia" value="78%" hint="últimas 8 semanas" />
        <StatCard icon={TrendingUp} label="Servicios este mes" value="18" hint="+3 vs mes anterior" />
      </div>

      {/* Servicios recientes y feed en vivo */}
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <Card>
          <CardHeader>
            <CardTitle>Servicios recientes</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {services.slice(0, 4).map((s) => {
              const pct = Math.round((s.present / s.total) * 100)
              return (
                <Link key={s.id} href={`/eventos/${s.id}`}>
                  <div className="flex flex-col gap-3 rounded-xl border border-border p-3 hover:border-primary/50 hover:bg-muted/30 transition-all sm:flex-row sm:items-center sm:justify-between cursor-pointer">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-foreground text-sm">{s.name}</p>
                        <Badge
                          variant={
                            s.status === "En curso" ? "success" : s.status === "Programado" ? "warning" : "secondary"
                          }
                          className="text-xs"
                        >
                          {s.status}
                        </Badge>
                      </div>
                      <p className="mt-0.5 text-xs text-muted-foreground">{s.date}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-20">
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>
                            {s.present}/{s.total}
                          </span>
                          <span>{pct}%</span>
                        </div>
                        <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-muted">
                          <div className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                </Link>
              )
            })}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">En vivo</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-0.5">
            {recentCheckins.slice(0, 6).map((c, i) => (
              <div key={i} className="flex items-center gap-2 rounded-lg px-2 py-2 hover:bg-muted/50">
                <Avatar name={c.name} className="h-8 w-8" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-medium text-foreground">{c.name}</p>
                  <p className="text-xs text-muted-foreground">{c.ministry}</p>
                </div>
                <span className="shrink-0 text-xs text-muted-foreground whitespace-nowrap">{c.time}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Información adicional */}
      <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
        <CardContent className="pt-6">
          <p className="text-sm text-blue-900 dark:text-blue-100">
            <span className="font-semibold">Consejo:</span> Para registrar asistencia, dirígete a un evento en curso desde la sección "Eventos" y abre la pestaña "Registrar Asistencia". Puedes buscar participantes por nombre, email o documento y usar los toggles para marcar asistencia rápidamente.
          </p>
        </CardContent>
      </Card>
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
