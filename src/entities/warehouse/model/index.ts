import type { ListInventoryParams } from "../api/contracts";
import { warehouseApi } from "../api/warehouse.api";
import { warehouseQueryKeys } from "./query-keys";

export const warehouseListQuery = {
	queryKey: warehouseQueryKeys.list,
	queryFn: (params: ListInventoryParams) => warehouseApi.getList(params),
};

export {
	useCreateWarehouseItemMutation,
	useDeleteWarehouseItemMutation,
	useMoveWarehouseStockMutation,
	useUpdateWarehouseItemMutation,
	useWarehouseItemQuery,
	useWarehouseListQuery,
	useWarehouseReferenceQuery,
} from "./hooks";
export { warehouseQueryKeys } from "./query-keys";
