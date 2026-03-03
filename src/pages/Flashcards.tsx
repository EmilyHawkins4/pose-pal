import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { poses, CATEGORIES, type PoseCategory } from "@/data/poses";
import BottomNav from "@/components/BottomNav";
import { ArrowRight, RotateCcw, Shuffle } from "lucide-react";

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function Flashcards() {
  const [category, setCategory] = useState<PoseCategory | "all">("all");
  const [deck, setDeck] = useState(() => shuffleArray(poses));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [mode, setMode] = useState<"image-to-name" | "name-to-image">("image-to-name");

  const filtered = useMemo(
    () => (category === "all" ? deck : deck.filter(p => p.category === category)),
    [category, deck]
  );

  const current = filtered[currentIndex];

  const reshuffle = useCallback(() => {
    setDeck(shuffleArray(poses));
    setCurrentIndex(0);
    setFlipped(false);
  }, []);

  const next = () => {
    setFlipped(false);
    setTimeout(() => {
      setCurrentIndex(i => (i + 1) % filtered.length);
    }, 150);
  };

  if (!current) {
    return (
      <div className="min-h-screen flex items-center justify-center pb-20">
        <p className="text-muted-foreground font-body">No cards available.</p>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20">
      <div className="px-5 pt-12 pb-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="font-display text-3xl font-bold">Flashcards</h1>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMode(m => m === "image-to-name" ? "name-to-image" : "image-to-name")}
              className="p-2 rounded-lg bg-muted text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Switch mode"
            >
              <Shuffle className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Category filter */}
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-5 px-5 scrollbar-hide">
          <button
            onClick={() => { setCategory("all"); setCurrentIndex(0); setFlipped(false); }}
            className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-sm font-body font-medium transition-all ${
              category === "all" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}
          >
            All
          </button>
          {CATEGORIES.map(({ value, label, emoji }) => (
            <button
              key={value}
              onClick={() => { setCategory(value); setCurrentIndex(0); setFlipped(false); }}
              className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-sm font-body font-medium transition-all whitespace-nowrap ${
                category === value ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}
            >
              {emoji} {label}
            </button>
          ))}
        </div>

        <p className="text-xs text-muted-foreground font-body mt-2">
          {currentIndex + 1} / {filtered.length} · Tap card to flip · {mode === "image-to-name" ? "Image → Name" : "Name → Image"}
        </p>
      </div>

      {/* Card */}
      <div className="px-5 flex justify-center mt-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id + currentIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-sm"
          >
            <button
              onClick={() => setFlipped(!flipped)}
              className="w-full aspect-[3/4] rounded-2xl bg-card shadow-elevated overflow-hidden cursor-pointer perspective-1000 focus:outline-none"
            >
              <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
                {!flipped ? (
                  <>
                    {mode === "image-to-name" ? (
                      <span className="text-8xl mb-4">{current.emoji}</span>
                    ) : (
                      <>
                        <p className="font-display text-2xl font-bold">{current.englishName}</p>
                        <p className="font-display text-lg text-muted-foreground italic mt-1">{current.sanskritName}</p>
                      </>
                    )}
                    <p className="text-xs text-muted-foreground font-body mt-6">Tap to reveal</p>
                  </>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.05 }}
                  >
                    {mode === "image-to-name" ? (
                      <>
                        <p className="font-display text-2xl font-bold">{current.englishName}</p>
                        <p className="font-display text-lg text-muted-foreground italic mt-1">{current.sanskritName}</p>
                        <p className="text-xs text-muted-foreground font-body mt-4 capitalize">{current.category} · {current.difficulty}</p>
                      </>
                    ) : (
                      <>
                        <span className="text-8xl mb-4">{current.emoji}</span>
                        <p className="text-xs text-muted-foreground font-body mt-4 capitalize">{current.category} · {current.difficulty}</p>
                      </>
                    )}
                  </motion.div>
                )}
              </div>
            </button>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 mt-6 px-5">
        <button
          onClick={reshuffle}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-muted text-muted-foreground font-body text-sm font-medium hover:text-foreground transition-colors"
        >
          <RotateCcw className="w-4 h-4" /> Reshuffle
        </button>
        <button
          onClick={next}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-body text-sm font-medium hover:opacity-90 transition-opacity"
        >
          Next <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
