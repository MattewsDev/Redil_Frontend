import { RedilLogo, RedilMark } from '@/components/brand'
import { Users, CalendarCheck, ShieldCheck } from 'lucide-react'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full">
      {/* Brand panel */}
      <div className="relative hidden w-[44%] flex-col justify-between overflow-hidden bg-primary p-10 text-primary-foreground lg:flex">
        <RedilMark className="bg-primary-foreground/15" />
        <div className="relative z-10 max-w-md">
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-balance">
            Toda tu iglesia, organizada en un solo lugar.
          </h2>
          <p className="mt-4 text-primary-foreground/80 leading-relaxed text-pretty">
            Administra personas, ministerios, eventos y asistencia con una
            plataforma diseñada para crecer junto a tu comunidad.
          </p>
          <div className="mt-10 flex flex-col gap-4">
            {[
              { icon: Users, t: 'CRM de personas y visitantes' },
              { icon: CalendarCheck, t: 'Eventos con check-in por QR' },
              { icon: ShieldCheck, t: 'Roles y permisos por usuario' },
            ].map(({ icon: Icon, t }) => (
              <div key={t} className="flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-lg bg-primary-foreground/15">
                  <Icon className="size-[18px]" />
                </span>
                <span className="text-sm font-medium text-primary-foreground/90">{t}</span>
              </div>
            ))}
          </div>
        </div>
        <p className="relative z-10 text-xs text-primary-foreground/60">
          © 2026 REDIL. Plataforma de gestión para iglesias.
        </p>
        <div className="pointer-events-none absolute -bottom-24 -right-24 size-80 rounded-full bg-primary-foreground/10" />
        <div className="pointer-events-none absolute -right-10 top-20 size-40 rounded-full bg-accent/20" />
      </div>

      {/* Form panel */}
      <div className="flex flex-1 flex-col items-center justify-center bg-background px-4 py-10">
        <div className="mb-8 lg:hidden">
          <RedilLogo />
        </div>
        <div className="w-full max-w-sm">{children}</div>
      </div>
    </div>
  )
}
