import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/checkin/")({
  component: Retrieve,
});

function Retrieve() {
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
    <div className="grid gap-6 md:grid-cols-[1.1fr_1fr]">
      <GlassCard className="p-8">
        <h2 className="font-display text-2xl">Find your booking</h2>
        <p className="mt-1 text-sm text-muted-foreground">Enter your PNR and family name to retrieve your trip.</p>
        <form
          className="mt-6 space-y-4"
          onSubmit={(e) => { e.preventDefault(); setPnr(code.toUpperCase()); nav({ to: "/checkin/passengers" }); }}
        >
          <Field label="PNR / Booking reference" value={code} onChange={setCode} placeholder="SKY7HXQ" />
          <Field label="Last name" value={last} onChange={setLast} placeholder="Sharma" />
          <PrimaryButton type="submit">Continue</PrimaryButton>
        </form>
        <p className="mt-4 text-xs text-muted-foreground">
          Don't have an account? <Link to="/auth/signup" className="text-cyan-glow">Create one</Link>
        </p>
      </GlassCard>

      <div className="space-y-4">
        <GlassCard>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-sky to-cyan-glow"><Plane className="size-5 -rotate-45 text-[oklch(0.12_0.04_260)]" /></div>
              <div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Upcoming flight</div>
                <div className="font-display text-lg">{flight.number}</div>
              </div>
            </div>
            <div className="rounded-full bg-cyan-glow/15 px-3 py-1 text-xs text-cyan-glow">{flight.status}</div>
          </div>
          <div className="mt-5 flex items-end justify-between">
            <div>
              <div className="font-display text-3xl">{flight.from.code}</div>
              <div className="text-xs text-muted-foreground">{flight.depart} · {flight.from.city}</div>
            </div>
            <div className="flex-1 px-4 text-center text-xs text-muted-foreground">{flight.duration}</div>
            <div className="text-right">
              <div className="font-display text-3xl">{flight.to.code}</div>
              <div className="text-xs text-muted-foreground">{flight.arrive} · {flight.to.city}</div>
            </div>
          </div>
        </GlassCard>
        <div className="grid grid-cols-2 gap-3">
          <GlassCard>
            <Users className="size-5 text-cyan-glow" />
            <div className="mt-3 font-display text-xl">Multi-passenger</div>
            <p className="mt-1 text-xs text-muted-foreground">Family & group check-in.</p>
          </GlassCard>
          <GlassCard>
            <ShieldCheck className="size-5 text-cyan-glow" />
            <div className="mt-3 font-display text-xl">Secure</div>
            <p className="mt-1 text-xs text-muted-foreground">PNR + OTP verified.</p>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
