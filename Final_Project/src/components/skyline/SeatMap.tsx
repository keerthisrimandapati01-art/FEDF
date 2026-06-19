import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  selected?: string;
  onSelect: (seat: string) => void;
  occupied?: string[];
};

const ROWS = 24;
const COLS = ["A", "B", "C", "D", "E", "F"] as const;

const occupiedDefault = ["1A","2C","3F","5B","6E","8A","10D","12C","14F","16B","18A","20E"];

export function SeatMap({ selected, onSelect, occupied = occupiedDefault }: Props) {
  return (
    <div className="glass rounded-3xl p-6">
      <div className="mx-auto max-w-md">
        <div className="mb-4 flex justify-center text-xs text-muted-foreground">
          <div className="rounded-t-[100px] border border-white/15 border-b-0 px-12 py-3">Cockpit</div>
        </div>
        <div className="grid gap-1.5">
          {Array.from({ length: ROWS }).map((_, r) => {
            const row = r + 1;
            const isPremium = row <= 4;
            const isExit = row === 12;
            return (
              <div key={row} className="flex items-center gap-2">
                <div className="w-6 text-center text-[10px] text-muted-foreground">{row}</div>
                <div className="flex flex-1 gap-1">
                  {COLS.slice(0, 3).map((c) => {
                    const id = `${row}${c}`;
                    return (
                      <Seat key={c} id={id} selected={selected === id} occupied={occupied.includes(id)} premium={isPremium} onSelect={onSelect} />
                    );
                  })}
                  <div className={cn("w-3 text-center text-[9px] text-muted-foreground", isExit && "text-cyan-glow")}>
                    {isExit ? "↔" : ""}
                  </div>
                  {COLS.slice(3).map((c) => {
                    const id = `${row}${c}`;
                    return (
                      <Seat key={c} id={id} selected={selected === id} occupied={occupied.includes(id)} premium={isPremium} onSelect={onSelect} />
                    );
                  })}
                </div>
                <div className="w-6 text-center text-[10px] text-muted-foreground">{row}</div>
              </div>
            );
          })}
        </div>
        <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs text-muted-foreground">
          <Legend swatch="bg-white/10 border border-white/15" label="Available" />
          <Legend swatch="bg-gradient-to-br from-sky to-cyan-glow" label="Selected" />
          <Legend swatch="bg-[oklch(0.78_0.14_220)]/30 border border-cyan-glow/40" label="Premium" />
          <Legend swatch="bg-white/5 border border-white/10 opacity-60" label="Occupied" />
        </div>
      </div>
    </div>
  );
}

function Seat({ id, selected, occupied, premium, onSelect }: { id: string; selected: boolean; occupied: boolean; premium: boolean; onSelect: (s: string) => void }) {
  return (
    <motion.button
      whileHover={!occupied ? { scale: 1.1 } : undefined}
      whileTap={!occupied ? { scale: 0.95 } : undefined}
      disabled={occupied}
      onClick={() => onSelect(id)}
      title={`Seat ${id}${premium ? " · Premium" : ""}`}
      className={cn(
        "h-7 flex-1 rounded-md text-[10px] font-medium transition",
        occupied && "cursor-not-allowed bg-white/5 border border-white/10 text-muted-foreground/40",
        !occupied && !selected && !premium && "bg-white/10 border border-white/15 text-foreground/70 hover:bg-white/20",
        !occupied && !selected && premium && "bg-[oklch(0.78_0.14_220)]/20 border border-cyan-glow/40 text-cyan-glow",
        selected && "bg-gradient-to-br from-sky to-cyan-glow text-[oklch(0.12_0.04_260)] shadow-[var(--shadow-glow)]",
      )}
    >
      {id.slice(-1)}
    </motion.button>
  );
}

function Legend({ swatch, label }: { swatch: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className={cn("inline-block size-3 rounded", swatch)} />
      <span>{label}</span>
    </div>
  );
}
