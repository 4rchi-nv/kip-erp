import type { CertificateLanguage, CertificateType } from "#/types";

export interface CertificateRecord {
	id: string;
	type: CertificateType;
	language: CertificateLanguage;
	employeeId: string;
	employeeName: string;
	issueDate: string;
	status: "draft" | "issued" | "sent";
}

export interface GenerateCertificateRequest {
	type: CertificateType;
	language: CertificateLanguage;
	employeeId: string;
	employeeName: string;
	position: string;
	department: string;
	issueDate: string;
	reason?: string;
}

export interface CertificatePreviewDto {
	title: string;
	body: string;
	employeeName: string;
	position: string;
	department: string;
	issueDate: string;
}

export interface CertificatePreviewResponse {
	data: CertificatePreviewDto;
}

export interface ExportCertificateRequest extends GenerateCertificateRequest {
	format: "pdf" | "docx";
}

export interface ExportCertificateResponse {
	data: {
		downloadUrl: string;
		fileName: string;
	};
}
