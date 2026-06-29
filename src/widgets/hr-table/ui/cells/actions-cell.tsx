"use client";

import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { Box, IconButton, Tooltip } from "@mui/material";
import { useCan } from "#/shared/lib";
import type { Employee } from "#/types";

type ActionsCellProps = {
	employee: Employee;
	onView: (employee: Employee) => void;
	onEdit: (employee: Employee) => void;
	onDelete: (id: string) => void;
};

export function ActionsCell({ employee, onView, onEdit, onDelete }: ActionsCellProps) {
	const { can } = useCan();
	const canRead = can("employee", "read");
	const canUpdate = can("employee", "update");
	const canDelete = can("employee", "delete");

	return (
		<Box sx={{ display: "flex", gap: 0.5 }}>
			{canRead && (
				<Tooltip title="Просмотр">
					<IconButton size="small" onClick={() => onView(employee)} aria-label="Просмотр">
						<VisibilityOutlinedIcon fontSize="small" />
					</IconButton>
				</Tooltip>
			)}
			{canUpdate && (
				<Tooltip title="Редактировать">
					<IconButton size="small" onClick={() => onEdit(employee)} aria-label="Редактировать">
						<EditOutlinedIcon fontSize="small" />
					</IconButton>
				</Tooltip>
			)}
			{canDelete && (
				<Tooltip title="Удалить">
					<IconButton
						size="small"
						color="error"
						onClick={() => onDelete(employee.id)}
						aria-label="Удалить"
					>
						<DeleteOutlineRoundedIcon fontSize="small" />
					</IconButton>
				</Tooltip>
			)}
		</Box>
	);
}
