# 🍺 The Boys — Sofia Beer Map & Quiz

A two-page React app:

- **Beer Map** (`/`) — a Google Map of Sofia with pins for High Five Taproom, Crafter Bar, KANAAL and Ale House Center, plus a clickable sidebar.
- **Quiz** (`/quiz`) — a 20-question beer trivia showdown between **Patrick** and **Jacob**. Each player picks who they are, answers the questions, and their answers are saved in the browser (localStorage). Once both finish, a winner is declared.

Built with [Vite](https://vite.dev), [React Router](https://reactrouter.com) and [@react-google-maps/api](https://github.com/JustFly1984/react-google-maps-api).

## Running locally

```bash
npm install
cp .env.example .env   # then paste your Google Maps API key into .env
npm run dev
```

The app works without an API key too — the map is replaced by a notice, but the place list and quiz still work.

### Getting a Google Maps API key

1. Go to the [Google Cloud Console](https://console.cloud.google.com/google/maps-apis).
2. Create a project and enable the **Maps JavaScript API**.
3. Create an API key and (recommended) restrict it to your domains.
4. Put it in `.env` as `VITE_GOOGLE_MAPS_API_KEY=your-key`.

## Deploying to Vercel

1. Push this repo to GitHub (already done if you're reading this there).
2. On [vercel.com](https://vercel.com), click **Add New → Project** and import the `the-boys` repo. Vercel auto-detects Vite — keep the defaults.
3. Under **Environment Variables**, add `VITE_GOOGLE_MAPS_API_KEY` with your key.
4. Click **Deploy**.

`vercel.json` already contains the SPA rewrite so `/quiz` works on page refresh.

## Tweaking the content

- **Map pins**: edit `src/data/places.js` — coordinates are approximate, adjust `lat`/`lng` if a pin is slightly off.
- **Quiz questions**: edit `src/data/questions.js` (`answer` is the index of the correct choice).
- **Players**: change the `PLAYERS` array in `src/pages/QuizPage.jsx`.
