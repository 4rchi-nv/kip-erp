"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { dashboardQueryKeys } from "#/entities/dashboard";
import type {
	CreateServiceRequestRequest,
	ListServiceRequestsParams,
	UpdateServiceRequestRequest,
} from "../api/contracts";
import { serviceApi } from "../api/service.api";
import { serviceQueryKeys } from "./query-keys";

function invalidateService(queryClient: ReturnType<typeof useQueryClient>) {
	queryClient.invalidateQueries({ queryKey: serviceQueryKeys.all });
	queryClient.invalidateQueries({ queryKey: dashboardQueryKeys.all });
}

export function useServiceRequestsQuery(params: ListServiceRequestsParams) {
	return useQuery({
		queryKey: serviceQueryKeys.list(params),
		queryFn: () => serviceApi.getList(params),
	});
}

export function useServiceRequestQuery(id: string) {
	return useQuery({
		queryKey: serviceQueryKeys.detail(id),
		queryFn: () => serviceApi.getById(id),
		enabled: Boolean(id),
	});
}

export function useCreateServiceRequestMutation() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (payload: CreateServiceRequestRequest) => serviceApi.create(payload),
		onSuccess: () => invalidateService(queryClient),
	});
}

export function useUpdateServiceRequestMutation() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ id, payload }: { id: string; payload: UpdateServiceRequestRequest }) =>
			serviceApi.update(id, payload),
		onSuccess: (_data, variables) => {
			invalidateService(queryClient);
			queryClient.invalidateQueries({ queryKey: serviceQueryKeys.detail(variables.id) });
		},
	});
}

export function useDeleteServiceRequestMutation() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (id: string) => serviceApi.remove(id),
		onSuccess: () => invalidateService(queryClient),
	});
}
