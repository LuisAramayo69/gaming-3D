import { MessageCircle, Heart, ArrowUp } from 'lucide-react';
import { WHATSAPP_PHONE } from '../context/CartContext.tsx';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#070a10] border-t border-slate-900 text-slate-400 text-xs py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-900">
          
          {/* Brand & Slogan */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-gradient-to-tr from-red-600 via-amber-500 to-amber-400 flex items-center justify-center text-black font-black text-xs">
                3D
              </span>
              <span className="text-xl font-bold font-display text-white">
                Gaming 3D
              </span>
            </div>
            
            <p className="text-sm font-semibold text-amber-400 italic">
              «Vivir y jugar con grandeza»
            </p>

            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Taller de manufactura aditiva y artesanía digital. Desarrollamos accesorios, soportes de mandos, auriculares y figuras para gamers con estándares de alta calidad desde Jujuy, Argentina.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Navegación
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('catalogo')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Catálogo de Productos
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('materiales')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Guía de Materiales (PLA / PETG)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('nosotros')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Historia de Nuestro Emprendimiento
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contacto')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Dirección y Horarios
                </button>
              </li>
            </ul>
          </div>

          {/* Direct channels */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Atención Directa
            </h4>
            <p className="text-xs text-slate-400">
              San Salvador de Jujuy, Argentina
            </p>
            <p className="font-mono text-slate-300">
              contacto@gaming3d.ar
            </p>
            <div className="pt-1">
              <a
                href={`https://wa.me/${WHATSAPP_PHONE}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-800 text-emerald-300 hover:text-white transition-colors text-xs font-semibold"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>+54 9 388 459 7391</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div className="flex items-center gap-1">
            <span>© {new Date().getFullYear()} Gaming 3D. Vivir y jugar con grandeza.</span>
            <span>·</span>
            <span>Hecho con dedicación artesanal</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-slate-300 transition-colors cursor-pointer"
          >
            <span>Volver arriba</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
