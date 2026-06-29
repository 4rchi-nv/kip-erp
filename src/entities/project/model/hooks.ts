"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { dashboardQueryKeys } from "#/entities/dashboard";
import type {
	CreateProjectRequest,
	ListProjectsParams,
	UpdateProjectRequest,
} from "../api/contracts";
import { projectsApi } from "../api/projects.api";
import { projectsQueryKeys } from "./query-keys";

function invalidateProjects(queryClient: ReturnType<typeof useQueryClient>) {
	queryClient.invalidateQueries({ queryKey: projectsQueryKeys.all });
	queryClient.invalidateQueries({ queryKey: dashboardQueryKeys.all });
}

export function useProjectsQuery(params: ListProjectsParams) {
	return useQuery({
		queryKey: projectsQueryKeys.list(params),
		queryFn: () => projectsApi.getList(params),
	});
}

export function useProjectQuery(id: string) {
	return useQuery({
		queryKey: projectsQueryKeys.detail(id),
		queryFn: () => projectsApi.getById(id),
		enabled: Boolean(id),
	});
}

export function useCreateProjectMutation() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (payload: CreateProjectRequest) => projectsApi.create(payload),
		onSuccess: () => invalidateProjects(queryClient),
	});
}

export function useUpdateProjectMutation() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ id, payload }: { id: string; payload: UpdateProjectRequest }) =>
			projectsApi.update(id, payload),
		onSuccess: (_data, variables) => {
			invalidateProjects(queryClient);
			queryClient.invalidateQueries({ queryKey: projectsQueryKeys.detail(variables.id) });
		},
	});
}

export function useDeleteProjectMutation() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (id: string) => projectsApi.remove(id),
		onSuccess: () => invalidateProjects(queryClient),
	});
}
