"use client";

import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Box, IconButton, Tooltip } from "@mui/material";
import { useCan } from "#/shared/lib";
import type { Project } from "#/types";

type ActionsCellProps = {
	item: Project;
	onEdit: (item: Project) => void;
	onDelete: (id: string) => void;
};

export function ActionsCell({ item, onEdit, onDelete }: ActionsCellProps) {
	const { can } = useCan();
	const canUpdate = can("project", "update");
	const canDelete = can("project", "delete");

	if (!canUpdate && !canDelete) {
		return null;
	}

	return (
		<Box sx={{ display: "flex", gap: 0.5 }}>
			{canUpdate && (
				<Tooltip title="Редактировать">
					<IconButton size="small" onClick={() => onEdit(item)} aria-label="Редактировать">
						<EditOutlinedIcon fontSize="small" />
					</IconButton>
				</Tooltip>
			)}
			{canDelete && (
				<Tooltip title="Удалить">
					<IconButton
						size="small"
						color="error"
						onClick={() => onDelete(item.id)}
						aria-label="Удалить"
					>
						<DeleteOutlineRoundedIcon fontSize="small" />
					</IconButton>
				</Tooltip>
			)}
		</Box>
	);
}
