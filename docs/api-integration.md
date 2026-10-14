# API Integration

## Configuration

Set the server origin in `.env.local` (ignored by Git). See `.env.example`.

```bash
EXPO_PUBLIC_API_BASE_URL=https://api.example.com
```

There is no fallback URL. When the variable is unset, requests go to a relative path and fail.

## Response envelope

The Spring server wraps every response, including 4xx/5xx, in `ApiResponse<T>`:

```ts
type ApiResponse<T> = {
	path: string | null;
	status: { statusCd: number; statusNm: string } | null;
	result: { resultCd: string; resultMsg: string } | null;
	output: T | null;
};
```

`apiClient` (`src/api/client.ts`) accepts every HTTP status so the envelope reaches `unwrapApiResponse`. It returns `output` for a 2xx `statusCd` and throws `ApiError` (`message` from `result.resultMsg`, `statusCode` from `status.statusCd`) otherwise, including a missing `output` or an empty body. Transport failures (offline, timeout) are rejected as `ApiError` without `statusCode`.

## Store detail

| Layer     | Module               | Export                                       |
| --------- | -------------------- | -------------------------------------------- |
| HTTP      | `src/api/store.ts`   | `storeApi.getDetail(id)` → `GET /store/{id}` |
| Cache key | `src/query/store.ts` | `storeQueryKeys.detail(id)`                  |
| Hook      | `src/query/store.ts` | `useStoreDetail(id)`                         |

`app/_layout.tsx` provides `queryClient` (`src/query/client.ts`: one retry, 30 s stale time) beside the Redux store. `useStoreDetail` stays disabled until `id` is a positive integer.

## Deferred

Screens still use the legacy callback APIs in `apis/`. The store-detail screen moves to `useStoreDetail` in a follow-up PR.
