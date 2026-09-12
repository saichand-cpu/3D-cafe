import type { Metadata, Viewport } from 'next';
import './globals.css';
import './demo-overrides.css';
import SmoothScroll from '@/components/SmoothScroll';

export const metadata: Metadata = {
  metadataBase: new URL('https://3d-cafe.vercel.app'),
  title: { default: 'NOIR — Coffee, Reimagined', template: '%s — NOIR' },
  description: 'A cinematic 3D café experience in Hyderabad.',
  keywords: ['cafe','coffee','Hyderabad','3D cafe','specialty coffee','NOIR'],
  openGraph: { title: 'NOIR — Coffee, Reimagined', description: 'A cinematic coffee house for curious people.', type: 'website' },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { width: 'device-width', initialScale: 1, viewportFit: 'cover', themeColor: '#090908' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><SmoothScroll>{children}</SmoothScroll></body></html>;
}
