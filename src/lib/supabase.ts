import { createClient } from '@supabase/supabase-js';
import type { Producto } from '../types.ts';

export const SUPABASE_URL = 'https://qljbqulwtktyvplqftqs.supabase.co';
export const SUPABASE_KEY = 'sb_publishable_qMqUrgTpQsUzFDAlNTn_DQ_nwrsrePk';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Default fallback items in case of network glitch or to showcase the full range alongside live Supabase items
export const SAMPLE_SHOWCASE_PRODUCTS: Producto[] = [
  {
    id: 101,
    nombre: 'Soporte Geométrico Headset Pro',
    precio: 7500,
    imagen_url: '/src/assets/images/hero_gaming3d_showcase_1794327290861.jpg',
    material: 'PLA+ Alta Resistencia',
    stock: 8,
    descripcion: 'Diseño poligonal ergonómico para auriculares gamer. Base pesada antideslizante con acabado mate suave y soporte para cable.',
    color: 'Negro Mate / Carbono',
    categoria: 'Soportes'
  },
  {
    id: 102,
    nombre: 'Dock Dual para Mandos (PS5 / Xbox)',
    precio: 6800,
    imagen_url: '/src/assets/images/custom_accessories_3d_1794327292349.jpg',
    material: 'PETG Reforzado',
    stock: 5,
    descripcion: 'Estación de apoyo y exhibición para dos mandos gaming. Permite carga simultánea y organización sin rayar los gatillos.',
    color: 'Obsidiana & Oro',
    categoria: 'Organizadores'
  },
  {
    id: 103,
    nombre: 'Dragón Articulado Guardián de Setup',
    precio: 5200,
    imagen_url: '/src/assets/images/custom_accessories_3d_1794327292349.jpg',
    material: 'PLA Seda Bicolor',
    stock: 12,
    descripcion: 'Figura coleccionable totalmente articulada impresa en una sola pieza. Textura táctil hipnótica y acabado brillante.',
    color: 'Dorado Metálico',
    categoria: 'Coleccionables'
  }
];

export async function fetchProductosFromSupabase(): Promise<{ data: Producto[]; error: string | null }> {
  try {
    const { data, error } = await supabase
      .from('productos')
      .select('*')
      .order('id', { ascending: true });

    if (error) {
      console.error('Error fetching productos from Supabase:', error);
      return { data: [], error: error.message };
    }

    if (!data || data.length === 0) {
      return { data: [], error: null };
    }

    // Normalize items
    const normalized: Producto[] = data.map((item: any) => ({
      id: item.id,
      nombre: item.nombre || 'Producto 3D',
      precio: Number(item.precio) || 0,
      imagen_url: item.imagen_url || '',
      material: item.material || 'PLA',
      stock: item.stock !== undefined && item.stock !== null ? Number(item.stock) : 10,
      descripcion: item.descripcion || 'Accesorio artesanal impreso en 3D para tu setup gamer.',
      color: item.color || 'Negro',
      created_at: item.created_at,
      categoria: item.categoria || 'Accesorios'
    }));

    return { data: normalized, error: null };
  } catch (err: any) {
    console.error('Unexpected Supabase connection error:', err);
    return { data: [], error: err?.message || 'Error de conexión con la base de datos' };
  }
}
