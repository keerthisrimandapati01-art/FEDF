import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/checkin/seats")({
  component: SeatsRoute,
});

function SeatsRoute() {
  return (
    <div className="flex items-center justify-center">
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
    <div className="grid gap-6 md:grid-cols-[1fr_320px]">
      <SeatMap selected={p?.seat} onSelect={(s) => assignSeat(p.id, s)} />
      <div className="space-y-4">
        <GlassCard>
          <div className="text-xs uppercase tracking-widest text-cyan-glow">Your seat</div>
          <div className="mt-2 font-display text-4xl text-gradient-sky">{p?.seat ?? "—"}</div>
          <p className="mt-2 text-xs text-muted-foreground">
            {p?.seat ? "Looking good. Window views & extra legroom await." : "Tap any available seat on the map."}
          </p>
        </GlassCard>
        <GlassCard>
          <div className="text-xs uppercase tracking-widest text-muted-foreground">Flight</div>
          <div className="mt-1 font-display text-xl">{flight.number}</div>
          <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
            <div><div className="text-[10px] uppercase text-muted-foreground">Aircraft</div>{flight.aircraft}</div>
            <div><div className="text-[10px] uppercase text-muted-foreground">Class</div>Business</div>
            <div><div className="text-[10px] uppercase text-muted-foreground">Gate</div><span className="text-cyan-glow">{flight.gate}</span></div>
            <div><div className="text-[10px] uppercase text-muted-foreground">Terminal</div>{flight.terminal}</div>
          </div>
        </GlassCard>
        <div className="flex gap-3">
          <Link to="/checkin/passengers" className="inline-flex items-center gap-2 rounded-xl glass px-4 py-3 text-sm">
            <ArrowLeft className="size-4" /> Back
          </Link>
          <div className="flex-1"><PrimaryButton onClick={() => nav({ to: "/checkin/addons" })} disabled={!p?.seat}>Continue</PrimaryButton></div>
        </div>
      </div>
    </div>
  );
}
