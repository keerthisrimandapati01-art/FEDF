import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AuthShell, Field, PrimaryButton } from "@/components/skyline/AuthShell";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/auth/forgot")({
  head: () => ({ meta: [{ title: "Reset password · SkyLine" }] }),
  component: Forgot,
});

function Forgot() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  return (
    <AuthShell
      title="Forgot password"
      subtitle="We'll beam a reset link to your inbox."
      footer={<Link to="/auth/login" className="text-cyan-glow">Back to sign in</Link>}
    >
      {sent ? (
        <div className="flex flex-col items-center text-center">
          <CheckCircle2 className="mb-3 size-10 text-cyan-glow" />
          <p className="text-sm text-muted-foreground">Reset link sent to <span className="text-foreground">{email}</span>. Check your inbox.</p>
        </div>
      ) : (
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
          <Field label="Email" type="email" value={email} onChange={setEmail} placeholder="you@altitude.com" />
          <PrimaryButton type="submit">Send reset link</PrimaryButton>
        </form>
      )}
    </AuthShell>
  );
}
