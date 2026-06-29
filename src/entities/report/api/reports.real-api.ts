import { apiClient } from "#/shared/api";
import type { ReportDefinition } from "#/types";
import type {
	ExportReportRequest,
	ListReportsParams,
	ListReportsResponse,
	ReportDto,
	ReportResponse,
} from "./contracts";

const BASE_PATH = "/reports";

export const realReportsApi = {
	getList(params: ListReportsParams): Promise<ListReportsResponse> {
		return apiClient.get<ListReportsResponse>(BASE_PATH, { params }).then((r) => r.data);
	},

	getById(id: string): Promise<ReportDto | null> {
		return apiClient
			.get<ReportResponse>(`${BASE_PATH}/${id}`)
			.then((r) => r.data.data)
			.catch(() => null);
	},

	create(payload: Omit<ReportDefinition, "id">): Promise<ReportDto> {
		return apiClient.post<ReportResponse>(BASE_PATH, payload).then((r) => r.data.data);
	},

	update(id: string, payload: Partial<Omit<ReportDefinition, "id">>): Promise<ReportDto> {
		return apiClient.patch<ReportResponse>(`${BASE_PATH}/${id}`, payload).then((r) => r.data.data);
	},

	remove(id: string): Promise<void> {
		return apiClient.delete(`${BASE_PATH}/${id}`).then(() => undefined);
	},

	generate(payload: ExportReportRequest) {
		return apiClient
			.post<{
				data: {
					downloadUrl: string;
					fileName: string;
					generatedAt: string;
					rowCount: number;
				};
			}>(`${BASE_PATH}/export`, payload)
			.then((r) => r.data.data);
	},
};
