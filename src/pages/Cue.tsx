import { useMemo, useState } from "react";
import { Search, Eye, ChevronLeft, ChevronRight, Shuffle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { poses } from "@/data/poses";
import { useLanguagePreference } from "@/hooks/useLanguagePreference";
import BottomNav from "@/components/BottomNav";
import LanguageToggle from "@/components/LanguageToggle";
import { Input } from "@/components/ui/input";

export default function Cue() {
  const { language, setLanguage } = useLanguagePreference();
  const [search, setSearch] = useState("");
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return poses;
    return poses.filter(
      (p) =>
        p.englishName.toLowerCase().includes(q) ||
        p.sanskritName.toLowerCase().includes(q)
    );
  }, [search]);

  const safeIndex = filtered.length === 0 ? 0 : index % filtered.length;
  const pose = filtered[safeIndex];

  const goTo = (next: number) => {
    if (filtered.length === 0) return;
    const n = ((next % filtered.length) + filtered.length) % filtered.length;
    setIndex(n);
    setRevealed(false);
  };

  const shuffle = () => {
    if (filtered.length === 0) return;
    goTo(Math.floor(Math.random() * filtered.length));
  };

  return (
    <div className="min-h-screen pb-24">
      <div className="px-5 pt-5 pb-3">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h1 className="font-display text-3xl font-bold">Cue</h1>
          <LanguageToggle language={language} onChange={setLanguage} />
        </div>
        <p className="font-body text-sm text-muted-foreground mb-4">
          Practice cueing each pose. Picture the student, then reveal the alignment cues.
        </p>

        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setIndex(0);
              setRevealed(false);
            }}
            placeholder="Search poses…"
            className="pl-9"
          />
        </div>
      </div>

      <div className="px-5">
        {!pose ? (
          <p className="text-center text-sm text-muted-foreground font-body py-12">
            No poses match.
          </p>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={pose.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="rounded-2xl bg-card shadow-card overflow-hidden"
            >
              <div className="bg-sage-light flex items-center justify-center p-6">
                <img
                  src={pose.image}
                  alt={pose.englishName}
                  className="max-h-48 object-contain"
                />
              </div>

              <div className="p-5">
                <div className="mb-4">
                  {language === "sanskrit" ? (
                    <h2 className="font-display text-2xl font-semibold">{pose.sanskritName}</h2>
                  ) : language === "english" ? (
                    <h2 className="font-display text-2xl font-semibold">{pose.englishName}</h2>
                  ) : (
                    <>
                      <h2 className="font-display text-2xl font-semibold">{pose.englishName}</h2>
                      <p className="font-body text-sm text-muted-foreground mt-0.5">{pose.sanskritName}</p>
                    </>
                  )}
                </div>

                {!revealed ? (
                  <button
                    onClick={() => setRevealed(true)}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-primary text-primary-foreground font-body font-medium hover:bg-primary/90 transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    Reveal cues
                  </button>
                ) : (
                  <div className="rounded-xl border border-terracotta-light bg-terracotta-light/30 p-4">
                    <p className="text-xs uppercase tracking-wide font-body text-accent font-semibold mb-2">
                      Alignment cues
                    </p>
                    <ol className="space-y-2">
                      {pose.alignmentCues.map((cue, i) => (
                        <li key={i} className="flex gap-2 font-body text-sm">
                          <span className="text-accent font-semibold">{i + 1}.</span>
                          <span>{cue}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between border-t border-border px-3 py-2 bg-muted/30">
                <button
                  onClick={() => goTo(safeIndex - 1)}
                  className="inline-flex items-center gap-1 px-3 py-2 rounded-md text-sm font-body text-foreground hover:bg-background transition-colors"
                  aria-label="Previous pose"
                >
                  <ChevronLeft className="w-4 h-4" /> Prev
                </button>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground font-body">
                    {safeIndex + 1} / {filtered.length}
                  </span>
                  <button
                    onClick={shuffle}
                    className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-background transition-colors"
                    aria-label="Shuffle"
                  >
                    <Shuffle className="w-4 h-4" />
                  </button>
                </div>
                <button
                  onClick={() => goTo(safeIndex + 1)}
                  className="inline-flex items-center gap-1 px-3 py-2 rounded-md text-sm font-body text-foreground hover:bg-background transition-colors"
                  aria-label="Next pose"
                >
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
