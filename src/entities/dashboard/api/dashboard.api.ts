import { loadMockApi } from "#/shared/api/load-mock";
import { isMockMode } from "#/shared/config";
import type { ActivityItem, ChartDataPoint, DashboardStats, ProjectDataPoint } from "#/types";
import { realDashboardApi } from "./dashboard.real-api";

export const dashboardApi = {
	getStats(): Promise<DashboardStats> {
		if (isMockMode()) {
			return loadMockApi().then(({ mockDashboardApi }) =>
				mockDashboardApi.getStats().then((response) => response.data),
			);
		}

		return realDashboardApi.getStats();
	},

	getActivity(): Promise<ActivityItem[]> {
		if (isMockMode()) {
			return loadMockApi().then(({ mockDashboardApi }) =>
				mockDashboardApi.getActivity().then((response) => response.data),
			);
		}

		return realDashboardApi.getActivity();
	},

	getChartData(): Promise<{ monthly: ChartDataPoint[]; projects: ProjectDataPoint[] }> {
		if (isMockMode()) {
			return loadMockApi().then(({ mockDashboardApi }) =>
				mockDashboardApi.getChartData().then((response) => response.data),
			);
		}

		return realDashboardApi.getChartData();
	},
};
