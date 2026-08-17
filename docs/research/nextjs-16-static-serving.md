# Next.js 16 App Router: static serving with no runtime compute beyond the CDN

**Ticket:** [#5](https://github.com/efarr/story-bearings/issues/5)
**Package in this repo:** `next@16.3.1` (`node_modules/next/package.json`)
**Question:** For Next.js 16 App Router, what is the supported way to ship a content site as static pages with no runtime compute beyond the CDN — including `generateStaticParams`, Cache Components / `use cache`, and whether `output: 'export'` still applies?

This note reports what Next.js 16 documents. It does not choose a product architecture.

## Sources

Primary source is the documentation shipped with `next@16.3.1` under `node_modules/next/dist/docs/`. Canonical URLs on [nextjs.org/docs](https://nextjs.org/docs) are cited in parallel; those pages are labeled **version 16.3.1**. Where the live page and the installed file disagree, that is called out.

| Topic | Installed file | Canonical URL |
| --- | --- | --- |
| Static export | `01-app/02-guides/static-exports.md` | https://nextjs.org/docs/app/guides/static-exports |
| Deploying | `01-app/01-getting-started/17-deploying.md` | https://nextjs.org/docs/app/getting-started/deploying |
| Glossary (static export, PPR, prerendering) | `01-app/04-glossary.md` | https://nextjs.org/docs/app/glossary |
| `generateStaticParams` | `01-app/03-api-reference/04-functions/generate-static-params.md` | https://nextjs.org/docs/app/api-reference/functions/generate-static-params |
| Dynamic routes | `01-app/03-api-reference/03-file-conventions/dynamic-routes.md` | https://nextjs.org/docs/app/api-reference/file-conventions/dynamic-routes |
| `dynamicParams` | `01-app/03-api-reference/03-file-conventions/02-route-segment-config/dynamicParams.md` | https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config/dynamicParams |
| `cacheComponents` | `01-app/03-api-reference/05-config/01-next-config-js/cacheComponents.md` | https://nextjs.org/docs/app/api-reference/config/next-config-js/cacheComponents |
| `use cache` | `01-app/03-api-reference/01-directives/use-cache.md` | https://nextjs.org/docs/app/api-reference/directives/use-cache |
| Caching (Cache Components) | `01-app/01-getting-started/08-caching.md` | https://nextjs.org/docs/app/getting-started/caching |
| Public pages (Cache Components) | `01-app/02-guides/public-static-pages.md` | https://nextjs.org/docs/app/guides/public-static-pages |
| Rendering philosophy | `01-app/02-guides/rendering-philosophy.md` | https://nextjs.org/docs/app/guides/rendering-philosophy |
| Next.js 16 upgrade | `01-app/02-guides/upgrading/version-16.md` | https://nextjs.org/docs/app/guides/upgrading/version-16 |
| Caching without Cache Components | `01-app/02-guides/caching-without-cache-components.md` | https://nextjs.org/docs/app/guides/caching-without-cache-components |

## Direct answer

Next.js 16 still supports shipping a site as HTML/CSS/JS files with **no Node.js server at request time**. That mode is **static export**: set `output: 'export'` in `next.config.js` / `next.config.ts`, run `next build`, and host the `out/` directory on any static file server or CDN ([Static Exports](https://nextjs.org/docs/app/guides/static-exports); [Glossary: Static Export](https://nextjs.org/docs/app/glossary#static-export); [Deploying](https://nextjs.org/docs/app/getting-started/deploying#static-export)).

App Router Server Components run during `next build` in this mode, like traditional static-site generation ([Static Exports — Server Components](https://nextjs.org/docs/app/guides/static-exports#server-components)). Dynamic route segments must be enumerated at build time with `generateStaticParams`. Routes without it, and routes with `dynamicParams: true`, are unsupported under static export ([Static Exports — Unsupported Features](https://nextjs.org/docs/app/guides/static-exports#unsupported-features)).

**Cache Components / `use cache` is a different model.** It requires the Node.js runtime ([`cacheComponents`](https://nextjs.org/docs/app/api-reference/config/next-config-js/cacheComponents)). The `use cache` directive’s platform table lists **Static export: No** ([`use cache` — Platform Support](https://nextjs.org/docs/app/api-reference/directives/use-cache#platform-support)). Cache Components implements Partial Prerendering: a static HTML shell plus request-time streaming of uncached work ([Caching — Prerendering](https://nextjs.org/docs/app/getting-started/caching#prerendering)). Streaming itself is also **not** supported on static export ([Streaming](https://nextjs.org/docs/app/guides/streaming) platform table in the installed docs).

`output: 'export'` still applies. The CLI `next export` was removed in v14.0.0 in favor of `"output": "export"` ([Static Exports — Version History](https://nextjs.org/docs/app/guides/static-exports#version-history)). Next.js 16 did not replace that flag with Cache Components.

## Two documented models

Next.js 16 documents two ways a page can be “static.” They are not interchangeable.

### 1. Static export — files only, no Node.js at runtime

**Config:**

```js
const nextConfig = {
  output: 'export',
}
```

([Static Exports — Configuration](https://nextjs.org/docs/app/guides/static-exports#configuration))

**Build output:** `next build` writes HTML/CSS/JS into `out/` (or `distDir` if overridden). Example for `/` and `/blog/[id]`:

- `/out/index.html`
- `/out/404.html`
- `/out/blog/post-1.html`
- `/out/blog/post-2.html`

([Static Exports — Deploying](https://nextjs.org/docs/app/guides/static-exports#deploying))

**Hosting:** any web server that can serve HTML/CSS/JS, including AWS S3, Nginx, Apache, GitHub Pages ([Deploying — Static export](https://nextjs.org/docs/app/getting-started/deploying#static-export)). Feature support for this option is **Limited**; it does not support features that require a server ([same page](https://nextjs.org/docs/app/getting-started/deploying)).

**Server Components:** they execute at build time. `fetch` in a page runs during `next build`. The result is static HTML for the first load and a static payload for client navigation. No code change is required unless the component uses a dynamic server API listed as unsupported ([Static Exports — Server Components](https://nextjs.org/docs/app/guides/static-exports#server-components)).

**Route Handlers:** `GET` handlers can emit static files (JSON, TXT, etc.) at build time. They cannot read dynamic values from the incoming request ([Static Exports — Route Handlers](https://nextjs.org/docs/app/guides/static-exports#route-handlers)).

**Doc discrepancy (Route Handlers):** the installed `static-exports.md` shows a `GET` handler that becomes `data.json` with no extra segment config. The live page (labeled 16.3.1, last updated 2026-08-09) additionally says: when static export is enabled, mark the handler with `export const dynamic = 'force-static'` to ensure it is prerendered ([live Static Exports](https://nextjs.org/docs/app/guides/static-exports)). Treat the live page as the stricter current instruction.

**Images:** Image Optimization with the **default** `next/image` loader is unsupported. The static-export guide documents a **custom** `images.loader` / `loaderFile` ([Static Exports — Image Optimization](https://nextjs.org/docs/app/guides/static-exports#image-optimization)). Separately, `images.unoptimized: true` exists as a config that serves images as-is ([`next/image` — unoptimized](https://nextjs.org/docs/app/api-reference/components/image#unoptimized)); the static-export guide does not name that as the export path.

### 2. Cache Components — Node.js runtime, static *shell* plus optional request-time work

**Config:**

```ts
const nextConfig: NextConfig = {
  cacheComponents: true,
}
```

Introduced in 16.0.0 as the unified flag for what used to be experimental `ppr`, `useCache`, and `dynamicIO` ([`cacheComponents`](https://nextjs.org/docs/app/api-reference/config/next-config-js/cacheComponents); [Version 16 — PPR](https://nextjs.org/docs/app/guides/upgrading/version-16#partial-prerendering-ppr)).

**What it does:** data fetching is **dynamic by default**. You opt into caching with `'use cache'` at page, component, or function level. Next.js prerenders a static HTML shell that is served immediately while dynamic content streams in ([`cacheComponents`](https://nextjs.org/docs/app/api-reference/config/next-config-js/cacheComponents); [Glossary: Cache Components](https://nextjs.org/docs/app/glossary#cache-components)).

**Runtime requirement:** “Cache Components requires the Node.js runtime.” Edge `runtime = 'edge'` is not the supported path ([`cacheComponents`](https://nextjs.org/docs/app/api-reference/config/next-config-js/cacheComponents)).

**`use cache` vs static export:**

| Deployment option | `use cache` supported |
| --- | --- |
| Node.js server | Yes |
| Docker | Yes |
| **Static export** | **No** |
| Adapters | Platform-specific |

([`use cache` — Platform Support](https://nextjs.org/docs/app/api-reference/directives/use-cache#platform-support))

The same “Static export: No” row appears for streaming, ISR, `after`, proxy, and cache handlers in the installed docs.

**CDN language under Cache Components is not “files only.”** The caching guide says every produced static shell can be served from a CDN without hitting the origin for that shell, and that this is Partial Prerendering ([Caching — Prerendering](https://nextjs.org/docs/app/getting-started/caching#prerendering)). Uncached async work still runs at request time behind `<Suspense>` ([Caching — Streaming uncached data](https://nextjs.org/docs/app/getting-started/caching#streaming-uncached-data)). The public-pages guide’s `next build` output distinguishes:

- `○ (Static)` — prerendered as static content
- `◐ (Partial Prerender)` — prerendered as static HTML **with dynamic server-streamed content**

([Public pages](https://nextjs.org/docs/app/guides/public-static-pages))

PPR at CDN latency is described as extra platform integration, not as dropping the origin ([Rendering philosophy — Infrastructure Implications](https://nextjs.org/docs/app/guides/rendering-philosophy#infrastructure-implications)). Next.js “runs as a Node.js server process” in that model ([Rendering philosophy — Portability and Fidelity](https://nextjs.org/docs/app/guides/rendering-philosophy#portability-and-fidelity)).

**`use cache` at runtime** still uses in-memory (or remote) cache on the **server**, with revalidation via `cacheLife` / `cacheTag` / `revalidateTag` / `updateTag` ([`use cache` — Revalidation](https://nextjs.org/docs/app/api-reference/directives/use-cache#revalidation)). That is origin compute and cache infrastructure, not a static file tree.

## `generateStaticParams`

`generateStaticParams` lists dynamic-segment values to **statically generate at build time instead of on-demand at request time**. It can be exported from pages, layouts, and Route Handlers. It replaces Pages Router `getStaticPaths`. During `next build` it runs before the corresponding layouts/pages ([`generateStaticParams`](https://nextjs.org/docs/app/api-reference/functions/generate-static-params)).

### Under static export

Unsupported:

- Dynamic routes **without** `generateStaticParams()`
- Dynamic routes with `dynamicParams: true`

([Static Exports — Unsupported Features](https://nextjs.org/docs/app/guides/static-exports#unsupported-features))

Using those features with `next dev` errors, similar to `export const dynamic = 'error'` in the root layout ([same section](https://nextjs.org/docs/app/guides/static-exports#unsupported-features)).

Implication documented by those two bullets: every dynamic segment that should exist as a file must be returned from `generateStaticParams`. Paths not returned cannot be generated on first request.

`dynamicParams` without Cache Components:

- `true` (default): missing params are generated at **request time**
- `false`: missing params 404

([`dynamicParams`](https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config/dynamicParams))

Request-time generation is exactly what static export forbids.

### Without Cache Components, not using export

You can prerender **all** paths by returning the full list from `generateStaticParams`; a **subset** at build time and the rest on first visit; or **none** at build time (`return []`) so the first visit generates the page (ISR). `dynamicParams = false` 404s unspecified paths ([`generateStaticParams` — Prerendering](https://nextjs.org/docs/app/api-reference/functions/generate-static-params#prerendering)). The subset / empty-array patterns require a server (ISR). They are incompatible with static export for the reasons above.

### With Cache Components

- `generateStaticParams` must return **at least one** param. Empty arrays are a build error ([`generateStaticParams` — With Cache Components](https://nextjs.org/docs/app/api-reference/functions/generate-static-params#with-cache-components)).
- `dynamicParams` **is not available** when Cache Components is enabled ([`dynamicParams`](https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config/dynamicParams)).
- Known params from `generateStaticParams` are prerendered at build. Unknown params get an App Shell and are filled in after the first request (ISR with Cache Components) ([Dynamic routes — With Cache Components](https://nextjs.org/docs/app/api-reference/file-conventions/dynamic-routes#with-cache-components); [Caching — ISR](https://nextjs.org/docs/app/getting-started/caching#incremental-static-regeneration)).

That last behavior is request-time work. It is not static-export behavior.

## Features static export does not support

From [Static Exports — Unsupported Features](https://nextjs.org/docs/app/guides/static-exports#unsupported-features) (App Router):

- Dynamic routes with `dynamicParams: true`
- Dynamic routes without `generateStaticParams()`
- Route Handlers that rely on `Request`
- Cookies
- Rewrites, Redirects, Headers (in `next.config`)
- Proxy (formerly Middleware)
- Incremental Static Regeneration
- Image Optimization with the default loader
- Draft Mode
- Server Actions
- Intercepting Routes

The heading states these require a Node.js server, or dynamic logic that cannot be computed during the build.

ISR’s own platform table also lists Static export: No (installed `incremental-static-regeneration.md`).

## Default App Router (no `output: 'export'`, no `cacheComponents`)

Without Cache Components, Next.js still prerenders components that do not use request-time APIs. Prerendering produces HTML and an RSC payload that “can be cached and served from a CDN” ([Glossary: Prerendering](https://nextjs.org/docs/app/glossary#prerendering)). `fetch` is not cached by default in that older model; `cache: 'force-cache'` or route segment `dynamic = 'error' | 'force-static'` can force prerendering ([Caching without Cache Components](https://nextjs.org/docs/app/guides/caching-without-cache-components)).

That is **not** the same as static export. The default production path is `next build` + `next start`: a Node.js server that supports all features ([Deploying — Node.js server](https://nextjs.org/docs/app/getting-started/deploying#nodejs-server)). Fully prerendered routes may be CDN-cached in front of that server; the process at the origin is still Node.js unless `output: 'export'` is set.

Rendering philosophy names the “zero runtime infrastructure” case as **build-time prerendering**: every page generated at build, static files on any CDN or file server, content changes requiring rebuild and redeploy ([Rendering philosophy — Build-time prerendering](https://nextjs.org/docs/app/guides/rendering-philosophy#build-time-prerendering)). Static export is the App Router configuration that produces that file tree ([Glossary: Static Export](https://nextjs.org/docs/app/glossary#static-export)).

## Mapping to the ticket constraint

The ticket constraint is a public site with **no AI tokens at runtime** and cost equal to **serving pages**, with Books authored in the repo at design time. Next.js 16 facts that bear on that constraint, without choosing an architecture:

1. **`output: 'export'` is the documented mode whose runtime is a static file server / CDN only** — no Next.js Node server, no ISR, no Server Actions, no `use cache` ([Static Exports](https://nextjs.org/docs/app/guides/static-exports); [`use cache` platform table](https://nextjs.org/docs/app/api-reference/directives/use-cache#platform-support)).
2. **App Router pages can still be Server Components.** They run at `next build`, so reading repo content or fetching at build time is the documented SSG pattern ([Static Exports — Server Components](https://nextjs.org/docs/app/guides/static-exports#server-components)).
3. **Dynamic URLs need `generateStaticParams` returning every path to emit.** There is no first-request generation under export ([Unsupported Features](https://nextjs.org/docs/app/guides/static-exports#unsupported-features)).
4. **Cache Components / `'use cache'` / PPR are not that mode.** They require Node.js and are explicitly unsupported on static export. Their “static” is a CDN-cacheable **shell** with optional origin streaming and revalidation ([`cacheComponents`](https://nextjs.org/docs/app/api-reference/config/next-config-js/cacheComponents); [Caching — Prerendering](https://nextjs.org/docs/app/getting-started/caching#prerendering)).
5. **A Node.js `next start` deploy of fully prerendered pages is a third shape:** prerendered HTML can sit on a CDN, but the documented deploy still includes a Node origin ([Deploying](https://nextjs.org/docs/app/getting-started/deploying)). Next.js does not document that as “no runtime compute beyond the CDN.”

## Not decided here

Whether this product should use `output: 'export'`, a Node.js host with CDN caching, Cache Components, or something else is a product/architecture decision. This ticket only records current Next.js 16 support.
