# Analytics Dashboard (Vite + React + Tailwind + Redux)

Clarosanalytics dashboard UI with 2 routes:
- `/` Home
- `/data` Data table (public API + pagination + search + filters)

## Prerequisites
- Node.js 18+ (recommended: 20+)

## Install
```bash
npm install
```

## Run (development)

```bash
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173/`).

## Build (production)

```bash
npm run build
npm run preview
```

## Lint

```bash
npm run lint
```

## Unit tests (Jest)

```bash
npm test
```

Watch mode:

```bash
npm run test:watch
```

### What’s covered
- `src/features/counter/counterSlice.test.ts`: counter reducer actions
- `src/features/characters/charactersStore.test.ts`: characters reducer + API fetch thunk (success + 404 + network error)

## E2E tests (Cypress)

Run headless:

```bash
npm run e2e
```

Open Cypress UI:

```bash
npm run cy:open
```

E2E specs live in `cypress/e2e/`.

Note: `npm run e2e` uses port `5173`. If you already have `npm run dev` running, stop it first.

If Cypress says the **binary is missing**, run once:

```bash
npm run cy:install
```

## Notes
- Redux DevTools is enabled in dev builds (if you have the browser extension).

## Troubleshooting
If `npm install` fails with:

```
Cannot read properties of null (reading 'matches')
```

it’s an npm internal dependency resolver (Arborist) crash. Try switching npm versions:

```bash
npm -v
npm i -g npm@10.7.0
npm install
```
