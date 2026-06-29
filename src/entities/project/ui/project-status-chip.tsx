"use client";

import { StatusChip } from "#/shared/ui";
import type { ProjectStatus } from "#/types";
import { projectStatusColors, projectStatusLabels } from "../lib/status";

type ProjectStatusChipProps = {
	status: ProjectStatus;
};

export function ProjectStatusChip({ status }: ProjectStatusChipProps) {
	return <StatusChip status={projectStatusLabels[status]} colorMap={projectStatusColors} />;
}
