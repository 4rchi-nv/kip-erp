import type { ListReportsParams } from "../api/contracts";
import { reportsApi } from "../api/reports.api";
import { reportsQueryKeys } from "./query-keys";

export const reportsListQuery = {
	queryKey: reportsQueryKeys.list,
	queryFn: (params: ListReportsParams) => reportsApi.getList(params),
};

export {
	useCreateReportMutation,
	useDeleteReportMutation,
	useGenerateReportMutation,
	useReportQuery,
	useReportsQuery,
	useUpdateReportMutation,
} from "./hooks";
export { reportsQueryKeys } from "./query-keys";
