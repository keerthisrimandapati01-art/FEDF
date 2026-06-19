import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/notifications")({
  head: () => ({ meta: [{ title: "Alerts · SkyLine" }] }),
  component: Notifications,
});

const feed = [
  { icon: DoorOpen,       title: "Gate change",      desc: "Gate updated to A12 — please make your way over.", time: "Just now", tone: "alert" as const },
  { icon: Plane,           title: "Boarding starts soon", desc: "Boarding begins at 21:10 from Gate A12.",       time: "9m ago",   tone: "info" as const },
  { icon: CheckCircle2,    title: "Check-in confirmed",  desc: "Seat 7A locked in. Have a stellar flight.",     time: "1h ago",   tone: "ok" as const },
  { icon: Coffee,           title: "Lounge access",      desc: "Your Platinum tier unlocks the SkyLine Lounge — Concourse C.", time: "2h ago", tone: "info" as const },
  { icon: AlertTriangle,    title: "Weather advisory",    desc: "Light turbulence expected near cruising altitude.", time: "3h ago", tone: "warn" as const },
];

function Notifications() {
  return (
    <div className="flex min-h-[calc(100vh-7rem)] items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="glass-strong rounded-3xl border border-cyan-glow/20 p-8 text-center">
          <div className="mb-4 inline-flex items-center justify-center rounded-full bg-cyan-glow/20 p-3">
            <svg className="size-6 text-cyan-glow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="font-display text-2xl">Version 1 Prototype</h2>
          <p className="mt-3 text-sm text-muted-foreground">This feature is under development and will be available in Version 2.</p>
          <Link to="/" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky to-cyan-glow px-4 py-2 text-sm font-semibold text-[oklch(0.12_0.04_260)]">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className="mx-auto max-w-5xl px-4 pt-10 pb-24">
      <div className="mb-8 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-cyan-glow">Live alerts</p>
        <h1 className="mt-2 font-display text-4xl md:text-5xl">Stay in the loop.</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-[1.4fr_1fr]">
        <div className="space-y-3">
          {feed.map((n, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}
            >
              <GlassCard className="flex gap-4 p-5">
                <div className={`grid size-10 shrink-0 place-items-center rounded-xl ${
                  n.tone === "alert" ? "bg-destructive/20 text-destructive" :
                  n.tone === "warn"  ? "bg-[oklch(0.78_0.18_75)]/20 text-[oklch(0.85_0.16_80)]" :
                  n.tone === "ok"    ? "bg-[oklch(0.7_0.18_160)]/20 text-[oklch(0.8_0.16_160)]" :
                                       "bg-cyan-glow/20 text-cyan-glow"
                }`}>
                  <n.icon className="size-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div className="font-display text-base">{n.title}</div>
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{n.time}</div>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{n.desc}</p>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        <div className="space-y-3 md:sticky md:top-28 md:self-start">
          <GlassCard glow>
            <div className="text-xs uppercase tracking-widest text-cyan-glow">Boarding starts in</div>
            <div className="mt-3"><CountdownTimer target={boardingTarget} /></div>
          </GlassCard>
          <GlassCard>
            <div className="flex items-center gap-2">
              <Bell className="size-4 text-cyan-glow" />
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Flight</div>
            </div>
            <div className="mt-2 font-display text-xl">{flight.number} · {flight.from.code} → {flight.to.code}</div>
            <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
              <div><div className="text-[10px] uppercase text-muted-foreground">Gate</div><span className="text-cyan-glow">{flight.gate}</span></div>
              <div><div className="text-[10px] uppercase text-muted-foreground">Terminal</div>{flight.terminal}</div>
              <div><div className="text-[10px] uppercase text-muted-foreground">Status</div>{flight.status}</div>
              <div><div className="text-[10px] uppercase text-muted-foreground">Date</div>{flight.date}</div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
