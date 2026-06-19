import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { AuthShell, PrimaryButton } from "@/components/skyline/AuthShell";

export const Route = createFileRoute("/auth/otp")({
  head: () => ({ meta: [{ title: "Verify OTP · SkyLine" }] }),
  component: OtpPage,
});

function OtpPage() {
  const nav = useNavigate();
  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  const set = (i: number, v: string) => {
    if (!/^\d?$/.test(v)) return;
    const next = [...digits];
    next[i] = v;
    setDigits(next);
    if (v && i < 5) refs.current[i + 1]?.focus();
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    nav({ to: "/dashboard" });
  };

  return (
    <AuthShell
      title="Verify it's you"
      subtitle="Enter the 6-digit code we sent to your phone."
      footer={<Link to="/auth/login" className="text-cyan-glow">Use another account</Link>}
    >
      <form className="space-y-5" onSubmit={submit}>
        <div className="flex justify-between gap-2">
          {digits.map((d, i) => (
            <input
              key={i}
              ref={(el) => { refs.current[i] = el; }}
              value={d}
              onChange={(e) => set(i, e.target.value)}
              onKeyDown={(e) => { if (e.key === "Backspace" && !digits[i] && i > 0) refs.current[i-1]?.focus(); }}
              inputMode="numeric"
              maxLength={1}
              className="size-12 rounded-xl glass text-center text-xl font-display outline-none transition focus:ring-2 focus:ring-sky"
            />
          ))}
        </div>
        <PrimaryButton type="submit">Verify & continue</PrimaryButton>
        <p className="text-center text-xs text-muted-foreground">Didn't get a code? <button type="button" className="text-cyan-glow">Resend in 30s</button></p>
      </form>
    </AuthShell>
  );
}
