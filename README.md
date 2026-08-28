# go.money

A financial home dashboard built for the go.money frontend engineering assessment — payments, withdrawals, and wallet balance on top of JSONPlaceholder as a mock data source, with auth-gated routing and a Zustand-backed wallet.

## Setup

1. Install dependencies:

```bash
   npm install
```

2. Copy the example env file and fill in values (defaults below work as-is against the public JSONPlaceholder API):

```bash
   cp .env.example .env.local
```

```dotenv
   NEXT_PUBLIC_API_BASE_URL=https://jsonplaceholder.typicode.com
   NEXT_PUBLIC_API_TIMEOUT_MS=8000
```

3. Run the dev server:

```bash
   npm run dev
```

4. Open `http://localhost:3000` — you'll be redirected to `/` if unauthenticated.

## Architecture

**Route groups split the app shell from auth.** `src/app/(auth)/` (login, signup, forgot-password) renders bare, centered auth cards with no dashboard chrome. `src/app/dashboard/` is a real URL segment (not a pathless group) so `middleware.ts` can protect it with a path-prefix matcher — `/dashboard/:path*`. This was a deliberate fix: an earlier pathless `(dashboard)` group let `/` render the dashboard while `/dashboard` itself 404'd, since middleware had nothing to actually match against.

**Server/Client boundary.** Route components default to Server Components. `src/app/dashboard/page.tsx` prefetches JSONPlaceholder data server-side via TanStack Query's `prefetchQuery`, then hands off to client components through a `HydrationBoundary` — so the dashboard's first paint already has data instead of a client-side loading spinner on mount. Interactive pieces (`RecentActivity`, `AmountModal`, form components) are Client Components, using the same `useQuery`/`useWalletStore` hooks that read from that pre-warmed cache.

**State is split by ownership, not by convenience:**

- **TanStack Query** — all JSONPlaceholder data (posts, caching, refetch).
- **Zustand** (`src/store/`) — `walletStore` (balance, payments, withdrawals) and `NavStore` (sidebar open/close). Deliberately two separate stores rather than one global slice, since they're unrelated concerns with different lifetimes.
- **Local component state** — form errors, dialog open/close — stays local; it's never needed outside the component that owns it.

**Middleware (`src/middleware.ts`)** checks a `go-money-session` cookie. `/` and unauthenticated `/dashboard/*` requests redirect to `/login` (preserving the original path via a `from` query param); an authenticated user hitting `/login` or `/signup` is redirected back to `/dashboard`.

**Shared form components** (`src/shared/forms/`) — `FormField` (label + input + `aria-invalid`/`aria-describedby` error wiring) and `AuthSubmitButton` — are used by every form in the app (login, signup, forgot-password, change-password, and the payment/withdrawal modals), so an accessibility or styling fix in one place applies everywhere instead of drifting across copies.

**Validation** is Zod-first throughout: one schema per form (`src/schemas/`), inferred TypeScript types via `z.infer` so the type can never drift from the schema, and `formData.get()` + `safeParse()` on submit rather than a controlled-input-per-keystroke pattern.

## Technology choices

- **Next.js App Router** — route groups for auth/dashboard separation, middleware for auth gating, Server Components by default with Client Components only where interactivity is needed.
- **TypeScript** — strict mode; API/schema contracts are explicit and inferred, not hand-duplicated.
- **Tailwind CSS + shadcn/ui** — Dialog, Input, Label, Card, Button as ownable, restylable primitives rather than a packaged component library.
- **TanStack Query** — server state, caching, and SSR hydration.
- **Zustand** — client-owned app state (wallet, nav), chosen over Context API per the assessment's stack requirement.
- **Axios** — centralized HTTP client; base URL and timeout are environment-driven (`NEXT_PUBLIC_*`, validated at startup via a Zod-parsed `env.ts` rather than trusted raw from `process.env`).
- **Zod** — form validation and env validation, sharing the same "parse once, infer the type" pattern in both places.
- **ESLint + Prettier + Husky** — pre-commit lint/format via `lint-staged`.

## Known limitations

- Auth is mocked — there's no real backend, so login/signup don't verify credentials; the session cookie is set client-side on "successful" submission.
- The wallet balance is in-memory Zustand state only — it resets on a full page reload, since there's no persistence layer.
- JSONPlaceholder writes aren't real; nothing submitted to it persists server-side.

## Quality commands

```bash
npm run lint
npm run format
npx tsc --noEmit
```
