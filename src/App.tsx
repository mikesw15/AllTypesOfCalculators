/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import CalculatorPage from './pages/CalculatorPage';
import Categories from './pages/Categories';
import Favorites from './pages/Favorites';
import Account from './pages/Account';
import Login from './pages/Login';
import About from './pages/About';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import TestingMethodology from './pages/TestingMethodology';
import Admin from './pages/Admin';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import SearchPage from './pages/SearchPage';
import HistoryPage from './pages/HistoryPage';
import ComparisonsPage from './pages/ComparisonsPage';
import ScrollToTop from './components/ScrollToTop';
import { CurrencyProvider } from './contexts/CurrencyContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { HistoryProvider } from './contexts/HistoryContext';
import { Navigate, useLocation, useParams } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import AnimatedPage from './components/AnimatedPage';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return null;
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;

  return <>{children}</>;
}

function AdminRoute({ children }: { children: React.ReactNode }) {
  const { user, loading, isAdmin } = useAuth();
  const location = useLocation();

  if (loading) return null;
  if (!user || !isAdmin) return <Navigate to="/" replace />;

  return <>{children}</>;
}

function AppRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      {/* @ts-ignore */}
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<AnimatedPage><Home /></AnimatedPage>} />
        <Route path="/categories" element={<AnimatedPage><Categories /></AnimatedPage>} />
        <Route path="/categories/:category" element={<AnimatedPage><Categories /></AnimatedPage>} />
        <Route path="/login" element={<AnimatedPage><Login /></AnimatedPage>} />
        <Route path="/about" element={<AnimatedPage><About /></AnimatedPage>} />
        <Route path="/contact" element={<AnimatedPage><Contact /></AnimatedPage>} />
        <Route path="/privacy" element={<AnimatedPage><PrivacyPolicy /></AnimatedPage>} />
        <Route path="/terms" element={<AnimatedPage><Terms /></AnimatedPage>} />
        <Route path="/testing-methodology" element={<AnimatedPage><TestingMethodology /></AnimatedPage>} />
        <Route path="/blog" element={<AnimatedPage><Blog /></AnimatedPage>} />
        <Route path="/blog/:slug" element={<AnimatedPage><BlogPost /></AnimatedPage>} />
        <Route path="/search" element={<AnimatedPage><SearchPage /></AnimatedPage>} />
        <Route path="/history" element={<AnimatedPage><HistoryPage /></AnimatedPage>} />
        <Route path="/comparisons" element={<AnimatedPage><ComparisonsPage /></AnimatedPage>} />
        <Route 
          path="/admin" 
          element={
            <AdminRoute>
              <AnimatedPage><Admin /></AnimatedPage>
            </AdminRoute>
          } 
        />
        <Route 
          path="/favorites" 
          element={
            <ProtectedRoute>
              <AnimatedPage><Favorites /></AnimatedPage>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/account" 
          element={
            <ProtectedRoute>
              <AnimatedPage><Account /></AnimatedPage>
            </ProtectedRoute>
          } 
        />
        <Route path="/:id-calculator" element={<AnimatedPage><CalculatorPage /></AnimatedPage>} />
        <Route path="/:id" element={<AnimatedPage><CalculatorPage /></AnimatedPage>} />
        <Route 
          path="/calculators/:id" 
          element={
            <NavigateToNewURL />
          } 
        />
        {/* Fallback route */}
        <Route path="*" element={<AnimatedPage><Home /></AnimatedPage>} />
      </Routes>
    </AnimatePresence>
  );
}

function NavigateToNewURL() {
  const { id } = useParams();
  return <Navigate to={`/${id}-calculator`} replace />;
}

import { ThemeProvider } from './contexts/ThemeContext';
import { UnitProvider } from './contexts/UnitContext';
import { RatingsProvider } from './contexts/RatingsContext';
import { HelmetProvider } from 'react-helmet-async';

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider>
          <UnitProvider>
            <AuthProvider>
              <HistoryProvider>
                <CurrencyProvider>
                  <RatingsProvider>
                    <ScrollToTop />
                    <Layout>
                      <AppRoutes />
                    </Layout>
                  </RatingsProvider>
                </CurrencyProvider>
              </HistoryProvider>
            </AuthProvider>
          </UnitProvider>
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}
