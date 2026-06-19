import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AuthShell, Field, PrimaryButton } from "@/components/skyline/AuthShell";
import { useBooking } from "@/store/booking";

export const Route = createFileRoute("/auth/pnr")({
  head: () => ({ meta: [{ title: "Find booking · SkyLine" }] }),
  component: PnrPage,
});

function PnrPage() {
  const nav = useNavigate();
  const setPnr = useBooking((s) => s.setPnr);
  const [pnr, setPnrLocal] = useState("");
  const [last, setLast] = useState("");
  const [err, setErr] = useState<Record<string,string>>({});

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const er: Record<string,string> = {};
    if (pnr.length < 5) er.pnr = "PNR must be 6 characters";
    if (last.length < 2) er.last = "Required";
    setErr(er);
    if (Object.keys(er).length) return;
    setPnr(pnr.toUpperCase());
    nav({ to: "/checkin/passengers" });
  };

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
