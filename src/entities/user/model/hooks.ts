"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { CreateUserRequest, ListUsersParams, UpdateUserRequest } from "../api/contracts";
import { usersApi } from "../api/users.api";
import { usersQueryKeys } from "./query-keys";

export function useUsersQuery(params: ListUsersParams) {
	return useQuery({
		queryKey: usersQueryKeys.list(params),
		queryFn: () => usersApi.getUsers(params),
	});
}

export function useUserQuery(id: string) {
	return useQuery({
		queryKey: usersQueryKeys.detail(id),
		queryFn: () => usersApi.getUserById(id),
		enabled: Boolean(id),
	});
}

export function useRolePermissionsQuery() {
	return useQuery({
		queryKey: usersQueryKeys.rolePermissions,
		queryFn: () => usersApi.getRolePermissions(),
	});
}

export function useCreateUserMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (payload: CreateUserRequest) => usersApi.createUser(payload),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: usersQueryKeys.all });
		},
	});
}

export function useUpdateUserMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, payload }: { id: string; payload: UpdateUserRequest }) =>
			usersApi.updateUser(id, payload),
		onSuccess: (_data, variables) => {
			queryClient.invalidateQueries({ queryKey: usersQueryKeys.all });
			queryClient.invalidateQueries({ queryKey: usersQueryKeys.detail(variables.id) });
		},
	});
}

export function useDeleteUserMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => usersApi.deleteUser(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: usersQueryKeys.all });
		},
	});
}
