import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Volume2 } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import PoseCard from "@/components/PoseCard";
import { sanskritRoots, getPosesUsingRoot, ROOT_CATEGORY_LABELS } from "@/data/sanskritRoots";
import { poses } from "@/data/poses";
import { useLanguagePreference } from "@/hooks/useLanguagePreference";

export default function RootDetail() {
  const { id } = useParams<{ id: string }>();
  const { language } = useLanguagePreference();
  const root = sanskritRoots.find((r) => r.id === id);

  const relatedPoses = useMemo(() => {
    if (!root) return [];
    const ids = getPosesUsingRoot(root.id);
    return ids.map((pid) => poses.find((p) => p.id === pid)).filter(Boolean) as typeof poses;
  }, [root]);

  const relatedRoots = useMemo(() => {
    if (!root?.relatedRootIds) return [];
    return root.relatedRootIds
      .map((rid) => sanskritRoots.find((r) => r.id === rid))
      .filter(Boolean) as typeof sanskritRoots;
  }, [root]);

  if (!root) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground font-body">Root not found.</p>
          <Link to="/roots" className="text-primary font-body text-sm mt-2 inline-block">
            ← Back to Roots
          </Link>
        </div>
      </div>
    );
  }

  const meta = ROOT_CATEGORY_LABELS[root.category];

  return (
    <div className="min-h-screen pb-24">
      <div className="px-5 pt-12 pb-2">
        <Link
          to="/roots"
          className="inline-flex items-center gap-1 font-body text-sm text-muted-foreground hover:text-foreground mb-3"
        >
          <ArrowLeft className="w-4 h-4" /> All roots
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl bg-sage-light p-6 text-center"
        >
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-background/70 text-xs font-body text-foreground/70">
            <span>{meta.emoji}</span> {meta.label}
          </span>
          <p className="font-display text-6xl mt-3 leading-none" lang="sa">
            {root.devanagari}
          </p>
          <h1 className="font-display text-3xl font-bold mt-3 italic">{root.sanskrit}</h1>
          <p className="font-body text-sm text-foreground/70 mt-1 inline-flex items-center gap-1.5">
            <Volume2 className="w-3.5 h-3.5" /> {root.pronunciation}
          </p>
          <p className="font-display text-xl text-primary mt-3">{root.meaning}</p>
        </motion.div>
      </div>

      {root.notes && (
        <div className="px-5 mt-5">
          <h2 className="font-display text-lg font-semibold mb-2">Teaching note</h2>
          <p className="font-body text-sm text-foreground/80 leading-relaxed">{root.notes}</p>
        </div>
      )}

      {relatedRoots.length > 0 && (
        <div className="px-5 mt-6">
          <h2 className="font-display text-lg font-semibold mb-2">Related roots</h2>
          <div className="flex flex-wrap gap-2">
            {relatedRoots.map((r) => (
              <Link
                key={r.id}
                to={`/roots/${r.id}`}
                className="px-3 py-1.5 rounded-full bg-card shadow-soft font-body text-sm hover:shadow-card transition-shadow"
              >
                <span className="font-display italic">{r.sanskrit}</span>
                <span className="text-muted-foreground"> — {r.meaning}</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="px-5 mt-8">
        <div className="flex items-baseline justify-between mb-3">
          <h2 className="font-display text-lg font-semibold">
            Poses using <span className="italic">{root.sanskrit}</span>
          </h2>
          <span className="font-body text-xs text-muted-foreground">{relatedPoses.length}</span>
        </div>
        {relatedPoses.length === 0 ? (
          <p className="font-body text-sm text-muted-foreground">
            No poses in the catalog use this root yet. Example: {root.example}
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {relatedPoses.map((p, i) => (
              <PoseCard key={p.id} pose={p} index={i} displayLanguage={language} />
            ))}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
