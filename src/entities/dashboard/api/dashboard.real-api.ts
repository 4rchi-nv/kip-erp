import { apiClient } from "#/shared/api";
import type { ActivityItem, ChartDataPoint, DashboardStats, ProjectDataPoint } from "#/types";

const BASE_PATH = "/dashboard";

export const realDashboardApi = {
	getStats(): Promise<DashboardStats> {
		return apiClient.get<{ data: DashboardStats }>(`${BASE_PATH}/stats`).then((r) => r.data.data);
	},

	getActivity(): Promise<ActivityItem[]> {
		return apiClient
			.get<{ data: ActivityItem[] }>(`${BASE_PATH}/activity`)
			.then((r) => r.data.data);
	},

	getChartData(): Promise<{ monthly: ChartDataPoint[]; projects: ProjectDataPoint[] }> {
		return apiClient
			.get<{ data: { monthly: ChartDataPoint[]; projects: ProjectDataPoint[] } }>(
				`${BASE_PATH}/charts`,
			)
			.then((r) => r.data.data);
	},
};
