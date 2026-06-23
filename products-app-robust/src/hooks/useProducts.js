// ✓ ROBUST: loading + error + empty state managed, cleanup on unmount
import { useState, useEffect } from 'react'
import { mockProducts } from '../data/mockProducts'

export function useProducts(search) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    const timer = setTimeout(() => {
      if (cancelled) return
      try {
        setProducts(mockProducts)
        setLoading(false)
      } catch (err) {
        setError('No se pudieron cargar los productos.')
        setLoading(false)
      }
    }, 800)

    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [])

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  )

  return { products: filtered, loading, error }
}
