import { useLocation } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import SectionTabs from "@/components/SectionTabs";
import AsanasBrowse from "@/components/asanas/AsanasBrowse";
import AsanasFlashcards from "@/components/asanas/AsanasFlashcards";
import QuizContent from "@/components/quiz/QuizContent";

const TABS = [
  { to: "/asanas", label: "Browse" },
  { to: "/asanas/flashcards", label: "Flashcards" },
  { to: "/asanas/quiz", label: "Quiz" },
];

export default function Asanas() {
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen pb-24">
      <div className="px-5 pt-12 pb-3">
        <h1 className="font-display text-3xl font-bold mb-3">Asanas</h1>
        <SectionTabs tabs={TABS} />
      </div>

      {pathname === "/asanas/flashcards" && <AsanasFlashcards />}
      {pathname === "/asanas/quiz" && <QuizContent scope="asanas" />}
      {pathname === "/asanas" && <AsanasBrowse />}

      <BottomNav />
    </div>
  );
}
