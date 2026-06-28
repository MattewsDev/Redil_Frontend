import { Plus, Users, MoreHorizontal } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { ministerios } from '@/lib/data'

export default function MinisteriosPage() {
  return (
    <div>
      <PageHeader
        title="Ministerios"
        description="Organiza los equipos y áreas de servicio de tu iglesia."
      >
        <Button size="sm">
          <Plus className="size-4" /> Nuevo ministerio
        </Button>
      </PageHeader>

      <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:p-6 xl:grid-cols-3">
        {ministerios.map((m) => (
          <Card key={m.id} className="transition-colors hover:border-primary/40">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Users className="size-5" />
                </span>
                <Button variant="ghost" size="icon-sm" aria-label="Opciones">
                  <MoreHorizontal className="size-4" />
                </Button>
              </div>
              <h3 className="mt-4 font-semibold text-foreground">{m.nombre}</h3>
              <p className="mt-1 text-sm text-muted-foreground text-pretty">{m.descripcion}</p>

              <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                <div className="flex items-center gap-2">
                  <Avatar name={m.lider} className="size-7" />
                  <div className="leading-tight">
                    <p className="text-xs text-muted-foreground">Líder</p>
                    <p className="text-sm font-medium text-foreground">{m.lider}</p>
                  </div>
                </div>
                <Badge variant={m.estado === 'Activo' ? 'success' : 'muted'}>{m.estado}</Badge>
              </div>

              <div className="mt-3 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Participantes</span>
                <span className="font-semibold text-foreground">{m.participantes}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
