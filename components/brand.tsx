import { cn } from '@/lib/utils'

export function RedilMark({ className }: { className?: string }) {
  return (
    // <span
    //   className={cn(
    //     'flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground',
    //     className,
    //   )}
    //   aria-hidden
    // >
    //   <svg viewBox="0 0 24 24" fill="none" className="size-5">
    //     <path
    //       d="M12 3 4 7.5v9L12 21l8-4.5v-9L12 3Z"
    //       stroke="currentColor"
    //       strokeWidth="1.8"
    //       strokeLinejoin="round"
    //     />
    //     <path
    //       d="M12 3v18M4 7.5l8 4.5 8-4.5"
    //       stroke="currentColor"
    //       strokeWidth="1.8"
    //       strokeLinejoin="round"
    //     />
    //   </svg>
    // </span>
    <img src="/Redil_logo.png" alt="Redil logo" className="h-9 w-9 shrink-0 " />
  )
}

export function RedilLogo({
  collapsed,
  className,
}: {
  collapsed?: boolean
  className?: string
}) {
  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <RedilMark />
      {!collapsed && (
        <div className="flex flex-col leading-none">
          <span className="text-base font-bold tracking-tight text-foreground">REDIL</span>
          <span className="text-[11px] font-medium text-muted-foreground">
            Gestión de iglesias
          </span>
        </div>
      )}
    </div>
  )
}
