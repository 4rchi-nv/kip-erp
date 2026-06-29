import type { UserRole } from "#/types";

export const demoRoleLabels: Record<UserRole, string> = {
	admin: "Администратор",
	director: "Директор",
	accountant: "Бухгалтер",
	hr_manager: "HR-менеджер",
	warehouse_manager: "Заведующий складом",
	project_manager: "Руководитель проекта",
	engineer: "Инженер",
};
