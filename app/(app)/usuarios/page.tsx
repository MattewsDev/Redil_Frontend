'use client'

import { useState } from 'react'
import { Plus, Search, MoreHorizontal, Edit2, Shield, LogOut, Trash2 } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PermisosManager } from '@/components/usuarios/permisos-manager'
import { usuarios, roles } from '@/lib/data'
import { cn } from '@/lib/utils'

const estadoColor = {
  Activo: 'success',
  Invitado: 'cream',
  Suspendido: 'muted',
} as const

export default function UsuariosPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterRol, setFilterRol] = useState<string | null>(null)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [showPermisos, setShowPermisos] = useState(false)

  const filtered = usuarios.filter((u) => {
    const matchSearch =
      !searchQuery ||
      u.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchRol = !filterRol || u.rol === filterRol
    return matchSearch && matchRol
  })

  return (
    <div>
      <PageHeader
        title="Usuarios y Roles"
        description="Gestiona los usuarios de tu iglesia y sus permisos."
      >
        <Button size="sm">
          <Plus className="size-4" /> Invitar usuario
        </Button>
      </PageHeader>

      <div className="grid gap-6 p-4 md:p-6 lg:grid-cols-4">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 lg:col-span-4 sm:grid-cols-4">
          {[
            ['Total usuarios', usuarios.length],
            ['Activos', usuarios.filter((u) => u.estado === 'Activo').length],
            ['Invitados', usuarios.filter((u) => u.estado === 'Invitado').length],
            ['Suspendidos', usuarios.filter((u) => u.estado === 'Suspendido').length],
          ].map(([label, value]) => (
            <div key={label} className="rounded-xl border border-border bg-card p-4">
              <p className="text-xs text-muted-foreground">{label}</p>
              <p className="mt-1 text-xl font-bold text-foreground">{value}</p>
            </div>
          ))}
        </div>

        {/* Main content - Usuarios */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <CardTitle>Usuarios ({filtered.length})</CardTitle>
                <div className="relative max-w-xs flex-1 sm:flex-none">
                  <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar usuario…"
                    className="h-10 w-full rounded-lg border border-input bg-card pl-9 pr-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/25"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/40 text-left text-xs uppercase tracking-wide text-muted-foreground">
                      <th className="px-6 py-3 font-medium">Usuario</th>
                      <th className="px-6 py-3 font-medium">Rol</th>
                      <th className="px-6 py-3 font-medium">Estado</th>
                      <th className="px-6 py-3 font-medium">Último acceso</th>
                      <th className="px-6 py-3 font-medium text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((u) => (
                      <tr key={u.id} className="border-b border-border last:border-0 hover:bg-muted/40 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <Avatar name={u.nombre} className="size-8" />
                            <div>
                              <p className="font-medium text-foreground">{u.nombre}</p>
                              <p className="text-xs text-muted-foreground">{u.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <Badge variant="secondary">{u.rol}</Badge>
                        </td>
                        <td className="px-6 py-4">
                          <Badge variant={estadoColor[u.estado]}>{u.estado}</Badge>
                        </td>
                        <td className="px-6 py-4 text-muted-foreground">{u.ultimoAcceso}</td>
                        <td className="px-6 py-4 text-right">
                          <div className="relative inline-block">
                            <button
                              onClick={() => setActiveMenu(activeMenu === u.id ? null : u.id)}
                              className="p-1 hover:bg-muted rounded-lg"
                            >
                              <MoreHorizontal className="size-4" />
                            </button>
                            {activeMenu === u.id && (
                              <div className="absolute right-0 top-8 z-50 min-w-40 rounded-lg border border-border bg-card shadow-lg">
                                <button className="flex w-full items-center gap-2 px-4 py-2 text-sm hover:bg-muted text-foreground">
                                  <Edit2 className="size-4" /> Editar
                                </button>
                                <button className="flex w-full items-center gap-2 px-4 py-2 text-sm hover:bg-muted text-foreground">
                                  <Shield className="size-4" /> Cambiar rol
                                </button>
                                <button className="flex w-full items-center gap-2 px-4 py-2 text-sm hover:bg-muted text-foreground">
                                  <LogOut className="size-4" /> Cerrar sesión
                                </button>
                                <button className="flex w-full items-center gap-2 px-4 py-2 text-sm hover:bg-muted text-destructive">
                                  <Trash2 className="size-4" /> Eliminar
                                </button>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - Roles */}
        <div className="lg:col-span-1 flex flex-col gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Roles ({roles.length})</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              {roles.map((r) => (
                <button
                  key={r.nombre}
                  onClick={() => setFilterRol(filterRol === r.nombre ? null : r.nombre)}
                  className={cn(
                    'flex flex-col gap-1 rounded-lg border px-3 py-2 text-left transition-colors',
                    filterRol === r.nombre
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:bg-muted'
                  )}
                >
                  <p className="text-sm font-medium text-foreground">{r.nombre}</p>
                  <p className="text-xs text-muted-foreground line-clamp-1">{r.usuarios} usuarios</p>
                </button>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Permisos</CardTitle>
            </CardHeader>
            <CardContent>
              <Button variant="outline" size="sm" className="w-full" onClick={() => setShowPermisos(true)}>
                Gestionar permisos
              </Button>
            </CardContent>
          </Card>

          {showPermisos && <PermisosManager onClose={() => setShowPermisos(false)} />}
        </div>
      </div>
    </div>
  )
}
