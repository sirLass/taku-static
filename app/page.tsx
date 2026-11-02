import { Hero } from '@/components/hero'
import { Navbar } from '@/components/navbar'
import { Features } from '@/components/features'
import { WaitlistForm } from '@/components/waitlist-form'
import { Announcement } from '@/components/announcement'
import { Footer } from '@/components/footer'

export default function Page(){return <><Navbar/><main><Hero/><Features/><section id="waitlist" className="mx-auto grid max-w-[1200px] gap-6 px-5 pb-24 lg:grid-cols-[1fr_.9fr] lg:px-8"><WaitlistForm/><Announcement/></section></main><Footer/></>}
