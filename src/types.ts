export interface Producto {
  id: number | string;
  nombre: string;
  precio: number;
  imagen_url: string;
  material: string;
  stock?: number | null;
  descripcion?: string | null;
  color?: string | null;
  created_at?: string;
  categoria?: string;
}

export interface CartItem {
  producto: Producto;
  cantidad: number;
  selectedColor?: string;
}

export interface OrderCustomerInfo {
  nombre: string;
  telefono?: string;
  direccion: string;
  ciudad: string;
  metodoPago: 'transferencia' | 'efectivo' | 'mercadopago';
  notas?: string;
}
