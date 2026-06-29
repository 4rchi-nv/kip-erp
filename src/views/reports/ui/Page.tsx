"use client";

import { Box } from "@mui/material";
import dynamic from "next/dynamic";
import { PermissionGuard } from "#/features/auth";
import { DateRangeFilter, useReports } from "#/features/reports";
import { themeTokens } from "#/shared/theme";
import { ConfirmDialog, PageHeader } from "#/shared/ui";
import { ReportsTable } from "#/widgets/reports-table";

const ReportFormDialog = dynamic(
	() =>
		import("#/features/reports/ui/report-form-dialog").then((module) => ({
			default: module.ReportFormDialog,
		})),
	{ ssr: false },
);

export function ReportsPage() {
	const reports = useReports();

	return (
		<PermissionGuard subject="report" action="read">
			<Box sx={{ display: "flex", flexDirection: "column", gap: themeTokens.dashboardGap }}>
				<PageHeader title="Отчёты" subtitle="Формирование и экспорт аналитических отчётов" />

				<DateRangeFilter value={reports.dateRange} onChange={reports.setDateRange} />

				<ReportsTable
					rows={reports.rows}
					rowCount={reports.rowCount}
					loading={reports.loading}
					exportingId={reports.exportingId}
					paginationModel={reports.paginationModel}
					sortModel={reports.sortModel}
					filterModel={reports.filterModel}
					search={reports.search}
					onPaginationModelChange={reports.onPaginationModelChange}
					onSortModelChange={reports.onSortModelChange}
					onFilterModelChange={reports.onFilterModelChange}
					onSearchChange={reports.onSearchChange}
					onCreate={reports.openCreate}
					onEdit={reports.openEdit}
					onDelete={reports.requestDelete}
					onExport={reports.handleExport}
					onExportAll={reports.handleExportAll}
				/>

				{reports.dialogOpen ? (
					<ReportFormDialog
						open={reports.dialogOpen}
						onClose={reports.closeDialog}
						onSubmit={reports.handleSubmit}
						editingReport={reports.editingReport}
					/>
				) : null}

				<ConfirmDialog
					open={reports.deleteConfirmOpen}
					title="Удалить отчёт?"
					description={`Вы уверены, что хотите удалить «${reports.deleteConfirmLabel}»? Это действие нельзя отменить.`}
					loading={reports.deleteConfirmLoading}
					onConfirm={reports.confirmDelete}
					onCancel={reports.cancelDelete}
				/>
			</Box>
		</PermissionGuard>
	);
}
