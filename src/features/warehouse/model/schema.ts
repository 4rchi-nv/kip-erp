import { z } from "zod";

export const inventoryItemSchema = z.object({
	name: z.string().min(1, "Укажите наименование"),
	category: z.string().min(1, "Выберите категорию"),
	warehouse: z.string().min(1, "Выберите склад"),
	quantity: z.number().min(0, "Количество не может быть отрицательным"),
	unit: z.string().min(1, "Укажите единицу измерения"),
	responsiblePerson: z.string().min(1, "Укажите ответственного"),
	minQuantity: z.number().min(0),
});

export type InventoryItemFormValues = z.infer<typeof inventoryItemSchema>;
