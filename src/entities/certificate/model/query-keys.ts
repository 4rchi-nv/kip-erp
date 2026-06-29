import type { ListCertificatesParams } from "../api/certificates.api";

export const certificatesQueryKeys = {
	all: ["certificates"] as const,
	list: (params: ListCertificatesParams) => [...certificatesQueryKeys.all, "list", params] as const,
};
