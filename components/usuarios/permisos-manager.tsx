'use client'

import { useState } from 'react'
import { X, Lock, Users, FileText, BarChart3, Settings, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface Permiso {
  id: string
  nombre: string
  descripcion: string
  icono: React.ElementType
}

interface RolPermiso {
  rol: string
  permisos: string[]
}

const permisos: Permiso[] = [
  {
    id: 'ver_personas',
    nombre: 'Ver personas',
    descripcion: 'Acceso a listado de personas',
    icono: Users,
  },
  {
    id: 'crear_personas',
    nombre: 'Crear personas',
    descripcion: 'Registrar nuevas personas',
    icono: Users,
  },
  {
    id: 'editar_personas',
    nombre: 'Editar personas',
    descripcion: 'Modificar información de personas',
    icono: Users,
  },
  {
    id: 'ver_eventos',
    nombre: 'Ver eventos',
    descripcion: 'Acceso a listado de eventos',
    icono: FileText,
  },
  {
    id: 'crear_eventos',
    nombre: 'Crear eventos',
    descripcion: 'Registrar nuevos eventos',
    icono: FileText,
  },
  {
    id: 'editar_eventos',
    nombre: 'Editar eventos',
    descripcion: 'Modificar eventos',
    icono: FileText,
  },
  {
    id: 'ver_reportes',
    nombre: 'Ver reportes',
    descripcion: 'Acceso a reportes y analítica',
    icono: BarChart3,
  },
  {
    id: 'configuracion',
    nombre: 'Configuración',
    descripcion: 'Acceso a configuración general',
    icono: Settings,
  },
  {
    id: 'gestionar_usuarios',
    nombre: 'Gestionar usuarios',
    descripcion: 'Crear, editar y eliminar usuarios',
    icono: Shield,
  },
]

const rolesDefault: RolPermiso[] = [
  {
    rol: 'Administrador',
    permisos: [
      'ver_personas',
      'crear_personas',
      'editar_personas',
      'ver_eventos',
      'crear_eventos',
      'editar_eventos',
      'ver_reportes',
      'configuracion',
      'gestionar_usuarios',
    ],
  },
  {
    rol: 'Líder',
    permisos: [
      'ver_personas',
      'crear_personas',
      'editar_personas',
      'ver_eventos',
      'crear_eventos',
      'editar_eventos',
    ],
  },
  {
    rol: 'Voluntario',
    permisos: ['ver_personas', 'ver_eventos'],
  },
  {
    rol: 'Visitante',
    permisos: [],
  },
]

export function PermisosManager({ onClose }: { onClose: () => void }) {
  const [roles, setRoles] = useState<RolPermiso[]>(rolesDefault)
  const [selectedRol, setSelectedRol] = useState(rolesDefault[0].rol)

  const currentRol = roles.find((r) => r.rol === selectedRol)

  const togglePermiso = (permisoId: string) => {
    setRoles((prevRoles) =>
      prevRoles.map((r) => {
        if (r.rol === selectedRol) {
          const newPermisos = r.permisos.includes(permisoId)
            ? r.permisos.filter((p) => p !== permisoId)
            : [...r.permisos, permisoId]
          return { ...r, permisos: newPermisos }
        }
        return r
      })
    )
  }

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-foreground/40" onClick={onClose} />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-2xl bg-card shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border px-6 py-4">
            <div>
              <h2 className="text-lg font-semibold text-foreground">Gestionar permisos</h2>
              <p className="text-sm text-muted-foreground">Configura los permisos por rol</p>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} aria-label="Cerrar">
              <X className="size-5" />
            </Button>
          </div>

          {/* Content */}
          <div className="overflow-y-auto flex h-[calc(90vh-120px)]">
            {/* Roles Sidebar */}
            <div className="w-40 border-r border-border bg-muted/30 p-4">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Roles
              </p>
              <div className="flex flex-col gap-2">
                {roles.map((r) => (
                  <button
                    key={r.rol}
                    onClick={() => setSelectedRol(r.rol)}
                    className={`rounded-lg px-3 py-2 text-sm font-medium text-left transition-colors ${
                      selectedRol === r.rol
                        ? 'bg-primary text-primary-foreground'
                        : 'text-foreground hover:bg-muted'
                    }`}
                  >
                    {r.rol}
                  </button>
                ))}
              </div>
            </div>

            {/* Permisos Grid */}
            <div className="flex-1 p-6">
              <h3 className="mb-4 text-sm font-semibold text-foreground">
                Permisos para {selectedRol}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {permisos.map((p) => {
                  const Icon = p.icono
                  const tienePermiso = currentRol?.permisos.includes(p.id) || false
                  return (
                    <button
                      key={p.id}
                      onClick={() => togglePermiso(p.id)}
                      className={`flex gap-3 rounded-lg border-2 p-4 text-left transition-all ${
                        tienePermiso
                          ? 'border-primary bg-primary/10'
                          : 'border-border hover:border-border/80 hover:bg-muted/50'
                      }`}
                    >
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-background">
                        <Icon className={`size-5 ${tienePermiso ? 'text-primary' : 'text-muted-foreground'}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-foreground">{p.nombre}</p>
                          {tienePermiso && <Badge variant="success" className="text-xs">Activo</Badge>}
                        </div>
                        <p className="text-xs text-muted-foreground">{p.descripcion}</p>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex gap-2 border-t border-border bg-muted/30 p-4">
            <Button variant="outline" className="flex-1" onClick={onClose}>
              Cerrar
            </Button>
            <Button className="flex-1" onClick={onClose}>
              Guardar cambios
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
