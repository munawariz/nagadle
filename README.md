# nagadle

Daily "who sent it?" game built on the Pecinta Naga group chat. Each day (midnight Asia/Jakarta) the turtle reads out five real messages; players get three tries per message to name the sender. Progress and stats are stored only in the player's browser.

Stack: Vite + React, the local `Nagadle Design System/`, Supabase (Postgres + RPC functions).

## Local setup

```sh
npm install
cp .env.example .env   # fill in the three values
npm run dev            # http://localhost:5173
```

`http://localhost:5173/?mock` runs the UI against made-up data, with no Supabase calls (dev server only). Add `&birthday=Aria` to play a birthday day and land on the celebration screen.

## Data pipeline

The raw WhatsApp export stays in `raw_data/` and never leaves this machine (git- and Vercel-ignored).

1. `npm run extract` – parse and clean the export into `data/messages.json`.
2. Apply `supabase/migrations/*.sql` in order (SQL editor or `supabase db push`).
3. `npm run seed` – load members and messages (`npm run seed:reset` after a fresh export).

Fill in `data/birthdays.json` (`"MM-DD"`, no year) for the birthday easter egg: on a member's birthday all five prompts of the day come from them. Load it with `npm run seed:birthdays` (`-- --dry-run` first to see the changes) – that only touches the members table, so it is the one to use when just a birthday changed. `npm run seed` picks the file up too, but reloads every message with it. The file is the source of truth either way: clearing a birthday there clears it in the database.

Seeding uses `SUPABASE_SERVICE_ROLE_KEY` (secret key). The web app only ever uses `SUPABASE_ANON_KEY` (publishable key), which can call the three `nagadle_*` functions but cannot read the tables.

## Deploying to Vercel

1. Push the repo to GitHub and import it in Vercel, or run `npx vercel` from this folder. `vercel.json` sets the Vite build (`npm run build` → `dist/`).
2. In **Project Settings → Environment Variables**, add for Production and Preview:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY` (the `sb_publishable_...` key)

   Do **not** add `SUPABASE_SERVICE_ROLE_KEY`; the site doesn't need it.
3. Deploy. The values are baked in at build time, so redeploy after changing them.

The site sends `X-Robots-Tag: noindex` and a disallow-all `robots.txt`, so it stays out of search engines. Anyone with the link can still play.
