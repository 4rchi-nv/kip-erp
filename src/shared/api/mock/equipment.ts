import type {
	CreateEquipmentRequest,
	EquipmentDto,
	ListEquipmentParams,
	UpdateEquipmentRequest,
} from "#/entities/equipment/api/contracts";
import { getMockDatabase, mockStore } from "#/shared/mock";
import { applyListQuery, toItemResponse, toListResponse, toVoidResponse } from "./list-utils";
import { assertFound, withMockRequest } from "./request";
import type { MockApiResponse, MockRequestOptions } from "./types";

function filterEquipment(params: ListEquipmentParams) {
	const { status, type, location, ...listParams } = params;
	let items = [...getMockDatabase().equipment];

	if (status) {
		items = items.filter((item) => item.status === status);
	}

	if (type) {
		items = items.filter((item) => item.type === type);
	}

	if (location) {
		items = items.filter((item) => item.location === location);
	}

	return applyListQuery(items, listParams, {
		searchFields: ["name", "type", "serialNumber", "location", "responsiblePerson"],
	});
}

export const mockEquipmentApi = {
	getList(
		params: ListEquipmentParams,
		options?: MockRequestOptions,
	): Promise<MockApiResponse<EquipmentDto[]>> {
		return withMockRequest(() => toListResponse(filterEquipment(params), params), options);
	},

	getById(id: string, options?: MockRequestOptions): Promise<MockApiResponse<EquipmentDto>> {
		return withMockRequest(() => {
			const item = getMockDatabase().equipment.find((entry) => entry.id === id);
			return toItemResponse(assertFound(item, "Оборудование"));
		}, options);
	},

	create(
		payload: CreateEquipmentRequest,
		options?: MockRequestOptions,
	): Promise<MockApiResponse<EquipmentDto>> {
		return withMockRequest(() => toItemResponse(mockStore.createEquipment(payload)), options);
	},

	update(
		id: string,
		payload: UpdateEquipmentRequest,
		options?: MockRequestOptions,
	): Promise<MockApiResponse<EquipmentDto>> {
		return withMockRequest(() => {
			const existing = getMockDatabase().equipment.find((entry) => entry.id === id);
			assertFound(existing, "Оборудование");
			return toItemResponse(mockStore.updateEquipment(id, payload));
		}, options);
	},

	remove(id: string, options?: MockRequestOptions): Promise<MockApiResponse<null>> {
		return withMockRequest(() => {
			const existing = getMockDatabase().equipment.find((entry) => entry.id === id);
			assertFound(existing, "Оборудование");
			mockStore.deleteEquipment(id);
			return toVoidResponse();
		}, options);
	},
};
