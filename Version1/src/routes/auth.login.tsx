import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AuthShell, Field, PrimaryButton } from "@/components/skyline/AuthShell";
import { useAuth } from "@/store/auth";

export const Route = createFileRoute("/auth/login")({
  head: () => ({ meta: [{ title: "Sign in · SkyLine Airways" }] }),
  component: Login,
});

function Login() {
  const nav = useNavigate();
  const login = useAuth((s) => s.login);

  const [email, setEmail] = useState("aarav@skyline.app");
  const [password, setPassword] = useState("••••••••");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

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

    const er: typeof errors = {};

    if (!/.+@.+\..+/.test(email)) er.email = "Enter a valid email";
    if (password.length < 4) er.password = "Min 4 characters";

    setErrors(er);

    if (Object.keys(er).length) return;

    if (captchaInput !== captcha) {
      alert("Invalid CAPTCHA");
      setCaptcha(generateCaptcha());
      setCaptchaInput("");
      return;
    }

    login(email);
    // Version 1 MVP: Show success message instead of navigating
    alert("Login Successful - Version 1 Demo");
  };

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to access your flights, miles and boarding passes."
      footer={
        <>
          No account?{" "}
          <Link to="/auth/signup" className="text-cyan-glow">
            Create one
          </Link>
        </>
      }
    >
      <form className="space-y-4" onSubmit={submit}>
        <Field
          label="Email"
          type="email"
          value={email}
          onChange={setEmail}
          error={errors.email}
        />

        <Field
          label="Password"
          type="password"
          value={password}
          onChange={setPassword}
          error={errors.password}
        />

        {/* CAPTCHA */}
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

        <div className="flex items-center justify-between text-xs">
          <label className="flex items-center gap-2 text-muted-foreground">
            <input type="checkbox" className="accent-cyan-glow" />
            Remember me
          </label>

          <Link to="/auth/forgot" className="text-cyan-glow">
            Forgot password?
          </Link>
        </div>

        <PrimaryButton type="submit">Sign in</PrimaryButton>

        <div className="relative my-2 text-center text-xs text-muted-foreground">
          <span className="bg-transparent px-2">or continue with</span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            className="rounded-xl glass py-2 text-sm hover:bg-white/10"
          >
            Apple
          </button>

          <button
            type="button"
            className="rounded-xl glass py-2 text-sm hover:bg-white/10"
          >
            Google
          </button>
        </div>
      </form>
    </AuthShell>
  );
}