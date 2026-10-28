import React, { useEffect } from 'react';
import { Routes, Route, useLocation, Navigate, Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthProvider, useAuth } from './context/AuthContext';

// Common Components
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

// 17 Public Pages
import HomePage from './pages/HomePage';
import BootcampPage from './pages/BootcampPage';
import PilatesPage from './pages/PilatesPage';
import MembershipPage from './pages/MembershipPage';
import AssessmentPage from './pages/AssessmentPage';
import BookPage from './pages/BookPage';
import GlutesPage from './pages/GlutesPage';
import CoachingPage from './pages/CoachingPage';
import ProgramsPage from './pages/ProgramsPage';
import NutritionPage from './pages/NutritionPage';
import RecoveryPage from './pages/RecoveryPage';
import OnlinePage from './pages/OnlinePage';
import ElitePage from './pages/ElitePage';
import TeamPage from './pages/TeamPage';
import ShopPage from './pages/ShopPage';
import VisitPage from './pages/VisitPage';
import AppPage from './pages/AppPage';

// CMS Studio Pages
import AdminLayout from './admin/AdminLayout';
import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';
import AdminLeads from './admin/AdminLeads';
import AdminHeroes from './admin/AdminHeroes';
import AdminPrograms from './admin/AdminPrograms';
import AdminCelebrities from './admin/AdminCelebrities';
import AdminTransformations from './admin/AdminTransformations';
import AdminTeam from './admin/AdminTeam';
import AdminMemberships from './admin/AdminMemberships';
import AdminMediaLibrary from './admin/AdminMediaLibrary';

// Scroll to top helper on route transition
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Public Page Shell with Framer Motion Page Transitions
function PublicLayout() {
  const location = useLocation();
  return (
    <>
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -14 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
      <Footer />
    </>
  );
}

// Protected Route wrapper for CMS Studio
function ProtectedAdminRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#0A0A0A', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF' }}>
        <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '32px', letterSpacing: '0.1em' }}>
          VERIFYING STUDIO CREDENTIALS...
        </div>
      </div>
    );
  }

  // If not logged in, redirect to login
  if (!isAuthenticated && !localStorage.getItem('sweat_admin_token')) {
    return <Navigate to="/admin-studio/login" replace />;
  }

  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <ScrollToTop />
      <Routes>
        {/* PUBLIC 17-PAGE ROUTES + COMPATIBILITY PROGRAM ALIASES */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          
          {/* Programs & Disciplines */}
          <Route path="/bootcamp" element={<BootcampPage />} />
          <Route path="/programs/bootcamp" element={<BootcampPage />} />

          <Route path="/pilates" element={<PilatesPage />} />
          <Route path="/programs/pilates" element={<PilatesPage />} />

          <Route path="/glutes" element={<GlutesPage />} />
          <Route path="/programs/glutes" element={<GlutesPage />} />

          <Route path="/coaching" element={<CoachingPage />} />
          <Route path="/programs/coaching" element={<CoachingPage />} />

          <Route path="/programs" element={<ProgramsPage />} />

          {/* Specialized Services */}
          <Route path="/nutrition" element={<NutritionPage />} />
          <Route path="/programs/nutrition" element={<NutritionPage />} />

          <Route path="/recovery" element={<RecoveryPage />} />
          <Route path="/programs/recovery" element={<RecoveryPage />} />

          <Route path="/online" element={<OnlinePage />} />
          <Route path="/programs/online" element={<OnlinePage />} />

          <Route path="/elite" element={<ElitePage />} />
          <Route path="/programs/elite" element={<ElitePage />} />

          {/* Assessment & Booking */}
          <Route path="/assessment" element={<AssessmentPage />} />
          <Route path="/programs/assessment" element={<AssessmentPage />} />

          <Route path="/book" element={<BookPage />} />

          {/* Studio & Community */}
          <Route path="/membership" element={<MembershipPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/visit" element={<VisitPage />} />
          <Route path="/app" element={<AppPage />} />
        </Route>

        {/* CMS STUDIO ADMIN ROUTES */}
        <Route path="/admin-studio/login" element={<AdminLogin />} />

        <Route
          path="/admin-studio"
          element={
            <ProtectedAdminRoute>
              <AdminLayout />
            </ProtectedAdminRoute>
          }
        >
          <Route index element={<Navigate to="/admin-studio/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="leads" element={<AdminLeads />} />
          <Route path="heroes" element={<AdminHeroes />} />
          <Route path="programs" element={<AdminPrograms />} />
          <Route path="celebrities" element={<AdminCelebrities />} />
          <Route path="transformations" element={<AdminTransformations />} />
          <Route path="team" element={<AdminTeam />} />
          <Route path="memberships" element={<AdminMemberships />} />
          <Route path="media" element={<AdminMediaLibrary />} />
        </Route>

        {/* CATCH ALL */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}
