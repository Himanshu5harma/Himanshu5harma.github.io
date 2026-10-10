# Himanshu Sharma — Portfolio

A React and TypeScript portfolio with an editorial visual direction, interactive browser demonstrations, and a clear account of my transition from React, Java/Spring Boot, and AWS into Python, FastAPI, and AI engineering.

## Run locally

Use Node.js 22.18 or newer within Node 22, and npm 10 or newer.

```sh
npm ci
npm run dev
```

```sh
npm run typecheck
npm test
npm run build
npm run preview
```

Vite builds static files into `dist/`. The application uses section anchors rather than server routes, so it runs directly on GitHub Pages.

## Edit the content

Update `src/content.ts` for the profile introduction, project descriptions, status, and links. The About copy and engineering-layer descriptions are in `src/App.tsx`; the curated retrieval excerpts and their source links are in `src/lib/retrieval.ts`. Keep these passages consistent when updating experience or project scope, and tie descriptions and results to work you have actually completed. Add a résumé or other downloadable files in `public/`, then link them from the content.

The local retrieval demonstration runs in the visitor's browser. It illustrates retrieval and source grounding using portfolio content; it does not call an AI model or a backend. A future FastAPI demonstration needs a separate API host. Never place secret API keys in the frontend or in `VITE_*` environment variables.

## Branches and releases

The intended public repository is `Himanshu5harma/Himanshu5harma.github.io`, giving the site the address `https://himanshu5harma.github.io/`.

- `dev` is the working branch. Push draft changes here and preview locally with `npm run dev`.
- `main` is the release branch. Open a pull request from `dev` to `main` when the portfolio is ready to publish.
- Pushes to either branch and pull requests targeting `main` run the production build and type checks.
- Only a push to `main` (including a merged pull request) or a manual workflow run on `main` can deploy to the `main` environment. A manual run on `dev` builds without deploying.

For a release, merge the reviewed pull request into `main`, then check the **Actions** tab for the deployment result. The workflow publishes `dist/` to GitHub Pages. The repository's **Settings → Pages** source must be **GitHub Actions**.

The Vite base path is relative so the same build also works in a local preview. A custom domain can be added later in GitHub Pages settings.

## Personal account isolation

This portfolio belongs to the personal GitHub account. Use the existing `github-personal` SSH alias for its remote:

```text
git@github-personal:Himanshu5harma/Himanshu5harma.github.io.git
```

If commit identity needs to be configured, do so only inside this repository with `git config --local user.name` and `git config --local user.email`, using the verified personal identity. Do not change global Git configuration, switch the default GitHub account, or alter Cisco repositories or credentials.
