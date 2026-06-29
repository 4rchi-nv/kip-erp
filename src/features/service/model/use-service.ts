"use client";

import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";
import {
	useCreateServiceRequestMutation,
	useDeleteServiceRequestMutation,
	useServiceRequestsQuery,
	useUpdateServiceRequestMutation,
} from "#/entities/service";
import { useFinanceReferenceQuery } from "#/entities/transaction";
import {
	listParamsFromGrid,
	mutationFeedback,
	processGridData,
	resolveGridRows,
	useConfirmDelete,
	useGridListState,
} from "#/shared/lib";
import type { ServiceRequest } from "#/types";
import type { ServiceRequestFormValues } from "./schema";

type DeleteTarget = { id: string; label: string };

const SEARCH_FIELDS: (keyof ServiceRequest)[] = ["title", "project", "assignee"];

export function useService() {
	const grid = useGridListState();
	const [dialogOpen, setDialogOpen] = useState(false);
	const [editingItem, setEditingItem] = useState<ServiceRequest | null>(null);
	const deleteConfirm = useConfirmDelete<DeleteTarget>();
	const listParams = useMemo(() => listParamsFromGrid(grid), [grid]);
	const { data, isLoading, isFetching } = useServiceRequestsQuery(listParams);
	const { data: financeReference } = useFinanceReferenceQuery();
	const createMutation = useCreateServiceRequestMutation();
	const updateMutation = useUpdateServiceRequestMutation();
	const deleteMutation = useDeleteServiceRequestMutation();

	const { rows, rowCount } = useMemo(() => {
		if (grid.filterModel.items.length === 0) {
			return resolveGridRows({
				data,
				filterModel: grid.filterModel,
				paginationModel: grid.paginationModel,
				searchFields: SEARCH_FIELDS,
			});
		}

		return processGridData({
			items: data?.data ?? [],
			search: "",
			searchFields: SEARCH_FIELDS,
			filterModel: grid.filterModel,
			sortModel: grid.sortModel,
			paginationModel: grid.paginationModel,
		});
	}, [data, grid]);

	const openCreate = useCallback(() => {
		setEditingItem(null);
		setDialogOpen(true);
	}, []);

	const openEdit = useCallback((item: ServiceRequest) => {
		setEditingItem(item);
		setDialogOpen(true);
	}, []);

	const closeDialog = useCallback(() => {
		setDialogOpen(false);
		setEditingItem(null);
	}, []);

	const handleSubmit = useCallback(
		(values: ServiceRequestFormValues) => {
			if (editingItem) {
				updateMutation.mutate(
					{ id: editingItem.id, payload: values },
					mutationFeedback("Заявка обновлена", { onSuccess: closeDialog }),
				);
			} else {
				createMutation.mutate(
					values,
					mutationFeedback("Заявка создана", { onSuccess: closeDialog }),
				);
			}
		},
		[closeDialog, createMutation, editingItem, updateMutation],
	);

	const requestDelete = useCallback(
		(id: string) => {
			const item = rows.find((row) => row.id === id);
			deleteConfirm.open({ id, label: item?.title ?? "заявку" });
		},
		[deleteConfirm, rows],
	);

	const confirmDelete = useCallback(() => {
		if (!deleteConfirm.target) return;

		deleteMutation.mutate(
			deleteConfirm.target.id,
			mutationFeedback("Заявка удалена", { onSuccess: deleteConfirm.close }),
		);
	}, [deleteConfirm, deleteMutation]);

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
			deleteMutation.isPending,
		paginationModel: grid.paginationModel,
		sortModel: grid.sortModel,
		filterModel: grid.filterModel,
		search: grid.search,
		dialogOpen,
		editingItem,
		deleteConfirmOpen: deleteConfirm.isOpen,
		deleteConfirmLabel: deleteConfirm.target?.label,
		deleteConfirmLoading: deleteMutation.isPending,
		projects: financeReference?.projects ?? [],
		assignees: financeReference?.responsiblePersons ?? [],
		openCreate,
		openEdit,
		closeDialog,
		handleSubmit,
		requestDelete,
		confirmDelete,
		cancelDelete: deleteConfirm.close,
		handleExport,
		onSearchChange: grid.onSearchChange,
		onPaginationModelChange: grid.onPaginationModelChange,
		onSortModelChange: grid.onSortModelChange,
		onFilterModelChange: grid.onFilterModelChange,
	};
}
