import { createFileRoute, Outlet, useRouterState } from "@tanstack/react-router";
import { StepProgress } from "@/components/skyline/StepProgress";
import { motion, AnimatePresence } from "framer-motion";

const STEPS = ["Retrieve", "Passengers", "Seats", "Add-ons", "Review", "Confirmation"];
const PATH_MAP: Record<string, number> = {
  "/checkin": 0,
  "/checkin/passengers": 1,
  "/checkin/seats": 2,
  "/checkin/addons": 3,
  "/checkin/review": 4,
  "/checkin/confirmation": 5,
};

export const Route = createFileRoute("/checkin")({
  head: () => ({ meta: [{ title: "Online Check-In · SkyLine" }] }),
  component: CheckinLayout,
});

function CheckinLayout() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const current = PATH_MAP[path] ?? 0;
  return (
    <div className="mx-auto max-w-6xl px-4 pt-10 pb-24">
      <div className="mb-8 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-cyan-glow">SkyLine check-in</p>
        <h1 className="mt-2 font-display text-4xl md:text-5xl">Glide into your seat.</h1>
      </div>
      <StepProgress steps={STEPS} current={current} />
      <AnimatePresence mode="wait">
        <motion.div
          key={path}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="mt-8"
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
