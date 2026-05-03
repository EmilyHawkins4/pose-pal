import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Layers, FlipHorizontal, Brain, Star, BookOpen, ListOrdered } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import { useBookmarks } from "@/hooks/useBookmarks";
import { poses } from "@/data/poses";
import BottomNav from "@/components/BottomNav";

const features = [
  { to: "/asanas", icon: Layers, label: "Browse Asanas", desc: "Search the full catalog", color: "bg-sage-light text-primary" },
  { to: "/asanas/flashcards", icon: FlipHorizontal, label: "Flashcards", desc: "Learn by flipping cards", color: "bg-terracotta-light text-accent" },
  { to: "/asanas/quiz", icon: Brain, label: "Quiz", desc: "Test your knowledge", color: "bg-sage-light text-primary" },
  { to: "/vocab", icon: BookOpen, label: "Sanskrit Vocab", desc: "Decode pose names", color: "bg-terracotta-light text-accent" },
];

export default function Index() {
  const { bookmarks } = useBookmarks();
  const bookmarkedPoses = poses.filter(p => bookmarks.includes(p.id));

  return (
    <div className="min-h-screen pb-20">
      {/* Hero */}
      <div className="relative h-[45vh] min-h-[300px] overflow-hidden">
        <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/30 to-background" />
        <div className="relative z-10 flex flex-col justify-end h-full px-6 pb-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl md:text-5xl font-bold text-primary-foreground leading-tight"
          >
            Āsana
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-body text-sm text-primary-foreground/80 mt-1"
          >
            Your yoga pose reference & learning companion
          </motion.p>
        </div>
      </div>

      {/* Feature Grid */}
      <div className="px-5 -mt-4 relative z-20">
        <div className="grid grid-cols-2 gap-3">
          {features.map(({ to, icon: Icon, label, desc, color }, i) => (
            <motion.div
              key={to}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.05 }}
            >
              <Link
                to={to}
                className="block p-4 rounded-xl bg-card shadow-card hover:shadow-elevated transition-all duration-300 group"
              >
                <div className={`w-10 h-10 rounded-lg ${color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-display text-lg font-semibold">{label}</h3>
                <p className="text-xs text-muted-foreground font-body mt-0.5">{desc}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Starred */}
      {bookmarkedPoses.length > 0 && (
        <div className="px-5 mt-8">
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
                <div className="w-20 h-20 mx-auto rounded-xl bg-sage-light flex items-center justify-center p-2 shadow-soft">
                  <img src={pose.image} alt={pose.englishName} className="max-h-full max-w-full object-contain" />
                </div>
                <p className="text-xs font-body mt-1.5 text-foreground truncate">{pose.englishName}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
