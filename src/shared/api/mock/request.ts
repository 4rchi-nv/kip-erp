import { mockDelay } from "#/shared/mock";
import { MockApiError, type MockRequestOptions } from "./types";

export async function withMockRequest<T>(
	handler: () => T | Promise<T>,
	options?: MockRequestOptions,
): Promise<T> {
	await mockDelay(options?.delayMs);

	const shouldFail =
		options?.simulateError === true ||
		(options?.errorRate != null && options.errorRate > 0 && Math.random() < options.errorRate);

	if (shouldFail) {
		throw new MockApiError("Имитация ошибки сервера", "MOCK_SIMULATED_ERROR");
	}

	return handler();
}

export function assertFound<T>(item: T | null | undefined, resource: string): T {
	if (item == null) {
		throw new MockApiError(`${resource} не найден`, "NOT_FOUND");
	}

	return item;
}
