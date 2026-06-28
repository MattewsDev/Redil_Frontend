import Link from "next/link"
import {
Mail,
Phone,
IdCard,
MapPin,
CalendarCheck,
HeartHandshake,
QrCode,
StickyNote,
ArrowLeft,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PageHeader } from "@/components/page-header"
import { personas } from "@/lib/data"

interface PersonaDetailProps {
params: Promise<{ id: string }>
}

const estadoVariant = {
Activo: 'success',
Inactivo: 'muted',
Nuevo: 'cream',
} as const

export default async function PersonaDetailPage({ params }: PersonaDetailProps) {
const { id } = await params
const persona = personas.find(p => p.id === id)

if (!persona) {
    return (
    <div className="flex flex-col gap-6">
        <PageHeader
        title="Persona no encontrada"
        description="La persona que buscas no existe."
        >
        <Button variant="ghost" size="sm" render={<Link href="/personas" />}>
            <ArrowLeft className="size-4" /> Volver
        </Button>
        </PageHeader>
    </div>
    )
}

const generalInfo = [
    { icon: IdCard, label: 'Documento', value: persona.documento },
    { icon: Phone, label: 'Teléfono', value: persona.telefono },
    { icon: Mail, label: 'Email', value: persona.email },
    { icon: MapPin, label: 'Ciudad', value: persona.ciudad },
    {
    icon: CalendarCheck,
    label: 'Ingreso',
    value: new Date(persona.ingreso).toLocaleDateString('es', { dateStyle: 'long' }),
    },
]

const historyStats = [
    { label: 'Asistencias', value: '48' },
    { label: 'Eventos', value: '12' },
    { label: 'Ministerios', value: persona.ministerio ? '1' : '0' },
]

const sidebarInfo = [
    { label: 'Tipo', value: persona.tipo },
    { label: 'Estado', value: persona.estado },
    ...(persona.ministerio ? [{ label: 'Ministerio', value: persona.ministerio }] : []),
]

return (
    <div>
    <PageHeader
        title="Detalles"
        description={`Perfil completo de ${persona.nombre}`}
    >
        <Button variant="ghost" size="sm" render={<Link href="/personas" />}>
        <ArrowLeft className="size-4" /> Volver
        </Button>
        <Button>Editar perfil</Button>
    </PageHeader>

    <div className="grid gap-4 p-4 md:p-6 lg:grid-cols-[1fr_340px]">
        {/* Main content */}
        <div className="flex flex-col gap-4">
        <Card>
            <CardContent className="flex flex-col items-center gap-4 p-6">
            <Avatar name={persona.nombre} className="size-24 text-3xl" />
            <div className="text-center">
                <h2 className="text-2xl font-bold text-foreground">{persona.nombre}</h2>
                <div className="mt-3 flex flex-wrap justify-center gap-2">
                <Badge variant="secondary">{persona.tipo}</Badge>
                <Badge variant={estadoVariant[persona.estado]}>{persona.estado}</Badge>
                </div>
            </div>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm uppercase">
                <IdCard className="size-4 text-primary" /> Información general
            </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
            {generalInfo.map((item) => (
                <InfoRow key={item.label} icon={item.icon} label={item.label} value={item.value} />
            ))}
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm uppercase">
                <CalendarCheck className="size-4 text-primary" /> Historial
            </CardTitle>
            </CardHeader>
            <CardContent>
            <div className="grid grid-cols-3 gap-2">
                {historyStats.map((item) => (
                <div key={item.label} className="rounded-lg border border-border bg-muted/40 p-3 text-center">
                    <p className="text-lg font-bold text-foreground">{item.value}</p>
                    <p className="text-xs text-muted-foreground">{item.label}</p>
                </div>
                ))}
            </div>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm uppercase">
                <HeartHandshake className="size-4 text-primary" /> Ministerios y membresía
            </CardTitle>
            </CardHeader>
            <CardContent>
            {persona.ministerio ? (
                <div className="flex items-center justify-between rounded-lg border border-border p-3">
                <span className="text-sm font-medium text-foreground">{persona.ministerio}</span>
                <Badge variant="secondary">Activo</Badge>
                </div>
            ) : (
                <p className="text-sm text-muted-foreground">Sin ministerios asignados.</p>
            )}
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm uppercase">
                <QrCode className="size-4 text-primary" /> QR personal
            </CardTitle>
            </CardHeader>
            <CardContent>
            <div className="flex flex-col gap-3 rounded-lg border border-border p-4 sm:flex-row sm:items-center">
                <span className="flex size-20 shrink-0 items-center justify-center rounded-lg bg-foreground text-card">
                <QrCode className="size-10" />
                </span>
                <div className="flex-1">
                <p className="text-sm font-medium text-foreground">Identificación digital</p>
                <p className="text-xs text-muted-foreground">Úsalo para check-in en eventos.</p>
                <Button variant="outline" size="sm" className="mt-2">
                    Descargar QR
                </Button>
                </div>
            </div>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm uppercase">
                <StickyNote className="size-4 text-primary" /> Notas pastorales
            </CardTitle>
            </CardHeader>
            <CardContent>
            <p className="rounded-lg border border-border bg-muted/40 p-3 text-sm text-muted-foreground">
                Persona comprometida con la congregación. Interesada en liderar un grupo pequeño el próximo semestre.
            </p>
            </CardContent>
        </Card>
        </div>

        <div className="flex flex-col gap-4">
        <Card>
            <CardHeader>
            <CardTitle>Acciones rápidas</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
            {['Ver asistencias', 'Ver eventos', 'Contactar'].map((action) => (
                <Button key={action} variant="outline" className="w-full">
                {action}
                </Button>
            ))}
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
            <CardTitle>Información</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2 text-sm">
            {sidebarInfo.map((item) => (
                <div key={item.label}>
                <p className="text-muted-foreground">{item.label}</p>
                <p className="font-medium">{item.value}</p>
                </div>
            ))}
            </CardContent>
        </Card>
        </div>
    </div>
    </div>
)
}

function InfoRow({
icon: Icon,
label,
value,
}: {
icon: React.ElementType
label: string
value: string
}) {
return (
    <div className="flex items-start gap-3">
    <Icon className="mt-0.5 size-4 shrink-0 text-primary" />
    <div className="min-w-0 flex-1">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="truncate font-medium text-foreground">{value}</p>
    </div>
    </div>
)
}
