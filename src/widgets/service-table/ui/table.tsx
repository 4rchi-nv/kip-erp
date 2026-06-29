"use client";

import type { GridFilterModel, GridPaginationModel, GridSortModel } from "@mui/x-data-grid";
import { useMemo } from "react";
import { DataGridCard, DataGridToolbar, EmptyState } from "#/shared/ui";
import type { ServiceRequest } from "#/types";
import { createServiceColumns } from "./cols";

export type ServiceTableProps = {
	rows: ServiceRequest[];
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
	onEdit: (item: ServiceRequest) => void;
	onDelete: (id: string) => void;
	onExport: () => void;
};

export function ServiceTable({
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
}: ServiceTableProps) {
	const columns = useMemo(() => createServiceColumns({ onEdit, onDelete }), [onDelete, onEdit]);

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
					searchPlaceholder="Поиск по заявке, проекту, исполнителю..."
					onCreate={onCreate}
					createLabel="Создать заявку"
					createPermission={{ subject: "service", action: "create" }}
					onExport={onExport}
					loading={loading}
				/>
			}
			slots={{
				noRowsOverlay: () => (
					<EmptyState title="Заявок нет" description="Создайте первую сервисную заявку" />
				),
			}}
		/>
	);
}
