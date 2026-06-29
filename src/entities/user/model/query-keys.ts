import type { ListUsersParams } from "../api/contracts";

export const usersQueryKeys = {
	all: ["users"] as const,
	list: (params: ListUsersParams) => [...usersQueryKeys.all, "list", params] as const,
	detail: (id: string) => [...usersQueryKeys.all, "detail", id] as const,
	rolePermissions: ["users", "role-permissions"] as const,
};
