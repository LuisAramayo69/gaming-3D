import { MessageCircle, ArrowUp } from 'lucide-react';
import { WHATSAPP_PHONE } from '../context/CartContext.tsx';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#070a10] border-t border-slate-800 text-slate-400 text-xs py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800/80">
          
          {/* Brand & Slogan */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-slate-800 border border-slate-700 flex items-center justify-center text-white font-bold text-xs">
                3D
              </div>
              <span className="text-lg font-bold font-display text-white">
                Gaming 3D
              </span>
            </div>
            
            <p className="text-xs font-semibold text-slate-300">
              «Vivir y jugar con grandeza»
            </p>

            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Taller de manufactura aditiva y diseño en impresión 3D. Accesorios, soportes y coleccionables producidos con calibración dimensional en San Pedro de Jujuy, Argentina.
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
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Catálogo de Productos
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('materiales')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Materiales y Especificaciones
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('nosotros')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Sobre Nuestro Taller
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contacto')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Contacto y Dirección
                </button>
              </li>
            </ul>
          </div>

          {/* Direct channels */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Sede & Atención
            </h4>
            <p className="text-xs text-slate-300">
              San Pedro de Jujuy, Argentina
            </p>
            <p className="font-mono text-slate-400">
              contacto@gaming3d.ar
            </p>
            <div className="pt-1">
              <a
                href={`https://wa.me/${WHATSAPP_PHONE}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-slate-900 border border-slate-800 text-slate-200 hover:text-white transition-colors text-xs font-mono"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>+54 9 388 459 7391</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            <span>© {new Date().getFullYear()} Gaming 3D · Vivir y jugar con grandeza · San Pedro de Jujuy.</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <span>Inicio</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
