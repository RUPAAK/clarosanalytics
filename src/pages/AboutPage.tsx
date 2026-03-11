import axios from 'axios'

export default function AboutPage() {
  return (
    <section style={{ display: 'grid', gap: 12 }}>
      <h2 style={{ margin: 0 }}>About</h2>
      <p style={{ margin: 0 }}>
        Axios is installed. Example base URL:{' '}
        <code>{axios.defaults.baseURL ?? '(not set)'}</code>
      </p>
    </section>
  )
}

