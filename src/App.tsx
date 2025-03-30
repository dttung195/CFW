import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useMemo } from 'react';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Courses from './pages/Courses';
import Contact from './pages/Contact';
import Feedback from './pages/Feedback';
import NotFound from './pages/NotFound';
import ScrollBehavior from './utils/ScrollBehavior';

// Placeholder page for blog route that hasn't been created yet
const BlogPage = () => <div className="container py-20 min-h-screen"><h1 className="text-3xl font-bold">Trang Blog</h1></div>;

function App() {
  // Memoize the Home component to prevent it from being recreated on re-renders
  const homeInstance = useMemo(() => <Home />, []);
  
  return (
    <Router>
      <ScrollBehavior />
      <Layout>
        <Routes>
          <Route path="/" element={homeInstance} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/contact/:id" element={<Contact />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
