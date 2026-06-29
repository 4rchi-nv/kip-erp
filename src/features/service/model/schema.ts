import { z } from "zod";
import { SERVICE_PRIORITIES, SERVICE_STATUSES, SERVICE_TYPES } from "#/types";

export const serviceRequestSchema = z.object({
	title: z.string().min(1, "Укажите название заявки"),
	project: z.string().min(1, "Выберите проект"),
	type: z.enum(SERVICE_TYPES),
	priority: z.enum(SERVICE_PRIORITIES),
	status: z.enum(SERVICE_STATUSES),
	assignee: z.string().min(1, "Выберите исполнителя"),
	requestDate: z.string().min(1, "Укажите дату заявки"),
	dueDate: z.string().min(1, "Укажите срок выполнения"),
});

export type ServiceRequestFormValues = z.infer<typeof serviceRequestSchema>;
