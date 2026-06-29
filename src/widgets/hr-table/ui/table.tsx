"use client";

import type { GridFilterModel, GridPaginationModel, GridSortModel } from "@mui/x-data-grid";
import { useMemo } from "react";
import { DataGridCard, DataGridToolbar, EmptyState } from "#/shared/ui";
import type { Employee } from "#/types";
import { createHrColumns } from "./cols";

export type HrTableProps = {
	rows: Employee[];
	rowCount: number;
	loading?: boolean;
	paginationModel: GridPaginationModel;
	sortModel: GridSortModel;
	filterModel: GridFilterModel;
	search: string;
	onPaginationModelChange: (model: GridPaginationModel) => void;
	onSortModelChange: (model: GridSortModel) => void;
	onFilterModelChange: (model: GridFilterModel) => void;
	onSearchChange: (value: string) => void;
	onCreate: () => void;
	onView: (employee: Employee) => void;
	onEdit: (employee: Employee) => void;
	onDelete: (id: string) => void;
	onExport: () => void;
};

export function HrTable({
	rows,
	rowCount,
	loading = false,
	paginationModel,
	sortModel,
	filterModel,
	search,
	onPaginationModelChange,
	onSortModelChange,
	onFilterModelChange,
	onSearchChange,
	onCreate,
	onView,
	onEdit,
	onDelete,
	onExport,
}: HrTableProps) {
	const columns = useMemo(
		() => createHrColumns({ onView, onEdit, onDelete }),
		[onDelete, onEdit, onView],
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
					searchPlaceholder="Поиск по ФИО, должности, отделу..."
					onCreate={onCreate}
					createLabel="Добавить сотрудника"
					createPermission={{ subject: "employee", action: "create" }}
					onExport={onExport}
					loading={loading}
				/>
			}
			slots={{
				noRowsOverlay: () => (
					<EmptyState title="Нет сотрудников" description="Добавьте первого сотрудника в систему" />
				),
			}}
			sx={{ minHeight: 480 }}
		/>
	);
}
