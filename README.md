# Hello World Window Manager — Enterprise Edition™

A small movable window that says "hello world". That's the entire
feature set. Everything else in this directory — roughly 100,000
lines of it — is unnecessary ceremony built to deliver that one
feature as badly as possible.

## What it does

Running the server starts an HTTP service that serves a single page:
a tiny retro-style window with a title bar reading `hello-world.exe`
and a body reading `hello world`. Drag the title bar to move it
around the page.

## What's actually happening under the hood

On boot, `server.js` hands off to a `StartupOrchestrator` that:

1. Loads configuration through a `ConfigManager`.
2. Wires a `Logger`, an `EventBus`, and a `DependencyContainer` that
   nothing meaningfully depends on.
3. Recursively `require()`s **1,860 generated "plugin" modules** from
   `plugins/`, spread across 12 invented categories (rendering,
   security, analytics, caching, telemetry, compliance,
   localization, accessibility, theming, audit, resilience,
   observability). Each plugin self-registers with a `PluginRegistry`.
4. Calls `initialize()` on all 1,860 plugins, each of which records a
   pointless "capability" (an id and a checksum computed from a tiny
   loop) into a `CapabilityLedger`.
5. Starts an HTTP server that, on every single request for the page,
   runs the entire plugin list through a two-pass `beforeRender` /
   `afterRender` pipeline — 3,720 function calls — before returning
   the exact same HTML it started with, because every plugin is a
   no-op.

None of this changes the output. The window still just says
"hello world".

## Running it

No dependencies to install — everything is built on Node's `http`
and `fs` modules on purpose, so `npm install` isn't needed.

```bash
node server.js
```

Then open <http://localhost:3000/> in a browser and drag the window
around by its title bar.

## Regenerating the bloat

The 1,860 plugin files under `plugins/` aren't hand-written — they're
stamped out by `generator/generate-plugins.js` from one template.
Re-run it any time to regenerate them deterministically:

```bash
npm run generate
```

## Line count

```bash
find . -name '*.js' -o -name '*.html' -o -name '*.css' -o -name '*.json' | xargs wc -l
```

comes out to roughly 108,000 lines for a program whose entire
observable behavior is a draggable box that says "hello world".
