import ProductCard from './ProductCard'
import EmptyState from './EmptyState'

export default function ProductGrid({ products, favorites, onToggleFavorite }) {
  if (products.length === 0) {
    return (
      <EmptyState message="No hay productos que coincidan con tu búsqueda." />
    )
  }

  return (
    <div className="product-grid">
      {products.map(p => (
        <ProductCard
          key={p.id}
          product={p}
          isFavorite={favorites.includes(p.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  )
}
