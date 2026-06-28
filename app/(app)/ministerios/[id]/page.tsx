'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
  ArrowLeft,
  Users,
  Plus,
  Search,
  Trash2,
  Edit2,
  Calendar,
  Phone,
  Mail,
  MapPin,
} from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ministerios, personas } from '@/lib/data'

interface MinisterioDetailPageProps {
  params: Promise<{ id: string }>
}

export default function MinisterioDetailPage({ params }: MinisterioDetailPageProps) {
  const unwrappedParams = params instanceof Promise ? null : params
  const [searchQuery, setSearchQuery] = useState('')
  
  // For now, we'll use hardcoded id from URL
  // In a real app, this would be properly awaited
  const ministerio = ministerios[0]

  // Get ministers and participants
  const lideres = personas.filter((p) => p.tipo === 'Líder' && p.ministerio === ministerio.nombre)
  const participantes = personas.filter((p) => p.ministerio === ministerio.nombre && p.tipo !== 'Líder')

  const filtered = participantes.filter((p) => {
    return (
      !searchQuery ||
      p.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.email.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })

  return (
    <div>
      <PageHeader
        title={ministerio.nombre}
        description={`${ministerio.descripcion} · ${ministerio.estado}`}
      >
        <Button variant="ghost" size="sm" render={<Link href="/ministerios" />}>
          <ArrowLeft className="size-4" /> Volver
        </Button>
        <Button variant="outline" size="sm" render={<Link href={`/ministerios/${ministerio.id}/editar`} />}>
          <Edit2 className="size-4" /> Editar
        </Button>
      </PageHeader>

      <div className="grid gap-6 p-4 md:p-6 lg:grid-cols-3">
        {/* Main content */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Líderes section */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Users className="size-5" /> Líderes ({lideres.length})
                </CardTitle>
                <Button size="sm" variant="outline">
                  <Plus className="size-4" /> Agregar
                </Button>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              {lideres.length > 0 ? (
                lideres.map((l) => (
                  <div key={l.id} className="flex items-center justify-between rounded-lg border border-border p-3">
                    <div className="flex items-center gap-3">
                      <Avatar name={l.nombre} />
                      <div>
                        <p className="font-medium text-foreground">{l.nombre}</p>
                        <p className="text-xs text-muted-foreground">{l.email}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon-sm" className="text-destructive hover:bg-destructive/10">
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                ))
              ) : (
                <p className="py-6 text-center text-sm text-muted-foreground">Sin líderes asignados</p>
              )}
            </CardContent>
          </Card>

          {/* Participantes section */}
          <Card>
            <CardHeader>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Users className="size-5" /> Participantes ({filtered.length})
                </CardTitle>
                <Button size="sm" variant="outline">
                  <Plus className="size-4" /> Agregar
                </Button>
              </div>
              <div className="mt-3 relative">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar participantes…"
                  className="h-10 w-full rounded-lg border border-input bg-card pl-9 pr-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/25"
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {filtered.length > 0 ? (
                <div className="divide-y divide-border">
                  {filtered.map((p) => (
                    <div key={p.id} className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-3 min-w-0">
                        <Avatar name={p.nombre} className="size-8" />
                        <div className="min-w-0">
                          <p className="font-medium text-foreground truncate">{p.nombre}</p>
                          <p className="text-xs text-muted-foreground truncate">{p.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-3">
                        <Badge variant="secondary">{p.estado}</Badge>
                        <Button variant="ghost" size="icon-sm" className="text-destructive hover:bg-destructive/10">
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center text-sm text-muted-foreground">
                  {searchQuery ? 'No hay resultados' : 'Sin participantes'}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-4">
          {/* Info card */}
          <Card>
            <CardHeader>
              <CardTitle>Información</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Descripción</p>
                <p className="text-sm text-foreground">{ministerio.descripcion}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Estado</p>
                <Badge variant={ministerio.estado === 'Activo' ? 'success' : 'muted'}>
                  {ministerio.estado}
                </Badge>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Total de integrantes</p>
                <p className="text-2xl font-bold text-foreground">{ministerio.participantes}</p>
              </div>
              <div className="pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground mb-2">Líder principal</p>
                <div className="flex items-center gap-3">
                  <Avatar name={ministerio.lider} className="size-10" />
                  <div>
                    <p className="font-medium text-foreground text-sm">{ministerio.lider}</p>
                    <p className="text-xs text-muted-foreground">Coordinador</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Estadísticas</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <div className="flex items-center justify-between rounded-lg border border-border p-3">
                <span className="text-sm text-muted-foreground">Líderes</span>
                <span className="text-lg font-bold text-primary">{lideres.length}</span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border p-3">
                <span className="text-sm text-muted-foreground">Participantes</span>
                <span className="text-lg font-bold text-primary">{participantes.length}</span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border p-3">
                <span className="text-sm text-muted-foreground">Ocupación</span>
                <span className="text-lg font-bold text-primary">100%</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
