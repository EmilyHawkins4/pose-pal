import { useMemo, useState } from "react";
import { Search, Eye, ChevronLeft, ChevronRight, Shuffle, Layers } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { poses } from "@/data/poses";
import { sharedCues } from "@/data/sharedCues";
import { useLanguagePreference } from "@/hooks/useLanguagePreference";
import BottomNav from "@/components/BottomNav";
import LanguageToggle from "@/components/LanguageToggle";
import { Input } from "@/components/ui/input";
import { categorizeCue, CATEGORY_META, type CueCategory } from "@/lib/cueCategory";
import { Link } from "react-router-dom";

const CATEGORY_ORDER: CueCategory[] = [
  "setup",
  "action",
  "checkpoint",
  "intention",
  "gaze",
  "breath",
  "hold",
];

type Mode = "browse" | "shared";

export default function Cue() {
  const { language, setLanguage } = useLanguagePreference();
  const [search, setSearch] = useState("");
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [activeFilter, setActiveFilter] = useState<CueCategory | "all">("all");

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
    setActiveFilter("all");
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
              <div className="flex flex-col md:flex-row">
                {/* Image column */}
                <div className="md:w-1/2 bg-sage-light flex items-center justify-center p-6 md:p-8 md:self-stretch">
                  <img
                    src={pose.image}
                    alt={pose.englishName}
                    className="max-h-48 md:max-h-[60vh] object-contain"
                  />
                </div>

                {/* Details column */}
                <div className="md:w-1/2 p-5 md:p-6 md:max-h-[70vh] md:overflow-y-auto">
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
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-1.5">
                        <button
                          onClick={() => setActiveFilter("all")}
                          className={`text-xs font-body px-2.5 py-1 rounded-full border transition-colors ${
                            activeFilter === "all"
                              ? "bg-foreground text-background border-foreground"
                              : "bg-background text-muted-foreground border-border hover:text-foreground"
                          }`}
                        >
                          All
                        </button>
                        {CATEGORY_ORDER.map((cat) => {
                          const count = pose.alignmentCues.filter(
                            (c) => categorizeCue(c) === cat
                          ).length;
                          if (count === 0) return null;
                          const meta = CATEGORY_META[cat];
                          const active = activeFilter === cat;
                          return (
                            <button
                              key={cat}
                              onClick={() => setActiveFilter(cat)}
                              title={meta.description}
                              className={`text-xs font-body px-2.5 py-1 rounded-full border transition-colors inline-flex items-center gap-1.5 ${
                                active
                                  ? meta.chipClass
                                  : "bg-background text-muted-foreground border-border hover:text-foreground"
                              }`}
                            >
                              <span className={`w-1.5 h-1.5 rounded-full ${meta.dotClass}`} />
                              {meta.label} <span className="opacity-60">{count}</span>
                            </button>
                          );
                        })}
                      </div>

                      <ol className="space-y-2">
                        {pose.alignmentCues
                          .map((cue, i) => ({ cue, i, cat: categorizeCue(cue) }))
                          .filter(({ cat }) => activeFilter === "all" || cat === activeFilter)
                          .map(({ cue, i, cat }) => {
                            const meta = CATEGORY_META[cat];
                            return (
                              <li
                                key={i}
                                className="flex gap-3 font-body text-sm rounded-lg border border-border/60 bg-card p-3"
                              >
                                <span
                                  className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${meta.dotClass}`}
                                  aria-hidden
                                />
                                <div className="flex-1 min-w-0">
                                  <span
                                    className={`inline-block text-[10px] uppercase tracking-wide font-semibold px-1.5 py-0.5 rounded border mb-1 ${meta.chipClass}`}
                                  >
                                    {meta.label}
                                  </span>
                                  <p>{cue}</p>
                                </div>
                              </li>
                            );
                          })}
                      </ol>
                    </div>
                  )}
                </div>
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
