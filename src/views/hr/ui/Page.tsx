"use client";

import { Box } from "@mui/material";
import dynamic from "next/dynamic";
import { PermissionGuard } from "#/features/auth";
import { useEmployees } from "#/features/hr";
import { themeTokens } from "#/shared/theme";
import { ConfirmDialog, PageHeader } from "#/shared/ui";
import { HrTable } from "#/widgets/hr-table";

const EmployeeFormDialog = dynamic(
	() =>
		import("#/features/hr/ui/employee-form-dialog").then((module) => ({
			default: module.EmployeeFormDialog,
		})),
	{ ssr: false },
);

const EmployeeDetailDrawer = dynamic(
	() =>
		import("#/features/hr/ui/employee-detail-drawer").then((module) => ({
			default: module.EmployeeDetailDrawer,
		})),
	{ ssr: false },
);

export function HrPage() {
	const hr = useEmployees();

	return (
		<PermissionGuard subject="employee" action="read">
			<Box sx={{ display: "flex", flexDirection: "column", gap: themeTokens.dashboardGap }}>
				<PageHeader
					title="Сотрудники"
					subtitle="Инженеры автоматизации, КИПиА, программисты PLC и сервисный персонал"
				/>

				<HrTable
					rows={hr.rows}
					rowCount={hr.rowCount}
					loading={hr.loading}
					paginationModel={hr.paginationModel}
					sortModel={hr.sortModel}
					filterModel={hr.filterModel}
					search={hr.search}
					onPaginationModelChange={hr.onPaginationModelChange}
					onSortModelChange={hr.onSortModelChange}
					onFilterModelChange={hr.onFilterModelChange}
					onSearchChange={hr.onSearchChange}
					onCreate={hr.openCreate}
					onView={hr.openDetails}
					onEdit={hr.openEdit}
					onDelete={hr.requestDelete}
					onExport={hr.handleExport}
				/>

				{hr.dialogOpen ? (
					<EmployeeFormDialog
						open={hr.dialogOpen}
						onClose={hr.closeDialog}
						onSubmit={hr.handleSubmit}
						editingEmployee={hr.editingEmployee}
					/>
				) : null}

				{hr.selectedEmployee ? (
					<EmployeeDetailDrawer employee={hr.selectedEmployee} onClose={hr.closeDetails} />
				) : null}

				<ConfirmDialog
					open={hr.deleteConfirmOpen}
					title="Удалить сотрудника?"
					description={`Вы уверены, что хотите удалить «${hr.deleteConfirmLabel}»? Это действие нельзя отменить.`}
					loading={hr.deleteConfirmLoading}
					onConfirm={hr.confirmDelete}
					onCancel={hr.cancelDelete}
				/>
			</Box>
		</PermissionGuard>
	);
}
