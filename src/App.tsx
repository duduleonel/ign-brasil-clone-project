
import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorBoundary from "./components/ErrorBoundary";

// Lazy load components
const Index = lazy(() => import("./pages/Index"));
const Category = lazy(() => import("./pages/Category"));
const PostDetail = lazy(() => import("./pages/PostDetail"));
const Games = lazy(() => import("./pages/Games"));
const GameDetail = lazy(() => import("./pages/GameDetail"));
const Communities = lazy(() => import("./pages/Communities"));
const CommunityDetail = lazy(() => import("./pages/CommunityDetail"));
const SearchResults = lazy(() => import("./pages/SearchResults"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Suspense fallback={<LoadingSpinner size="lg" text="Carregando..." />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/categoria/:slug" element={<Category />} />
                <Route path="/posts/:slug" element={<PostDetail />} />
                <Route path="/jogos" element={<Games />} />
                <Route path="/jogos/:slug" element={<GameDetail />} />
                <Route path="/comunidades" element={<Communities />} />
                <Route path="/comunidades/:slug" element={<CommunityDetail />} />
                <Route path="/busca" element={<SearchResults />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
