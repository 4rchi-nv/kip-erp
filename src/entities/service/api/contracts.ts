import type { ListParams, PaginatedResponse } from "#/shared/api";
import type { ServicePriority, ServiceRequest, ServiceStatus, ServiceType } from "#/types";

export type ServiceRequestDto = ServiceRequest;

export type ListServiceRequestsParams = ListParams & {
	status?: ServiceStatus;
	priority?: ServicePriority;
	type?: ServiceType;
};

export type ListServiceRequestsResponse = PaginatedResponse<ServiceRequestDto>;

export interface CreateServiceRequestRequest {
	title: string;
	project: string;
	type: ServiceType;
	priority: ServicePriority;
	status: ServiceStatus;
	assignee: string;
	requestDate: string;
	dueDate: string;
}

export type UpdateServiceRequestRequest = Partial<CreateServiceRequestRequest>;

export interface ServiceRequestResponse {
	data: ServiceRequestDto;
}
