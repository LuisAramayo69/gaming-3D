/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
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
import type { Producto } from './types.ts';

function AppContent() {
  const [selectedProduct, setSelectedProduct] = useState<Producto | null>(null);
  const { notification } = useCart();

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f17] text-slate-100 flex flex-col selection:bg-amber-500/30 selection:text-amber-200">
      
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-24 right-4 z-50 bg-slate-900 border border-amber-500/40 text-amber-300 px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 text-xs font-semibold animate-in fade-in slide-in-from-top-2 duration-200">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{notification}</span>
        </div>
      )}

      {/* Header */}
      <Header onNavigate={handleNavigate} />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onExploreCatalog={() => handleNavigate('catalogo')}
          onExploreAbout={() => handleNavigate('nosotros')}
        />

        {/* Product Catalog (Supabase table 'productos') */}
        <ProductCatalog onSelectProduct={(p) => setSelectedProduct(p)} />

        {/* Technical Materials Guide */}
        <MaterialsGuide />

        {/* About Section: Story, startup origin, artisanal quality passion */}
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
          '¡Hola Gaming 3D! 👋 Estuve viendo su tienda y me gustaría hacer una consulta.'
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        className="fixed bottom-6 right-6 z-30 p-3.5 bg-emerald-500 hover:bg-emerald-400 text-white rounded-full shadow-lg shadow-emerald-500/30 hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer flex items-center justify-center group"
      >
        <MessageCircle className="w-6 h-6 fill-current text-white" />
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
