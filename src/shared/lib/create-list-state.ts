import type { GridFilterModel, GridPaginationModel, GridSortModel } from "@mui/x-data-grid";
import { useCallback, useState } from "react";

export const defaultPaginationModel: GridPaginationModel = { page: 0, pageSize: 10 };

export function useGridListState() {
	const [loading, setLoading] = useState(false);
	const [paginationModel, setPaginationModel] =
		useState<GridPaginationModel>(defaultPaginationModel);
	const [sortModel, setSortModel] = useState<GridSortModel>([]);
	const [filterModel, setFilterModel] = useState<GridFilterModel>({ items: [] });
	const [search, setSearch] = useState("");

	const onSearchChange = useCallback((value: string) => {
		setSearch(value);
		setPaginationModel((prev) => ({ ...prev, page: 0 }));
	}, []);

	const onPaginationModelChange = useCallback((model: GridPaginationModel) => {
		setPaginationModel(model);
	}, []);

	const onSortModelChange = useCallback((model: GridSortModel) => {
		setSortModel(model);
	}, []);

	const onFilterModelChange = useCallback((model: GridFilterModel) => {
		setFilterModel(model);
		setPaginationModel((prev) => ({ ...prev, page: 0 }));
	}, []);

	const runWithLoading = useCallback((action: () => void, delayMs = 400) => {
		setLoading(true);
		window.setTimeout(() => {
			action();
			setLoading(false);
		}, delayMs);
	}, []);

	return {
		loading,
		setLoading,
		paginationModel,
		sortModel,
		filterModel,
		search,
		onSearchChange,
		onPaginationModelChange,
		onSortModelChange,
		onFilterModelChange,
		runWithLoading,
	};
}
