# WS1

> **Instructions for Claude:** After every change, commit and push **directly to `main`**. Do NOT create a branch, do NOT create a PR. Push straight to main so the deployment triggers immediately.

Next.js 15 App Router · TypeScript · Tailwind CSS v4 · AssoConnect API · Deployed on Vercel.

**Live:** https://assoconnect-ws1.vercel.app

## Getting started

Give this prompt to Claude Code (claude.ai/code) to start building:

> Read the README for the repo AssoConnectWorkshop/WS1 and help me build [describe your idea here].

## Stack

| | |
|---|---|
| Framework | Next.js 15 App Router — Server Components by default |
| Styling | Tailwind CSS v4 — `@import "tailwindcss"` in `globals.css`, no `@apply` without `@reference` |
| CRM API | AssoConnect API — server-only client: `src/lib/assoconnect.ts` |
| Config | Navigation and metadata in `src/config/site.ts` |
| Deploy | Vercel — push to `main` → production |

## What's already set up

- AssoConnect API server-only client ready to use (CRM scope only)

## Environment variables

Already configured in Vercel — never commit secrets.

| Variable | Description |
|---|---|
| `ASSOCONNECT_API_KEY` | AssoConnect API key (server-only) |
| `ASSOCONNECT_ORGANIZATION_ULID` | AssoConnect organization ULID (server-only) |

## AssoConnect API

See [`docs/assoconnect-api.md`](docs/assoconnect-api.md) for the full reference.

Summary:
- Base URL: `https://app.assoconnect.com/api/v1`
- Auth: `X-AUTH-TOKEN` header (handled automatically by `src/lib/assoconnect.ts`)
- Scope: CRM only (contacts, members, organizations)
- Rate limit: 30 req/s
- Keys are **server-only** — never use `NEXT_PUBLIC_` for these variables

## Workflow

After every change: **commit and push directly to `main`**. No branches, no PRs.

## Rules

- Use `'use client'` only when the page needs interactivity (forms, hooks, events)
- Secrets are never exposed client-side
- No comments unless the "why" is non-obvious
