import type {
	CreateTransactionRequest,
	ListTransactionsParams,
	TransactionDto,
	UpdateTransactionRequest,
} from "#/entities/transaction/api/contracts";
import { getMockDatabase, mockStore } from "#/shared/mock";
import { applyListQuery, toItemResponse, toListResponse, toVoidResponse } from "./list-utils";
import { assertFound, withMockRequest } from "./request";
import type { MockApiResponse, MockExportResult, MockRequestOptions } from "./types";

export type ExportTransactionsParams = ListTransactionsParams & {
	format?: "xlsx" | "csv";
};

function filterTransactions(params: ListTransactionsParams) {
	const { type, project, dateFrom, dateTo, ...listParams } = params;
	let items = [...getMockDatabase().transactions];

	if (type) {
		items = items.filter((operation) => operation.type === type);
	}

	if (project) {
		items = items.filter((operation) => operation.project === project);
	}

	if (dateFrom) {
		items = items.filter((operation) => operation.date >= dateFrom);
	}

	if (dateTo) {
		items = items.filter((operation) => operation.date <= dateTo);
	}

	return applyListQuery(items, listParams, {
		searchFields: ["project", "comment", "responsiblePerson"],
	});
}

export const mockTransactionsApi = {
	getList(
		params: ListTransactionsParams,
		options?: MockRequestOptions,
	): Promise<MockApiResponse<TransactionDto[]>> {
		return withMockRequest(() => {
			const filtered = filterTransactions(params);
			return toListResponse(filtered, params);
		}, options);
	},

	getById(id: string, options?: MockRequestOptions): Promise<MockApiResponse<TransactionDto>> {
		return withMockRequest(() => {
			const item = getMockDatabase().transactions.find((operation) => operation.id === id);
			return toItemResponse(assertFound(item, "Операция"));
		}, options);
	},

	create(
		payload: CreateTransactionRequest,
		options?: MockRequestOptions,
	): Promise<MockApiResponse<TransactionDto>> {
		return withMockRequest(() => toItemResponse(mockStore.createTransaction(payload)), options);
	},

	update(
		id: string,
		payload: UpdateTransactionRequest,
		options?: MockRequestOptions,
	): Promise<MockApiResponse<TransactionDto>> {
		return withMockRequest(() => {
			const existing = getMockDatabase().transactions.find((operation) => operation.id === id);
			assertFound(existing, "Операция");
			return toItemResponse(mockStore.updateTransaction(id, payload));
		}, options);
	},

	remove(id: string, options?: MockRequestOptions): Promise<MockApiResponse<null>> {
		return withMockRequest(() => {
			const existing = getMockDatabase().transactions.find((operation) => operation.id === id);
			assertFound(existing, "Операция");
			mockStore.deleteTransaction(id);
			return toVoidResponse();
		}, options);
	},

	export(
		params: ExportTransactionsParams,
		options?: MockRequestOptions,
	): Promise<MockApiResponse<MockExportResult>> {
		return withMockRequest(() => {
			const filtered = filterTransactions(params);
			const format = params.format ?? "xlsx";
			const timestamp = new Date().toISOString();

			mockStore.addActivity(
				`Экспортировано ${filtered.length} кассовых операций в ${format.toUpperCase()}`,
				"Финансы",
			);

			return {
				data: {
					downloadUrl: `/mock/transactions/export-${Date.now()}.${format}`,
					fileName: `transactions-${timestamp.slice(0, 10)}.${format}`,
					generatedAt: timestamp,
				},
			};
		}, options);
	},
};
