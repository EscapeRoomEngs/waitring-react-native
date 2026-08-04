import { apiClient, unwrapApiResponse } from "./client";
import type { ApiResponse, StoreDetail } from "./types";

export type { StoreDetail } from "./types";

export const storeApi = {
	getDetail: async (id: number): Promise<StoreDetail> =>
		unwrapApiResponse(
			(await apiClient.get<ApiResponse<StoreDetail>>("/store/" + id)).data,
		),
};
