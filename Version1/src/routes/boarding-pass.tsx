import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/boarding-pass")({
  head: () => ({ meta: [{ title: "Boarding Pass · SkyLine" }] }),
  component: BoardingPassRoute,
});

function BoardingPassRoute() {
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

  const boardingTarget = new Date();
  boardingTarget.setHours(boardingTarget.getHours() + 9);

  const downloadPdf = () => {
    const doc = new jsPDF({ unit: "pt", format: [800, 380] });
    doc.setFillColor(20, 26, 50);
    doc.rect(0, 0, 800, 380, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("SkyLine Airways", 40, 50);
    doc.setFontSize(10);
    doc.setTextColor(150, 200, 255);
    doc.text("BOARDING PASS", 40, 68);

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(50);
    doc.text(flight.from.code, 40, 160);
    doc.text(flight.to.code, 360, 160);
    doc.setFontSize(10);
    doc.setTextColor(180, 200, 230);
    doc.text(flight.from.city, 40, 180);
    doc.text(flight.to.city, 360, 180);

    doc.setFontSize(11);
    doc.setTextColor(255, 255, 255);
    const rows: [string, string][] = [
      ["Passenger", `${p.firstName} ${p.lastName}`],
      ["Flight", flight.number],
      ["Date", flight.date],
      ["Boarding", flight.depart],
      ["Seat", p.seat ?? "—"],
      ["Gate", flight.gate],
      ["Terminal", flight.terminal],
      ["PNR", pnr],
    ];
    rows.forEach(([k, v], i) => {
      const x = 40 + (i % 4) * 180;
      const y = 240 + Math.floor(i / 4) * 50;
      doc.setTextColor(150, 200, 255);
      doc.setFontSize(8);
      doc.text(k.toUpperCase(), x, y);
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(13);
      doc.text(v, x, y + 18);
    });

    doc.setDrawColor(120, 180, 230);
    doc.setLineDashPattern([4, 4], 0);
    doc.line(580, 20, 580, 360);

    doc.setFontSize(10);
    doc.setTextColor(180, 200, 230);
    doc.text(`Seat ${p.seat ?? "—"}  ·  Gate ${flight.gate}`, 610, 340);

    doc.save(`skyline-${flight.number}-boarding-pass.pdf`);
    toast.success("Boarding pass downloaded");
  };

  return (
    <div className="mx-auto max-w-6xl px-4 pt-10 pb-24">
      <Toaster position="top-center" theme="dark" />
      <div className="mb-8 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-cyan-glow">Ready to fly</p>
        <h1 className="mt-2 font-display text-4xl md:text-5xl">Your boarding pass.</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div ref={passRef} className="flex justify-center">
          <BoardingPass />
        </div>

        <div className="space-y-3">
          <GlassCard glow>
            <div className="text-xs uppercase tracking-widest text-cyan-glow">Boarding starts in</div>
            <div className="mt-3">
              <CountdownTimer target={boardingTarget} />
            </div>
          </GlassCard>

          <GlassCard>
            <div className="flex flex-col gap-2">
              <button onClick={downloadPdf} className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky to-cyan-glow px-4 py-3 text-sm font-semibold text-[oklch(0.12_0.04_260)]">
                <Download className="size-4" /> Download PDF
              </button>
              <button onClick={() => { navigator.clipboard?.writeText(`SkyLine ${flight.number} · Seat ${p.seat ?? "—"} · Gate ${flight.gate}`); toast.success("Pass link copied"); }} className="inline-flex items-center justify-center gap-2 rounded-xl glass px-4 py-3 text-sm hover:bg-white/10">
                <Share2 className="size-4" /> Share
              </button>
            </div>
          </GlassCard>

          <GlassCard>
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Notifications</div>
            <div className="mt-3 space-y-2 text-sm">
              <Toggle icon={Bell} label="Gate change alerts" defaultOn />
              <Toggle icon={Mail} label="Email reminders" defaultOn />
              <Toggle icon={Smartphone} label="SMS boarding call" />
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}

function Toggle({ icon: Icon, label, defaultOn }: { icon: typeof Bell; label: string; defaultOn?: boolean }) {
  return (
    <label className="flex items-center justify-between rounded-xl bg-white/5 px-3 py-2">
      <span className="flex items-center gap-2"><Icon className="size-4 text-cyan-glow" /> {label}</span>
      <input type="checkbox" defaultChecked={defaultOn} className="accent-cyan-glow" />
    </label>
  );
}
