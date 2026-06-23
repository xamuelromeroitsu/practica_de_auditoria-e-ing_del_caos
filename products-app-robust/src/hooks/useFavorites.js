// ✓ ROBUST: safe read, isolated state, protected writes
import { useState } from 'react'
import { safeLocalStorage } from '../services/safeLocalStorage'

export function useFavorites() {
  const [favorites, setFavorites] = useState(
    () => safeLocalStorage.get('favorites', [])
  )

  function toggleFavorite(id) {
    const updated = favorites.includes(id)
      ? favorites.filter(f => f !== id)
      : [...favorites, id]
    setFavorites(updated)
    safeLocalStorage.set('favorites', updated)
  }

  return { favorites, toggleFavorite }
}
