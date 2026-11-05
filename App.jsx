import { lazy, Suspense } from 'react';
import { MotionConfig } from 'framer-motion';
import { Navigate, Route, Routes } from 'react-router-dom';
import SiteLayout from './layouts/SiteLayout';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));

const Fallback = () => <div className="flex min-h-screen items-center justify-center"><span className="mono text-sm text-white/40">Loading…</span></div>;

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Suspense fallback={<Fallback />}>
        <Routes>
          <Route element={<SiteLayout />}>
            <Route index element={<Home />} />
            <Route path="work/:slug" element={<ProjectDetail />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
        </Routes>
      </Suspense>
    </MotionConfig>
  );
}
