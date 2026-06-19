import { QRCodeSVG } from "qrcode.react";
import { Plane } from "lucide-react";
import { useBooking } from "@/store/booking";

export function BoardingPass({ id = "boarding-pass" }: { id?: string }) {
  const { flight, passengers, pnr } = useBooking();
  const p = passengers[0];
  return (
    <div
      id={id}
      className="relative grid w-full max-w-3xl overflow-hidden rounded-3xl border border-white/15 bg-[oklch(0.18_0.045_262)] text-foreground shadow-[var(--shadow-elevated)] md:grid-cols-[1fr_240px]"
    >
      <div className="relative p-7">
        <div className="pointer-events-none absolute inset-0 aurora-bg opacity-60" />
        <div className="relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-sky to-cyan-glow">
                <Plane className="size-5 -rotate-45 text-[oklch(0.12_0.04_260)]" />
              </div>
              <div>
                <div className="font-display text-lg font-semibold">SkyLine Airways</div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Boarding Pass</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-muted-foreground">Flight</div>
              <div className="font-display text-xl">{flight.number}</div>
            </div>
          </div>

          <div className="mt-7 flex items-end justify-between gap-4">
            <div>
              <div className="text-[11px] uppercase tracking-widest text-muted-foreground">From</div>
              <div className="font-display text-5xl">{flight.from.code}</div>
              <div className="text-xs text-muted-foreground">{flight.from.city}</div>
            </div>
            <div className="flex flex-col items-center text-muted-foreground">
              <div className="text-xs">{flight.duration}</div>
              <div className="my-1 flex w-32 items-center gap-1">
                <span className="size-1.5 rounded-full bg-cyan-glow" />
                <span className="h-px flex-1 bg-gradient-to-r from-cyan-glow to-sky" />
                <Plane className="size-4 -rotate-45 text-cyan-glow" />
                <span className="h-px flex-1 bg-gradient-to-r from-sky to-cyan-glow" />
                <span className="size-1.5 rounded-full bg-cyan-glow" />
              </div>
              <div className="text-[10px]">{flight.aircraft}</div>
            </div>
            <div className="text-right">
              <div className="text-[11px] uppercase tracking-widest text-muted-foreground">To</div>
              <div className="font-display text-5xl">{flight.to.code}</div>
              <div className="text-xs text-muted-foreground">{flight.to.city}</div>
            </div>
          </div>

          <div className="mt-7 grid grid-cols-2 gap-4 border-t border-white/10 pt-5 sm:grid-cols-4">
            <Field label="Passenger" value={`${p.firstName} ${p.lastName}`} />
            <Field label="Date" value={flight.date} />
            <Field label="Boarding" value={flight.depart} />
            <Field label="Seat" value={p.seat ?? "—"} highlight />
            <Field label="Gate" value={flight.gate} highlight />
            <Field label="Terminal" value={flight.terminal} />
            <Field label="Class" value="Business" />
            <Field label="PNR" value={pnr} />
          </div>
        </div>
      </div>

      <div className="relative flex flex-col items-center justify-between border-l border-dashed border-white/15 bg-[oklch(0.14_0.04_260)] p-6 text-center">
        <div>
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground">SkyLine</div>
          <div className="font-display text-base">{flight.number}</div>
        </div>
        <div className="rounded-xl bg-white p-3">
          <QRCodeSVG
            value={`SKYLINE|${flight.number}|${p.firstName}${p.lastName}|${p.seat ?? ""}|${pnr}`}
            size={140}
            level="H"
            bgColor="#ffffff"
            fgColor="#0a1530"
          />
        </div>
        <div className="text-[10px] text-muted-foreground">Seat {p.seat ?? "—"} · Gate {flight.gate}</div>
      </div>
    </div>
  );
}

function Field({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className={`mt-1 font-medium ${highlight ? "text-cyan-glow" : "text-foreground"}`}>{value}</div>
    </div>
  );
}
