import type { GridFilterModel, GridPaginationModel } from "@mui/x-data-grid";
import type { PaginatedResponse } from "#/shared/api";
import { processGridData } from "./process-grid-data";

type ResolveGridRowsParams<T extends object> = {
	data: PaginatedResponse<T> | undefined;
	filterModel: GridFilterModel;
	paginationModel: GridPaginationModel;
	searchFields: (keyof T)[];
};

export function resolveGridRows<T extends object>({
	data,
	filterModel,
	paginationModel,
	searchFields,
}: ResolveGridRowsParams<T>): { rows: T[]; rowCount: number } {
	const items = data?.data ?? [];

	if (filterModel.items.length === 0) {
		return { rows: items, rowCount: data?.meta.total ?? 0 };
	}

	const processed = processGridData({
		items,
		search: "",
		searchFields,
		filterModel,
		sortModel: [],
		paginationModel: { page: 0, pageSize: Math.max(items.length, 1) },
	});

	const start = paginationModel.page * paginationModel.pageSize;
	return {
		rows: processed.rows.slice(start, start + paginationModel.pageSize),
		rowCount: processed.rowCount,
	};
}
