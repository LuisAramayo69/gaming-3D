import React, { createContext, useContext, useState, useEffect } from 'react';
import type { CartItem, Producto, OrderCustomerInfo } from '../types.ts';
import confetti from 'canvas-confetti';

interface CartContextType {
  cart: CartItem[];
  addToCart: (producto: Producto, cantidad?: number, color?: string) => void;
  removeFromCart: (id: number | string) => void;
  updateQuantity: (id: number | string, cantidad: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  notification: string | null;
  generateWhatsAppLink: (customerInfo: OrderCustomerInfo) => string;
  proceedToCheckout: (customerInfo: OrderCustomerInfo) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = 'gaming3d_cart_v1';
export const WHATSAPP_PHONE = '5493884597391';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error loading cart from localStorage', e);
    }
    return [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Error saving cart to localStorage', e);
    }
  }, [cart]);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification((curr) => (curr === msg ? null : curr));
    }, 2800);
  };

  const addToCart = (producto: Producto, cantidad: number = 1, color?: string) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.producto.id === producto.id);
      if (existingIndex > -1) {
        const next = [...prev];
        const newQty = next[existingIndex].cantidad + cantidad;
        next[existingIndex] = {
          ...next[existingIndex],
          cantidad: newQty,
          selectedColor: color || next[existingIndex].selectedColor
        };
        return next;
      } else {
        return [...prev, { producto, cantidad, selectedColor: color || producto.color || undefined }];
      }
    });
    showToast(`✓ "${producto.nombre}" agregado al carrito`);
  };

  const removeFromCart = (id: number | string) => {
    setCart((prev) => prev.filter((item) => item.producto.id !== id));
  };

  const updateQuantity = (id: number | string, cantidad: number) => {
    if (cantidad <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.producto.id === id ? { ...item, cantidad } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalItems = cart.reduce((acc, item) => acc + item.cantidad, 0);
  const subtotal = cart.reduce(
    (acc, item) => acc + item.producto.precio * item.cantidad,
    0
  );

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0
    }).format(val);
  };

  const generateWhatsAppMessage = (customer: OrderCustomerInfo) => {
    const dateStr = new Date().toLocaleDateString('es-AR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    let msg = `🎮 *PEDIDO GAMING 3D* 🎮\n`;
    msg += `_"Vivir y jugar con grandeza"_\n`;
    msg += `📅 Fecha: ${dateStr}\n\n`;

    msg += `🛒 *DETALLE DEL PEDIDO:*\n`;
    cart.forEach((item, index) => {
      const itemSub = item.producto.precio * item.cantidad;
      const colorText = item.selectedColor ? ` | Color: ${item.selectedColor}` : '';
      msg += `${index + 1}. *${item.producto.nombre}*\n`;
      msg += `   • Cantidad: ${item.cantidad} un.\n`;
      msg += `   • Material: ${item.producto.material}${colorText}\n`;
      msg += `   • Precio unitario: ${formatPrice(item.producto.precio)}\n`;
      msg += `   • Subtotal: ${formatPrice(itemSub)}\n\n`;
    });

    msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `💰 *TOTAL A PAGAR: ${formatPrice(subtotal)}*\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━━\n\n`;

    msg += `👤 *DATOS DEL CLIENTE PARA ENVÍO/ENTREGA:*\n`;
    msg += `• *Nombre:* ${customer.nombre.trim()}\n`;
    if (customer.telefono) {
      msg += `• *Teléfono:* ${customer.telefono.trim()}\n`;
    }
    msg += `• *Ciudad / Provincia:* ${customer.ciudad.trim()}\n`;
    msg += `• *Dirección:* ${customer.direccion.trim()}\n`;
    msg += `• *Método de pago preferido:* ${
      customer.metodoPago === 'transferencia'
        ? 'Transferencia Bancaria (Alias/CBU)'
        : customer.metodoPago === 'mercadopago'
        ? 'Mercado Pago'
        : 'Efectivo / Pago al retirar en Jujuy'
    }\n`;

    if (customer.notas && customer.notas.trim()) {
      msg += `• *Notas o detalles especiales:* ${customer.notas.trim()}\n`;
    }

    msg += `\n👋 ¡Hola Gaming 3D! Quisiera confirmar este pedido y coordinar el pago y la entrega. ¡Muchas gracias!`;

    return msg;
  };

  const generateWhatsAppLink = (customerInfo: OrderCustomerInfo) => {
    const text = generateWhatsAppMessage(customerInfo);
    return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`;
  };

  const proceedToCheckout = (customerInfo: OrderCustomerInfo) => {
    const link = generateWhatsAppLink(customerInfo);
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // ignore
    }
    // Open WhatsApp link in new tab or direct window
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        isCartOpen,
        setIsCartOpen,
        notification,
        generateWhatsAppLink,
        proceedToCheckout
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
