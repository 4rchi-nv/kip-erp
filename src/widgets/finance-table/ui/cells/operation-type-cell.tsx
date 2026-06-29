"use client";

import type { StatusChipColor } from "#/shared/ui";
import { StatusChip } from "#/shared/ui";
import type { OperationType } from "#/types";

const typeLabels: Record<OperationType, string> = {
	income: "Поступление",
	expense: "Расход",
};

const typeColorMap: Record<OperationType, StatusChipColor> = {
	income: { color: "#12B76A", backgroundColor: "#E9FFF6" },
	expense: { color: "#D32F2F", backgroundColor: "#FFEEEE" },
};

type OperationTypeCellProps = {
	type: OperationType;
};

export function OperationTypeCell({ type }: OperationTypeCellProps) {
	return <StatusChip status={typeLabels[type]} colorMap={typeColorMap} />;
}
