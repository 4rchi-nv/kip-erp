import { apiClient } from "#/shared/api";
import type { CurrentUser } from "#/types";
import type { AuthSession, LoginPayload } from "./contracts";

const BASE_PATH = "/auth";

export const realAuthApi = {
	login(payload: LoginPayload): Promise<AuthSession> {
		return apiClient
			.post<{ data: AuthSession }>(`${BASE_PATH}/login`, payload)
			.then((r) => r.data.data);
	},

	logout(): Promise<void> {
		return apiClient.post(`${BASE_PATH}/logout`).then(() => undefined);
	},

	getCurrentUser(): Promise<CurrentUser | null> {
		return apiClient
			.get<{ data: CurrentUser | null }>(`${BASE_PATH}/me`)
			.then((r) => r.data.data)
			.catch(() => null);
	},
};
