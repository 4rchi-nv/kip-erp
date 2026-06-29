"use client";

import { StatusChip } from "#/shared/ui";
import type { EquipmentStatus } from "#/types";
import { equipmentStatusColors, equipmentStatusLabels } from "../lib/status";

type EquipmentStatusChipProps = {
	status: EquipmentStatus;
};

export function EquipmentStatusChip({ status }: EquipmentStatusChipProps) {
	return <StatusChip status={equipmentStatusLabels[status]} colorMap={equipmentStatusColors} />;
}
