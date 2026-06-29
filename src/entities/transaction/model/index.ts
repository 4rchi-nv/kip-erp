import type { ListTransactionsParams } from "../api/contracts";
import { transactionsApi } from "../api/transactions.api";
import { transactionsQueryKeys } from "./query-keys";

export const transactionsListQuery = {
	queryKey: transactionsQueryKeys.list,
	queryFn: (params: ListTransactionsParams) => transactionsApi.getList(params),
};

export {
	useCreateTransactionMutation,
	useDeleteTransactionMutation,
	useExportTransactionsMutation,
	useFinanceReferenceQuery,
	useTransactionQuery,
	useTransactionsQuery,
	useUpdateTransactionMutation,
} from "./hooks";
export { transactionsQueryKeys } from "./query-keys";
