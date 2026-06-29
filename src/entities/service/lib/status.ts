import type { ServicePriority, ServiceStatus, ServiceType } from "#/types";

export const serviceStatusLabels: Record<ServiceStatus, string> = {
	new: "Новая",
	in_progress: "В работе",
	completed: "Выполнена",
	cancelled: "Отменена",
};

export const serviceStatusColors: Record<
	ServiceStatus,
	{ color: string; backgroundColor: string }
> = {
	new: { color: "#1570EF", backgroundColor: "#E8F1FF" },
	in_progress: { color: "#F47A00", backgroundColor: "#FFF0D7" },
	completed: { color: "#12B76A", backgroundColor: "#E9FFF6" },
	cancelled: { color: "#69788F", backgroundColor: "#F0F2F8" },
};

export const servicePriorityLabels: Record<ServicePriority, string> = {
	low: "Низкий",
	medium: "Средний",
	high: "Высокий",
	urgent: "Срочный",
};

export const servicePriorityColors: Record<
	ServicePriority,
	{ color: string; backgroundColor: string }
> = {
	low: { color: "#69788F", backgroundColor: "#F0F2F8" },
	medium: { color: "#1570EF", backgroundColor: "#E8F1FF" },
	high: { color: "#F47A00", backgroundColor: "#FFF0D7" },
	urgent: { color: "#D32F2F", backgroundColor: "#FFEEEE" },
};

export const serviceTypeLabels: Record<ServiceType, string> = {
	installation: "Монтаж",
	commissioning: "Пусконаладка",
	maintenance: "Техобслуживание",
	calibration: "Калибровка",
	repair: "Ремонт",
	training: "Обучение",
};
