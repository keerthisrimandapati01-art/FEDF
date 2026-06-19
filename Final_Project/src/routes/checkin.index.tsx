import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Field, PrimaryButton } from "@/components/skyline/AuthShell";
import { GlassCard } from "@/components/skyline/GlassCard";
import { useBooking } from "@/store/booking";
import { Plane, Users, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/checkin/")({
  component: Retrieve,
});

function Retrieve() {
  const nav = useNavigate();
  const { pnr, setPnr, flight } = useBooking();
  const [code, setCode] = useState(pnr);
  const [last, setLast] = useState("Sharma");

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
