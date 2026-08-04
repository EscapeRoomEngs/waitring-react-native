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
		}),
	).toEqual({ storeNm: "Cafe" }));

test("throws server result message", () =>
	expect(() =>
		unwrapApiResponse({
			path: "/store/1",
			status: { statusCd: 404, statusNm: "NOT_FOUND" },
			result: { resultCd: "NOT_FOUND", resultMsg: "missing" },
			output: null,
		}),
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
