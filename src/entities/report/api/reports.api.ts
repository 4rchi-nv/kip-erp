import { loadMockApi } from "#/shared/api/load-mock";
import { toPaginatedResponse } from "#/shared/api/mock-response";
import { isMockMode } from "#/shared/config";
import type { ReportDefinition } from "#/types";
import type {
	ExportReportRequest,
	ListReportsParams,
	ListReportsResponse,
	ReportDto,
} from "./contracts";
import { realReportsApi } from "./reports.real-api";

export const reportsApi = {
	getList(params: ListReportsParams): Promise<ListReportsResponse> {
		if (isMockMode()) {
			return loadMockApi().then(({ mockReportsApi }) =>
				mockReportsApi
					.getList(params)
					.then((response) => toPaginatedResponse(response, params)),
			);
		}

		return realReportsApi.getList(params);
	},

	getById(id: string): Promise<ReportDto | null> {
		if (isMockMode()) {
			return loadMockApi().then(({ mockReportsApi }) =>
				mockReportsApi.getById(id).then((response) => response.data),
			);
		}

		return realReportsApi.getById(id);
	},

	create(payload: Omit<ReportDefinition, "id">): Promise<ReportDto> {
		if (isMockMode()) {
			return loadMockApi().then(({ mockReportsApi }) =>
				mockReportsApi.create(payload).then((response) => response.data),
			);
		}

		return realReportsApi.create(payload);
	},

	update(id: string, payload: Partial<Omit<ReportDefinition, "id">>): Promise<ReportDto> {
		if (isMockMode()) {
			return loadMockApi().then(({ mockReportsApi }) =>
				mockReportsApi.update(id, payload).then((response) => response.data),
			);
		}

		return realReportsApi.update(id, payload);
	},

	remove(id: string): Promise<void> {
		if (isMockMode()) {
			return loadMockApi().then(({ mockReportsApi }) =>
				mockReportsApi.remove(id).then(() => undefined),
			);
		}

		return realReportsApi.remove(id);
	},

	generate(payload: ExportReportRequest) {
		if (isMockMode()) {
			return loadMockApi().then(({ mockReportsApi }) =>
				mockReportsApi.generate(payload).then((response) => response.data),
			);
		}

		return realReportsApi.generate(payload);
	},
};

/** @deprecated Use `reportsApi` */
export const reportApi = reportsApi;
