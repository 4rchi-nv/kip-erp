"use client";

import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";
import {
	useCreateEmployeeMutation,
	useDeleteEmployeeMutation,
	useEmployeesQuery,
	useUpdateEmployeeMutation,
} from "#/entities/employee";
import {
	listParamsFromGrid,
	mutationFeedback,
	processGridData,
	resolveGridRows,
	useConfirmDelete,
	useGridListState,
} from "#/shared/lib";
import type { Employee } from "#/types";
import type { EmployeeFormValues } from "./schema";

type DeleteTarget = { id: string; label: string };

export function useEmployees() {
	const grid = useGridListState();
	const [dialogOpen, setDialogOpen] = useState(false);
	const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
	const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
	const deleteConfirm = useConfirmDelete<DeleteTarget>();
	const listParams = useMemo(() => listParamsFromGrid(grid), [grid]);
	const { data, isLoading, isFetching } = useEmployeesQuery(listParams);
	const createMutation = useCreateEmployeeMutation();
	const updateMutation = useUpdateEmployeeMutation();
	const deleteMutation = useDeleteEmployeeMutation();

	const { rows, rowCount } = useMemo(() => {
		if (grid.filterModel.items.length === 0) {
			return resolveGridRows({
				data,
				filterModel: grid.filterModel,
				paginationModel: grid.paginationModel,
				searchFields: ["fullName", "position", "department", "phone", "email"],
			});
		}

		return processGridData({
			items: data?.data ?? [],
			search: "",
			searchFields: ["fullName", "position", "department", "phone", "email"],
			filterModel: grid.filterModel,
			sortModel: grid.sortModel,
			paginationModel: grid.paginationModel,
		});
	}, [data, grid]);

	const openCreate = useCallback(() => {
		setEditingEmployee(null);
		setDialogOpen(true);
	}, []);

	const openEdit = useCallback((employee: Employee) => {
		setEditingEmployee(employee);
		setDialogOpen(true);
	}, []);

	const closeDialog = useCallback(() => {
		setDialogOpen(false);
		setEditingEmployee(null);
	}, []);

	const openDetails = useCallback((employee: Employee) => {
		setSelectedEmployee(employee);
	}, []);

	const closeDetails = useCallback(() => setSelectedEmployee(null), []);

	const handleSubmit = useCallback(
		(values: EmployeeFormValues) => {
			if (editingEmployee) {
				updateMutation.mutate(
					{ id: editingEmployee.id, payload: values },
					mutationFeedback("Сотрудник обновлён", { onSuccess: closeDialog }),
				);
			} else {
				createMutation.mutate(values, mutationFeedback("Сотрудник добавлен", { onSuccess: closeDialog }));
			}
		},
		[closeDialog, createMutation, editingEmployee, updateMutation],
	);

	const requestDelete = useCallback(
		(id: string) => {
			const employee = rows.find((row) => row.id === id);
			deleteConfirm.open({ id, label: employee?.fullName ?? "сотрудника" });
		},
		[deleteConfirm, rows],
	);

	const confirmDelete = useCallback(() => {
		if (!deleteConfirm.target) return;

		deleteMutation.mutate(
			deleteConfirm.target.id,
			mutationFeedback("Сотрудник удалён", { onSuccess: deleteConfirm.close }),
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
		editingEmployee,
		selectedEmployee,
		deleteConfirmOpen: deleteConfirm.isOpen,
		deleteConfirmLabel: deleteConfirm.target?.label,
		deleteConfirmLoading: deleteMutation.isPending,
		openCreate,
		openEdit,
		closeDialog,
		openDetails,
		closeDetails,
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
