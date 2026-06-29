"use client";

import { Box } from "@mui/material";
import { PermissionGuard } from "#/features/auth";
import { themeTokens } from "#/shared/theme";
import { EmptyState, PageHeader } from "#/shared/ui";

export type ModuleOverviewPageProps = {
	title: string;
	subtitle: string;
	subject: "project" | "service" | "equipment";
	emptyTitle: string;
	emptyDescription: string;
};

export function ModuleOverviewPage({
	title,
	subtitle,
	subject,
	emptyTitle,
	emptyDescription,
}: ModuleOverviewPageProps) {
	return (
		<PermissionGuard subject={subject} action="read">
			<Box sx={{ display: "flex", flexDirection: "column", gap: themeTokens.dashboardGap }}>
				<PageHeader title={title} subtitle={subtitle} />
				<EmptyState title={emptyTitle} description={emptyDescription} />
			</Box>
		</PermissionGuard>
	);
}
