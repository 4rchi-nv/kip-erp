"use client";

import type { GridColDef } from "@mui/x-data-grid";
import { ServicePriorityChip, ServiceStatusChip, serviceTypeLabels } from "#/entities/service";
import { formatDate } from "#/shared/lib";
import type { ServiceRequest } from "#/types";
import { ActionsCell } from "./cells/actions-cell";

type CreateServiceColumnsParams = {
	onEdit: (item: ServiceRequest) => void;
	onDelete: (id: string) => void;
};

export function createServiceColumns({
	onEdit,
	onDelete,
}: CreateServiceColumnsParams): GridColDef<ServiceRequest>[] {
	return [
		{ field: "title", headerName: "Заявка", flex: 1.6, minWidth: 240 },
		{ field: "project", headerName: "Проект", flex: 1.1, minWidth: 180 },
		{
			field: "type",
			headerName: "Тип работ",
			width: 150,
			valueGetter: (_, row) => serviceTypeLabels[row.type],
		},
		{ field: "assignee", headerName: "Исполнитель", flex: 1, minWidth: 150 },
		{
			field: "dueDate",
			headerName: "Срок",
			width: 120,
			renderCell: ({ row }) => formatDate(row.dueDate),
		},
		{
			field: "priority",
			headerName: "Приоритет",
			width: 130,
			type: "singleSelect",
			valueOptions: [
				{ value: "low", label: "Низкий" },
				{ value: "medium", label: "Средний" },
				{ value: "high", label: "Высокий" },
				{ value: "urgent", label: "Срочный" },
			],
			renderCell: ({ row }) => <ServicePriorityChip priority={row.priority} />,
		},
		{
			field: "status",
			headerName: "Статус",
			width: 140,
			type: "singleSelect",
			valueOptions: [
				{ value: "new", label: "Новая" },
				{ value: "in_progress", label: "В работе" },
				{ value: "completed", label: "Выполнена" },
				{ value: "cancelled", label: "Отменена" },
			],
			renderCell: ({ row }) => <ServiceStatusChip status={row.status} />,
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
