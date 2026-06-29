"use client";

import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import { IconButton, Tooltip } from "@mui/material";

type DeleteCellProps = {
	id: string;
	onDelete: (id: string) => void;
};

export function DeleteCell({ id, onDelete }: DeleteCellProps) {
	return (
		<Tooltip title="Удалить">
			<IconButton size="small" color="error" onClick={() => onDelete(id)} aria-label="Удалить">
				<DeleteOutlineRoundedIcon fontSize="small" />
			</IconButton>
		</Tooltip>
	);
}
