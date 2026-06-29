import { KIP_ERP_STORAGE_KEYS } from "#/shared/config";

export const MOCK_DATABASE_STORAGE_KEY = KIP_ERP_STORAGE_KEYS.mockDatabase;

export function createMockId(prefix: string): string {
	return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export function mockDelay(ms?: number): Promise<void> {
	const delay = ms ?? 300 + Math.floor(Math.random() * 401);
	return new Promise((resolve) => {
		setTimeout(resolve, delay);
	});
}
