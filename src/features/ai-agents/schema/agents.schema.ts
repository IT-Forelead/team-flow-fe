import type { AgentCreate, AgentUpdate } from '@/features/ai-agents/types.ts';
import { z } from 'zod';

export const agentCreateSchema = (t: (key: string) => string) => {
	return z.object({
		name: z.string().min(2, t('validations.enterName')),
		prompt: z.string().min(2, t('validations.enterPrompt')),
		description: z.string().optional(),
	}) satisfies z.ZodType<AgentCreate>;
};

export type AgentCreateSchema = z.infer<ReturnType<typeof agentCreateSchema>>;

export const agentUpdateSchema = (t: (key: string) => string) => {
	return z.object({
		id: z.string().uuid(),
		name: z.string().min(3, t('validations.enterName')),
		prompt: z.string().min(30, t('validations.enterPrompt')),
		description: z.string().optional(),
	}) satisfies z.ZodType<AgentUpdate>;
};

export type AgentUpdateSchema = z.infer<ReturnType<typeof agentUpdateSchema>>;
