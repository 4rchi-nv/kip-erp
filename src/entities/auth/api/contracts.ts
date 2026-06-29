import type { CurrentUser } from "#/types";

export type AuthSession = {
	user: CurrentUser;
	token: string;
};

export type LoginPayload = {
	login: string;
	password: string;
};
