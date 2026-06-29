import { loadMockApi } from "#/shared/api/load-mock";
import { toPaginatedResponse } from "#/shared/api/mock-response";
import { isMockMode } from "#/shared/config";
import type {
	CreateServiceRequestRequest,
	ListServiceRequestsParams,
	ListServiceRequestsResponse,
	ServiceRequestDto,
	UpdateServiceRequestRequest,
} from "./contracts";
import { realServiceApi } from "./service.real-api";

export const serviceApi = {
	getList(params: ListServiceRequestsParams): Promise<ListServiceRequestsResponse> {
		if (isMockMode()) {
			return loadMockApi().then(({ mockServiceApi }) =>
				mockServiceApi.getList(params).then((response) => toPaginatedResponse(response, params)),
			);
		}

		return realServiceApi.getList(params);
	},

	getById(id: string): Promise<ServiceRequestDto | null> {
		if (isMockMode()) {
			return loadMockApi().then(({ mockServiceApi }) =>
				mockServiceApi.getById(id).then((response) => response.data),
			);
		}

		return realServiceApi.getById(id);
	},

	create(payload: CreateServiceRequestRequest): Promise<ServiceRequestDto> {
		if (isMockMode()) {
			return loadMockApi().then(({ mockServiceApi }) =>
				mockServiceApi.create(payload).then((response) => response.data),
			);
		}

		return realServiceApi.create(payload);
	},

	update(id: string, payload: UpdateServiceRequestRequest): Promise<ServiceRequestDto> {
		if (isMockMode()) {
			return loadMockApi().then(({ mockServiceApi }) =>
				mockServiceApi.update(id, payload).then((response) => response.data),
			);
		}

		return realServiceApi.update(id, payload);
	},

	remove(id: string): Promise<void> {
		if (isMockMode()) {
			return loadMockApi().then(({ mockServiceApi }) =>
				mockServiceApi.remove(id).then(() => undefined),
			);
		}

		return realServiceApi.remove(id);
	},
};
