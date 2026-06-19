import { Link, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, Plane, Ticket, Bell, LogOut, Luggage } from "lucide-react";
import { useAuth } from "@/store/auth";

const items = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Overview" },
  { to: "/checkin", icon: Plane, label: "Check-In" },
  { to: "/boarding-pass", icon: Ticket, label: "Boarding Pass" },
  { to: "/notifications", icon: Bell, label: "Alerts" },
];

export function DashboardSidebar() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const { user, logout } = useAuth();

  return (
    <aside className="glass-strong sticky top-24 hidden h-[calc(100vh-7rem)] w-64 flex-col rounded-2xl p-4 md:flex">
      <div className="flex items-center gap-3 rounded-xl glass p-3">
        <div className="size-10 rounded-full bg-gradient-to-br from-sky to-cyan-glow grid place-items-center font-semibold text-[oklch(0.12_0.04_260)]">
          {user?.name?.[0] ?? "G"}
        </div>
        <div className="min-w-0">
          <div className="truncate text-sm font-medium">{user?.name ?? "Guest"}</div>
          <div className="text-[10px] uppercase tracking-widest text-cyan-glow">{user?.tier ?? "Member"}</div>
        </div>
      </div>

      <nav className="mt-4 flex flex-col gap-1">
        {items.map((it) => {
          const active = path === it.to || (it.to !== "/dashboard" && path.startsWith(it.to));
          return (
            <Link
              key={it.to}
              to={it.to}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
                active ? "bg-gradient-to-r from-sky/20 to-cyan-glow/10 text-foreground" : "text-muted-foreground hover:bg-white/5"
              }`}
            >
              <it.icon className="size-4" />
              {it.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto space-y-1">
        <div className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-muted-foreground">
          <Luggage className="size-4" /> 1,248 miles
        </div>
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-muted-foreground hover:bg-white/5"
        >
          <LogOut className="size-4" /> Sign out
        </button>
      </div>
    </aside>
  );
}
