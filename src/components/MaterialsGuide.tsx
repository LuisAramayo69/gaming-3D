import { Layers, Shield, Droplets, Thermometer, Sparkles } from 'lucide-react';

export default function MaterialsGuide() {
  const materials = [
    {
      name: 'PLA+ / Biopolímero Premium',
      badge: 'Ecológico & Rígido',
      tagline: 'Ideal para soportes de escritorio, docks de mando y organizadores.',
      features: [
        'Derivado de almidón vegetal (biodegradable)',
        'Acabado mate sedoso de alta fidelidad estética',
        'Tolerancia dimensional estricta (+- 0.03 mm)',
        'Excelente rigidez y estabilidad estructural'
      ],
      idealFor: 'Soportes para auriculares, bases de celular, organizadores de cables.'
    },
    {
      name: 'PETG Reforzado',
      badge: 'Alta Tenacidad & Térmica',
      tagline: 'Para piezas sometidas a tensión mecánica o calor ambiental.',
      features: [
        'Resistencia a temperaturas de hasta 75°C',
        'Alta flexibilidad elástica que evita fracturas por caída',
        'Inmune a la humedad y químicos de limpieza',
        'Máxima adhesión interlaminar'
      ],
      idealFor: 'Soportes de pared, clips de tensión para monitores, brazos articulados.'
    },
    {
      name: 'Resina UV 8K',
      badge: 'Micro-Detalle Absoluto',
      tagline: 'Para figuras coleccionables, keycaps mecánicos y miniaturas.',
      features: [
        'Resolución de capa microscópica (hasta 35 micrones)',
        'Superficies totalmente lisas sin líneas de impresión perceptibles',
        'Curado UV de alta densidad',
        'Base perfecta para pintura acrílica y modelismo'
      ],
      idealFor: 'Artisan keycaps, bustos gaming, dioramas y estatuillas de colección.'
    }
  ];

  return (
    <section id="materiales" className="py-16 bg-[#0b0f17] border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
            <Layers className="w-4 h-4" />
            <span>Guía de Materiales</span>
          </div>
          <h2 className="text-3xl font-black font-display text-white tracking-tight">
            Filamentos y Resinas de Grado Técnico
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Seleccionamos cada bobina y resina por su durabilidad, impacto ambiental y pureza de pigmento.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {materials.map((mat, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono text-amber-400 font-bold px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                    {mat.badge}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white font-display mb-1">
                  {mat.name}
                </h3>
                <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                  {mat.tagline}
                </p>

                <ul className="space-y-2 mb-6">
                  {mat.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <span className="text-amber-400 font-bold shrink-0">·</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-slate-800 text-xs">
                <span className="text-slate-500 block mb-1">Uso recomendado:</span>
                <span className="text-slate-200 font-medium">{mat.idealFor}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
