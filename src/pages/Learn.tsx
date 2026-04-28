import { Link } from "react-router-dom";
import { FlipHorizontal, Brain, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import BottomNav from "@/components/BottomNav";

export default function Learn() {
  return (
    <div className="min-h-screen pb-20">
      <div className="px-5 pt-12 pb-4">
        <h1 className="font-display text-3xl font-bold mb-2">Learn</h1>
        <p className="font-body text-sm text-muted-foreground">Choose a learning mode to strengthen your knowledge.</p>
      </div>

      <div className="px-5 space-y-4">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <Link
            to="/flashcards"
            className="block p-6 rounded-2xl bg-sage-light group"
          >
            <FlipHorizontal className="w-10 h-10 text-primary mb-3 group-hover:scale-110 transition-transform" />
            <h2 className="font-display text-2xl font-bold text-foreground">Flashcards</h2>
            <p className="font-body text-sm text-muted-foreground mt-1">
              Flip through cards to associate poses with their English and Sanskrit names.
            </p>
          </Link>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}>
          <Link
            to="/quiz"
            className="block p-6 rounded-2xl bg-terracotta-light group"
          >
            <Brain className="w-10 h-10 text-accent mb-3 group-hover:scale-110 transition-transform" />
            <h2 className="font-display text-2xl font-bold text-foreground">Quiz</h2>
            <p className="font-body text-sm text-muted-foreground mt-1">
              Test your knowledge with multiple-choice questions and track your score.
            </p>
          </Link>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }}>
          <Link
            to="/roots"
            className="block p-6 rounded-2xl bg-muted group"
          >
            <BookOpen className="w-10 h-10 text-primary mb-3 group-hover:scale-110 transition-transform" />
            <h2 className="font-display text-2xl font-bold text-foreground">Sanskrit Roots</h2>
            <p className="font-body text-sm text-muted-foreground mt-1">
              Decode asana names by learning the root words they're built from.
            </p>
          </Link>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
}
