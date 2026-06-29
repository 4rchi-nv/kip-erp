"use client";

import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";
import {
	useCreateUserMutation,
	useDeleteUserMutation,
	useRolePermissionsQuery,
	useUpdateUserMutation,
	useUsersQuery,
} from "#/entities/user";
import {
	listParamsFromGrid,
	mutationFeedback,
	processGridData,
	resolveGridRows,
	useConfirmDelete,
	useGridListState,
} from "#/shared/lib";
import type { SystemUser } from "#/types";
import type { UserFormValues } from "./schema";

type DeleteTarget = { id: string; label: string };

export function useUsers() {
	const grid = useGridListState();
	const [dialogOpen, setDialogOpen] = useState(false);
	const [editingUser, setEditingUser] = useState<SystemUser | null>(null);
	const deleteConfirm = useConfirmDelete<DeleteTarget>();
	const listParams = useMemo(() => listParamsFromGrid(grid), [grid]);
	const { data, isLoading, isFetching } = useUsersQuery(listParams);
	const { data: rolePermissions = [] } = useRolePermissionsQuery();
	const createMutation = useCreateUserMutation();
	const updateMutation = useUpdateUserMutation();
	const deleteMutation = useDeleteUserMutation();

	const { rows, rowCount } = useMemo(() => {
		if (grid.filterModel.items.length === 0) {
			return resolveGridRows({
				data,
				filterModel: grid.filterModel,
				paginationModel: grid.paginationModel,
				searchFields: ["name", "email"],
			});
		}

		return processGridData({
			items: data?.data ?? [],
			search: "",
			searchFields: ["name", "email"],
			filterModel: grid.filterModel,
			sortModel: grid.sortModel,
			paginationModel: grid.paginationModel,
		});
	}, [data, grid]);

	const openCreate = useCallback(() => {
		setEditingUser(null);
		setDialogOpen(true);
	}, []);

	const openEdit = useCallback((user: SystemUser) => {
		setEditingUser(user);
		setDialogOpen(true);
	}, []);

	const closeDialog = useCallback(() => {
		setDialogOpen(false);
		setEditingUser(null);
	}, []);

	const handleSubmit = useCallback(
		(values: UserFormValues) => {
			if (editingUser) {
				updateMutation.mutate(
					{ id: editingUser.id, payload: values },
					mutationFeedback("Пользователь обновлён", { onSuccess: closeDialog }),
				);
			} else {
				createMutation.mutate(values, mutationFeedback("Пользователь добавлен", { onSuccess: closeDialog }));
			}
		},
		[closeDialog, createMutation, editingUser, updateMutation],
	);

	const requestDelete = useCallback(
		(id: string) => {
			const user = rows.find((row) => row.id === id);
			deleteConfirm.open({ id, label: user?.name ?? "пользователя" });
		},
		[deleteConfirm, rows],
	);

	const confirmDelete = useCallback(() => {
		if (!deleteConfirm.target) return;

		deleteMutation.mutate(
			deleteConfirm.target.id,
			mutationFeedback("Пользователь удалён", { onSuccess: deleteConfirm.close }),
		);
	}, [deleteConfirm, deleteMutation]);

	const handleExport = useCallback(() => {
		grid.runWithLoading(() => {
			toast.info("Экспорт в Excel будет доступен после подключения API");
		});
	}, [grid]);

	return {
		users: data?.data ?? [],
		rolePermissions,
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
		editingUser,
		deleteConfirmOpen: deleteConfirm.isOpen,
		deleteConfirmLabel: deleteConfirm.target?.label,
		deleteConfirmLoading: deleteMutation.isPending,
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
