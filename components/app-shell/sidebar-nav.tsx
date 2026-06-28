'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { ChevronRight } from 'lucide-react'
import { navItems } from '@/lib/nav'
import { cn } from '@/lib/utils'

export function SidebarNav({
  collapsed,
  onNavigate,
}: {
  collapsed?: boolean
  onNavigate?: () => void
}) {
  const pathname = usePathname()
  const [open, setOpen] = useState<string | null>('Personas')

  return (
    <nav className="flex flex-col gap-0.5 px-3 py-2" aria-label="Navegación principal">
      {navItems.map((item) => {
        const active =
          pathname === item.href ||
          (item.href !== '/dashboard' && pathname.startsWith(item.href))
        const Icon = item.icon
        const hasChildren = !!item.children?.length
        const isOpen = open === item.label

        return (
          <div key={item.label}>
            <div className="flex items-center">
              <Link
                href={item.href}
                onClick={onNavigate}
                title={collapsed ? item.label : undefined}
                className={cn(
                  'group flex flex-1 items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  active
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                  collapsed && 'justify-center px-0',
                )}
              >
                <Icon className="size-[18px] shrink-0" />
                {!collapsed && <span className="truncate">{item.label}</span>}
              </Link>
              {!collapsed && hasChildren && (
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : item.label)}
                  aria-label={`Expandir ${item.label}`}
                  className="rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  <ChevronRight
                    className={cn('size-4 transition-transform', isOpen && 'rotate-90')}
                  />
                </button>
              )}
            </div>
            {!collapsed && hasChildren && isOpen && (
              <div className="mt-0.5 mb-1 ml-[26px] flex flex-col gap-0.5 border-l border-border pl-3">
                {item.children!.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    onClick={onNavigate}
                    className="rounded-md px-2 py-1.5 text-[13px] text-muted-foreground hover:bg-muted hover:text-foreground"
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        )
      })}
    </nav>
  )
}
