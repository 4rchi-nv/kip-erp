import { z } from "zod";
import { OPERATION_TYPES } from "#/shared/types";

export const operationSchema = z.object({
	date: z.string().min(1, "Укажите дату"),
	type: z.enum(OPERATION_TYPES),
	amount: z.number().min(1, "Сумма должна быть больше 0"),
	project: z.string().min(1, "Выберите проект"),
	responsiblePerson: z.string().min(1, "Укажите ответственного"),
	comment: z.string().min(1, "Добавьте комментарий"),
});

export type OperationFormValues = z.infer<typeof operationSchema>;
