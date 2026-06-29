"use client";

import type { GridFilterModel, GridPaginationModel, GridSortModel } from "@mui/x-data-grid";
import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";
import {
	useCreateTransactionMutation,
	useDeleteTransactionMutation,
	useFinanceReferenceQuery,
	useTransactionsQuery,
	useUpdateTransactionMutation,
} from "#/entities/transaction";
import { listParamsFromGrid, mutationFeedback, useConfirmDelete } from "#/shared/lib";
import type { CashOperation } from "#/types";
import { processOperations } from "./process-operations";
import type { OperationFormValues } from "./schema";

const defaultPagination: GridPaginationModel = { page: 0, pageSize: 10 };

type DeleteTarget = { id: string; label: string };

export function useFinanceOperations() {
	const [paginationModel, setPaginationModel] = useState<GridPaginationModel>(defaultPagination);
	const [sortModel, setSortModel] = useState<GridSortModel>([]);
	const [filterModel, setFilterModel] = useState<GridFilterModel>({ items: [] });
	const [search, setSearch] = useState("");
	const [dialogOpen, setDialogOpen] = useState(false);
	const [editingOperation, setEditingOperation] = useState<CashOperation | null>(null);
	const deleteConfirm = useConfirmDelete<DeleteTarget>();

	const listParams = useMemo(
		() => listParamsFromGrid({ search, paginationModel, sortModel }),
		[search, paginationModel, sortModel],
	);

	const { data, isLoading, isFetching } = useTransactionsQuery(listParams);
	const { data: financeReference } = useFinanceReferenceQuery();
	const createMutation = useCreateTransactionMutation();
	const updateMutation = useUpdateTransactionMutation();
	const deleteMutation = useDeleteTransactionMutation();

	const { rows, rowCount } = useMemo(() => {
		const operations = data?.data ?? [];

		if (filterModel.items.length === 0) {
			return { rows: operations, rowCount: data?.meta.total ?? 0 };
		}

		return processOperations({
			operations,
			search: "",
			filterModel,
			sortModel,
			paginationModel,
		});
	}, [data, filterModel, paginationModel, sortModel]);

	const openCreate = useCallback(() => {
		setEditingOperation(null);
		setDialogOpen(true);
	}, []);

	const openEdit = useCallback((operation: CashOperation) => {
		setEditingOperation(operation);
		setDialogOpen(true);
	}, []);

	const closeDialog = useCallback(() => {
		setDialogOpen(false);
		setEditingOperation(null);
	}, []);

	const handleSubmit = useCallback(
		(values: OperationFormValues) => {
			if (editingOperation) {
				updateMutation.mutate(
					{ id: editingOperation.id, payload: values },
					mutationFeedback("Операция обновлена", { onSuccess: closeDialog }),
				);
			} else {
				createMutation.mutate(values, mutationFeedback("Операция добавлена", { onSuccess: closeDialog }));
			}
		},
		[closeDialog, createMutation, editingOperation, updateMutation],
	);

	const requestDelete = useCallback(
		(id: string) => {
			const operation = rows.find((row) => row.id === id);
			const label = operation?.project || operation?.comment || "операцию";
			deleteConfirm.open({ id, label });
		},
		[deleteConfirm, rows],
	);

	const confirmDelete = useCallback(() => {
		if (!deleteConfirm.target) return;

		deleteMutation.mutate(
			deleteConfirm.target.id,
			mutationFeedback("Операция удалена", { onSuccess: deleteConfirm.close }),
		);
	}, [deleteConfirm, deleteMutation]);

	const handleExport = useCallback(() => {
		toast.info("Экспорт в Excel будет доступен после подключения API");
	}, []);

	const handleSearchChange = useCallback((value: string) => {
		setSearch(value);
		setPaginationModel((prev) => ({ ...prev, page: 0 }));
	}, []);

	const handlePaginationModelChange = useCallback((model: GridPaginationModel) => {
		setPaginationModel(model);
	}, []);

	const handleSortModelChange = useCallback((model: GridSortModel) => {
		setSortModel(model);
	}, []);

	const handleFilterModelChange = useCallback((model: GridFilterModel) => {
		setFilterModel(model);
		setPaginationModel((prev) => ({ ...prev, page: 0 }));
	}, []);

	return {
		rows,
		rowCount,
		loading:
			isLoading ||
			isFetching ||
			createMutation.isPending ||
			updateMutation.isPending ||
			deleteMutation.isPending,
		paginationModel,
		sortModel,
		filterModel,
		search,
		dialogOpen,
		editingOperation,
		deleteConfirmOpen: deleteConfirm.isOpen,
		deleteConfirmLabel: deleteConfirm.target?.label,
		deleteConfirmLoading: deleteMutation.isPending,
		projects: financeReference?.projects ?? [],
		responsiblePersons: financeReference?.responsiblePersons ?? [],
		openCreate,
		openEdit,
		closeDialog,
		handleSubmit,
		requestDelete,
		confirmDelete,
		cancelDelete: deleteConfirm.close,
		handleExport,
		onSearchChange: handleSearchChange,
		onPaginationModelChange: handlePaginationModelChange,
		onSortModelChange: handleSortModelChange,
		onFilterModelChange: handleFilterModelChange,
	};
}
