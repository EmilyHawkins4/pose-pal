import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Asanas from "./pages/Asanas";
import Vocab from "./pages/Vocab";
import PoseDetail from "./pages/PoseDetail";
import Sequence from "./pages/Sequence";
import Cue from "./pages/Cue";
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
          <Route path="/" element={<Index />} />

          {/* Asanas hub */}
          <Route path="/asanas" element={<Asanas />} />
          <Route path="/asanas/flashcards" element={<Asanas />} />
          <Route path="/asanas/quiz" element={<Asanas />} />

          {/* Vocab hub */}
          <Route path="/vocab" element={<Vocab />} />
          <Route path="/vocab/flashcards" element={<Vocab />} />
          <Route path="/vocab/quiz" element={<Vocab />} />

          {/* Sequence */}
          <Route path="/sequence" element={<Sequence />} />

          {/* Pose & root details */}
          <Route path="/pose/:id" element={<PoseDetail />} />
          <Route path="/roots/:id" element={<RootDetail />} />

          {/* Legacy redirects */}
          <Route path="/browse" element={<Navigate to="/asanas" replace />} />
          <Route path="/search" element={<Navigate to="/asanas" replace />} />
          <Route path="/flashcards" element={<Navigate to="/asanas/flashcards" replace />} />
          <Route path="/quiz" element={<Navigate to="/asanas/quiz" replace />} />
          <Route path="/roots" element={<Navigate to="/vocab" replace />} />
          <Route path="/learn" element={<Navigate to="/asanas" replace />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
