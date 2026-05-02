import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronDown, Search, Star } from "lucide-react";
import {
  sanskritRoots,
  ROOT_CATEGORY_LABELS,
  getPosesUsingRoot,
  type SanskritRoot,
} from "@/data/sanskritRoots";
import { useStarredRoots } from "@/hooks/useStarredRoots";

/** Browse + search Sanskrit roots (no page chrome). */
export default function VocabBrowse() {
  const [query, setQuery] = useState("");
  const [primerOpen, setPrimerOpen] = useState(false);
  const { isStarred, toggle: toggleStar } = useStarredRoots();

  const grouped = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = q
      ? sanskritRoots.filter(
          (r) =>
            r.sanskrit.toLowerCase().includes(q) ||
            r.simple.toLowerCase().includes(q) ||
            r.meaning.toLowerCase().includes(q)
        )
      : sanskritRoots;

    const map = new Map<SanskritRoot["category"], SanskritRoot[]>();
    for (const r of filtered) {
      if (!map.has(r.category)) map.set(r.category, []);
      map.get(r.category)!.push(r);
    }
    return map;
  }, [query]);

  const order: SanskritRoot["category"][] = [
    "core",
    "number",
    "direction",
    "body",
    "shape",
    "deity",
    "quality",
    "action",
    "concept",
  ];

  return (
    <div>
      {/* Search */}
      <div className="px-5 pb-2">
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search roots or meanings..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-muted font-body text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>

        {/* Primer */}
        <button
          onClick={() => setPrimerOpen((o) => !o)}
          className="w-full flex items-center justify-between p-3 rounded-xl bg-terracotta-light text-left"
          aria-expanded={primerOpen}
        >
          <span className="font-display text-sm font-semibold text-foreground">How asana names are built</span>
          <ChevronDown className={`w-4 h-4 text-foreground/70 transition-transform ${primerOpen ? "rotate-180" : ""}`} />
        </button>
        {primerOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="overflow-hidden"
          >
            <div className="p-4 mt-2 rounded-xl bg-card shadow-soft space-y-3">
              <p className="font-body text-sm text-foreground/80 leading-relaxed">
                Most asana names follow a predictable pattern:
              </p>
              <p className="font-display text-sm text-foreground/80 italic text-center bg-sage-light/40 rounded-lg p-2.5">
                [modifier] + [body part] + [shape / figure] + āsana
              </p>
              <div className="space-y-2">
                <p className="font-body text-xs uppercase tracking-wide text-muted-foreground">Worked example</p>
                <p className="font-display text-base">
                  <span className="text-primary">Parivṛtta</span> + <span className="text-primary">Pārśva</span> +{" "}
                  <span className="text-primary">Koṇa</span> + āsana
                </p>
                <p className="font-body text-sm text-foreground/70">
                  Revolved + Side + Angle + Pose = <em>Revolved Side-Angle Pose</em>
                </p>
              </div>
              <p className="font-body text-xs text-muted-foreground">
                Recognize one root and you can usually guess what kind of pose it is.
              </p>
            </div>
          </motion.div>
        )}
      </div>

      <div className="px-5 mt-4 space-y-6">
        {order.map((cat) => {
          const items = grouped.get(cat);
          if (!items || items.length === 0) return null;
          const meta = ROOT_CATEGORY_LABELS[cat];
          return (
            <section key={cat}>
              <h2 className="font-display text-lg font-semibold mb-2 flex items-center gap-2">
                <span>{meta.emoji}</span> {meta.label}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {items.map((r, i) => {
                  const poseCount = getPosesUsingRoot(r.id).length;
                  return (
                    <motion.div
                      key={r.id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.02 }}
                    >
                      <Link
                        to={`/roots/${r.id}`}
                        className="block p-3 rounded-xl bg-card shadow-soft hover:shadow-card transition-shadow"
                      >
                        <div className="flex items-baseline justify-between gap-2">
                          <div className="flex items-baseline gap-2 min-w-0">
                            <p className="font-display text-lg font-semibold italic truncate">{r.sanskrit}</p>
                          </div>
                          <p className="font-body text-sm text-primary flex-shrink-0">{r.meaning}</p>
                        </div>
                        <div className="flex items-center justify-between mt-1">
                          <p className="font-body text-xs text-muted-foreground">{r.pronunciation}</p>
                          {poseCount > 0 && (
                            <span className="font-body text-xs text-muted-foreground">
                              {poseCount} {poseCount === 1 ? "pose" : "poses"}
                            </span>
                          )}
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </section>
          );
        })}
        {grouped.size === 0 && (
          <p className="text-center font-body text-sm text-muted-foreground py-12">
            No roots match "{query}".
          </p>
        )}
      </div>
    </div>
  );
}
