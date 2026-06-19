import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type Props = HTMLMotionProps<"div"> & { glow?: boolean; children?: ReactNode };

export function GlassCard({ className, glow, children, ...rest }: Props) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className={cn("glass relative overflow-hidden rounded-2xl p-6", glow && "glow-ring", className)}
      {...rest}
    >
      <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      {children as ReactNode}
    </motion.div>
  );
}
