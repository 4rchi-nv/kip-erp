"use client";

import { Box } from "@mui/material";
import dynamic from "next/dynamic";
import { PermissionGuard } from "#/features/auth";
import { useProjects } from "#/features/projects";
import { themeTokens } from "#/shared/theme";
import { ConfirmDialog, PageHeader } from "#/shared/ui";
import { ProjectsTable } from "#/widgets/projects-table";

const ProjectFormDialog = dynamic(
	() =>
		import("#/features/projects/ui/project-form-dialog").then((module) => ({
			default: module.ProjectFormDialog,
		})),
	{ ssr: false },
);

export function ProjectsPage() {
	const projects = useProjects();

	return (
		<PermissionGuard subject="project" action="read">
			<Box sx={{ display: "flex", flexDirection: "column", gap: themeTokens.dashboardGap }}>
				<PageHeader
					title="Проекты"
					subtitle="Промышленная автоматизация, SCADA, MES и внедрение КИПиА"
				/>

				<ProjectsTable
					rows={projects.rows}
					rowCount={projects.rowCount}
					loading={projects.loading}
					paginationModel={projects.paginationModel}
					sortModel={projects.sortModel}
					filterModel={projects.filterModel}
					search={projects.search}
					onPaginationModelChange={projects.onPaginationModelChange}
					onSortModelChange={projects.onSortModelChange}
					onFilterModelChange={projects.onFilterModelChange}
					onSearchChange={projects.onSearchChange}
					onCreate={projects.openCreate}
					onEdit={projects.openEdit}
					onDelete={projects.requestDelete}
					onExport={projects.handleExport}
				/>

				{projects.dialogOpen ? (
					<ProjectFormDialog
						open={projects.dialogOpen}
						onClose={projects.closeDialog}
						onSubmit={projects.handleSubmit}
						editingItem={projects.editingItem}
						managers={projects.managers}
					/>
				) : null}

				<ConfirmDialog
					open={projects.deleteConfirmOpen}
					title="Удалить проект?"
					description={`Вы уверены, что хотите удалить «${projects.deleteConfirmLabel}»? Это действие нельзя отменить.`}
					loading={projects.deleteConfirmLoading}
					onConfirm={projects.confirmDelete}
					onCancel={projects.cancelDelete}
				/>
			</Box>
		</PermissionGuard>
	);
}
