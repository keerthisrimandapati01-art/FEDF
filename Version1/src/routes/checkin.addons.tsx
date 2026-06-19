import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/checkin/addons")({
  component: AddonsRoute,
});

function AddonsRoute() {
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

  const baggagePrice = baggageTiers.find((t) => t.id === baggageId)?.price ?? 0;
  const mealPrice = meals.find((m) => m.id === mealIds[p.id])?.price ?? 0;
  const total = baggagePrice + mealPrice;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
      <div className="space-y-8">
        <section>
          <div className="mb-3 flex items-center gap-2">
            <Luggage className="size-5 text-cyan-glow" />
            <h2 className="font-display text-2xl">Baggage</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {baggageTiers.map((t) => {
              const active = baggageId === t.id;
              return (
                <motion.button
                  key={t.id}
                  onClick={() => setBaggage(t.id)}
                  whileHover={{ y: -2 }}
                  className={`group relative overflow-hidden rounded-2xl border p-5 text-left transition ${
                    active ? "border-cyan-glow/60 bg-gradient-to-br from-sky/15 to-cyan-glow/10 shadow-[var(--shadow-glow)]" : "border-white/10 bg-white/5 hover:bg-white/10"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-display text-xl">{t.kg} kg</div>
                      <div className="text-xs text-muted-foreground">{t.label}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-cyan-glow font-display text-lg">{t.price === 0 ? "Free" : `₹${t.price}`}</div>
                    </div>
                  </div>
                  <p className="mt-3 text-xs text-muted-foreground">{t.desc}</p>
                  {active && <div className="mt-3 inline-flex items-center gap-1 text-xs text-cyan-glow"><Check className="size-3" /> Selected</div>}
                </motion.button>
              );
            })}
          </div>
        </section>

        <section>
          <h2 className="font-display text-2xl">Meal preference</h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {meals.map((m) => {
              const active = mealIds[p.id] === m.id;
              return (
                <motion.button
                  key={m.id}
                  whileHover={{ y: -2 }}
                  onClick={() => setMeal(p.id, m.id)}
                  className={`relative overflow-hidden rounded-2xl border p-5 text-left transition ${
                    active ? "border-cyan-glow/60 bg-gradient-to-br from-sky/15 to-cyan-glow/10 shadow-[var(--shadow-glow)]" : "border-white/10 bg-white/5 hover:bg-white/10"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <m.icon className={`size-6 ${active ? "text-cyan-glow" : "text-muted-foreground"}`} />
                    <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] uppercase tracking-widest">{m.tag}</span>
                  </div>
                  <div className="mt-3 font-display text-lg">{m.name}</div>
                  <p className="mt-1 text-xs text-muted-foreground">{m.desc}</p>
                  <div className="mt-3 text-sm text-cyan-glow">{m.price === 0 ? "Included" : `+₹${m.price}`}</div>
                </motion.button>
              );
            })}
          </div>
        </section>
      </div>

      <div className="space-y-3 lg:sticky lg:top-28 lg:self-start">
        <GlassCard>
          <div className="text-xs uppercase tracking-widest text-cyan-glow">Summary</div>
          <div className="mt-4 space-y-2 text-sm">
            <Row label={`Baggage · ${baggageTiers.find((t) => t.id === baggageId)?.kg}kg`} value={baggagePrice === 0 ? "Free" : `₹${baggagePrice}`} />
            <Row label={`Meal · ${meals.find((m) => m.id === mealIds[p.id])?.name ?? "—"}`} value={mealPrice === 0 ? "Included" : `₹${mealPrice}`} />
            <div className="my-3 h-px bg-white/10" />
            <Row label="Total add-ons" value={`₹${total}`} bold />
          </div>
        </GlassCard>
        <div className="flex gap-3">
          <Link to="/checkin/seats" className="inline-flex items-center gap-2 rounded-xl glass px-4 py-3 text-sm">
            <ArrowLeft className="size-4" /> Back
          </Link>
          <div className="flex-1"><PrimaryButton onClick={() => nav({ to: "/checkin/review" })}>Review</PrimaryButton></div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className={bold ? "font-display text-lg text-cyan-glow" : ""}>{value}</span>
    </div>
  );
}
