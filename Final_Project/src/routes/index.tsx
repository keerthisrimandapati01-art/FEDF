import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Plane, ShieldCheck, Sparkles, Zap, Globe2, Ticket, ArrowRight, Star } from "lucide-react";
import { GlassCard } from "@/components/skyline/GlassCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SkyLine Airways — Soar Beyond" },
      { name: "description", content: "Premium futuristic airline experience. Check in, pick seats, customize meals and download your boarding pass." },
    ],
  }),
  component: Landing,
});

const stats = [
  { v: "180+", l: "Destinations" },
  { v: "98.4%", l: "On-time score" },
  { v: "4.9★", l: "Cabin rating" },
  { v: "12M", l: "Happy flyers" },
];

const features = [
  { icon: Plane, title: "60-second check-in", desc: "Glide through verification with biometric-grade flow and zero friction." },
  { icon: Sparkles, title: "Immersive seat map", desc: "Live availability, premium tiers, exit-row hints — all in one cinematic view." },
  { icon: Ticket, title: "Boarding pass studio", desc: "Beautifully designed pass with QR, PDF download and Apple Wallet ready." },
  { icon: Zap, title: "Real-time alerts", desc: "Gate changes, boarding countdown and arrival nudges, the moment they happen." },
  { icon: ShieldCheck, title: "Trusted security", desc: "PNR + OTP layered auth. Multi-passenger and family flows out of the box." },
  { icon: Globe2, title: "Built for the world", desc: "Multi-currency, multi-locale and tuned for travelers across every continent." },
];

function Landing() {
  return (
    <div className="mx-auto max-w-7xl px-4">
      {/* HERO */}
      <section className="relative pt-16 pb-24 md:pt-24 md:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs">
            <span className="size-1.5 animate-pulse rounded-full bg-cyan-glow" />
            <span className="text-muted-foreground">Now boarding — Summer schedule 2026</span>
          </div>
          <h1 className="font-display text-5xl font-semibold leading-[1.05] md:text-7xl">
            The cinematic way to <span className="text-gradient-sky">soar</span>.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base text-muted-foreground md:text-lg">
            A reimagined airline platform — luxury, futuristic and frictionless. From check-in to boarding, every pixel made to fly.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/checkin"
              className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky to-cyan-glow px-5 py-3 text-sm font-semibold text-[oklch(0.12_0.04_260)] shadow-[var(--shadow-glow)] transition hover:opacity-95"
            >
              Start check-in
              <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
            </Link>
            <Link to="/auth/signup" className="inline-flex items-center gap-2 rounded-xl glass px-5 py-3 text-sm">
              Create account
            </Link>
          </div>
        </motion.div>

        {/* Floating plane */}
        <motion.div
          aria-hidden
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative mx-auto mt-16 max-w-5xl"
        >
          <div className="glass-strong relative overflow-hidden rounded-3xl p-6 md:p-10">
            <div className="grid gap-6 md:grid-cols-[1.4fr_1fr]">
              <div className="relative h-64 overflow-hidden rounded-2xl bg-gradient-to-br from-[oklch(0.22_0.08_260)] to-[oklch(0.18_0.1_220)] md:h-80">
                <div className="absolute inset-0 grid-overlay opacity-50" />
                <motion.div
                  initial={{ x: -120, y: 40 }}
                  animate={{ x: 200, y: -10 }}
                  transition={{ duration: 8, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                  className="absolute"
                >
                  <Plane className="size-24 -rotate-45 text-cyan-glow drop-shadow-[0_0_30px_oklch(0.82_0.18_200/0.7)]" />
                </motion.div>
                <div className="absolute bottom-4 left-4 text-xs uppercase tracking-widest text-muted-foreground">
                  Flight SL-204 · DEL → DXB
                </div>
              </div>
              <div className="space-y-3">
                <SearchRow from="DEL" to="DXB" date="12 Jun · 21:40" price="₹4890" />
                <SearchRow from="BOM" to="SIN" date="15 Jun · 01:30" price="₹6120" />
                <SearchRow from="BLR" to="LHR" date="18 Jun · 03:15" price="₹8450" />
                <SearchRow from="HYD" to="JFK" date="22 Jun · 23:50" price="₹11,200" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="mx-auto mt-10 grid max-w-4xl grid-cols-2 gap-3 md:grid-cols-4">
          {stats.map((s) => (
            <GlassCard key={s.l} className="text-center">
              <div className="font-display text-3xl text-gradient-sky">{s.v}</div>
              <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{s.l}</div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-16">
        <div className="mb-10 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-glow">The platform</p>
          <h2 className="mt-2 font-display text-4xl md:text-5xl">An ecosystem, not just an app.</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <GlassCard className="h-full">
                <div className="mb-4 grid size-11 place-items-center rounded-xl bg-gradient-to-br from-sky/30 to-cyan-glow/20">
                  <f.icon className="size-5 text-cyan-glow" />
                </div>
                <h3 className="font-display text-lg">{f.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{f.desc}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-16">
        <div className="mb-10 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-glow">From gate to gate</p>
          <h2 className="mt-2 font-display text-4xl md:text-5xl">Four steps to the sky.</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          {["Verify PNR","Pick your seat","Add baggage & meals","Get boarding pass"].map((step, i) => (
            <GlassCard key={step}>
              <div className="text-xs uppercase tracking-widest text-cyan-glow">Step {i + 1}</div>
              <div className="mt-2 font-display text-xl">{step}</div>
              <div className="mt-3 h-1 w-12 rounded-full bg-gradient-to-r from-sky to-cyan-glow" />
            </GlassCard>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-16">
        <div className="mb-10 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-glow">Travelers say</p>
          <h2 className="mt-2 font-display text-4xl md:text-5xl">Loved at 38,000 feet.</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { who: "Priya · Frequent Flyer", quote: "Finally an airline app that doesn't feel like 2008. Stunning." },
            { who: "Marco · Pilot", quote: "The seat map is the most beautiful thing on my phone." },
            { who: "Aiko · Designer", quote: "Boarding pass alone is portfolio-worthy. Take notes, industry." },
          ].map((t) => (
            <GlassCard key={t.who}>
              <div className="flex gap-0.5">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="size-3.5 fill-cyan-glow text-cyan-glow" />)}</div>
              <p className="mt-3 text-sm text-foreground">"{t.quote}"</p>
              <div className="mt-3 text-xs text-muted-foreground">{t.who}</div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="glass-strong relative overflow-hidden rounded-3xl p-10 text-center">
          <div className="pointer-events-none absolute inset-0 aurora-bg opacity-70" />
          <div className="relative">
            <h2 className="font-display text-3xl md:text-5xl">Your seat is waiting.</h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">Try the full SkyLine flow — check-in, seats, meals, and a downloadable boarding pass.</p>
            <Link
              to="/checkin"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky to-cyan-glow px-6 py-3 text-sm font-semibold text-[oklch(0.12_0.04_260)] shadow-[var(--shadow-glow)]"
            >
              Begin boarding <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function SearchRow({ from, to, date, price }: { from: string; to: string; date: string; price: string }) {
  return (
    <div className="glass flex items-center justify-between rounded-xl px-4 py-3">
      <div className="flex items-center gap-3">
        <span className="font-display text-lg">{from}</span>
        <Plane className="size-3.5 -rotate-45 text-cyan-glow" />
        <span className="font-display text-lg">{to}</span>
      </div>
      <div className="text-right">
        <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{date}</div>
        <div className="text-sm text-cyan-glow">{price}</div>
      </div>
    </div>
  );
}
