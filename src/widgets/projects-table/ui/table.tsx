"use client";

import type { GridFilterModel, GridPaginationModel, GridSortModel } from "@mui/x-data-grid";
import { useMemo } from "react";
import { DataGridCard, DataGridToolbar, EmptyState } from "#/shared/ui";
import type { Project } from "#/types";
import { createProjectsColumns } from "./cols";

export type ProjectsTableProps = {
	rows: Project[];
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
	onEdit: (item: Project) => void;
	onDelete: (id: string) => void;
	onExport: () => void;
};

export function ProjectsTable({
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
	onEdit,
	onDelete,
	onExport,
}: ProjectsTableProps) {
	const columns = useMemo(() => createProjectsColumns({ onEdit, onDelete }), [onDelete, onEdit]);

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
			sx={{ minHeight: 480 }}
			header={
				<DataGridToolbar
					search={search}
					onSearchChange={onSearchChange}
					searchPlaceholder="Поиск по проекту, заказчику, руководителю..."
					onCreate={onCreate}
					createLabel="Добавить проект"
					createPermission={{ subject: "project", action: "create" }}
					onExport={onExport}
					loading={loading}
				/>
			}
			slots={{
				noRowsOverlay: () => (
					<EmptyState title="Проектов нет" description="Добавьте первый проект автоматизации" />
				),
			}}
		/>
	);
}
