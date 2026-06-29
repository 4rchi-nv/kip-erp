"use client";

import { StatusChip } from "#/shared/ui";
import type { InventoryStatus } from "#/types";
import { inventoryStatusColors, inventoryStatusLabels } from "../lib/status";

type InventoryStatusChipProps = {
	status: InventoryStatus;
};

export function InventoryStatusChip({ status }: InventoryStatusChipProps) {
	return <StatusChip status={inventoryStatusLabels[status]} colorMap={inventoryStatusColors} />;
}
