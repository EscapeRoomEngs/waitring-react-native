import { AxiosError, type AxiosAdapter } from "axios";

import { ApiError, apiClient, unwrapApiResponse } from "../client";
import { storeApi } from "../store";
import type { StoreDetail } from "../types";

const defaultAdapter = apiClient.defaults.adapter;

const detail: StoreDetail = {
	storeNm: "Cafe",
	storeDetail: "Coffee and pastries",
	companyNm: "Waitring",
	mallNm: "Main Mall",
	locate: "First floor",
	openTm: "09:00",
	closeTm: "18:00",
	closeDay: "Monday",
	telNo: "010-0000-0000",
	waitingFg: true,
	waitingTeamCnt: 2,
	waitingTm: 10,
	likedStoreCnt: 3,
	storeImageLink: null,
};

const ok = { statusCd: 200, statusNm: "OK" };

function respond(status: number, data: unknown) {
	const adapter: AxiosAdapter = async (config) => ({
		data,
		status,
		statusText: "",
		headers: {},
		config,
	});
	apiClient.defaults.adapter = adapter;
}

afterEach(() => {
	apiClient.defaults.adapter = defaultAdapter;
});

test("unwraps output", () =>
	expect(
		unwrapApiResponse({ path: "/store/1", status: ok, result: null, output: { storeNm: "Cafe" } })
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

test.each([
	["a missing output", { path: null, status: ok, result: null }],
	["a null body", null],
	["a string status code", { path: null, status: { statusCd: "200" }, result: null, output: {} }],
])("rejects %s as ApiError", (_, body) => expect(() => unwrapApiResponse(body)).toThrow(ApiError));

test("returns store detail through storeApi", async () => {
	respond(200, { path: "/store/1", status: ok, result: null, output: detail });

	await expect(storeApi.getDetail(1)).resolves.toEqual(detail);
});

test("maps a 404 Spring envelope to ApiError through storeApi", async () => {
	respond(404, {
		path: "/store/1",
		status: { statusCd: 404, statusNm: "NOT_FOUND" },
		result: { resultCd: "NOT_FOUND", resultMsg: "missing" },
		output: null,
	});

	const request = storeApi.getDetail(1);

	await expect(request).rejects.toBeInstanceOf(ApiError);
	await expect(request).rejects.toMatchObject({ message: "missing", statusCode: 404 });
});

test("keeps the HTTP status when the envelope claims success", async () => {
	respond(503, { path: "/store/1", status: ok, result: null, output: detail });

	await expect(storeApi.getDetail(1)).rejects.toMatchObject({
		name: "ApiError",
		statusCode: 503,
	});
});

test("keeps the HTTP status for a non-JSON error page", async () => {
	respond(502, "<html>Bad Gateway</html>");

	await expect(storeApi.getDetail(1)).rejects.toMatchObject({
		name: "ApiError",
		statusCode: 502,
	});
});

test.each([
	["a non-object output", false],
	["a missing field", { ...detail, storeNm: undefined }],
	["a wrong field type", { ...detail, waitingFg: "Y" }],
])("rejects %s in store detail as ApiError", async (_, output) => {
	respond(200, { path: "/store/1", status: ok, result: null, output });

	await expect(storeApi.getDetail(1)).rejects.toBeInstanceOf(ApiError);
});

test("maps a transport timeout to ApiError through storeApi", async () => {
	apiClient.defaults.adapter = () =>
		Promise.reject(new AxiosError("timeout of 10000ms exceeded", "ECONNABORTED"));

	await expect(storeApi.getDetail(1)).rejects.toMatchObject({
		name: "ApiError",
		message: "timeout of 10000ms exceeded",
	});
});
