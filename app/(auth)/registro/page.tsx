'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Eye, EyeOff, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'

export default function RegistroPage() {
  const [show, setShow] = useState(false)

  return (
    <div>
      <Badge variant="cream" className="mb-4">
        <Sparkles className="size-3" />
        Comienza tu prueba gratuita
      </Badge>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Crea tu iglesia</h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Registra tu congregación y empieza en minutos.
        </p>
      </div>

      <form className="flex flex-col gap-4" action="/onboarding">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="nombre">Nombre completo</Label>
          <Input id="nombre" placeholder="David Mejía" required />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="iglesia">Nombre de la iglesia</Label>
          <Input id="iglesia" placeholder="Iglesia Central" required />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email">Correo electrónico</Label>
          <Input id="email" type="email" placeholder="tu@iglesia.com" required />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="password">Contraseña</Label>
            <div className="relative">
              <Input
                id="password"
                type={show ? 'text' : 'password'}
                placeholder="••••••••"
                className="pr-9"
                required
              />
              <button
                type="button"
                onClick={() => setShow((s) => !s)}
                aria-label="Mostrar contraseña"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="confirm">Confirmar</Label>
            <Input id="confirm" type={show ? 'text' : 'password'} placeholder="••••••••" required />
          </div>
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
              <option>Perú</option>
              <option>Chile</option>
              <option>España</option>
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="ciudad">Ciudad</Label>
            <Input id="ciudad" placeholder="Bogotá" required />
          </div>
        </div>

        <Button type="submit" size="lg" className="mt-1 h-11 w-full text-sm">
          Crear Iglesia
        </Button>
        <p className="text-center text-xs text-muted-foreground">
          Al continuar aceptas los Términos y la Política de privacidad de REDIL.
        </p>
      </form>

      <p className="mt-5 text-center text-sm text-muted-foreground">
        ¿Ya tienes una cuenta?{' '}
        <Link href="/login" className="font-medium text-primary hover:underline">
          Iniciar sesión
        </Link>
      </p>
    </div>
  )
}
