import { isMockMode } from "#/shared/config";
import { mockDemoApi } from "#/shared/api/mock/demo";

export const demoApi = {
	resetDatabase(): Promise<void> {
		if (!isMockMode()) {
			return Promise.reject(new Error("Reset demo data is only available in mock mode"));
		}

		return mockDemoApi.resetDatabase().then(() => undefined);
	},
};
