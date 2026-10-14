import axios from "axios";

import { ApiError, type ApiResponse } from "./types";

export { ApiError } from "./types";

export const apiClient = axios.create({
	baseURL: process.env.EXPO_PUBLIC_API_BASE_URL,
	timeout: 10_000,
	validateStatus: () => true,
});

export function unwrapApiResponse<T>(response: ApiResponse<T>): T {
	const statusCode = response.status?.statusCd;

	if (
		statusCode !== undefined &&
		statusCode >= 200 &&
		statusCode < 300 &&
		response.output !== null
	) {
		return response.output;
	}

	throw new ApiError(response.result?.resultMsg || "API request failed", response.status?.statusCd);
}
