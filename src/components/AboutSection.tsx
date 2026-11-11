import { ShieldCheck, Cpu, ArrowUpRight, Compass, Wrench } from 'lucide-react';
import { WHATSAPP_PHONE } from '../context/CartContext.tsx';

export default function AboutSection() {
  const directWaUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
    'Hola Gaming 3D. Me interesa conocer más sobre su taller y los procesos de fabricación que realizan en San Pedro de Jujuy.'
  )}`;

  return (
    <section id="nosotros" className="py-20 bg-[#090d16] border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
            <span>Nuestra Historia & Taller</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-white tracking-tight">
            Emprendimiento artesanal en San Pedro de Jujuy
          </h2>
          <p className="mt-3 text-sm text-slate-400 leading-relaxed">
            Un proyecto que nace de la pasión por la tecnología, la manufactura aditiva y el cuidado minucioso por cada pieza producida.
          </p>
        </div>

        {/* Narrative & Pillars Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Main Story Text */}
          <div className="lg:col-span-7 space-y-4 text-sm text-slate-300 leading-relaxed">
            <p>
              <strong className="text-white">Gaming 3D</strong> es un emprendimiento independiente que recién comienza su recorrido, fundado en la ciudad de <strong className="text-white">San Pedro de Jujuy</strong>. Surgió con el propósito de ofrecer accesorios, llaveros y piezas funcionales con un estándar superior al producto genérico de serie.
            </p>
            <p>
              Lejos de las producciones automatizadas sin control de calidad, entendemos la impresión 3D como un oficio que combina modelado digital preciso con dedicación artesanal: inspeccionamos las capas, eliminamos rebabas a mano y calibramos tolerancias para que cada producto sea sólido, duradero y fiel a su diseño.
            </p>
            <p className="text-slate-400">
              Bajo nuestro lema <em className="text-white font-medium not-italic">«Vivir y jugar con grandeza»</em>, buscamos que cada gamer y creador de setup cuente con piezas personalizadas que expresen identidad y calidad garantizada.
            </p>

            <div className="pt-4">
              <a
                href={directWaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-400 hover:text-sky-300 transition-colors"
              >
                <span>Consultar por proyectos personalizados o modelos a pedido</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Technical Pillars Card */}
          <div className="lg:col-span-5 bg-slate-900 rounded-xl border border-slate-800 p-6 space-y-5">
            <div className="border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Compromiso de Producción
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Criterios de calidad aplicados en cada impresión
              </p>
            </div>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded bg-slate-800 text-slate-300 shrink-0">
                  <Wrench className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-white">Post-procesado manual</h4>
                  <p className="text-slate-400 mt-0.5">
                    Eliminación de soportes, verificación de roscas y encastres sin irregularidades.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded bg-slate-800 text-slate-300 shrink-0">
                  <Cpu className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-white">Calibración dimensional</h4>
                  <p className="text-slate-400 mt-0.5">
                    Ajuste fino de boquillas y flujo de extrusión para máxima adherencia de capas.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded bg-slate-800 text-slate-300 shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-white">Atención directa</h4>
                  <p className="text-slate-400 mt-0.5">
                    Contacto directo con los propios realizadores en San Pedro de Jujuy.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-500 font-mono">
              Gaming 3D · San Pedro de Jujuy, Argentina
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
