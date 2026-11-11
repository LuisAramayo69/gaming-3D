/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { MessageCircle, Check } from 'lucide-react';
import { CartProvider, useCart, WHATSAPP_PHONE } from './context/CartContext.tsx';
import Header from './components/Header.tsx';
import Hero from './components/Hero.tsx';
import ProductCatalog from './components/ProductCatalog.tsx';
import ProductDetailModal from './components/ProductDetailModal.tsx';
import CartDrawer from './components/CartDrawer.tsx';
import MaterialsGuide from './components/MaterialsGuide.tsx';
import AboutSection from './components/AboutSection.tsx';
import ContactSection from './components/ContactSection.tsx';
import Footer from './components/Footer.tsx';
import { fetchProductosFromSupabase } from './lib/supabase.ts';
import type { Producto } from './types.ts';

function AppContent() {
  const [products, setProducts] = useState<Producto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Producto | null>(null);
  const { notification } = useCart();

  const loadProducts = async () => {
    setLoading(true);
    setError(null);
    const { data, error: fetchErr } = await fetchProductosFromSupabase();
    if (fetchErr) {
      setError(fetchErr);
    } else {
      setProducts(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col selection:bg-slate-800 selection:text-white">
      
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-24 right-4 z-50 bg-slate-900 border border-slate-700 text-slate-200 px-3.5 py-2 rounded-lg shadow-xl flex items-center gap-2 text-xs font-medium animate-in fade-in duration-150">
          <Check className="w-3.5 h-3.5 text-emerald-400" />
          <span>{notification}</span>
        </div>
      )}

      {/* Header */}
      <Header onNavigate={handleNavigate} />

      <main className="flex-1">
        {/* Hero Section with live Supabase products */}
        <Hero
          products={products}
          onExploreCatalog={() => handleNavigate('catalogo')}
          onExploreAbout={() => handleNavigate('nosotros')}
          onSelectProduct={(p) => setSelectedProduct(p)}
        />

        {/* Product Catalog (Supabase table 'productos') */}
        <ProductCatalog
          products={products}
          loading={loading}
          error={error}
          onReload={loadProducts}
          onSelectProduct={(p) => setSelectedProduct(p)}
        />

        {/* Technical Materials Guide */}
        <MaterialsGuide />

        {/* About Section: Story, San Pedro de Jujuy workshop */}
        <AboutSection />

        {/* Contact Section: Address, hours, email, direct WhatsApp */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Product Detail Modal */}
      <ProductDetailModal
        producto={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      {/* Shopping Cart Drawer with WhatsApp checkout */}
      <CartDrawer />

      {/* Floating WhatsApp Quick Action Button */}
      <a
        href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
          'Hola Gaming 3D. Me gustaría realizar una consulta desde su tienda online.'
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        className="fixed bottom-6 right-6 z-30 p-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-lg shadow-emerald-600/30 hover:scale-105 active:scale-95 transition-all duration-150 cursor-pointer flex items-center justify-center group"
      >
        <MessageCircle className="w-5 h-5 fill-current text-white" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-out font-bold text-xs pl-0 group-hover:pl-2">
          WhatsApp Oficial
        </span>
      </a>

    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
