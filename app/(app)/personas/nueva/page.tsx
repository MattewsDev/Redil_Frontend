import Link from 'next/link'
import { ArrowLeft, Upload } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function NuevaPersonaPage() {
  return (
    <div>
      <PageHeader title="Crear persona" description="Registra un nuevo miembro o visitante.">
        <Button variant="ghost" size="sm" render={<Link href="/personas" />}>
          <ArrowLeft className="size-4" /> Volver
        </Button>
      </PageHeader>

      <form action="/personas" className="mx-auto grid max-w-3xl grid-cols-1 gap-4 p-4 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle>Información personal</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <span className="flex size-16 shrink-0 items-center justify-center rounded-full border border-dashed border-border bg-muted text-muted-foreground">
                <Upload className="size-5" />
              </span>
              <Button type="button" variant="outline" size="sm">
                Subir foto
              </Button>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Nombres" placeholder="María" />
              <Field label="Apellidos" placeholder="González" />
              <Field label="Documento" placeholder="1.024.556.778" />
              <div className="flex flex-col gap-1.5">
                <Label>Tipo</Label>
                <Select options={['Miembro', 'Visitante', 'Líder']} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contacto</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Teléfono" placeholder="+57 311 245 6677" />
            <Field label="Email" type="email" placeholder="maria@email.com" />
            <Field label="Ciudad" placeholder="Bogotá" />
            <Field label="Dirección" placeholder="Calle 00 # 00-00" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ministerio y estado</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label>Ministerio</Label>
              <Select options={['Sin asignar', 'Alabanza', 'Jóvenes', 'Niños', 'Damas']} />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>Estado</Label>
              <Select options={['Activo', 'Nuevo', 'Inactivo']} />
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center justify-end gap-2">
          <Button type="button" variant="outline" render={<Link href="/personas" />}>
            Cancelar
          </Button>
          <Button type="submit">Guardar persona</Button>
        </div>
      </form>
    </div>
  )
}

function Field({
  label,
  placeholder,
  type = 'text',
}: {
  label: string
  placeholder?: string
  type?: string
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label>{label}</Label>
      <Input type={type} placeholder={placeholder} />
    </div>
  )
}

function Select({ options }: { options: string[] }) {
  return (
    <select className="h-10 rounded-lg border border-input bg-card px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/25">
      {options.map((o) => (
        <option key={o}>{o}</option>
      ))}
    </select>
  )
}
