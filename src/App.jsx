import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/components/theme-provider';
import HomePage from '@/pages/HomePage';
import StoriesPage from '@/pages/StoriesPage';
import StoryDetailPage from '@/pages/StoryDetailPage';
import AboutPage from '@/pages/AboutPage';
import AdminLoginPage from '@/pages/AdminLoginPage';
import AdminStoriesPage from '@/pages/AdminStoriesPage';
import UnsubscribePage from '@/pages/UnsubscribePage';
import ProtectedRoute from '@/components/ProtectedRoute';

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="glorious-tales-theme">
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/stories" element={<StoriesPage />} />
            <Route path="/stories/:id" element={<StoryDetailPage />} />
            {/* Optionally keep the old singular route for backward compatibility */}
            {/* <Route path="/story/:id" element={<StoryDetailPage />} /> */}
            <Route path="/about" element={<AboutPage />} />
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminStoriesPage />
              </ProtectedRoute>
            } />
            <Route path="/unsubscribe" element={<UnsubscribePage />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;