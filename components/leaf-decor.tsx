export function LeafDecor({ className = '' }: { className?: string }) {
  return <div aria-hidden="true" className={`pointer-events-none absolute rounded-[100%_0_100%_0] bg-gradient-to-br from-[#4CAF70]/20 to-[#2E7D54]/0 blur-2xl ${className}`} />
}
