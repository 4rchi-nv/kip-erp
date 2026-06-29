"use client";

import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";
import {
	useCreateWarehouseItemMutation,
	useDeleteWarehouseItemMutation,
	useMoveWarehouseStockMutation,
	useUpdateWarehouseItemMutation,
	useWarehouseListQuery,
	useWarehouseReferenceQuery,
} from "#/entities/warehouse";
import {
	listParamsFromGrid,
	mutationFeedback,
	processGridData,
	resolveGridRows,
	useConfirmDelete,
	useGridListState,
} from "#/shared/lib";
import type { InventoryItem } from "#/types";
import type { InventoryItemFormValues } from "./schema";

type DeleteTarget = { id: string; label: string };

export function useWarehouseInventory() {
	const grid = useGridListState();
	const [dialogOpen, setDialogOpen] = useState(false);
	const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
	const deleteConfirm = useConfirmDelete<DeleteTarget>();
	const listParams = useMemo(() => listParamsFromGrid(grid), [grid]);
	const { data, isLoading, isFetching } = useWarehouseListQuery(listParams);
	const { data: warehouseReference } = useWarehouseReferenceQuery();
	const createMutation = useCreateWarehouseItemMutation();
	const updateMutation = useUpdateWarehouseItemMutation();
	const deleteMutation = useDeleteWarehouseItemMutation();
	const moveMutation = useMoveWarehouseStockMutation();

	const { rows, rowCount } = useMemo(() => {
		if (grid.filterModel.items.length === 0) {
			return resolveGridRows({
				data,
				filterModel: grid.filterModel,
				paginationModel: grid.paginationModel,
				searchFields: ["name", "category", "warehouse", "responsiblePerson"],
			});
		}

		return processGridData({
			items: data?.data ?? [],
			search: "",
			searchFields: ["name", "category", "warehouse", "responsiblePerson"],
			filterModel: grid.filterModel,
			sortModel: grid.sortModel,
			paginationModel: grid.paginationModel,
		});
	}, [data, grid]);

	const openCreate = useCallback(() => {
		setEditingItem(null);
		setDialogOpen(true);
	}, []);

	const openEdit = useCallback((item: InventoryItem) => {
		setEditingItem(item);
		setDialogOpen(true);
	}, []);

	const closeDialog = useCallback(() => {
		setDialogOpen(false);
		setEditingItem(null);
	}, []);

	const handleSubmit = useCallback(
		(values: InventoryItemFormValues) => {
			if (editingItem) {
				updateMutation.mutate(
					{ id: editingItem.id, payload: values },
					mutationFeedback("Позиция обновлена", { onSuccess: closeDialog }),
				);
			} else {
				createMutation.mutate(
					{ ...values, status: "in_stock" },
					mutationFeedback("Позиция добавлена", { onSuccess: closeDialog }),
				);
			}
		},
		[closeDialog, createMutation, editingItem, updateMutation],
	);

	const requestDelete = useCallback(
		(id: string) => {
			const item = rows.find((row) => row.id === id);
			deleteConfirm.open({ id, label: item?.name ?? "позицию" });
		},
		[deleteConfirm, rows],
	);

	const confirmDelete = useCallback(() => {
		if (!deleteConfirm.target) return;

		deleteMutation.mutate(
			deleteConfirm.target.id,
			mutationFeedback("Позиция удалена", { onSuccess: deleteConfirm.close }),
		);
	}, [deleteConfirm, deleteMutation]);

	const handleStockMovement = useCallback(
		(item: InventoryItem) => {
			const delta = item.status === "low_stock" || item.status === "out_of_stock" ? 20 : -5;
			moveMutation.mutate(
				{ id: item.id, delta },
				{
					onSuccess: () => {
						toast.info(
							`${delta > 0 ? "Приход" : "Расход"}: ${Math.abs(delta)} ${item.unit} — «${item.name}»`,
						);
					},
					onError: (error) => toast.error(error instanceof Error ? error.message : "Ошибка движения"),
				},
			);
		},
		[moveMutation],
	);

	const handleExport = useCallback(() => {
		grid.runWithLoading(() => {
			toast.info("Экспорт в Excel будет доступен после подключения API");
		});
	}, [grid]);

	return {
		rows,
		rowCount,
		loading:
			isLoading ||
			isFetching ||
			createMutation.isPending ||
			updateMutation.isPending ||
			deleteMutation.isPending ||
			moveMutation.isPending,
		paginationModel: grid.paginationModel,
		sortModel: grid.sortModel,
		filterModel: grid.filterModel,
		search: grid.search,
		dialogOpen,
		editingItem,
		deleteConfirmOpen: deleteConfirm.isOpen,
		deleteConfirmLabel: deleteConfirm.target?.label,
		deleteConfirmLoading: deleteMutation.isPending,
		categories: warehouseReference?.categories ?? [],
		warehouses: warehouseReference?.warehouses ?? [],
		responsiblePersons: warehouseReference?.responsiblePersons ?? [],
		openCreate,
		openEdit,
		closeDialog,
		handleSubmit,
		requestDelete,
		confirmDelete,
		cancelDelete: deleteConfirm.close,
		handleStockMovement,
		handleExport,
		onSearchChange: grid.onSearchChange,
		onPaginationModelChange: grid.onPaginationModelChange,
		onSortModelChange: grid.onSortModelChange,
		onFilterModelChange: grid.onFilterModelChange,
	};
}
