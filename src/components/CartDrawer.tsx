import { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, MessageCircle, Copy, Check, Sparkles, MapPin, CreditCard } from 'lucide-react';
import { useCart, WHATSAPP_PHONE } from '../context/CartContext.tsx';
import type { OrderCustomerInfo } from '../types.ts';

export default function CartDrawer() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    totalItems,
    isCartOpen,
    setIsCartOpen,
    proceedToCheckout,
    generateWhatsAppLink
  } = useCart();

  const [customer, setCustomer] = useState<OrderCustomerInfo>({
    nombre: '',
    telefono: '',
    ciudad: 'San Salvador de Jujuy',
    direccion: '',
    metodoPago: 'transferencia',
    notas: ''
  });

  const [copied, setCopied] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  if (!isCartOpen) return null;

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0
    }).format(val);
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    if (!customer.nombre.trim()) {
      setFormError('Por favor ingresa tu nombre para el pedido.');
      return;
    }

    setFormError(null);
    proceedToCheckout(customer);
  };

  const handleCopyLink = () => {
    const link = generateWhatsAppLink(customer);
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm"
      onClick={() => setIsCartOpen(false)}
    >
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div
          onClick={(e) => e.stopPropagation()}
          className="w-screen max-w-md bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-300"
        >
          {/* Header */}
          <div className="px-6 py-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-500/10 rounded-lg text-amber-400">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white font-display">Tu Carrito Gaming 3D</h2>
                <p className="text-xs text-slate-400">
                  {totalItems} {totalItems === 1 ? 'producto' : 'productos'} · Persistido automáticamente
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Cerrar carrito"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart items list or empty view */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-slate-800/80 mx-auto flex items-center justify-center text-slate-500">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-white">Tu carrito está vacío</h3>
                <p className="text-xs text-slate-400 max-w-xs mx-auto">
                  Agrega soportes, organizadores o figuras desde nuestro catálogo para armar tu pedido.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition-colors cursor-pointer"
                >
                  Explorar Catálogo
                </button>
              </div>
            ) : (
              <>
                {/* Items */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-800">
                    <span>Artículos seleccionados</span>
                    <button
                      onClick={clearCart}
                      className="text-red-400 hover:text-red-300 hover:underline cursor-pointer flex items-center gap-1"
                    >
                      <Trash2 className="w-3 h-3" />
                      Vaciar todo
                    </button>
                  </div>

                  {cart.map((item) => (
                    <div
                      key={item.producto.id}
                      className="flex gap-3 p-3 bg-slate-950/70 rounded-xl border border-slate-800/80"
                    >
                      {/* Image Thumbnail */}
                      <div className="w-16 h-16 rounded-lg bg-slate-900 overflow-hidden shrink-0 border border-slate-800">
                        {item.producto.imagen_url ? (
                          <img
                            src={item.producto.imagen_url}
                            alt={item.producto.nombre}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[10px] text-slate-600">
                            3D
                          </div>
                        )}
                      </div>

                      {/* Item Details */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-white truncate">
                          {item.producto.nombre}
                        </h4>
                        <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                          <span>{item.producto.material}</span>
                          {item.selectedColor && (
                            <>
                              <span>·</span>
                              <span className="text-amber-400/90">{item.selectedColor}</span>
                            </>
                          )}
                        </div>
                        <div className="text-xs font-mono font-semibold text-amber-400 mt-1 tabular-nums">
                          {formatPrice(item.producto.precio)}
                        </div>
                      </div>

                      {/* Quantity & Delete */}
                      <div className="flex flex-col justify-between items-end">
                        <button
                          onClick={() => removeFromCart(item.producto.id)}
                          className="text-slate-500 hover:text-red-400 p-1 cursor-pointer"
                          title="Eliminar producto"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>

                        <div className="flex items-center border border-slate-700/80 rounded-md bg-slate-900 text-xs">
                          <button
                            onClick={() => updateQuantity(item.producto.id, item.cantidad - 1)}
                            className="px-2 py-0.5 text-slate-400 hover:text-white cursor-pointer"
                          >
                            -
                          </button>
                          <span className="px-2 py-0.5 font-mono text-white tabular-nums">
                            {item.cantidad}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.producto.id, item.cantidad + 1)}
                            className="px-2 py-0.5 text-slate-400 hover:text-white cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Customer Checkout Form */}
                <form id="checkout-form" onSubmit={handleCheckout} className="pt-4 border-t border-slate-800 space-y-3.5">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-200 uppercase tracking-wider">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span>Datos para WhatsApp & Envío</span>
                  </div>

                  {formError && (
                    <p className="text-xs text-red-400 bg-red-950/40 p-2 rounded border border-red-800/60">
                      {formError}
                    </p>
                  )}

                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Nombre y Apellido *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Lucas Ramos"
                      value={customer.nombre}
                      onChange={(e) => setCustomer({ ...customer, nombre: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-amber-400"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Ciudad / Provincia</label>
                      <input
                        type="text"
                        placeholder="San Salvador de Jujuy"
                        value={customer.ciudad}
                        onChange={(e) => setCustomer({ ...customer, ciudad: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-amber-400"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Dirección / Retiro</label>
                      <input
                        type="text"
                        placeholder="Calle y N° o Retiro en taller"
                        value={customer.direccion}
                        onChange={(e) => setCustomer({ ...customer, direccion: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-amber-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Método de pago preferido</label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {[
                        { id: 'transferencia', label: 'Transferencia' },
                        { id: 'mercadopago', label: 'Mercado Pago' },
                        { id: 'efectivo', label: 'Efectivo' }
                      ].map((m) => (
                        <button
                          type="button"
                          key={m.id}
                          onClick={() => setCustomer({ ...customer, metodoPago: m.id as any })}
                          className={`py-1.5 text-[11px] font-medium rounded-lg border transition-colors cursor-pointer ${
                            customer.metodoPago === m.id
                              ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-bold'
                              : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          {m.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Notas especiales (opcional)</label>
                    <input
                      type="text"
                      placeholder="Ej. Prefiero el soporte en color negro mate"
                      value={customer.notas || ''}
                      onChange={(e) => setCustomer({ ...customer, notas: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-amber-400"
                    />
                  </div>
                </form>
              </>
            )}
          </div>

          {/* Footer Summary & Checkout Actions */}
          {cart.length > 0 && (
            <div className="p-6 bg-slate-950 border-t border-slate-800 space-y-4">
              
              {/* Financial Subtotal */}
              <div className="space-y-1.5 text-xs text-slate-400">
                <div className="flex justify-between">
                  <span>Subtotal productos:</span>
                  <span className="font-mono text-slate-200 tabular-nums">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Coordinación de envío:</span>
                  <span className="text-emerald-400 font-medium">Acordar por WhatsApp</span>
                </div>
                <div className="pt-2 border-t border-slate-800/80 flex justify-between items-baseline">
                  <span className="text-sm font-bold text-white">Total Estimado:</span>
                  <span className="font-mono text-2xl font-black text-amber-400 tabular-nums">
                    {formatPrice(subtotal)}
                  </span>
                </div>
              </div>

              {/* Requirement 3: Botón de checkout que genere enlace https://wa.me/5493884597391 con el detalle formateado del pedido */}
              <div className="space-y-2">
                <button
                  type="submit"
                  form="checkout-form"
                  className="w-full flex items-center justify-center gap-2.5 py-3.5 px-4 bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-600/20 active:scale-[0.98] transition-all cursor-pointer group"
                >
                  <MessageCircle className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                  <span>Finalizar Pedido por WhatsApp</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>

                {/* Secondary copy link trigger */}
                <div className="flex items-center justify-between text-[11px] text-slate-500 px-1">
                  <span>Enlace oficial: wa.me/{WHATSAPP_PHONE}</span>
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className="inline-flex items-center gap-1 text-slate-400 hover:text-amber-400 cursor-pointer"
                  >
                    {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copied ? '¡Copiado!' : 'Copiar enlace'}</span>
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
