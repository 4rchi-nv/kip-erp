"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { dashboardQueryKeys } from "#/entities/dashboard";
import type {
	CreateTransactionRequest,
	ListTransactionsParams,
	UpdateTransactionRequest,
} from "../api/contracts";
import { transactionsApi } from "../api/transactions.api";
import { transactionsQueryKeys } from "./query-keys";

function invalidateFinance(queryClient: ReturnType<typeof useQueryClient>) {
	queryClient.invalidateQueries({ queryKey: transactionsQueryKeys.all });
	queryClient.invalidateQueries({ queryKey: dashboardQueryKeys.all });
}

export function useTransactionsQuery(params: ListTransactionsParams) {
	return useQuery({
		queryKey: transactionsQueryKeys.list(params),
		queryFn: () => transactionsApi.getList(params),
	});
}

export function useTransactionQuery(id: string) {
	return useQuery({
		queryKey: transactionsQueryKeys.detail(id),
		queryFn: () => transactionsApi.getById(id),
		enabled: Boolean(id),
	});
}

export function useFinanceReferenceQuery() {
	return useQuery({
		queryKey: transactionsQueryKeys.reference,
		queryFn: () => transactionsApi.getFinanceReference(),
	});
}

export function useCreateTransactionMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (payload: CreateTransactionRequest) => transactionsApi.create(payload),
		onSuccess: () => invalidateFinance(queryClient),
	});
}

export function useUpdateTransactionMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, payload }: { id: string; payload: UpdateTransactionRequest }) =>
			transactionsApi.update(id, payload),
		onSuccess: (_data, variables) => {
			invalidateFinance(queryClient);
			queryClient.invalidateQueries({ queryKey: transactionsQueryKeys.detail(variables.id) });
		},
	});
}

export function useDeleteTransactionMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => transactionsApi.remove(id),
		onSuccess: () => invalidateFinance(queryClient),
	});
}

export function useExportTransactionsMutation() {
	return useMutation({
		mutationFn: (params: ListTransactionsParams & { format?: "xlsx" | "csv" }) =>
			transactionsApi.export(params),
	});
}
