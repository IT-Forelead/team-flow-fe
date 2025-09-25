import type { User, UserCreate, UserFilter, UserUpdate } from '@/features/users/types.ts';
import axiosClient from '@/plugins/axios.ts';
import type { ApiResponse, PaginatedResponse, ServerError } from '@/types/common.ts';
import type { AxiosResponse } from 'axios';

export async function createUser(data: UserCreate): Promise<ApiResponse> {
	const response = await axiosClient.post<ApiResponse, AxiosResponse<ApiResponse, ServerError>>(
		'/users/create',
		data
	);
	return response.data;
}

export async function updateUser(id: string, data: UserUpdate): Promise<ApiResponse> {
	const response = await axiosClient.put<ApiResponse, AxiosResponse<ApiResponse, ServerError>>(
		`/users/${id}`,
		data
	);
	return response.data;
}

export async function getUsers(filter: UserFilter) {
	return await axiosClient.post<PaginatedResponse<User>>('/users', filter);
}

export async function deleteUser(id: string) {
	return await axiosClient.delete(`/users/${id}`);
}
