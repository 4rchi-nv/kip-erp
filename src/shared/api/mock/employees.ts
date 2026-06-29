import type {
	CreateEmployeeRequest,
	EmployeeDto,
	ListEmployeesParams,
	UpdateEmployeeRequest,
} from "#/entities/employee/api/contracts";
import { getMockDatabase, mockStore } from "#/shared/mock";
import { applyListQuery, toItemResponse, toListResponse, toVoidResponse } from "./list-utils";
import { assertFound, withMockRequest } from "./request";
import type { MockApiResponse, MockRequestOptions } from "./types";

function filterEmployees(params: ListEmployeesParams) {
	const { department, employmentStatus, ...listParams } = params;
	let items = [...getMockDatabase().employees];

	if (department) {
		items = items.filter((employee) => employee.department === department);
	}

	if (employmentStatus) {
		items = items.filter((employee) => employee.employmentStatus === employmentStatus);
	}

	return applyListQuery(items, listParams, {
		searchFields: ["fullName", "position", "department", "phone", "email"],
	});
}

export const mockEmployeesApi = {
	getList(
		params: ListEmployeesParams,
		options?: MockRequestOptions,
	): Promise<MockApiResponse<EmployeeDto[]>> {
		return withMockRequest(() => toListResponse(filterEmployees(params), params), options);
	},

	getById(id: string, options?: MockRequestOptions): Promise<MockApiResponse<EmployeeDto>> {
		return withMockRequest(() => {
			const item = getMockDatabase().employees.find((employee) => employee.id === id);
			return toItemResponse(assertFound(item, "Сотрудник"));
		}, options);
	},

	create(
		payload: CreateEmployeeRequest,
		options?: MockRequestOptions,
	): Promise<MockApiResponse<EmployeeDto>> {
		return withMockRequest(
			() =>
				toItemResponse(
					mockStore.createEmployee({
						...payload,
						documents: [],
						vacations: [],
						contracts: [],
					}),
				),
			options,
		);
	},

	update(
		id: string,
		payload: UpdateEmployeeRequest,
		options?: MockRequestOptions,
	): Promise<MockApiResponse<EmployeeDto>> {
		return withMockRequest(() => {
			const existing = getMockDatabase().employees.find((employee) => employee.id === id);
			assertFound(existing, "Сотрудник");
			return toItemResponse(mockStore.updateEmployee(id, payload));
		}, options);
	},

	remove(id: string, options?: MockRequestOptions): Promise<MockApiResponse<null>> {
		return withMockRequest(() => {
			const existing = getMockDatabase().employees.find((employee) => employee.id === id);
			assertFound(existing, "Сотрудник");
			mockStore.deleteEmployee(id);
			return toVoidResponse();
		}, options);
	},
};
