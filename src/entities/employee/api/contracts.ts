import type { ListParams, PaginatedResponse } from "#/shared/api";
import type { Employee, EmploymentStatus } from "#/types";

export type EmployeeDto = Employee;

export type ListEmployeesParams = ListParams & {
	department?: string;
	employmentStatus?: EmploymentStatus;
};

export type ListEmployeesResponse = PaginatedResponse<EmployeeDto>;

export interface CreateEmployeeRequest {
	fullName: string;
	position: string;
	department: string;
	employmentStatus: EmploymentStatus;
	hireDate: string;
	phone: string;
	email: string;
}

export type UpdateEmployeeRequest = Partial<CreateEmployeeRequest>;

export interface EmployeeResponse {
	data: EmployeeDto;
}
