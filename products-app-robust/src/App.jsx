// ✓ ROBUST: delegates to hooks and components, handles all states
import { useState } from 'react'
import Header from './components/Header'
import ProductGrid from './components/ProductGrid'
import LoadingState from './components/LoadingState'
import ErrorMessage from './components/ErrorMessage'
import SubscribeForm from './components/SubscribeForm'
import { useProducts } from './hooks/useProducts'
import { useFavorites } from './hooks/useFavorites'

export default function App() {
  const [search, setSearch] = useState('')
  const { products, loading, error } = useProducts(search)
  const { favorites, toggleFavorite } = useFavorites()

  return (
    <div className="app">
      <Header search={search} onSearchChange={e => setSearch(e.target.value)} />
      <main>
        {loading && <LoadingState message="Cargando productos…" />}
        {error && <ErrorMessage message={error} />}
        {!loading && !error && (
          <ProductGrid
            products={products}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
          />
        )}
        <section className="subscribe-section">
          <h2>Suscríbete a ofertas</h2>
          <SubscribeForm />
        </section>
      </main>
    </div>
  )
}
