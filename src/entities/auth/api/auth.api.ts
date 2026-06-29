import { loadMockApi } from "#/shared/api/load-mock";
import { isMockMode } from "#/shared/config";
import type { CurrentUser } from "#/types";
import { realAuthApi } from "./auth.real-api";
import type { AuthSession, LoginPayload } from "./contracts";

export const authApi = {
	login(payload: LoginPayload): Promise<AuthSession> {
		if (isMockMode()) {
			return loadMockApi().then(({ mockAuthApi }) =>
				mockAuthApi.login(payload).then((response) => response.data),
			);
		}

		return realAuthApi.login(payload);
	},

	logout(): Promise<void> {
		if (isMockMode()) {
			return loadMockApi().then(({ mockAuthApi }) => mockAuthApi.logout().then(() => undefined));
		}

		return realAuthApi.logout();
	},

	getCurrentUser(): Promise<CurrentUser | null> {
		if (isMockMode()) {
			return loadMockApi().then(({ mockAuthApi }) =>
				mockAuthApi.getCurrentUser().then((response) => response.data),
			);
		}

		return realAuthApi.getCurrentUser();
	},
};
