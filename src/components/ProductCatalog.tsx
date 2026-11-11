import { useState, useEffect, useMemo } from 'react';
import { Search, RotateCw, ShoppingBag, Eye, Layers, AlertCircle, CheckCircle2, PackageCheck } from 'lucide-react';
import type { Producto } from '../types.ts';
import { fetchProductosFromSupabase } from '../lib/supabase.ts';
import { useCart } from '../context/CartContext.tsx';

interface ProductCatalogProps {
  products?: Producto[];
  loading?: boolean;
  error?: string | null;
  onReload?: () => void;
  onSelectProduct: (producto: Producto) => void;
}

export default function ProductCatalog({
  products: initialProducts,
  loading: initialLoading,
  error: initialError,
  onReload: externalReload,
  onSelectProduct
}: ProductCatalogProps) {
  const { addToCart } = useCart();
  const [localProducts, setLocalProducts] = useState<Producto[]>([]);
  const [localLoading, setLocalLoading] = useState<boolean>(true);
  const [localError, setLocalError] = useState<string | null>(null);

  const products = initialProducts !== undefined ? initialProducts : localProducts;
  const loading = initialLoading !== undefined ? initialLoading : localLoading;
  const error = initialError !== undefined ? initialError : localError;

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedMaterial, setSelectedMaterial] = useState<string>('todos');
  const [sortBy, setSortBy] = useState<'precio-asc' | 'precio-desc' | 'recientes'>('recientes');

  const loadProducts = async () => {
    if (externalReload) {
      externalReload();
      return;
    }
    setLocalLoading(true);
    setLocalError(null);
    const { data, error: fetchErr } = await fetchProductosFromSupabase();
    if (fetchErr) {
      setLocalError(fetchErr);
    } else {
      setLocalProducts(data);
    }
    setLocalLoading(false);
  };

  useEffect(() => {
    if (initialProducts === undefined) {
      loadProducts();
    }
  }, [initialProducts]);

  // Extract materials for filter tabs
  const availableMaterials = useMemo(() => {
    const mats = new Set<string>();
    products.forEach((p) => {
      if (p.material) {
        const base = p.material.trim().split(' ')[0].toUpperCase();
        mats.add(base);
      }
    });
    return Array.from(mats);
  }, [products]);

  // Filter & sort
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        const matchesSearch =
          product.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (product.descripcion && product.descripcion.toLowerCase().includes(searchQuery.toLowerCase())) ||
          product.material.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesMaterial =
          selectedMaterial === 'todos' ||
          product.material.toUpperCase().includes(selectedMaterial.toUpperCase());

        return matchesSearch && matchesMaterial;
      })
      .sort((a, b) => {
        if (sortBy === 'precio-asc') return a.precio - b.precio;
        if (sortBy === 'precio-desc') return b.precio - a.precio;
        return Number(b.id) - Number(a.id);
      });
  }, [products, searchQuery, selectedMaterial, sortBy]);

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <section id="catalogo" className="py-16 bg-[#0b0f17]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
              <span>Catálogo Oficial Supabase</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight">
              Piezas en Producción
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
              Modelos activos registrados en nuestro sistema de manufactura.
            </p>
          </div>

          {/* Sync Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={loadProducts}
              disabled={loading}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-medium text-slate-300 hover:text-white rounded-md transition-colors cursor-pointer disabled:opacity-50"
              title="Sincronizar con Supabase"
            >
              <RotateCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-sky-400' : ''}`} />
              <span>Actualizar datos</span>
            </button>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="py-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar producto por nombre..."
              className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-slate-600 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                ×
              </button>
            )}
          </div>

          {/* Material Segmented Filter Tabs */}
          {availableMaterials.length > 1 && (
            <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg">
              <button
                onClick={() => setSelectedMaterial('todos')}
                className={`px-3 py-1 text-xs font-medium rounded transition-colors cursor-pointer ${
                  selectedMaterial === 'todos'
                    ? 'bg-slate-800 text-white font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Todos ({products.length})
              </button>
              {availableMaterials.map((mat) => (
                <button
                  key={mat}
                  onClick={() => setSelectedMaterial(mat)}
                  className={`px-3 py-1 text-xs font-medium rounded transition-colors cursor-pointer ${
                    selectedMaterial === mat
                      ? 'bg-slate-800 text-white font-semibold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {mat}
                </button>
              ))}
            </div>
          )}

          {/* Sort selection */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs text-slate-500">Ordenar:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-300 py-1.5 px-3 focus:outline-none focus:border-slate-600 cursor-pointer"
            >
              <option value="recientes">Más recientes</option>
              <option value="precio-asc">Precio: Menor a Mayor</option>
              <option value="precio-desc">Precio: Mayor a Menor</option>
            </select>
          </div>

        </div>

        {/* Database Status Bar */}
        <div className="mb-6 px-3.5 py-2 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>
              Base de datos en vivo: <strong>{products.length} productos registrados</strong> en la tabla <code>productos</code>.
            </span>
          </div>
          <span className="text-[11px] text-slate-500 font-mono">Supabase PostgreSQL</span>
        </div>

        {/* Error Notice */}
        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-950/30 border border-red-900/50 flex items-center gap-3 text-xs text-red-300">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <div>
              <p className="font-semibold">Error al sincronizar con Supabase:</p>
              <p className="text-slate-400">{error}</p>
            </div>
          </div>
        )}

        {/* Loading skeleton */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse bg-slate-900 rounded-xl p-4 border border-slate-800 space-y-4">
                <div className="w-full h-48 bg-slate-800 rounded-lg" />
                <div className="h-4 bg-slate-800 rounded w-3/4" />
                <div className="h-3 bg-slate-800 rounded w-1/2" />
                <div className="flex justify-between items-center pt-2">
                  <div className="h-6 bg-slate-800 rounded w-20" />
                  <div className="h-8 bg-slate-800 rounded w-24" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Product Grid (Real Supabase products only) */}
        {!loading && filteredProducts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((producto) => (
              <ProductCard
                key={producto.id}
                producto={producto}
                onSelect={() => onSelectProduct(producto)}
                onAddToCart={(qty) => addToCart(producto, qty)}
                formatPrice={formatPrice}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredProducts.length === 0 && (
          <div className="text-center py-16 bg-slate-900/40 rounded-xl border border-slate-800 p-8 space-y-3">
            <PackageCheck className="w-10 h-10 text-slate-500 mx-auto" />
            <h3 className="text-sm font-semibold text-white">No se encontraron productos</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              No hay piezas activas que coincidan con la búsqueda.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedMaterial('todos');
              }}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded transition-colors cursor-pointer"
            >
              Restablecer filtros
            </button>
          </div>
        )}

      </div>
    </section>
  );
}

