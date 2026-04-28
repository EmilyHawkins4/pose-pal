import { useParams, Link } from "react-router-dom";
import { poses } from "@/data/poses";
import { poseBreakdowns } from "@/data/sanskritRoots";
import { ArrowLeft, Bookmark } from "lucide-react";
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
          <Link to="/browse" className="text-primary font-body text-sm mt-2 inline-block">← Back to Browse</Link>
        </div>
      </div>
    );
  }

  const bookmarked = isBookmarked(pose.id);

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <div className="relative">
        <div className="aspect-[4/3] bg-sage-light flex items-center justify-center p-8">
          <motion.img
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            src={pose.image}
            alt={pose.englishName}
            className="max-h-full max-w-full object-contain"
          />
        </div>
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <Link
            to="/browse"
            className="w-9 h-9 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <button
            onClick={() => toggle(pose.id)}
            className="w-9 h-9 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center"
            aria-label={bookmarked ? "Remove bookmark" : "Bookmark pose"}
          >
            <Bookmark className={`w-5 h-5 ${bookmarked ? "fill-accent text-accent" : "text-foreground"}`} />
          </button>
        </div>
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-5 pt-5"
      >
        <div className="flex items-start gap-2 mb-1">
          <span className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-xs font-body capitalize">
            {pose.category}
          </span>
          <span className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-xs font-body capitalize">
            {pose.difficulty}
          </span>
        </div>
        <h1 className="font-display text-3xl font-bold mt-2">{pose.englishName}</h1>
        <p className="font-display text-lg text-muted-foreground italic">{pose.sanskritName}</p>

        <p className="font-body text-sm text-foreground/80 mt-4 leading-relaxed">{pose.description}</p>

        {poseBreakdowns[pose.id] && (
          <div className="mt-6">
            <h2 className="font-display text-xl font-semibold mb-3">Sanskrit Breakdown</h2>
            <div className="rounded-2xl bg-sage-light p-4 space-y-2">
              {poseBreakdowns[pose.id].map((token, i) => (
                <div key={i} className="flex items-baseline justify-between gap-3">
                  <span className="font-display text-base font-semibold text-foreground">{token.word}</span>
                  <span className="font-body text-sm text-foreground/70 text-right">{token.meaning}</span>
                </div>
              ))}
              <Link
                to="/roots"
                className="block mt-3 pt-3 border-t border-border/50 font-body text-xs text-primary hover:underline"
              >
                Learn more Sanskrit roots →
              </Link>
            </div>
          </div>
        )}

        <div className="mt-6">
          <h2 className="font-display text-xl font-semibold mb-3">Alignment Cues</h2>
          <ul className="space-y-2">
            {pose.alignmentCues.map((cue, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.05 }}
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

      <BottomNav />
    </div>
  );
}
