"use client";

import type { GridFilterModel, GridPaginationModel, GridSortModel } from "@mui/x-data-grid";
import { useMemo } from "react";
import { DataGridCard, DataGridToolbar, EmptyState } from "#/shared/ui";
import type { ReportDefinition } from "#/types";
import { createReportsColumns } from "./cols";

export type ReportsTableProps = {
	rows: ReportDefinition[];
	rowCount: number;
	loading?: boolean;
	exportingId: string | null;
	paginationModel: GridPaginationModel;
	sortModel: GridSortModel;
	filterModel: GridFilterModel;
	search: string;
	onPaginationModelChange: (model: GridPaginationModel) => void;
	onSortModelChange: (model: GridSortModel) => void;
	onFilterModelChange: (model: GridFilterModel) => void;
	onSearchChange: (value: string) => void;
	onCreate: () => void;
	onEdit: (report: ReportDefinition) => void;
	onDelete: (id: string) => void;
	onExport: (reportId: string, reportTitle: string, format: "excel" | "pdf") => void;
	onExportAll: () => void;
};

export function ReportsTable({
	rows,
	rowCount,
	loading = false,
	exportingId,
	paginationModel,
	sortModel,
	filterModel,
	search,
	onPaginationModelChange,
	onSortModelChange,
	onFilterModelChange,
	onSearchChange,
	onCreate,
	onEdit,
	onDelete,
	onExport,
	onExportAll,
}: ReportsTableProps) {
	const columns = useMemo(
		() => createReportsColumns({ exportingId, onEdit, onDelete, onExport }),
		[exportingId, onDelete, onEdit, onExport],
	);

	return (
		<DataGridCard
			rows={rows}
			columns={columns}
			rowCount={rowCount}
			loading={loading}
			paginationModel={paginationModel}
			onPaginationModelChange={onPaginationModelChange}
			sortModel={sortModel}
			onSortModelChange={onSortModelChange}
			filterModel={filterModel}
			onFilterModelChange={onFilterModelChange}
			pageSizeOptions={[5, 10, 25]}
			pagination
			disableRowSelectionOnClick
			getRowId={(row) => row.id}
			header={
				<DataGridToolbar
					search={search}
					onSearchChange={onSearchChange}
					searchPlaceholder="Поиск по названию, описанию, категории..."
					onCreate={onCreate}
					createLabel="Добавить отчёт"
					createPermission={{ subject: "report", action: "create" }}
					onExport={onExportAll}
					loading={loading}
				/>
			}
			slots={{
				noRowsOverlay: () => (
					<EmptyState
						title="Отчёты не найдены"
						description="Создайте новый отчёт или измените параметры поиска"
					/>
				),
			}}
			sx={{ minHeight: 480 }}
		/>
	);
}
