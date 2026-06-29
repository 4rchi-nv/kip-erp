"use client";

import { useQuery } from "@tanstack/react-query";
import { dashboardApi } from "../api/dashboard.api";
import { dashboardQueryKeys } from "./query-keys";

export function useDashboardStatsQuery() {
	return useQuery({
		queryKey: dashboardQueryKeys.stats,
		queryFn: () => dashboardApi.getStats(),
	});
}

export function useDashboardActivityQuery() {
	return useQuery({
		queryKey: dashboardQueryKeys.activity,
		queryFn: () => dashboardApi.getActivity(),
	});
}

export function useDashboardChartsQuery() {
	return useQuery({
		queryKey: dashboardQueryKeys.charts,
		queryFn: () => dashboardApi.getChartData(),
	});
}
