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
import ScrollToTop from './components/ScrollToTop';
import { CurrencyProvider } from './contexts/CurrencyContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { HistoryProvider } from './contexts/HistoryContext';
import { Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import AnimatedPage from './components/AnimatedPage';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return null;
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;

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
        <Route path="/login" element={<AnimatedPage><Login /></AnimatedPage>} />
        <Route path="/about" element={<AnimatedPage><About /></AnimatedPage>} />
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
        <Route path="/calculators/:id" element={<AnimatedPage><CalculatorPage /></AnimatedPage>} />
        {/* Fallback route */}
        <Route path="*" element={<AnimatedPage><Home /></AnimatedPage>} />
      </Routes>
    </AnimatePresence>
  );
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
