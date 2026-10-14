# Split Uncommitted Changes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish the current `develop` worktree changes as five focused draft pull requests without losing or combining unrelated work.

**Architecture:** Make one temporary local branch containing five focused commits. Create PR branches from the relevant commits: the shared-component branch first, the review-list branch stacked on it, and three independent branches from `develop`. Keep the source `develop` worktree clean after the commits are split.

**Tech Stack:** Git worktrees, GitHub pull requests, Expo 49, React Native 0.72.

## Global Constraints

- Base all independent PRs on `develop`; stack the review-list PR on the shared-components PR.
- Do not add dependencies or a test framework.
- Use `git diff --check` and `npx expo export --platform web --output-dir dist-web` for each code PR.
- Open every pull request as a draft.

---

### Task 1: Shared form component relocation

**Files:**
- Move: `components/BottomButton.js` to `components/common/BottomButton.js`
- Move: `components/KeyboardView.js` to `components/common/KeyboardView.js`
- Move: `components/TextInputField.js` to `components/common/TextInputField.js`
- Modify: `screens/member/SignUp.js`, `screens/store/StoreDetail.js`

**Interfaces:**
- Consumes: existing default exports of the three shared components.
- Produces: the same exports at `components/common/*` with all consuming imports updated.

- [ ] Stage only the six relocation/import files.
- [ ] Add the missing `Platform` import in `KeyboardView` and replace `TextInput`'s unsupported `disabled` prop with `editable={!disabled}`.
- [ ] Run `git diff --check` and the Expo web export.
- [ ] Commit `refactor: move shared form components`.
- [ ] Push `agent/shared-form-components` and open a draft PR against `develop`.

### Task 2: Store review list extraction

**Files:**
- Modify: `components/store/StoreDetailListItem.js`, `screens/store/StoreDetail.js`

**Interfaces:**
- Consumes: `ReviewListArea({ reviewList })`.
- Produces: `ReviewListArea`, which displays passed reviews and uses an explicit local mock only when no list is provided.

- [ ] Stage only the two review-list files.
- [ ] Keep mock reviews as a default value; do not overwrite a passed `reviewList`.
- [ ] Run `git diff --check` and the Expo web export.
- [ ] Commit `feat: extract store review list`.
- [ ] Push `agent/store-review-list` and open a draft PR against `agent/shared-form-components`.

### Task 3: Category API module rename

**Files:**
- Rename: `apis/store/storecategories.js` to `apis/store/categories.js`

**Interfaces:**
- Consumes: existing category API exports.
- Produces: the same exports under the corrected filename.

- [ ] Verify there are no current imports of either filename.
- [ ] Stage the rename only.
- [ ] Run `git diff --check`.
- [ ] Commit `refactor: rename store category API module`.
- [ ] Push `agent/rename-category-api` and open a draft PR against `develop`.

### Task 4: Documentation updates

**Files:**
- Modify: `README.md`
- Create: `docs/design-system.md`, `docs/superpowers/plans/2026-08-07-split-uncommitted-changes.md`

**Interfaces:**
- Consumes: the current palette and common component descriptions.
- Produces: contributor setup guidance and a non-binding design-system reference.

- [ ] Remove README trailing whitespace.
- [ ] Stage only documentation files.
- [ ] Run `git diff --check`.
- [ ] Commit `docs: document current design system`.
- [ ] Push `agent/document-design-system` and open a draft PR against `develop`.

### Task 5: Legacy formatting cleanup

**Files:**
- Modify: `App.js`, `components/InputForm.js`, `components/TodoItem.js`

**Interfaces:**
- Consumes: existing application behavior.
- Produces: formatting and comments only; no behavior change.

- [ ] Stage only the three cleanup files.
- [ ] Run `git diff --check`.
- [ ] Commit `chore: format touched legacy files`.
- [ ] Push `agent/format-legacy-files` and open a draft PR against `develop`.
