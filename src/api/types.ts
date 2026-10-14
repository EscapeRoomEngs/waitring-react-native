export interface ApiStatus {
	statusCd: number;
	statusNm: string;
}

export interface ApiResult {
	resultCd: string;
	resultMsg: string;
}

export interface ApiResponse<T> {
	path: string | null;
	status: ApiStatus | null;
	result: ApiResult | null;
	output: T | null;
}

export class ApiError extends Error {
	constructor(
		message: string,
		public readonly statusCode?: number
	) {
		super(message);
		this.name = "ApiError";
	}
}

export interface StoreDetail {
	storeNm: string;
	storeDetail: string;
	companyNm: string;
	mallNm: string;
	locate: string;
	openTm: string;
	closeTm: string;
	closeDay: string;
	telNo: string;
	waitingFg: string;
	waitingTeamCnt: number;
	waitingTm: number;
	likedStoreCnt: number;
	storeImageLink?: string | null;
}
