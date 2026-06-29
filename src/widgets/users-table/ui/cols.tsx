"use client";

import type { GridColDef } from "@mui/x-data-grid";
import { RoleChip, UserStatusChip } from "#/entities/user";
import type { SystemUser } from "#/types";
import { ActionsCell } from "./cells/actions-cell";

type CreateUsersColumnsParams = {
	onEdit: (user: SystemUser) => void;
	onDelete: (id: string) => void;
};

export function createUsersColumns({
	onEdit,
	onDelete,
}: CreateUsersColumnsParams): GridColDef<SystemUser>[] {
	return [
		{ field: "name", headerName: "Имя", flex: 1, minWidth: 160 },
		{ field: "email", headerName: "Email", flex: 1.2, minWidth: 200 },
		{
			field: "role",
			headerName: "Роль",
			flex: 1,
			minWidth: 180,
			renderCell: ({ row }) => <RoleChip role={row.role} />,
		},
		{
			field: "status",
			headerName: "Статус",
			width: 130,
			renderCell: ({ row }) => <UserStatusChip status={row.status} />,
		},
		{
			field: "actions",
			headerName: "Действия",
			width: 110,
			sortable: false,
			filterable: false,
			disableColumnMenu: true,
			renderCell: ({ row }) => <ActionsCell user={row} onEdit={onEdit} onDelete={onDelete} />,
		},
	];
}
