import { useState } from "react";
import { poses, CATEGORIES, type PoseCategory } from "@/data/poses";
import PoseCard from "@/components/PoseCard";
import BottomNav from "@/components/BottomNav";
import LanguageToggle from "@/components/LanguageToggle";
import { useLanguagePreference } from "@/hooks/useLanguagePreference";
import { motion } from "framer-motion";

export default function Browse() {
  const [selectedCategory, setSelectedCategory] = useState<PoseCategory | "all">("all");
  const { language, setLanguage } = useLanguagePreference();

  const filtered = selectedCategory === "all" ? poses : poses.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen pb-20">
      <div className="px-5 pt-12 pb-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="font-display text-3xl font-bold">Browse Poses</h1>
          <LanguageToggle language={language} onChange={setLanguage} />
        </div>

        {/* Category pills */}
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-5 px-5 scrollbar-hide">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-sm font-body font-medium transition-all ${
              selectedCategory === "all"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            All
          </button>
          {CATEGORIES.map(({ value, label, emoji }) => (
            <button
              key={value}
              onClick={() => setSelectedCategory(value)}
              className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-sm font-body font-medium transition-all whitespace-nowrap ${
                selectedCategory === value
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {emoji} {label}
            </button>
          ))}
        </div>
      </div>

      <motion.div
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 px-5"
        layout
      >
        {filtered.map((pose, i) => (
          <PoseCard key={pose.id} pose={pose} index={i} displayLanguage={language} />
        ))}
      </motion.div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-muted-foreground font-body">No poses in this category yet.</p>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
