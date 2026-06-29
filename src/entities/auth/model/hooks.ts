"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authApi } from "../api/auth.api";
import type { LoginPayload } from "../api/contracts";
import { authQueryKeys } from "./query-keys";

export function useCurrentUserQuery() {
	return useQuery({
		queryKey: authQueryKeys.currentUser,
		queryFn: () => authApi.getCurrentUser(),
	});
}

export function useLoginMutation() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (payload: LoginPayload) => authApi.login(payload),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: authQueryKeys.all });
		},
	});
}

export function useLogoutMutation() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: () => authApi.logout(),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: authQueryKeys.all });
		},
	});
}
