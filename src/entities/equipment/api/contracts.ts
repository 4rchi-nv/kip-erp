import type { ListParams, PaginatedResponse } from "#/shared/api";
import type { Equipment, EquipmentStatus } from "#/types";

export type EquipmentDto = Equipment;

export type ListEquipmentParams = ListParams & {
	status?: EquipmentStatus;
	type?: string;
	location?: string;
};

export type ListEquipmentResponse = PaginatedResponse<EquipmentDto>;

export interface CreateEquipmentRequest {
	name: string;
	type: string;
	serialNumber: string;
	location: string;
	responsiblePerson: string;
	status: EquipmentStatus;
	commissionDate: string;
}

export type UpdateEquipmentRequest = Partial<CreateEquipmentRequest>;

export interface EquipmentResponse {
	data: EquipmentDto;
}
