import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/checkin/confirmation")({
  component: Confirmation,
});

function Confirmation() {
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
