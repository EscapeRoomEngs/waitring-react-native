# Design System Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a typed token layer and accessible React Native primitives that later screen PRs can adopt without changing the current screens.

**Architecture:** Token modules are the single source of truth and expose a legacy-color adapter for the unchanged JavaScript screens. Stateless primitives consume only those tokens and native React Native APIs. Jest uses Expo's preset and React Native Testing Library to assert token values and public component behavior.

**Tech Stack:** Expo SDK 57, React Native 0.86, TypeScript 6, Expo Router, Jest Expo, React Native Testing Library.

## Global Constraints

- Preserve current screen routes, copy, Redux state, API behavior, and visual output in this PR.
- Do not add a UI-library dependency; primitives must use React Native components only.
- Keep all existing `themeColors` keys available through `styles/variables.js`.
- Use semantic token names for new components; feature screens must not import palette values directly.
- Support iOS, Android, and web bundle exports; dark mode is out of scope.

---

### Task 1: Establish Expo component-test infrastructure

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`
- Modify: `tsconfig.json`

**Interfaces:**
- Produces: `npm run test:ci`, which runs all tests once in CI.
- Produces: Jest global types for TypeScript test files.

- [ ] **Step 1: Install the Expo-supported test packages**

Run:

```bash
npx expo install jest-expo jest @types/jest -- --save-dev
npx expo install @testing-library/react-native -- --save-dev
```

- [ ] **Step 2: Configure Jest before adding any tests**

Add the following to `package.json`:

```json
{
  "scripts": {
    "test": "jest --watch",
    "test:ci": "jest --runInBand"
  },
  "jest": {
    "preset": "jest-expo"
  }
}
```

Add `"jest"` to `compilerOptions.types` in `tsconfig.json`, retaining the existing compiler options:

```json
{
  "compilerOptions": {
    "types": ["jest"]
  }
}
```

- [ ] **Step 3: Verify the empty test harness is healthy**

Run: `npm run test:ci -- --passWithNoTests`

Expected: PASS with no tests found and exit code 0.

- [ ] **Step 4: Commit the test harness**

```bash
git add package.json package-lock.json tsconfig.json
git commit -m "test: add Expo component test foundation"
```

### Task 2: Define tokens and preserve the legacy color API

**Files:**
- Create: `src/design-system/tokens/colors.ts`
- Create: `src/design-system/tokens/layout.ts`
- Create: `src/design-system/tokens/typography.ts`
- Create: `src/design-system/tokens/index.ts`
- Create: `src/design-system/tokens/__tests__/tokens.test.ts`
- Modify: `styles/variables.js`

**Interfaces:**
- Produces: `color`, `spacing`, `radius`, and `typography` token exports from `src/design-system/tokens`.
- Produces: the unchanged `themeColors` named export from `styles/variables.js`.
- Consumes: Jest globals configured by Task 1.

- [ ] **Step 1: Write the failing token and compatibility test**

Create `src/design-system/tokens/__tests__/tokens.test.ts`:

```ts
import { color, radius, spacing, typography } from "../index";
import { themeColors } from "../../../../styles/variables";

