import type { ListParams, PaginatedResponse, PaginationMeta } from "./contracts";

export function createPaginationMeta(
	total: number,
	params: Pick<ListParams, "page" | "pageSize">,
): PaginationMeta {
	const page = params.page ?? 0;
	const pageSize = params.pageSize ?? 10;

	return { total, page, pageSize };
}

export function paginateList<T>(
	items: T[],
	params: Pick<ListParams, "page" | "pageSize">,
): PaginatedResponse<T> {
	const page = params.page ?? 0;
	const pageSize = params.pageSize ?? 10;
	const start = page * pageSize;

	return {
		data: items.slice(start, start + pageSize),
		meta: createPaginationMeta(items.length, params),
	};
}
