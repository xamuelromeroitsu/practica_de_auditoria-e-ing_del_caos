// ❌ FRAGILE: everything in one component
// No empty state, no error state, no image fallback,
// no form validation, no safeLocalStorage, no cleanup

import { useState, useEffect } from 'react'
import { mockProducts } from './mockProducts'

export default function App() {
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState('')
  const [favorites, setFavorites] = useState(
    // ❌ FRAGILE: no protection against corrupted JSON
    JSON.parse(localStorage.getItem('favorites') || '[]')
  )
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    // Simulating async load with setTimeout
    setTimeout(() => {
      // ❌ FRAGILE: no error handling if this throws
      setProducts(mockProducts)
      setIsLoading(false)
    }, 800)
  }, [])

  // ❌ FRAGILE: no validation
  function handleSubscribe(e) {
    e.preventDefault()
    alert('Suscrito: ' + email)
    setEmail('')
  }

  function toggleFavorite(id) {
    const updated = favorites.includes(id)
      ? favorites.filter(f => f !== id)
      : [...favorites, id]
    setFavorites(updated)
    // ❌ FRAGILE: saves directly without try/catch
    localStorage.setItem('favorites', JSON.stringify(updated))
  }

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  )

  // ❌ FRAGILE: shows blank screen while loading (no loading state shown)
  // ❌ FRAGILE: no empty state if filtered is empty

  return (
    <div className="app">
      <header className="app-header">
        <h1>🛒 Tienda</h1>
        <input
          type="text"
          placeholder="Buscar..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </header>

      <main>
        {/* ❌ FRAGILE: isLoading does nothing visible */}
        <div className="product-grid">
          {filtered.map(product => (
            <div key={product.id} className="product-card">
              {/* ❌ FRAGILE: broken image if null or empty */}
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p className="price">${product.price}</p>
              <button
                className={favorites.includes(product.id) ? 'btn-fav active' : 'btn-fav'}
                onClick={() => toggleFavorite(product.id)}
              >
                {favorites.includes(product.id) ? '★ Favorito' : '☆ Favorito'}
              </button>
            </div>
          ))}
        </div>

        <section className="subscribe-section">
          <h2>Suscríbete a ofertas</h2>
          {/* ❌ FRAGILE: no validation, no error messages */}
          <form onSubmit={handleSubscribe}>
            <input
              type="text"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="tu@email.com"
            />
            {/* ❌ FRAGILE: button not disabled when email is empty */}
            <button type="submit">Suscribirse</button>
          </form>
        </section>
      </main>
    </div>
  )
}
