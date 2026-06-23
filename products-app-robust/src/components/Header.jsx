export default function Header({ search, onSearchChange }) {
  return (
    <header className="app-header">
      <h1>🛒 Tienda</h1>
      <input
        type="text"
        placeholder="Buscar productos…"
        value={search}
        onChange={onSearchChange}
      />
    </header>
  )
}
