import { loadMockApi } from "#/shared/api/load-mock";
import { toPaginatedResponse } from "#/shared/api/mock-response";
import { isMockMode } from "#/shared/config";
import type {
	CreateTransactionRequest,
	ListTransactionsParams,
	ListTransactionsResponse,
	TransactionDto,
	UpdateTransactionRequest,
} from "./contracts";
import { realTransactionsApi } from "./transactions.real-api";

export const transactionsApi = {
	getList(params: ListTransactionsParams): Promise<ListTransactionsResponse> {
		if (isMockMode()) {
			return loadMockApi().then(({ mockTransactionsApi }) =>
				mockTransactionsApi
					.getList(params)
					.then((response) => toPaginatedResponse(response, params)),
			);
		}

		return realTransactionsApi.getList(params);
	},

	getById(id: string): Promise<TransactionDto | null> {
		if (isMockMode()) {
			return loadMockApi().then(({ mockTransactionsApi }) =>
				mockTransactionsApi.getById(id).then((response) => response.data),
			);
		}

		return realTransactionsApi.getById(id);
	},

	create(payload: CreateTransactionRequest): Promise<TransactionDto> {
		if (isMockMode()) {
			return loadMockApi().then(({ mockTransactionsApi }) =>
				mockTransactionsApi.create(payload).then((response) => response.data),
			);
		}

		return realTransactionsApi.create(payload);
	},

	update(id: string, payload: UpdateTransactionRequest): Promise<TransactionDto> {
		if (isMockMode()) {
			return loadMockApi().then(({ mockTransactionsApi }) =>
				mockTransactionsApi.update(id, payload).then((response) => response.data),
			);
		}

		return realTransactionsApi.update(id, payload);
	},

	remove(id: string): Promise<void> {
		if (isMockMode()) {
			return loadMockApi().then(({ mockTransactionsApi }) =>
				mockTransactionsApi.remove(id).then(() => undefined),
			);
		}

		return realTransactionsApi.remove(id);
	},

	export(params: ListTransactionsParams & { format?: "xlsx" | "csv" }) {
		if (isMockMode()) {
			return loadMockApi().then(({ mockTransactionsApi }) =>
				mockTransactionsApi.export(params).then((response) => response.data),
			);
		}

		return realTransactionsApi.export(params);
	},

	getFinanceReference() {
		if (isMockMode()) {
			return loadMockApi().then(({ mockReferenceApi }) =>
				mockReferenceApi.getFinanceReference().then((response) => response.data),
			);
		}

		return realTransactionsApi.getFinanceReference();
	},
};

/** @deprecated Use `transactionsApi` */
export const transactionApi = transactionsApi;
