import { apiClient } from "#/shared/api";
import type {
	CreateTransactionRequest,
	ListTransactionsParams,
	ListTransactionsResponse,
	TransactionDto,
	TransactionResponse,
	UpdateTransactionRequest,
} from "./contracts";

const BASE_PATH = "/transactions";

export const realTransactionsApi = {
	getList(params: ListTransactionsParams): Promise<ListTransactionsResponse> {
		return apiClient.get<ListTransactionsResponse>(BASE_PATH, { params }).then((r) => r.data);
	},

	getById(id: string): Promise<TransactionDto | null> {
		return apiClient
			.get<TransactionResponse>(`${BASE_PATH}/${id}`)
			.then((r) => r.data.data)
			.catch(() => null);
	},

	create(payload: CreateTransactionRequest): Promise<TransactionDto> {
		return apiClient.post<TransactionResponse>(BASE_PATH, payload).then((r) => r.data.data);
	},

	update(id: string, payload: UpdateTransactionRequest): Promise<TransactionDto> {
		return apiClient
			.patch<TransactionResponse>(`${BASE_PATH}/${id}`, payload)
			.then((r) => r.data.data);
	},

	remove(id: string): Promise<void> {
		return apiClient.delete(`${BASE_PATH}/${id}`).then(() => undefined);
	},

	export(params: ListTransactionsParams & { format?: "xlsx" | "csv" }) {
		return apiClient
			.post<{ data: { downloadUrl: string; fileName: string } }>(`${BASE_PATH}/export`, params)
			.then((r) => r.data.data);
	},

	getFinanceReference() {
		return apiClient
			.get<{ data: { projects: string[]; responsiblePersons: string[] } }>(`${BASE_PATH}/reference`)
			.then((r) => r.data.data);
	},
};
