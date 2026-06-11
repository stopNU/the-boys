import { useState } from 'react'
import { questions } from '../data/questions'

const PLAYERS = ['Patrick', 'Jacob']
const storageKey = (player) => `beer-quiz:${player}`

function loadAnswers(player) {
  try {
    const raw = localStorage.getItem(storageKey(player))
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function saveAnswers(player, answers) {
  localStorage.setItem(storageKey(player), JSON.stringify(answers))
}

function scoreFor(answers) {
  return answers.reduce(
    (score, choice, i) => score + (choice === questions[i].answer ? 1 : 0),
    0,
  )
}

function PlayerSelect({ onSelect }) {
  return (
    <div className="quiz-card">
      <h2>🍻 Beer Quiz Showdown</h2>
      <p>
        {questions.length} questions. Most correct answers wins. Who are you?
      </p>
      <div className="player-buttons">
        {PLAYERS.map((player) => {
          const answers = loadAnswers(player)
          const done = answers.length >= questions.length
          return (
            <button key={player} className="player-button" onClick={() => onSelect(player)}>
              <span className="player-name">{player}</span>
              <span className="player-status">
                {done
                  ? 'Finished ✔'
                  : answers.length > 0
                    ? `In progress (${answers.length}/${questions.length})`
                    : 'Not started'}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

function Question({ index, onAnswer }) {
  const q = questions[index]
  return (
    <div className="quiz-card">
      <p className="quiz-progress">
        Question {index + 1} of {questions.length}
      </p>
      <h2>{q.question}</h2>
      <div className="choices">
        {q.choices.map((choice, i) => (
          <button key={i} className="choice-button" onClick={() => onAnswer(i)}>
            {choice}
          </button>
        ))}
      </div>
    </div>
  )
}

function Results({ player, onSwitchPlayer, onResetAll }) {
  const scores = PLAYERS.map((p) => {
    const answers = loadAnswers(p)
    return { player: p, done: answers.length >= questions.length, score: scoreFor(answers) }
  })
  const bothDone = scores.every((s) => s.done)
  const myScore = scores.find((s) => s.player === player)

  let verdict = null
  if (bothDone) {
    const [a, b] = scores
    verdict =
      a.score === b.score
        ? "🤝 It's a tie! Settle it over a beer."
        : `🏆 ${a.score > b.score ? a.player : b.player} wins!`
  }

  return (
    <div className="quiz-card">
      <h2>Your result, {player}</h2>
      <p className="big-score">
        {myScore.score} / {questions.length}
      </p>
      <div className="scoreboard">
        {scores.map((s) => (
          <div key={s.player} className="score-row">
            <span>{s.player}</span>
            <span>{s.done ? `${s.score} pts` : 'Not finished yet'}</span>
          </div>
        ))}
      </div>
      {verdict ? (
        <p className="verdict">{verdict}</p>
      ) : (
        <p className="verdict">Waiting for the other player to finish…</p>
      )}
      <div className="result-actions">
        <button onClick={onSwitchPlayer}>Switch player</button>
        <button className="danger" onClick={onResetAll}>
          Reset game
        </button>
      </div>
    </div>
  )
}

export default function QuizPage() {
  const [player, setPlayer] = useState(null)
  const [answers, setAnswers] = useState([])

  const selectPlayer = (p) => {
    setPlayer(p)
    setAnswers(loadAnswers(p))
  }

  const answer = (choiceIndex) => {
    const next = [...answers, choiceIndex]
    setAnswers(next)
    saveAnswers(player, next)
  }

  const resetAll = () => {
    if (!confirm('Reset both players’ answers and start over?')) return
    PLAYERS.forEach((p) => localStorage.removeItem(storageKey(p)))
    setPlayer(null)
    setAnswers([])
  }

  if (!player) return <PlayerSelect onSelect={selectPlayer} />

  if (answers.length >= questions.length) {
    return <Results player={player} onSwitchPlayer={() => setPlayer(null)} onResetAll={resetAll} />
  }

  return (
    <div className="quiz-wrapper">
      <p className="playing-as">
        Playing as <strong>{player}</strong>
      </p>
      <Question index={answers.length} onAnswer={answer} />
    </div>
  )
}
