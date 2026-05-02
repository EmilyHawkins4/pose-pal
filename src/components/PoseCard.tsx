import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import type { YogaPose } from "@/data/poses";
import { useBookmarks } from "@/hooks/useBookmarks";

interface PoseCardProps {
  pose: YogaPose;
  index: number;
  displayLanguage: "english" | "sanskrit" | "both";
}

export default function PoseCard({ pose, index, displayLanguage }: PoseCardProps) {
  const { isBookmarked, toggle } = useBookmarks();
  const bookmarked = isBookmarked(pose.id);

  const getName = () => {
    if (displayLanguage === "english") return pose.englishName;
    if (displayLanguage === "sanskrit") return pose.sanskritName;
    return (
      <>
        <span>{pose.englishName}</span>
        <span className="block text-sm text-muted-foreground font-body font-normal">{pose.sanskritName}</span>
      </>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.3 }}
    >
      <Link
        to={`/pose/${pose.id}`}
        className="group block rounded-lg bg-card shadow-soft hover:shadow-card transition-all duration-300 overflow-hidden"
      >
        <div className="relative aspect-square bg-sage-light flex items-center justify-center p-4">
          <img src={pose.image} alt={pose.englishName} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300" />
          <button
            onClick={(e) => {
              e.preventDefault();
              toggle(pose.id);
            }}
            className="absolute top-2 right-2 p-1.5 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors"
            aria-label={bookmarked ? "Remove bookmark" : "Add bookmark"}
          >
            <Bookmark
              className={`w-4 h-4 transition-colors ${bookmarked ? "fill-accent text-accent" : "text-muted-foreground"}`}
            />
          </button>
          <span className="absolute bottom-2 left-2 text-xs font-body px-2 py-0.5 rounded-full bg-background/80 backdrop-blur-sm text-muted-foreground capitalize">
            {pose.category}
          </span>
        </div>
        <div className="p-3">
          <h3 className="font-display text-lg font-semibold leading-tight">{getName()}</h3>
        </div>
      </Link>
    </motion.div>
  );
}
