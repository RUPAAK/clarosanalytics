import { Link, NavLink, Outlet } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <div className="appShell">
      <header className="appHeader">
        <Link to="/" className="brand">
          web-app
        </Link>
        <nav className="nav">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/about">About</NavLink>
        </nav>
      </header>
      <main className="appMain">
        <Outlet />
      </main>
    </div>
  )
}

export default App
