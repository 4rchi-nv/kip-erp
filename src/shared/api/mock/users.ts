import type {
	CreateUserRequest,
	ListUsersParams,
	UpdateUserRequest,
	UserDto,
} from "#/entities/user/api/contracts";
import { getMockDatabase, mockStore } from "#/shared/mock";
import type { UserRole } from "#/types";
import { applyListQuery, toItemResponse, toListResponse, toVoidResponse } from "./list-utils";
import { assertFound, withMockRequest } from "./request";
import type { MockApiResponse, MockRequestOptions } from "./types";

function filterUsers(params: ListUsersParams) {
	const { role, status, ...listParams } = params;
	let items = [...getMockDatabase().users];

	if (role) {
		items = items.filter((user) => user.role === role);
	}

	if (status) {
		items = items.filter((user) => user.status === status);
	}

	return applyListQuery(items, listParams, {
		searchFields: ["name", "email"],
	});
}

export const mockUsersApi = {
	getList(
		params: ListUsersParams,
		options?: MockRequestOptions,
	): Promise<MockApiResponse<UserDto[]>> {
		return withMockRequest(() => toListResponse(filterUsers(params), params), options);
	},

	getById(id: string, options?: MockRequestOptions): Promise<MockApiResponse<UserDto>> {
		return withMockRequest(() => {
			const item = getMockDatabase().users.find((user) => user.id === id);
			return toItemResponse(assertFound(item, "Пользователь"));
		}, options);
	},

	create(
		payload: CreateUserRequest,
		options?: MockRequestOptions,
	): Promise<MockApiResponse<UserDto>> {
		return withMockRequest(() => toItemResponse(mockStore.createUser(payload)), options);
	},

	update(
		id: string,
		payload: UpdateUserRequest,
		options?: MockRequestOptions,
	): Promise<MockApiResponse<UserDto>> {
		return withMockRequest(() => {
			const existing = getMockDatabase().users.find((user) => user.id === id);
			assertFound(existing, "Пользователь");
			return toItemResponse(mockStore.updateUser(id, payload));
		}, options);
	},

	remove(id: string, options?: MockRequestOptions): Promise<MockApiResponse<null>> {
		return withMockRequest(() => {
			const existing = getMockDatabase().users.find((user) => user.id === id);
			assertFound(existing, "Пользователь");
			mockStore.deleteUser(id);
			return toVoidResponse();
		}, options);
	},

	changeRole(
		id: string,
		role: UserRole,
		options?: MockRequestOptions,
	): Promise<MockApiResponse<UserDto>> {
		return withMockRequest(() => {
			const existing = getMockDatabase().users.find((user) => user.id === id);
			assertFound(existing, "Пользователь");
			const updated = mockStore.updateUser(id, { role });
			mockStore.addActivity(`Изменена роль пользователя ${updated.name}`, "Пользователи");
			return toItemResponse(updated);
		}, options);
	},

	block(id: string, options?: MockRequestOptions): Promise<MockApiResponse<UserDto>> {
		return withMockRequest(() => {
			const existing = getMockDatabase().users.find((user) => user.id === id);
			assertFound(existing, "Пользователь");
			const updated = mockStore.updateUser(id, { status: "inactive" });
			mockStore.addActivity(`Заблокирован пользователь ${updated.name}`, "Пользователи");
			return toItemResponse(updated);
		}, options);
	},

	unblock(id: string, options?: MockRequestOptions): Promise<MockApiResponse<UserDto>> {
		return withMockRequest(() => {
			const existing = getMockDatabase().users.find((user) => user.id === id);
			assertFound(existing, "Пользователь");
			const updated = mockStore.updateUser(id, { status: "active" });
			mockStore.addActivity(`Разблокирован пользователь ${updated.name}`, "Пользователи");
			return toItemResponse(updated);
		}, options);
	},
};
