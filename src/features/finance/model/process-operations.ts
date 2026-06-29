import type { GridFilterModel, GridPaginationModel, GridSortModel } from "@mui/x-data-grid";
import { processGridData } from "#/shared/lib";
import type { CashOperation } from "#/types";

type ProcessOperationsParams = {
	operations: CashOperation[];
	search: string;
	filterModel: GridFilterModel;
	sortModel: GridSortModel;
	paginationModel: GridPaginationModel;
};

export function processOperations(params: ProcessOperationsParams) {
	return processGridData({
		items: params.operations,
		search: params.search,
		searchFields: ["project", "comment", "responsiblePerson"],
		filterModel: params.filterModel,
		sortModel: params.sortModel,
		paginationModel: params.paginationModel,
	});
}
