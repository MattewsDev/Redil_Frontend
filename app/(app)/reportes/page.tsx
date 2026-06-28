'use client'

import { Download, TrendingUp, Users, Calendar, Activity } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import {
  kpis,
  asistenciaTrend,
  nuevosMiembros,
  distribucionTipo,
  ministerios,
} from '@/lib/data'

const chartColors = ['#285ccc', '#00c896', '#ffa500', '#ff6b6b']

export default function ReportesPage() {
  return (
    <div>
      <PageHeader
        title="Reportes"
        description="Análisis y estadísticas de tu iglesia."
      >
        <Button variant="outline" size="sm">
          <Download className="size-4" /> Exportar PDF
        </Button>
        <Button size="sm">
          <Download className="size-4" /> Exportar Excel
        </Button>
      </PageHeader>

      <div className="flex flex-col gap-6 p-4 md:p-6">
        {/* KPIs */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4">Indicadores clave</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {kpis.map((kpi) => (
              <Card key={kpi.label}>
                <CardContent className="p-4">
                  <p className="text-xs text-muted-foreground">{kpi.label}</p>
                  <div className="mt-2 flex items-baseline gap-2">
                    <p className="text-2xl font-bold text-foreground">{kpi.valor}</p>
                    <Badge variant={kpi.positivo ? 'success' : 'muted'}>
                      <TrendingUp className="size-3 mr-1" />
                      {kpi.delta}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Charts grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Tendencia de asistencia */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Tendencia de asistencia</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={asistenciaTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="mes" stroke="var(--muted-foreground)" />
                  <YAxis stroke="var(--muted-foreground)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--card)',
                      border: '1px solid var(--border)',
                      borderRadius: '8px',
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="asistencia"
                    stroke={chartColors[0]}
                    strokeWidth={2}
                    dot={{ fill: chartColors[0], r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="miembros"
                    stroke={chartColors[1]}
                    strokeWidth={2}
                    dot={{ fill: chartColors[1], r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Nuevos miembros */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Nuevos miembros por mes</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={nuevosMiembros}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="mes" stroke="var(--muted-foreground)" />
                  <YAxis stroke="var(--muted-foreground)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--card)',
                      border: '1px solid var(--border)',
                      borderRadius: '8px',
                    }}
                  />
                  <Bar dataKey="valor" fill={chartColors[0]} radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Distribución por tipo */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Distribución de personas</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={distribucionTipo}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={(entry) => `${entry.nombre}: ${entry.valor}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="valor"
                  >
                    {distribucionTipo.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--card)',
                      border: '1px solid var(--border)',
                      borderRadius: '8px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Ministerios más activos */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Ministerios más activos</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={ministerios}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 150 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis type="number" stroke="var(--muted-foreground)" />
                  <YAxis dataKey="nombre" type="category" stroke="var(--muted-foreground)" width={140} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--card)',
                      border: '1px solid var(--border)',
                      borderRadius: '8px',
                    }}
                  />
                  <Bar dataKey="participantes" fill={chartColors[0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Detailed table */}
        <Card>
          <CardHeader>
            <CardTitle>Resumen por ministerio</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/40 text-left text-xs uppercase tracking-wide text-muted-foreground">
                    <th className="px-6 py-3 font-medium">Ministerio</th>
                    <th className="px-6 py-3 font-medium">Líder</th>
                    <th className="px-6 py-3 font-medium">Participantes</th>
                    <th className="px-6 py-3 font-medium">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {ministerios.map((m) => (
                    <tr key={m.id} className="border-b border-border last:border-0 hover:bg-muted/40 transition-colors">
                      <td className="px-6 py-4 font-medium text-foreground">{m.nombre}</td>
                      <td className="px-6 py-4 text-muted-foreground">{m.lider}</td>
                      <td className="px-6 py-4">{m.participantes}</td>
                      <td className="px-6 py-4">
                        <Badge variant={m.estado === 'Activo' ? 'success' : 'muted'}>
                          {m.estado}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
