import { useState } from 'react';
import { ShoppingBag, Menu, X, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext.tsx';

interface HeaderProps {
  onNavigate: (sectionId: string) => void;
}

export default function Header({ onNavigate }: HeaderProps) {
  const { totalItems, subtotal, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Catálogo', id: 'catalogo' },
    { label: 'Materiales 3D', id: 'materiales' },
    { label: 'Nosotros', id: 'nosotros' },
    { label: 'Contacto', id: 'contacto' }
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0b0f17]/90 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          
          {/* Zone 1: Single text element wordmark in display face */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('hero');
            }}
            className="flex items-center gap-2 group text-white tracking-tight shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-sm"
          >
            <span className="w-8 h-8 rounded-lg bg-gradient-to-tr from-red-600 via-amber-500 to-amber-400 flex items-center justify-center text-black font-black text-sm shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform duration-200">
              3D
            </span>
            <span className="text-xl sm:text-2xl font-black font-display tracking-tight text-white group-hover:text-amber-400 transition-colors">
              Gaming 3D
            </span>
          </a>

          {/* Zone 2: 4 clean single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 py-1 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400 rounded"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Zone 3: 1 primary action (Cart drawer opener) */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2.5 px-4 py-2.5 bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 rounded-xl text-slate-100 hover:text-white transition-all duration-200 shadow-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 active:scale-95"
              aria-label={`Abrir carrito con ${totalItems} productos`}
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 text-amber-400" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-amber-500 text-white font-bold text-xs w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#0b0f17] tabular-nums">
                    {totalItems}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline text-xs font-semibold uppercase tracking-wider text-slate-400">
                Carrito
              </span>
              {totalItems > 0 && (
                <span className="hidden sm:inline font-mono text-xs font-semibold text-amber-300 tabular-nums">
                  {formatPrice(subtotal)}
                </span>
              )}
            </button>

            {/* Mobile hamburger button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              aria-label="Abrir menú de navegación"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 pt-3 pb-5 space-y-2">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className="block w-full text-left px-3 py-2.5 rounded-lg text-base font-medium text-slate-200 hover:bg-slate-800 hover:text-amber-400 transition-colors"
            >
              {link.label}
            </button>
          ))}
          <div className="pt-2 border-t border-slate-800">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsCartOpen(true);
              }}
              className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold rounded-lg"
            >
              <ShoppingBag className="w-5 h-5" />
              Ver Carrito ({totalItems} items · {formatPrice(subtotal)})
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
