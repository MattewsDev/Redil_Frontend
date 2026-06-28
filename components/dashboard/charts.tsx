'use client'

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { asistenciaTrend, nuevosMiembros, distribucionTipo } from '@/lib/data'

const axisProps = {
  tickLine: false,
  axisLine: false,
  tick: { fill: 'var(--muted-foreground)', fontSize: 12 },
}

function TooltipBox({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg border border-border bg-popover px-3 py-2 text-xs shadow-md">
      {label && <p className="mb-1 font-medium text-foreground">{label}</p>}
      {payload.map((p: any) => (
        <p key={p.dataKey} className="flex items-center gap-2 text-muted-foreground">
          <span className="size-2 rounded-full" style={{ background: p.color || p.fill }} />
          {p.name}: <span className="font-medium text-foreground">{p.value}</span>
        </p>
      ))}
    </div>
  )
}

export function AsistenciaChart() {
  return (
    <div className="h-[260px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={asistenciaTrend} margin={{ left: 0, right: 0, top: 8, bottom: 0 }}>
          <defs>
            <linearGradient id="fillAsist" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.3} />
              <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
          <XAxis dataKey="mes" {...axisProps} />
          <YAxis {...axisProps} />
          <Tooltip content={<TooltipBox />} />
          <Area
            type="monotone"
            dataKey="asistencia"
            name="Asistencia"
            stroke="var(--chart-1)"
            strokeWidth={2.5}
            fill="url(#fillAsist)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export function NuevosMiembrosChart() {
  return (
    <div className="h-[260px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={nuevosMiembros} margin={{ left: 0, right: 0, top: 8, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
          <XAxis dataKey="mes" {...axisProps} />
          <YAxis {...axisProps} />
          <Tooltip content={<TooltipBox />} cursor={{ fill: 'var(--muted)' }} />
          <Bar dataKey="valor" name="Nuevos" fill="var(--chart-1)" radius={[6, 6, 0, 0]} maxBarSize={36} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export function DistribucionChart() {
  return (
    <div className="h-[220px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Tooltip content={<TooltipBox />} />
          <Pie
            data={distribucionTipo}
            dataKey="valor"
            nameKey="nombre"
            innerRadius={56}
            outerRadius={88}
            paddingAngle={2}
            strokeWidth={0}
          >
            {distribucionTipo.map((d) => (
              <Cell key={d.nombre} fill={d.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
