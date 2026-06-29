"use client";

import type { GridColDef } from "@mui/x-data-grid";
import type { ReportDefinition } from "#/types";
import { ActionsCell } from "./cells/actions-cell";

type CreateReportsColumnsParams = {
	exportingId: string | null;
	onEdit: (report: ReportDefinition) => void;
	onDelete: (id: string) => void;
	onExport: (reportId: string, reportTitle: string, format: "excel" | "pdf") => void;
};

export function createReportsColumns({
	exportingId,
	onEdit,
	onDelete,
	onExport,
}: CreateReportsColumnsParams): GridColDef<ReportDefinition>[] {
	return [
		{ field: "title", headerName: "Название", flex: 1.2, minWidth: 200 },
		{ field: "description", headerName: "Описание", flex: 1.5, minWidth: 240 },
		{ field: "category", headerName: "Категория", width: 130 },
		{
			field: "actions",
			headerName: "Действия",
			width: 180,
			sortable: false,
			filterable: false,
			disableColumnMenu: true,
			renderCell: ({ row }) => (
				<ActionsCell
					report={row}
					exportingId={exportingId}
					onEdit={onEdit}
					onDelete={onDelete}
					onExport={onExport}
				/>
			),
		},
	];
}
