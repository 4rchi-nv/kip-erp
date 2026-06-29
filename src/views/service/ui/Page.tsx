"use client";

import { Box } from "@mui/material";
import dynamic from "next/dynamic";
import { PermissionGuard } from "#/features/auth";
import { useService } from "#/features/service";
import { themeTokens } from "#/shared/theme";
import { ConfirmDialog, PageHeader } from "#/shared/ui";
import { ServiceTable } from "#/widgets/service-table";

const ServiceFormDialog = dynamic(
	() =>
		import("#/features/service/ui/service-form-dialog").then((module) => ({
			default: module.ServiceFormDialog,
		})),
	{ ssr: false },
);

export function ServicePage() {
	const service = useService();

	return (
		<PermissionGuard subject="service" action="read">
			<Box sx={{ display: "flex", flexDirection: "column", gap: themeTokens.dashboardGap }}>
				<PageHeader
					title="Сервис"
					subtitle="Монтаж, пусконаладка, обслуживание и обучение персонала"
				/>

				<ServiceTable
					rows={service.rows}
					rowCount={service.rowCount}
					loading={service.loading}
					paginationModel={service.paginationModel}
					sortModel={service.sortModel}
					filterModel={service.filterModel}
					search={service.search}
					onPaginationModelChange={service.onPaginationModelChange}
					onSortModelChange={service.onSortModelChange}
					onFilterModelChange={service.onFilterModelChange}
					onSearchChange={service.onSearchChange}
					onCreate={service.openCreate}
					onEdit={service.openEdit}
					onDelete={service.requestDelete}
					onExport={service.handleExport}
				/>

				{service.dialogOpen ? (
					<ServiceFormDialog
						open={service.dialogOpen}
						onClose={service.closeDialog}
						onSubmit={service.handleSubmit}
						editingItem={service.editingItem}
						projects={service.projects}
						assignees={service.assignees}
					/>
				) : null}

				<ConfirmDialog
					open={service.deleteConfirmOpen}
					title="Удалить заявку?"
					description={`Вы уверены, что хотите удалить «${service.deleteConfirmLabel}»? Это действие нельзя отменить.`}
					loading={service.deleteConfirmLoading}
					onConfirm={service.confirmDelete}
					onCancel={service.cancelDelete}
				/>
			</Box>
		</PermissionGuard>
	);
}
