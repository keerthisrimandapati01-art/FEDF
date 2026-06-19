import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AuthShell, Field, PrimaryButton } from "@/components/skyline/AuthShell";
import { useAuth } from "@/store/auth";

export const Route = createFileRoute("/auth/signup")({
  head: () => ({ meta: [{ title: "Create account · SkyLine Airways" }] }),
  component: Signup,
});

function Signup() {
  const nav = useNavigate();
  const login = useAuth((s) => s.login);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [err, setErr] = useState<Record<string, string>>({});

  const generateCaptcha = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    let result = "";

    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return result;
  };

  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [captchaInput, setCaptchaInput] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    const er: Record<string, string> = {};

    if (name.trim().length < 2) er.name = "Full name required";
    if (!/.+@.+\..+/.test(email)) er.email = "Valid email required";
    if (pwd.length < 6) er.pwd = "At least 6 characters";

    setErr(er);

    if (Object.keys(er).length) return;

    if (captchaInput !== captcha) {
      alert("Invalid CAPTCHA");
      setCaptcha(generateCaptcha());
      setCaptchaInput("");
      return;
    }

    login(email);
    // Version 1 MVP: Show success message instead of navigating
    alert("Account Created Successfully - Version 1 Demo");
  };

  return (
    <AuthShell
      title="Join SkyLine"
      subtitle="Unlock seamless check-in, miles and lounge access."
      footer={
        <>
          Already flying?{" "}
          <Link to="/auth/login" className="text-cyan-glow">
            Sign in
          </Link>
        </>
      }
    >
      <form className="space-y-4" onSubmit={submit}>
        <Field
          label="Full name"
          value={name}
          onChange={setName}
          error={err.name}
          placeholder="Aarav Sharma"
        />

        <Field
          label="Email"
          type="email"
          value={email}
          onChange={setEmail}
          error={err.email}
          placeholder="you@altitude.com"
        />

        <Field
          label="Password"
          type="password"
          value={pwd}
          onChange={setPwd}
          error={err.pwd}
        />

        <div>
          <label className="mb-2 block text-sm font-medium">
            Security Verification
          </label>

          <div className="mb-2 rounded-xl border border-cyan-glow p-3 text-center text-xl font-bold tracking-[6px] text-cyan-glow">
            {captcha}
          </div>

          <input
            type="text"
            placeholder="Enter CAPTCHA"
            value={captchaInput}
            onChange={(e) => setCaptchaInput(e.target.value)}
            className="w-full rounded-xl border border-white/20 bg-transparent p-3 outline-none"
          />

          <button
            type="button"
            onClick={() => setCaptcha(generateCaptcha())}
            className="mt-2 text-sm text-cyan-glow hover:underline"
          >
            Refresh CAPTCHA
          </button>
        </div>

        <PrimaryButton type="submit">Create account</PrimaryButton>
      </form>
    </AuthShell>
  );
}