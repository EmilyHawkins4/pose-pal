import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sanskritRoots } from "@/data/sanskritRoots";
import { ArrowRight, RotateCcw, Shuffle } from "lucide-react";
import SectionTabs from "@/components/SectionTabs";
import { VOCAB_TABS } from "@/pages/Vocab";

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/** Sanskrit root flashcards: root ↔ English meaning. */
export default function VocabFlashcards() {
  const [deck, setDeck] = useState(() => shuffleArray(sanskritRoots));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [mode, setMode] = useState<"root-to-meaning" | "meaning-to-root">("root-to-meaning");

  const current = deck[currentIndex];

  const reshuffle = useCallback(() => {
    setDeck(shuffleArray(sanskritRoots));
    setCurrentIndex(0);
    setFlipped(false);
  }, []);

  const next = () => {
    setFlipped(false);
    setTimeout(() => setCurrentIndex((i) => (i + 1) % deck.length), 150);
  };

  if (!current) return null;

  return (
    <div>
      <div className="px-5 pb-2 flex items-center justify-between gap-2">
        <SectionTabs tabs={VOCAB_TABS} />
        <button
          onClick={() => setMode((m) => (m === "root-to-meaning" ? "meaning-to-root" : "root-to-meaning"))}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-muted text-muted-foreground hover:text-foreground text-sm font-body font-medium transition-colors whitespace-nowrap"
          aria-label="Switch direction"
        >
          <Shuffle className="w-4 h-4" />
          {mode === "root-to-meaning" ? "Root→Mean" : "Mean→Root"}
        </button>
      </div>

      <p className="px-5 text-xs text-muted-foreground font-body">
        {currentIndex + 1} / {deck.length} · Tap card to flip ·{" "}
        {mode === "root-to-meaning" ? "Root → Meaning" : "Meaning → Root"}
      </p>

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
              className="w-full aspect-[3/4] rounded-2xl bg-card shadow-elevated overflow-hidden cursor-pointer focus:outline-none"
            >
              <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
                {!flipped ? (
                  mode === "root-to-meaning" ? (
                    <>
                      <p className="font-display text-5xl mb-3" lang="sa">{current.devanagari}</p>
                      <p className="font-display text-2xl italic">{current.sanskrit}</p>
                      <p className="font-body text-xs text-muted-foreground mt-2">{current.pronunciation}</p>
                      <p className="text-xs text-muted-foreground font-body mt-6">Tap to reveal</p>
                    </>
                  ) : (
                    <>
                      <p className="font-display text-3xl font-bold">{current.meaning}</p>
                      <p className="text-xs text-muted-foreground font-body mt-6">Tap to reveal</p>
                    </>
                  )
                ) : (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.05 }}>
                    {mode === "root-to-meaning" ? (
                      <>
                        <p className="font-display text-3xl font-bold text-primary">{current.meaning}</p>
                        {current.notes && (
                          <p className="font-body text-xs text-muted-foreground mt-3 leading-relaxed">{current.notes}</p>
                        )}
                      </>
                    ) : (
                      <>
                        <p className="font-display text-5xl mb-3" lang="sa">{current.devanagari}</p>
                        <p className="font-display text-2xl italic">{current.sanskrit}</p>
                        <p className="font-body text-xs text-muted-foreground mt-2">{current.pronunciation}</p>
                      </>
                    )}
                  </motion.div>
                )}
              </div>
            </button>
          </motion.div>
        </AnimatePresence>
      </div>

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
    </div>
  );
}
