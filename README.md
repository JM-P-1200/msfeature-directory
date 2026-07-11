# MS-Feature

The directory site for every management system — HRMS, LMS, CRM, QMS, and more —
with a live community chat built into the first section of the page.

Branding is inspired by zapier.com: bold orange accent, black/white base palette,
rounded pill buttons, and a clean sans-serif type system (Inter).

## Features

- **Public chat (first section):** a `#random` community chat. All visitors can
  read every message; only "subscribed" members can post. Subscribing is
  simulated locally (no backend) — click **Subscribe to chat** to unlock the
  message box.
- **Management systems directory:** searchable, filterable grid of MS categories
  (HRMS, LMS, PMS, IMS, CRM, VMS, CMS, DMS, AMS, FMS, QMS, EMS) with a save/bookmark
  toggle.
- **Local-storage demo:** chat messages, your display name, subscription status,
  and saved systems all persist in `window.localStorage`. Open the site in two
  tabs to see chat messages sync live between them.

## Tech stack

- React 18
- Tailwind CSS 3
- Vite 5

## Getting started

```bash
npm install
npm run dev
```

Visit the printed local URL (defaults to `http://localhost:5173`).

## Build

```bash
npm run build
npm run preview
```

## Deploying to Vercel

This project is a standard Vite app and deploys to Vercel with zero config:

1. Push this repo to GitHub (already done if you're reading this on the remote).
2. Import the repo in [Vercel](https://vercel.com/new).
3. Vercel auto-detects the Vite framework preset (build command `npm run build`,
   output directory `dist`) via `vercel.json` in this repo — no extra setup needed.
4. Deploy.

Or via CLI:

```bash
npm i -g vercel
vercel
```

## Notes on the "demo" data layer

There is no backend in this demo. Chat and directory state live in
`localStorage` under these keys:

- `ms-feature-profile` — your generated guest name + subscription flag
- `ms-feature-chat-messages` — the chat history
- `ms-feature-saved-systems` — bookmarked directory entries

To wire this up to a real backend later, swap the `useLocalStorage` hook
(`src/hooks/useLocalStorage.js`) usages in `PublicChat.jsx` and `Directory.jsx`
for real API calls / a WebSocket connection (e.g. Supabase, Firebase, or a
custom API) and add real authentication for subscriptions.
