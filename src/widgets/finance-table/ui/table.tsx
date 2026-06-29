"use client";

import type { GridFilterModel, GridPaginationModel, GridSortModel } from "@mui/x-data-grid";
import { useMemo } from "react";
import { DataGridCard, DataGridToolbar, EmptyState } from "#/shared/ui";
import type { CashOperation } from "#/types";
import { createFinanceColumns } from "./cols";

export type FinanceTableProps = {
	rows: CashOperation[];
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
	onEdit: (operation: CashOperation) => void;
	onDelete: (id: string) => void;
	onExport: () => void;
};

export function FinanceTable({
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
}: FinanceTableProps) {
	const columns = useMemo(() => createFinanceColumns({ onEdit, onDelete }), [onDelete, onEdit]);

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
					searchPlaceholder="Поиск по проекту, комментарию, ответственному..."
					onCreate={onCreate}
					createLabel="Добавить операцию"
					createPermission={{ subject: "transaction", action: "create" }}
					onExport={onExport}
					loading={loading}
				/>
			}
			slots={{
				noRowsOverlay: () => (
					<EmptyState
						title="Операции не найдены"
						description="Измените фильтры или добавьте новую кассовую операцию"
					/>
				),
			}}
			sx={{ minHeight: 480 }}
		/>
	);
}
