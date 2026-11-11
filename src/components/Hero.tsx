import { ArrowRight, MessageCircle, ShieldCheck, Layers, MapPin, Sparkles } from 'lucide-react';
import { WHATSAPP_PHONE } from '../context/CartContext.tsx';

interface HeroProps {
  onExploreCatalog: () => void;
  onExploreAbout: () => void;
}

export default function Hero({ onExploreCatalog, onExploreAbout }: HeroProps) {
  const directWaUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
    'Hola Gaming 3D. Me comunico desde su tienda web para consultar por productos o una pieza a medida.'
  )}`;

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
              En <strong className="text-slate-200 font-semibold">Gaming 3D</strong> desarrollamos accesorios, soportes y piezas personalizadas con precisión milimétrica. Taller de producción artesanal y control dimensional con sede en San Pedro de Jujuy.
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

          {/* Right Visual Column: Real products showcase from Supabase */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-slate-900/90 rounded-xl border border-slate-800 p-4 space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-800">
                <span className="font-semibold text-slate-200 uppercase tracking-wider text-[11px]">
                  Productos en Taller
                </span>
                <span className="text-sky-400 font-mono text-[11px]">Catálogo Oficial</span>
              </div>

              {/* Grid of real items from Supabase */}
              <div className="grid grid-cols-2 gap-3">
                <div className="group relative rounded-lg overflow-hidden border border-slate-800 bg-slate-950 aspect-square">
                  <img
                    src="https://qljbqulwtktyvplqftqs.supabase.co/storage/v1/object/public/imagenes%20de%20productos/capibara.jpeg"
                    alt="Capibara matero"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-0 inset-x-0 p-2 bg-slate-950/90 backdrop-blur-sm border-t border-slate-800 text-[11px]">
                    <p className="font-bold text-white truncate">Capibara Matero</p>
                    <p className="text-sky-400 font-mono font-bold">$6.000 ARS</p>
                  </div>
                </div>

                <div className="group relative rounded-lg overflow-hidden border border-slate-800 bg-slate-950 aspect-square">
                  <img
                    src="https://qljbqulwtktyvplqftqs.supabase.co/storage/v1/object/public/imagenes%20de%20productos/lagartija%20tom.jpeg"
                    alt="Lagartija Tom"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-0 inset-x-0 p-2 bg-slate-950/90 backdrop-blur-sm border-t border-slate-800 text-[11px]">
                    <p className="font-bold text-white truncate">Lagartija Tom</p>
                    <p className="text-sky-400 font-mono font-bold">$5.000 ARS</p>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-between">
                <div className="text-xs">
                  <p className="font-semibold text-slate-200">Soporte Ergonómico para Celular</p>
                  <p className="text-[11px] text-slate-400">Diseño compacto en PLA · Color Verde</p>
                </div>
                <span className="font-mono text-sm font-bold text-sky-400 tabular-nums">
                  $3.000 ARS
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
