import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/components/theme-provider';
import HomePage from '@/pages/HomePage';
import StoriesPage from '@/pages/StoriesPage';
import StoryDetailPage from '@/pages/StoryDetailPage';
import AboutPage from '@/pages/AboutPage';

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="glorious-tales-theme">
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/stories" element={<StoriesPage />} />
            <Route path="/story/:id" element={<StoryDetailPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;