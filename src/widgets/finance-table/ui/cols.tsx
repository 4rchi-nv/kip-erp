"use client";

import type { GridColDef } from "@mui/x-data-grid";
import { formatDate } from "#/shared/lib";
import type { CashOperation } from "#/types";
import { ActionsCell, AmountCell, OperationTypeCell } from "./cells";

type CreateFinanceColumnsParams = {
	onEdit: (operation: CashOperation) => void;
	onDelete: (id: string) => void;
};

export function createFinanceColumns({
	onEdit,
	onDelete,
}: CreateFinanceColumnsParams): GridColDef<CashOperation>[] {
	return [
		{
			field: "date",
			headerName: "Дата",
			width: 120,
			valueFormatter: (value) => formatDate(String(value)),
		},
		{
			field: "type",
			headerName: "Тип",
			width: 150,
			type: "singleSelect",
			valueOptions: [
				{ value: "income", label: "Поступление" },
				{ value: "expense", label: "Расход" },
			],
			renderCell: ({ row }) => <OperationTypeCell type={row.type} />,
		},
		{
			field: "amount",
			headerName: "Сумма",
			width: 150,
			type: "number",
			align: "right",
			headerAlign: "right",
			renderCell: ({ row }) => <AmountCell amount={row.amount} type={row.type} />,
		},
		{
			field: "project",
			headerName: "Проект",
			flex: 1,
			minWidth: 180,
		},
		{
			field: "responsiblePerson",
			headerName: "Ответственный",
			flex: 1,
			minWidth: 160,
		},
		{
			field: "comment",
			headerName: "Комментарий",
			flex: 1.2,
			minWidth: 220,
		},
		{
			field: "actions",
			headerName: "Действия",
			width: 110,
			sortable: false,
			filterable: false,
			disableColumnMenu: true,
			renderCell: ({ row }) => <ActionsCell operation={row} onEdit={onEdit} onDelete={onDelete} />,
		},
	];
}
