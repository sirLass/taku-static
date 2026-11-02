import { cn } from '@/lib/utils'

type TakuLogoProps = { variant?: 'mark' | 'horizontal' | 'stacked'; className?: string }

export function TakuLogo({ variant = 'horizontal', className }: TakuLogoProps) {
  const mark = <svg aria-hidden="true" viewBox="0 0 48 48" className="size-full" fill="none"><path d="M10 8h28v8H30v22h-9V16H10V8Z" fill="currentColor"/><path d="M31 10c3-5 8-6 12-5-1 5-4 9-10 10" stroke="#4CAF70" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/></svg>
  if (variant === 'mark') return <span aria-label="Taku" className={cn('inline-block size-10 text-[#F7F8FA]', className)}>{mark}</span>
  return <span className={cn('inline-flex items-center gap-2 text-[#F7F8FA]', className)}>{variant === 'stacked' ? <span className="flex size-10 items-center justify-center text-[#F7F8FA]">{mark}</span> : <span className="size-8">{mark}</span>}<span className={cn('font-sora text-xl font-semibold tracking-tight', variant === 'stacked' && 'text-2xl')}>Taku</span></span>
}
