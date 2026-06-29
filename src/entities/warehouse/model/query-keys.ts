import type { ListInventoryParams } from "../api/contracts";

export const warehouseQueryKeys = {
	all: ["warehouse"] as const,
	list: (params: ListInventoryParams) => [...warehouseQueryKeys.all, "list", params] as const,
	detail: (id: string) => [...warehouseQueryKeys.all, "detail", id] as const,
	reference: ["warehouse", "reference"] as const,
};
