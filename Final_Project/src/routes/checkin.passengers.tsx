import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { GlassCard } from "@/components/skyline/GlassCard";
import { Field, PrimaryButton } from "@/components/skyline/AuthShell";
import { useBooking, type Passenger } from "@/store/booking";
import { ArrowLeft, UserPlus, Trash2 } from "lucide-react";

export const Route = createFileRoute("/checkin/passengers")({
  component: Passengers,
});

function Passengers() {
  const nav = useNavigate();
  const { passengers, setPassengers } = useBooking();
  const [list, setList] = useState<Passenger[]>(passengers);

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
