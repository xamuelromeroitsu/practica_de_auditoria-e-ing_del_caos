import { useState, useEffect } from 'react'
import { mockProducts } from './mockProducts'

export default function App() {
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState('')
  
  // 💣 FALLO CRÍTICO (LocalStorage): 
  // Si un usuario o script edita las DevTools e inyecta un string inválido (ej: "hola"),
  // JSON.parse romperá la aplicación inmediatamente al recargar, dejando una pantalla en blanco.
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem('favorites') || '[]')
  )
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    
    // ⚠️ FALLO DE ROBUSTEZ (Control de Flujo Asíncrono):
    // Las operaciones externas (APIs, Base de datos) siempre pueden fallar (servidor caído, timeout).
    // Al no envolver esto en un bloque try/catch, si ocurre un error inesperado, la aplicación 
    // arrojará una excepción no controlada y se quedará en un limbo visual permanente.
    setTimeout(() => {
      setProducts(mockProducts)
      setIsLoading(false)
    }, 800)
  }, [])

  // ⚠️ FALLO DE SEGURIDAD Y UX (Validación Fantasma):
  // El cliente no puede confiar en que el usuario escribirá datos perfectos. 
  // Al no validar el formato del email, procesamos basura (ej: espacios en blanco, texto plano sin '@').
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
    
    // ⚠️ FALLO DE PERSISTENCIA SILENCIOSA:
    // Si el almacenamiento local del dispositivo está lleno (QuotaExceededError) o deshabilitado 
    // por políticas de privacidad del navegador, esta línea arrojará un error fatal en caliente.
    localStorage.setItem('favorites', JSON.stringify(updated))
  }

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  )

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
        {/* ❌ FALLO DE UX (Zombi UI):
            El estado 'isLoading' cambia a 'true', pero aquí abajo renderizamos el grid directo.
            Durante 800ms el usuario ve una pantalla vacía sin saber si la app se congeló o está cargando. */}
        
        {/* ❌ FALLO DE UX (Empty State Ausente):
            Si 'filtered.length === 0' porque la búsqueda no coincide con nada, el mapa no se ejecuta.
            El resultado es un hueco vacío en la pantalla. Falta un feedback claro: "No se encontraron productos". */}
        <div className="product-grid">
          {filtered.map(product => (
            <div key={product.id} className="product-card">
              
              {/* 💣 FALLO VISUAL (Falta de Fallback en Medios):
                  Como vimos en tu mockData, el ID 2 tiene 'null' y el ID 4 tiene ''.
                  El navegador intentará cargar una ruta inválida rompiendo la estética.
                  Falta controlar cadenas vacías y añadir el evento onError de HTML. */}
              <img src={product.image} alt={product.name} />
              
              <h3>={product.name}</h3>
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
          <form onSubmit={handleSubscribe}>
            {/* ❌ FALLO DE ACCESIBILIDAD Y VALIDACIÓN:
                El atributo 'type' es "text", impidiendo que los navegadores móviles optimicen 
                el teclado con el botón '@'. Debería ser estrictamente type="email". */}
            <input
              type="text"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="tu@email.com"
            />
            {/* ❌ FALLO DE CONCURRENCIA / ACCIÓN:
                El botón está libre todo el tiempo. Un usuario puede enviar el formulario vacío, 
                o hacer spam-click enviando múltiples peticiones idénticas por segundo. */}
            <button type="submit">Suscribirse</button>
          </form>
        </section>
      </main>
    </div>
  )
}