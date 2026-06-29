"use client";

import { LinearProgress, Stack, Typography } from "@mui/material";
import type { GridColDef } from "@mui/x-data-grid";
import { ProjectStatusChip } from "#/entities/project";
import { formatCurrency, formatDate } from "#/shared/lib";
import type { Project } from "#/types";
import { ActionsCell } from "./cells/actions-cell";

type CreateProjectsColumnsParams = {
	onEdit: (item: Project) => void;
	onDelete: (id: string) => void;
};

export function createProjectsColumns({
	onEdit,
	onDelete,
}: CreateProjectsColumnsParams): GridColDef<Project>[] {
	return [
		{ field: "name", headerName: "Проект", flex: 1.4, minWidth: 220 },
		{ field: "client", headerName: "Заказчик", flex: 1.1, minWidth: 180 },
		{ field: "manager", headerName: "Руководитель", flex: 1, minWidth: 160 },
		{
			field: "budget",
			headerName: "Бюджет",
			width: 150,
			valueGetter: (_, row) => row.budget,
			renderCell: ({ row }) => formatCurrency(row.budget),
		},
		{
			field: "progress",
			headerName: "Прогресс",
			width: 160,
			renderCell: ({ row }) => (
				<Stack spacing={0.5} sx={{ width: "100%", justifyContent: "center", height: "100%" }}>
					<Typography variant="caption" color="text.secondary">
						{row.progress}%
					</Typography>
					<LinearProgress
						variant="determinate"
						value={row.progress}
						sx={{ height: 6, borderRadius: 3 }}
					/>
				</Stack>
			),
		},
		{
			field: "endDate",
			headerName: "Срок",
			width: 130,
			renderCell: ({ row }) => formatDate(row.endDate),
		},
		{
			field: "status",
			headerName: "Статус",
			width: 160,
			type: "singleSelect",
			valueOptions: [
				{ value: "planning", label: "Планирование" },
				{ value: "in_progress", label: "В работе" },
				{ value: "on_hold", label: "Приостановлен" },
				{ value: "completed", label: "Завершён" },
			],
			renderCell: ({ row }) => <ProjectStatusChip status={row.status} />,
		},
		{
			field: "actions",
			headerName: "Действия",
			width: 120,
			sortable: false,
			filterable: false,
			disableColumnMenu: true,
			renderCell: ({ row }) => <ActionsCell item={row} onEdit={onEdit} onDelete={onDelete} />,
		},
	];
}
