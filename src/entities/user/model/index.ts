import type { ListUsersParams } from "../api/contracts";
import { usersApi } from "../api/users.api";
import { usersQueryKeys } from "./query-keys";

export const usersListQuery = {
	queryKey: usersQueryKeys.list,
	queryFn: (params: ListUsersParams) => usersApi.getUsers(params),
};

export const userDetailQuery = {
	queryKey: usersQueryKeys.detail,
	queryFn: (id: string) => usersApi.getUserById(id),
};

export {
	useCreateUserMutation,
	useDeleteUserMutation,
	useRolePermissionsQuery,
	useUpdateUserMutation,
	useUserQuery,
	useUsersQuery,
} from "./hooks";
export { usersQueryKeys } from "./query-keys";
