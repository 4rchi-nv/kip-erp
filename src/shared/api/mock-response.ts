import type { ListParams, PaginatedResponse } from "./contracts";
import type { MockApiResponse } from "./mock/types";

export function toPaginatedResponse<T>(
	response: MockApiResponse<T[]>,
	fallbackMeta?: ListParams,
): PaginatedResponse<T> {
	return {
		data: response.data,
		meta: response.meta ?? {
			total: response.data.length,
			page: fallbackMeta?.page ?? 0,
			pageSize: fallbackMeta?.pageSize ?? response.data.length,
		},
	};
}
