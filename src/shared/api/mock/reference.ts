import { getMockDatabase } from "#/shared/mock";
import type { RolePermission } from "#/types";
import { toItemResponse } from "./list-utils";
import { withMockRequest } from "./request";
import type { MockApiResponse, MockRequestOptions } from "./types";

export type FinanceReference = {
	projects: string[];
	responsiblePersons: string[];
};

export type WarehouseReference = {
	warehouses: string[];
	categories: string[];
	responsiblePersons: string[];
};

export const mockReferenceApi = {
	getFinanceReference(options?: MockRequestOptions): Promise<MockApiResponse<FinanceReference>> {
		return withMockRequest(() => {
			const { projects, responsiblePersons } = getMockDatabase().reference;
			return toItemResponse({ projects, responsiblePersons });
		}, options);
	},

	getWarehouseReference(
		options?: MockRequestOptions,
	): Promise<MockApiResponse<WarehouseReference>> {
		return withMockRequest(() => {
			const { warehouses, categories, responsiblePersons } = getMockDatabase().reference;
			return toItemResponse({ warehouses, categories, responsiblePersons });
		}, options);
	},

	getRolePermissions(options?: MockRequestOptions): Promise<MockApiResponse<RolePermission[]>> {
		return withMockRequest(() => ({ data: getMockDatabase().rolePermissions }), options);
	},
};
