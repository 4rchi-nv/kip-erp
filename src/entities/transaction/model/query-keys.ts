import type { ListTransactionsParams } from "../api/contracts";

export const transactionsQueryKeys = {
	all: ["transactions"] as const,
	list: (params: ListTransactionsParams) => [...transactionsQueryKeys.all, "list", params] as const,
	detail: (id: string) => [...transactionsQueryKeys.all, "detail", id] as const,
	reference: ["transactions", "reference"] as const,
};
