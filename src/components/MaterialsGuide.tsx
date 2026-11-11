import { Layers } from 'lucide-react';

export default function MaterialsGuide() {
  const materials = [
    {
      name: 'PLA (Ácido Poliláctico)',
      badge: 'Uso General & Detalle',
      tagline: 'Termoplástico biodegradable de alta rigidez para figuras, llaveros y soportes.',
      features: [
        'Excelente definición superficial y fidelidad geométrica',
        'Material no tóxico de origen renovable (almidón vegetal)',
        'Ideal para llaveros temáticos, soportes estáticos y accesorios decorativos',
        'Tolerancias estrictas con mínima contracción térmica'
      ],
      idealFor: 'Llaveros (Capibara, Lagartija Tom), soportes de celular y piezas de exhibición.'
    },
    {
      name: 'PETG Técnico',
      badge: 'Resistencia Mecánica',
      tagline: 'Para piezas sometidas a esfuerzos mecánicos moderados o mayor temperatura.',
      features: [
        'Temperatura de deflexión hasta 75°C',
        'Resistencia a impactos y tenacidad estructural superior',
        'Inmune a la humedad y químicos de limpieza',
        'Gran adherencia interlaminar'
      ],
      idealFor: 'Soportes de carga, ganchos de pared y piezas funcionales para setups.'
    },
    {
      name: 'Resina Fotosensible UV',
      badge: 'Alta Resolución',
      tagline: 'Para modelismo de alta precisión y miniaturas con microrrelieve.',
      features: [
        'Resolución de capa micrométrica (0.03 - 0.05 mm)',
        'Acabado completamente liso sin líneas visibles de filamento',
        'Curado por fotopolimerización UV',
        'Superficie óptima para pintura manual detallada'
      ],
      idealFor: 'Bustos coleccionables, miniaturas complejas y detalles de alta definición.'
    }
  ];

  return (
    <section id="materiales" className="py-16 bg-[#0b0f17] border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-2xl mb-10">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
            <span>Guía Técnica</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight">
            Materiales y Especificaciones
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Propiedades mecánicas y térmicas de los polímeros empleados en Gaming 3D.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {materials.map((mat, i) => (
            <div
              key={i}
              className="p-5 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono text-slate-300 font-semibold px-2 py-0.5 rounded bg-slate-800 border border-slate-700 uppercase tracking-wider">
                    {mat.badge}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white font-display mb-1">
                  {mat.name}
                </h3>
                <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                  {mat.tagline}
                </p>

                <ul className="space-y-2 mb-5">
                  {mat.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <span className="text-sky-400 font-bold shrink-0">·</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-3 border-t border-slate-800/80 text-xs">
                <span className="text-slate-500 block mb-0.5 text-[11px] uppercase tracking-wider">Aplicación habitual:</span>
                <span className="text-slate-300 font-medium">{mat.idealFor}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
