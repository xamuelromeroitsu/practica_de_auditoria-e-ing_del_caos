# products-app-robust

Versión más robusta de la misma app.

No es arquitectura perfecta.
Es una **comparación didáctica** para estudiar:
- estados problemáticos (loading, error, empty, fallback),
- validación de formularios con mensajes claros,
- safeLocalStorage contra JSON corrupto,
- separación básica de responsabilidades.

## Cómo ejecutarlo

```bash
npm install
npm run dev
```

## Qué estudiar

- `src/services/safeLocalStorage.js` — protección de localStorage contra JSON corrupto
- `src/hooks/useProducts.js` — loading + error + cleanup al desmontar
- `src/components/ProductCard.jsx` — fallback de imagen cuando src es null/vacío/roto
- `src/components/SubscribeForm.jsx` — validación con mensajes claros y botón disabled
- `src/components/EmptyState.jsx` — estado vacío explícito al filtrar
- `src/components/ErrorMessage.jsx` — error con contexto y opción de reintentar
