import type { ListParams } from "#/shared/api";
import { loadMockApi } from "#/shared/api/load-mock";
import { toPaginatedResponse } from "#/shared/api/mock-response";
import { isMockMode } from "#/shared/config";
import { realCertificatesApi } from "./certificates.real-api";
import type { CertificateRecord, GenerateCertificateRequest } from "./contracts";

export type ListCertificatesParams = ListParams & {
	type?: CertificateRecord["type"];
	status?: CertificateRecord["status"];
	employeeId?: string;
};

export const certificatesApi = {
	getList(params: ListCertificatesParams) {
		if (isMockMode()) {
			return loadMockApi().then(({ mockCertificatesApi }) =>
				mockCertificatesApi
					.getList(params)
					.then((response) => toPaginatedResponse(response, params)),
			);
		}

		return realCertificatesApi.getList(params);
	},

	create(payload: Omit<CertificateRecord, "id">) {
		if (isMockMode()) {
			return loadMockApi().then(({ mockCertificatesApi }) =>
				mockCertificatesApi.create(payload).then((response) => response.data),
			);
		}

		return realCertificatesApi.create(payload);
	},

	update(id: string, payload: Partial<Omit<CertificateRecord, "id">>) {
		if (isMockMode()) {
			return loadMockApi().then(({ mockCertificatesApi }) =>
				mockCertificatesApi.update(id, payload).then((response) => response.data),
			);
		}

		return realCertificatesApi.update(id, payload);
	},

	remove(id: string) {
		if (isMockMode()) {
			return loadMockApi().then(({ mockCertificatesApi }) =>
				mockCertificatesApi.remove(id).then(() => undefined),
			);
		}

		return realCertificatesApi.remove(id);
	},

	generate(payload: GenerateCertificateRequest & { format?: "pdf" | "docx" }) {
		if (isMockMode()) {
			return loadMockApi().then(({ mockCertificatesApi }) =>
				mockCertificatesApi.generate(payload).then((response) => response.data),
			);
		}

		return realCertificatesApi.generate(payload);
	},

	preview(payload: GenerateCertificateRequest) {
		return this.generate(payload).then((result) => ({ data: result.preview }));
	},

	exportDocument(payload: GenerateCertificateRequest & { format: "pdf" | "docx" }) {
		return this.generate(payload).then((result) => ({
			data: { downloadUrl: result.downloadUrl, fileName: result.fileName },
		}));
	},
};

/** @deprecated Use `certificatesApi` */
export const certificateApi = certificatesApi;
