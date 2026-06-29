"use client";

import type { GridColDef } from "@mui/x-data-grid";
import { EquipmentStatusChip } from "#/entities/equipment";
import { formatDate } from "#/shared/lib";
import type { Equipment } from "#/types";
import { ActionsCell } from "./cells/actions-cell";

type CreateEquipmentColumnsParams = {
	onEdit: (item: Equipment) => void;
	onDelete: (id: string) => void;
};

export function createEquipmentColumns({
	onEdit,
	onDelete,
}: CreateEquipmentColumnsParams): GridColDef<Equipment>[] {
	return [
		{ field: "name", headerName: "Наименование", flex: 1.4, minWidth: 220 },
		{ field: "type", headerName: "Тип", flex: 1, minWidth: 150 },
		{ field: "serialNumber", headerName: "Серийный номер", flex: 1, minWidth: 160 },
		{ field: "location", headerName: "Расположение", flex: 1, minWidth: 160 },
		{ field: "responsiblePerson", headerName: "Ответственный", flex: 1, minWidth: 160 },
		{
			field: "commissionDate",
			headerName: "Ввод в эксплуатацию",
			width: 170,
			renderCell: ({ row }) => formatDate(row.commissionDate),
		},
		{
			field: "status",
			headerName: "Статус",
			width: 160,
			type: "singleSelect",
			valueOptions: [
				{ value: "operational", label: "В эксплуатации" },
				{ value: "maintenance", label: "На ТО" },
				{ value: "repair", label: "В ремонте" },
				{ value: "decommissioned", label: "Списано" },
			],
			renderCell: ({ row }) => <EquipmentStatusChip status={row.status} />,
		},
		{
			field: "actions",
			headerName: "Действия",
			width: 120,
			sortable: false,
			filterable: false,
			disableColumnMenu: true,
			renderCell: ({ row }) => <ActionsCell item={row} onEdit={onEdit} onDelete={onDelete} />,
		},
	];
}
