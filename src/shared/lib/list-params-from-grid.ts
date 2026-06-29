import type { GridPaginationModel, GridSortModel } from "@mui/x-data-grid";
import type { ListParams, SortOrder } from "#/shared/api";

type GridListState = {
	search: string;
	paginationModel: GridPaginationModel;
	sortModel: GridSortModel;
};

export function listParamsFromGrid(grid: GridListState): ListParams {
	const sort = grid.sortModel[0];

	return {
		page: grid.paginationModel.page,
		pageSize: grid.paginationModel.pageSize,
		search: grid.search.trim() || undefined,
		sortField: sort?.field || undefined,
		sortOrder: (sort?.sort as SortOrder | undefined) || undefined,
	};
}
