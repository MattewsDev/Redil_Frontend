'use client'

import { useState } from 'react'
import { Search, Check, X, Plus } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar } from '@/components/ui/avatar'
import { EventoQuickRegistro } from './evento-quick-registro'

interface Participante {
  id: string
  nombre: string
  email: string
  ministerio: string
  documento: string
  asistio: boolean
}

interface EventoAttendanceRegisterProps {
  eventId: string
  eventName: string
  participantes: Participante[]
  onSave?: (attendance: Record<string, boolean>) => void
}

export function EventoAttendanceRegister({
  eventId,
  eventName,
  participantes: initialParticipantes,
  onSave,
}: EventoAttendanceRegisterProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [participantes, setParticipantes] = useState(initialParticipantes)
  const [showQuickRegistro, setShowQuickRegistro] = useState(false)

  const filteredParticipantes = participantes.filter(
    (p) =>
      p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.documento.includes(searchTerm)
  )

  const toggleAsistencia = (id: string) => {
    setParticipantes((prev) =>
      prev.map((p) => (p.id === id ? { ...p, asistio: !p.asistio } : p))
    )
  }

  const estadisticas = {
    registrados: participantes.filter((p) => p.asistio).length,
    total: participantes.length,
    porcentaje: Math.round(
      (participantes.filter((p) => p.asistio).length / participantes.length) * 100
    ),
  }

  const handleSave = () => {
    const attendance = participantes.reduce(
      (acc, p) => {
        acc[p.id] = p.asistio
        return acc
      },
      {} as Record<string, boolean>
    )
    onSave?.(attendance)
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Estadísticas */}
      <div className="grid gap-3 grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">{estadisticas.registrados}</p>
              <p className="text-xs text-muted-foreground mt-1">Registrados</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">{estadisticas.total}</p>
              <p className="text-xs text-muted-foreground mt-1">Total</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-purple-600">{estadisticas.porcentaje}%</p>
              <p className="text-xs text-muted-foreground mt-1">Porcentaje</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Búsqueda */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar por nombre, email o documento..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Lista de participantes */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">
            Participantes ({filteredParticipantes.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="max-h-96 overflow-y-auto flex flex-col gap-2">
          {filteredParticipantes.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-sm text-muted-foreground">
                {searchTerm ? 'No se encontraron participantes' : 'Sin participantes'}
              </p>
            </div>
          ) : (
            filteredParticipantes.map((participante) => (
              <div
                key={participante.id}
                className="flex items-center justify-between gap-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <Avatar name={participante.nombre} className="h-9 w-9" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium truncate">{participante.nombre}</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <Badge variant="secondary" className="text-xs">
                        {participante.ministerio}
                      </Badge>
                      <span className="text-xs text-muted-foreground truncate">
                        {participante.email}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Toggle de asistencia */}
                <button
                  onClick={() => toggleAsistencia(participante.id)}
                  className={`flex-shrink-0 h-10 w-10 rounded-lg flex items-center justify-center transition-all ${
                    participante.asistio
                      ? 'bg-green-100 border-2 border-green-500 text-green-600'
                      : 'bg-muted border-2 border-border text-muted-foreground hover:border-gray-400'
                  }`}
                >
                  {participante.asistio ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <X className="h-5 w-5 opacity-50" />
                  )}
                </button>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* Botones de acción */}
      <div className="flex gap-2">
        <Button onClick={handleSave} className="flex-1">
          Guardar asistencia ({estadisticas.registrados}/{estadisticas.total})
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            setParticipantes(initialParticipantes)
            setSearchTerm('')
          }}
        >
          Limpiar
        </Button>
        <Button
          variant="secondary"
          onClick={() => setShowQuickRegistro(true)}
          className="gap-2"
        >
          <Plus className="h-4 w-4" /> Registro Rápido
        </Button>
      </div>

      {/* Modal de Registro Rápido */}
      {showQuickRegistro && (
        <EventoQuickRegistro
          onClose={() => setShowQuickRegistro(false)}
          onRegister={(data) => {
            const newParticipante: Participante = {
              id: `temp_${Date.now()}`,
              nombre: data.nombre,
              email: data.telefono_email,
              ministerio: 'Visitante',
              documento: '',
              asistio: true,
            }
            setParticipantes((prev) => [newParticipante, ...prev])
            setSearchTerm('')
          }}
        />
      )}
    </div>
  )
}
