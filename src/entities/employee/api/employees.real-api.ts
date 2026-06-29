import { apiClient } from "#/shared/api";
import type {
	CreateEmployeeRequest,
	EmployeeDto,
	EmployeeResponse,
	ListEmployeesParams,
	ListEmployeesResponse,
	UpdateEmployeeRequest,
} from "./contracts";

const BASE_PATH = "/employees";

export const realEmployeesApi = {
	getList(params: ListEmployeesParams): Promise<ListEmployeesResponse> {
		return apiClient.get<ListEmployeesResponse>(BASE_PATH, { params }).then((r) => r.data);
	},

	getById(id: string): Promise<EmployeeDto | null> {
		return apiClient
			.get<EmployeeResponse>(`${BASE_PATH}/${id}`)
			.then((r) => r.data.data)
			.catch(() => null);
	},

	create(payload: CreateEmployeeRequest): Promise<EmployeeDto> {
		return apiClient.post<EmployeeResponse>(BASE_PATH, payload).then((r) => r.data.data);
	},

	update(id: string, payload: UpdateEmployeeRequest): Promise<EmployeeDto> {
		return apiClient
			.patch<EmployeeResponse>(`${BASE_PATH}/${id}`, payload)
			.then((r) => r.data.data);
	},

	remove(id: string): Promise<void> {
		return apiClient.delete(`${BASE_PATH}/${id}`).then(() => undefined);
	},
};
