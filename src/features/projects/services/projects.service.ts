import type {
  Project,
  ProjectCreate,
  ProjectFilter,
  ProjectUpdate,
} from '@/features/projects/types.ts';
import axiosClient from '@/plugins/axios.ts';
import type { ApiResponse, PaginatedResponse, ServerError } from '@/types/common.ts';
import type { AxiosResponse } from 'axios';

export async function createProject(data: ProjectCreate): Promise<ApiResponse> {
  const response = await axiosClient.post<ApiResponse, AxiosResponse<ApiResponse, ServerError>>(
    '/projects',
    data
  );
  return response.data;
}

export async function updateProject(id: string, data: ProjectUpdate): Promise<ApiResponse> {
  const response = await axiosClient.put<ApiResponse, AxiosResponse<ApiResponse, ServerError>>(
    `/projects/${id}`,
    data
  );
  return response.data;
}

export async function getProjects(filter: ProjectFilter) {
  return await axiosClient.post<PaginatedResponse<Project>>('/projects', filter);
}

export async function deleteProject(id: string): Promise<ApiResponse> {
  return await axiosClient.delete(`/projects/${id}`);
}
