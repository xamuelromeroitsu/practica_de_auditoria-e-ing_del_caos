// ✓ ROBUST: validates email, shows clear errors, disables submit when invalid
import { useState } from 'react'

export default function SubscribeForm() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const isValid = email.length > 0 && email.includes('@') && email.includes('.')

  function handleSubmit(e) {
    e.preventDefault()
    if (!email) {
      setError('El correo es obligatorio.')
      return
    }
    if (!email.includes('@')) {
      setError('Ingresa un correo válido. Ejemplo: tu@email.com')
      return
    }
    setError('')
    setSubmitted(true)
  }

  if (submitted) {
    return <p className="subscribe-success">✓ Te suscribiste con {email}</p>
  }

  return (
    <form className="subscribe-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={email}
        onChange={e => { setEmail(e.target.value); setError('') }}
        placeholder="tu@email.com"
        className={error ? 'input-error' : ''}
      />
      {error && <p className="form-error">{error}</p>}
      <button type="submit" disabled={!isValid}>
        Suscribirse
      </button>
    </form>
  )
}
