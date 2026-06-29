import { apiClient } from "#/shared/api";
import type { CertificateRecord, GenerateCertificateRequest } from "./contracts";

const BASE_PATH = "/certificates";

export const realCertificatesApi = {
	getList(params: { page?: number; pageSize?: number; search?: string }) {
		return apiClient
			.get<{ data: CertificateRecord[]; meta: { total: number; page: number; pageSize: number } }>(
				BASE_PATH,
				{ params },
			)
			.then((r) => r.data);
	},

	create(payload: Omit<CertificateRecord, "id">) {
		return apiClient.post<{ data: CertificateRecord }>(BASE_PATH, payload).then((r) => r.data.data);
	},

	update(id: string, payload: Partial<Omit<CertificateRecord, "id">>) {
		return apiClient
			.patch<{ data: CertificateRecord }>(`${BASE_PATH}/${id}`, payload)
			.then((r) => r.data.data);
	},

	remove(id: string) {
		return apiClient.delete(`${BASE_PATH}/${id}`).then(() => undefined);
	},

	generate(payload: GenerateCertificateRequest & { format?: "pdf" | "docx" }) {
		return apiClient
			.post<{
				data: {
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
				};
			}>(`${BASE_PATH}/generate`, payload)
			.then((r) => r.data.data);
	},
};
