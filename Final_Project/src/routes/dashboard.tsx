import { createFileRoute, Outlet } from "@tanstack/react-router";
import { DashboardSidebar } from "@/components/layout/Sidebar";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard · SkyLine" }] }),
  component: DashLayout,
});

function DashLayout() {
  return (
    <div className="mx-auto max-w-7xl px-4 pt-8 pb-24">
      <div className="flex gap-6">
        <DashboardSidebar />
        <div className="min-w-0 flex-1"><Outlet /></div>
      </div>
    </div>
  );
}
