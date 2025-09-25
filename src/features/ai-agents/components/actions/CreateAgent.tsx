import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea.tsx';
import { useCreateAgent } from '@/features/ai-agents/hooks/use-agents.ts';
import {
  type AgentCreateSchema,
  agentCreateSchema,
} from '@/features/ai-agents/schema/agents.schema.ts';
import type { AgentCreate } from '@/features/ai-agents/types.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import { PlusIcon } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface CreateAgentProps {
  className?: string;
}

export function CreateAgent({ className }: CreateAgentProps) {
  const [open, setOpen] = useState(false);

  const { mutate: createAgent, isPending } = useCreateAgent();

  const form = useForm<AgentCreateSchema>({
    resolver: zodResolver(agentCreateSchema()),
    defaultValues: {
      name: '',
    },
  });

  function onSubmit(data: AgentCreate) {
    createAgent(data, {
      onSuccess: () => {
        toast.success('Agent created successfully');
        setOpen(false);
        form.reset();
      },
      onError: error => {
        toast.error(error.message);
      },
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          leftIcon={<PlusIcon className="mr-2 h-4 w-4" />}
          size="default"
          className={className}
        >
          Create Agent
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-7xl sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Agent</DialogTitle>
          <DialogDescription>
            Create a new agent. Fill in the required information below.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Agent Name</FormLabel>
                  <FormControl>
                    <Input inputSize="md" placeholder="For example: Commit Analyzer" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="prompt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prompt</FormLabel>
                  <FormControl>
                    <Textarea placeholder="You are a senior code review expert..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Analyzes code quality..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? 'Creating...' : 'Create Agent'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
