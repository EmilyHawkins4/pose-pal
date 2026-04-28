import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Browse from "./pages/Browse";
import PoseDetail from "./pages/PoseDetail";
import SearchPage from "./pages/SearchPage";
import Flashcards from "./pages/Flashcards";
import Quiz from "./pages/Quiz";
import Learn from "./pages/Learn";
import Sequence from "./pages/Sequence";
import SanskritRoots from "./pages/SanskritRoots";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HashRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/pose/:id" element={<PoseDetail />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/flashcards" element={<Flashcards />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/sequence" element={<Sequence />} />
          <Route path="/roots" element={<SanskritRoots />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
