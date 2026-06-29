"use client";

import type { GridColDef } from "@mui/x-data-grid";
import { InventoryStatusChip } from "#/entities/warehouse";
import type { InventoryItem } from "#/types";
import { ActionsCell, NameCell } from "./cells/actions-cell";

type CreateWarehouseColumnsParams = {
	onEdit: (item: InventoryItem) => void;
	onDelete: (id: string) => void;
	onStockMovement: (item: InventoryItem) => void;
};

export function createWarehouseColumns({
	onEdit,
	onDelete,
	onStockMovement,
}: CreateWarehouseColumnsParams): GridColDef<InventoryItem>[] {
	return [
		{
			field: "name",
			headerName: "Наименование",
			flex: 1.2,
			minWidth: 200,
			renderCell: ({ row }) => <NameCell item={row} />,
		},
		{ field: "category", headerName: "Категория", flex: 1, minWidth: 140 },
		{ field: "warehouse", headerName: "Склад", flex: 1, minWidth: 140 },
		{
			field: "quantity",
			headerName: "Количество",
			width: 140,
			valueGetter: (_, row) => `${row.quantity} ${row.unit}`,
		},
		{ field: "responsiblePerson", headerName: "Ответственный", flex: 1, minWidth: 160 },
		{
			field: "status",
			headerName: "Статус",
			width: 160,
			type: "singleSelect",
			valueOptions: [
				{ value: "in_stock", label: "В наличии" },
				{ value: "low_stock", label: "Мало на складе" },
				{ value: "out_of_stock", label: "Нет в наличии" },
			],
			renderCell: ({ row }) => <InventoryStatusChip status={row.status} />,
		},
		{
			field: "actions",
			headerName: "Действия",
			width: 140,
			sortable: false,
			filterable: false,
			disableColumnMenu: true,
			renderCell: ({ row }) => (
				<ActionsCell
					item={row}
					onEdit={onEdit}
					onDelete={onDelete}
					onStockMovement={onStockMovement}
				/>
			),
		},
	];
}
