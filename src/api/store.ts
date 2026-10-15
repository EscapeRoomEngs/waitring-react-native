import { ApiError, apiClient, isRecord, unwrapApiResponse } from "./client";
import type { StoreDetail } from "./types";

export type { StoreDetail } from "./types";

const stringFields = [
	"storeNm",
	"storeDetail",
	"companyNm",
	"mallNm",
	"locate",
	"openTm",
	"closeTm",
	"closeDay",
	"telNo",
] as const;
const numberFields = ["waitingTeamCnt", "waitingTm", "likedStoreCnt"] as const;

// Mirrors the non-null fields of the server's FindStoreDetailOutput.
function isStoreDetail(value: unknown): value is StoreDetail {
	return (
		isRecord(value) &&
		stringFields.every((field) => typeof value[field] === "string") &&
		numberFields.every((field) => typeof value[field] === "number") &&
		typeof value.waitingFg === "boolean" &&
		(value.storeImageLink == null || typeof value.storeImageLink === "string")
	);
}

export const storeApi = {
	getDetail: async (id: number): Promise<StoreDetail> => {
		const response = await apiClient.get<unknown>("/store/" + id);
		const output = unwrapApiResponse<unknown>(response.data, response.status);

		if (!isStoreDetail(output)) {
			throw new ApiError("Malformed store detail response", response.status);
		}
		return output;
	},
};
