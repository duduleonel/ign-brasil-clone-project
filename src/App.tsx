
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ThemeProvider from "@/components/ThemeProvider";
import ErrorBoundary from "@/components/ErrorBoundary";
import Index from "./pages/Index";
import Category from "./pages/Category";
import PostDetail from "./pages/PostDetail";
import GameDetail from "./pages/GameDetail";
import Games from "./pages/Games";
import Communities from "./pages/Communities";
import CommunityDetail from "./pages/CommunityDetail";
import SearchResults from "./pages/SearchResults";
import TestCategories from "./pages/TestCategories";
import Admin from "./pages/Admin";
import SubmitPost from "./pages/SubmitPost";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <ErrorBoundary>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/categoria/:slug" element={<Category />} />
              <Route path="/post/:slug" element={<PostDetail />} />
              <Route path="/jogo/:slug" element={<GameDetail />} />
              <Route path="/jogos" element={<Games />} />
              <Route path="/comunidades" element={<Communities />} />
              <Route path="/comunidade/:slug" element={<CommunityDetail />} />
              <Route path="/busca" element={<SearchResults />} />
              <Route path="/test-categories" element={<TestCategories />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/enviar-post" element={<SubmitPost />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </ErrorBoundary>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
