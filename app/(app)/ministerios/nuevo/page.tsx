'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowLeft, Plus, X } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { personas } from '@/lib/data'

export default function NuevoMinisterioPage() {
  const [nombre, setNombre] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [lideresSeleccionados, setLideresSeleccionados] = useState<string[]>([])
  const [participantesSeleccionados, setParticipantesSeleccionados] = useState<string[]>([])
  const [showLideresModal, setShowLideresModal] = useState(false)
  const [showParticipantesModal, setShowParticipantesModal] = useState(false)

  const lideres = personas.filter((p) => p.tipo === 'Líder')
  const miembros = personas.filter((p) => p.tipo === 'Miembro')

  const handleAddLider = (id: string) => {
    if (!lideresSeleccionados.includes(id)) {
      setLideresSeleccionados([...lideresSeleccionados, id])
    }
  }

  const handleRemoveLider = (id: string) => {
    setLideresSeleccionados(lideresSeleccionados.filter((l) => l !== id))
  }

  const handleAddParticipante = (id: string) => {
    if (!participantesSeleccionados.includes(id)) {
      setParticipantesSeleccionados([...participantesSeleccionados, id])
    }
  }

  const handleRemoveParticipante = (id: string) => {
    setParticipantesSeleccionados(participantesSeleccionados.filter((p) => p !== id))
  }

  const selectedLideres = personas.filter((p) => lideresSeleccionados.includes(p.id))
  const selectedParticipantes = personas.filter((p) => participantesSeleccionados.includes(p.id))

  return (
    <div>
      <PageHeader
        title="Crear ministerio"
        description="Agrega un nuevo ministerio a tu iglesia."
      >
        <Button variant="ghost" size="sm" render={<Link href="/ministerios" />}>
          <ArrowLeft className="size-4" /> Volver
        </Button>
      </PageHeader>

      <div className="grid gap-6 p-4 md:p-6 lg:grid-cols-3">
        {/* Form */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Información básica */}
          <Card>
            <CardHeader>
              <CardTitle>Información básica</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div>
                <label className="text-sm font-medium text-foreground">Nombre del ministerio</label>
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Ej: Alabanza y Adoración"
                  className="mt-2 h-10 w-full rounded-lg border border-input bg-card px-3 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/25"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Descripción</label>
                <textarea
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  placeholder="Describe el propósito y actividades del ministerio..."
                  rows={4}
                  className="mt-2 w-full rounded-lg border border-input bg-card px-3 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/25"
                />
              </div>
            </CardContent>
          </Card>

          {/* Líderes */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Líderes</CardTitle>
                <Button size="sm" variant="outline" onClick={() => setShowLideresModal(true)}>
                  <Plus className="size-4" /> Agregar
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {selectedLideres.length > 0 ? (
                <div className="flex flex-col gap-2">
                  {selectedLideres.map((l) => (
                    <div key={l.id} className="flex items-center justify-between rounded-lg border border-border p-3">
                      <div className="flex items-center gap-3">
                        <Avatar name={l.nombre} className="size-8" />
                        <div>
                          <p className="font-medium text-foreground text-sm">{l.nombre}</p>
                          <p className="text-xs text-muted-foreground">{l.email}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemoveLider(l.id)}
                        className="p-1 hover:bg-destructive/10 rounded-lg text-destructive"
                      >
                        <X className="size-4" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="py-6 text-center text-sm text-muted-foreground">Sin líderes seleccionados</p>
              )}
            </CardContent>
          </Card>

          {/* Participantes */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Participantes</CardTitle>
                <Button size="sm" variant="outline" onClick={() => setShowParticipantesModal(true)}>
                  <Plus className="size-4" /> Agregar
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {selectedParticipantes.length > 0 ? (
                <div className="flex flex-col gap-2 max-h-64 overflow-y-auto">
                  {selectedParticipantes.map((p) => (
                    <div key={p.id} className="flex items-center justify-between rounded-lg border border-border p-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <Avatar name={p.nombre} className="size-8" />
                        <div className="min-w-0">
                          <p className="font-medium text-foreground text-sm truncate">{p.nombre}</p>
                          <p className="text-xs text-muted-foreground truncate">{p.email}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemoveParticipante(p.id)}
                        className="p-1 hover:bg-destructive/10 rounded-lg text-destructive ml-2 flex-shrink-0"
                      >
                        <X className="size-4" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="py-6 text-center text-sm text-muted-foreground">Sin participantes seleccionados</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Resumen */}
        <div className="flex flex-col gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Resumen</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Nombre</p>
                <p className="font-medium text-foreground">{nombre || '—'}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Líderes</p>
                <p className="text-2xl font-bold text-primary">{selectedLideres.length}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Participantes</p>
                <p className="text-2xl font-bold text-primary">{selectedParticipantes.length}</p>
              </div>
              <div className="flex flex-col gap-2 pt-4 border-t border-border">
                <Button className="w-full">Crear ministerio</Button>
                <Button variant="outline" render={<Link href="/ministerios" />}>
                  Cancelar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modal for selecting líderes */}
      {showLideresModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 p-4">
          <Card className="max-h-[80vh] w-full max-w-md overflow-y-auto">
            <CardHeader className="sticky top-0 bg-card">
              <div className="flex items-center justify-between">
                <CardTitle>Agregar líderes</CardTitle>
                <button
                  onClick={() => setShowLideresModal(false)}
                  className="p-1 hover:bg-muted rounded-lg"
                >
                  <X className="size-4" />
                </button>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              {lideres.map((l) => (
                <button
                  key={l.id}
                  onClick={() => {
                    handleAddLider(l.id)
                    setShowLideresModal(false)
                  }}
                  className="flex items-center justify-between rounded-lg border border-border p-3 hover:bg-muted transition-colors text-left"
                >
                  <div className="flex items-center gap-3">
                    <Avatar name={l.nombre} className="size-8" />
                    <div>
                      <p className="font-medium text-foreground text-sm">{l.nombre}</p>
                      <p className="text-xs text-muted-foreground">{l.email}</p>
                    </div>
                  </div>
                  {lideresSeleccionados.includes(l.id) && <Badge>Seleccionado</Badge>}
                </button>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Modal for selecting participantes */}
      {showParticipantesModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 p-4">
          <Card className="max-h-[80vh] w-full max-w-md overflow-y-auto">
            <CardHeader className="sticky top-0 bg-card">
              <div className="flex items-center justify-between">
                <CardTitle>Agregar participantes</CardTitle>
                <button
                  onClick={() => setShowParticipantesModal(false)}
                  className="p-1 hover:bg-muted rounded-lg"
                >
                  <X className="size-4" />
                </button>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              {miembros.map((m) => (
                <button
                  key={m.id}
                  onClick={() => {
                    handleAddParticipante(m.id)
                  }}
                  className="flex items-center justify-between rounded-lg border border-border p-3 hover:bg-muted transition-colors text-left"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Avatar name={m.nombre} className="size-8" />
                    <div className="min-w-0">
                      <p className="font-medium text-foreground text-sm truncate">{m.nombre}</p>
                      <p className="text-xs text-muted-foreground truncate">{m.email}</p>
                    </div>
                  </div>
                  {participantesSeleccionados.includes(m.id) && <Badge>Seleccionado</Badge>}
                </button>
              ))}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
