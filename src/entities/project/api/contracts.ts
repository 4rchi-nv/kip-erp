import type { ListParams, PaginatedResponse } from "#/shared/api";
import type { Project, ProjectStatus } from "#/types";

export type ProjectDto = Project;

export type ListProjectsParams = ListParams & {
	status?: ProjectStatus;
	manager?: string;
};

export type ListProjectsResponse = PaginatedResponse<ProjectDto>;

export interface CreateProjectRequest {
	name: string;
	client: string;
	manager: string;
	status: ProjectStatus;
	budget: number;
	progress: number;
	startDate: string;
	endDate: string;
}

export type UpdateProjectRequest = Partial<CreateProjectRequest>;

export interface ProjectResponse {
	data: ProjectDto;
}
