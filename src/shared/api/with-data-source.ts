import { isMockMode } from "#/shared/config";

type DataSourceHandlers<T> = {
	mock: () => T | Promise<T>;
	api: () => T | Promise<T>;
};

export async function withDataSource<T>(handlers: DataSourceHandlers<T>): Promise<T> {
	if (isMockMode()) {
		return handlers.mock();
	}

	return handlers.api();
}
