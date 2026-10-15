import axios from "axios";

import { ApiError, type ApiResponse } from "./types";

export { ApiError } from "./types";

export const apiClient = axios.create({
	baseURL: process.env.EXPO_PUBLIC_API_BASE_URL,
	timeout: 10_000,
	validateStatus: () => true,
});

// Only transport failures (offline, timeout) reject here; HTTP errors arrive as envelopes.
apiClient.interceptors.response.use(undefined, (error: Error) =>
	Promise.reject(new ApiError(error.message || "Network request failed"))
);

// The body is untrusted JSON, so the envelope is checked at runtime instead of trusted via generics.
export function unwrapApiResponse<T>(body: unknown, httpStatus = 200): T {
	const envelope = isRecord(body) ? (body as Partial<ApiResponse<T>>) : undefined;
	const statusCode = envelope?.status?.statusCd;
	const httpOk = httpStatus >= 200 && httpStatus < 300;

	if (
		httpOk &&
		typeof statusCode === "number" &&
		statusCode >= 200 &&
		statusCode < 300 &&
		envelope?.output != null
	) {
		return envelope.output;
	}

	const resultMsg = envelope?.result?.resultMsg;

	throw new ApiError(
		typeof resultMsg === "string" && resultMsg ? resultMsg : "API request failed",
		httpOk && typeof statusCode === "number" ? statusCode : httpStatus
	);
}

export function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === "object" && value !== null;
}
