import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/checkin/review")({
  component: ReviewRoute,
});

function ReviewRoute() {
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
  const bag = baggageTiers.find((t) => t.id === baggageId);
  const meal = meals.find((m) => m.id === mealIds[p.id]);
  const total = (bag?.price ?? 0) + (meal?.price ?? 0);

  return (
    <div className="grid gap-6 md:grid-cols-[1.4fr_1fr]">
      <div className="space-y-4">
        <GlassCard className="p-7">
          <div className="text-xs uppercase tracking-widest text-cyan-glow">Final review</div>
          <h2 className="mt-1 font-display text-2xl">Everything looks ready for takeoff.</h2>

          <div className="mt-6 flex items-end justify-between">
            <div>
              <div className="font-display text-4xl">{flight.from.code}</div>
              <div className="text-xs text-muted-foreground">{flight.depart} · {flight.from.city}</div>
            </div>
            <div className="flex flex-col items-center text-muted-foreground">
              <Plane className="size-5 -rotate-45 text-cyan-glow" />
              <div className="text-[10px]">{flight.duration}</div>
            </div>
            <div className="text-right">
              <div className="font-display text-4xl">{flight.to.code}</div>
              <div className="text-xs text-muted-foreground">{flight.arrive} · {flight.to.city}</div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4 border-t border-white/10 pt-4 sm:grid-cols-4">
            <Cell label="Passenger" value={`${p.firstName} ${p.lastName}`} />
            <Cell label="Seat" value={p.seat ?? "—"} highlight />
            <Cell label="Gate" value={flight.gate} highlight />
            <Cell label="PNR" value={pnr} />
            <Cell label="Date" value={flight.date} />
            <Cell label="Class" value="Business" />
            <Cell label="Aircraft" value={flight.aircraft} />
            <Cell label="Terminal" value={flight.terminal} />
          </div>
        </GlassCard>

        <GlassCard>
          <div className="text-xs uppercase tracking-widest text-muted-foreground">Add-ons</div>
          <div className="mt-3 space-y-2 text-sm">
            <Row label={`Baggage · ${bag?.kg}kg`} value={bag?.price === 0 ? "Free" : `$${bag?.price}`} />
            <Row label={`Meal · ${meal?.name ?? "—"}`} value={meal?.price === 0 ? "Included" : `$${meal?.price}`} />
            <div className="my-2 h-px bg-white/10" />
            <Row label="Total" value={`$${total}`} bold />
          </div>
        </GlassCard>
      </div>

      <div className="space-y-3 md:sticky md:top-28 md:self-start">
        <GlassCard glow>
          <div className="text-xs uppercase tracking-widest text-cyan-glow">Ready to confirm</div>
          <p className="mt-2 text-sm text-muted-foreground">By confirming, you agree to SkyLine's conditions of carriage.</p>
          <div className="mt-4">
            <PrimaryButton onClick={() => { complete(); nav({ to: "/checkin/confirmation" }); }}>
              Confirm check-in
            </PrimaryButton>
          </div>
          <Link to="/checkin/addons" className="mt-3 inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground">
            <ArrowLeft className="size-3" /> Edit add-ons
          </Link>
        </GlassCard>
      </div>
    </div>
  );
}

function Cell({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className={`mt-1 text-sm font-medium ${highlight ? "text-cyan-glow" : ""}`}>{value}</div>
    </div>
  );
}
function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return <div className="flex justify-between"><span className="text-muted-foreground">{label}</span><span className={bold ? "font-display text-lg text-cyan-glow" : ""}>{value}</span></div>;
}
