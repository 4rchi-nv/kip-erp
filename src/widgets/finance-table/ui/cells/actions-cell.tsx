"use client";

import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Box, IconButton, Tooltip } from "@mui/material";
import { useCan } from "#/shared/lib";
import type { CashOperation } from "#/types";

type ActionsCellProps = {
	operation: CashOperation;
	onEdit: (operation: CashOperation) => void;
	onDelete: (id: string) => void;
};

export function ActionsCell({ operation, onEdit, onDelete }: ActionsCellProps) {
	const { can } = useCan();
	const canEdit = can("transaction", "update");
	const canDelete = can("transaction", "delete");

	if (!canEdit && !canDelete) {
		return null;
	}

	return (
		<Box sx={{ display: "flex", gap: 0.5 }}>
			{canEdit && (
				<Tooltip title="Редактировать">
					<IconButton size="small" onClick={() => onEdit(operation)} aria-label="Редактировать">
						<EditOutlinedIcon fontSize="small" />
					</IconButton>
				</Tooltip>
			)}
			{canDelete && (
				<Tooltip title="Удалить">
					<IconButton
						size="small"
						color="error"
						onClick={() => onDelete(operation.id)}
						aria-label="Удалить"
					>
						<DeleteOutlineRoundedIcon fontSize="small" />
					</IconButton>
				</Tooltip>
			)}
		</Box>
	);
}
