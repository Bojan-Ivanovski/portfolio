# Bojan Ivanovski — Portfolio

A personal portfolio built with React, Vite, React Router, Swiper, and Lucide. The design retains the original blue palette, geometric backgrounds, technical typography, and signature wordmark, with responsive layouts and accessible light/dark themes.

## Development

Use Node.js 22.13+ (Node.js 24 LTS recommended).

```sh
npm ci
npm run dev
```

```sh
npm run lint
npm test
npm run format:check
npm run build
npm run preview
```

The application is configured for `/portfolio/` on GitHub Pages. About and Projects are prerendered at `/portfolio/MoreAboutMe/` and `/portfolio/Projects/`. Legacy hash bookmarks redirect to these URLs.

## GitHub project catalog

```sh
npm run sync:github
```

The sync script fetches all pages of public repositories from the GitHub REST API, excluding forks, archived/disabled repositories, and the profile README repository. It writes a local snapshot to `src/data/github.json` only after the complete request succeeds. No GitHub API requests or tokens are needed in visitors’ browsers.

An optional `GITHUB_TOKEN` environment variable raises the API rate limit for local syncs. Never put tokens in `VITE_*` variables or commit them.

Edit `src/data/projects.js` to choose featured repositories, display names, and categories. Repository descriptions, languages, topics, stars, and HTTPS homepage links come from GitHub. Uncategorized repositories appear under “Other.” The full catalog supports text search and category/language filters.

GitHub Actions refreshes the snapshot on pushes to `main`, manual workflow runs, and every Monday at 06:17 UTC. If GitHub is unavailable, deployment uses the checked-in snapshot and emits a warning. Scheduled snapshots are included in the deployed build; they do not create commits. Run the sync command locally and commit the result when you want to update the fallback snapshot.

## Deployment

In repository **Settings → Pages → Build and deployment**, choose **GitHub Actions** as the source. The workflow builds, lints, and deploys using the official Pages actions. The base path in `vite.config.js` must match the repository name, including casing. No deployment has been triggered by this local update.

## Contact

The contact form retains the original Formspree endpoint. Browser validation checks required fields and email format; Formspree handles delivery and its confirmation page. Direct email and social links remain available. The unused CV download was removed because no CV file was present.

## Search and social metadata

`npm run build` creates the client bundle, renders each page to static HTML with React, and checks the generated SEO output. GitHub Pages can serve every page directly without an SPA fallback. The browser then enables navigation, project filters, and other interactions.

- `src/data/seo.js` defines titles, descriptions, canonical URLs, and the production origin/base path. Keep it aligned with `vite.config.js` if hosting changes.
- `src/data/structured-data.js` generates WebSite, Person, ProfilePage, CollectionPage, breadcrumbs, and a project ItemList. Personal skills and repository details come from the same data as the visible pages.
- Open Graph and Twitter Card metadata use the checked-in 1200 × 630 `public/social-card.png`; its editable vector source is `public/social-card.svg`.
- `dist/sitemap.xml` lists the three canonical pages. Query strings, fragments, and the 404 page are excluded. No artificial modification dates are emitted.
- `dist/404.html` has `noindex, follow` and is served by GitHub Pages for missing paths.
- `dist/robots.txt` is generated for portable hosting. Crawlers read robots.txt at the **origin root**; `/portfolio/robots.txt` cannot set rules for `bojan-ivanovski.github.io`. The site uses indexable page metadata regardless. If you control the user-site repository, add a sitemap directive to its root robots.txt as well.

After deployment, submit `https://bojan-ivanovski.github.io/portfolio/sitemap.xml` in Google Search Console and Bing Webmaster Tools. Site verification requires the owner's account; no verification tokens, analytics IDs, ratings, or search-ranking claims are fabricated.
