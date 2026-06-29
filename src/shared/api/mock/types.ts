import type { PaginationMeta } from "../contracts";

export class MockApiError extends Error {
	readonly code: string;

	constructor(message: string, code = "MOCK_API_ERROR") {
		super(message);
		this.name = "MockApiError";
		this.code = code;
	}
}

export interface MockApiResponse<T> {
	data: T;
	meta?: PaginationMeta;
}

export interface MockRequestOptions {
	simulateError?: boolean;
	errorRate?: number;
	delayMs?: number;
}

export interface MockExportResult {
	downloadUrl: string;
	fileName: string;
	generatedAt: string;
}

export interface MockReportResult extends MockExportResult {
	reportId: string;
	format: string;
	rowCount: number;
}

export interface MockGeneratedCertificate {
	recordId: string;
	preview: {
		title: string;
		body: string;
		employeeName: string;
		position: string;
		department: string;
		issueDate: string;
	};
	downloadUrl: string;
	fileName: string;
}
