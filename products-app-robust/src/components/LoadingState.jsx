export default function LoadingState({ message = 'Cargando…' }) {
  return (
    <div className="loading-state">
      <div className="loading-spinner" />
      <p>{message}</p>
    </div>
  )
}
