# SkyLine Airways — Build Plan

A premium, dark-futuristic airline platform with 5 connected modules, glassmorphism, cinematic motion, and a portfolio-grade landing experience. Frontend-only, simulated data.

## Tech & conventions
- React 19 + TanStack Start (file-based routing under `src/routes/`) — note: the stack uses TanStack Router, not React Router DOM. Navigation will use TanStack `<Link>` / `useNavigate` (functionally equivalent).
- Tailwind v4 (tokens in `src/styles.css`), shadcn/ui primitives already present.
- Framer Motion for transitions/hover/scroll reveals.
- Lucide icons.
- `canvas-confetti` for success, `qrcode.react` for boarding QR, `jspdf` for PDF boarding pass.
- Zustand for cross-module state (passenger, flight, seats, addons, bookingRef).
- Zod + react-hook-form for form validation.

## Design system (added to `src/styles.css`)
- Palette (oklch): deep space navy background, midnight surface, sky-blue primary, cyan glow accent, soft white foreground, glass borders at low opacity.
- Tokens: `--gradient-aurora`, `--gradient-sky`, `--shadow-glow`, `--shadow-elevated`, `--glass-bg`, `--glass-border`.
- Typography: Space Grotesk (display) + Inter (body), loaded via `<link>` in `__root.tsx` head.
- Reusable utilities: `.glass`, `.glow-ring`, `.aurora-bg`, animated grid + starfield backdrop.

## Route map (TanStack file-based)
```
src/routes/
  __root.tsx                 navbar + footer + aurora backdrop + <Outlet/>
  index.tsx                  hero landing (stats, features, CTA)
  auth.login.tsx
  auth.signup.tsx
  auth.forgot.tsx
  auth.otp.tsx
  auth.pnr.tsx
  dashboard.tsx              layout w/ sidebar + <Outlet/>
  dashboard.index.tsx        overview (charts, upcoming flight, quick actions)
  checkin.tsx                multi-step wrapper (progress tracker + <Outlet/>)
  checkin.index.tsx          retrieve booking (PNR/last name)
  checkin.passengers.tsx     passenger + passport details
  checkin.seats.tsx          interactive seat map
  checkin.addons.tsx         baggage + meals
  checkin.review.tsx         final review
  checkin.confirmation.tsx   success + confetti + boarding pass CTA
  boarding-pass.tsx          modern pass UI + QR + PDF download + notifications
  notifications.tsx          gate updates, countdown, alerts feed
```

## Components
- `layout/Navbar`, `layout/Footer`, `layout/Sidebar`, `layout/AuroraBackdrop`
- `ui-ext/GlassCard`, `GlowButton`, `StatCard`, `SectionHeading`, `StepProgress`, `LoadingScreen`, `PageTransition`
- `checkin/SeatMap` (6-abreast, 30 rows, occupied/available/selected/premium states, hover tooltips)
- `checkin/BaggageSelector`, `checkin/MealCard`, `checkin/SummaryPanel`
- `boarding/BoardingPass` (front + barcode strip + QR), `boarding/CountdownTimer`, `boarding/NotificationToast`
- `dashboard/MiniChart` (recharts area/bar), `dashboard/UpcomingFlight`

## State (Zustand stores)
- `useAuthStore` — fake session, login/signup/otp simulation, localStorage persist.
- `useBookingStore` — PNR, passengers[], flight, seatAssignments, baggageKg, meals, totals, status.
- `useNotificationsStore` — gate changes, boarding alerts, dummy push feed.

## Simulated data (`src/data/`)
- `flights.ts` (5 routes w/ aircraft, gate, times), `seats.ts` (generator), `meals.ts`, `baggage.ts`, `notifications.ts`.

## Module details
1. **Auth** — glass login/signup/forgot, 6-digit OTP boxes w/ auto-advance, PNR + last-name verify, animated field focus, zod validation, simulated session → redirect to dashboard.
2. **Check-in flow** — sticky step tracker (Retrieve → Passengers → Seats → Add-ons → Review → Confirmation), framer page transitions, back/continue with validation gates.
3. **Baggage & meals** — weight tier cards (5/10/15/23kg) with live price, meal cards w/ imagery + select state, running total in sticky summary panel.
4. **Boarding pass** — modern dual-panel pass (passenger + stub), animated QR reveal, jsPDF download, share buttons, live countdown to boarding, toast for gate change.
5. **Confirmation** — success modal, canvas-confetti burst, summary, "Download pass" + "Back to home" CTAs.

## Landing + dashboard polish
- Hero with animated aurora + floating plane SVG + headline + dual CTA + trust stats.
- Feature grid (6 glass cards w/ hover tilt), "How it works" 4-step, testimonials carousel, footer with newsletter.
- Dashboard sidebar: Overview, Check-in, Boarding pass, Notifications, Profile. Overview shows upcoming flight card, miles chart (recharts), recent activity, quick actions.

## Dependencies to add
`framer-motion`, `zustand`, `react-hook-form`, `@hookform/resolvers`, `zod`, `qrcode.react`, `jspdf`, `canvas-confetti`, `recharts`.

## Build order
1. Tokens, fonts, global backdrop, Navbar/Footer, landing hero.
2. Auth screens + auth store.
3. Dashboard shell + overview.
4. Check-in flow (retrieve → passengers → seats → addons → review → confirmation) + booking store.
5. Boarding pass + PDF + QR + countdown + notifications.
6. Animations pass, responsive QA at mobile/tablet/desktop, loading screens, polish.

## Out of scope (frontend-only)
No real auth, no real payments, no backend persistence — all flows simulated with in-memory + localStorage state.
