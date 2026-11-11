import { useState, useEffect, useMemo } from 'react';
import { Search, Filter, RotateCw, ShoppingBag, Eye, Layers, AlertCircle, CheckCircle2, PackageCheck } from 'lucide-react';
import type { Producto } from '../types.ts';
import { fetchProductosFromSupabase, SAMPLE_SHOWCASE_PRODUCTS } from '../lib/supabase.ts';
import { useCart } from '../context/CartContext.tsx';

interface ProductCatalogProps {
  onSelectProduct: (producto: Producto) => void;
}

export default function ProductCatalog({ onSelectProduct }: ProductCatalogProps) {
  const { addToCart } = useCart();
  const [supabaseProducts, setSupabaseProducts] = useState<Producto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedMaterial, setSelectedMaterial] = useState<string>('todos');
  const [sortBy, setSortBy] = useState<'precio-asc' | 'precio-desc' | 'recientes'>('precio-asc');
  const [includeShowcase, setIncludeShowcase] = useState<boolean>(true);

  const loadProducts = async () => {
    setLoading(true);
    setError(null);
    const { data, error: fetchErr } = await fetchProductosFromSupabase();
    if (fetchErr) {
      setError(fetchErr);
    } else {
      setSupabaseProducts(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // Combine products: Supabase products first, optionally followed by showcase items if requested
  const allProducts = useMemo(() => {
    const list = [...supabaseProducts];
    if (includeShowcase) {
      // Add items from showcase that aren't already represented
      SAMPLE_SHOWCASE_PRODUCTS.forEach((item) => {
        if (!list.some((p) => p.nombre.toLowerCase() === item.nombre.toLowerCase())) {
          list.push(item);
        }
      });
    }
    return list;
  }, [supabaseProducts, includeShowcase]);

  // Extract materials for filter tabs
  const availableMaterials = useMemo(() => {
    const mats = new Set<string>();
    allProducts.forEach((p) => {
      if (p.material) {
        // extract base material name like 'PLA' or 'PETG'
        const base = p.material.split(' ')[0].toUpperCase();
        mats.add(base);
      }
    });
    return Array.from(mats);
  }, [allProducts]);

  // Filter & sort
  const filteredProducts = useMemo(() => {
    return allProducts
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
        return 0;
      });
  }, [allProducts, searchQuery, selectedMaterial, sortBy]);

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <section id="catalogo" className="py-16 bg-[#0b0f17] border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-800/80">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
              <Layers className="w-4 h-4" />
              <span>Catálogo Oficial Supabase</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black font-display text-white tracking-tight">
              Piezas y Accesorios para Gamers
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-xl">
              Modelos listos para entrega inmediata o fabricados a demanda con tolerancias micrométricas y materiales técnicos.
            </p>
          </div>

          {/* Sync & Refresh Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={loadProducts}
              disabled={loading}
              className="inline-flex items-center gap-2 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-xs font-medium text-slate-300 hover:text-white rounded-lg transition-colors cursor-pointer disabled:opacity-50"
              title="Recargar productos desde Supabase"
            >
              <RotateCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-amber-400' : ''}`} />
              <span>Actualizar catálogo</span>
            </button>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="py-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por nombre, soporte, celular..."
              className="w-full pl-10 pr-4 py-2 bg-slate-900/90 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400/80 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                Limpiar
              </button>
            )}
          </div>

          {/* Material Segmented Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-900/80 border border-slate-800 rounded-xl">
            <button
              onClick={() => setSelectedMaterial('todos')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                selectedMaterial === 'todos'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Todos ({allProducts.length})
            </button>
            {availableMaterials.map((mat) => (
              <button
                key={mat}
                onClick={() => setSelectedMaterial(mat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                  selectedMaterial === mat
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {mat}
              </button>
            ))}
          </div>

          {/* Sort selection */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs text-slate-500 font-medium">Ordenar:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-slate-900/90 border border-slate-800 rounded-xl text-xs text-slate-200 py-2 px-3 focus:outline-none focus:ring-1 focus:ring-amber-400 cursor-pointer"
            >
              <option value="precio-asc">Precio: Menor a Mayor</option>
              <option value="precio-desc">Precio: Mayor a Menor</option>
              <option value="recientes">Recientes</option>
            </select>
          </div>

        </div>

        {/* Database Notice Bar */}
        {supabaseProducts.length > 0 && (
          <div className="mb-6 px-4 py-2.5 rounded-lg bg-emerald-950/30 border border-emerald-800/40 flex items-center justify-between text-xs text-emerald-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                Conectado a Supabase en tiempo real: <strong>{supabaseProducts.length} producto(s)</strong> sincronizado(s) desde la tabla <code>productos</code>.
              </span>
            </div>
            <label className="flex items-center gap-2 cursor-pointer text-slate-400 hover:text-white">
              <input
                type="checkbox"
                checked={includeShowcase}
                onChange={(e) => setIncludeShowcase(e.target.checked)}
                className="rounded border-slate-700 bg-slate-900 text-amber-500 focus:ring-amber-400 cursor-pointer"
              />
              <span className="text-xs">Ver modelos del taller</span>
            </label>
          </div>
        )}

        {/* Error Notice */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-950/40 border border-red-800/50 flex items-center gap-3 text-sm text-red-200">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
            <div>
              <p className="font-semibold">Aviso de conexión Supabase:</p>
              <p className="text-xs text-red-300">{error}. Mostrando piezas del catálogo del taller.</p>
            </div>
          </div>
        )}

        {/* Loading skeleton */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse bg-slate-900 rounded-2xl p-4 border border-slate-800 space-y-4">
                <div className="w-full h-52 bg-slate-800 rounded-xl" />
                <div className="h-4 bg-slate-800 rounded w-3/4" />
                <div className="h-3 bg-slate-800 rounded w-1/2" />
                <div className="flex justify-between items-center pt-2">
                  <div className="h-6 bg-slate-800 rounded w-20" />
                  <div className="h-9 bg-slate-800 rounded w-28" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Product Grid */}
        {!loading && filteredProducts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
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
          <div className="text-center py-16 bg-slate-900/50 rounded-2xl border border-slate-800 p-8 space-y-4">
            <PackageCheck className="w-12 h-12 text-slate-500 mx-auto" />
            <h3 className="text-lg font-bold text-white">No se encontraron productos</h3>
            <p className="text-sm text-slate-400 max-w-md mx-auto">
              No hay piezas que coincidan con &ldquo;{searchQuery}&rdquo; en la categoría seleccionada.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedMaterial('todos');
                setIncludeShowcase(true);
              }}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-amber-400 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
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
  const [quantity, setQuantity] = useState(1);

  const stockCount = producto.stock ?? 10;
  const isAvailable = stockCount > 0;

  return (
    <div className="group flex flex-col bg-slate-900/90 rounded-2xl border border-slate-800/80 hover:border-slate-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-500/5 overflow-hidden">
      
      {/* Product Image Area */}
      <div
        onClick={onSelect}
        className="relative aspect-[4/3] w-full bg-slate-950 overflow-hidden cursor-pointer"
      >
        {!imageError && producto.imagen_url ? (
          <img
            src={producto.imagen_url}
            alt={producto.nombre}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-slate-900 to-slate-950 text-slate-500 text-center">
            <Layers className="w-10 h-10 text-amber-500/50 mb-2" />
            <span className="text-xs font-medium text-slate-400">{producto.nombre}</span>
            <span className="text-[10px] text-slate-600 mt-1">Impresión 3D Artesanal</span>
          </div>
        )}

        {/* Material Badge (Quiet unboxed or neat corner pill) */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#0b0f17]/85 backdrop-blur-md border border-slate-700/60 text-[11px] font-semibold text-amber-300">
          <span>{producto.material}</span>
        </div>

        {/* Quick view button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelect();
          }}
          className="absolute bottom-3 right-3 p-2 bg-slate-900/90 hover:bg-amber-500 hover:text-slate-950 text-slate-300 rounded-lg backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer shadow-md"
          title="Ver detalles completos"
        >
          <Eye className="w-4 h-4" />
        </button>
      </div>

      {/* Product Details Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Metadata line with typographic separators */}
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1.5">
            <span>{producto.categoria || 'Accesorio 3D'}</span>
            <span aria-hidden="true">·</span>
            <span>{producto.color ? `Color: ${producto.color}` : 'Color a elección'}</span>
            <span aria-hidden="true">·</span>
            <span className={stockCount <= 3 ? 'text-amber-400 font-medium' : 'text-slate-400'}>
              Stock: {stockCount}
            </span>
          </div>

          {/* Product Name */}
          <h3
            onClick={onSelect}
            className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors cursor-pointer line-clamp-1"
          >
            {producto.nombre}
          </h3>

          {/* Description */}
          <p className="text-xs text-slate-400 line-clamp-2 mt-1.5 leading-relaxed">
            {producto.descripcion || 'Pieza modelada y fabricada artesanalmente en nuestro taller de Jujuy.'}
          </p>
        </div>

        {/* Price & Action row */}
        <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-3">
          <div>
            <span className="block text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
              Precio ARS
            </span>
            <span className="font-mono text-xl font-bold text-amber-400 tabular-nums">
              {formatPrice(producto.precio)}
            </span>
          </div>

          {/* Add to cart / quantity */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onAddToCart(quantity)}
              disabled={!isAvailable}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-md shadow-amber-500/10 active:scale-95 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Agregar</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
