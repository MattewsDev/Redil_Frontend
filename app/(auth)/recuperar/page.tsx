'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowLeft, MailCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function RecuperarPage() {
  const [sent, setSent] = useState(false)

  if (sent) {
    return (
      <div className="text-center">
        <span className="mx-auto mb-5 flex size-12 items-center justify-center rounded-full bg-success/12 text-success">
          <MailCheck className="size-6" />
        </span>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Revisa tu correo</h1>
        <p className="mt-2 text-sm text-muted-foreground text-pretty">
          Enviamos un enlace para restablecer tu contraseña. El enlace expira en 60 minutos.
        </p>
        <Button
          variant="outline"
          className="mt-6 h-11 w-full"
          render={<Link href="/nueva-clave" />}
        >
          Continuar
        </Button>
        <Link
          href="/login"
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" /> Volver al inicio de sesión
        </Link>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-7">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Recuperar contraseña
        </h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Ingresa tu correo y te enviaremos un enlace de recuperación.
        </p>
      </div>

      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault()
          setSent(true)
        }}
      >
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email">Correo electrónico</Label>
          <Input id="email" type="email" placeholder="tu@iglesia.com" required />
        </div>
        <Button type="submit" size="lg" className="h-11 w-full text-sm">
          Enviar enlace
        </Button>
      </form>

      <Link
        href="/login"
        className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" /> Volver al inicio de sesión
      </Link>
    </div>
  )
}
