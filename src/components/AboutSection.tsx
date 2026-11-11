import { Heart, Sparkles, Compass, ShieldCheck, Flame, Cpu, ArrowUpRight } from 'lucide-react';
import { WHATSAPP_PHONE } from '../context/CartContext.tsx';

export default function AboutSection() {
  const directWaUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
    '¡Hola Gaming 3D! 👋 Leí sobre su taller y me encantaría saber más sobre cómo fabrican las piezas personalizadas.'
  )}`;

  return (
    <section id="nosotros" className="py-20 bg-slate-950 border-t border-slate-900 relative overflow-hidden">
      {/* Decorative subtle backdrop aura */}
      <div className="absolute right-0 top-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
            <Sparkles className="w-4 h-4" />
            <span>Nuestra Historia & Taller</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display text-white tracking-tight leading-tight">
            Un emprendimiento con alma: <br className="hidden sm:inline" />
            pasión por lo artesanal y bien hecho.
          </h2>
          <p className="mt-4 text-base text-slate-300 leading-relaxed">
            En <strong className="text-white font-semibold">Gaming 3D</strong> no creemos en los plásticos desechables ni en las producciones en masa sin alma. Nacimos de una necesidad real: dignificar el espacio donde pasamos nuestras mejores horas de juego y creación.
          </p>
        </div>

        {/* Story Grid with Workshop Photo */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Workshop image with artisan caption */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-xl group">
              <img
                src="/src/assets/images/about_artisan_workshop_1794327292139.jpg"
                alt="Taller de artesanos de Gaming 3D inspeccionando piezas y filamentos"
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="p-4 bg-slate-900/95 border-t border-slate-800">
                <p className="text-xs font-semibold text-slate-200">
                  Inspección y acabado manual en taller
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Cada pieza es retirada, desbarbada a mano y probada con hardware gamer real antes de ser embalada.
                </p>
              </div>
            </div>
          </div>

          {/* Narrative copy */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
            
            <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
              <p>
                Somos un proyecto emergente fundado en el norte argentino, en <strong className="text-slate-100">San Salvador de Jujuy</strong>. Empezamos en un rincón con una única máquina y el sueño de personalizar nuestros propios escritorios de videojuegos.
              </p>
              <p>
                Pronto descubrimos que la comunidad compartía nuestra misma frustración: los accesorios del mercado convencional son genéricos, frágiles y carecen de identidad. Por eso decidimos crear una propuesta distinta: <strong className="text-amber-400">combinar tecnología de modelado CAD e impresión aditiva con el cuidado paciente del artesano</strong>.
              </p>
              <p>
                Nuestro eslogan resume todo lo que somos: <span className="text-white font-semibold italic">«Vivir y jugar con grandeza»</span>. Para nosotros la grandeza no es la ostentación, sino el estándar de excelencia puesto en cada detalle: el grosor de pared que no cede, el bisel suave que protege tu mando favorito y el color exacto que complementa la estética de tu setup.
              </p>
            </div>

            {/* 3 Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800/80">
              <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800">
                <div className="p-2 w-fit rounded-lg bg-amber-500/10 text-amber-400 mb-2.5">
                  <Heart className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-white">Hecho a Pulso</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Tratamiento superficial y control visual unitario. Sin rebabas cortantes.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800">
                <div className="p-2 w-fit rounded-lg bg-amber-500/10 text-amber-400 mb-2.5">
                  <Cpu className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-white">Ingeniería FDM</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Alturas de capa de 0.16mm y patrones de relleno giratorios hiperresistentes.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800">
                <div className="p-2 w-fit rounded-lg bg-amber-500/10 text-amber-400 mb-2.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-white">Compromiso Real</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Atención humana y directa. Si algo no encaja a la perfección, lo rehacemos.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={directWaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors"
              >
                <span>¿Tienes una idea en mente? Hablemos por WhatsApp para modelarla</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
