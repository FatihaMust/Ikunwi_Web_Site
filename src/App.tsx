import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Header from './components/Header';
import ProductGrid from './components/ProductGrid';
import FAQSection from './components/FAQ/FAQSection';
import Newsletter from './components/Newsletter';
import SocialMedia from './components/SocialMedia';
import About from './components/About';
import SEO from './components/SEO';
import { useLocalization } from './hooks/useLocalization';
import Login from './pages/admin/Login';
import Products from './pages/admin/Products';
import ProtectedRoute from './components/admin/ProtectedRoute';

function App() {
  const { t, changeCountry, detectUserCountry } = useLocalization();

  useEffect(() => {
    detectUserCountry();
  }, [detectUserCountry]);

  return (
    <Router>
      <HelmetProvider>
        <Routes>
          <Route path="/admin/login" element={<Login />} />
          <Route
            path="/admin/products"
            element={
              <ProtectedRoute>
                <Products />
              </ProtectedRoute>
            }
          />
          <Route
            path="/"
            element={
              <>
                <SEO />
                <div className="min-h-screen bg-gray-50">
                  <Header onCountryChange={changeCountry} />
                  <main>
                    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                      <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Ikunwi
                      </h1>
                      <p className="text-xl text-gray-600">{t('discover')}</p>
                    </section>

                    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                      <ProductGrid countryCode="FR" />
                    </section>

                    <About />
                    <Newsletter />
                    <FAQSection />
                    <SocialMedia />
                  </main>
                </div>
              </>
            }
          />
        </Routes>
      </HelmetProvider>
    </Router>
  );
}

export default App;