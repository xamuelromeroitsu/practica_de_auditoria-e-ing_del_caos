export default function EmptyState({ message = 'No hay datos disponibles.' }) {
  return (
    <div className="empty-state">
      <span className="empty-state-icon">📭</span>
      <p>{message}</p>
    </div>
  )
}
