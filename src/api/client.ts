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

export function unwrapApiResponse<T>(response: ApiResponse<T> | null | undefined): T {
	const statusCode = response?.status?.statusCd;

	if (
		statusCode !== undefined &&
		statusCode >= 200 &&
		statusCode < 300 &&
		response?.output != null
	) {
		return response.output;
	}

	throw new ApiError(response?.result?.resultMsg || "API request failed", statusCode);
}
