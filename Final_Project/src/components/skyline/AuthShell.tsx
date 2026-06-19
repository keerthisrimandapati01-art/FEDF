import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Plane } from "lucide-react";
import type { ReactNode } from "react";

export function AuthShell({ title, subtitle, children, footer }: {
  title: string; subtitle: string; children: ReactNode; footer?: ReactNode;
}) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-4 pt-12 pb-24">
      <Link to="/" className="mb-6 flex items-center gap-2">
        <div className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-sky to-cyan-glow glow-ring">
          <Plane className="size-5 -rotate-45 text-[oklch(0.12_0.04_260)]" />
        </div>
        <span className="font-display text-xl font-semibold">SkyLine</span>
      </Link>
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-strong w-full rounded-3xl p-8 shadow-[var(--shadow-elevated)]"
      >
        <h1 className="font-display text-2xl font-semibold">{title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
        <div className="mt-6">{children}</div>
      </motion.div>
      {footer && <div className="mt-6 text-sm text-muted-foreground">{footer}</div>}
    </div>
  );
}

export function Field({
  label, type = "text", value, onChange, placeholder, error,
}: {
  label: string; type?: string; value: string;
  onChange: (v: string) => void; placeholder?: string; error?: string;
}) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-widest text-muted-foreground">{label}</span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-xl glass px-4 py-3 outline-none transition focus:ring-2 focus:ring-sky"
      />
      {error && <span className="mt-1 block text-xs text-destructive">{error}</span>}
    </label>
  );
}

export function PrimaryButton({ children, ...rest }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...rest}
      className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-sky to-cyan-glow px-4 py-3 text-sm font-semibold text-[oklch(0.12_0.04_260)] shadow-[var(--shadow-glow)] transition hover:opacity-95 disabled:opacity-60"
    >
      <span className="relative z-10">{children}</span>
      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition group-hover:translate-x-full duration-700" />
    </button>
  );
}
