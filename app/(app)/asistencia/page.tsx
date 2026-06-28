import Link from "next/link"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar } from "@/components/ui/avatar"
import { QrCode, UserCheck, Clock, CalendarDays, ArrowUpRight } from "lucide-react"

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
        description="Registra y monitorea la asistencia de tus servicios y reuniones."
      >
        <Link href="/asistencia/escanear">
          <Button className="gap-2">
            <QrCode className="h-4 w-4" /> Iniciar check-in
          </Button>
        </Link>
      </PageHeader>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={UserCheck} label="Presentes hoy" value="412" hint="86% del aforo" />
        <StatCard icon={CalendarDays} label="Servicios este mes" value="18" hint="+3 vs mes anterior" />
        <StatCard icon={Clock} label="Promedio asistencia" value="78%" hint="últimas 8 semanas" />
        <StatCard icon={QrCode} label="Check-ins QR" value="1,284" hint="este mes" />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <Card>
          <CardHeader>
            <CardTitle>Servicios recientes</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {services.map((s) => {
              const pct = Math.round((s.present / s.total) * 100)
              return (
                <div
                  key={s.id}
                  className="flex flex-col gap-3 rounded-xl border border-border p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-foreground">{s.name}</p>
                      <Badge
                        variant={
                          s.status === "En curso" ? "success" : s.status === "Programado" ? "warning" : "secondary"
                        }
                      >
                        {s.status}
                      </Badge>
                    </div>
                    <p className="mt-0.5 text-sm text-muted-foreground">{s.date}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-32">
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>
                          {s.present}/{s.total}
                        </span>
                        <span>{pct}%</span>
                      </div>
                      <div className="mt-1 h-2 overflow-hidden rounded-full bg-muted">
                        <div className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <ArrowUpRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Check-ins en vivo</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-1">
            {recentCheckins.map((c, i) => (
              <div key={i} className="flex items-center gap-3 rounded-lg px-2 py-2.5 hover:bg-muted">
                <Avatar name={c.name} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">{c.name}</p>
                  <p className="text-xs text-muted-foreground">{c.ministry}</p>
                </div>
                <span className="shrink-0 text-xs text-muted-foreground">{c.time}</span>
              </div>
            ))}
          </CardContent>
        </Card>
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
