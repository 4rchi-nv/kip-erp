"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { certificatesApi, type ListCertificatesParams } from "../api/certificates.api";
import type { CertificateRecord, GenerateCertificateRequest } from "../api/contracts";
import { certificatesQueryKeys } from "./query-keys";

export function useCertificatesQuery(params: ListCertificatesParams = { page: 0, pageSize: 100 }) {
	return useQuery({
		queryKey: certificatesQueryKeys.list(params),
		queryFn: () => certificatesApi.getList(params),
	});
}

export function useCreateCertificateMutation() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (payload: Omit<CertificateRecord, "id">) => certificatesApi.create(payload),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: certificatesQueryKeys.all }),
	});
}

export function useUpdateCertificateMutation() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({
			id,
			payload,
		}: {
			id: string;
			payload: Partial<Omit<CertificateRecord, "id">>;
		}) => certificatesApi.update(id, payload),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: certificatesQueryKeys.all }),
	});
}

export function useDeleteCertificateMutation() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (id: string) => certificatesApi.remove(id),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: certificatesQueryKeys.all }),
	});
}

export function useGenerateCertificateMutation() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (payload: GenerateCertificateRequest) => certificatesApi.generate(payload),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: certificatesQueryKeys.all });
		},
	});
}
