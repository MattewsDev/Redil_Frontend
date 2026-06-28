'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Building2,
  Settings2,
  UserPlus,
  PartyPopper,
  Upload,
  Plus,
  Trash2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RedilLogo } from '@/components/brand'
import { cn } from '@/lib/utils'

const steps = [
  { n: 1, label: 'Información', icon: Building2 },
  { n: 2, label: 'Configuración', icon: Settings2 },
  { n: 3, label: 'Invitar', icon: UserPlus },
  { n: 4, label: 'Resumen', icon: PartyPopper },
]

export default function OnboardingPage() {
  const [step, setStep] = useState(1)
  const [invites, setInvites] = useState([
    { email: '', rol: 'Líder' },
  ])

  return (
    <div className="min-h-screen bg-background">
      <header className="flex h-16 items-center justify-between border-b border-border bg-card px-4 md:px-8">
        <RedilLogo />
        <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground">
          Salir
        </Link>
      </header>

      <div className="mx-auto w-full max-w-2xl px-4 py-8 md:py-12">
        {/* Stepper */}
        <ol className="mb-10 flex items-center justify-between">
          {steps.map((s, i) => {
            const done = step > s.n
            const active = step === s.n
            const Icon = s.icon
            return (
              <li key={s.n} className="flex flex-1 items-center last:flex-none">
                <div className="flex flex-col items-center gap-2">
                  <span
                    className={cn(
                      'flex size-10 items-center justify-center rounded-full border text-sm font-semibold transition-colors',
                      done && 'border-primary bg-primary text-primary-foreground',
                      active && 'border-primary bg-primary/10 text-primary',
                      !done && !active && 'border-border bg-card text-muted-foreground',
                    )}
                  >
                    {done ? <Check className="size-5" /> : <Icon className="size-5" />}
                  </span>
                  <span
                    className={cn(
                      'hidden text-xs font-medium sm:block',
                      active || done ? 'text-foreground' : 'text-muted-foreground',
                    )}
                  >
                    {s.label}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div
                    className={cn(
                      'mx-2 h-0.5 flex-1 rounded-full',
                      step > s.n ? 'bg-primary' : 'bg-border',
                    )}
                  />
                )}
              </li>
            )
          })}
        </ol>

        <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
          {step === 1 && (
            <div>
              <h2 className="text-xl font-bold tracking-tight text-foreground">
                Información de la iglesia
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Cuéntanos sobre tu congregación.
              </p>
              <div className="mt-6 flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <span className="flex size-16 shrink-0 items-center justify-center rounded-xl border border-dashed border-border bg-muted text-muted-foreground">
                    <Upload className="size-5" />
                  </span>
                  <div>
                    <Label>Logo de la iglesia</Label>
                    <p className="text-xs text-muted-foreground">PNG o JPG, máximo 2MB.</p>
                    <Button variant="outline" size="sm" className="mt-2">
                      Subir logo
                    </Button>
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="nombre">Nombre de la iglesia</Label>
                  <Input id="nombre" defaultValue="Iglesia Central" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="pais">País</Label>
                    <select
                      id="pais"
                      className="h-10 rounded-lg border border-input bg-card px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/25"
                    >
                      <option>Colombia</option>
                      <option>México</option>
                      <option>Argentina</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="ciudad">Ciudad</Label>
                    <Input id="ciudad" defaultValue="Bogotá" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-xl font-bold tracking-tight text-foreground">
                Configuración inicial
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Esto nos ayuda a personalizar tu experiencia.
              </p>
              <div className="mt-6 flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <Label>Cantidad aproximada de miembros</Label>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {['1–100', '100–500', '500–1.500', '1.500+'].map((r, idx) => (
                      <label
                        key={r}
                        className={cn(
                          'cursor-pointer rounded-lg border px-3 py-2.5 text-center text-sm font-medium',
                          idx === 2
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-border text-muted-foreground hover:border-primary/40',
                        )}
                      >
                        <input type="radio" name="size" className="sr-only" defaultChecked={idx === 2} />
                        {r}
                      </label>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Tipo de organización</Label>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                    {['Iglesia local', 'Red de iglesias', 'Multisede'].map((t, idx) => (
                      <label
                        key={t}
                        className={cn(
                          'cursor-pointer rounded-lg border px-3 py-2.5 text-center text-sm font-medium',
                          idx === 0
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-border text-muted-foreground hover:border-primary/40',
                        )}
                      >
                        <input type="radio" name="org" className="sr-only" defaultChecked={idx === 0} />
                        {t}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-xl font-bold tracking-tight text-foreground">Invitar usuarios</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Suma a tu equipo de liderazgo. Puedes hacerlo más tarde.
              </p>
              <div className="mt-6 flex flex-col gap-3">
                {invites.map((inv, i) => (
                  <div key={i} className="flex items-end gap-2">
                    <div className="flex flex-1 flex-col gap-1.5">
                      {i === 0 && <Label>Correo electrónico</Label>}
                      <Input
                        type="email"
                        placeholder="persona@iglesia.com"
                        value={inv.email}
                        onChange={(e) => {
                          const next = [...invites]
                          next[i].email = e.target.value
                          setInvites(next)
                        }}
                      />
                    </div>
                    <div className="flex w-36 flex-col gap-1.5">
                      {i === 0 && <Label>Rol</Label>}
                      <select className="h-10 rounded-lg border border-input bg-card px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/25">
                        <option>Pastor</option>
                        <option>Líder</option>
                        <option>Registrador</option>
                        <option>Scanner</option>
                      </select>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="mb-px"
                      onClick={() => setInvites(invites.filter((_, idx) => idx !== i))}
                      aria-label="Quitar invitación"
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  className="self-start"
                  onClick={() => setInvites([...invites, { email: '', rol: 'Líder' }])}
                >
                  <Plus className="size-4" /> Añadir otro
                </Button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="text-center">
              <span className="mx-auto mb-5 flex size-14 items-center justify-center rounded-full bg-success/12 text-success">
                <PartyPopper className="size-7" />
              </span>
              <h2 className="text-xl font-bold tracking-tight text-foreground">¡Todo listo!</h2>
              <p className="mt-1 text-sm text-muted-foreground text-pretty">
                Tu iglesia ha sido configurada. Revisa el resumen y comienza a usar REDIL.
              </p>
              <div className="mt-6 flex flex-col gap-2 rounded-xl border border-border bg-muted/40 p-4 text-left text-sm">
                {[
                  ['Iglesia', 'Iglesia Central · Bogotá, Colombia'],
                  ['Tamaño', '500–1.500 miembros'],
                  ['Tipo', 'Iglesia local'],
                  ['Invitaciones', `${invites.length} usuario(s)`],
                  ['Plan', 'Church · Prueba de 14 días'],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4">
                    <span className="text-muted-foreground">{k}</span>
                    <span className="font-medium text-foreground">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => setStep((s) => Math.max(1, s - 1))}
              className={cn(step === 1 && 'invisible')}
            >
              <ArrowLeft className="size-4" /> Atrás
            </Button>
            {step < 4 ? (
              <Button onClick={() => setStep((s) => Math.min(4, s + 1))}>
                Continuar <ArrowRight className="size-4" />
              </Button>
            ) : (
              <Button render={<Link href="/dashboard" />}>
                Ir al dashboard <ArrowRight className="size-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
