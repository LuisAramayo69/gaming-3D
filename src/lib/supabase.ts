import { createClient } from '@supabase/supabase-js';
import type { Producto } from '../types.ts';

export const SUPABASE_URL = 'https://qljbqulwtktyvplqftqs.supabase.co';
export const SUPABASE_KEY = 'sb_publishable_qMqUrgTpQsUzFDAlNTn_DQ_nwrsrePk';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export async function fetchProductosFromSupabase(): Promise<{ data: Producto[]; error: string | null }> {
  try {
    const { data, error } = await supabase
      .from('productos')
      .select('*')
      .order('id', { ascending: true });

    if (error) {
      console.error('Error al consultar productos en Supabase:', error);
      return { data: [], error: error.message };
    }

    if (!data || data.length === 0) {
      return { data: [], error: null };
    }

    // Normalizar exclusivamente los productos reales de la base de datos
    const normalized: Producto[] = data.map((item: any) => {
      let imgUrl = (item.imagen_url || '').trim();

      // Si material contiene descripción o viceversa
      let material = item.material || 'PLA';
      let descripcion = item.descripcion;

      if (!descripcion) {
        if (material.length > 20) {
          descripcion = material;
          material = 'PLA';
        } else {
          descripcion = `Pieza artesanal modelada e impresa en 3D (${material}). Acabado de precisión.`;
        }
      }

      return {
        id: item.id,
        nombre: item.nombre || 'Producto 3D',
        precio: Number(item.precio) || 0,
        imagen_url: imgUrl,
        material: material,
        stock: item.stock !== undefined && item.stock !== null ? Number(item.stock) : 10,
        descripcion: descripcion,
        color: item.color || 'A coordinar',
        created_at: item.created_at,
        categoria: item.categoria || 'Impresión 3D'
      };
    });

    return { data: normalized, error: null };
  } catch (err: any) {
    console.error('Error inesperado de conexión con Supabase:', err);
    return { data: [], error: err?.message || 'Error de conexión con la base de datos' };
  }
}
