import { eventos } from '@/lib/data'
import { EventoDetailContent } from '@/components/eventos/evento-detail-content'

interface EventDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const { id } = await params
  const evento = eventos.find(e => e.id === id)

  if (!evento) {
    return (
      <div className="flex flex-col gap-6">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold">Evento no encontrado</h1>
          <p className="text-muted-foreground mt-2">El evento que buscas no existe.</p>
        </div>
      </div>
    )
  }

  return <EventoDetailContent evento={evento} />
}
