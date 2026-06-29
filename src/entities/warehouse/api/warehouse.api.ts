import { loadMockApi } from "#/shared/api/load-mock";
import { toPaginatedResponse } from "#/shared/api/mock-response";
import { isMockMode } from "#/shared/config";
import type {
	CreateInventoryItemRequest,
	InventoryItemDto,
	ListInventoryParams,
	ListInventoryResponse,
	UpdateInventoryItemRequest,
} from "./contracts";
import { realWarehouseApi } from "./warehouse.real-api";

export const warehouseApi = {
	getList(params: ListInventoryParams): Promise<ListInventoryResponse> {
		if (isMockMode()) {
			return loadMockApi().then(({ mockWarehouseApi }) =>
				mockWarehouseApi
					.getList(params)
					.then((response) => toPaginatedResponse(response, params)),
			);
		}

		return realWarehouseApi.getList(params);
	},

	getById(id: string): Promise<InventoryItemDto | null> {
		if (isMockMode()) {
			return loadMockApi().then(({ mockWarehouseApi }) =>
				mockWarehouseApi.getById(id).then((response) => response.data),
			);
		}

		return realWarehouseApi.getById(id);
	},

	create(payload: CreateInventoryItemRequest): Promise<InventoryItemDto> {
		if (isMockMode()) {
			return loadMockApi().then(({ mockWarehouseApi }) =>
				mockWarehouseApi.create(payload).then((response) => response.data),
			);
		}

		return realWarehouseApi.create(payload);
	},

	update(id: string, payload: UpdateInventoryItemRequest): Promise<InventoryItemDto> {
		if (isMockMode()) {
			return loadMockApi().then(({ mockWarehouseApi }) =>
				mockWarehouseApi.update(id, payload).then((response) => response.data),
			);
		}

		return realWarehouseApi.update(id, payload);
	},

	remove(id: string): Promise<void> {
		if (isMockMode()) {
			return loadMockApi().then(({ mockWarehouseApi }) =>
				mockWarehouseApi.remove(id).then(() => undefined),
			);
		}

		return realWarehouseApi.remove(id);
	},

	moveStock(id: string, delta: number): Promise<InventoryItemDto> {
		if (isMockMode()) {
			return loadMockApi().then(({ mockWarehouseApi }) =>
				mockWarehouseApi.moveStock(id, delta).then((response) => response.data),
			);
		}

		return realWarehouseApi.moveStock(id, delta);
	},

	getReference() {
		if (isMockMode()) {
			return loadMockApi().then(({ mockReferenceApi }) =>
				mockReferenceApi.getWarehouseReference().then((response) => response.data),
			);
		}

		return realWarehouseApi.getReference();
	},
};
