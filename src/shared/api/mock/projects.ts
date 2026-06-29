import type {
	CreateProjectRequest,
	ListProjectsParams,
	ProjectDto,
	UpdateProjectRequest,
} from "#/entities/project/api/contracts";
import { getMockDatabase, mockStore } from "#/shared/mock";
import { applyListQuery, toItemResponse, toListResponse, toVoidResponse } from "./list-utils";
import { assertFound, withMockRequest } from "./request";
import type { MockApiResponse, MockRequestOptions } from "./types";

function filterProjects(params: ListProjectsParams) {
	const { status, manager, ...listParams } = params;
	let items = [...getMockDatabase().projects];

	if (status) {
		items = items.filter((item) => item.status === status);
	}

	if (manager) {
		items = items.filter((item) => item.manager === manager);
	}

	return applyListQuery(items, listParams, {
		searchFields: ["name", "client", "manager"],
	});
}

export const mockProjectsApi = {
	getList(
		params: ListProjectsParams,
		options?: MockRequestOptions,
	): Promise<MockApiResponse<ProjectDto[]>> {
		return withMockRequest(() => toListResponse(filterProjects(params), params), options);
	},

	getById(id: string, options?: MockRequestOptions): Promise<MockApiResponse<ProjectDto>> {
		return withMockRequest(() => {
			const item = getMockDatabase().projects.find((entry) => entry.id === id);
			return toItemResponse(assertFound(item, "Проект"));
		}, options);
	},

	create(
		payload: CreateProjectRequest,
		options?: MockRequestOptions,
	): Promise<MockApiResponse<ProjectDto>> {
		return withMockRequest(() => toItemResponse(mockStore.createProject(payload)), options);
	},

	update(
		id: string,
		payload: UpdateProjectRequest,
		options?: MockRequestOptions,
	): Promise<MockApiResponse<ProjectDto>> {
		return withMockRequest(() => {
			const existing = getMockDatabase().projects.find((entry) => entry.id === id);
			assertFound(existing, "Проект");
			return toItemResponse(mockStore.updateProject(id, payload));
		}, options);
	},

	remove(id: string, options?: MockRequestOptions): Promise<MockApiResponse<null>> {
		return withMockRequest(() => {
			const existing = getMockDatabase().projects.find((entry) => entry.id === id);
			assertFound(existing, "Проект");
			mockStore.deleteProject(id);
			return toVoidResponse();
		}, options);
	},
};
