import type { GridFilterModel, GridPaginationModel, GridSortModel } from "@mui/x-data-grid";

export type ProcessGridDataParams<T extends object> = {
	items: T[];
	search: string;
	searchFields: (keyof T)[];
	filterModel: GridFilterModel;
	sortModel: GridSortModel;
	paginationModel: GridPaginationModel;
};

export type ProcessGridDataResult<T> = {
	rows: T[];
	rowCount: number;
};

function compareValues(a: unknown, b: unknown): number {
	if (a == null && b == null) return 0;
	if (a == null) return -1;
	if (b == null) return 1;
	if (typeof a === "number" && typeof b === "number") return a - b;
	return String(a).localeCompare(String(b), "ru");
}

function matchesFilter<T extends object>(row: T, filterModel: GridFilterModel): boolean {
	return filterModel.items.every((item) => {
		if (!item.field || item.value == null || item.value === "") return true;

		const fieldValue = (row as Record<string, unknown>)[item.field];
		const filterValue = String(item.value).toLowerCase();

		if (item.operator === "contains" || item.operator === "equals" || !item.operator) {
			return String(fieldValue).toLowerCase().includes(filterValue);
		}

		return true;
	});
}

export function processGridData<T extends object>({
	items,
	search,
	searchFields,
	filterModel,
	sortModel,
	paginationModel,
}: ProcessGridDataParams<T>): ProcessGridDataResult<T> {
	let result = [...items];

	if (search.trim()) {
		const query = search.trim().toLowerCase();
		result = result.filter((item) =>
			searchFields.some((field) =>
				String(item[field] ?? "")
					.toLowerCase()
					.includes(query),
			),
		);
	}

	if (filterModel.items.length > 0) {
		result = result.filter((item) => matchesFilter(item, filterModel));
	}

	if (sortModel.length > 0) {
		const { field, sort } = sortModel[0];
		if (field && sort) {
			result.sort((left, right) => {
				const comparison = compareValues(
					(left as Record<string, unknown>)[field],
					(right as Record<string, unknown>)[field],
				);
				return sort === "asc" ? comparison : -comparison;
			});
		}
	}

	const rowCount = result.length;
	const start = paginationModel.page * paginationModel.pageSize;
	const rows = result.slice(start, start + paginationModel.pageSize);

	return { rows, rowCount };
}
