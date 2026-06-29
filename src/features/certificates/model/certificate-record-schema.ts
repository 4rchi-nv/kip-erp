import { z } from "zod";
import { CERTIFICATE_LANGUAGES, CERTIFICATE_TYPES } from "#/shared/types";
import { certificateStatusLabels } from "#/entities/certificate";

export const certificateRecordSchema = z.object({
	type: z.enum(CERTIFICATE_TYPES),
	language: z.enum(CERTIFICATE_LANGUAGES),
	employeeId: z.string().min(1, "Выберите сотрудника"),
	employeeName: z.string().min(1, "Укажите сотрудника"),
	issueDate: z.string().min(1, "Укажите дату"),
	status: z.enum(["draft", "issued", "sent"]),
});

export type CertificateRecordFormValues = z.infer<typeof certificateRecordSchema>;

export { certificateStatusLabels };
