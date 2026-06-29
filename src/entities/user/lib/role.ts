import type { UserRole } from "#/types";

export const roleLabels: Record<UserRole, string> = {
	admin: "Администратор",
	director: "Директор",
	accountant: "Бухгалтер",
	hr_manager: "HR-менеджер",
	warehouse_manager: "Заведующий складом",
	project_manager: "Руководитель проекта",
	engineer: "Инженер",
};

export const roleColors: Record<UserRole, { color: string; backgroundColor: string }> = {
	admin: { color: "#D32F2F", backgroundColor: "#FFEEEE" },
	director: { color: "#2E33F7", backgroundColor: "#E8EDFE" },
	accountant: { color: "#0288D1", backgroundColor: "#E3F2FD" },
	hr_manager: { color: "#7B61FF", backgroundColor: "#F0EDFF" },
	warehouse_manager: { color: "#F47A00", backgroundColor: "#FFF0D7" },
	project_manager: { color: "#1565C0", backgroundColor: "#E3F2FD" },
	engineer: { color: "#12B76A", backgroundColor: "#E9FFF6" },
};

export function getRoleLabel(role: UserRole): string {
	return roleLabels[role];
}
