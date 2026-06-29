"use client";

import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import SwapHorizRoundedIcon from "@mui/icons-material/SwapHorizRounded";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import { useCan } from "#/shared/lib";
import type { InventoryItem } from "#/types";

type ActionsCellProps = {
	item: InventoryItem;
	onEdit: (item: InventoryItem) => void;
	onDelete: (id: string) => void;
	onStockMovement: (item: InventoryItem) => void;
};

export function ActionsCell({ item, onEdit, onDelete, onStockMovement }: ActionsCellProps) {
	const { can } = useCan();
	const canUpdate = can("inventory", "update");
	const canDelete = can("inventory", "delete");

	if (!canUpdate && !canDelete) {
		return null;
	}

	return (
		<Box sx={{ display: "flex", gap: 0.5 }}>
			{canUpdate && (
				<Tooltip title="Движение по складу">
					<IconButton size="small" onClick={() => onStockMovement(item)} aria-label="Движение">
						<SwapHorizRoundedIcon fontSize="small" />
					</IconButton>
				</Tooltip>
			)}
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

type NameCellProps = {
	item: InventoryItem;
};

export function NameCell({ item }: NameCellProps) {
	const isWarning = item.status === "low_stock" || item.status === "out_of_stock";

	return (
		<Typography
			variant="body2"
			sx={{
				fontWeight: isWarning ? 600 : 400,
				color: isWarning ? "warning.main" : "text.primary",
			}}
		>
			{item.name}
		</Typography>
	);
}
