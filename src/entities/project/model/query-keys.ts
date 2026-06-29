import type { ListProjectsParams } from "../api/contracts";

export const projectsQueryKeys = {
	all: ["projects"] as const,
	list: (params: ListProjectsParams) => [...projectsQueryKeys.all, "list", params] as const,
	detail: (id: string) => [...projectsQueryKeys.all, "detail", id] as const,
};
