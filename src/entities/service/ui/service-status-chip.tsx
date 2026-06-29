"use client";

import { StatusChip } from "#/shared/ui";
import type { ServicePriority, ServiceStatus } from "#/types";
import {
	servicePriorityColors,
	servicePriorityLabels,
	serviceStatusColors,
	serviceStatusLabels,
} from "../lib/status";

type ServiceStatusChipProps = {
	status: ServiceStatus;
};

export function ServiceStatusChip({ status }: ServiceStatusChipProps) {
	return <StatusChip status={serviceStatusLabels[status]} colorMap={serviceStatusColors} />;
}

type ServicePriorityChipProps = {
	priority: ServicePriority;
};

export function ServicePriorityChip({ priority }: ServicePriorityChipProps) {
	return <StatusChip status={servicePriorityLabels[priority]} colorMap={servicePriorityColors} />;
}
