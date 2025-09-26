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
import { useCreateProject } from '@/features/projects/hooks/use-projects';
import {
  type ProjectCreateSchema,
  projectCreateSchema,
} from '@/features/projects/schema/projects.schema';
import type { ProjectCreate } from '@/features/projects/types';
import { useDisclosure } from '@/hooks/use-disclosure';
import { zodResolver } from '@hookform/resolvers/zod';
import { PlusIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface CreateProjectProps {
  className?: string;
}

export function CreateProject({ className }: CreateProjectProps = {}) {
  const { isOpen, onClose, onOpenChange } = useDisclosure();

  const { mutate: createProject, isPending } = useCreateProject();

  const form = useForm<ProjectCreateSchema>({
    resolver: zodResolver(projectCreateSchema()),
    defaultValues: {
      url: '',
    },
  });

  function onSubmit(data: ProjectCreate) {
    createProject(data, {
      onSuccess: response => {
        toast.success(response?.message || 'Project created successfully');
        onClose();
        form.reset({
          url: '',
        });
      },
      onError: error => {
        toast.error(error.message || 'Failed to create project');
      },
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button
          leftIcon={<PlusIcon className="mr-2 h-4 w-4" />}
          size="default"
          className={className}
        >
          Create Project
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
          <DialogDescription>
            Create a new project. Fill in the required information below.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>URL</FormLabel>
                  <FormControl>
                    <Input inputSize="md" type="url" placeholder="https://example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose} disabled={isPending}>
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? 'Creating...' : 'Create Project'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
