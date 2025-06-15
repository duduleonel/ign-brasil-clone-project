
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Toaster } from '@/components/ui/sonner';
import ErrorBoundary from '@/components/ErrorBoundary';

// Pages
import Index from '@/pages/Index';
import Games from '@/pages/Games';
import GameDetail from '@/pages/GameDetail';
import Communities from '@/pages/Communities';
import CommunityDetail from '@/pages/CommunityDetail';
import Category from '@/pages/Category';
import PostDetail from '@/pages/PostDetail';
import SearchResults from '@/pages/SearchResults';
import TestCategories from '@/pages/TestCategories';
import NotFound from '@/pages/NotFound';
import VisitorSubmission from '@/pages/VisitorSubmission';

// Admin Pages
import AdminDashboard from '@/pages/admin/AdminDashboard';
import AdminSubmissions from '@/pages/admin/AdminSubmissions';

import './App.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <ErrorBoundary>
          <Router>
            <div className="App">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/games" element={<Games />} />
                <Route path="/games/:slug" element={<GameDetail />} />
                <Route path="/communities" element={<Communities />} />
                <Route path="/communities/:slug" element={<CommunityDetail />} />
                <Route path="/category/:categorySlug" element={<Category />} />
                <Route path="/posts/:slug" element={<PostDetail />} />
                <Route path="/search" element={<SearchResults />} />
                <Route path="/test-categories" element={<TestCategories />} />
                <Route path="/enviar-post" element={<VisitorSubmission />} />
                
                {/* Admin Routes */}
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/submissions" element={<AdminSubmissions />} />
                
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Toaster />
            </div>
          </Router>
        </ErrorBoundary>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
