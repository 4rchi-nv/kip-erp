export type SortOrder = "asc" | "desc";

export interface ListParams {
	page?: number;
	pageSize?: number;
	search?: string;
	sortField?: string;
	sortOrder?: SortOrder;
}

export interface PaginationMeta {
	total: number;
	page: number;
	pageSize: number;
}

export interface PaginatedResponse<T> {
	data: T[];
	meta: PaginationMeta;
}

export interface ApiErrorBody {
	message: string;
	code?: string;
	details?: Record<string, string[]>;
}

export interface ApiErrorResponse {
	error: ApiErrorBody;
}
