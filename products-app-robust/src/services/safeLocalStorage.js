// ✓ ROBUST: protects against corrupted JSON and storage quota errors
export const safeLocalStorage = {
  get(key, fallback = null) {
    try {
      const item = localStorage.getItem(key)
      if (item === null) return fallback
      return JSON.parse(item)
    } catch {
      console.warn(`safeLocalStorage: could not parse "${key}", returning fallback`)
      return fallback
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value))
      return true
    } catch {
      console.warn(`safeLocalStorage: could not save "${key}"`)
      return false
    }
  },
}
