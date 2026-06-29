"use client";

import type { GridColDef } from "@mui/x-data-grid";
import type { CertificateRecord } from "#/entities/certificate/api/contracts";
import {
	CertificateStatusChip,
	certificateLanguageLabels,
	certificateTypeLabels,
} from "#/entities/certificate";
import { formatDate } from "#/shared/lib";
import { ActionsCell } from "./cells/actions-cell";

type CreateCertificatesColumnsParams = {
	onEdit: (certificate: CertificateRecord) => void;
	onDelete: (id: string) => void;
};

export function createCertificatesColumns({
	onEdit,
	onDelete,
}: CreateCertificatesColumnsParams): GridColDef<CertificateRecord>[] {
	return [
		{
			field: "type",
			headerName: "Тип",
			flex: 1,
			minWidth: 180,
			valueFormatter: (value) => certificateTypeLabels[value as CertificateRecord["type"]],
		},
		{
			field: "language",
			headerName: "Язык",
			width: 110,
			valueFormatter: (value) => certificateLanguageLabels[value as CertificateRecord["language"]],
		},
		{ field: "employeeName", headerName: "Сотрудник", flex: 1.2, minWidth: 200 },
		{
			field: "issueDate",
			headerName: "Дата",
			width: 120,
			valueFormatter: (value) => formatDate(String(value)),
		},
		{
			field: "status",
			headerName: "Статус",
			width: 140,
			renderCell: ({ row }) => <CertificateStatusChip status={row.status} />,
		},
		{
			field: "actions",
			headerName: "Действия",
			width: 110,
			sortable: false,
			filterable: false,
			disableColumnMenu: true,
			renderCell: ({ row }) => (
				<ActionsCell certificate={row} onEdit={onEdit} onDelete={onDelete} />
			),
		},
	];
}
