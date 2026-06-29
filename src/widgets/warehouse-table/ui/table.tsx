"use client";

import type { GridFilterModel, GridPaginationModel, GridSortModel } from "@mui/x-data-grid";
import { useMemo } from "react";
import { themeTokens } from "#/shared/theme";
import { DataGridCard, DataGridToolbar, EmptyState } from "#/shared/ui";
import type { InventoryItem } from "#/types";
import { createWarehouseColumns } from "./cols";

export type WarehouseTableProps = {
	rows: InventoryItem[];
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
	onEdit: (item: InventoryItem) => void;
	onDelete: (id: string) => void;
	onStockMovement: (item: InventoryItem) => void;
	onExport: () => void;
};

export function WarehouseTable({
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
	onStockMovement,
	onExport,
}: WarehouseTableProps) {
	const columns = useMemo(
		() => createWarehouseColumns({ onEdit, onDelete, onStockMovement }),
		[onDelete, onEdit, onStockMovement],
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
			getRowClassName={(params) =>
				params.row.status === "low_stock" || params.row.status === "out_of_stock"
					? "warehouse-row-warning"
					: ""
			}
			sx={{
				minHeight: 480,
				"& .warehouse-row-warning": { backgroundColor: themeTokens.hoverBg },
			}}
			header={
				<DataGridToolbar
					search={search}
					onSearchChange={onSearchChange}
					searchPlaceholder="Поиск по наименованию, категории, складу..."
					onCreate={onCreate}
					createLabel="Добавить позицию"
					createPermission={{ subject: "inventory", action: "create" }}
					onExport={onExport}
					loading={loading}
				/>
			}
			slots={{
				noRowsOverlay: () => (
					<EmptyState title="Склад пуст" description="Добавьте первую позицию на склад" />
				),
			}}
		/>
	);
}
