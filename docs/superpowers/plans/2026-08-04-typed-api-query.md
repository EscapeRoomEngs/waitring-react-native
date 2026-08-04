# Typed API Query Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a typed Spring API boundary and TanStack Query store-detail hook without adopting live data in existing screens.

**Architecture:** Axios unwraps `ApiResponse<T>` and throws `ApiError`; request modules, query keys, and hooks stay separate. The root QueryClientProvider sits beside Redux.

**Tech Stack:** Expo 57, TypeScript 6, Axios, @tanstack/react-query, Jest Expo, React Native Testing Library.

## Global Constraints

- Preserve routes, screens, copy, Redux state, API behavior, and visual output.
- Use `EXPO_PUBLIC_API_BASE_URL`; never invent a server URL or production fallback.
- Use `GET /store/{id}` and the Spring `ApiResponse<T>` envelope.
- Do not add authentication, mutations, persistence, retry UX, or screen Query adoption.
- Support iOS, Android, and web exports.

---

### Task 1: Typed client and Store API

**Files:** Create `src/api/types.ts`, `src/api/client.ts`, `src/api/store.ts`, `src/api/__tests__/client.test.ts`; modify `package.json`, `package-lock.json`.

**Interfaces:** Produces `ApiResponse<T>`, `ApiError`, `apiClient`, and `storeApi.getDetail(id: number): Promise<StoreDetail>`.

- [ ] **Step 1: Write the failing envelope tests**

```ts
import { unwrapApiResponse } from "../client";

test("unwraps output", () => expect(unwrapApiResponse({ status: { statusCd: 200, statusNm: "OK" }, result: null, output: { storeNm: "Cafe" } })).toEqual({ storeNm: "Cafe" }));
test("throws server result message", () => expect(() => unwrapApiResponse({ status: { statusCd: 404, statusNm: "NOT_FOUND" }, result: { resultCd: "NOT_FOUND", resultMsg: "missing" }, output: null })).toThrow("missing"));
```

- [ ] **Step 2: Confirm red**

Run: `npm run test:ci -- src/api/__tests__/client.test.ts`

Expected: FAIL because `client.ts` is absent.

- [ ] **Step 3: Implement the client**

Install: `npm install @tanstack/react-query`

Define the complete server `StoreDetail` shape in `types.ts`: `storeNm`, `storeDetail`, `companyNm`, `mallNm`, `locate`, `openTm`, `closeTm`, `closeDay`, `telNo`, `waitingFg`, `waitingTeamCnt`, `waitingTm`, `likedStoreCnt`, `storeImageLink`.

```ts
export const apiClient = axios.create({ baseURL: process.env.EXPO_PUBLIC_API_BASE_URL, timeout: 10_000 });
export function unwrapApiResponse<T>(response: ApiResponse<T>): T {
	if (response.status?.statusCd >= 200 && response.status.statusCd < 300 && response.output !== null) return response.output;
	throw new ApiError(response.result?.resultMsg || "API request failed", response.status?.statusCd);
}
export const storeApi = { getDetail: async (id: number) => unwrapApiResponse((await apiClient.get<ApiResponse<StoreDetail>>("/store/" + id)).data) };
```

- [ ] **Step 4: Confirm green and commit**

Run: `npm run test:ci -- src/api/__tests__/client.test.ts && npm run typecheck`

```bash
git add package.json package-lock.json src/api
git commit -m "feat: add typed store API client"
```

### Task 2: Query provider and store-detail hook

**Files:** Create `src/query/client.ts`, `src/query/store.ts`, `src/query/__tests__/store.test.tsx`; modify `app/_layout.tsx`.

**Interfaces:** Produces `queryClient`, `storeQueryKeys.detail(id)`, and `useStoreDetail(id)` consuming Task 1 `storeApi.getDetail`.

- [ ] **Step 1: Write a failing hook test**

```tsx
import { renderHook, waitFor } from "@testing-library/react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useStoreDetail } from "../store";

test("returns typed detail data", async () => {
	const wrapper = ({ children }: { children: React.ReactNode }) => <QueryClientProvider client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}>{children}</QueryClientProvider>;
	const { result } = renderHook(() => useStoreDetail(1), { wrapper });
	await waitFor(() => expect(result.current.isSuccess).toBe(true));
	expect(result.current.data?.storeNm).toBe("Cafe");
});
```

- [ ] **Step 2: Confirm red**

Run: `npm run test:ci -- src/query/__tests__/store.test.tsx`

Expected: FAIL because `store.ts` is absent.

- [ ] **Step 3: Implement the Query boundary**

```ts
export const queryClient = new QueryClient({ defaultOptions: { queries: { retry: 1, staleTime: 30_000 } } });
export const storeQueryKeys = { all: ["store"] as const, detail: (id: number) => [...storeQueryKeys.all, "detail", id] as const };
export function useStoreDetail(id: number) { return useQuery({ queryKey: storeQueryKeys.detail(id), queryFn: () => storeApi.getDetail(id), enabled: Number.isInteger(id) && id > 0 }); }
```

Wrap the current Redux children in `QueryClientProvider client={queryClient}` inside `app/_layout.tsx`, keeping Stack options unchanged.

- [ ] **Step 4: Confirm green and commit**

Run: `npm run test:ci -- src/query/__tests__/store.test.tsx && npm run typecheck`

```bash
git add app/_layout.tsx src/query
git commit -m "feat: add store detail query hook"
```

### Task 3: Document configuration and verify

**Files:** Create `.env.example`, `docs/api-integration.md`.

- [ ] **Step 1: Document the environment boundary**

Create `.env.example` containing `EXPO_PUBLIC_API_BASE_URL=https://api.example.com`. Document `/store/{id}`, envelope unwrapping, `useStoreDetail`, and deferred screen adoption.

- [ ] **Step 2: Full verification**

Run: `npm run test:ci && npm run typecheck && npm run verify && npx expo export --platform android --output-dir /tmp/waitring-api-android && npx expo export --platform web --output-dir /tmp/waitring-api-web && npx expo-doctor && git diff --check`

Expected: all tests, exports, formatting, and Expo Doctor checks pass.

- [ ] **Step 3: Commit and draft PR**

```bash
git add .env.example docs/api-integration.md
git commit -m "docs: document API integration"
git push -u origin feat/typed-api-query
gh pr create --base dev --head feat/typed-api-query --draft --title "feat: add typed API query foundation"
```
