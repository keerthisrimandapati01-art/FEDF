import { createFileRoute, Link } from "@tanstack/react-router";
import { GlassCard } from "@/components/skyline/GlassCard";
import { useBooking } from "@/store/booking";
import { useAuth } from "@/store/auth";
import { Plane, TrendingUp, Calendar, MapPin, ArrowRight, Ticket, Bell } from "lucide-react";
import { AreaChart, Area, ResponsiveContainer, BarChart, Bar, XAxis, Tooltip } from "recharts";

export const Route = createFileRoute("/dashboard/")({
  component: DashHome,
});

const miles = [
  { m: "Jan", v: 320 }, { m: "Feb", v: 480 }, { m: "Mar", v: 410 },
  { m: "Apr", v: 620 }, { m: "May", v: 780 }, { m: "Jun", v: 1240 },
];
const trips = [
  { m: "Mon", v: 1 }, { m: "Tue", v: 2 }, { m: "Wed", v: 1 },
  { m: "Thu", v: 3 }, { m: "Fri", v: 2 }, { m: "Sat", v: 4 }, { m: "Sun", v: 1 },
];

function DashHome() {
  const { flight, passengers } = useBooking();
  const { user } = useAuth();
  const p = passengers[0];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-glow">Welcome aboard</p>
          <h1 className="mt-1 font-display text-3xl md:text-4xl">Hello, {user?.name ?? "Traveler"}.</h1>
        </div>
        <Link to="/checkin" className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky to-cyan-glow px-4 py-2 text-sm font-semibold text-[oklch(0.12_0.04_260)]">
          Start check-in <ArrowRight className="size-4" />
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <StatCard icon={TrendingUp} label="Miles earned" value="1,248" trend="+18%" />
        <StatCard icon={Plane} label="Flights this year" value="14" trend="+3" />
        <StatCard icon={MapPin} label="Countries visited" value="9" />
        <StatCard icon={Calendar} label="Next trip" value={flight.date} />
      </div>

      <div className="grid gap-4 md:grid-cols-[1.4fr_1fr]">
        <GlassCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-widest text-cyan-glow">Upcoming flight</div>
              <div className="mt-1 font-display text-2xl">{flight.number} · {flight.aircraft}</div>
            </div>
            <span className="rounded-full bg-cyan-glow/15 px-3 py-1 text-xs text-cyan-glow">{flight.status}</span>
          </div>
          <div className="mt-6 flex items-end justify-between">
            <div>
              <div className="font-display text-4xl">{flight.from.code}</div>
              <div className="text-xs text-muted-foreground">{flight.depart} · {flight.from.city}</div>
            </div>
            <div className="flex flex-col items-center text-muted-foreground">
              <div className="text-xs">{flight.duration}</div>
              <div className="my-1 flex w-32 items-center gap-1">
                <span className="h-px flex-1 bg-gradient-to-r from-cyan-glow to-sky" />
                <Plane className="size-4 -rotate-45 text-cyan-glow" />
                <span className="h-px flex-1 bg-gradient-to-r from-sky to-cyan-glow" />
              </div>
            </div>
            <div className="text-right">
              <div className="font-display text-4xl">{flight.to.code}</div>
              <div className="text-xs text-muted-foreground">{flight.arrive} · {flight.to.city}</div>
            </div>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Mini label="Seat" value={p.seat ?? "—"} />
            <Mini label="Gate" value={flight.gate} />
            <Mini label="Terminal" value={flight.terminal} />
            <Mini label="Date" value={flight.date} />
          </div>
          <div className="mt-5 flex gap-2">
            <Link to="/boarding-pass" className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky to-cyan-glow px-4 py-2 text-sm font-semibold text-[oklch(0.12_0.04_260)]">
              <Ticket className="size-4" /> Boarding pass
            </Link>
            <Link to="/notifications" className="inline-flex items-center gap-2 rounded-xl glass px-4 py-2 text-sm">
              <Bell className="size-4" /> Alerts
            </Link>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="text-xs uppercase tracking-widest text-cyan-glow">Miles trend</div>
          <div className="mt-2 font-display text-2xl">1,248 mi</div>
          <div className="mt-3 h-36">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={miles}>
                <defs>
                  <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.82 0.18 200)" stopOpacity={0.6}/>
                    <stop offset="100%" stopColor="oklch(0.82 0.18 200)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Tooltip contentStyle={{ background: "oklch(0.18 0.04 260)", border: "1px solid oklch(1 0 0 / 0.1)", borderRadius: 12, color: "white" }} />
                <Area type="monotone" dataKey="v" stroke="oklch(0.82 0.18 200)" strokeWidth={2} fill="url(#g1)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>

      <div className="grid gap-4 md:grid-cols-[1fr_1.4fr]">
        <GlassCard>
          <div className="text-xs uppercase tracking-widest text-cyan-glow">Weekly trips</div>
          <div className="mt-3 h-44">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trips}>
                <XAxis dataKey="m" stroke="oklch(0.7 0.03 250)" fontSize={11} />
                <Tooltip contentStyle={{ background: "oklch(0.18 0.04 260)", border: "1px solid oklch(1 0 0 / 0.1)", borderRadius: 12, color: "white" }} />
                <Bar dataKey="v" radius={[6,6,0,0]} fill="oklch(0.72 0.16 235)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
        <GlassCard>
          <div className="text-xs uppercase tracking-widest text-cyan-glow">Recent activity</div>
          <ul className="mt-3 space-y-3 text-sm">
            {[
              { t: "Check-in completed", s: "SL-204 · DEL → DXB", time: "2h ago" },
              { t: "Seat upgraded", s: "Premium row · 4F", time: "1d ago" },
              { t: "Miles earned", s: "+420 from SL-118", time: "3d ago" },
              { t: "Lounge visit", s: "SkyLine Lounge · DEL", time: "1w ago" },
            ].map((a) => (
              <li key={a.t} className="flex items-center justify-between rounded-xl bg-white/5 px-3 py-2">
                <div>
                  <div>{a.t}</div>
                  <div className="text-xs text-muted-foreground">{a.s}</div>
                </div>
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{a.time}</span>
              </li>
            ))}
          </ul>
        </GlassCard>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, trend }: { icon: typeof Plane; label: string; value: string; trend?: string }) {
  return (
    <GlassCard>
      <div className="flex items-start justify-between">
        <div className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-sky/30 to-cyan-glow/20"><Icon className="size-4 text-cyan-glow" /></div>
        {trend && <span className="text-xs text-cyan-glow">{trend}</span>}
      </div>
      <div className="mt-3 text-xs uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className="mt-1 font-display text-2xl">{value}</div>
    </GlassCard>
  );
}
function Mini({ label, value }: { label: string; value: string }) {
  return <div className="rounded-xl bg-white/5 p-3"><div className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div><div className="mt-1 text-sm font-medium">{value}</div></div>;
}
