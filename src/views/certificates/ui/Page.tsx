"use client";

import { Box } from "@mui/material";
import dynamic from "next/dynamic";
import { PermissionGuard } from "#/features/auth";
import { useCertificateGenerator, useCertificatesList } from "#/features/certificates";
import { themeTokens } from "#/shared/theme";
import { ConfirmDialog, PageHeader } from "#/shared/ui";
import { CertificatesTable } from "#/widgets/certificates-table";

const CertificatesWorkspace = dynamic(
	() =>
		import("#/widgets/certificates-workspace/ui/workspace").then((module) => ({
			default: module.CertificatesWorkspace,
		})),
	{ ssr: false },
);

const CertificateRecordFormDialog = dynamic(
	() =>
		import("#/features/certificates/ui/certificate-record-form-dialog").then((module) => ({
			default: module.CertificateRecordFormDialog,
		})),
	{ ssr: false },
);

export function CertificatesPage() {
	const certificatesList = useCertificatesList();
	const generator = useCertificateGenerator();

	return (
		<PermissionGuard subject="certificate" action="read">
			<Box sx={{ display: "flex", flexDirection: "column", gap: themeTokens.dashboardGap }}>
				<PageHeader
					title="Сертификаты"
					subtitle="Обучение, калибровка, электробезопасность и допуски на объекты"
				/>

				<CertificatesTable
					rows={certificatesList.rows}
					rowCount={certificatesList.rowCount}
					loading={certificatesList.loading}
					paginationModel={certificatesList.paginationModel}
					sortModel={certificatesList.sortModel}
					filterModel={certificatesList.filterModel}
					search={certificatesList.search}
					onPaginationModelChange={certificatesList.onPaginationModelChange}
					onSortModelChange={certificatesList.onSortModelChange}
					onFilterModelChange={certificatesList.onFilterModelChange}
					onSearchChange={certificatesList.onSearchChange}
					onCreate={certificatesList.openCreate}
					onEdit={certificatesList.openEdit}
					onDelete={certificatesList.requestDelete}
					onExport={certificatesList.handleExport}
				/>

				<CertificatesWorkspace
					activeEmployees={generator.activeEmployees}
					preview={generator.preview}
					loading={generator.loading}
					getEmployee={generator.getEmployee}
					onSubmit={generator.generatePreview}
					onDownload={generator.downloadPdf}
				/>

				{certificatesList.dialogOpen ? (
					<CertificateRecordFormDialog
						open={certificatesList.dialogOpen}
						onClose={certificatesList.closeDialog}
						onSubmit={certificatesList.handleSubmit}
						editingCertificate={certificatesList.editingCertificate}
						employees={certificatesList.employees}
					/>
				) : null}

				<ConfirmDialog
					open={certificatesList.deleteConfirmOpen}
					title="Удалить сертификат?"
					description={`Вы уверены, что хотите удалить сертификат для «${certificatesList.deleteConfirmLabel}»? Это действие нельзя отменить.`}
					loading={certificatesList.deleteConfirmLoading}
					onConfirm={certificatesList.confirmDelete}
					onCancel={certificatesList.cancelDelete}
				/>
			</Box>
		</PermissionGuard>
	);
}
