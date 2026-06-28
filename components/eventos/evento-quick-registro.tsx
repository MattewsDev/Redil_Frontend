'use client'

import { useState } from 'react'
import { X, User, Phone, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface QuickRegistroProps {
  onClose: () => void
  onRegister: (data: { nombre: string; telefono_email: string }) => void
}

export function EventoQuickRegistro({ onClose, onRegister }: QuickRegistroProps) {
  const [nombre, setNombre] = useState('')
  const [telefonoEmail, setTelefonoEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!nombre.trim() || !telefonoEmail.trim()) {
      return
    }

    setIsSubmitting(true)
    
    // Simular registro
    setTimeout(() => {
      onRegister({ nombre: nombre.trim(), telefono_email: telefonoEmail.trim() })
      setSuccess(true)
      
      setTimeout(() => {
        setNombre('')
        setTelefonoEmail('')
        setSuccess(false)
        onClose()
      }, 1500)
      
      setIsSubmitting(false)
    }, 800)
  }

  if (success) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-foreground/40" />
        <div className="relative rounded-2xl bg-card p-8 text-center shadow-xl">
          <div className="flex size-16 items-center justify-center rounded-full bg-emerald-500/20 mx-auto mb-4">
            <span className="text-3xl">✓</span>
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-1">{nombre}</h3>
          <p className="text-sm text-muted-foreground">Ha sido registrado exitosamente</p>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-foreground/40" onClick={onClose} />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="relative w-full max-w-md rounded-2xl bg-card shadow-xl">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border px-6 py-4">
            <div>
              <h2 className="text-lg font-semibold text-foreground">Registro Rápido</h2>
              <p className="text-xs text-muted-foreground mt-0.5">Crea un perfil básico e ingresa al evento</p>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} aria-label="Cerrar">
              <X className="size-5" />
            </Button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6">
            <div className="mb-4">
              <label htmlFor="nombre" className="block text-sm font-medium text-foreground mb-2">
                Nombre Completo
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  id="nombre"
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Ej. Juan Pérez"
                  className="w-full rounded-lg border border-border bg-background pl-9 pr-3 py-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/25"
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="telefono" className="block text-sm font-medium text-foreground mb-2">
                Teléfono o Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  id="telefono"
                  type="text"
                  value={telefonoEmail}
                  onChange={(e) => setTelefonoEmail(e.target.value)}
                  placeholder="Ej. +54 11 1234 5678 o correo@ejemplo.com"
                  className="w-full rounded-lg border border-border bg-background pl-9 pr-3 py-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/25"
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting || !nombre.trim() || !telefonoEmail.trim()}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {isSubmitting ? 'Registrando...' : 'Registrar e Ingresar'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
