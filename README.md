# Electron + Vite + React + TypeScript Starter (with shadcn/ui, Zustand, ahooks, TanStack Router)

A production-ready Electron Forge template using Vite as the bundler and a modern React + TypeScript stack. It includes shadcn/ui (via CLI), Tailwind CSS v4, Zustand (with use-immer), ahooks, and TanStack Router.

## Tech Stack
- Electron Forge + Vite (main/preload/renderer)
- React 19 + TypeScript
- Tailwind CSS v4 + shadcn/ui components
- TanStack Router (file-independent route config)
- Zustand for state management (+ use-immer for local immutable state)
- ahooks utilities

## Requirements
- Node.js 18+ (tested with Node 22)
- Yarn 4.x (configured with nodeLinker: node-modules)
- Windows for build target (other targets configurable)

## Getting Started
```bash
# Install dependencies
yarn

# Start in development (Electron + Vite dev server)
yarn start
```

The dev app opens a window and shows the React page. DevTools are opened by default.

## Project Structure
```
├─ src
│  ├─ _main/            # Electron main process (entry: src/_main/index.ts)
│  ├─ _preload/         # Preload scripts (entry: src/_preload/preload.ts)
│  ├─ components/
│  │  └─ ui/button.tsx  # shadcn/ui Button
│  ├─ lib/utils.ts      # shadcn helper 'cn'
│  ├─ store/counter.ts  # Zustand store + use-immer example
│  ├─ app.tsx           # React app (TanStack Router + examples)
│  ├─ renderer.ts       # Renderer bootstrap -> imports ./app
│  └─ index.css         # Tailwind v4 entry + theme tokens
│
├─ forge.config.ts              # Electron Forge config (Vite plugin enabled)
├─ vite.main.config.ts          # Vite config for main process
├─ vite.preload.config.ts       # Vite config for preload process
├─ vite.renderer.config.mts     # Vite config for renderer (ESM)
├─ tailwind.config.ts
├─ components.json              # shadcn/ui CLI config
├─ index.html                   # Renderer HTML (loads src/renderer.ts)
└─ package.json
```

## Scripts
- `yarn start` – Start dev mode (Vite dev server + Electron)
- `yarn package` – Package the app without an installer
- `yarn make` – Create distributables (e.g., Squirrel .exe on Windows)
- `yarn publish` – Publish via Electron Forge (configure providers first)

## Building for Windows
```bash
# Make installer and distributables (win32/x64)
yarn make
# or explicitly
# yarn make --platform=win32 --arch=x64
```
Artifacts will be in `out/make`. During packaging, Vite builds:
- main/preload to `.vite/build/` (main entry is `.vite/build/index.js`)
- renderer to packaged assets via `vite.renderer.config.mts` (ESM)

## shadcn/ui
This repo ships with shadcn/ui configured via CLI.
- Config: `components.json`
- Tailwind: Tailwind v4 with `@tailwindcss/vite` plugin and `src/index.css`
- Add more components:
```bash
yarn shadcn add input card tabs
```

## Routing
TanStack Router is initialized with hash history for packaged (file://) environment reliability.
- Change to history API if you serve via a local server or custom protocol.

## Notes & Troubleshooting
- ESM-only Vite plugins (`@vitejs/plugin-react`, `@tailwindcss/vite`):
  - Renderer config is `vite.renderer.config.mts` and referenced in `forge.config.ts` to avoid `require()` issues.
- Asset base in packaged build:
  - `base: './'` set in `vite.renderer.config.mts` so index.html uses relative paths.
- Index script path:
  - `index.html` uses `src/renderer.ts` (relative path) to work under file://.
- CSP warnings in dev:
  - Electron warns about Content-Security-Policy in dev due to Vite. This warning doesn’t appear in packaged builds. Add a production CSP if needed.
- Yarn PnP vs node_modules:
  - This project uses Yarn 4 with `nodeLinker: node-modules` for compatibility.

## Security
Review Electron’s security best practices before shipping:
https://www.electronjs.org/docs/latest/tutorial/security

Consider:
- Setting an explicit Content Security Policy for production
- Disabling `nodeIntegration` in renderer (default here)
- Using contextIsolation and a secure preload bridge

## License
MIT
