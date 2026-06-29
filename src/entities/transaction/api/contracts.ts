import type { ListParams, PaginatedResponse } from "#/shared/api";
import type { CashOperation, OperationType } from "#/types";

export type TransactionDto = CashOperation;

export type ListTransactionsParams = ListParams & {
	type?: OperationType;
	project?: string;
	dateFrom?: string;
	dateTo?: string;
};

export type ListTransactionsResponse = PaginatedResponse<TransactionDto>;

export interface CreateTransactionRequest {
	date: string;
	type: OperationType;
	amount: number;
	project: string;
	responsiblePerson: string;
	comment: string;
}

export type UpdateTransactionRequest = Partial<CreateTransactionRequest>;

export interface TransactionResponse {
	data: TransactionDto;
}
