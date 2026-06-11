# 🍺 The Boys — Quiz Night (during the day)

Trivia showdowns between **Patrick**, **Jacob** and **Michael**, built with [Vite](https://vite.dev) and React.

There are multiple quizzes (beer, Sofia, Russia & the Balkans, Putin, Trump, spirits & cocktails, weird history — 20 questions each). Each player picks a quiz and who they are, answers the questions one at a time, and gets instant feedback with a fun fact after every answer. Answers are saved in the browser (localStorage) per quiz and per player, so you can leave and resume. Once everyone finishes a quiz, the scoreboard declares a winner.

Since scores are stored in the browser, all players should play on the same device — pass the phone between rounds.

## Running locally

```bash
npm install
npm run dev
```

## Deploying to Vercel

1. Push this repo to GitHub (already done if you're reading this there).
2. On [vercel.com](https://vercel.com), click **Add New → Project** and import the `the-boys` repo. Vercel auto-detects Vite — keep the defaults.
3. Click **Deploy**. No environment variables needed.

## Adding or editing quizzes

- Quiz questions live in `src/data/` (`beerQuiz.js`, `sofiaQuiz.js`). Each question has `choices`, `answer` (index of the correct choice) and an optional `info` fact shown after answering.
- To add a new quiz, create a questions file in `src/data/` and register it in `src/data/quizzes.js`.
- To change the players, edit the `PLAYERS` array in `src/pages/QuizPage.jsx`.
