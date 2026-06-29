"use client";

import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import TrendingDownOutlinedIcon from "@mui/icons-material/TrendingDownOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import { Box, Button, Card, Divider, Skeleton, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import {
	useDashboardActivityQuery,
	useDashboardChartsQuery,
	useDashboardStatsQuery,
} from "#/entities/dashboard";
import { PermissionGuard } from "#/features/auth";
import { formatCurrency, formatDateTime } from "#/shared/lib";
import { paths } from "#/shared/routing";
import { themeTokens } from "#/shared/theme";
import { PageHeader, StatusChip, type StatusChipColor, SummaryCard } from "#/shared/ui";

const moduleColorMap: Record<string, StatusChipColor> = {
	Финансы: { color: "#2E33F7", backgroundColor: "#E8EDFE" },
	Сертификаты: { color: "#7B61FF", backgroundColor: "#F0EDFF" },
	Склад: { color: "#F47A00", backgroundColor: "#FFF0D7" },
	HR: { color: "#12B76A", backgroundColor: "#E9FFF6" },
	Отчёты: { color: "#0288D1", backgroundColor: "#E3F2FD" },
	Проекты: { color: "#1565C0", backgroundColor: "#E3F2FD" },
	Сервис: { color: "#6A1B9A", backgroundColor: "#F3E5F5" },
	Пользователи: { color: "#D32F2F", backgroundColor: "#FFEEEE" },
};

function DashboardSkeleton() {
	return (
		<Box sx={{ display: "flex", flexDirection: "column", gap: themeTokens.dashboardGap }}>
			<Skeleton variant="rounded" height={72} sx={{ borderRadius: "12px" }} />
			<Skeleton variant="rounded" height={180} sx={{ borderRadius: "24px" }} />
			<Box
				sx={{
					display: "grid",
					gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
					gap: themeTokens.dashboardGap,
				}}
			>
				{Array.from({ length: 3 }).map((_, index) => (
					<Skeleton key={index} variant="rounded" height={180} sx={{ borderRadius: "24px" }} />
				))}
			</Box>
			<Skeleton variant="rounded" height={360} sx={{ borderRadius: "24px" }} />
		</Box>
	);
}

export function DashboardPage() {
	const router = useRouter();
	const { data: dashboardStats, isLoading: statsLoading } = useDashboardStatsQuery();
	const { data: chartData, isLoading: chartsLoading } = useDashboardChartsQuery();
	const { data: recentActivity = [], isLoading: activityLoading } = useDashboardActivityQuery();

	const loading = statsLoading || chartsLoading || activityLoading;
	const projectChart = chartData?.projects ?? [];

	if (loading || !dashboardStats) {
		return (
			<PermissionGuard subject="dashboard" action="read">
				<DashboardSkeleton />
			</PermissionGuard>
		);
	}

	const balanceItems = projectChart.slice(0, 3).map((project) => ({
		id: project.project,
		label: project.project,
		value: formatCurrency(project.amount),
	}));

	return (
		<PermissionGuard subject="dashboard" action="read">
			<Box
				className="animate-fade-in"
				sx={{
					display: "flex",
					flexDirection: "column",
					gap: themeTokens.dashboardGap,
					backgroundColor: themeTokens.contentBackground,
				}}
			>
				<PageHeader
					title="Панель управления"
					subtitle="Обзор операций KIP Engineering: проекты, финансы, склад и сервис"
					rightSection={
						<Button variant="outlined" onClick={() => router.push(paths.reports)}>
							Сформировать отчёт
						</Button>
					}
				/>

				<SummaryCard
					title="Активные проекты"
					icon={<AccountBalanceWalletOutlinedIcon />}
					total={String(dashboardStats.activeProjects)}
					items={balanceItems}
					onShowAll={() => router.push(paths.projects)}
				/>

				<Box
					sx={{
						display: "grid",
						gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
						gap: themeTokens.dashboardGap,
					}}
				>
					<SummaryCard
						title="Выручка за месяц"
						icon={<TrendingUpOutlinedIcon />}
						total={formatCurrency(dashboardStats.monthlyRevenue)}
						delta={{ value: "+12%", trend: "positive" }}
						onShowAll={() => router.push(paths.finance)}
					/>

					<SummaryCard
						title="Расход за месяц"
						icon={<TrendingDownOutlinedIcon />}
						total={formatCurrency(dashboardStats.monthlyExpenses)}
						delta={{ value: "-3%", trend: "negative" }}
						onShowAll={() => router.push(paths.finance)}
					/>

					<SummaryCard
						title="Стоимость склада"
						icon={<AssessmentOutlinedIcon />}
						total={formatCurrency(dashboardStats.warehouseStockValue)}
						items={[
							{
								id: "certificates",
								label: "Сертификаты в работе",
								value: String(dashboardStats.pendingCertificates),
							},
							{
								id: "maintenance",
								label: "Сервисные задачи",
								value: String(dashboardStats.openMaintenanceTasks),
							},
						]}
						onShowAll={() => router.push(paths.warehouse)}
					/>
				</Box>

				<Card sx={{ p: 3 }}>
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
							gap: 2,
							mb: 2.5,
							flexWrap: "wrap",
						}}
					>
						<Typography variant="h3" component="h2">
							Активность по проектам
						</Typography>
						<Button variant="outlined" size="small" onClick={() => router.push(paths.reports)}>
							Показать все
						</Button>
					</Box>

					<Box component="ul" sx={{ listStyle: "none", m: 0, p: 0 }}>
						{recentActivity.map((item, index) => (
							<Box component="li" key={item.id}>
								<Box
									sx={{
										display: "flex",
										alignItems: "flex-start",
										justifyContent: "space-between",
										gap: 2,
										py: 1.5,
									}}
								>
									<Box sx={{ display: "flex", gap: 1.5, minWidth: 0 }}>
										<Box
											sx={{
												display: "flex",
												alignItems: "center",
												justifyContent: "center",
												width: 32,
												height: 32,
												borderRadius: "50%",
												backgroundColor: themeTokens.hoverBg,
												color: themeTokens.iconDefaultColor,
												flexShrink: 0,
												mt: 0.25,
											}}
										>
											<DescriptionOutlinedIcon sx={{ fontSize: 16 }} />
										</Box>
										<Box sx={{ minWidth: 0 }}>
											<Typography variant="body2">{item.description}</Typography>
											<Typography variant="buttonXs" color="text.secondary" sx={{ mt: 0.25 }}>
												{formatDateTime(item.timestamp)}
											</Typography>
										</Box>
									</Box>
									<StatusChip status={item.module} colorMap={moduleColorMap} />
								</Box>
								{index < recentActivity.length - 1 && <Divider />}
							</Box>
						))}
					</Box>
				</Card>
			</Box>
		</PermissionGuard>
	);
}
