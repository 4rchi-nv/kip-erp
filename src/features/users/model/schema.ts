import { z } from "zod";
import { USER_ROLES, USER_STATUSES } from "#/shared/types";

export const userSchema = z.object({
	name: z.string().min(2, "Укажите имя"),
	email: z.string().email("Некорректный email"),
	role: z.enum(USER_ROLES),
	status: z.enum(USER_STATUSES),
});

export type UserFormValues = z.infer<typeof userSchema>;
