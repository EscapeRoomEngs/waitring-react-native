import { useQuery } from "@tanstack/react-query";

import { storeApi } from "../api/store";

export const storeQueryKeys = {
	all: ["store"] as const,
	detail: (id: number) => [...storeQueryKeys.all, "detail", id] as const,
};

export function useStoreDetail(id: number) {
	return useQuery({
		queryKey: storeQueryKeys.detail(id),
		queryFn: () => storeApi.getDetail(id),
		enabled: Number.isInteger(id) && id > 0,
	});
}
