import { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, MessageCircle, Copy, Check, MapPin } from 'lucide-react';
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
    ciudad: 'San Pedro de Jujuy',
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
      className="fixed inset-0 z-50 overflow-hidden bg-black/75 backdrop-blur-sm"
      onClick={() => setIsCartOpen(false)}
    >
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div
          onClick={(e) => e.stopPropagation()}
          className="w-screen max-w-md bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-200"
        >
          {/* Header */}
          <div className="px-5 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-4 h-4 text-slate-300" />
              <div>
                <h2 className="text-sm font-bold text-white font-display">Carrito de Compras</h2>
                <p className="text-[11px] text-slate-400">
                  {totalItems} {totalItems === 1 ? 'producto' : 'productos'} seleccionados
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Cerrar carrito"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Cart items list or empty view */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <ShoppingBag className="w-8 h-8 text-slate-600 mx-auto" />
                <h3 className="text-sm font-bold text-white">El carrito está vacío</h3>
                <p className="text-xs text-slate-400 max-w-xs mx-auto">
                  Agrega productos desde el catálogo para iniciar tu pedido.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs rounded transition-colors cursor-pointer"
                >
                  Ver Catálogo
                </button>
              </div>
            ) : (
              <>
                {/* Items */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 pb-1.5 border-b border-slate-800">
                    <span>Artículos</span>
                    <button
                      onClick={clearCart}
                      className="text-slate-400 hover:text-red-400 cursor-pointer flex items-center gap-1 text-[11px]"
                    >
                      <Trash2 className="w-3 h-3" />
                      Vaciar
                    </button>
                  </div>

                  {cart.map((item) => (
                    <div
                      key={item.producto.id}
                      className="flex gap-3 p-3 bg-slate-950 rounded-lg border border-slate-800"
                    >
                      {/* Image Thumbnail */}
                      <div className="w-14 h-14 rounded bg-slate-900 overflow-hidden shrink-0 border border-slate-800">
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
                        <h4 className="text-xs font-bold text-white truncate">
                          {item.producto.nombre}
                        </h4>
                        <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                          <span>{item.producto.material}</span>
                          {item.selectedColor && (
                            <>
                              <span>·</span>
                              <span className="text-slate-300">{item.selectedColor}</span>
                            </>
                          )}
                        </div>
                        <div className="text-xs font-mono font-bold text-white mt-1 tabular-nums">
                          {formatPrice(item.producto.precio)}
                        </div>
                      </div>

                      {/* Quantity & Delete */}
                      <div className="flex flex-col justify-between items-end">
                        <button
                          onClick={() => removeFromCart(item.producto.id)}
                          className="text-slate-500 hover:text-red-400 p-0.5 cursor-pointer"
                          title="Eliminar"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>

                        <div className="flex items-center border border-slate-800 rounded bg-slate-900 text-xs">
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
                <form id="checkout-form" onSubmit={handleCheckout} className="pt-3 border-t border-slate-800 space-y-3">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    <MapPin className="w-3.5 h-3.5 text-sky-400" />
                    <span>Datos de Envío o Retiro</span>
                  </div>

                  {formError && (
                    <p className="text-xs text-red-400 bg-red-950/40 p-2 rounded border border-red-900/60">
                      {formError}
                    </p>
                  )}

                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Nombre y Apellido *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Lucas Morales"
                      value={customer.nombre}
                      onChange={(e) => setCustomer({ ...customer, nombre: e.target.value })}
                      className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded text-xs text-white placeholder-slate-600 focus:outline-none focus:border-slate-600"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Ciudad / Localidad</label>
                      <input
                        type="text"
                        placeholder="San Pedro de Jujuy"
                        value={customer.ciudad}
                        onChange={(e) => setCustomer({ ...customer, ciudad: e.target.value })}
                        className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded text-xs text-white placeholder-slate-600 focus:outline-none focus:border-slate-600"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Dirección / Retiro</label>
                      <input
                        type="text"
                        placeholder="Domicilio o Retiro en taller"
                        value={customer.direccion}
                        onChange={(e) => setCustomer({ ...customer, direccion: e.target.value })}
                        className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded text-xs text-white placeholder-slate-600 focus:outline-none focus:border-slate-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Forma de pago</label>
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
                          className={`py-1.5 text-[11px] font-medium rounded border transition-colors cursor-pointer ${
                            customer.metodoPago === m.id
                              ? 'bg-slate-800 border-slate-600 text-white font-semibold'
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
                      placeholder="Color preferido, instrucciones de entrega..."
                      value={customer.notas || ''}
                      onChange={(e) => setCustomer({ ...customer, notas: e.target.value })}
                      className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded text-xs text-white placeholder-slate-600 focus:outline-none focus:border-slate-600"
                    />
                  </div>
                </form>
              </>
            )}
          </div>

          {/* Footer Summary & Checkout Actions */}
          {cart.length > 0 && (
            <div className="p-5 bg-slate-950 border-t border-slate-800 space-y-3.5">
              
              <div className="space-y-1 text-xs text-slate-400">
                <div className="flex justify-between">
                  <span>Subtotal productos:</span>
                  <span className="font-mono text-slate-200 tabular-nums">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Entrega / Envío:</span>
                  <span className="text-slate-300 font-medium">A coordinar por WhatsApp</span>
                </div>
                <div className="pt-2 border-t border-slate-800 flex justify-between items-baseline">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">Total:</span>
                  <span className="font-mono text-xl font-bold text-white tabular-nums">
                    {formatPrice(subtotal)}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  type="submit"
                  form="checkout-form"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Enviar Pedido a WhatsApp</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </button>

                <div className="flex items-center justify-between text-[11px] text-slate-500 px-0.5">
                  <span>wa.me/{WHATSAPP_PHONE}</span>
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className="inline-flex items-center gap-1 text-slate-400 hover:text-white cursor-pointer"
                  >
                    {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copied ? 'Copiado' : 'Copiar enlace'}</span>
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
