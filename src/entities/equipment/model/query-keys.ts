import type { ListEquipmentParams } from "../api/contracts";

export const equipmentQueryKeys = {
	all: ["equipment"] as const,
	list: (params: ListEquipmentParams) => [...equipmentQueryKeys.all, "list", params] as const,
	detail: (id: string) => [...equipmentQueryKeys.all, "detail", id] as const,
};
