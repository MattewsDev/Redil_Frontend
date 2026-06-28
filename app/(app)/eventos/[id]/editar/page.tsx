import { eventos } from '@/lib/data'
import { EventoEditContent } from '@/components/eventos/evento-edit-content'

interface EditEventoPageProps {
  params: Promise<{ id: string }>
}

export default async function EditEventoPage({ params }: EditEventoPageProps) {
  const { id } = await params
  const evento = eventos.find(e => e.id === id)

  if (!evento) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg text-muted-foreground">Evento no encontrado</p>
      </div>
    )
  }

  return <EventoEditContent evento={evento} />
}
