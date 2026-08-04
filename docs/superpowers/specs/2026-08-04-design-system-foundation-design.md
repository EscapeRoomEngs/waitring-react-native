# Design system foundation

## Goal

Introduce a small, typed design-system foundation for the Expo Router application without changing the existing screens' visuals, copy, or navigation behavior. Later screen refactors will adopt these primitives incrementally.

## Scope

- Define semantic color, spacing, radius, and typography tokens in `src/design-system/tokens`.
- Add reusable `AppButton`, `TextField`, and `Screen` primitives in `src/design-system/components`.
- Keep `styles/variables.js` as a compatibility adapter so untouched legacy screens retain their current color values.
- Document primitive variants and their intended migration path.

## Non-goals

- Redesigning store detail, sign-up, or todo screens.
- Changing copy, API behavior, Redux state, or route structure.
- Adding a new UI-library dependency or a visual regression service.
- Supporting dark mode in this PR; semantic token names reserve that option for a later theme provider.

## Architecture

Tokens are platform-agnostic TypeScript constants. They use semantic names such as `color.text.primary` and `color.action.primary`, rather than exposing palette names to component consumers. `spacing` follows a 4-point scale; radii and typography use named roles.

Primitives consume only tokens and React Native platform APIs. `AppButton` offers `primary` and `secondary` variants plus a disabled state. `TextField` exposes label, error, and input props while preserving accessible labels and native text-input behavior. `Screen` provides safe-area background and optional horizontal padding. None imports a feature screen, API client, Redux state, or router hook.

The legacy `themeColors` export maps its existing keys to the new token values. This avoids a broad, behavior-changing rewrite while making the new token source authoritative.

## Data flow and errors

All primitives are presentational and receive state through props. `TextField` renders an error message only when supplied. `AppButton` prevents `onPress` while disabled. Native input validation, network errors, and feature state remain owned by their future screen-specific PRs.

## Verification

- Add focused tests for token and primitive state contracts if the project test harness is introduced in the implementation plan; do not add a second test framework solely for this PR.
- Run TypeScript checking, formatting, iOS bundle export, Expo Doctor, and a web export after implementation.
- Confirm the existing `themeColors` key set remains available to legacy imports.

## Migration sequence

1. Merge this foundation PR with no feature-screen replacement.
2. Adopt primitives in the store detail PR.
3. Adopt primitives in the sign-up and waiting-flow PRs.
4. Remove the legacy compatibility adapter only after no imports remain.
