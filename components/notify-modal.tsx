'use client'
import { CheckCircle2, X } from 'lucide-react'
import { useEffect } from 'react'

type NotifyModalProps = {
  open: boolean
  onClose: () => void
  title: string
  message: string
  confirmLabel?: string
}

export function NotifyModal({ open, onClose, title, message, confirmLabel = 'Got it' }: NotifyModalProps) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null
  return (
    <div role="dialog" aria-modal="true" aria-label={title} className="fixed inset-0 z-50 flex items-start justify-center p-5">
      <div className="absolute inset-0 bg-[#0F1114]/85 backdrop-blur-sm" onClick={onClose}/>
      <div className="relative mt-[18vh] w-full max-w-sm rounded-3xl border border-[#4CAF70]/30 bg-[#1A1D20] p-7 text-center shadow-2xl shadow-black/40">
        <button aria-label="Close notification" onClick={onClose} className="absolute right-4 top-4 rounded-full p-1.5 text-[#F7F8FA]/50 transition hover:bg-white/5 hover:text-[#F7F8FA]"><X size={16}/></button>
        <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-[#4CAF70]/15 text-[#4CAF70]"><CheckCircle2 size={22}/></span>
        <h3 className="mt-4 font-sora text-lg font-semibold tracking-tight text-[#F7F8FA]">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-[#F7F8FA]/65">{message}</p>
        <button onClick={onClose} className="mt-6 w-full rounded-full bg-[#4CAF70] px-5 py-3 text-sm font-semibold text-[#0F1114] transition hover:bg-[#2E7D54]">{confirmLabel}</button>
      </div>
    </div>
  )
}
