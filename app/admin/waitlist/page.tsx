'use client'
import { useState } from 'react'
import { useConvex } from 'convex/react'
import { Loader2, RefreshCw } from 'lucide-react'

type Entry = { email: string; name?: string; student?: boolean; createdAt?: number }
const fmtDate = (t: number | undefined) => t ? new Date(t).toLocaleDateString('en-PH', { month: 'short', day: 'numeric', year: 'numeric' }) : '—'

export default function AdminWaitlistPage() {
  const convex = useConvex()
  const [key, setKey] = useState('')
  const [rows, setRows] = useState<Entry[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const load = async () => {
    setLoading(true); setError(null)
    try {
      const q = convex.query as unknown as (n: string, a: Record<string, unknown>) => Promise<unknown>
      setRows((await q('waitlist:list', { key })) as Entry[])
    } catch (e) {
      setRows(null)
      setError(e instanceof Error && e.message.includes('Unauthorized') ? 'Wrong admin key.' : 'Could not load entries. Is the Convex deployment pushed?')
    } finally {
      setLoading(false)
    }
  }

  if (rows === null) return (
    <main className="mx-auto max-w-md px-5 pt-40 pb-24">
      <p className="eyebrow">Taku admin</p>
      <h1 className="mt-3 font-sora text-2xl font-semibold tracking-tight text-[#F7F8FA] sm:text-3xl">Waitlist entries</h1>
      <p className="mt-3 text-sm leading-6 text-[#F7F8FA]/60">Enter the admin key to unlock the table. The key is stored as <code className="rounded bg-white/5 px-1.5 py-0.5 text-[#4CAF70]">ADMIN_KEY</code> on your Convex deployment (<code className="rounded bg-white/5 px-1.5 py-0.5 text-[#4CAF70]">npx convex env set ADMIN_KEY …</code>).</p>
      <form onSubmit={(e) => { e.preventDefault(); void load() }} className="mt-8 flex flex-col gap-4">
        <input type="password" value={key} onChange={(e) => setKey(e.target.value)} placeholder="Admin key" className="field" autoComplete="off"/>
        <button disabled={loading || !key} className="flex items-center justify-center gap-2 rounded-full bg-[#4CAF70] px-5 py-3.5 text-sm font-semibold text-[#0F1114] transition hover:bg-[#2E7D54] disabled:opacity-60">{loading ? <Loader2 className="animate-spin" size={16}/> : null} Open table</button>
        {error && <p role="alert" className="text-xs text-[#F7F8FA]/65">{error}</p>}
      </form>
    </main>
  )

  return (
    <main className="mx-auto max-w-4xl px-5 pt-40 pb-28">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="eyebrow">Taku admin</p>
          <h1 className="mt-3 font-sora text-2xl font-semibold tracking-tight text-[#F7F8FA] sm:text-3xl">Waitlist</h1>
        </div>
        <div className="flex items-center gap-3">
          <span className="rounded-full border border-[#4CAF70]/25 bg-[#4CAF70]/10 px-3 py-1.5 text-xs font-medium text-[#4CAF70]">{rows.length} joined</span>
          <button onClick={() => void load()} className="flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs font-semibold text-[#F7F8FA]/80 transition hover:border-[#4CAF70]/50 hover:text-[#4CAF70]"><RefreshCw size={14}/>Refresh</button>
        </div>
      </div>
      <div className="mt-8 overflow-x-auto rounded-3xl border border-white/10 bg-[#1A1D20]">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 text-[11px] font-semibold uppercase tracking-[.18em] text-[#F7F8FA]/45">
              <th className="px-5 py-4 font-semibold">Email</th>
              <th className="px-5 py-4 font-semibold">Name</th>
              <th className="px-5 py-4 font-semibold">Student</th>
              <th className="px-5 py-4 font-semibold">Joined</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/8">
            {rows.length === 0 ? (
              <tr><td colSpan={4} className="px-5 py-12 text-center text-[#F7F8FA]/45">Nobody has joined yet.</td></tr>
            ) : rows.map((r) => (
              <tr key={`${r.email}-${r.createdAt}`} className="transition hover:bg-white/[.03]">
                <td className="px-5 py-4 font-medium text-[#F7F8FA]">{r.email}</td>
                <td className="px-5 py-4 text-[#F7F8FA]/65">{r.name?.trim() ? r.name : <span className="text-[#F7F8FA]/30">—</span>}</td>
                <td className="px-5 py-4">{r.student ? <span className="rounded-full bg-[#4CAF70]/15 px-2.5 py-1 text-[11px] font-semibold text-[#4CAF70]">Student</span> : <span className="text-[#F7F8FA]/30">—</span>}</td>
                <td className="px-5 py-4 text-[#F7F8FA]/55">{fmtDate(r.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-xs text-[#F7F8FA]/40">Served straight from your Convex deployment. Refresh to see new signups.</p>
    </main>
  )
}
