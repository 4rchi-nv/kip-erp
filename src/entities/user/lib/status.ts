import type { UserStatus } from "#/types";

export const userStatusLabels: Record<UserStatus, string> = {
	active: "Активен",
	inactive: "Неактивен",
};

export const userStatusColors: Record<UserStatus, { color: string; backgroundColor: string }> = {
	active: { color: "#12B76A", backgroundColor: "#E9FFF6" },
	inactive: { color: "#69788F", backgroundColor: "#F0F2F8" },
};
