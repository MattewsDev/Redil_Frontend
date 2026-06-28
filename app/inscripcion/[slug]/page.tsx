"use client"

import type React from "react"

import { useState } from "react"
import { RedilMark } from "@/components/brand"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Clock, Ticket, Check, Users } from "lucide-react"

export default function PublicRegistrationPage() {
  const [submitted, setSubmitted] = useState(false)
  const [quantity, setQuantity] = useState(1)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <main className="min-h-dvh bg-muted">
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
          <RedilMark />
          <span className="text-sm text-muted-foreground">Inscripción de evento</span>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-4 py-8">
        {/* Hero */}
        <div className="overflow-hidden rounded-2xl border border-border bg-background">
          <div className="relative h-48 bg-primary md:h-60">
            <img
              src="/conference-worship-stage-with-warm-lights.png"
              alt="Conferencia de Avivamiento 2026"
              className="h-full w-full object-cover opacity-90"
            />
            <Badge className="absolute left-4 top-4 bg-secondary text-secondary-foreground">Inscripciones abiertas</Badge>
          </div>
          <div className="p-6 md:p-8">
            <h1 className="text-balance text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              Conferencia de Avivamiento 2026
            </h1>
            <p className="mt-2 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
              Tres días de adoración, enseñanza y comunión. Únete a más de 800 personas para un tiempo de renovación
              espiritual con invitados especiales y talleres ministeriales.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <InfoItem icon={Calendar} label="Fecha" value="14-16 Mar, 2026" />
              <InfoItem icon={Clock} label="Hora" value="6:00 PM" />
              <InfoItem icon={MapPin} label="Lugar" value="Templo Central" />
            </div>
          </div>
        </div>

        {/* Form / Confirmation */}
        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
          <Card>
            <CardContent className="p-6">
              {submitted ? (
                <div className="flex flex-col items-center py-8 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Check className="h-7 w-7" />
                  </div>
                  <h2 className="mt-4 text-xl font-semibold text-foreground">¡Inscripción confirmada!</h2>
                  <p className="mt-2 max-w-sm text-pretty leading-relaxed text-muted-foreground">
                    Hemos enviado tus boletos con código QR a tu correo. Preséntalos en la entrada para registrar tu
                    asistencia.
                  </p>
                  <div className="mt-6 flex items-center gap-2 rounded-xl border border-border bg-muted px-4 py-3">
                    <Ticket className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium text-foreground">
                      {quantity} {quantity === 1 ? "boleto" : "boletos"} reservados
                    </span>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <h2 className="text-lg font-semibold text-foreground">Tus datos</h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="nombre">Nombre</Label>
                      <Input id="nombre" placeholder="María" required />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="apellido">Apellido</Label>
                      <Input id="apellido" placeholder="González" required />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="email">Correo electrónico</Label>
                    <Input id="email" type="email" placeholder="maria@ejemplo.com" required />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="tel">Teléfono</Label>
                    <Input id="tel" type="tel" placeholder="+1 555 123 4567" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="cantidad">Cantidad de boletos</Label>
                    <div className="flex items-center gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      >
                        −
                      </Button>
                      <span className="w-10 text-center text-lg font-semibold text-foreground">{quantity}</span>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                  <Button type="submit" size="lg" className="mt-2">
                    Confirmar inscripción
                  </Button>
                  <p className="text-center text-xs text-muted-foreground">
                    Al inscribirte aceptas recibir comunicaciones sobre este evento.
                  </p>
                </form>
              )}
            </CardContent>
          </Card>

          <div className="flex flex-col gap-4">
            <Card>
              <CardContent className="p-5">
                <h3 className="text-sm font-semibold text-foreground">Resumen</h3>
                <div className="mt-4 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Entrada general</span>
                  <span className="font-medium text-foreground">Gratis</span>
                </div>
                <div className="mt-2 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Cantidad</span>
                  <span className="font-medium text-foreground">{quantity}</span>
                </div>
                <div className="my-4 h-px bg-border" />
                <div className="flex items-center justify-between">
                  <span className="font-medium text-foreground">Total</span>
                  <span className="text-lg font-bold text-foreground">$0.00</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center gap-3 p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/60 text-foreground">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">812 inscritos</p>
                  <p className="text-xs text-muted-foreground">188 cupos disponibles</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}

function InfoItem({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType
  label: string
  value: string
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-muted px-3 py-2.5">
      <Icon className="h-5 w-5 shrink-0 text-primary" />
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-medium text-foreground">{value}</p>
      </div>
    </div>
  )
}
