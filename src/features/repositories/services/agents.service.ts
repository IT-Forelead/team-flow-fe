import type { Agent } from 'node:http';
import type {
	AgentCreate,
	AgentCreateResponse,
	AgentFilter,
	AgentUpdate,
} from '@/features/ai-agents/types.ts';
import axiosClient from '@/plugins/axios.ts';
import type { PaginatedResponse, ServerError } from '@/types/common.ts';
import type { AxiosResponse } from 'axios';

export async function createAgent(data: AgentCreate): Promise<AgentCreateResponse> {
	const response = await axiosClient.post<
		AgentCreateResponse,
		AxiosResponse<AgentCreateResponse, ServerError>
	>('/users', data);
	return response.data;
}

export async function updateAgent(id: string, data: AgentUpdate) {
	return await axiosClient.put(`/users/${id}`, data);
}

export async function getAgents(filter: AgentFilter) {
	return await axiosClient.post<PaginatedResponse<Agent>>('/agents', filter);
}

export async function deleteAgent(id: string) {
	return await axiosClient.delete(`/agents/${id}`);
}
