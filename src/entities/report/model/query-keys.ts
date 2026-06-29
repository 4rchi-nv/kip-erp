import type { ExportReportRequest, ListReportsParams } from "../api/contracts";

export const reportsQueryKeys = {
	all: ["reports"] as const,
	list: (params: ListReportsParams) => [...reportsQueryKeys.all, "list", params] as const,
	detail: (id: string) => [...reportsQueryKeys.all, "detail", id] as const,
	export: (payload: ExportReportRequest) => [...reportsQueryKeys.all, "export", payload] as const,
};
