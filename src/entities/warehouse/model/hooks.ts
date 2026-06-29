"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { dashboardQueryKeys } from "#/entities/dashboard";
import type {
	CreateInventoryItemRequest,
	ListInventoryParams,
	UpdateInventoryItemRequest,
} from "../api/contracts";
import { warehouseApi } from "../api/warehouse.api";
import { warehouseQueryKeys } from "./query-keys";

function invalidateWarehouse(queryClient: ReturnType<typeof useQueryClient>) {
	queryClient.invalidateQueries({ queryKey: warehouseQueryKeys.all });
	queryClient.invalidateQueries({ queryKey: dashboardQueryKeys.all });
}

export function useWarehouseListQuery(params: ListInventoryParams) {
	return useQuery({
		queryKey: warehouseQueryKeys.list(params),
		queryFn: () => warehouseApi.getList(params),
	});
}

export function useWarehouseItemQuery(id: string) {
	return useQuery({
		queryKey: warehouseQueryKeys.detail(id),
		queryFn: () => warehouseApi.getById(id),
		enabled: Boolean(id),
	});
}

export function useWarehouseReferenceQuery() {
	return useQuery({
		queryKey: warehouseQueryKeys.reference,
		queryFn: () => warehouseApi.getReference(),
	});
}

export function useCreateWarehouseItemMutation() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (payload: CreateInventoryItemRequest) => warehouseApi.create(payload),
		onSuccess: () => invalidateWarehouse(queryClient),
	});
}

export function useUpdateWarehouseItemMutation() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ id, payload }: { id: string; payload: UpdateInventoryItemRequest }) =>
			warehouseApi.update(id, payload),
		onSuccess: (_data, variables) => {
			invalidateWarehouse(queryClient);
			queryClient.invalidateQueries({ queryKey: warehouseQueryKeys.detail(variables.id) });
		},
	});
}

export function useDeleteWarehouseItemMutation() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (id: string) => warehouseApi.remove(id),
		onSuccess: () => invalidateWarehouse(queryClient),
	});
}

export function useMoveWarehouseStockMutation() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ id, delta }: { id: string; delta: number }) => warehouseApi.moveStock(id, delta),
		onSuccess: () => invalidateWarehouse(queryClient),
	});
}
