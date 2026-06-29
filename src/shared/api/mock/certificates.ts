import type { GenerateCertificateRequest } from "#/entities/certificate/api/contracts";
import { certificateLanguageLabels, certificateTitles } from "#/entities/certificate/lib/labels";
import type { ListParams } from "#/shared/api";
import type { MockCertificateRecord } from "#/shared/mock";
import { getMockDatabase, mockStore } from "#/shared/mock";
import { applyListQuery, toItemResponse, toListResponse, toVoidResponse } from "./list-utils";
import { assertFound, withMockRequest } from "./request";
import type { MockApiResponse, MockGeneratedCertificate, MockRequestOptions } from "./types";

export type ListCertificatesParams = ListParams & {
	type?: MockCertificateRecord["type"];
	status?: MockCertificateRecord["status"];
	employeeId?: string;
};

export type CreateCertificatePayload = Omit<MockCertificateRecord, "id">;
export type UpdateCertificatePayload = Partial<Omit<MockCertificateRecord, "id">>;

function filterCertificates(params: ListCertificatesParams) {
	const { type, status, employeeId, ...listParams } = params;
	let items = [...getMockDatabase().certificates];

	if (type) {
		items = items.filter((certificate) => certificate.type === type);
	}

	if (status) {
		items = items.filter((certificate) => certificate.status === status);
	}

	if (employeeId) {
		items = items.filter((certificate) => certificate.employeeId === employeeId);
	}

	return applyListQuery(items, listParams, {
		searchFields: ["employeeName", "type", "language"],
	});
}

export const mockCertificatesApi = {
	getList(
		params: ListCertificatesParams,
		options?: MockRequestOptions,
	): Promise<MockApiResponse<MockCertificateRecord[]>> {
		return withMockRequest(() => toListResponse(filterCertificates(params), params), options);
	},

	create(
		payload: CreateCertificatePayload,
		options?: MockRequestOptions,
	): Promise<MockApiResponse<MockCertificateRecord>> {
		return withMockRequest(() => toItemResponse(mockStore.createCertificate(payload)), options);
	},

	update(
		id: string,
		payload: UpdateCertificatePayload,
		options?: MockRequestOptions,
	): Promise<MockApiResponse<MockCertificateRecord>> {
		return withMockRequest(() => {
			const existing = getMockDatabase().certificates.find((certificate) => certificate.id === id);
			assertFound(existing, "Сертификат");
			return toItemResponse(mockStore.updateCertificate(id, payload));
		}, options);
	},

	remove(id: string, options?: MockRequestOptions): Promise<MockApiResponse<null>> {
		return withMockRequest(() => {
			const existing = getMockDatabase().certificates.find((certificate) => certificate.id === id);
			assertFound(existing, "Сертификат");
			mockStore.deleteCertificate(id);
			return toVoidResponse();
		}, options);
	},

	generate(
		payload: GenerateCertificateRequest & { format?: "pdf" | "docx" },
		options?: MockRequestOptions,
	): Promise<MockApiResponse<MockGeneratedCertificate>> {
		return withMockRequest(() => {
			const title = certificateTitles[payload.type][payload.language];
			const languageLabel = certificateLanguageLabels[payload.language];
			const format = payload.format ?? "pdf";

			const record = mockStore.createCertificate({
				type: payload.type,
				language: payload.language,
				employeeId: payload.employeeId,
				employeeName: payload.employeeName,
				issueDate: payload.issueDate,
				status: "issued",
			});

			return {
				data: {
					recordId: record.id,
					preview: {
						title,
						body: `${languageLabel}: ${payload.reason ?? "—"}`,
						employeeName: payload.employeeName,
						position: payload.position,
						department: payload.department,
						issueDate: payload.issueDate,
					},
					downloadUrl: `/mock/certificates/${payload.employeeId}.${format}`,
					fileName: `certificate-${payload.employeeId}.${format}`,
				},
			};
		}, options);
	},
};
