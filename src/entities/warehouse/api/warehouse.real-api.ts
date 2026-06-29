import { apiClient } from "#/shared/api";
import type {
	CreateInventoryItemRequest,
	InventoryItemDto,
	InventoryItemResponse,
	ListInventoryParams,
	ListInventoryResponse,
	UpdateInventoryItemRequest,
} from "./contracts";

const BASE_PATH = "/inventory";

export const realWarehouseApi = {
	getList(params: ListInventoryParams): Promise<ListInventoryResponse> {
		return apiClient.get<ListInventoryResponse>(BASE_PATH, { params }).then((r) => r.data);
	},

	getById(id: string): Promise<InventoryItemDto | null> {
		return apiClient
			.get<InventoryItemResponse>(`${BASE_PATH}/${id}`)
			.then((r) => r.data.data)
			.catch(() => null);
	},

	create(payload: CreateInventoryItemRequest): Promise<InventoryItemDto> {
		return apiClient.post<InventoryItemResponse>(BASE_PATH, payload).then((r) => r.data.data);
	},

	update(id: string, payload: UpdateInventoryItemRequest): Promise<InventoryItemDto> {
		return apiClient
			.patch<InventoryItemResponse>(`${BASE_PATH}/${id}`, payload)
			.then((r) => r.data.data);
	},

	remove(id: string): Promise<void> {
		return apiClient.delete(`${BASE_PATH}/${id}`).then(() => undefined);
	},

	moveStock(id: string, delta: number): Promise<InventoryItemDto> {
		return apiClient
			.post<InventoryItemResponse>(`${BASE_PATH}/${id}/move`, { delta })
			.then((r) => r.data.data);
	},

	getReference() {
		return apiClient
			.get<{
				data: { warehouses: string[]; categories: string[]; responsiblePersons: string[] };
			}>(`${BASE_PATH}/reference`)
			.then((r) => r.data.data);
	},
};
