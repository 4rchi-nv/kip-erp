import { apiClient } from "#/shared/api";
import type {
	CreateServiceRequestRequest,
	ListServiceRequestsParams,
	ListServiceRequestsResponse,
	ServiceRequestDto,
	ServiceRequestResponse,
	UpdateServiceRequestRequest,
} from "./contracts";

const BASE_PATH = "/service-requests";

export const realServiceApi = {
	getList(params: ListServiceRequestsParams): Promise<ListServiceRequestsResponse> {
		return apiClient.get<ListServiceRequestsResponse>(BASE_PATH, { params }).then((r) => r.data);
	},

	getById(id: string): Promise<ServiceRequestDto | null> {
		return apiClient
			.get<ServiceRequestResponse>(`${BASE_PATH}/${id}`)
			.then((r) => r.data.data)
			.catch(() => null);
	},

	create(payload: CreateServiceRequestRequest): Promise<ServiceRequestDto> {
		return apiClient.post<ServiceRequestResponse>(BASE_PATH, payload).then((r) => r.data.data);
	},

	update(id: string, payload: UpdateServiceRequestRequest): Promise<ServiceRequestDto> {
		return apiClient
			.patch<ServiceRequestResponse>(`${BASE_PATH}/${id}`, payload)
			.then((r) => r.data.data);
	},

	remove(id: string): Promise<void> {
		return apiClient.delete(`${BASE_PATH}/${id}`).then(() => undefined);
	},
};
