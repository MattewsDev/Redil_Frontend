import {
  LayoutDashboard,
  Users,
  HeartHandshake,
  CalendarDays,
  QrCode,
  ShieldCheck,
  BarChart3,
  Settings,
  CreditCard,
  type LucideIcon,
} from 'lucide-react'

export type NavChild = { label: string; href: string }
export type NavItem = {
  label: string
  href: string
  icon: LucideIcon
  children?: NavChild[]
}

export const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  {
    label: 'Personas',
    href: '/personas',
    icon: Users,
    children: [
      { label: 'Listado', href: '/personas' },
      { label: 'Visitantes', href: '/personas?tipo=visitante' },
      { label: 'Membresías', href: '/personas?tipo=miembro' },
    ],
  },
  {
    label: 'Ministerios',
    href: '/ministerios',
    icon: HeartHandshake,
  },
  {
    label: 'Eventos',
    href: '/eventos',
    icon: CalendarDays,
    children: [
      { label: 'Calendario', href: '/eventos' },
      { label: 'Crear evento', href: '/eventos/nuevo' },
      { label: 'Plantillas', href: '/eventos?vista=plantillas' },
      { label: 'Formularios públicos', href: '/eventos?vista=formularios' },
    ],
  },
  {
    label: 'Asistencia',
    href: '/asistencia',
    icon: QrCode,
    children: [
      { label: 'Registrar', href: '/asistencia' },
      { label: 'Escáner QR', href: '/asistencia/escanear' },
      { label: 'Historial', href: '/asistencia?vista=historial' },
    ],
  },
  {
    label: 'Usuarios y Roles',
    href: '/usuarios',
    icon: ShieldCheck,
  },
  { label: 'Reportes', href: '/reportes', icon: BarChart3 },
  { label: 'Configuración', href: '/configuracion', icon: Settings },
  { label: 'Facturación', href: '/facturacion', icon: CreditCard },
]

export const mobileNav: NavItem[] = [
  navItems[0],
  navItems[1],
  navItems[3],
  navItems[4],
  navItems[6],
]
