"use client";

import { Box } from "@mui/material";
import dynamic from "next/dynamic";
import { PermissionGuard } from "#/features/auth";
import { useFinanceOperations } from "#/features/finance";
import { themeTokens } from "#/shared/theme";
import { ConfirmDialog, PageHeader } from "#/shared/ui";
import { FinanceTable } from "#/widgets/finance-table";

const OperationFormDialog = dynamic(
	() =>
		import("#/features/finance/ui/operation-form-dialog").then((module) => ({
			default: module.OperationFormDialog,
		})),
	{ ssr: false },
);

export function FinancePage() {
	const finance = useFinanceOperations();

	return (
		<PermissionGuard subject="transaction" action="read">
			<Box sx={{ display: "flex", flexDirection: "column", gap: themeTokens.dashboardGap }}>
				<PageHeader
					title="Финансы"
					subtitle="Счета, платежи за услуги, закупка оборудования и расходы по проектам"
				/>

				<FinanceTable
					rows={finance.rows}
					rowCount={finance.rowCount}
					loading={finance.loading}
					paginationModel={finance.paginationModel}
					sortModel={finance.sortModel}
					filterModel={finance.filterModel}
					search={finance.search}
					onPaginationModelChange={finance.onPaginationModelChange}
					onSortModelChange={finance.onSortModelChange}
					onFilterModelChange={finance.onFilterModelChange}
					onSearchChange={finance.onSearchChange}
					onCreate={finance.openCreate}
					onEdit={finance.openEdit}
					onDelete={finance.requestDelete}
					onExport={finance.handleExport}
				/>

				{finance.dialogOpen ? (
					<OperationFormDialog
						open={finance.dialogOpen}
						onClose={finance.closeDialog}
						onSubmit={finance.handleSubmit}
						editingOperation={finance.editingOperation}
						projects={finance.projects}
						responsiblePersons={finance.responsiblePersons}
					/>
				) : null}

				<ConfirmDialog
					open={finance.deleteConfirmOpen}
					title="Удалить операцию?"
					description={`Вы уверены, что хотите удалить «${finance.deleteConfirmLabel}»? Это действие нельзя отменить.`}
					loading={finance.deleteConfirmLoading}
					onConfirm={finance.confirmDelete}
					onCancel={finance.cancelDelete}
				/>
			</Box>
		</PermissionGuard>
	);
}
