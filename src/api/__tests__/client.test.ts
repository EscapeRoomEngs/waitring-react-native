import { unwrapApiResponse } from "../client";

test("unwraps output", () =>
	expect(
		unwrapApiResponse({
			status: { statusCd: 200, statusNm: "OK" },
			result: null,
			output: { storeNm: "Cafe" },
		}),
	).toEqual({ storeNm: "Cafe" }));

test("throws server result message", () =>
	expect(() =>
		unwrapApiResponse({
			status: { statusCd: 404, statusNm: "NOT_FOUND" },
			result: { resultCd: "NOT_FOUND", resultMsg: "missing" },
			output: null,
		}),
	).toThrow("missing"));
