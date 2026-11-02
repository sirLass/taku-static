'use client'
import { ConvexProvider, ConvexReactClient } from 'convex/react'
import type { ReactNode } from 'react'

// Falls back to the project's Convex deployment so the waitlist keeps working
// even if the env var is missing in a host's dashboard.
const client = new ConvexReactClient(
  process.env.NEXT_PUBLIC_CONVEX_URL ?? 'https://secret-swordfish-177.convex.cloud'
)

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  return <ConvexProvider client={client}>{children}</ConvexProvider>
}
