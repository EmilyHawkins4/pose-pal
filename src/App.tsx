import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Browse from "./pages/Browse";
import PoseDetail from "./pages/PoseDetail";
import Flashcards from "./pages/Flashcards";
import Quiz from "./pages/Quiz";
import Learn from "./pages/Learn";
import Sequence from "./pages/Sequence";
import SanskritRoots from "./pages/SanskritRoots";
import RootDetail from "./pages/RootDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HashRouter>
        <Routes>
          <Route path="/" element={<Browse />} />
          <Route path="/browse" element={<Navigate to="/" replace />} />
          <Route path="/search" element={<Navigate to="/" replace />} />
          <Route path="/pose/:id" element={<PoseDetail />} />
          <Route path="/flashcards" element={<Flashcards />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/sequence" element={<Sequence />} />
          <Route path="/roots" element={<SanskritRoots />} />
          <Route path="/roots/:id" element={<RootDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
