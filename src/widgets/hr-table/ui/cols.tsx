"use client";

import type { GridColDef } from "@mui/x-data-grid";
import { EmploymentStatusChip } from "#/entities/employee";
import { formatDate } from "#/shared/lib";
import type { Employee } from "#/types";
import { ActionsCell } from "./cells/actions-cell";

type CreateHrColumnsParams = {
	onView: (employee: Employee) => void;
	onEdit: (employee: Employee) => void;
	onDelete: (id: string) => void;
};

export function createHrColumns({
	onView,
	onEdit,
	onDelete,
}: CreateHrColumnsParams): GridColDef<Employee>[] {
	return [
		{ field: "fullName", headerName: "ФИО", flex: 1.2, minWidth: 180 },
		{ field: "position", headerName: "Должность", flex: 1, minWidth: 160 },
		{ field: "department", headerName: "Отдел", flex: 1, minWidth: 150 },
		{
			field: "employmentStatus",
			headerName: "Статус",
			width: 150,
			renderCell: ({ row }) => <EmploymentStatusChip status={row.employmentStatus} />,
		},
		{
			field: "hireDate",
			headerName: "Дата приёма",
			width: 130,
			valueFormatter: (value) => formatDate(String(value)),
		},
		{ field: "phone", headerName: "Телефон", width: 150 },
		{
			field: "actions",
			headerName: "Действия",
			width: 140,
			sortable: false,
			filterable: false,
			disableColumnMenu: true,
			renderCell: ({ row }) => (
				<ActionsCell employee={row} onView={onView} onEdit={onEdit} onDelete={onDelete} />
			),
		},
	];
}
