"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
	CreateEquipmentRequest,
	ListEquipmentParams,
	UpdateEquipmentRequest,
} from "../api/contracts";
import { equipmentApi } from "../api/equipment.api";
import { equipmentQueryKeys } from "./query-keys";

function invalidateEquipment(queryClient: ReturnType<typeof useQueryClient>) {
	queryClient.invalidateQueries({ queryKey: equipmentQueryKeys.all });
}

export function useEquipmentListQuery(params: ListEquipmentParams) {
	return useQuery({
		queryKey: equipmentQueryKeys.list(params),
		queryFn: () => equipmentApi.getList(params),
	});
}

export function useEquipmentItemQuery(id: string) {
	return useQuery({
		queryKey: equipmentQueryKeys.detail(id),
		queryFn: () => equipmentApi.getById(id),
		enabled: Boolean(id),
	});
}

export function useCreateEquipmentMutation() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (payload: CreateEquipmentRequest) => equipmentApi.create(payload),
		onSuccess: () => invalidateEquipment(queryClient),
	});
}

export function useUpdateEquipmentMutation() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ id, payload }: { id: string; payload: UpdateEquipmentRequest }) =>
			equipmentApi.update(id, payload),
		onSuccess: (_data, variables) => {
			invalidateEquipment(queryClient);
			queryClient.invalidateQueries({ queryKey: equipmentQueryKeys.detail(variables.id) });
		},
	});
}

export function useDeleteEquipmentMutation() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (id: string) => equipmentApi.remove(id),
		onSuccess: () => invalidateEquipment(queryClient),
	});
}
