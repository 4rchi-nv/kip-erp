import { z } from "zod";

export const reportSchema = z.object({
	title: z.string().min(1, "Укажите название"),
	description: z.string().min(1, "Укажите описание"),
	category: z.string().min(1, "Выберите категорию"),
});

export type ReportFormValues = z.infer<typeof reportSchema>;

export const reportCategories = ["Проекты", "Склад", "Сервис", "Финансы", "HR"] as const;
