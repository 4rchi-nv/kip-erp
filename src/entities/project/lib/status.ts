import type { ProjectStatus } from "#/types";

export const projectStatusLabels: Record<ProjectStatus, string> = {
	planning: "Планирование",
	in_progress: "В работе",
	on_hold: "Приостановлен",
	completed: "Завершён",
};

export const projectStatusColors: Record<
	ProjectStatus,
	{ color: string; backgroundColor: string }
> = {
	planning: { color: "#69788F", backgroundColor: "#F0F2F8" },
	in_progress: { color: "#1570EF", backgroundColor: "#E8F1FF" },
	on_hold: { color: "#F47A00", backgroundColor: "#FFF0D7" },
	completed: { color: "#12B76A", backgroundColor: "#E9FFF6" },
};
