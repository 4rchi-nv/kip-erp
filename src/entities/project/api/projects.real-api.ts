import { apiClient } from "#/shared/api";
import type {
	CreateProjectRequest,
	ListProjectsParams,
	ListProjectsResponse,
	ProjectDto,
	ProjectResponse,
	UpdateProjectRequest,
} from "./contracts";

const BASE_PATH = "/projects";

export const realProjectsApi = {
	getList(params: ListProjectsParams): Promise<ListProjectsResponse> {
		return apiClient.get<ListProjectsResponse>(BASE_PATH, { params }).then((r) => r.data);
	},

	getById(id: string): Promise<ProjectDto | null> {
		return apiClient
			.get<ProjectResponse>(`${BASE_PATH}/${id}`)
			.then((r) => r.data.data)
			.catch(() => null);
	},

	create(payload: CreateProjectRequest): Promise<ProjectDto> {
		return apiClient.post<ProjectResponse>(BASE_PATH, payload).then((r) => r.data.data);
	},

	update(id: string, payload: UpdateProjectRequest): Promise<ProjectDto> {
		return apiClient.patch<ProjectResponse>(`${BASE_PATH}/${id}`, payload).then((r) => r.data.data);
	},

	remove(id: string): Promise<void> {
		return apiClient.delete(`${BASE_PATH}/${id}`).then(() => undefined);
	},
};
