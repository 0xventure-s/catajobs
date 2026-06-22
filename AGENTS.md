# Repository Guidelines

## Project Structure & Module Organization
This repository is a Next.js 14 App Router project. Main application routes live in `src/app`, including public pages such as `src/app/jobs/[slug]/page.tsx` and admin flows under `src/app/admin`. Reusable UI lives in `src/components`, with low-level primitives in `src/components/ui`. Shared utilities, Prisma helpers, validation, and static lists live in `src/lib`. Database schema is defined in `prisma/schema.prisma`. Static assets are split between `public/` and `src/assets/`.

## Build, Test, and Development Commands
Use `npm run lint` to run the main quality gate with Next.js ESLint rules. `npm run dev`, `npm run build`, and `npm run start` are the standard Next.js local workflow commands, but only run them when explicitly requested. `npm run seed` is declared in `package.json`, but the current repository does not include `scripts/seed.js`; verify or restore that script before relying on it. `postinstall` runs `prisma generate`, so dependency installs refresh the Prisma client automatically.

## Coding Style & Naming Conventions
TypeScript runs in `strict` mode and uses the `@/*` path alias for imports from `src`. Follow the existing style: React components in PascalCase (`JobList.tsx`), route files as `page.tsx`, `layout.tsx`, and server actions as `actions.ts`. Use Prettier with `prettier-plugin-tailwindcss` to keep formatting and Tailwind class order consistent. ESLint extends `next/core-web-vitals`; fix warnings instead of silencing them unless there is a clear reason.

## Testing Guidelines
There is no dedicated test suite in the current tree. Until one is added, treat `npm run lint` as the minimum required check and manually verify the touched flows, especially job listing, job submission, and admin moderation paths. When adding tests, colocate them near the feature or under a clear `__tests__` folder and prefer `*.test.ts` or `*.test.tsx`.

## Commit & Pull Request Guidelines
Recent history includes placeholder commit messages like `x` and `xxx`; do not continue that pattern. Use short imperative summaries such as `Add admin job approval action`. Pull requests should explain scope, list schema or environment changes, link the relevant issue when available, and include screenshots for UI changes.
