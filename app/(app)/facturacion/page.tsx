'use client'

import { useState } from 'react'
import { Check, Calendar, Users, Zap } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { planes } from '@/lib/data'
import { cn } from '@/lib/utils'

export default function FacturacionPage() {
  const [planActual, setPlanActual] = useState('Church')
  const [cicloFacturacion, setCicloFacturacion] = useState('anual')

  return (
    <div>
      <PageHeader
        title="Facturación"
        description="Administra tu suscripción y pagos."
      />

      <div className="flex flex-col gap-6 p-4 md:p-6">
        {/* Información de suscripción actual */}
        <Card>
          <CardHeader>
            <CardTitle>Suscripción actual</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Plan</p>
              <p className="text-2xl font-bold text-foreground">{planActual}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Estado</p>
              <Badge>Activa</Badge>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Próximo cobro</p>
              <p className="font-semibold text-foreground">27 de julio 2026</p>
            </div>
            <div className="flex items-end">
              <Button variant="outline" size="sm">
                Cambiar plan
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Consumo de límites */}
        <Card>
          <CardHeader>
            <CardTitle>Consumo de límites</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: 'Personas registradas', actual: 1648, limite: 3000 },
              { label: 'Usuarios', actual: 23, limite: -1 },
              { label: 'Eventos', actual: 6, limite: -1 },
              { label: 'Almacenamiento', actual: 2.4, limite: 50, unidad: 'GB' },
            ].map((item) => {
              const porcentaje = item.limite > 0 ? (item.actual / item.limite) * 100 : 0
              return (
                <div key={item.label} className="rounded-lg border border-border p-4">
                  <p className="text-xs text-muted-foreground mb-2">{item.label}</p>
                  <p className="text-lg font-bold text-foreground">
                    {item.actual}
                    {item.unidad ? ` ${item.unidad}` : ''}
                  </p>
                  {item.limite > 0 && (
                    <>
                      <div className="mt-2 h-1.5 rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full bg-primary transition-all"
                          style={{ width: `${Math.min(porcentaje, 100)}%` }}
                        />
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">
                        de {item.limite}
                      </p>
                    </>
                  )}
                  {item.limite < 0 && (
                    <p className="mt-1 text-xs text-muted-foreground">Ilimitado</p>
                  )}
                </div>
              )
            })}
          </CardContent>
        </Card>

        {/* Planes */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Comparar planes</h2>
            <div className="flex rounded-lg border border-border bg-card p-0.5">
              {['mensual', 'anual'].map((ciclo) => (
                <button
                  key={ciclo}
                  onClick={() => setCicloFacturacion(ciclo)}
                  className={cn(
                    'rounded-md px-3 py-1.5 text-sm font-medium transition-colors capitalize',
                    cicloFacturacion === ciclo
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground',
                  )}
                >
                  {ciclo}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {planes.map((plan) => (
              <Card
                key={plan.nombre}
                className={cn(
                  'flex flex-col transition-all hover:shadow-lg',
                  plan.destacado && 'border-primary shadow-lg',
                  plan.nombre === planActual && 'border-primary bg-primary/5'
                )}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{plan.nombre}</CardTitle>
                      <p className="text-xs text-muted-foreground mt-1">{plan.descripcion}</p>
                    </div>
                    {plan.destacado && (
                      <Badge className="whitespace-nowrap">Popular</Badge>
                    )}
                  </div>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-foreground">{plan.precio}</span>
                    <span className="text-sm text-muted-foreground">{plan.periodo}</span>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col gap-4">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-2">
                      {plan.limite}
                    </p>
                  </div>

                  <div className="flex-1">
                    <ul className="space-y-2">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-sm text-foreground">
                          <Check className="size-4 text-success flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-border">
                    {plan.nombre === planActual ? (
                      <Badge variant="success" className="w-full justify-center py-2">
                        Plan actual
                      </Badge>
                    ) : (
                      <Button
                        variant={plan.destacado ? 'default' : 'outline'}
                        className="w-full"
                      >
                        {plan.nombre === 'Enterprise' ? 'Contactar' : 'Actualizar'}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Historial de facturas */}
        <Card>
          <CardHeader>
            <CardTitle>Historial de facturas</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/40 text-left text-xs uppercase tracking-wide text-muted-foreground">
                    <th className="px-6 py-3 font-medium">Factura</th>
                    <th className="px-6 py-3 font-medium">Fecha</th>
                    <th className="px-6 py-3 font-medium">Período</th>
                    <th className="px-6 py-3 font-medium">Monto</th>
                    <th className="px-6 py-3 font-medium">Estado</th>
                    <th className="px-6 py-3 font-medium text-right">Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      id: 'INV-001',
                      fecha: '27 de junio 2026',
                      periodo: 'Junio 2026',
                      monto: '$79.00',
                      estado: 'Pagado',
                    },
                    {
                      id: 'INV-002',
                      fecha: '27 de mayo 2026',
                      periodo: 'Mayo 2026',
                      monto: '$79.00',
                      estado: 'Pagado',
                    },
                    {
                      id: 'INV-003',
                      fecha: '27 de abril 2026',
                      periodo: 'Abril 2026',
                      monto: '$79.00',
                      estado: 'Pagado',
                    },
                  ].map((factura) => (
                    <tr key={factura.id} className="border-b border-border last:border-0 hover:bg-muted/40 transition-colors">
                      <td className="px-6 py-4 font-medium text-foreground">{factura.id}</td>
                      <td className="px-6 py-4 text-muted-foreground">{factura.fecha}</td>
                      <td className="px-6 py-4 text-muted-foreground">{factura.periodo}</td>
                      <td className="px-6 py-4 font-semibold text-foreground">{factura.monto}</td>
                      <td className="px-6 py-4">
                        <Badge variant="success">{factura.estado}</Badge>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Button variant="ghost" size="sm">
                          Descargar
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Método de pago */}
        <Card>
          <CardHeader>
            <CardTitle>Método de pago</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex items-center justify-between rounded-lg border border-border p-4">
              <div>
                <p className="font-medium text-foreground">Tarjeta de crédito</p>
                <p className="text-sm text-muted-foreground">•••• •••• •••• 4242</p>
              </div>
              <Badge>Principal</Badge>
            </div>
            <Button variant="outline">Agregar método de pago</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
