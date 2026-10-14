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

The application is configured for `/portfolio/` on GitHub Pages. Legacy hash routes `#/Projects` and `#/MoreAboutMe` are preserved.

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
