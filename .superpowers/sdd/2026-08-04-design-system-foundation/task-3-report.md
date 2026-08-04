# Task 3 report: accessible UI primitives

## Implementation commit

- `cc926c5 feat: add reusable design system primitives`

## Changed files

- `src/design-system/components/AppButton.tsx`
- `src/design-system/components/TextField.tsx`
- `src/design-system/components/Screen.tsx`
- `src/design-system/components/index.ts`
- `src/design-system/components/__tests__/AppButton.test.tsx`
- `src/design-system/components/__tests__/TextField.test.tsx`
- `src/design-system/components/__tests__/Screen.test.tsx`

## Verification

- Red: `npm run test:ci -- src/design-system/components/__tests__` failed as intended because the three component modules did not exist.
- Green: `npm run test:ci -- src/design-system/components/__tests__` passed: 3 suites, 3 tests.
- `npm run typecheck` passed.
- `npx --yes prettier@3.9.6 --check src/design-system/components` passed.
- `git diff --check` passed before staging.

## Compatibility notes and concerns

- React Native Testing Library 14 makes render, rerender, and fireEvent asynchronous and exposes queries through `screen`; the prescribed contract tests were adapted to that installed API without changing their behavior.
- React Native 0.86 no longer exports `SafeAreaViewProps`; `Screen` derives the equivalent prop type with `ComponentProps<typeof SafeAreaView>`.
- React Native emits a SafeAreaView deprecation warning during the Screen test. The component deliberately follows the task-required `react-native` SafeAreaView API; replacing it with `react-native-safe-area-context` would change the requested interface.
- Repository-wide `npm run format:check` remains nonzero because of pre-existing formatting warnings in task briefs and the shared plan. Component-only formatting check passes.

## Fix round 1

### Fix commit

- `f41996b fix: harden design system primitives`

### Changed files

- `src/design-system/components/Screen.tsx`
- `src/design-system/components/TextField.tsx`
- `src/design-system/components/__tests__/Screen.test.tsx`
- `src/design-system/components/__tests__/TextField.test.tsx`
- `src/design-system/tokens/colors.ts`
- `src/design-system/tokens/__tests__/tokens.test.ts`

### Fixes and covering verification

- `Screen` now keeps `SafeAreaView` unpadded and places conditional horizontal padding on a nested content `View`; the focused test confirms padding is on the content wrapper and absent from the outer safe-area view.
- Added `color.feedback.error` (`#B42318`), verified at a minimum 4.5:1 contrast ratio against the default surface, and used it for TextField error text and border styling.
- TextField now spreads caller TextInput props before enforcing its visible label as `accessibilityLabel`; the regression test proves a caller cannot override it.
- `npm run test:ci -- src/design-system/components/__tests__ src/design-system/tokens/__tests__/tokens.test.ts`: PASS — 4 suites, 8 tests. React Native still logs the known SafeAreaView deprecation warning.
- `npm run typecheck`: PASS.
- `npx --yes prettier@3.9.6 --check src/design-system/components src/design-system/tokens/colors.ts src/design-system/tokens/__tests__/tokens.test.ts`: PASS.
- `npm run format:check`: nonzero only for the four existing task/plan markdown formatting warnings; no Task 3 changed-file warnings.
