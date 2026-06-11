# 🍺 The Boys — Beer Quiz

A 20-question beer trivia showdown between **Patrick** and **Jacob**, built with [Vite](https://vite.dev) and React.

Each player picks who they are when opening the page, answers the questions one at a time, and their answers are saved in the browser (localStorage), so they can leave and resume. Once both finish, the scoreboard declares a winner.

Since scores are stored in the browser, both players should play on the same device — pass the phone between rounds.

## Running locally

```bash
npm install
npm run dev
```

## Deploying to Vercel

1. Push this repo to GitHub (already done if you're reading this there).
2. On [vercel.com](https://vercel.com), click **Add New → Project** and import the `the-boys` repo. Vercel auto-detects Vite — keep the defaults.
3. Click **Deploy**. No environment variables needed.

## Tweaking the content

- **Quiz questions**: edit `src/data/questions.js` (`answer` is the index of the correct choice).
- **Players**: change the `PLAYERS` array in `src/pages/QuizPage.jsx`.
