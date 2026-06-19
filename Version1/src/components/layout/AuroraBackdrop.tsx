export function AuroraBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 aurora-bg opacity-90" />
      <div className="absolute inset-0 grid-overlay opacity-40" />
      <div className="absolute -top-40 left-1/3 size-[36rem] rounded-full bg-[oklch(0.55_0.2_240)] opacity-20 blur-3xl animate-float" />
      <div className="absolute top-1/2 -right-32 size-[28rem] rounded-full bg-[oklch(0.6_0.2_200)] opacity-20 blur-3xl animate-float" style={{ animationDelay: "1.5s" }} />
      <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </div>
  );
}
