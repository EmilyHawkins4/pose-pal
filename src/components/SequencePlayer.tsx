import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { YogaPose } from "@/data/poses";

interface SequencePlayerProps {
  poses: YogaPose[];
  onClose: () => void;
}

export default function SequencePlayer({ poses, onClose }: SequencePlayerProps) {
  const [index, setIndex] = useState(0);
  const pose = poses[index];

  const next = () => setIndex((i) => Math.min(i + 1, poses.length - 1));
  const prev = () => setIndex((i) => Math.max(i - 1, 0));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [poses.length, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] bg-background flex flex-col"
    >
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-border">
        <button
          onClick={onClose}
          className="p-2 text-muted-foreground hover:text-foreground"
          aria-label="Close player"
        >
          <X className="w-5 h-5" />
        </button>
        <p className="font-body text-sm text-muted-foreground">
          {index + 1} / {poses.length}
        </p>
        <div className="w-9" />
      </header>

      {/* Progress */}
      <div className="h-1 bg-muted">
        <div
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${((index + 1) / poses.length) * 100}%` }}
        />
      </div>

      {/* Pose */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-6 overflow-hidden">
        <motion.div
          key={pose.id + index}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.25 }}
          className="flex flex-col items-center text-center w-full max-w-md"
        >
          <div className="w-full aspect-square max-w-sm bg-sage-light rounded-2xl flex items-center justify-center p-6 mb-6 shadow-soft">
            <img src={pose.image} alt={pose.englishName} className="w-full h-full object-contain" />
          </div>
          <h2 className="font-display text-3xl font-semibold leading-tight">{pose.englishName}</h2>
          <p className="font-display text-xl text-muted-foreground mt-1">{pose.sanskritName}</p>
          <p className="text-xs uppercase tracking-wider text-muted-foreground font-body mt-3">
            {pose.category}
          </p>
        </motion.div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between gap-3 px-6 py-5 border-t border-border safe-area-bottom">
        <button
          onClick={prev}
          disabled={index === 0}
          className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-full bg-card border border-border font-body font-medium disabled:opacity-40"
        >
          <ChevronLeft className="w-5 h-5" /> Prev
        </button>
        <button
          onClick={next}
          disabled={index === poses.length - 1}
          className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-full bg-primary text-primary-foreground font-body font-medium disabled:opacity-40"
        >
          Next <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
}
