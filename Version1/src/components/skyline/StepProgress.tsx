import { Check } from "lucide-react";
import { motion } from "framer-motion";

export function StepProgress({ steps, current }: { steps: string[]; current: number }) {
  return (
    <div className="glass-strong rounded-2xl p-4">
      <div className="flex items-center justify-between gap-2">
        {steps.map((s, i) => {
          const done = i < current;
          const active = i === current;
          return (
            <div key={s} className="flex flex-1 items-center gap-2 last:flex-none">
              <div className="flex items-center gap-2">
                <motion.div
                  initial={false}
                  animate={{
                    backgroundColor: done || active ? "oklch(0.78 0.14 220)" : "oklch(0.28 0.05 260)",
                    scale: active ? 1.1 : 1,
                  }}
                  className="grid size-8 place-items-center rounded-full text-xs font-semibold text-[oklch(0.12_0.04_260)]"
                >
                  {done ? <Check className="size-4" /> : i + 1}
                </motion.div>
                <span className={`hidden text-xs sm:block ${active ? "text-foreground font-medium" : "text-muted-foreground"}`}>{s}</span>
              </div>
              {i < steps.length - 1 && (
                <div className="relative h-px flex-1 bg-white/10">
                  <motion.div
                    initial={false}
                    animate={{ width: done ? "100%" : "0%" }}
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-sky to-cyan-glow"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
