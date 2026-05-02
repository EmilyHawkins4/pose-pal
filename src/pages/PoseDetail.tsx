import { useParams, Link } from "react-router-dom";
import { poses } from "@/data/poses";
import { poseBreakdowns } from "@/data/sanskritRoots";
import { ArrowLeft, Star } from "lucide-react";
import { useBookmarks } from "@/hooks/useBookmarks";
import { motion } from "framer-motion";
import BottomNav from "@/components/BottomNav";

export default function PoseDetail() {
  const { id } = useParams<{ id: string }>();
  const pose = poses.find(p => p.id === id);
  const { isBookmarked, toggle } = useBookmarks();

  if (!pose) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground font-body">Pose not found.</p>
          <Link to="/asanas" className="text-primary font-body text-sm mt-2 inline-block">← Back to Browse</Link>
        </div>
      </div>
    );
  }

  const bookmarked = isBookmarked(pose.id);
  const breakdown = poseBreakdowns[pose.id];

  return (
    <div className="min-h-screen md:h-screen md:overflow-hidden pb-20 md:pb-16 flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3 md:px-6 md:py-4 flex-shrink-0">
        <Link
          to="/asanas"
          className="w-9 h-9 rounded-full bg-muted hover:bg-muted/70 flex items-center justify-center transition-colors"
          aria-label="Back"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <button
          onClick={() => toggle(pose.id)}
          className="w-9 h-9 rounded-full bg-muted hover:bg-muted/70 flex items-center justify-center transition-colors"
          aria-label={bookmarked ? "Unstar pose" : "Star pose"}
        >
          <Star className={`w-5 h-5 ${bookmarked ? "fill-accent text-accent" : "text-foreground"}`} />
        </button>
      </div>

      {/* Two-column layout */}
      <div className="flex-1 min-h-0 flex flex-col md:flex-row gap-4 md:gap-8 px-4 md:px-8 pb-4 md:pb-6 md:overflow-hidden">
        {/* Image column */}
        <div className="md:w-1/2 md:h-full flex items-center justify-center bg-sage-light rounded-2xl p-4 md:p-8 flex-shrink-0">
          <motion.img
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            src={pose.image}
            alt={pose.englishName}
            className="max-w-full max-h-[40vh] md:max-h-full object-contain"
          />
        </div>

        {/* Details column */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:w-1/2 md:h-full md:overflow-y-auto md:pr-2"
        >
          <div className="flex items-start gap-2 mb-1">
            <span className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-xs font-body capitalize">
              {pose.category}
            </span>
            <span className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-xs font-body capitalize">
              {pose.difficulty}
            </span>
          </div>
          <h1 className="font-display text-2xl md:text-3xl font-bold mt-1.5 leading-tight">{pose.englishName}</h1>
          <p className="font-display text-base md:text-lg text-muted-foreground italic">{pose.sanskritName}</p>

          <p className="font-body text-sm text-foreground/80 mt-3 leading-relaxed">{pose.description}</p>

          {breakdown && (
            <div className="mt-4">
              <h2 className="font-display text-lg font-semibold mb-2">Sanskrit Breakdown</h2>
              <div className="rounded-2xl bg-sage-light p-3 space-y-1.5">
                {breakdown.map((token, i) => {
                  const row = (
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="font-display text-sm font-semibold text-foreground">
                        {token.word}
                        {token.rootId && (
                          <span className="ml-1.5 font-body text-xs text-primary not-italic">↗</span>
                        )}
                      </span>
                      <span className="font-body text-xs text-foreground/70 text-right">{token.meaning}</span>
                    </div>
                  );
                  return token.rootId ? (
                    <Link
                      key={i}
                      to={`/roots/${token.rootId}`}
                      className="block -mx-2 px-2 py-0.5 rounded-lg hover:bg-background/40 transition-colors"
                    >
                      {row}
                    </Link>
                  ) : (
                    <div key={i}>{row}</div>
                  );
                })}
                <Link
                  to="/vocab"
                  className="block mt-2 pt-2 border-t border-border/50 font-body text-xs text-primary hover:underline"
                >
                  Learn more Sanskrit roots →
                </Link>
              </div>
            </div>
          )}

          <div className="mt-4">
            <h2 className="font-display text-lg font-semibold mb-2">Alignment Cues</h2>
            <ul className="space-y-1.5">
              {pose.alignmentCues.map((cue, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.04 }}
                  className="flex items-start gap-2.5 font-body text-sm text-foreground/80"
                >
                  <span className="w-5 h-5 rounded-full bg-sage-light text-primary flex items-center justify-center text-xs flex-shrink-0 mt-0.5 font-medium">
                    {i + 1}
                  </span>
                  {cue}
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
}
