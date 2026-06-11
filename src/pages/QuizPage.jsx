import { useState } from 'react'
import { quizzes } from '../data/quizzes'

const PLAYERS = ['Patrick', 'Jacob']
const storageKey = (quizId, player) => `quiz:${quizId}:${player}`

function loadAnswers(quizId, player) {
  try {
    const raw = localStorage.getItem(storageKey(quizId, player))
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function saveAnswers(quizId, player, answers) {
  localStorage.setItem(storageKey(quizId, player), JSON.stringify(answers))
}

function scoreFor(quiz, answers) {
  return answers.reduce(
    (score, choice, i) => score + (choice === quiz.questions[i].answer ? 1 : 0),
    0,
  )
}

function QuizPicker({ onSelect }) {
  return (
    <div className="quiz-home">
      <h2>Pick a quiz</h2>
      <p className="quiz-home-subtitle">Most correct answers wins. Loser buys the next round.</p>
      <div className="quiz-list">
        {quizzes.map((quiz) => {
          const finished = PLAYERS.filter(
            (p) => loadAnswers(quiz.id, p).length >= quiz.questions.length,
          )
          return (
            <button key={quiz.id} className="quiz-pick-button" onClick={() => onSelect(quiz)}>
              <span className="quiz-pick-title">
                {quiz.emoji} {quiz.title}
              </span>
              <span className="quiz-pick-description">{quiz.description}</span>
              <span className="player-status">
                {finished.length === PLAYERS.length
                  ? 'Both players finished ✔'
                  : finished.length === 1
                    ? `${finished[0]} has finished`
                    : `${quiz.questions.length} questions`}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

function PlayerSelect({ quiz, onSelect, onBack }) {
  return (
    <div className="quiz-card">
      <h2>
        {quiz.emoji} {quiz.title}
      </h2>
      <p>{quiz.questions.length} questions. Who are you?</p>
      <div className="player-buttons">
        {PLAYERS.map((player) => {
          const answers = loadAnswers(quiz.id, player)
          const done = answers.length >= quiz.questions.length
          return (
            <button key={player} className="player-button" onClick={() => onSelect(player)}>
              <span className="player-name">{player}</span>
              <span className="player-status">
                {done
                  ? 'Finished ✔'
                  : answers.length > 0
                    ? `In progress (${answers.length}/${quiz.questions.length})`
                    : 'Not started'}
              </span>
            </button>
          )
        })}
      </div>
      <button className="back-button" onClick={onBack}>
        ← All quizzes
      </button>
    </div>
  )
}

function Question({ quiz, index, chosen, onAnswer, onNext }) {
  const q = quiz.questions[index]
  const answered = chosen != null

  return (
    <div className="quiz-card">
      <p className="quiz-progress">
        Question {index + 1} of {quiz.questions.length}
      </p>
      <h2>{q.question}</h2>
      <div className="choices">
        {q.choices.map((choice, i) => {
          let className = 'choice-button'
          if (answered) {
            if (i === q.answer) className += ' correct'
            else if (i === chosen) className += ' wrong'
            else className += ' faded'
          }
          return (
            <button
              key={i}
              className={className}
              disabled={answered}
              onClick={() => onAnswer(i)}
            >
              {choice}
            </button>
          )
        })}
      </div>
      {answered && (
        <div className="feedback">
          <p className="feedback-result">
            {chosen === q.answer ? '✅ Correct!' : `❌ Wrong — it was “${q.choices[q.answer]}”.`}
          </p>
          {q.info && <p className="feedback-info">{q.info}</p>}
          <button className="next-button" onClick={onNext}>
            {index + 1 < quiz.questions.length ? 'Next question →' : 'See results →'}
          </button>
        </div>
      )}
    </div>
  )
}

function Results({ quiz, player, onSwitchPlayer, onBack, onReset }) {
  const scores = PLAYERS.map((p) => {
    const answers = loadAnswers(quiz.id, p)
    return {
      player: p,
      done: answers.length >= quiz.questions.length,
      score: scoreFor(quiz, answers),
    }
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
      <h2>
        {quiz.emoji} {quiz.title} — {player}
      </h2>
      <p className="big-score">
        {myScore.score} / {quiz.questions.length}
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
        <button onClick={onBack}>All quizzes</button>
        <button className="danger" onClick={onReset}>
          Reset this quiz
        </button>
      </div>
    </div>
  )
}

export default function QuizPage() {
  const [quiz, setQuiz] = useState(null)
  const [player, setPlayer] = useState(null)
  const [answers, setAnswers] = useState([])
  // Index of the question whose feedback is currently shown, or null.
  const [reviewing, setReviewing] = useState(null)

  const selectQuiz = (q) => {
    setQuiz(q)
    setPlayer(null)
    setReviewing(null)
  }

  const selectPlayer = (p) => {
    setPlayer(p)
    setAnswers(loadAnswers(quiz.id, p))
    setReviewing(null)
  }

  const answer = (choiceIndex) => {
    const next = [...answers, choiceIndex]
    setAnswers(next)
    saveAnswers(quiz.id, player, next)
    setReviewing(next.length - 1)
  }

  const reset = () => {
    if (!confirm(`Reset both players’ answers for the ${quiz.title}?`)) return
    PLAYERS.forEach((p) => localStorage.removeItem(storageKey(quiz.id, p)))
    setPlayer(null)
    setAnswers([])
    setReviewing(null)
  }

  if (!quiz) return <QuizPicker onSelect={selectQuiz} />

  if (!player) {
    return <PlayerSelect quiz={quiz} onSelect={selectPlayer} onBack={() => setQuiz(null)} />
  }

  const showingFeedback = reviewing != null
  if (!showingFeedback && answers.length >= quiz.questions.length) {
    return (
      <Results
        quiz={quiz}
        player={player}
        onSwitchPlayer={() => setPlayer(null)}
        onBack={() => setQuiz(null)}
        onReset={reset}
      />
    )
  }

  const quit = () => {
    setQuiz(null)
    setPlayer(null)
    setReviewing(null)
  }

  const index = showingFeedback ? reviewing : answers.length
  return (
    <div className="quiz-wrapper">
      <div className="quiz-topbar">
        <span className="playing-as">
          {quiz.emoji} {quiz.title} — <strong>{player}</strong>
        </span>
        <button className="close-button" onClick={quit} aria-label="Exit quiz" title="Exit quiz">
          ✕
        </button>
      </div>
      <Question
        quiz={quiz}
        index={index}
        chosen={showingFeedback ? answers[index] : null}
        onAnswer={answer}
        onNext={() => setReviewing(null)}
      />
    </div>
  )
}
