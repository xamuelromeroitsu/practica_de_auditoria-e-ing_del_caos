const FALLBACK_IMAGE = 'https://placehold.co/280x200?text=Sin+imagen'

export default function ProductCard({ product, isFavorite, onToggleFavorite }) {
  return (
    <div className="product-card">
      {/* ✓ ROBUST: fallback image if src is null/empty/broken */}
      <img
        src={product.image || FALLBACK_IMAGE}
        alt={product.name}
        onError={e => { e.target.src = FALLBACK_IMAGE }}
      />
      <h3>{product.name}</h3>
      <p className="price">${product.price}</p>
      <button
        className={isFavorite ? 'btn-fav active' : 'btn-fav'}
        onClick={() => onToggleFavorite(product.id)}
      >
        {isFavorite ? '★ Favorito' : '☆ Favorito'}
      </button>
    </div>
  )
}
