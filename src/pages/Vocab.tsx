import { useLocation } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import SectionTabs from "@/components/SectionTabs";
import VocabBrowse from "@/components/vocab/VocabBrowse";
import VocabFlashcards from "@/components/vocab/VocabFlashcards";
import QuizContent from "@/components/quiz/QuizContent";

const TABS = [
  { to: "/vocab", label: "Browse" },
  { to: "/vocab/flashcards", label: "Flashcards" },
  { to: "/vocab/quiz", label: "Quiz" },
];

export default function Vocab() {
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen pb-24">
      <div className="px-5 pt-12 pb-3">
        <h1 className="font-display text-3xl font-bold mb-1">Vocab</h1>
        <p className="font-body text-sm text-muted-foreground mb-3">
          Sanskrit roots — the building blocks of asana names.
        </p>
        <SectionTabs tabs={TABS} />
      </div>

      {pathname === "/vocab/flashcards" && <VocabFlashcards />}
      {pathname === "/vocab/quiz" && <QuizContent scope="roots" />}
      {pathname === "/vocab" && <VocabBrowse />}

      <BottomNav />
    </div>
  );
}
