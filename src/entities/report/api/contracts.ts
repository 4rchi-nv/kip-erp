import type { ListParams, PaginatedResponse } from "#/shared/api";
import type { ReportDefinition } from "#/types";

export type ReportDto = ReportDefinition;

export type ListReportsParams = ListParams & {
	category?: string;
};

export type ListReportsResponse = PaginatedResponse<ReportDto>;

export interface ExportReportRequest {
	reportId: string;
	format: "xlsx" | "pdf" | "csv";
	dateFrom?: string;
	dateTo?: string;
}

export interface ExportReportResponse {
	data: {
		downloadUrl: string;
		fileName: string;
	};
}

export interface ReportResponse {
	data: ReportDto;
}
