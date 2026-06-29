import { getMockDatabase } from "#/shared/mock";
import type { ActivityItem, ChartDataPoint, DashboardStats, ProjectDataPoint } from "#/types";
import { toItemResponse } from "./list-utils";
import { withMockRequest } from "./request";
import type { MockApiResponse, MockRequestOptions } from "./types";

export const mockDashboardApi = {
	getStats(options?: MockRequestOptions): Promise<MockApiResponse<DashboardStats>> {
		return withMockRequest(() => toItemResponse(getMockDatabase().dashboard.stats), options);
	},

	getActivity(options?: MockRequestOptions): Promise<MockApiResponse<ActivityItem[]>> {
		return withMockRequest(() => ({ data: getMockDatabase().dashboard.recentActivity }), options);
	},

	getChartData(options?: MockRequestOptions): Promise<
		MockApiResponse<{
			monthly: ChartDataPoint[];
			projects: ProjectDataPoint[];
		}>
	> {
		return withMockRequest(() => {
			const { monthlyChart, projectChart } = getMockDatabase().dashboard;
			return {
				data: {
					monthly: monthlyChart,
					projects: projectChart,
				},
			};
		}, options);
	},
};
