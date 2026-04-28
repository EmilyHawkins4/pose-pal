import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Search } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { sanskritRoots, ROOT_CATEGORY_LABELS, type SanskritRoot } from "@/data/sanskritRoots";

export default function SanskritRoots() {
  const [query, setQuery] = useState("");

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

  const order: SanskritRoot["category"][] = ["core", "number", "direction", "body", "shape", "quality", "action"];

  return (
    <div className="min-h-screen pb-24">
      <div className="px-5 pt-12 pb-2">
        <Link
          to="/learn"
          className="inline-flex items-center gap-1 font-body text-sm text-muted-foreground hover:text-foreground mb-2"
        >
          <ArrowLeft className="w-4 h-4" /> Learn
        </Link>
        <h1 className="font-display text-3xl font-bold">Sanskrit Roots</h1>
        <p className="font-body text-sm text-muted-foreground mt-1">
          Learn the building blocks of asana names. Recognize a root, decode any pose.
        </p>
      </div>

      <div className="px-5 mt-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search roots or meanings..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-card shadow-soft font-body text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </div>
      </div>

      <div className="px-5 mt-6 space-y-6">
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
                {items.map((r, i) => (
                  <motion.div
                    key={r.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.02 }}
                    className="p-3 rounded-xl bg-card shadow-soft"
                  >
                    <div className="flex items-baseline justify-between gap-2">
                      <p className="font-display text-lg font-semibold">{r.sanskrit}</p>
                      <p className="font-body text-sm text-primary">{r.meaning}</p>
                    </div>
                    <p className="font-body text-xs text-muted-foreground mt-1 italic">{r.example}</p>
                  </motion.div>
                ))}
              </div>
            </section>
          );
        })}
        {grouped.size === 0 && (
          <p className="text-center font-body text-sm text-muted-foreground py-12">No roots match "{query}".</p>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
