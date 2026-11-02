import type { MetadataRoute } from 'next'
export default function sitemap(): MetadataRoute.Sitemap { const base='https://taku.app'; return [{url:base},{url:`${base}/privacy`},{url:`${base}/terms`}] }
