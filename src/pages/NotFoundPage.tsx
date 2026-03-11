import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <section style={{ display: 'grid', gap: 12 }}>
      <h2 style={{ margin: 0 }}>404</h2>
      <p style={{ margin: 0 }}>That page doesn’t exist.</p>
      <div>
        <Link to="/">Go home</Link>
      </div>
    </section>
  )
}

