"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { dashboardQueryKeys } from "#/entities/dashboard";
import type {
	CreateEmployeeRequest,
	ListEmployeesParams,
	UpdateEmployeeRequest,
} from "../api/contracts";
import { employeesApi } from "../api/employees.api";
import { employeesQueryKeys } from "./query-keys";

function invalidateEmployees(queryClient: ReturnType<typeof useQueryClient>) {
	queryClient.invalidateQueries({ queryKey: employeesQueryKeys.all });
	queryClient.invalidateQueries({ queryKey: dashboardQueryKeys.all });
}

export function useEmployeesQuery(params: ListEmployeesParams) {
	return useQuery({
		queryKey: employeesQueryKeys.list(params),
		queryFn: () => employeesApi.getList(params),
	});
}

export function useEmployeeQuery(id: string) {
	return useQuery({
		queryKey: employeesQueryKeys.detail(id),
		queryFn: () => employeesApi.getById(id),
		enabled: Boolean(id),
	});
}

export function useCreateEmployeeMutation() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (payload: CreateEmployeeRequest) => employeesApi.create(payload),
		onSuccess: () => invalidateEmployees(queryClient),
	});
}

export function useUpdateEmployeeMutation() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ id, payload }: { id: string; payload: UpdateEmployeeRequest }) =>
			employeesApi.update(id, payload),
		onSuccess: (_data, variables) => {
			invalidateEmployees(queryClient);
			queryClient.invalidateQueries({ queryKey: employeesQueryKeys.detail(variables.id) });
		},
	});
}

export function useDeleteEmployeeMutation() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (id: string) => employeesApi.remove(id),
		onSuccess: () => invalidateEmployees(queryClient),
	});
}
