/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import CalculatorPage from './pages/CalculatorPage';
import Categories from './pages/Categories';
import Favorites from './pages/Favorites';
import Account from './pages/Account';
import ScrollToTop from './components/ScrollToTop';
import { CurrencyProvider } from './contexts/CurrencyContext';

export default function App() {
  return (
    <BrowserRouter>
      <CurrencyProvider>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/account" element={<Account />} />
            <Route path="/calculators/:id" element={<CalculatorPage />} />
            {/* Fallback route */}
            <Route path="*" element={<Home />} />
          </Routes>
        </Layout>
      </CurrencyProvider>
    </BrowserRouter>
  );
}
