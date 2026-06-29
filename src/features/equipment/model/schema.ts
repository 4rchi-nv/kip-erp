import { z } from "zod";
import { EQUIPMENT_STATUSES } from "#/types";

export const equipmentSchema = z.object({
	name: z.string().min(1, "Укажите наименование"),
	type: z.string().min(1, "Выберите тип"),
	serialNumber: z.string().min(1, "Укажите серийный номер"),
	location: z.string().min(1, "Выберите расположение"),
	responsiblePerson: z.string().min(1, "Укажите ответственного"),
	status: z.enum(EQUIPMENT_STATUSES),
	commissionDate: z.string().min(1, "Укажите дату ввода в эксплуатацию"),
});

export type EquipmentFormValues = z.infer<typeof equipmentSchema>;
