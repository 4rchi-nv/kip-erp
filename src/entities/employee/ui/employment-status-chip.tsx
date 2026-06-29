"use client";

import { StatusChip } from "#/shared/ui";
import type { EmploymentStatus } from "#/types";
import { employmentStatusColors, employmentStatusLabels } from "../lib/status";

type EmploymentStatusChipProps = {
	status: EmploymentStatus;
};

export function EmploymentStatusChip({ status }: EmploymentStatusChipProps) {
	return <StatusChip status={employmentStatusLabels[status]} colorMap={employmentStatusColors} />;
}
