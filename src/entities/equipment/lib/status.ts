import type { EquipmentStatus } from "#/types";

export const equipmentStatusLabels: Record<EquipmentStatus, string> = {
	operational: "В эксплуатации",
	maintenance: "На ТО",
	repair: "В ремонте",
	decommissioned: "Списано",
};

export const equipmentStatusColors: Record<
	EquipmentStatus,
	{ color: string; backgroundColor: string }
> = {
	operational: { color: "#12B76A", backgroundColor: "#E9FFF6" },
	maintenance: { color: "#1570EF", backgroundColor: "#E8F1FF" },
	repair: { color: "#F47A00", backgroundColor: "#FFF0D7" },
	decommissioned: { color: "#D32F2F", backgroundColor: "#FFEEEE" },
};
