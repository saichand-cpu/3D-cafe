import type { MetadataRoute } from 'next';
export default function sitemap(): MetadataRoute.Sitemap{const base='https://3d-cafe.vercel.app';return ['','/menu','/story','/gallery','/contact','/reservations'].map(path=>({url:base+path,lastModified:new Date(),changeFrequency:'weekly',priority:path===''?1:.7}))}
