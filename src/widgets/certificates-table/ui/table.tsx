"use client";

import type { GridFilterModel, GridPaginationModel, GridSortModel } from "@mui/x-data-grid";
import { useMemo } from "react";
import { DataGridCard, DataGridToolbar, EmptyState } from "#/shared/ui";
import type { CertificateRecord } from "#/entities/certificate/api/contracts";
import { createCertificatesColumns } from "./cols";

export type CertificatesTableProps = {
	rows: CertificateRecord[];
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
	onEdit: (certificate: CertificateRecord) => void;
	onDelete: (id: string) => void;
	onExport: () => void;
};

export function CertificatesTable({
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
}: CertificatesTableProps) {
	const columns = useMemo(() => createCertificatesColumns({ onEdit, onDelete }), [onDelete, onEdit]);

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
					searchPlaceholder="Поиск по сотруднику, типу..."
					onCreate={onCreate}
					createLabel="Добавить сертификат"
					createPermission={{ subject: "certificate", action: "create" }}
					onExport={onExport}
					loading={loading}
				/>
			}
			slots={{
				noRowsOverlay: () => (
					<EmptyState
						title="Сертификаты не найдены"
						description="Создайте новый сертификат или измените параметры поиска"
					/>
				),
			}}
			sx={{ minHeight: 400 }}
		/>
	);
}
