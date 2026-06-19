import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import confetti from "canvas-confetti";
import { GlassCard } from "@/components/skyline/GlassCard";
import { BoardingPass } from "@/components/skyline/BoardingPass";
import { CheckCircle2, Home, Ticket } from "lucide-react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/checkin/confirmation")({
  component: Confirmation,
});

function Confirmation() {
  useEffect(() => {
    const fire = () => confetti({
      particleCount: 80, spread: 75, origin: { y: 0.3 },
      colors: ["#7dd3fc", "#38bdf8", "#a5f3fc", "#ffffff"],
    });
    fire();
    const t = setTimeout(fire, 600);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="glass-strong relative overflow-hidden rounded-3xl p-10 text-center"
      >
        <div className="pointer-events-none absolute inset-0 aurora-bg opacity-70" />
        <div className="relative">
          <motion.div
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.1 }}
            className="mx-auto mb-4 grid size-16 place-items-center rounded-full bg-gradient-to-br from-sky to-cyan-glow text-[oklch(0.12_0.04_260)]"
          >
            <CheckCircle2 className="size-9" />
          </motion.div>
          <h1 className="font-display text-4xl md:text-5xl">You're checked in.</h1>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            Your boarding pass is ready. We've sent a copy to your email and you'll receive gate alerts in real time.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link to="/boarding-pass" className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky to-cyan-glow px-5 py-3 text-sm font-semibold text-[oklch(0.12_0.04_260)] shadow-[var(--shadow-glow)]">
              <Ticket className="size-4" /> View boarding pass
            </Link>
            <Link to="/" className="inline-flex items-center gap-2 rounded-xl glass px-5 py-3 text-sm">
              <Home className="size-4" /> Back to home
            </Link>
          </div>
        </div>
      </motion.div>

      <GlassCard className="flex justify-center p-4 md:p-8">
        <BoardingPass />
      </GlassCard>
    </div>
  );
}
