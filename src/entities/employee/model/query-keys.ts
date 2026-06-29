import type { ListEmployeesParams } from "../api/contracts";

export const employeesQueryKeys = {
	all: ["employees"] as const,
	list: (params: ListEmployeesParams) => [...employeesQueryKeys.all, "list", params] as const,
	detail: (id: string) => [...employeesQueryKeys.all, "detail", id] as const,
};
