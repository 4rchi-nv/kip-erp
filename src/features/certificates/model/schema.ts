import { z } from "zod";
import { CERTIFICATE_LANGUAGES, CERTIFICATE_TYPES } from "#/shared/types";

export const certificateSchema = z.object({
	type: z.enum(CERTIFICATE_TYPES),
	employeeId: z.string().min(1, "Выберите сотрудника"),
	language: z.enum(CERTIFICATE_LANGUAGES),
});

export type CertificateFormValues = z.infer<typeof certificateSchema>;
