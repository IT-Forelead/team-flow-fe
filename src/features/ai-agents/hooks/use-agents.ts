import {
	createAgent,
	deleteAgent,
	getAgents,
	updateAgent,
} from '@/features/ai-agents/services/agents.service.ts';
import type { AgentCreate, AgentFilter, AgentUpdate } from '@/features/ai-agents/types.ts';
import type { ApiResponse, ServerError } from '@/types/common.ts';
import {
	keepPreviousData,
	skipToken,
	useMutation,
	useQuery,
	useQueryClient,
} from '@tanstack/react-query';

export function useCreateAgent() {
	return useMutation<ApiResponse, ServerError, AgentCreate>({
		mutationFn: createAgent,
	});
}

export function useUpdateAgent() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ id, data }: { id: string; data: AgentUpdate }) => updateAgent(id, data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['agents'] }).then();
		},
	});
}

export function useGetAgents(filter?: AgentFilter) {
	return useQuery({
		queryKey: ['agents', filter],
		queryFn: filter ? () => getAgents(filter) : skipToken,
		placeholderData: keepPreviousData,
	});
}
useGetAgents.isQueryHook = true;

export function useDeleteAgent() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (id: string) => deleteAgent(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['agents'] }).then();
		},
	});
}