describe("design tokens", () => {
	test("exposes the semantic values used by the legacy palette", () => {
		expect(color.text.primary).toBe("#191919");
		expect(color.action.primary).toBe("#FF3D00");
		expect(spacing[6]).toBe(24);
		expect(radius.lg).toBe(8);
		expect(typography.heading.lg.fontSize).toBe(24);
	});

	test("keeps every existing legacy color key available", () => {
		expect(themeColors).toMatchObject({
			gray100: color.surface.subtle,
			gray900: color.text.primary,
			orange500: color.action.primary,
			borderBottom: color.border.strong,
		});
	});
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm run test:ci -- src/design-system/tokens/__tests__/tokens.test.ts`

Expected: FAIL because `src/design-system/tokens/index.ts` does not exist.

- [ ] **Step 3: Implement the minimal typed token modules**

Create `colors.ts` with the existing visual values grouped semantically:

```ts
export const color = {
	text: { primary: "#191919", secondary: "#666666", muted: "#888888", inverse: "#FFFFFF" },
	surface: { default: "#FFFFFF", subtle: "#F8F8F8", muted: "#F2F2F2" },
	border: { default: "#E7E7E7", strong: "#AFAFAF" },
	action: { primary: "#FF3D00", primarySubtle: "#FFF2E9", accent: "#FB974B" },
} as const;
```

Create `layout.ts`:

```ts
export const spacing = { 1: 4, 2: 8, 3: 12, 4: 16, 5: 20, 6: 24, 8: 32, 10: 40 } as const;
export const radius = { sm: 4, md: 6, lg: 8, pill: 9999 } as const;
```

Create `typography.ts`:

```ts
export const typography = {
	body: { md: { fontSize: 14, lineHeight: 20 }, sm: { fontSize: 12, lineHeight: 18 } },
	heading: { lg: { fontSize: 24, lineHeight: 28, fontWeight: "700" }, md: { fontSize: 18, lineHeight: 24, fontWeight: "700" } },
	button: { fontSize: 18, lineHeight: 24, fontWeight: "700" },
} as const;
```

Create `index.ts`:

```ts
export { color } from "./colors";
export { radius, spacing } from "./layout";
export { typography } from "./typography";
```

Rewrite `styles/variables.js` with the full compatibility map:

```js
import { color } from "../src/design-system/tokens";

export const themeColors = {
	gray100: color.surface.subtle,
	gray200: color.surface.muted,
	gray300: color.border.default,
	gray500: color.text.muted,
	gray600: color.text.secondary,
	gray700: "#444444",
	gray900: color.text.primary,
	orange100: color.action.primarySubtle,
	orange300: color.action.accent,
	orange500: color.action.primary,
	borderBottom: color.border.strong,
};
```

- [ ] **Step 4: Run the focused token test**

Run: `npm run test:ci -- src/design-system/tokens/__tests__/tokens.test.ts`

Expected: PASS with 2 tests.

- [ ] **Step 5: Commit the tokens and adapter**

```bash
git add src/design-system/tokens styles/variables.js
git commit -m "feat: add semantic design tokens"
```

### Task 3: Build and test accessible UI primitives

**Files:**
- Create: `src/design-system/components/AppButton.tsx`
- Create: `src/design-system/components/TextField.tsx`
- Create: `src/design-system/components/Screen.tsx`
- Create: `src/design-system/components/index.ts`
- Create: `src/design-system/components/__tests__/AppButton.test.tsx`
- Create: `src/design-system/components/__tests__/TextField.test.tsx`
- Create: `src/design-system/components/__tests__/Screen.test.tsx`

**Interfaces:**
- Consumes: `color`, `spacing`, `radius`, and `typography` from Task 2.
- Produces: `AppButton`, `TextField`, and `Screen` named exports from `src/design-system/components`.
- `AppButton` accepts `label`, `variant?: "primary" | "secondary"`, `disabled?: boolean`, and `onPress?: () => void`.
- `TextField` accepts `label`, `error?: string`, and all `TextInputProps`.
- `Screen` accepts `children`, `padded?: boolean`, and all `SafeAreaViewProps`.

- [ ] **Step 1: Write failing component contract tests**

Create `AppButton.test.tsx`:

```tsx
import { fireEvent, render } from "@testing-library/react-native";
import { AppButton } from "../AppButton";

test("calls onPress only while enabled", () => {
	const onPress = jest.fn();
	const { getByRole, rerender } = render(<AppButton label="Continue" onPress={onPress} />);
	fireEvent.press(getByRole("button", { name: "Continue" }));
	expect(onPress).toHaveBeenCalledTimes(1);
	rerender(<AppButton label="Continue" onPress={onPress} disabled />);
	expect(getByRole("button", { name: "Continue" })).toBeDisabled();
});
```

Create `TextField.test.tsx`:

```tsx
import { render } from "@testing-library/react-native";
import { TextField } from "../TextField";

test("connects a visible label and optional error to the input", () => {
	const { getByLabelText, getByText } = render(<TextField label="Phone number" error="Enter a valid number" />);
	expect(getByLabelText("Phone number")).toBeTruthy();
	expect(getByText("Enter a valid number")).toBeTruthy();
});
```

Create `Screen.test.tsx`:

```tsx
import { render } from "@testing-library/react-native";
import { Text } from "react-native";
import { Screen } from "../Screen";

test("renders children inside the screen container", () => {
	const { getByText } = render(<Screen><Text>Content</Text></Screen>);
	expect(getByText("Content")).toBeTruthy();
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npm run test:ci -- src/design-system/components/__tests__`

Expected: FAIL because the component modules do not exist.

- [ ] **Step 3: Implement the minimal primitives**

Create `AppButton.tsx`:

```tsx
import { Pressable, StyleSheet, Text } from "react-native";
import { color, radius, spacing, typography } from "../tokens";

type AppButtonProps = { label: string; variant?: "primary" | "secondary"; disabled?: boolean; onPress?: () => void };

export function AppButton({ label, variant = "primary", disabled = false, onPress }: AppButtonProps) {
	const isPrimary = variant === "primary";
	return <Pressable accessibilityRole="button" accessibilityLabel={label} accessibilityState={{ disabled }} disabled={disabled} onPress={onPress} style={[styles.base, isPrimary ? styles.primary : styles.secondary, disabled && styles.disabled]}><Text style={isPrimary ? styles.primaryLabel : styles.secondaryLabel}>{label}</Text></Pressable>;
}

const styles = StyleSheet.create({
	base: { alignItems: "center", borderRadius: radius.md, justifyContent: "center", minHeight: 56, paddingHorizontal: spacing[6] },
	primary: { backgroundColor: color.action.primary }, secondary: { backgroundColor: color.action.primarySubtle }, disabled: { opacity: 0.45 },
	primaryLabel: { ...typography.button, color: color.text.inverse }, secondaryLabel: { ...typography.button, color: color.action.primary },
});
```

Create `TextField.tsx`:

```tsx
import { StyleSheet, Text, TextInput, type TextInputProps, View } from "react-native";
import { color, radius, spacing, typography } from "../tokens";

type TextFieldProps = TextInputProps & { label: string; error?: string };

export function TextField({ label, error, style, ...inputProps }: TextFieldProps) {
	return <View style={styles.container}><Text style={styles.label}>{label}</Text><TextInput accessibilityLabel={label} style={[styles.input, error && styles.inputError, style]} {...inputProps} />{error ? <Text accessibilityRole="alert" style={styles.error}>{error}</Text> : null}</View>;
}

const styles = StyleSheet.create({
	container: { gap: spacing[2] }, label: { ...typography.body.md, color: color.text.primary },
	input: { borderColor: color.border.strong, borderRadius: radius.md, borderWidth: 1, minHeight: 48, paddingHorizontal: spacing[3] },
	inputError: { borderColor: color.action.primary }, error: { ...typography.body.sm, color: color.action.primary },
});
```

Create `Screen.tsx` and `index.ts`:

```tsx
import { SafeAreaView, StyleSheet, type SafeAreaViewProps } from "react-native";
import { color, spacing } from "../tokens";

type ScreenProps = SafeAreaViewProps & { padded?: boolean };
export function Screen({ padded = true, style, ...props }: ScreenProps) {
	return <SafeAreaView style={[styles.base, padded && styles.padded, style]} {...props} />;
}
const styles = StyleSheet.create({ base: { flex: 1, backgroundColor: color.surface.default }, padded: { paddingHorizontal: spacing[6] } });
```

```ts
export { AppButton } from "./AppButton";
export { Screen } from "./Screen";
export { TextField } from "./TextField";
```

- [ ] **Step 4: Run the component contract tests**

Run: `npm run test:ci -- src/design-system/components/__tests__`

Expected: PASS with 3 tests.

- [ ] **Step 5: Commit the primitives and tests**

```bash
git add src/design-system/components
git commit -m "feat: add reusable design system primitives"
```

### Task 4: Document usage and enforce the new test gate

**Files:**
- Create: `docs/design-system.md`
- Modify: `.github/workflows/quality.yml`

**Interfaces:**
- Consumes: public component exports from Task 3.
- Produces: a contributor reference for primitive props and the incremental migration rule.
- Produces: CI that runs component tests before formatting and iOS export.

- [ ] **Step 1: Write the usage document**

Create `docs/design-system.md` with this content:

~~~~md
# Design system

Import semantic values from `src/design-system/tokens` and primitives from `src/design-system/components`.

`AppButton` accepts `label`, `variant` (`primary` or `secondary`), `disabled`, and `onPress`.
`TextField` accepts `label`, optional `error`, and native `TextInput` props.
`Screen` accepts `padded` and native `SafeAreaView` props.

```tsx
<Screen><TextField label="휴대폰 번호" keyboardType="phone-pad" /><AppButton label="인증번호 요청" onPress={requestCode} /></Screen>
```

New feature code must use semantic tokens and these primitives. Existing screens may continue to import `themeColors` until their dedicated migration PR; do not mix unrelated screen redesigns into this foundation PR.
~~~~

- [ ] **Step 2: Update the quality workflow**

Replace the verification step command in `.github/workflows/quality.yml` with:

```yaml
run: npm run test:ci && npm run verify
```

- [ ] **Step 3: Prove the documentation and CI command are valid**

Run:

```bash
npm run test:ci
npm run typecheck
npm run verify
npx expo export --platform web --output-dir dist-web
npx expo-doctor
git diff --check
```

Expected: all tests pass, both platform exports succeed, Expo Doctor reports 20/20 checks, and `git diff --check` has no output.

- [ ] **Step 4: Commit the documentation and gate**

```bash
git add docs/design-system.md .github/workflows/quality.yml
git commit -m "docs: document design system adoption"
```

### Task 5: Final integration verification and draft PR

**Files:**
- Verify: all files changed by Tasks 1-4

**Interfaces:**
- Consumes: the completed token, primitive, test, documentation, and CI changes.
- Produces: a draft PR targeting `dev`.

- [ ] **Step 1: Verify a clean worktree and review the diff**

Run:

```bash
git status --short
git diff origin/dev...HEAD --check
git diff --stat origin/dev...HEAD
```

Expected: only planned source, test, configuration, documentation, and lockfile changes are present.

- [ ] **Step 2: Create the draft PR after pushing the branch**

Run:

```bash
git push -u origin feat/design-system-foundation
gh pr create --base dev --head feat/design-system-foundation --draft --title "feat: add design system foundation"
```

- [ ] **Step 3: Wait for the remote quality gate**

Run: `gh pr checks --watch`

Expected: the test, formatting, and iOS-bundle job succeeds before requesting review.
