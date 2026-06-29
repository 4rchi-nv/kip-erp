"use client";

import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";
import TableChartOutlinedIcon from "@mui/icons-material/TableChartOutlined";
import { Box, Button, Card, Typography } from "@mui/material";
import { StatusChip, type StatusChipColor } from "#/shared/ui";
import type { ReportDefinition } from "#/types";

const categoryColorMap: Record<string, StatusChipColor> = {
	Финансы: { color: "#2E33F7", backgroundColor: "#E8EDFE" },
	Склад: { color: "#F47A00", backgroundColor: "#FFF0D7" },
	HR: { color: "#7B61FF", backgroundColor: "#F0EDFF" },
};

type ReportCardProps = {
	report: ReportDefinition;
	exportingId: string | null;
	onExport: (reportId: string, reportTitle: string, format: "excel" | "pdf") => void;
};

export function ReportCard({ report, exportingId, onExport }: ReportCardProps) {
	return (
		<Card sx={{ p: 3, height: "100%", display: "flex", flexDirection: "column" }}>
			<Box sx={{ mb: 1 }}>
				<Typography variant="h3" sx={{ fontSize: "1.125rem", mb: 1 }}>
					{report.title}
				</Typography>
				<StatusChip status={report.category} colorMap={categoryColorMap} />
			</Box>
			<Typography variant="body2" color="text.secondary" sx={{ mb: 2, flex: 1 }}>
				{report.description}
			</Typography>
			<Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
				<Button
					variant="outlined"
					startIcon={<TableChartOutlinedIcon />}
					disabled={exportingId === `${report.id}-excel`}
					onClick={() => onExport(report.id, report.title, "excel")}
				>
					Excel
				</Button>
				<Button
					variant="outlined"
					color="error"
					startIcon={<PictureAsPdfOutlinedIcon />}
					disabled={exportingId === `${report.id}-pdf`}
					onClick={() => onExport(report.id, report.title, "pdf")}
				>
					PDF
				</Button>
			</Box>
		</Card>
	);
}
