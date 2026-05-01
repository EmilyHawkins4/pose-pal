import { useLocation } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import SectionTabs from "@/components/SectionTabs";
import VocabBrowse from "@/components/vocab/VocabBrowse";
import VocabFlashcards from "@/components/vocab/VocabFlashcards";
import QuizContent from "@/components/quiz/QuizContent";

export const VOCAB_TABS = [
  { to: "/vocab", label: "Browse" },
  { to: "/vocab/flashcards", label: "Flashcards" },
  { to: "/vocab/quiz", label: "Quiz" },
];

export default function Vocab() {
  const { pathname } = useLocation();
  const isFlashcards = pathname === "/vocab/flashcards";

  return (
    <div className="min-h-screen pb-24">
      <div className="px-5 pt-5 pb-3">
        <h1 className="font-display text-3xl font-bold mb-1">Vocab</h1>
        <p className="font-body text-sm text-muted-foreground mb-3">
          Sanskrit roots — the building blocks of asana names.
        </p>
        {!isFlashcards && <SectionTabs tabs={VOCAB_TABS} />}
      </div>

      {isFlashcards && <VocabFlashcards />}
      {pathname === "/vocab/quiz" && <QuizContent scope="roots" />}
      {pathname === "/vocab" && <VocabBrowse />}

      <BottomNav />
    </div>
  );
}

