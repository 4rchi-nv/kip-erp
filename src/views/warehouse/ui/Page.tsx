"use client";

import { Box } from "@mui/material";
import dynamic from "next/dynamic";
import { PermissionGuard } from "#/features/auth";
import { useWarehouseInventory } from "#/features/warehouse";
import { themeTokens } from "#/shared/theme";
import { ConfirmDialog, PageHeader } from "#/shared/ui";
import { WarehouseTable } from "#/widgets/warehouse-table";

const InventoryFormDialog = dynamic(
	() =>
		import("#/features/warehouse/ui/inventory-form-dialog").then((module) => ({
			default: module.InventoryFormDialog,
		})),
	{ ssr: false },
);

export function WarehousePage() {
	const warehouse = useWarehouseInventory();

	return (
		<PermissionGuard subject="inventory" action="read">
			<Box sx={{ display: "flex", flexDirection: "column", gap: themeTokens.dashboardGap }}>
				<PageHeader
					title="Склад"
					subtitle="PLC, КИПиА, сетевое и серверное оборудование, кабели и запчасти"
				/>

				<WarehouseTable
					rows={warehouse.rows}
					rowCount={warehouse.rowCount}
					loading={warehouse.loading}
					paginationModel={warehouse.paginationModel}
					sortModel={warehouse.sortModel}
					filterModel={warehouse.filterModel}
					search={warehouse.search}
					onPaginationModelChange={warehouse.onPaginationModelChange}
					onSortModelChange={warehouse.onSortModelChange}
					onFilterModelChange={warehouse.onFilterModelChange}
					onSearchChange={warehouse.onSearchChange}
					onCreate={warehouse.openCreate}
					onEdit={warehouse.openEdit}
					onDelete={warehouse.requestDelete}
					onStockMovement={warehouse.handleStockMovement}
					onExport={warehouse.handleExport}
				/>

				{warehouse.dialogOpen ? (
					<InventoryFormDialog
						open={warehouse.dialogOpen}
						onClose={warehouse.closeDialog}
						onSubmit={warehouse.handleSubmit}
						editingItem={warehouse.editingItem}
						categories={warehouse.categories}
						warehouses={warehouse.warehouses}
						responsiblePersons={warehouse.responsiblePersons}
					/>
				) : null}

				<ConfirmDialog
					open={warehouse.deleteConfirmOpen}
					title="Удалить позицию?"
					description={`Вы уверены, что хотите удалить «${warehouse.deleteConfirmLabel}»? Это действие нельзя отменить.`}
					loading={warehouse.deleteConfirmLoading}
					onConfirm={warehouse.confirmDelete}
					onCancel={warehouse.cancelDelete}
				/>
			</Box>
		</PermissionGuard>
	);
}
