import type {
	ExportReportRequest,
	ListReportsParams,
	ReportDto,
} from "#/entities/report/api/contracts";
import { getMockDatabase, mockStore } from "#/shared/mock";
import type { ReportDefinition } from "#/types";
import { applyListQuery, toItemResponse, toListResponse, toVoidResponse } from "./list-utils";
import { assertFound, withMockRequest } from "./request";
import type { MockApiResponse, MockReportResult, MockRequestOptions } from "./types";

export type CreateReportPayload = Omit<ReportDefinition, "id">;
export type UpdateReportPayload = Partial<Omit<ReportDefinition, "id">>;

function filterReports(params: ListReportsParams) {
	const { category, ...listParams } = params;
	let items = [...getMockDatabase().reports];

	if (category) {
		items = items.filter((report) => report.category === category);
	}

	return applyListQuery(items, listParams, {
		searchFields: ["title", "description", "category"],
	});
}

export const mockReportsApi = {
	getList(
		params: ListReportsParams,
		options?: MockRequestOptions,
	): Promise<MockApiResponse<ReportDto[]>> {
		return withMockRequest(() => toListResponse(filterReports(params), params), options);
	},

	getById(id: string, options?: MockRequestOptions): Promise<MockApiResponse<ReportDto>> {
		return withMockRequest(() => {
			const item = getMockDatabase().reports.find((report) => report.id === id);
			return toItemResponse(assertFound(item, "Отчёт"));
		}, options);
	},

	create(
		payload: CreateReportPayload,
		options?: MockRequestOptions,
	): Promise<MockApiResponse<ReportDto>> {
		return withMockRequest(() => toItemResponse(mockStore.createReport(payload)), options);
	},

	update(
		id: string,
		payload: UpdateReportPayload,
		options?: MockRequestOptions,
	): Promise<MockApiResponse<ReportDto>> {
		return withMockRequest(() => {
			const existing = getMockDatabase().reports.find((report) => report.id === id);
			assertFound(existing, "Отчёт");
			return toItemResponse(mockStore.updateReport(id, payload));
		}, options);
	},

	remove(id: string, options?: MockRequestOptions): Promise<MockApiResponse<null>> {
		return withMockRequest(() => {
			const existing = getMockDatabase().reports.find((report) => report.id === id);
			assertFound(existing, "Отчёт");
			mockStore.deleteReport(id);
			return toVoidResponse();
		}, options);
	},

	generate(
		payload: ExportReportRequest,
		options?: MockRequestOptions,
	): Promise<MockApiResponse<MockReportResult>> {
		return withMockRequest(() => {
			const report = assertFound(
				getMockDatabase().reports.find((entry) => entry.id === payload.reportId),
				"Отчёт",
			);

			const timestamp = new Date().toISOString();
			const rowCount = 24 + Math.floor(Math.random() * 80);

			mockStore.addActivity(
				`Сформирован отчёт «${report.title}» (${payload.format.toUpperCase()})`,
				"Отчёты",
			);

			return {
				data: {
					reportId: payload.reportId,
					format: payload.format,
					rowCount,
					downloadUrl: `/mock/reports/${payload.reportId}.${payload.format}`,
					fileName: `report-${payload.reportId}.${payload.format}`,
					generatedAt: timestamp,
				},
			};
		}, options);
	},
};
