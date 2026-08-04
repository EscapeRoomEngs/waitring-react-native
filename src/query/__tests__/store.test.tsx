import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react-native";
import type { ReactNode } from "react";

import { storeApi } from "../../api/store";
import type { StoreDetail } from "../../api/types";
import { useStoreDetail } from "../store";

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
	waitingFg: "Y",
	waitingTeamCnt: 2,
	waitingTm: 10,
	likedStoreCnt: 3,
};

afterEach(() => jest.restoreAllMocks());

test("returns typed detail data", async () => {
	jest.spyOn(storeApi, "getDetail").mockResolvedValue(detail);
	const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
	const wrapper = ({ children }: { children: ReactNode }) => (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);
	const { result, unmount } = await renderHook(() => useStoreDetail(1), { wrapper });

	await waitFor(() => expect(result.current.isSuccess).toBe(true));
	expect(result.current.data?.storeNm).toBe("Cafe");
	expect(storeApi.getDetail).toHaveBeenCalledWith(1);
	await unmount();
	queryClient.clear();
});
