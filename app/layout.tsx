import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'
import { ConvexClientProvider } from '@/components/convex-client-provider'
export const metadata: Metadata={title:'Taku: Smarter budgeting for Filipinos',description:'A calm budgeting app for Filipino students and first-job earners. Know what you can safely spend today with grounded AI guidance.',generator:'v0.app',openGraph:{title:'Taku: Smarter budgeting for Filipinos',description:'Plan, track, and save with a daily spending limit built for Filipino payday cycles.',images:['/og-image.png']},twitter:{card:'summary_large_image',title:'Taku: Smarter budgeting for Filipinos',description:'Smarter budgeting for Filipinos.'}}
export const viewport: Viewport={colorScheme:'dark',themeColor:'#0F1114',userScalable:false}
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body className="antialiased"><ConvexClientProvider>{children}{process.env.NODE_ENV==='production'&&<Analytics/>}</ConvexClientProvider></body></html>}
