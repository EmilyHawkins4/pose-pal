import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, X, Star } from "lucide-react";
import { poses, searchPoses, CATEGORIES, type PoseCategory } from "@/data/poses";
import PoseCard from "@/components/PoseCard";
import LanguageToggle from "@/components/LanguageToggle";
import SectionTabs from "@/components/SectionTabs";
import { ASANAS_TABS } from "@/pages/Asanas";
import { useLanguagePreference } from "@/hooks/useLanguagePreference";
import { useBookmarks } from "@/hooks/useBookmarks";
import { motion } from "framer-motion";

/**
 * Browse + search asanas content (no page chrome, no bottom nav).
 * Embedded inside the Asanas hub.
 */
export default function AsanasBrowse() {
  const [selectedCategory, setSelectedCategory] = useState<PoseCategory | "all">("all");
  const [query, setQuery] = useState("");
  const { language, setLanguage } = useLanguagePreference();
  const { bookmarks } = useBookmarks();
  const bookmarkedPoses = poses.filter((p) => bookmarks.includes(p.id));

  const trimmedQuery = query.trim();
  const baseList = trimmedQuery ? searchPoses(trimmedQuery) : poses;
  const filtered =
    selectedCategory === "all" ? baseList : baseList.filter((p) => p.category === selectedCategory);

  return (
    <div>
      <div className="px-5 pb-2">
        <div className="flex items-center justify-between gap-2 mb-3">
          <SectionTabs tabs={ASANAS_TABS} />
          <LanguageToggle language={language} onChange={setLanguage} />
        </div>

        {/* Search */}
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by English or Sanskrit name..."
            className="w-full pl-9 pr-9 py-2.5 rounded-xl bg-muted font-body text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2"
              aria-label="Clear search"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          )}
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

      {/* Starred */}
      {bookmarkedPoses.length > 0 && !trimmedQuery && selectedCategory === "all" && (
        <div className="px-5 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Star className="w-4 h-4 text-accent fill-accent" />
            <h2 className="font-display text-xl font-semibold">Starred</h2>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-5 px-5 scrollbar-hide">
            {bookmarkedPoses.map((pose) => (
              <Link
                key={pose.id}
                to={`/pose/${pose.id}`}
                className="flex-shrink-0 w-24 text-center"
              >
                <div className="w-20 h-20 mx-auto rounded-xl bg-sage-light flex items-center justify-center text-3xl shadow-soft">
                  {pose.emoji}
                </div>
                <p className="text-xs font-body mt-1.5 text-foreground truncate">{pose.englishName}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      <motion.div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 px-5" layout>
        {filtered.map((pose, i) => (
          <PoseCard key={pose.id} pose={pose} index={i} displayLanguage={language} />
        ))}
      </motion.div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-3xl mb-2">🔍</p>
          <p className="text-muted-foreground font-body">
            {trimmedQuery ? "No poses found. Try another term." : "No poses in this category yet."}
          </p>
        </div>
      )}
    </div>
  );
}
