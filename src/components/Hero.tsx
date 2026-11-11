import { ArrowRight, MessageCircle, ShieldCheck, Cpu, Sparkles, MapPin } from 'lucide-react';
import { WHATSAPP_PHONE } from '../context/CartContext.tsx';

interface HeroProps {
  onExploreCatalog: () => void;
  onExploreAbout: () => void;
}

export default function Hero({ onExploreCatalog, onExploreAbout }: HeroProps) {
  const directWaUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
    '¡Hola Gaming 3D! 👋 Estuve viendo su tienda y me gustaría consultar por productos o una pieza personalizada.'
  )}`;

  return (
    <section id="hero" className="relative overflow-hidden pt-6 pb-16 lg:py-20">
      {/* Background radial atmosphere */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-amber-500/10 via-red-500/5 to-transparent blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Slogan Kicker */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-700 text-xs font-semibold text-amber-400 tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Vivir y jugar con grandeza</span>
            </div>

            {/* Main Headline with balance */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-white text-balance leading-[1.08]">
              Accesorios y figuras en{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-red-500">
                Impresión 3D
              </span>{' '}
              para elevar tu setup.
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              En <strong className="text-white font-semibold">Gaming 3D</strong> fusionamos la cultura gamer con la precisión de la manufactura aditiva artesanal. Creamos soportes ergonómicos, organizadores de cables y figuras con calibración milimétrica y acabados únicos hechos a mano en Jujuy.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onExploreCatalog}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-amber-500 via-amber-400 to-orange-500 text-slate-950 font-bold rounded-xl shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
              >
                <span>Explorar Catálogo</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={directWaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700/80 rounded-xl transition-all duration-200 cursor-pointer group"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                <span className="font-semibold text-sm">Pedido a Medida</span>
              </a>

              <button
                onClick={onExploreAbout}
                className="text-sm font-medium text-slate-400 hover:text-amber-400 transition-colors py-2 px-1 underline underline-offset-4 decoration-slate-700 hover:decoration-amber-400 cursor-pointer"
              >
                Nuestra historia
              </button>
            </div>

            {/* Trust points */}
            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-4 text-xs text-slate-400">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-slate-200 font-semibold">
                  <Cpu className="w-4 h-4 text-amber-400" />
                  <span>PLA+ & PETG</span>
                </div>
                <p className="text-slate-500">Biopolímeros y resistencia térmica</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-slate-200 font-semibold">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>Calidad Artesanal</span>
                </div>
                <p className="text-slate-500">Inspección pieza por pieza</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-slate-200 font-semibold">
                  <MapPin className="w-4 h-4 text-amber-400" />
                  <span>Jujuy al País</span>
                </div>
                <p className="text-slate-500">Envíos seguros a toda Argentina</p>
              </div>
            </div>

          </div>

          {/* Right Visual Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/80 shadow-2xl group">
              <img
                src="/src/assets/images/hero_gaming3d_showcase_1794327290861.jpg"
                alt="Soporte y accesorios de Gaming 3D para setup gamer"
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
              />
              
              {/* Subtle glass overlay card inside */}
              <div className="absolute bottom-4 left-4 right-4 bg-slate-950/85 backdrop-blur-md p-4 rounded-xl border border-slate-800/80 flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wider text-amber-400 font-semibold">
                    Línea Signature
                  </p>
                  <p className="text-sm font-bold text-white">
                    Soportes Geométricos & Docks
                  </p>
                </div>
                <span className="font-mono text-xs px-2.5 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-300 rounded-md font-bold">
                  Resistencia 100%
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
