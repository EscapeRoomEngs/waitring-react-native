# Development Workflow

## Branch model

`origin/develop` is the current application-code baseline. The modernization work is integrated through `dev`, then reviewed as one release PR into `main`.

```text
origin/develop → dev → feature/* PR → dev → release PR → main
```

- Create each work branch from the latest `dev` commit.
- Open feature, refactor, fix, and chore PRs against `dev`.
- Do not add new features to the `dev` → `main` release PR.
- Use squash merge for feature PRs to keep `dev` history readable.

## Required checks

Run the following before requesting review:

```bash
npm run verify
```

It checks formatting and verifies that Expo can create an iOS JavaScript bundle. Native device checks remain required for any UI or platform change.

## GitHub settings to configure

Repository administrators must configure these outside the repository after GitHub authentication is restored:

- Block direct pushes to `main` and `dev`.
- Require one approving review for `dev` and two for `main`.
- Require the `Quality Gate / Format and iOS bundle export` check before merge.
- Require the branch to be up to date before merge.

## Release gate

Before merging `dev` into `main`, validate the membership sign-up, store-detail, and waiting flows on iOS and Android. Record the tested build and rollback plan in the release PR.
