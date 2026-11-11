import { useState } from 'react';
import { ArrowRight, MessageCircle, ShieldCheck, Layers, MapPin } from 'lucide-react';
import { WHATSAPP_PHONE } from '../context/CartContext.tsx';
import type { Producto } from '../types.ts';

interface HeroProps {
  products: Producto[];
  onExploreCatalog: () => void;
  onExploreAbout: () => void;
  onSelectProduct: (product: Producto) => void;
}

export default function Hero({ products, onExploreCatalog, onExploreAbout, onSelectProduct }: HeroProps) {
  const [imgErrors, setImgErrors] = useState<Record<string | number, boolean>>({});

  const directWaUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
    'Hola Gaming 3D. Me comunico desde su tienda web para consultar por productos o una pieza a medida.'
  )}`;

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0
    }).format(val);
  };

  const handleImgError = (id: string | number) => {
    setImgErrors((prev) => ({ ...prev, [id]: true }));
  };

  // Select top featured items from live database
  const featured = products.slice(0, 3);

  return (
    <section id="hero" className="relative overflow-hidden pt-8 pb-16 lg:py-24 bg-[#090d16] border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Slogan Kicker */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-slate-700/80 bg-slate-900/90 text-xs font-semibold text-slate-300 tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
              <span>Vivir y jugar con grandeza</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display tracking-tight text-white text-balance leading-[1.08]">
              Manufactura aditiva y diseño en{' '}
              <span className="text-sky-400">Impresión 3D</span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed">
              En <strong className="text-slate-200 font-semibold">Gaming 3D</strong> desarrollamos accesorios, llaveros y piezas personalizadas con precisión milimétrica. Taller de producción artesanal y control dimensional con sede en San Pedro de Jujuy.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onExploreCatalog}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-100 hover:bg-white text-slate-950 font-bold text-xs uppercase tracking-wider rounded-lg shadow-sm transition-all duration-150 cursor-pointer active:scale-98"
              >
                <span>Ver Catálogo</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={directWaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-150 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Contacto Directo</span>
              </a>

              <button
                onClick={onExploreAbout}
                className="text-xs uppercase tracking-wider font-semibold text-slate-400 hover:text-white transition-colors py-2 px-1 cursor-pointer"
              >
                Conocer el taller →
              </button>
            </div>

            {/* Trust points */}
            <div className="pt-8 border-t border-slate-800/80 grid grid-cols-3 gap-6 text-xs text-slate-400">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-slate-200 font-semibold">
                  <Layers className="w-4 h-4 text-sky-400" />
                  <span>Filamento Técnico</span>
                </div>
                <p className="text-slate-500 text-[11px]">PLA de alta pureza y PETG</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-slate-200 font-semibold">
                  <ShieldCheck className="w-4 h-4 text-sky-400" />
                  <span>Control de Calidad</span>
                </div>
                <p className="text-slate-500 text-[11px]">Inspección manual unitaria</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-slate-200 font-semibold">
                  <MapPin className="w-4 h-4 text-sky-400" />
                  <span>San Pedro de Jujuy</span>
                </div>
                <p className="text-slate-500 text-[11px]">Envíos a toda la provincia y el país</p>
              </div>
            </div>

          </div>

          {/* Right Visual Column: Dynamic real products showcase from Supabase */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-slate-900/90 rounded-xl border border-slate-800 p-4 space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-800">
                <span className="font-semibold text-slate-200 uppercase tracking-wider text-[11px]">
                  Productos en Taller
                </span>
                <span className="text-sky-400 font-mono text-[11px]">Base de Datos en Vivo</span>
              </div>

              {/* Dynamic Grid of real items from Supabase */}
              {featured.length > 0 ? (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    {featured.slice(0, 2).map((item) => (
                      <div
                        key={item.id}
                        onClick={() => onSelectProduct(item)}
                        className="group relative rounded-lg overflow-hidden border border-slate-800 bg-slate-950 aspect-square cursor-pointer hover:border-slate-700 transition-colors"
                      >
                        {item.imagen_url && !imgErrors[item.id] ? (
                          <img
                            src={item.imagen_url}
                            alt={item.nombre}
                            onError={() => handleImgError(item.id)}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center p-3 text-slate-500 text-center bg-slate-950">
                            <Layers className="w-6 h-6 text-slate-600 mb-1" />
                            <p className="text-[11px] font-bold text-slate-300 line-clamp-1">{item.nombre}</p>
                            <p className="text-[9px] text-slate-600 uppercase mt-0.5">{item.material}</p>
                          </div>
                        )}
                        <div className="absolute bottom-0 inset-x-0 p-2 bg-slate-950/90 backdrop-blur-sm border-t border-slate-800 text-[11px]">
                          <p className="font-bold text-white truncate">{item.nombre}</p>
                          <p className="text-sky-400 font-mono font-bold">{formatPrice(item.precio)}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* 3rd item or summary bar */}
                  {featured[2] && (
                    <div
                      onClick={() => onSelectProduct(featured[2])}
                      className="p-3 bg-slate-950 hover:bg-slate-950/80 rounded-lg border border-slate-800 hover:border-slate-700 transition-colors flex items-center justify-between cursor-pointer"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 rounded bg-slate-900 border border-slate-800 overflow-hidden shrink-0">
                          {featured[2].imagen_url && !imgErrors[featured[2].id] ? (
                            <img
                              src={featured[2].imagen_url}
                              alt={featured[2].nombre}
                              onError={() => handleImgError(featured[2].id)}
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-[10px] text-slate-600 font-bold">
                              3D
                            </div>
                          )}
                        </div>
                        <div className="text-xs truncate">
                          <p className="font-semibold text-slate-200 truncate">{featured[2].nombre}</p>
                          <p className="text-[11px] text-slate-400">{featured[2].material} · {featured[2].color || 'Original'}</p>
                        </div>
                      </div>
                      <span className="font-mono text-sm font-bold text-sky-400 tabular-nums shrink-0 ml-3">
                        {formatPrice(featured[2].precio)}
                      </span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="py-12 text-center text-xs text-slate-500">
                  Cargando productos del taller...
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
