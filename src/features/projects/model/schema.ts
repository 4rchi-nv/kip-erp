import { z } from "zod";
import { PROJECT_STATUSES } from "#/types";

export const projectSchema = z.object({
	name: z.string().min(1, "Укажите название проекта"),
	client: z.string().min(1, "Укажите заказчика"),
	manager: z.string().min(1, "Выберите руководителя"),
	status: z.enum(PROJECT_STATUSES),
	budget: z.number().min(0, "Бюджет не может быть отрицательным"),
	progress: z.number().min(0, "Минимум 0%").max(100, "Максимум 100%"),
	startDate: z.string().min(1, "Укажите дату начала"),
	endDate: z.string().min(1, "Укажите дату завершения"),
});

export type ProjectFormValues = z.infer<typeof projectSchema>;
