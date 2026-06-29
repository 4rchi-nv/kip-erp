import type { InventoryStatus } from "#/types";

export const inventoryStatusLabels: Record<InventoryStatus, string> = {
	in_stock: "В наличии",
	low_stock: "Мало на складе",
	out_of_stock: "Нет в наличии",
};

export const inventoryStatusColors: Record<
	InventoryStatus,
	{ color: string; backgroundColor: string }
> = {
	in_stock: { color: "#12B76A", backgroundColor: "#E9FFF6" },
	low_stock: { color: "#F47A00", backgroundColor: "#FFF0D7" },
	out_of_stock: { color: "#D32F2F", backgroundColor: "#FFEEEE" },
};

export function computeInventoryStatus(quantity: number, minQuantity: number): InventoryStatus {
	if (quantity <= 0) return "out_of_stock";
	if (quantity < minQuantity) return "low_stock";
	return "in_stock";
}
