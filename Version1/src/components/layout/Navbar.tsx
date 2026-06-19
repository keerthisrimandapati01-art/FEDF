import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Plane, Menu, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/store/auth";

const links = [
  { to: "/", label: "Home" },
  { to: "/checkin", label: "Check-In" },
  { to: "/boarding-pass", label: "Boarding Pass" },
  { to: "/notifications", label: "Alerts" },
  { to: "/dashboard", label: "Dashboard" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const user = useAuth((s) => s.user);
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-50 w-full"
    >
      <div className="mx-auto mt-4 max-w-7xl px-4">
        <div className="glass-strong flex items-center justify-between rounded-2xl px-5 py-3">
          <Link to="/" className="flex items-center gap-2">
            <div className="relative grid size-9 place-items-center rounded-xl bg-gradient-to-br from-sky to-cyan-glow glow-ring">
              <Plane className="size-5 -rotate-45 text-[oklch(0.12_0.04_260)]" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display text-base font-semibold tracking-tight">SkyLine</span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Airways</span>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="relative rounded-lg px-3 py-1.5 text-sm text-muted-foreground transition hover:bg-white/5 hover:text-foreground"
                activeProps={{ className: "text-foreground bg-white/10" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            {user ? (
              <Link to="/dashboard" className="flex items-center gap-2 rounded-xl glass px-3 py-1.5 text-sm">
                <div className="size-7 rounded-full bg-gradient-to-br from-sky to-cyan-glow grid place-items-center text-xs font-semibold text-[oklch(0.12_0.04_260)]">
                  {user.name[0]}
                </div>
                <span className="hidden lg:inline">{user.name}</span>
              </Link>
            ) : (
              <>
                <Link to="/auth/login" className="rounded-xl px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground">
                  Sign in
                </Link>
                <Link
                  to="/auth/signup"
                  className="rounded-xl bg-gradient-to-r from-sky to-cyan-glow px-4 py-1.5 text-sm font-medium text-[oklch(0.12_0.04_260)] shadow-[var(--shadow-glow)] transition hover:opacity-90"
                >
                  Join SkyLine
                </Link>
              </>
            )}
          </div>

          <button className="md:hidden text-foreground" onClick={() => setOpen((v) => !v)} aria-label="Menu">
            {open ? <X /> : <Menu />}
          </button>
        </div>

        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-strong mt-2 rounded-2xl p-3 md:hidden"
          >
            <div className="flex flex-col gap-1">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-white/5 hover:text-foreground"
                >
                  {l.label}
                </Link>
              ))}
              {!user && (
                <div className="mt-2 flex gap-2">
                  <Link to="/auth/login" onClick={() => setOpen(false)} className="flex-1 rounded-lg glass px-3 py-2 text-center text-sm">
                    Sign in
                  </Link>
                  <Link
                    to="/auth/signup"
                    onClick={() => setOpen(false)}
                    className="flex-1 rounded-lg bg-gradient-to-r from-sky to-cyan-glow px-3 py-2 text-center text-sm font-medium text-[oklch(0.12_0.04_260)]"
                  >
                    Join
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
}
