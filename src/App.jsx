import QuizPage from './pages/QuizPage'
import './App.css'

export default function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <span className="brand">🍺 The Boys — Beer Quiz</span>
      </nav>
      <main className="main">
        <QuizPage />
      </main>
    </div>
  )
}
