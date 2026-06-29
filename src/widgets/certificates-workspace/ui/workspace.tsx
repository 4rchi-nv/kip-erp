"use client";

import { Box } from "@mui/material";
import type { CertificateFormValues } from "#/features/certificates";
import { CertificateForm, CertificatePreview } from "#/features/certificates";
import type { Employee } from "#/types";

export type CertificatesWorkspaceProps = {
	activeEmployees: Employee[];
	preview: CertificateFormValues | null;
	loading: boolean;
	getEmployee: (employeeId: string) => Employee | undefined;
	onSubmit: (values: CertificateFormValues) => void;
	onDownload: () => void;
};

export function CertificatesWorkspace({
	activeEmployees,
	preview,
	loading,
	getEmployee,
	onSubmit,
	onDownload,
}: CertificatesWorkspaceProps) {
	const previewEmployee = preview ? (getEmployee(preview.employeeId) ?? null) : null;

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: { xs: "column", lg: "row" },
				gap: 3,
				alignItems: "stretch",
			}}
		>
			<CertificateForm activeEmployees={activeEmployees} loading={loading} onSubmit={onSubmit} />
			<CertificatePreview
				preview={preview}
				employee={previewEmployee}
				loading={loading}
				onDownload={onDownload}
			/>
		</Box>
	);
}
