import type { ListParams, PaginatedResponse } from "#/shared/api";
import type { SystemUser, UserRole, UserStatus } from "#/types";

export type UserDto = SystemUser;

export type ListUsersParams = ListParams & {
	role?: UserRole;
	status?: UserStatus;
};

export type ListUsersResponse = PaginatedResponse<UserDto>;

export interface CreateUserRequest {
	name: string;
	email: string;
	role: UserRole;
	status: UserStatus;
}

export type UpdateUserRequest = Partial<CreateUserRequest>;

export interface UserResponse {
	data: UserDto;
}
