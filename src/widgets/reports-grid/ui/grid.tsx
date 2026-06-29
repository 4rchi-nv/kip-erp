"use client";

import { Box } from "@mui/material";
import { ReportCard } from "#/features/reports";
import type { ReportDefinition } from "#/types";

export type ReportsGridProps = {
	reports: ReportDefinition[];
	exportingId: string | null;
	onExport: (reportId: string, reportTitle: string, format: "excel" | "pdf") => void;
};

export function ReportsGrid({ reports, exportingId, onExport }: ReportsGridProps) {
	return (
		<Box
			sx={{
				display: "grid",
				gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
				gap: 2,
			}}
		>
			{reports.map((report) => (
				<ReportCard key={report.id} report={report} exportingId={exportingId} onExport={onExport} />
			))}
		</Box>
	);
}
