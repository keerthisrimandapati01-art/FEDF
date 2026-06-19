import { Plane, Github, Twitter, Linkedin } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="mt-32 border-t border-white/5">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-sky to-cyan-glow">
              <Plane className="size-5 -rotate-45 text-[oklch(0.12_0.04_260)]" />
            </div>
            <span className="font-display text-lg font-semibold">SkyLine Airways</span>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            The cinematic way to fly. Designed for the next generation of travelers.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Platform</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/checkin">Online Check-In</Link></li>
            <li><Link to="/boarding-pass">Boarding Pass</Link></li>
            <li><Link to="/notifications">Flight Alerts</Link></li>
            <li><Link to="/dashboard">Dashboard</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Company</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>About</li><li>Careers</li><li>Press</li><li>Sustainability</li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Newsletter</h4>
          <p className="mt-3 text-sm text-muted-foreground">Get jet-fresh updates on routes and offers.</p>
          <form className="mt-3 flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="you@altitude.com"
              className="flex-1 rounded-lg glass px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky"
            />
            <button className="rounded-lg bg-gradient-to-r from-sky to-cyan-glow px-3 py-2 text-sm font-medium text-[oklch(0.12_0.04_260)]">
              Join
            </button>
          </form>
        </div>
      </div>
      <div className="border-t border-white/5">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-xs text-muted-foreground md:flex-row">
          <span>© {new Date().getFullYear()} SkyLine Airways. Soaring beyond.</span>
          <div className="flex gap-3">
            <Twitter className="size-4 hover:text-foreground" />
            <Github className="size-4 hover:text-foreground" />
            <Linkedin className="size-4 hover:text-foreground" />
          </div>
        </div>
      </div>
    </footer>
  );
}
