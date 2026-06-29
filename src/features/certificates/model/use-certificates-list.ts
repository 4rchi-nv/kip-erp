"use client";

import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";
import type { CertificateRecord } from "#/entities/certificate/api/contracts";
import {
	useCertificatesQuery,
	useCreateCertificateMutation,
	useDeleteCertificateMutation,
	useUpdateCertificateMutation,
} from "#/entities/certificate";
import { useEmployeesQuery } from "#/entities/employee";
import {
	listParamsFromGrid,
	mutationFeedback,
	processGridData,
	resolveGridRows,
	useConfirmDelete,
	useGridListState,
} from "#/shared/lib";
import type { CertificateRecordFormValues } from "./certificate-record-schema";

type DeleteTarget = { id: string; label: string };

export function useCertificatesList() {
	const grid = useGridListState();
	const [dialogOpen, setDialogOpen] = useState(false);
	const [editingCertificate, setEditingCertificate] = useState<CertificateRecord | null>(null);
	const deleteConfirm = useConfirmDelete<DeleteTarget>();

	const listParams = useMemo(() => listParamsFromGrid(grid), [grid]);
	const { data, isLoading, isFetching } = useCertificatesQuery(listParams);
	const { data: employeesData } = useEmployeesQuery({ page: 0, pageSize: 200 });
	const createMutation = useCreateCertificateMutation();
	const updateMutation = useUpdateCertificateMutation();
	const deleteMutation = useDeleteCertificateMutation();

	const employees = employeesData?.data ?? [];

	const { rows, rowCount } = useMemo(() => {
		if (grid.filterModel.items.length === 0) {
			return resolveGridRows({
				data,
				filterModel: grid.filterModel,
				paginationModel: grid.paginationModel,
				searchFields: ["employeeName", "type", "language"],
			});
		}

		return processGridData({
			items: data?.data ?? [],
			search: "",
			searchFields: ["employeeName", "type", "language"],
			filterModel: grid.filterModel,
			sortModel: grid.sortModel,
			paginationModel: grid.paginationModel,
		});
	}, [data, grid]);

	const openCreate = useCallback(() => {
		setEditingCertificate(null);
		setDialogOpen(true);
	}, []);

	const openEdit = useCallback((certificate: CertificateRecord) => {
		setEditingCertificate(certificate);
		setDialogOpen(true);
	}, []);

	const closeDialog = useCallback(() => {
		setDialogOpen(false);
		setEditingCertificate(null);
	}, []);

	const handleSubmit = useCallback(
		(values: CertificateRecordFormValues) => {
			if (editingCertificate) {
				updateMutation.mutate(
					{ id: editingCertificate.id, payload: values },
					mutationFeedback("Сертификат обновлён", { onSuccess: closeDialog }),
				);
			} else {
				createMutation.mutate(values, mutationFeedback("Сертификат создан", { onSuccess: closeDialog }));
			}
		},
		[closeDialog, createMutation, editingCertificate, updateMutation],
	);

	const requestDelete = useCallback(
		(id: string) => {
			const certificate = rows.find((row) => row.id === id);
			deleteConfirm.open({
				id,
				label: certificate?.employeeName ?? "сертификат",
			});
		},
		[deleteConfirm, rows],
	);

	const confirmDelete = useCallback(() => {
		if (!deleteConfirm.target) return;

		deleteMutation.mutate(
			deleteConfirm.target.id,
			mutationFeedback("Сертификат удалён", { onSuccess: deleteConfirm.close }),
		);
	}, [deleteConfirm, deleteMutation]);

	const handleExport = useCallback(() => {
		grid.runWithLoading(() => {
			toast.info("Экспорт реестра будет доступен после подключения API");
		});
	}, [grid]);

	return {
		rows,
		rowCount,
		employees,
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
		editingCertificate,
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
