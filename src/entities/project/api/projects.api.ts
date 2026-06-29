import { loadMockApi } from "#/shared/api/load-mock";
import { toPaginatedResponse } from "#/shared/api/mock-response";
import { isMockMode } from "#/shared/config";
import type {
	CreateProjectRequest,
	ListProjectsParams,
	ListProjectsResponse,
	ProjectDto,
	UpdateProjectRequest,
} from "./contracts";
import { realProjectsApi } from "./projects.real-api";

export const projectsApi = {
	getList(params: ListProjectsParams): Promise<ListProjectsResponse> {
		if (isMockMode()) {
			return loadMockApi().then(({ mockProjectsApi }) =>
				mockProjectsApi.getList(params).then((response) => toPaginatedResponse(response, params)),
			);
		}

		return realProjectsApi.getList(params);
	},

	getById(id: string): Promise<ProjectDto | null> {
		if (isMockMode()) {
			return loadMockApi().then(({ mockProjectsApi }) =>
				mockProjectsApi.getById(id).then((response) => response.data),
			);
		}

		return realProjectsApi.getById(id);
	},

	create(payload: CreateProjectRequest): Promise<ProjectDto> {
		if (isMockMode()) {
			return loadMockApi().then(({ mockProjectsApi }) =>
				mockProjectsApi.create(payload).then((response) => response.data),
			);
		}

		return realProjectsApi.create(payload);
	},

	update(id: string, payload: UpdateProjectRequest): Promise<ProjectDto> {
		if (isMockMode()) {
			return loadMockApi().then(({ mockProjectsApi }) =>
				mockProjectsApi.update(id, payload).then((response) => response.data),
			);
		}

		return realProjectsApi.update(id, payload);
	},

	remove(id: string): Promise<void> {
		if (isMockMode()) {
			return loadMockApi().then(({ mockProjectsApi }) =>
				mockProjectsApi.remove(id).then(() => undefined),
			);
		}

		return realProjectsApi.remove(id);
	},
};
