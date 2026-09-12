# NOIR — 3D Café

A cinematic, production-ready café website built with Next.js, React Three Fiber, Three.js, Framer Motion and Lenis.

## Included
- Cinematic interactive 3D coffee hero
- Pointer-reactive camera and procedural coffee cup/beans
- Inertial smooth scrolling
- Responsive mobile navigation
- Full menu with category filters
- Reservation form + API
- Supabase reservation persistence
- Private reservation admin dashboard
- Editorial story page
- Cinematic gallery
- Contact/location page
- Reduced-motion accessibility support
- Metadata / Open Graph basics
- GitHub Actions typecheck + production build CI

## Local setup
Requirements: Node.js 20.9+.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production build
```bash
npm run typecheck
npm run build
npm start
```

## Supabase setup
1. Create a Supabase project.
2. Open SQL Editor.
3. Run `supabase/schema.sql`.
4. Copy `.env.example` to `.env.local`.
5. Set:
```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
ADMIN_DASHBOARD_KEY=use-a-long-random-secret
```
Never expose the service-role key in client code or commit `.env.local`.

## Reservation flow
`/reservations` posts to `/api/reservations`.
- With Supabase variables: reservations persist in PostgreSQL.
- Without them: the API returns demo mode so the frontend can still be previewed.
- `/admin` requires `ADMIN_DASHBOARD_KEY` and reads reservations server-side.

## Deployment
Import this repository into Vercel as a Next.js project and add the three production environment variables. The Git integration can deploy future pushes automatically.

## Before public launch
Replace the NOIR placeholder brand, address, phone, email, Instagram handle, domain metadata and demo menu copy with the real café identity.
