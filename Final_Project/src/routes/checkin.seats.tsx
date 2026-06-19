import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { GlassCard } from "@/components/skyline/GlassCard";
import { PrimaryButton } from "@/components/skyline/AuthShell";
import { SeatMap } from "@/components/skyline/SeatMap";
import { useBooking } from "@/store/booking";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/checkin/seats")({
  component: SeatsRoute,
});

function SeatsRoute() {
  const nav = useNavigate();
  const { passengers, assignSeat, flight } = useBooking();
  const p = passengers[0];

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
