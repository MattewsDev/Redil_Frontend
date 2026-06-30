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
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Crea tu cuenta</h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Regístrate y empieza en minutos.
        </p>
      </div>

      <form className="flex flex-col gap-4" action="/onboarding">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="nombres">Nombres</Label>
          <Input id="nombres" placeholder="Juan Carlos" required />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="apellidos">Apellidos</Label>
          <Input id="apellidos" placeholder="Gómez Mendoza" required />
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

        <Button type="submit" size="lg" className="mt-1 h-11 w-full text-sm">
          Comenzar ahora
        </Button>
        <p className="text-xs text-muted-foreground">
          Al continuar, aceptas los Términos de Servicio y la Política de Privacidad de REDIL.
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
