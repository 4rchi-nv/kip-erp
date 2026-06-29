import { loadMockApi } from "#/shared/api/load-mock";
import { toPaginatedResponse } from "#/shared/api/mock-response";
import { isMockMode } from "#/shared/config";
import type { RolePermission, UserRole } from "#/types";
import type {
	CreateUserRequest,
	ListUsersParams,
	ListUsersResponse,
	UpdateUserRequest,
	UserDto,
} from "./contracts";
import { realUsersApi } from "./users.real-api";

export const usersApi = {
	getUsers(params: ListUsersParams): Promise<ListUsersResponse> {
		if (isMockMode()) {
			return loadMockApi().then(({ mockUsersApi }) =>
				mockUsersApi.getList(params).then((response) => toPaginatedResponse(response, params)),
			);
		}

		return realUsersApi.getUsers(params);
	},

	getUserById(id: string): Promise<UserDto | null> {
		if (isMockMode()) {
			return loadMockApi().then(({ mockUsersApi }) =>
				mockUsersApi.getById(id).then((response) => response.data),
			);
		}

		return realUsersApi.getUserById(id);
	},

	createUser(payload: CreateUserRequest): Promise<UserDto> {
		if (isMockMode()) {
			return loadMockApi().then(({ mockUsersApi }) =>
				mockUsersApi.create(payload).then((response) => response.data),
			);
		}

		return realUsersApi.createUser(payload);
	},

	updateUser(id: string, payload: UpdateUserRequest): Promise<UserDto> {
		if (isMockMode()) {
			return loadMockApi().then(({ mockUsersApi }) =>
				mockUsersApi.update(id, payload).then((response) => response.data),
			);
		}

		return realUsersApi.updateUser(id, payload);
	},

	deleteUser(id: string): Promise<void> {
		if (isMockMode()) {
			return loadMockApi().then(({ mockUsersApi }) =>
				mockUsersApi.remove(id).then(() => undefined),
			);
		}

		return realUsersApi.deleteUser(id);
	},

	changeRole(id: string, role: UserRole): Promise<UserDto> {
		if (isMockMode()) {
			return loadMockApi().then(({ mockUsersApi }) =>
				mockUsersApi.changeRole(id, role).then((response) => response.data),
			);
		}

		return realUsersApi.updateUser(id, { role });
	},

	blockUser(id: string): Promise<UserDto> {
		if (isMockMode()) {
			return loadMockApi().then(({ mockUsersApi }) =>
				mockUsersApi.block(id).then((response) => response.data),
			);
		}

		return realUsersApi.updateUser(id, { status: "inactive" });
	},

	unblockUser(id: string): Promise<UserDto> {
		if (isMockMode()) {
			return loadMockApi().then(({ mockUsersApi }) =>
				mockUsersApi.unblock(id).then((response) => response.data),
			);
		}

		return realUsersApi.updateUser(id, { status: "active" });
	},

	getRolePermissions(): Promise<RolePermission[]> {
		if (isMockMode()) {
			return loadMockApi().then(({ mockReferenceApi }) =>
				mockReferenceApi.getRolePermissions().then((response) => response.data),
			);
		}

		return realUsersApi.getUsers({ page: 0, pageSize: 1 }).then(() => []);
	},
};

/** @deprecated Use `usersApi` */
export const userApi = usersApi;
