import { z } from "zod";
import { EMPLOYMENT_STATUSES } from "#/shared/types";

export const employeeSchema = z.object({
	fullName: z.string().min(3, "Укажите ФИО"),
	position: z.string().min(1, "Укажите должность"),
	department: z.string().min(1, "Укажите отдел"),
	employmentStatus: z.enum(EMPLOYMENT_STATUSES),
	hireDate: z.string().min(1, "Укажите дату приёма"),
	phone: z.string().min(10, "Укажите телефон"),
	email: z.string().email("Некорректный email"),
});

export type EmployeeFormValues = z.infer<typeof employeeSchema>;
