'use client'

import { useState } from 'react'
import {
  Save,
  Upload,
  Moon,
  Sun,
  Lock,
  Bell,
  Zap,
  Copy,
  Check,
} from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

export default function ConfiguracionPage() {
  const [tema, setTema] = useState<'claro' | 'oscuro'>('claro')
  const [copiedQR, setCopiedQR] = useState(false)
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)

  const handleCopyQR = () => {
    setCopiedQR(true)
    setTimeout(() => setCopiedQR(false), 2000)
  }

  return (
    <div>
      <PageHeader
        title="Configuración"
        description="Personaliza tu iglesia y administra la seguridad."
      />

      <div className="grid gap-6 p-4 md:p-6 lg:grid-cols-3">
        {/* Main content */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Información de la iglesia */}
          <Card>
            <CardHeader>
              <CardTitle>Información de la iglesia</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div>
                <label className="text-sm font-medium text-foreground">Nombre de la iglesia</label>
                <input
                  type="text"
                  defaultValue="Iglesia Central"
                  className="mt-2 h-10 w-full rounded-lg border border-input bg-card px-3 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/25"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Descripción</label>
                <textarea
                  defaultValue="Centro de fe y comunidad dedicado al crecimiento espiritual."
                  rows={3}
                  className="mt-2 w-full rounded-lg border border-input bg-card px-3 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/25"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground">Teléfono</label>
                  <input
                    type="tel"
                    defaultValue="+57 301 555 0000"
                    className="mt-2 h-10 w-full rounded-lg border border-input bg-card px-3 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/25"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Email</label>
                  <input
                    type="email"
                    defaultValue="contacto@iglesia.local"
                    className="mt-2 h-10 w-full rounded-lg border border-input bg-card px-3 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/25"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground">Ciudad</label>
                  <input
                    type="text"
                    defaultValue="Bogotá"
                    className="mt-2 h-10 w-full rounded-lg border border-input bg-card px-3 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/25"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">País</label>
                  <input
                    type="text"
                    defaultValue="Colombia"
                    className="mt-2 h-10 w-full rounded-lg border border-input bg-card px-3 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/25"
                  />
                </div>
              </div>
              <Button>
                <Save className="size-4" /> Guardar cambios
              </Button>
            </CardContent>
          </Card>

          {/* Personalización */}
          <Card>
            <CardHeader>
              <CardTitle>Personalización</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-3 block">Tema</label>
                <div className="flex gap-3">
                  <button
                    onClick={() => setTema('claro')}
                    className={cn(
                      'flex items-center gap-2 rounded-lg border px-4 py-2 transition-all',
                      tema === 'claro'
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border hover:border-primary/40'
                    )}
                  >
                    <Sun className="size-4" /> Claro
                  </button>
                  <button
                    onClick={() => setTema('oscuro')}
                    className={cn(
                      'flex items-center gap-2 rounded-lg border px-4 py-2 transition-all',
                      tema === 'oscuro'
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border hover:border-primary/40'
                    )}
                  >
                    <Moon className="size-4" /> Oscuro
                  </button>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-3 block">Color institucional</label>
                <div className="flex items-center gap-3">
                  <div className="flex gap-2">
                    {['#285ccc', '#00c896', '#ffa500', '#ff6b6b', '#9333ea'].map((color) => (
                      <button
                        key={color}
                        className="size-10 rounded-lg border-2 border-border hover:border-primary transition-all"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-3 block">Logo</label>
                <div className="flex items-center gap-3">
                  <div className="size-16 rounded-lg border-2 border-dashed border-border bg-muted/40 flex items-center justify-center">
                    <Upload className="size-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-foreground">Haz clic para cargar un logo</p>
                    <p className="text-xs text-muted-foreground">PNG, JPG (máx. 2MB)</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Configuración de QR */}
          <Card>
            <CardHeader>
              <CardTitle>Configuración de QR</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Prefijo QR</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    defaultValue="REDIL-IGLESIA"
                    className="h-10 flex-1 rounded-lg border border-input bg-card px-3 py-2 text-sm outline-none focus-visible:border-ring"
                  />
                  <Button onClick={handleCopyQR} variant="outline" size="icon">
                    {copiedQR ? (
                      <Check className="size-4" />
                    ) : (
                      <Copy className="size-4" />
                    )}
                  </Button>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Vigencia del QR</label>
                <select className="h-10 w-full rounded-lg border border-input bg-card px-3 py-2 text-sm outline-none focus-visible:border-ring">
                  <option>1 día</option>
                  <option selected>1 semana</option>
                  <option>30 días</option>
                  <option>Nunca expira</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Seguridad */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="size-5" /> Seguridad
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex items-center justify-between rounded-lg border border-border p-4">
                <div>
                  <p className="font-medium text-foreground">Autenticación en dos pasos</p>
                  <p className="text-sm text-muted-foreground">Añade una capa extra de seguridad</p>
                </div>
                <button
                  onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                  className={cn(
                    'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
                    twoFactorEnabled ? 'bg-primary' : 'bg-muted'
                  )}
                >
                  <span
                    className={cn(
                      'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                      twoFactorEnabled ? 'translate-x-6' : 'translate-x-1'
                    )}
                  />
                </button>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border p-4">
                <div>
                  <p className="font-medium text-foreground">Cambiar contraseña</p>
                  <p className="text-sm text-muted-foreground">Actualiza tu contraseña regularmente</p>
                </div>
                <Button variant="outline" size="sm">
                  Cambiar
                </Button>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Sesiones activas</label>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between rounded-lg border border-border p-3">
                    <div>
                      <p className="text-sm font-medium text-foreground">Navegador actual</p>
                      <p className="text-xs text-muted-foreground">Chrome · Bogotá, Colombia</p>
                    </div>
                    <Badge>Activa</Badge>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-border p-3">
                    <div>
                      <p className="text-sm font-medium text-foreground">iPad</p>
                      <p className="text-xs text-muted-foreground">Safari · Hace 2 horas</p>
                    </div>
                    <Button variant="ghost" size="sm" className="text-destructive">
                      Cerrar
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-4">
          {/* Notificaciones */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Bell className="size-5" /> Notificaciones
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              {['Correos automáticos', 'Recordatorios de eventos', 'Invitaciones', 'Reportes'].map(
                (item) => (
                  <label key={item} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="rounded border-border"
                    />
                    <span className="text-sm text-foreground">{item}</span>
                  </label>
                )
              )}
            </CardContent>
          </Card>

          {/* Integraciones */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Zap className="size-5" /> Integraciones
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              {['Google Calendar', 'Zoom', 'WhatsApp', 'SMTP'].map((service) => (
                <button
                  key={service}
                  className="flex items-center justify-between rounded-lg border border-border p-3 hover:bg-muted transition-colors text-left"
                >
                  <span className="text-sm font-medium text-foreground">{service}</span>
                  <Badge variant="muted">Desconectado</Badge>
                </button>
              ))}
            </CardContent>
          </Card>

          {/* Plan */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Plan actual</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2">
                <div className="flex items-baseline gap-2">
                  <p className="text-2xl font-bold text-primary">Church</p>
                  <span className="text-sm text-muted-foreground">$79/mes</span>
                </div>
                <p className="text-sm text-muted-foreground">Renovación el 27 de julio</p>
                <Button size="sm" variant="outline" className="w-full mt-3">
                  Ver todos los planes
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
