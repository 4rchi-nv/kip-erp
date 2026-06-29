"use client";

import { StatusChip } from "#/shared/ui";
import type { UserStatus } from "#/types";
import { userStatusColors, userStatusLabels } from "../lib/status";

type UserStatusChipProps = {
	status: UserStatus;
};

export function UserStatusChip({ status }: UserStatusChipProps) {
	return <StatusChip status={userStatusLabels[status]} colorMap={userStatusColors} />;
}
