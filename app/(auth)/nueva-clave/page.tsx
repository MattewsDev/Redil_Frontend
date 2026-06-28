'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function NuevaClavePage() {
  const [show, setShow] = useState(false)

  return (
    <div>
      <div className="mb-7">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Nueva contraseña</h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Crea una contraseña segura para tu cuenta.
        </p>
      </div>

      <form className="flex flex-col gap-4" action="/login">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="password">Nueva contraseña</Label>
          <div className="relative">
            <Input
              id="password"
              type={show ? 'text' : 'password'}
              placeholder="••••••••"
              className="pr-10"
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
          <Label htmlFor="confirm">Confirmar contraseña</Label>
          <Input id="confirm" type={show ? 'text' : 'password'} placeholder="••••••••" required />
        </div>
        <Button type="submit" size="lg" className="mt-1 h-11 w-full text-sm">
          Guardar contraseña
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        <Link href="/login" className="font-medium text-primary hover:underline">
          Volver al inicio de sesión
        </Link>
      </p>
    </div>
  )
}
