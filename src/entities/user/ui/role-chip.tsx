"use client";

import { StatusChip } from "#/shared/ui";
import type { UserRole } from "#/types";
import { getRoleLabel, roleColors } from "../lib/role";

type RoleChipProps = {
	role: UserRole;
};

export function RoleChip({ role }: RoleChipProps) {
	const colorMap = Object.fromEntries(
		(Object.keys(roleColors) as UserRole[]).map((key) => [getRoleLabel(key), roleColors[key]]),
	);

	return <StatusChip status={getRoleLabel(role)} colorMap={colorMap} />;
}
