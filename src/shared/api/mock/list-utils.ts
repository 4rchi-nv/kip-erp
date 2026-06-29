import type { ListParams, PaginationMeta } from "../contracts";
import { createPaginationMeta } from "../pagination";
import type { MockApiResponse } from "./types";

type Sortable = object;

export type ListFilterConfig<T extends Sortable> = {
	searchFields?: (keyof T)[];
	fieldFilters?: Partial<
		Record<string, (item: T, value: NonNullable<unknown>) => boolean | undefined>
	>;
};

function compareValues(left: unknown, right: unknown): number {
	if (left == null && right == null) {
		return 0;
	}
	if (left == null) {
		return -1;
	}
	if (right == null) {
		return 1;
	}
	if (typeof left === "number" && typeof right === "number") {
		return left - right;
	}
	return String(left).localeCompare(String(right), "ru");
}

export function applyListQuery<T extends Sortable>(
	items: T[],
	params: ListParams & Record<string, unknown>,
	config?: ListFilterConfig<T>,
): T[] {
	let result = [...items];

	if (params.search?.trim()) {
		const query = params.search.trim().toLowerCase();
		const fields = config?.searchFields ?? (Object.keys(result[0] ?? {}) as (keyof T)[]);

		result = result.filter((item) =>
			fields.some((field) =>
				String((item as Record<string, unknown>)[field as string] ?? "")
					.toLowerCase()
					.includes(query),
			),
		);
	}

	if (config?.fieldFilters) {
		for (const [key, matcher] of Object.entries(config.fieldFilters)) {
			if (!matcher) {
				continue;
			}

			const value = params[key];
			if (value == null || value === "") {
				continue;
			}

			result = result.filter((item) => matcher(item, value) !== false);
		}
	}

	if (params.sortField && params.sortOrder) {
		const { sortField, sortOrder } = params;
		result.sort((left, right) => {
			const comparison = compareValues(
				(left as Record<string, unknown>)[sortField],
				(right as Record<string, unknown>)[sortField],
			);
			return sortOrder === "asc" ? comparison : -comparison;
		});
	}

	return result;
}

export function toListResponse<T>(
	items: T[],
	params: ListParams,
): MockApiResponse<T[]> & { meta: PaginationMeta } {
	const page = params.page ?? 0;
	const pageSize = params.pageSize ?? 10;
	const start = page * pageSize;

	return {
		data: items.slice(start, start + pageSize),
		meta: createPaginationMeta(items.length, params),
	};
}

export function toItemResponse<T>(item: T): MockApiResponse<T> {
	return { data: item };
}

export function toVoidResponse(): MockApiResponse<null> {
	return { data: null };
}
