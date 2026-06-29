"use client";

import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";
import TableChartOutlinedIcon from "@mui/icons-material/TableChartOutlined";
import { Box, CircularProgress, IconButton, Tooltip } from "@mui/material";
import { useCan } from "#/shared/lib";
import type { ReportDefinition } from "#/types";

type ActionsCellProps = {
	report: ReportDefinition;
	exportingId: string | null;
	onEdit: (report: ReportDefinition) => void;
	onDelete: (id: string) => void;
	onExport: (reportId: string, reportTitle: string, format: "excel" | "pdf") => void;
};

export function ActionsCell({
	report,
	exportingId,
	onEdit,
	onDelete,
	onExport,
}: ActionsCellProps) {
	const { can } = useCan();
	const canRead = can("report", "read");
	const canUpdate = can("report", "update");
	const canDelete = can("report", "delete");

	const excelLoading = exportingId === `${report.id}-excel`;
	const pdfLoading = exportingId === `${report.id}-pdf`;

	return (
		<Box sx={{ display: "flex", gap: 0.5 }}>
			{canRead && (
				<>
					<Tooltip title="Excel">
						<IconButton
							size="small"
							onClick={() => onExport(report.id, report.title, "excel")}
							disabled={Boolean(exportingId)}
							aria-label="Экспорт в Excel"
						>
							{excelLoading ? (
								<CircularProgress size={16} />
							) : (
								<TableChartOutlinedIcon fontSize="small" />
							)}
						</IconButton>
					</Tooltip>
					<Tooltip title="PDF">
						<IconButton
							size="small"
							onClick={() => onExport(report.id, report.title, "pdf")}
							disabled={Boolean(exportingId)}
							aria-label="Экспорт в PDF"
						>
							{pdfLoading ? (
								<CircularProgress size={16} />
							) : (
								<PictureAsPdfOutlinedIcon fontSize="small" />
							)}
						</IconButton>
					</Tooltip>
				</>
			)}
			{canUpdate && (
				<Tooltip title="Редактировать">
					<IconButton size="small" onClick={() => onEdit(report)} aria-label="Редактировать">
						<EditOutlinedIcon fontSize="small" />
					</IconButton>
				</Tooltip>
			)}
			{canDelete && (
				<Tooltip title="Удалить">
					<IconButton
						size="small"
						color="error"
						onClick={() => onDelete(report.id)}
						aria-label="Удалить"
					>
						<DeleteOutlineRoundedIcon fontSize="small" />
					</IconButton>
				</Tooltip>
			)}
		</Box>
	);
}
