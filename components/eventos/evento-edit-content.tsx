'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Save, X } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Evento } from '@/lib/data'

interface EventoEditContentProps {
  evento: Evento
}

export function EventoEditContent({ evento }: EventoEditContentProps) {
  const [formData, setFormData] = useState({
    titulo: evento.titulo,
    fecha: evento.fecha,
    hora: evento.hora,
    lugar: evento.lugar,
    tipo: evento.tipo,
    capacidad: evento.capacidad,
    conTicket: evento.conTicket,
    requiereRegistro: evento.requiereRegistro,
  })

  const [saved, setSaved] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
    setSaved(false)
  }

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title={`Editar: ${evento.titulo}`}
        description="Modifica los detalles del evento"
      >
        <div className="flex gap-2">
          <Link href={`/eventos/${evento.id}`}>
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Volver
            </Button>
          </Link>
          <Button onClick={handleSave} className="gap-2">
            <Save className="h-4 w-4" /> Guardar cambios
          </Button>
        </div>
      </PageHeader>

      {saved && (
        <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-800">
          ✓ Los cambios se han guardado correctamente
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Información básica */}
          <Card>
            <CardHeader>
              <CardTitle>Información Básica</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div>
                <label className="text-sm font-medium text-foreground">Título del evento</label>
                <input
                  type="text"
                  name="titulo"
                  value={formData.titulo}
                  onChange={handleChange}
                  placeholder="Ej: Servicio Dominical"
                  className="mt-2 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground">Tipo de evento</label>
                <select
                  name="tipo"
                  value={formData.tipo}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="Servicio">Servicio</option>
                  <option value="Conferencia">Conferencia</option>
                  <option value="Retiro">Retiro</option>
                  <option value="Reunión">Reunión</option>
                  <option value="Especial">Especial</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium text-foreground">Fecha</label>
                  <input
                    type="date"
                    name="fecha"
                    value={formData.fecha}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Hora</label>
                  <input
                    type="time"
                    name="hora"
                    value={formData.hora}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Ubicación y capacidad */}
          <Card>
            <CardHeader>
              <CardTitle>Ubicación y Capacidad</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div>
                <label className="text-sm font-medium text-foreground">Lugar del evento</label>
                <input
                  type="text"
                  name="lugar"
                  value={formData.lugar}
                  onChange={handleChange}
                  placeholder="Ej: Auditorio principal"
                  className="mt-2 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground">Capacidad máxima</label>
                <input
                  type="number"
                  name="capacidad"
                  value={formData.capacidad}
                  onChange={handleChange}
                  placeholder="Ej: 800"
                  className="mt-2 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div className="flex items-center gap-3 rounded-lg border border-border p-3">
                <input
                  type="checkbox"
                  id="conTicket"
                  name="conTicket"
                  checked={formData.conTicket}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-input accent-primary"
                />
                <label htmlFor="conTicket" className="text-sm font-medium text-foreground cursor-pointer">
                  Este evento requiere tickets
                </label>
              </div>

              <div className="flex items-center gap-3 rounded-lg border border-border p-3">
                <input
                  type="checkbox"
                  id="requiereRegistro"
                  name="requiereRegistro"
                  checked={formData.requiereRegistro}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-input accent-primary"
                />
                <div className="flex-1">
                  <label htmlFor="requiereRegistro" className="text-sm font-medium text-foreground cursor-pointer block">
                    Requiere registro previo
                  </label>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Los asistentes deben registrarse antes del evento. Si está desactivado, solo pueden marcar asistencia en el momento.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar con resumen */}
        <div className="flex flex-col gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Resumen del evento</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <div className="rounded-lg bg-muted p-3">
                <p className="text-xs text-muted-foreground">Estado actual</p>
                <Badge className="mt-2 gap-2">
                  {evento.estado === 'Programado' && <span className="h-2 w-2 rounded-full bg-blue-400" />}
                  {evento.estado === 'En curso' && <span className="h-2 w-2 rounded-full bg-green-400" />}
                  {evento.estado === 'Finalizado' && <span className="h-2 w-2 rounded-full bg-gray-400" />}
                  {evento.estado === 'Cancelado' && <span className="h-2 w-2 rounded-full bg-red-400" />}
                  {evento.estado}
                </Badge>
              </div>

              <div className="rounded-lg bg-muted p-3">
                <p className="text-xs text-muted-foreground">Inscritos actuales</p>
                <p className="mt-2 text-2xl font-bold text-foreground">{evento.registrados}</p>
                <p className="text-xs text-muted-foreground">de {formData.capacidad} máximo</p>
              </div>

              <div className="rounded-lg bg-muted p-3">
                <p className="text-xs text-muted-foreground">Ocupación</p>
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex-1 overflow-hidden rounded-full bg-muted-foreground/20 h-2">
                    <div 
                      className="h-full bg-primary rounded-full" 
                      style={{ width: `${(evento.registrados / formData.capacidad) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    {Math.round((evento.registrados / formData.capacidad) * 100)}%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="rounded-lg border border-amber-200 bg-amber-50 p-3">
            <p className="text-xs font-medium text-amber-900">Nota</p>
            <p className="mt-1 text-xs text-amber-800">
              Los cambios se guardarán cuando hagas clic en "Guardar cambios". Los asistentes recibirán notificación de cambios importantes.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
