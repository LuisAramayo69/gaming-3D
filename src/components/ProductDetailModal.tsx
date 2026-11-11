import { useState } from 'react';
import { X, ShoppingBag, MessageCircle, ShieldCheck, Cpu, Check, Package, Sparkles } from 'lucide-react';
import type { Producto } from '../types.ts';
import { useCart, WHATSAPP_PHONE } from '../context/CartContext.tsx';

interface ProductDetailModalProps {
  producto: Producto | null;
  onClose: () => void;
}

export default function ProductDetailModal({ producto, onClose }: ProductDetailModalProps) {
  if (!producto) return null;

  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(producto.color || 'Negro Mate');
  const [imageError, setImageError] = useState(false);

  const colors = [
    'Negro Mate',
    'Blanco Ártico',
    'Gris Carbono',
    'Rojo Carmín',
    'Dorado Metalizado',
    'Verde Neon'
  ];

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0
    }).format(val);
  };

  const handleAddToCart = () => {
    addToCart(producto, quantity, selectedColor);
    onClose();
  };

  const directWaUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
    `¡Hola Gaming 3D! 👋 Me interesa consultar por el producto: *${producto.nombre}* (${producto.material}, color ${selectedColor}) de precio ${formatPrice(producto.precio)}. ¿Tienen disponibilidad o personalización de tamaño?`
  )}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-slate-900 border border-slate-700/80 rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-slate-950/80 hover:bg-slate-800 text-slate-300 hover:text-white rounded-full transition-colors cursor-pointer border border-slate-700/50"
          aria-label="Cerrar ventana"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Image side */}
          <div className="relative aspect-square md:aspect-auto bg-slate-950 flex items-center justify-center overflow-hidden">
            {!imageError && producto.imagen_url ? (
              <img
                src={producto.imagen_url}
                alt={producto.nombre}
                referrerPolicy="no-referrer"
                onError={() => setImageError(true)}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="p-8 text-center text-slate-500">
                <Sparkles className="w-12 h-12 text-amber-500/40 mx-auto mb-3" />
                <p className="text-sm font-semibold text-slate-400">{producto.nombre}</p>
                <p className="text-xs text-slate-600 mt-1">Impresión Artesanal 3D</p>
              </div>
            )}
            <div className="absolute bottom-3 left-3 px-2.5 py-1 bg-black/80 backdrop-blur-md rounded-md text-[11px] font-mono text-amber-400 border border-amber-500/30">
              Material: {producto.material}
            </div>
          </div>

          {/* Info side */}
          <div className="p-6 md:p-8 flex flex-col justify-between space-y-6">
            
            <div className="space-y-4">
              <div>
                <span className="text-xs uppercase font-semibold tracking-wider text-amber-400">
                  {producto.categoria || 'Accesorio Gamer'}
                </span>
                <h2 className="text-2xl font-black font-display text-white mt-1">
                  {producto.nombre}
                </h2>
                <div className="flex items-baseline gap-3 mt-2">
                  <span className="font-mono text-3xl font-extrabold text-amber-400 tabular-nums">
                    {formatPrice(producto.precio)}
                  </span>
                  <span className="text-xs text-slate-400">ARS final</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-slate-300 leading-relaxed">
                {producto.descripcion ||
                  'Diseño ergonómico y resistente optimizado para impresoras 3D calibradas. Post-procesado manual para eliminar rebabas y garantizar ajuste perfecto en tu setup.'}
              </p>

              {/* Specs pill-less grid */}
              <div className="p-3.5 bg-slate-950/70 rounded-xl border border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Material primario:</span>
                  <span className="font-medium text-slate-200">{producto.material}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Disponibilidad / Stock:</span>
                  <span className="font-medium text-emerald-400">
                    {producto.stock ? `${producto.stock} unidades listas` : 'Fabricación inmediata (24-48h)'}
                  </span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Origen:</span>
                  <span className="font-medium text-slate-200">Taller Gaming 3D · Jujuy, Argentina</span>
                </div>
              </div>

              {/* Color selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  Color de impresión: <span className="text-amber-400">{selectedColor}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {colors.map((c) => (
                    <button
                      key={c}
                      onClick={() => setSelectedColor(c)}
                      className={`px-2.5 py-1 text-xs rounded-lg border transition-all cursor-pointer ${
                        selectedColor === c
                          ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-bold'
                          : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:border-slate-500'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center gap-4">
                <span className="text-xs font-semibold text-slate-300">Cantidad:</span>
                <div className="flex items-center border border-slate-700 rounded-lg bg-slate-950 overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1 text-sm font-bold text-slate-300 hover:bg-slate-800 cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-3 py-1 text-sm font-mono text-white tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1 text-sm font-bold text-slate-300 hover:bg-slate-800 cursor-pointer"
                  >
                    +
                  </button>
                </div>
                <span className="text-xs text-slate-400">
                  Subtotal: <strong className="text-white font-mono">{formatPrice(producto.precio * quantity)}</strong>
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <button
                onClick={handleAddToCart}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold rounded-xl shadow-lg shadow-amber-500/10 active:scale-[0.98] transition-all cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Agregar al Carrito ({formatPrice(producto.precio * quantity)})</span>
              </button>

              <a
                href={directWaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold rounded-xl border border-slate-700/80 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>Consultar por WhatsApp</span>
              </a>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
