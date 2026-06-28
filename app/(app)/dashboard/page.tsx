import Link from 'next/link'
import {
  ArrowDownRight,
  ArrowUpRight,
  CalendarPlus,
  Download,
  QrCode,
  UserPlus,
  CheckCircle2,
  CalendarDays,
  Send,
} from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  AsistenciaChart,
  NuevosMiembrosChart,
  DistribucionChart,
} from '@/components/dashboard/charts'
import { kpis, actividadReciente, distribucionTipo } from '@/lib/data'
import { cn } from '@/lib/utils'

const actIcon = {
  persona: UserPlus,
  checkin: CheckCircle2,
  evento: CalendarDays,
  invitacion: Send,
}

export default function DashboardPage() {
  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Resumen de la actividad de Iglesia Central — Junio 2026."
      >
        <Button variant="outline" size="sm">
          <Download className="size-4" /> Exportar
        </Button>
        <Button size="sm" render={<Link href="/eventos/nuevo" />}>
          <CalendarPlus className="size-4" /> Nuevo evento
        </Button>
      </PageHeader>

      <div className="flex flex-col gap-6 p-4 md:p-6">
        {/* KPI grid */}
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-6">
          {kpis.map((k) => (
            <Card key={k.label}>
              <CardContent className="p-4">
                <p className="text-xs font-medium text-muted-foreground">{k.label}</p>
                <p className="mt-2 text-2xl font-bold tracking-tight text-foreground">{k.valor}</p>
                <span
                  className={cn(
                    'mt-2 inline-flex items-center gap-0.5 text-xs font-medium',
                    k.positivo ? 'text-success' : 'text-destructive',
                  )}
                >
                  {k.positivo ? (
                    <ArrowUpRight className="size-3.5" />
                  ) : (
                    <ArrowDownRight className="size-3.5" />
                  )}
                  {k.delta}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader className="flex-row items-center justify-between">
              <div>
                <CardTitle>Tendencia de asistencia</CardTitle>
                <p className="text-sm text-muted-foreground">Últimos 6 meses</p>
              </div>
              <Badge variant="success">+6.8%</Badge>
            </CardHeader>
            <CardContent>
              <AsistenciaChart />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Distribución de personas</CardTitle>
              <p className="text-sm text-muted-foreground">Por tipo</p>
            </CardHeader>
            <CardContent>
              <DistribucionChart />
              <div className="mt-2 flex flex-col gap-2">
                {distribucionTipo.map((d) => (
                  <div key={d.nombre} className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <span className="size-2.5 rounded-full" style={{ background: d.color }} />
                      {d.nombre}
                    </span>
                    <span className="font-medium text-foreground">{d.valor.toLocaleString('es')}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader className="flex-row items-center justify-between">
              <div>
                <CardTitle>Nuevos miembros</CardTitle>
                <p className="text-sm text-muted-foreground">Crecimiento mensual</p>
              </div>
              <Badge variant="cream">+52 en junio</Badge>
            </CardHeader>
            <CardContent>
              <NuevosMiembrosChart />
            </CardContent>
          </Card>

          {/* Activity feed */}
          <Card>
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle>Actividad reciente</CardTitle>
              <Button variant="ghost" size="xs">
                Ver todo
              </Button>
            </CardHeader>
            <CardContent className="flex flex-col gap-1">
              {actividadReciente.map((a) => {
                const Icon = actIcon[a.tipo]
                return (
                  <div
                    key={a.id}
                    className="flex items-start gap-3 rounded-lg px-2 py-2.5 hover:bg-muted/50"
                  >
                    <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Icon className="size-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-foreground">{a.titulo}</p>
                      <p className="truncate text-xs text-muted-foreground">{a.detalle}</p>
                    </div>
                    <span className="shrink-0 text-xs text-muted-foreground">{a.tiempo}</span>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { icon: UserPlus, label: 'Crear persona', href: '/personas/nueva' },
            { icon: CalendarPlus, label: 'Crear evento', href: '/eventos/nuevo' },
            { icon: QrCode, label: 'Escáner QR', href: '/asistencia/scanner' },
            { icon: Send, label: 'Invitar usuario', href: '/usuarios' },
          ].map((a) => (
            <Link
              key={a.label}
              href={a.href}
              className="flex flex-col items-start gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/40 hover:bg-muted/40"
            >
              <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <a.icon className="size-5" />
              </span>
              <span className="text-sm font-semibold text-foreground">{a.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