interface ProductCardProps {
  producto: Producto;
  onSelect: () => void;
  onAddToCart: (qty: number) => void;
  formatPrice: (val: number) => string;
}

function ProductCard({ producto, onSelect, onAddToCart, formatPrice }: ProductCardProps) {
  const [imageError, setImageError] = useState(false);
  const stockCount = producto.stock ?? 10;
  const isAvailable = stockCount > 0;

  return (
    <div className="group flex flex-col bg-slate-900 rounded-xl border border-slate-800 hover:border-slate-700 transition-all duration-200 overflow-hidden shadow-sm">
      
      {/* Product Image Area */}
      <div
        onClick={onSelect}
        className="relative aspect-square w-full bg-slate-950 overflow-hidden cursor-pointer"
      >
        {!imageError && producto.imagen_url ? (
          <img
            src={producto.imagen_url}
            alt={producto.nombre}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300 ease-out"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-slate-950 text-slate-500 text-center">
            <Layers className="w-8 h-8 text-slate-600 mb-2" />
            <span className="text-xs font-medium text-slate-300">{producto.nombre}</span>
            <span className="text-[10px] text-slate-600 mt-0.5">Gaming 3D · San Pedro</span>
          </div>
        )}

        {/* Material indicator */}
        <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-slate-950/90 border border-slate-800 text-[10px] font-mono text-slate-300 uppercase tracking-wider">
          {producto.material}
        </div>

        {/* Quick view button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelect();
          }}
          className="absolute bottom-3 right-3 p-2 bg-slate-900/90 hover:bg-slate-800 text-slate-300 rounded border border-slate-700 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shadow"
          title="Ver especificaciones"
        >
          <Eye className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Product Details Content */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Metadata line */}
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mb-1">
            <span>Color: {producto.color || 'A coordinar'}</span>
            <span aria-hidden="true">·</span>
            <span className={stockCount <= 3 ? 'text-amber-400' : 'text-slate-400'}>
              Stock: {stockCount}
            </span>
          </div>

          {/* Product Name */}
          <h3
            onClick={onSelect}
            className="text-base font-bold text-white group-hover:text-sky-400 transition-colors cursor-pointer line-clamp-1"
          >
            {producto.nombre}
          </h3>

          {/* Description */}
          <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
            {producto.descripcion}
          </p>
        </div>

        {/* Price & Action row */}
        <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-3">
          <div>
            <span className="block text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
              Precio
            </span>
            <span className="font-mono text-lg font-bold text-white tabular-nums">
              {formatPrice(producto.precio)}
            </span>
          </div>

          <button
            onClick={() => onAddToCart(1)}
            disabled={!isAvailable}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-white text-slate-950 font-bold text-xs uppercase tracking-wider rounded-md transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Agregar</span>
          </button>
        </div>

      </div>

    </div>
  );
}
