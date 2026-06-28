'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import {
  Bell,
  ChevronsLeft,
  Menu,
  Plus,
  Search,
  X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar } from '@/components/ui/avatar'
import { RedilLogo } from '@/components/brand'
import { SidebarNav } from './sidebar-nav'
import { mobileNav } from '@/lib/nav'
import { cn } from '@/lib/utils'

export function AppShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Desktop / tablet sidebar */}
      <aside
        className={cn(
          'sticky top-0 hidden h-screen shrink-0 flex-col border-r border-border bg-sidebar transition-[width] duration-200 md:flex',
          collapsed ? 'w-[72px]' : 'w-64',
        )}
      >
        <div
          className={cn(
            'flex h-16 items-center border-b border-border px-4',
            collapsed && 'justify-center px-0',
          )}
        >
          <Link href="/dashboard">
            <RedilLogo collapsed={collapsed} />
          </Link>
        </div>
        <div className="flex-1 overflow-y-auto">
          <SidebarNav collapsed={collapsed} />
        </div>
        <div className="border-t border-border p-3">
          <button
            type="button"
            onClick={() => setCollapsed((c) => !c)}
            className={cn(
              'flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground',
              collapsed && 'justify-center px-0',
            )}
          >
            <ChevronsLeft className={cn('size-4 transition-transform', collapsed && 'rotate-180')} />
            {!collapsed && <span>Contraer</span>}
          </button>
        </div>
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-foreground/40"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute left-0 top-0 flex h-full w-72 flex-col bg-sidebar shadow-xl">
            <div className="flex h-16 items-center justify-between border-b border-border px-4">
              <RedilLogo />
              <Button variant="ghost" size="icon" onClick={() => setMobileOpen(false)}>
                <X className="size-5" />
              </Button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <SidebarNav onNavigate={() => setMobileOpen(false)} />
            </div>
          </div>
        </div>
      )}

      {/* Main column */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-card/80 px-4 backdrop-blur md:px-6">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Abrir menú"
          >
            <Menu className="size-5" />
          </Button>

          <div className="relative hidden max-w-md flex-1 sm:block">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              placeholder="Buscar personas, eventos, ministerios…"
              className="h-9 w-full rounded-lg border border-input bg-background pl-9 pr-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/25"
            />
          </div>

          <div className="ml-auto flex items-center gap-2">
            {/* <Button size="sm" className="hidden sm:inline-flex" render={<Link href="/personas/nueva" />}>
              <Plus className="size-4" />
              Crear persona
            </Button> */}
            <Button variant="ghost" size="icon" aria-label="Notificaciones" className="relative">
              <Bell className="size-5" />
              <span className="absolute right-2 top-2 size-1.5 rounded-full bg-primary" />
            </Button>
            <div className="flex items-center gap-2 rounded-lg border border-border bg-card py-1 pl-1 pr-2">
              <Avatar name="David Mejía" className="size-7" />
              <div className="hidden leading-tight lg:block">
                <p className="text-xs font-semibold text-foreground">Iglesia Central</p>
                <p className="text-[11px] text-muted-foreground">Plan Church</p>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 pb-24 md:pb-0">{children}</main>

        {/* Mobile bottom nav */}
        <nav className="fixed bottom-0 left-0 right-0 z-30 flex items-center justify-around border-t border-border bg-card/95 px-2 py-1.5 backdrop-blur md:hidden">
          {mobileNav.map((item) => {
            const Icon = item.icon
            const active =
              pathname === item.href ||
              (item.href !== '/dashboard' && pathname.startsWith(item.href))
            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  'flex flex-1 flex-col items-center gap-0.5 rounded-lg py-1.5 text-[10px] font-medium',
                  active ? 'text-primary' : 'text-muted-foreground',
                )}
              >
                <Icon className="size-5" />
                <span className="truncate">{item.label.split(' ')[0]}</span>
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
