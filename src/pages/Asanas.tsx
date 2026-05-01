import { useLocation } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import SectionTabs from "@/components/SectionTabs";
import AsanasBrowse from "@/components/asanas/AsanasBrowse";
import AsanasFlashcards from "@/components/asanas/AsanasFlashcards";
import QuizContent from "@/components/quiz/QuizContent";

export const ASANAS_TABS = [
  { to: "/asanas", label: "Browse" },
  { to: "/asanas/flashcards", label: "Flashcards" },
  { to: "/asanas/quiz", label: "Quiz" },
];

export default function Asanas() {
  const { pathname } = useLocation();
  const isQuiz = pathname === "/asanas/quiz";

  return (
    <div className="min-h-screen pb-24">
      <div className="px-5 pt-5 pb-3">
        <h1 className="font-display text-3xl font-bold mb-3">Asanas</h1>
        {isQuiz && <SectionTabs tabs={ASANAS_TABS} />}
      </div>

      {pathname === "/asanas/flashcards" && <AsanasFlashcards />}
      {isQuiz && <QuizContent scope="asanas" />}
      {pathname === "/asanas" && <AsanasBrowse />}

      <BottomNav />
    </div>
  );
}


