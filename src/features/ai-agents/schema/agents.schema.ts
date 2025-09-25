import type { AgentCreate, AgentUpdate } from '@/features/ai-agents/types.ts';
import { z } from 'zod';

export const agentCreateSchema = () => {
  return z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    prompt: z.string().min(2, 'Prompt must be at least 2 characters'),
    description: z.string().optional(),
  }) satisfies z.ZodType<AgentCreate>;
};

export type AgentCreateSchema = z.infer<ReturnType<typeof agentCreateSchema>>;

export const agentUpdateSchema = () => {
  return z.object({
    id: z.string().uuid(),
    name: z.string().min(3, 'Name must be at least 3 characters'),
    prompt: z.string().min(30, 'Prompt must be at least 30 characters'),
    description: z.string().optional(),
  }) satisfies z.ZodType<AgentUpdate>;
};

export type AgentUpdateSchema = z.infer<ReturnType<typeof agentUpdateSchema>>;
