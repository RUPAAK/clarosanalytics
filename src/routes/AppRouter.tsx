import { Route, Routes } from 'react-router-dom'
import App from '../App'
import AboutPage from '../pages/AboutPage'
import HomePage from '../pages/HomePage'
import NotFoundPage from '../pages/NotFoundPage'

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

