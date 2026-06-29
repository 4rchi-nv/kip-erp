import type { EmploymentStatus } from "#/types";

export const employmentStatusLabels: Record<EmploymentStatus, string> = {
	active: "Работает",
	on_leave: "В отпуске",
	terminated: "Уволен",
};

export const employmentStatusColors: Record<
	EmploymentStatus,
	{ color: string; backgroundColor: string }
> = {
	active: { color: "#12B76A", backgroundColor: "#E9FFF6" },
	on_leave: { color: "#F47A00", backgroundColor: "#FFF0D7" },
	terminated: { color: "#D32F2F", backgroundColor: "#FFEEEE" },
};

export const departments = [
	"Автоматизация",
	"КИПиА",
	"Проекты",
	"Склад",
	"Финансы",
	"Сервис",
	"Отдел кадров",
	"Администрация",
];
