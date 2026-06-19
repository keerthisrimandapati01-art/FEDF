import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/checkin/passengers")({
  component: Passengers,
});

function Passengers() {
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

  const update = (i: number, patch: Partial<Passenger>) =>
    setList((l) => l.map((p, idx) => (idx === i ? { ...p, ...patch } : p)));

  const add = () => setList((l) => [...l, {
    id: `p${l.length + 1}`, firstName: "", lastName: "", email: "", passport: "", nationality: "", dob: "",
  }]);
  const remove = (i: number) => setList((l) => l.filter((_, idx) => idx !== i));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setPassengers(list);
    nav({ to: "/checkin/seats" });
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      {list.map((p, i) => (
        <GlassCard key={p.id} className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-widest text-cyan-glow">Passenger {i + 1}</div>
              <div className="font-display text-lg">{p.firstName || "New traveler"} {p.lastName}</div>
            </div>
            {list.length > 1 && (
              <button type="button" onClick={() => remove(i)} className="rounded-lg glass p-2 text-muted-foreground hover:text-destructive">
                <Trash2 className="size-4" />
              </button>
            )}
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="First name" value={p.firstName} onChange={(v) => update(i, { firstName: v })} />
            <Field label="Last name" value={p.lastName} onChange={(v) => update(i, { lastName: v })} />
            <Field label="Email" type="email" value={p.email} onChange={(v) => update(i, { email: v })} />
            <Field label="Date of birth" type="date" value={p.dob} onChange={(v) => update(i, { dob: v })} />
            <Field label="Passport / ID number" value={p.passport} onChange={(v) => update(i, { passport: v })} />
            <Field label="Nationality" value={p.nationality} onChange={(v) => update(i, { nationality: v })} />
          </div>
        </GlassCard>
      ))}

      <button type="button" onClick={add} className="flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-white/15 py-4 text-sm text-muted-foreground hover:bg-white/5">
        <UserPlus className="size-4" /> Add another passenger
      </button>

      <div className="flex items-center justify-between gap-3 pt-4">
        <Link to="/checkin" className="inline-flex items-center gap-2 rounded-xl glass px-4 py-3 text-sm">
          <ArrowLeft className="size-4" /> Back
        </Link>
        <div className="w-full max-w-xs"><PrimaryButton type="submit">Continue to seats</PrimaryButton></div>
      </div>
    </form>
  );
}
