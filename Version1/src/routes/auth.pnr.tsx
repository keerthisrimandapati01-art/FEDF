import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/pnr")({
  head: () => ({ meta: [{ title: "Find booking · SkyLine" }] }),
  component: PnrPage,
});

function PnrPage() {
  return (
    <div className="flex min-h-[calc(100vh-7rem)] items-center justify-center px-4">
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
    <AuthShell
      title="Retrieve booking"
      subtitle="Enter your PNR and family name to start check-in."
      footer={<Link to="/auth/login" className="text-cyan-glow">Have an account?</Link>}
    >
      <form className="space-y-4" onSubmit={submit}>
        <Field label="PNR / Reference" value={pnr} onChange={setPnrLocal} placeholder="SKY7HXQ" error={err.pnr} />
        <Field label="Last name" value={last} onChange={setLast} placeholder="Sharma" error={err.last} />
        <PrimaryButton type="submit">Find booking</PrimaryButton>
      </form>
    </AuthShell>
  );
}
