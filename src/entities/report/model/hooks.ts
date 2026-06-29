"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ReportDefinition } from "#/types";
import type { ExportReportRequest, ListReportsParams } from "../api/contracts";
import { reportsApi } from "../api/reports.api";
import { reportsQueryKeys } from "./query-keys";

export function useReportsQuery(params: ListReportsParams = { page: 0, pageSize: 100 }) {
	return useQuery({
		queryKey: reportsQueryKeys.list(params),
		queryFn: () => reportsApi.getList(params),
	});
}

export function useReportQuery(id: string) {
	return useQuery({
		queryKey: reportsQueryKeys.detail(id),
		queryFn: () => reportsApi.getById(id),
		enabled: Boolean(id),
	});
}

export function useCreateReportMutation() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (payload: Omit<ReportDefinition, "id">) => reportsApi.create(payload),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: reportsQueryKeys.all }),
	});
}

export function useUpdateReportMutation() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ id, payload }: { id: string; payload: Partial<Omit<ReportDefinition, "id">> }) =>
			reportsApi.update(id, payload),
		onSuccess: (_data, variables) => {
			queryClient.invalidateQueries({ queryKey: reportsQueryKeys.all });
			queryClient.invalidateQueries({ queryKey: reportsQueryKeys.detail(variables.id) });
		},
	});
}

export function useDeleteReportMutation() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (id: string) => reportsApi.remove(id),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: reportsQueryKeys.all }),
	});
}

export function useGenerateReportMutation() {
	return useMutation({
		mutationFn: (payload: ExportReportRequest) => reportsApi.generate(payload),
	});
}
