"use client";

import { Box } from "@mui/material";
import dynamic from "next/dynamic";
import { PermissionGuard } from "#/features/auth";
import { useEquipment } from "#/features/equipment";
import { themeTokens } from "#/shared/theme";
import { ConfirmDialog, PageHeader } from "#/shared/ui";
import { EquipmentTable } from "#/widgets/equipment-table";

const EquipmentFormDialog = dynamic(
	() =>
		import("#/features/equipment/ui/equipment-form-dialog").then((module) => ({
			default: module.EquipmentFormDialog,
		})),
	{ ssr: false },
);

export function EquipmentPage() {
	const equipment = useEquipment();

	return (
		<PermissionGuard subject="equipment" action="read">
			<Box sx={{ display: "flex", flexDirection: "column", gap: themeTokens.dashboardGap }}>
				<PageHeader
					title="Оборудование"
					subtitle="Учёт PLC, SCADA, КИПиА, сетевого и серверного оборудования"
				/>

				<EquipmentTable
					rows={equipment.rows}
					rowCount={equipment.rowCount}
					loading={equipment.loading}
					paginationModel={equipment.paginationModel}
					sortModel={equipment.sortModel}
					filterModel={equipment.filterModel}
					search={equipment.search}
					onPaginationModelChange={equipment.onPaginationModelChange}
					onSortModelChange={equipment.onSortModelChange}
					onFilterModelChange={equipment.onFilterModelChange}
					onSearchChange={equipment.onSearchChange}
					onCreate={equipment.openCreate}
					onEdit={equipment.openEdit}
					onDelete={equipment.requestDelete}
					onExport={equipment.handleExport}
				/>

				{equipment.dialogOpen ? (
					<EquipmentFormDialog
						open={equipment.dialogOpen}
						onClose={equipment.closeDialog}
						onSubmit={equipment.handleSubmit}
						editingItem={equipment.editingItem}
						types={equipment.types}
						locations={equipment.locations}
						responsiblePersons={equipment.responsiblePersons}
					/>
				) : null}

				<ConfirmDialog
					open={equipment.deleteConfirmOpen}
					title="Удалить оборудование?"
					description={`Вы уверены, что хотите удалить «${equipment.deleteConfirmLabel}»? Это действие нельзя отменить.`}
					loading={equipment.deleteConfirmLoading}
					onConfirm={equipment.confirmDelete}
					onCancel={equipment.cancelDelete}
				/>
			</Box>
		</PermissionGuard>
	);
}
