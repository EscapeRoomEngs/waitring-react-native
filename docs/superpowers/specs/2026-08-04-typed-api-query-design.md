# Typed API and Query Foundation

## Goal

Replace the callback-based store API boundary with a typed Axios client and TanStack Query foundation, without connecting a screen to live data in this PR.

## Server contract

The companion `waitring-kotlin-spring` service exposes `GET /store/{id}` and returns `ApiResponse<FindStoreDetailOutput>`:

```ts
type ApiResponse<T> = {
	path: string | null;
	status: { statusCd: number; statusNm: string } | null;
	result: { resultCd: string; resultMsg: string } | null;
	output: T | null;
};
```

`StoreDetail` models the server's `storeNm`, `storeDetail`, company and mall metadata, location, hours, contact number, waiting fields, liked count, and optional image link.

## Architecture

`EXPO_PUBLIC_API_BASE_URL` configures a single Axios instance. The client unwraps successful `output` values and throws a typed `ApiError` for transport, non-2xx, malformed, or server-declared failures. A root `QueryClientProvider` is added beside Redux in `app/_layout.tsx`.

`storeApi.getDetail(id)` owns the HTTP path. `storeQueryKeys.detail(id)` owns cache identity. `useStoreDetail(id)` owns the query configuration and returns TanStack Query state. Query consumers never import Axios or raw response envelopes.

## Scope and non-goals

- Add `@tanstack/react-query`, typed API modules, Query provider, and tests.
- Keep legacy callback APIs and all current screens unchanged; the following store-detail PR will switch the screen to `useStoreDetail`.
- Do not invent a development server URL, create mock fallback data, or change backend endpoints.
- Do not add authentication, mutations, retry UX, or persistence in this PR.

## Verification

- Unit-test envelope unwrapping, server failure mapping, query-key stability, and the store-detail query hook with a mocked client.
- Run `npm run check` (type checking, Jest, formatting, iOS export), Android/web exports, and Expo Doctor locally. There is no GitHub Actions CI.
