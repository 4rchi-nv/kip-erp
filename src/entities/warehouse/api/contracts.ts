import type { ListParams, PaginatedResponse } from "#/shared/api";
import type { InventoryItem, InventoryStatus } from "#/types";

export type InventoryItemDto = InventoryItem;

export type ListInventoryParams = ListParams & {
	warehouse?: string;
	category?: string;
	status?: InventoryStatus;
};

export type ListInventoryResponse = PaginatedResponse<InventoryItemDto>;

export interface CreateInventoryItemRequest {
	name: string;
	category: string;
	warehouse: string;
	quantity: number;
	unit: string;
	responsiblePerson: string;
	status: InventoryStatus;
	minQuantity: number;
}

export type UpdateInventoryItemRequest = Partial<CreateInventoryItemRequest>;

export interface InventoryItemResponse {
	data: InventoryItemDto;
}
