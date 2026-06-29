import type {
	CreateInventoryItemRequest,
	InventoryItemDto,
	ListInventoryParams,
	UpdateInventoryItemRequest,
} from "#/entities/warehouse/api/contracts";
import { getMockDatabase, mockStore } from "#/shared/mock";
import { applyListQuery, toItemResponse, toListResponse, toVoidResponse } from "./list-utils";
import { assertFound, withMockRequest } from "./request";
import type { MockApiResponse, MockRequestOptions } from "./types";

function filterInventory(params: ListInventoryParams) {
	const { warehouse, category, status, ...listParams } = params;
	let items = [...getMockDatabase().inventory];

	if (warehouse) {
		items = items.filter((item) => item.warehouse === warehouse);
	}

	if (category) {
		items = items.filter((item) => item.category === category);
	}

	if (status) {
		items = items.filter((item) => item.status === status);
	}

	return applyListQuery(items, listParams, {
		searchFields: ["name", "category", "warehouse", "responsiblePerson"],
	});
}

export const mockWarehouseApi = {
	getList(
		params: ListInventoryParams,
		options?: MockRequestOptions,
	): Promise<MockApiResponse<InventoryItemDto[]>> {
		return withMockRequest(() => toListResponse(filterInventory(params), params), options);
	},

	getById(id: string, options?: MockRequestOptions): Promise<MockApiResponse<InventoryItemDto>> {
		return withMockRequest(() => {
			const item = getMockDatabase().inventory.find((entry) => entry.id === id);
			return toItemResponse(assertFound(item, "Складская позиция"));
		}, options);
	},

	create(
		payload: CreateInventoryItemRequest,
		options?: MockRequestOptions,
	): Promise<MockApiResponse<InventoryItemDto>> {
		return withMockRequest(() => {
			const { status: _status, ...rest } = payload;
			return toItemResponse(mockStore.createInventoryItem(rest));
		}, options);
	},

	update(
		id: string,
		payload: UpdateInventoryItemRequest,
		options?: MockRequestOptions,
	): Promise<MockApiResponse<InventoryItemDto>> {
		return withMockRequest(() => {
			const existing = getMockDatabase().inventory.find((entry) => entry.id === id);
			assertFound(existing, "Складская позиция");

			const { status: _ignored, ...rest } = payload;
			return toItemResponse(mockStore.updateInventoryItem(id, rest));
		}, options);
	},

	remove(id: string, options?: MockRequestOptions): Promise<MockApiResponse<null>> {
		return withMockRequest(() => {
			const existing = getMockDatabase().inventory.find((entry) => entry.id === id);
			assertFound(existing, "Складская позиция");
			mockStore.deleteInventoryItem(id);
			return toVoidResponse();
		}, options);
	},

	moveStock(
		id: string,
		delta: number,
		options?: MockRequestOptions,
	): Promise<MockApiResponse<InventoryItemDto>> {
		return withMockRequest(() => {
			const updated = mockStore.moveInventoryStock(id, delta);
			return toItemResponse(assertFound(updated, "Складская позиция"));
		}, options);
	},
};
