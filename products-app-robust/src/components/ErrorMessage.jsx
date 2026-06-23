export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error-message">
      <span className="error-icon">❌</span>
      <p>{message}</p>
      {onRetry && (
        <button className="retry-btn" onClick={onRetry}>
          Intentar de nuevo
        </button>
      )}
    </div>
  )
}
