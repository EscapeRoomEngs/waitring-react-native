import { AxiosError } from "axios";

import { ApiError, apiClient, unwrapApiResponse } from "../client";
import { storeApi } from "../store";
import type { ApiResponse, StoreDetail } from "../types";

afterEach(() => jest.restoreAllMocks());

test("unwraps output", () =>
	expect(
		unwrapApiResponse({
			path: "/store/1",
			status: { statusCd: 200, statusNm: "OK" },
			result: null,
			output: { storeNm: "Cafe" },
		})
	).toEqual({ storeNm: "Cafe" }));

test("throws server result message", () =>
	expect(() =>
		unwrapApiResponse({
			path: "/store/1",
			status: { statusCd: 404, statusNm: "NOT_FOUND" },
			result: { resultCd: "NOT_FOUND", resultMsg: "missing" },
			output: null,
		})
	).toThrow("missing"));

test("maps a 404 Spring envelope to ApiError through storeApi", async () => {
	const response: ApiResponse<StoreDetail> = {
		path: "/store/1",
		status: { statusCd: 404, statusNm: "NOT_FOUND" },
		result: { resultCd: "NOT_FOUND", resultMsg: "missing" },
		output: null,
	};

	expect(apiClient.defaults.validateStatus?.(404)).toBe(true);
	jest.spyOn(apiClient, "get").mockResolvedValue({ data: response } as never);

	const detail = storeApi.getDetail(1);

	await expect(detail).rejects.toBeInstanceOf(ApiError);
	await expect(detail).rejects.toMatchObject({ message: "missing", statusCode: 404 });
});

test.each([
	["a missing output", { path: null, status: { statusCd: 200, statusNm: "OK" }, result: null }],
	["a null body", null],
])("rejects %s as ApiError", (_, body) =>
	expect(() => unwrapApiResponse(body as never)).toThrow(ApiError)
);

test("maps a transport timeout to ApiError through storeApi", async () => {
	const adapter = apiClient.defaults.adapter;
	apiClient.defaults.adapter = () =>
		Promise.reject(new AxiosError("timeout of 10000ms exceeded", "ECONNABORTED"));

	try {
		await expect(storeApi.getDetail(1)).rejects.toMatchObject({
			name: "ApiError",
			message: "timeout of 10000ms exceeded",
		});
	} finally {
		apiClient.defaults.adapter = adapter;
	}
});
