import type {
	CreateServiceRequestRequest,
	ListServiceRequestsParams,
	ServiceRequestDto,
	UpdateServiceRequestRequest,
} from "#/entities/service/api/contracts";
import { getMockDatabase, mockStore } from "#/shared/mock";
import { applyListQuery, toItemResponse, toListResponse, toVoidResponse } from "./list-utils";
import { assertFound, withMockRequest } from "./request";
import type { MockApiResponse, MockRequestOptions } from "./types";

function filterServiceRequests(params: ListServiceRequestsParams) {
	const { status, priority, type, ...listParams } = params;
	let items = [...getMockDatabase().serviceRequests];

	if (status) {
		items = items.filter((item) => item.status === status);
	}

	if (priority) {
		items = items.filter((item) => item.priority === priority);
	}

	if (type) {
		items = items.filter((item) => item.type === type);
	}

	return applyListQuery(items, listParams, {
		searchFields: ["title", "project", "assignee"],
	});
}

export const mockServiceApi = {
	getList(
		params: ListServiceRequestsParams,
		options?: MockRequestOptions,
	): Promise<MockApiResponse<ServiceRequestDto[]>> {
		return withMockRequest(() => toListResponse(filterServiceRequests(params), params), options);
	},

	getById(id: string, options?: MockRequestOptions): Promise<MockApiResponse<ServiceRequestDto>> {
		return withMockRequest(() => {
			const item = getMockDatabase().serviceRequests.find((entry) => entry.id === id);
			return toItemResponse(assertFound(item, "Сервисная заявка"));
		}, options);
	},

	create(
		payload: CreateServiceRequestRequest,
		options?: MockRequestOptions,
	): Promise<MockApiResponse<ServiceRequestDto>> {
		return withMockRequest(() => toItemResponse(mockStore.createServiceRequest(payload)), options);
	},

	update(
		id: string,
		payload: UpdateServiceRequestRequest,
		options?: MockRequestOptions,
	): Promise<MockApiResponse<ServiceRequestDto>> {
		return withMockRequest(() => {
			const existing = getMockDatabase().serviceRequests.find((entry) => entry.id === id);
			assertFound(existing, "Сервисная заявка");
			return toItemResponse(mockStore.updateServiceRequest(id, payload));
		}, options);
	},

	remove(id: string, options?: MockRequestOptions): Promise<MockApiResponse<null>> {
		return withMockRequest(() => {
			const existing = getMockDatabase().serviceRequests.find((entry) => entry.id === id);
			assertFound(existing, "Сервисная заявка");
			mockStore.deleteServiceRequest(id);
			return toVoidResponse();
		}, options);
	},
};
