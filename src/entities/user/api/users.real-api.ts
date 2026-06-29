import { apiClient } from "#/shared/api";
import type {
	CreateUserRequest,
	ListUsersParams,
	ListUsersResponse,
	UpdateUserRequest,
	UserDto,
	UserResponse,
} from "./contracts";

const BASE_PATH = "/users";

export const realUsersApi = {
	getUsers(params: ListUsersParams): Promise<ListUsersResponse> {
		return apiClient
			.get<ListUsersResponse>(BASE_PATH, { params })
			.then((response) => response.data);
	},

	getUserById(id: string): Promise<UserDto | null> {
		return apiClient
			.get<UserResponse>(`${BASE_PATH}/${id}`)
			.then((response) => response.data.data)
			.catch(() => null);
	},

	createUser(payload: CreateUserRequest): Promise<UserDto> {
		return apiClient.post<UserResponse>(BASE_PATH, payload).then((response) => response.data.data);
	},

	updateUser(id: string, payload: UpdateUserRequest): Promise<UserDto> {
		return apiClient
			.patch<UserResponse>(`${BASE_PATH}/${id}`, payload)
			.then((response) => response.data.data);
	},

	deleteUser(id: string): Promise<void> {
		return apiClient.delete(`${BASE_PATH}/${id}`).then(() => undefined);
	},
};
