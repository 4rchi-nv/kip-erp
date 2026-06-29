import { apiClient } from "#/shared/api";
import type {
	CreateEquipmentRequest,
	EquipmentDto,
	EquipmentResponse,
	ListEquipmentParams,
	ListEquipmentResponse,
	UpdateEquipmentRequest,
} from "./contracts";

const BASE_PATH = "/equipment";

export const realEquipmentApi = {
	getList(params: ListEquipmentParams): Promise<ListEquipmentResponse> {
		return apiClient.get<ListEquipmentResponse>(BASE_PATH, { params }).then((r) => r.data);
	},

	getById(id: string): Promise<EquipmentDto | null> {
		return apiClient
			.get<EquipmentResponse>(`${BASE_PATH}/${id}`)
			.then((r) => r.data.data)
			.catch(() => null);
	},

	create(payload: CreateEquipmentRequest): Promise<EquipmentDto> {
		return apiClient.post<EquipmentResponse>(BASE_PATH, payload).then((r) => r.data.data);
	},

	update(id: string, payload: UpdateEquipmentRequest): Promise<EquipmentDto> {
		return apiClient
			.patch<EquipmentResponse>(`${BASE_PATH}/${id}`, payload)
			.then((r) => r.data.data);
	},

	remove(id: string): Promise<void> {
		return apiClient.delete(`${BASE_PATH}/${id}`).then(() => undefined);
	},
};
