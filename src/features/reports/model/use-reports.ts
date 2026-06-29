"use client";

import dayjs from "dayjs";
import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";
import {
	useCreateReportMutation,
	useDeleteReportMutation,
	useGenerateReportMutation,
	useReportsQuery,
	useUpdateReportMutation,
} from "#/entities/report";
import {
	listParamsFromGrid,
	mutationFeedback,
	processGridData,
	resolveGridRows,
	useConfirmDelete,
	useGridListState,
} from "#/shared/lib";
import type { ReportDefinition } from "#/types";
import type { ReportFormValues } from "./schema";

export type DateRange = {
	from: string;
	to: string;
};

type DeleteTarget = { id: string; label: string };

export function useReports() {
	const grid = useGridListState();
	const [dialogOpen, setDialogOpen] = useState(false);
	const [editingReport, setEditingReport] = useState<ReportDefinition | null>(null);
	const [exportingId, setExportingId] = useState<string | null>(null);
	const [dateRange, setDateRange] = useState<DateRange>({
		from: dayjs().subtract(1, "month").format("YYYY-MM-DD"),
		to: dayjs().format("YYYY-MM-DD"),
	});
	const deleteConfirm = useConfirmDelete<DeleteTarget>();

	const listParams = useMemo(() => listParamsFromGrid(grid), [grid]);
	const { data, isLoading, isFetching } = useReportsQuery(listParams);
	const createMutation = useCreateReportMutation();
	const updateMutation = useUpdateReportMutation();
	const deleteMutation = useDeleteReportMutation();
	const generateMutation = useGenerateReportMutation();

	const { rows, rowCount } = useMemo(() => {
		if (grid.filterModel.items.length === 0) {
			return resolveGridRows({
				data,
				filterModel: grid.filterModel,
				paginationModel: grid.paginationModel,
				searchFields: ["title", "description", "category"],
			});
		}

		return processGridData({
			items: data?.data ?? [],
			search: "",
			searchFields: ["title", "description", "category"],
			filterModel: grid.filterModel,
			sortModel: grid.sortModel,
			paginationModel: grid.paginationModel,
		});
	}, [data, grid]);

	const openCreate = useCallback(() => {
		setEditingReport(null);
		setDialogOpen(true);
	}, []);

	const openEdit = useCallback((report: ReportDefinition) => {
		setEditingReport(report);
		setDialogOpen(true);
	}, []);

	const closeDialog = useCallback(() => {
		setDialogOpen(false);
		setEditingReport(null);
	}, []);

	const handleSubmit = useCallback(
		(values: ReportFormValues) => {
			if (editingReport) {
				updateMutation.mutate(
					{ id: editingReport.id, payload: values },
					mutationFeedback("Отчёт обновлён", { onSuccess: closeDialog }),
				);
			} else {
				createMutation.mutate(values, mutationFeedback("Отчёт создан", { onSuccess: closeDialog }));
			}
		},
		[closeDialog, createMutation, editingReport, updateMutation],
	);

	const requestDelete = useCallback(
		(id: string) => {
			const report = rows.find((row) => row.id === id);
			deleteConfirm.open({ id, label: report?.title ?? "отчёт" });
		},
		[deleteConfirm, rows],
	);

	const confirmDelete = useCallback(() => {
		if (!deleteConfirm.target) return;

		deleteMutation.mutate(
			deleteConfirm.target.id,
			mutationFeedback("Отчёт удалён", { onSuccess: deleteConfirm.close }),
		);
	}, [deleteConfirm, deleteMutation]);

	const handleExport = useCallback(
		(reportId: string, reportTitle: string, format: "excel" | "pdf") => {
			const apiFormat = format === "excel" ? "xlsx" : "pdf";
			setExportingId(`${reportId}-${format}`);

			generateMutation.mutate(
				{
					reportId,
					format: apiFormat,
					dateFrom: dateRange.from,
					dateTo: dateRange.to,
				},
				{
					onSettled: () => setExportingId(null),
					onSuccess: () => {
						const formatLabel = format === "excel" ? "Excel" : "PDF";
						toast.success(`Отчёт «${reportTitle}» подготовлен (${formatLabel})`);
					},
					onError: (error) => {
						toast.error(error instanceof Error ? error.message : "Ошибка экспорта");
					},
				},
			);
		},
		[dateRange.from, dateRange.to, generateMutation],
	);

	const handleExportAll = useCallback(() => {
		grid.runWithLoading(() => {
			toast.info("Массовый экспорт будет доступен после подключения API");
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
		editingReport,
		dateRange,
		setDateRange,
		exportingId,
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
		handleExportAll,
		onSearchChange: grid.onSearchChange,
		onPaginationModelChange: grid.onPaginationModelChange,
		onSortModelChange: grid.onSortModelChange,
		onFilterModelChange: grid.onFilterModelChange,
	};
}
