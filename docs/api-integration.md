# API Integration

## Configuration

Set the server origin in `.env.local` (ignored by Git). See `.env.example`.

```bash
EXPO_PUBLIC_API_BASE_URL=https://api.example.com
```

There is no fallback URL, and the variable is required on every platform. When it is unset, Axios requests a relative path such as `/store/1`: on iOS and Android that has no host and fails as a transport `ApiError`; on web it goes to the origin serving the app, which is not the API server.

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

`apiClient` (`src/api/client.ts`) accepts every HTTP status so the envelope reaches `unwrapApiResponse(body, httpStatus)`. It returns `output` only when both the HTTP status and a numeric `status.statusCd` are 2xx and `output` is present. Otherwise it throws `ApiError` with `message` from `result.resultMsg` and `statusCode` from the HTTP status (or `statusCd` when the HTTP status is 2xx). This covers non-JSON error pages, empty bodies, and missing `output`. Transport failures (offline, timeout) are rejected as `ApiError` without `statusCode`.

`storeApi.getDetail` also checks the payload against the server's `FindStoreDetailOutput` (strings, numbers, boolean `waitingFg`, optional `storeImageLink`) and rejects a mismatch as `ApiError`.

## Store detail

| Layer     | Module               | Export                                       |
| --------- | -------------------- | -------------------------------------------- |
| HTTP      | `src/api/store.ts`   | `storeApi.getDetail(id)` → `GET /store/{id}` |
| Cache key | `src/query/store.ts` | `storeQueryKeys.detail(id)`                  |
| Hook      | `src/query/store.ts` | `useStoreDetail(id)`                         |

`app/_layout.tsx` provides `queryClient` (`src/query/client.ts`: one retry, 30 s stale time) beside the Redux store. `useStoreDetail` stays disabled until `id` is a positive integer.

## Deferred

Screens still use the legacy callback APIs in `apis/`. The store-detail screen moves to `useStoreDetail` in a follow-up PR.
