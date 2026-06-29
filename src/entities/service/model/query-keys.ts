import type { ListServiceRequestsParams } from "../api/contracts";

export const serviceQueryKeys = {
	all: ["service-requests"] as const,
	list: (params: ListServiceRequestsParams) => [...serviceQueryKeys.all, "list", params] as const,
	detail: (id: string) => [...serviceQueryKeys.all, "detail", id] as const,
};
