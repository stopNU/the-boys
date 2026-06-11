import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import MapPage from './pages/MapPage'
import QuizPage from './pages/QuizPage'
import './App.css'

export default function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <nav className="navbar">
          <span className="brand">🍺 The Boys</span>
          <div className="nav-links">
            <NavLink to="/" end>
              Beer Map
            </NavLink>
            <NavLink to="/quiz">Quiz</NavLink>
          </div>
        </nav>
        <main className="main">
          <Routes>
            <Route path="/" element={<MapPage />} />
            <Route path="/quiz" element={<QuizPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}
