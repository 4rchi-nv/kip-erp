import { loadMockApi } from "#/shared/api/load-mock";
import { toPaginatedResponse } from "#/shared/api/mock-response";
import { isMockMode } from "#/shared/config";
import type {
	CreateEmployeeRequest,
	EmployeeDto,
	ListEmployeesParams,
	ListEmployeesResponse,
	UpdateEmployeeRequest,
} from "./contracts";
import { realEmployeesApi } from "./employees.real-api";

export const employeesApi = {
	getList(params: ListEmployeesParams): Promise<ListEmployeesResponse> {
		if (isMockMode()) {
			return loadMockApi().then(({ mockEmployeesApi }) =>
				mockEmployeesApi
					.getList(params)
					.then((response) => toPaginatedResponse(response, params)),
			);
		}

		return realEmployeesApi.getList(params);
	},

	getById(id: string): Promise<EmployeeDto | null> {
		if (isMockMode()) {
			return loadMockApi().then(({ mockEmployeesApi }) =>
				mockEmployeesApi.getById(id).then((response) => response.data),
			);
		}

		return realEmployeesApi.getById(id);
	},

	create(payload: CreateEmployeeRequest): Promise<EmployeeDto> {
		if (isMockMode()) {
			return loadMockApi().then(({ mockEmployeesApi }) =>
				mockEmployeesApi.create(payload).then((response) => response.data),
			);
		}

		return realEmployeesApi.create(payload);
	},

	update(id: string, payload: UpdateEmployeeRequest): Promise<EmployeeDto> {
		if (isMockMode()) {
			return loadMockApi().then(({ mockEmployeesApi }) =>
				mockEmployeesApi.update(id, payload).then((response) => response.data),
			);
		}

		return realEmployeesApi.update(id, payload);
	},

	remove(id: string): Promise<void> {
		if (isMockMode()) {
			return loadMockApi().then(({ mockEmployeesApi }) =>
				mockEmployeesApi.remove(id).then(() => undefined),
			);
		}

		return realEmployeesApi.remove(id);
	},
};

/** @deprecated Use `employeesApi` */
export const employeeApi = employeesApi;
