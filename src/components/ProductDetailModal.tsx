import { useState } from 'react';
import { X, ShoppingBag, MessageCircle, Layers } from 'lucide-react';
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
  const [selectedColor, setSelectedColor] = useState(producto.color || 'A convenir');
  const [imageError, setImageError] = useState(false);

  const colors = [
    producto.color || 'Original',
    'Negro Mate',
    'Blanco',
    'Verde Militar',
    'Dorado',
    'Gris Técnico'
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
    `Hola Gaming 3D. Me interesa consultar por el producto: *${producto.nombre}* (${producto.material}, color ${selectedColor}) de valor ${formatPrice(producto.precio)}. ¿Tienen stock o disponibilidad inmediata?`
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
        className="relative bg-slate-900 border border-slate-800 rounded-xl max-w-2xl w-full overflow-hidden shadow-2xl animate-in fade-in duration-150"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-1.5 bg-slate-950/80 hover:bg-slate-800 text-slate-400 hover:text-white rounded-md transition-colors cursor-pointer border border-slate-700/60"
          aria-label="Cerrar"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Image side */}
          <div className="relative aspect-square md:aspect-auto bg-slate-950 flex items-center justify-center overflow-hidden border-b md:border-b-0 md:border-r border-slate-800">
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
                <Layers className="w-10 h-10 text-slate-600 mx-auto mb-2" />
                <p className="text-xs font-semibold text-slate-400">{producto.nombre}</p>
                <p className="text-[11px] text-slate-600 mt-1">Gaming 3D · San Pedro de Jujuy</p>
              </div>
            )}
            <div className="absolute bottom-3 left-3 px-2 py-0.5 bg-slate-950/90 rounded text-[10px] font-mono text-slate-300 border border-slate-800 uppercase tracking-wider">
              {producto.material}
            </div>
          </div>

          {/* Info side */}
          <div className="p-6 flex flex-col justify-between space-y-5">
            
            <div className="space-y-4">
              <div>
                <span className="text-[11px] uppercase font-semibold tracking-wider text-slate-400">
                  {producto.categoria || 'Impresión 3D'}
                </span>
                <h2 className="text-xl font-bold font-display text-white mt-0.5">
                  {producto.nombre}
                </h2>
                <div className="flex items-baseline gap-2 mt-1.5">
                  <span className="font-mono text-2xl font-bold text-white tabular-nums">
                    {formatPrice(producto.precio)}
                  </span>
                  <span className="text-xs text-slate-500">ARS</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-300 leading-relaxed">
                {producto.descripcion}
              </p>

              {/* Technical specs */}
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Material:</span>
                  <span className="font-medium text-slate-200">{producto.material}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Disponibilidad:</span>
                  <span className="font-medium text-slate-200">
                    {producto.stock ? `${producto.stock} en stock` : 'A demanda'}
                  </span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Fabricación:</span>
                  <span className="font-medium text-slate-200">San Pedro de Jujuy</span>
                </div>
              </div>

              {/* Color selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Color: <span className="text-sky-400">{selectedColor}</span>
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {colors.map((c) => (
                    <button
                      key={c}
                      onClick={() => setSelectedColor(c)}
                      className={`px-2 py-1 text-xs rounded border transition-colors cursor-pointer ${
                        selectedColor === c
                          ? 'bg-slate-800 border-sky-400 text-white font-semibold'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center gap-3 pt-1">
                <span className="text-xs text-slate-400 font-semibold">Cantidad:</span>
                <div className="flex items-center border border-slate-800 rounded bg-slate-950 text-xs">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-2.5 py-1 text-slate-400 hover:text-white cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-2 py-1 font-mono text-white tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-2.5 py-1 text-slate-400 hover:text-white cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-3 border-t border-slate-800">
              <button
                onClick={handleAddToCart}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-100 hover:bg-white text-slate-950 font-bold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Agregar al Carrito ({formatPrice(producto.precio * quantity)})</span>
              </button>

              <a
                href={directWaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold rounded-lg border border-slate-800 transition-colors"
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
