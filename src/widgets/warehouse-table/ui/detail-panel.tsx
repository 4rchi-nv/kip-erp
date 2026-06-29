"use client";

import { Box, Typography } from "@mui/material";
import { InventoryStatusChip } from "#/entities/warehouse";
import type { InventoryItem } from "#/types";

type WarehouseDetailPanelProps = {
	row: InventoryItem;
};

export function WarehouseDetailPanel({ row }: WarehouseDetailPanelProps) {
	return (
		<Box sx={{ px: 3, py: 2, backgroundColor: "background.default" }}>
			<Typography variant="buttonXs" color="text.secondary" sx={{ mb: 1.5, display: "block" }}>
				Детали позиции
			</Typography>
			<Box sx={{ display: "grid", gap: 1, gridTemplateColumns: { xs: "1fr", sm: "140px 1fr" } }}>
				<DetailLabel label="Статус" />
				<InventoryStatusChip status={row.status} />
				<DetailLabel label="Категория" />
				<Typography variant="body2">{row.category}</Typography>
				<DetailLabel label="Склад" />
				<Typography variant="body2">{row.warehouse}</Typography>
				<DetailLabel label="Мин. остаток" />
				<Typography variant="body2">
					{row.minQuantity} {row.unit}
				</Typography>
			</Box>
		</Box>
	);
}

function DetailLabel({ label }: { label: string }) {
	return (
		<Typography variant="body2" color="text.secondary">
			{label}
		</Typography>
	);
}
