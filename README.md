# Analytics Dashboard (Vite + React + Tailwind + Redux)

Monochrome dashboard UI with 2 routes:
- `/` Home
- `/data` Data table (public API + pagination + search + filters)

## Prerequisites
- Node.js 18+ (recommended: 20+)

## Install
This project uses `pnpm` (recommended).

```bash
corepack enable
pnpm install
```

## Run (development)

```bash
pnpm dev
```

Open the URL shown in the terminal (usually `http://localhost:5173/`).

## Build (production)

```bash
pnpm build
pnpm preview
```

## Lint

```bash
pnpm lint
```

## Notes
- If `npm install` fails on your machine, stick to `pnpm install` for dependencies.
- Redux DevTools is enabled in dev builds (if you have the browser extension).
