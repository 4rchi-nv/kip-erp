import { loadMockApi } from "#/shared/api/load-mock";
import { toPaginatedResponse } from "#/shared/api/mock-response";
import { isMockMode } from "#/shared/config";
import type {
	CreateEquipmentRequest,
	EquipmentDto,
	ListEquipmentParams,
	ListEquipmentResponse,
	UpdateEquipmentRequest,
} from "./contracts";
import { realEquipmentApi } from "./equipment.real-api";

export const equipmentApi = {
	getList(params: ListEquipmentParams): Promise<ListEquipmentResponse> {
		if (isMockMode()) {
			return loadMockApi().then(({ mockEquipmentApi }) =>
				mockEquipmentApi.getList(params).then((response) => toPaginatedResponse(response, params)),
			);
		}

		return realEquipmentApi.getList(params);
	},

	getById(id: string): Promise<EquipmentDto | null> {
		if (isMockMode()) {
			return loadMockApi().then(({ mockEquipmentApi }) =>
				mockEquipmentApi.getById(id).then((response) => response.data),
			);
		}

		return realEquipmentApi.getById(id);
	},

	create(payload: CreateEquipmentRequest): Promise<EquipmentDto> {
		if (isMockMode()) {
			return loadMockApi().then(({ mockEquipmentApi }) =>
				mockEquipmentApi.create(payload).then((response) => response.data),
			);
		}

		return realEquipmentApi.create(payload);
	},

	update(id: string, payload: UpdateEquipmentRequest): Promise<EquipmentDto> {
		if (isMockMode()) {
			return loadMockApi().then(({ mockEquipmentApi }) =>
				mockEquipmentApi.update(id, payload).then((response) => response.data),
			);
		}

		return realEquipmentApi.update(id, payload);
	},

	remove(id: string): Promise<void> {
		if (isMockMode()) {
			return loadMockApi().then(({ mockEquipmentApi }) =>
				mockEquipmentApi.remove(id).then(() => undefined),
			);
		}

		return realEquipmentApi.remove(id);
	},
};
