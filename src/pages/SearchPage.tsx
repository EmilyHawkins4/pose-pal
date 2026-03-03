import { useState } from "react";
import { Search, X } from "lucide-react";
import { searchPoses } from "@/data/poses";
import PoseCard from "@/components/PoseCard";
import BottomNav from "@/components/BottomNav";
import { useLanguagePreference } from "@/hooks/useLanguagePreference";
import LanguageToggle from "@/components/LanguageToggle";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const { language, setLanguage } = useLanguagePreference();
  const results = searchPoses(query);

  return (
    <div className="min-h-screen pb-20">
      <div className="px-5 pt-12 pb-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="font-display text-3xl font-bold">Search</h1>
          <LanguageToggle language={language} onChange={setLanguage} />
        </div>

        <div className="relative">
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
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 px-5">
        {results.map((pose, i) => (
          <PoseCard key={pose.id} pose={pose} index={i} displayLanguage={language} />
        ))}
      </div>

      {results.length === 0 && query && (
        <div className="text-center py-16">
          <p className="text-3xl mb-2">🔍</p>
          <p className="text-muted-foreground font-body">No poses found. Try another term.</p>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
