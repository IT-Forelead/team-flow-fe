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
import { useCheckProject, useCreateProject } from '@/features/projects/hooks/use-projects';
import {
  type ProjectCreateSchema,
  projectCreateSchema,
} from '@/features/projects/schema/projects.schema';
import type { Repository } from '@/features/projects/types';
import type { ProjectCreate } from '@/features/projects/types';
import { useDisclosure } from '@/hooks/use-disclosure';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckIcon, PlusIcon } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface CreateProjectProps {
  className?: string;
}

export function CreateProject({ className }: CreateProjectProps = {}) {
  const { isOpen, onClose, onOpenChange } = useDisclosure();

  const { mutate: createProject, isPending } = useCreateProject();
  const { mutate: checkProject, isPending: isChecking } = useCheckProject();

  const [repositoryData, setRepositoryData] = useState<Repository | null>(null);

  const form = useForm<ProjectCreateSchema>({
    resolver: zodResolver(projectCreateSchema()),
    defaultValues: {
      url: '',
    },
  });

  const url = form.watch('url');

  const handleCheckProject = () => {
    if (!url || !url.trim()) {
      toast.error('Please enter a URL first');
      return;
    }

    checkProject(
      { url },
      {
        onSuccess: repository => {
          setRepositoryData(repository);
          toast.success('Repository found successfully!');
        },
        onError: error => {
          setRepositoryData(null);
          toast.error(error.message || 'Repository not found. Please check the URL and try again.');
        },
      }
    );
  };

  function onSubmit(data: ProjectCreate) {
    createProject(data, {
      onSuccess: response => {
        toast.success(response?.message || 'Project created successfully');
        onClose();
        form.reset({
          url: '',
        });
        setRepositoryData(null);
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
      <DialogContent className="!max-w-fit">
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
                  <FormLabel required>Repository URL</FormLabel>
                  <FormControl>
                    <div className="grid md:grid-cols-12 gap-3 w-full">
                      <div className="md:col-span-10">
                        <Input
                          inputSize="md"
                          type="url"
                          placeholder="https://github.com/owner/repo"
                          {...field}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="default"
                          onClick={handleCheckProject}
                          disabled={isChecking || !url?.trim()}
                          className="px-4 shrink-0 whitespace-nowrap"
                        >
                          <CheckIcon className="h-4 w-4 mr-1" />
                          {isChecking ? 'Checking...' : 'Check'}
                        </Button>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {repositoryData && (
              <div className="rounded-lg border p-4 space-y-3 bg-muted/50">
                <div className="flex items-center gap-2">
                  <CheckIcon className="h-5 w-5 text-green-600" />
                  <h4 className="font-semibold text-green-700">Repository Found</h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-muted-foreground">Name:</span>
                    <p className="font-semibold">{repositoryData.name}</p>
                  </div>
                  <div>
                    <span className="font-medium text-muted-foreground">Owner:</span>
                    <p className="font-semibold">{repositoryData.owner.login}</p>
                  </div>
                  {repositoryData.description && (
                    <div className="md:col-span-2">
                      <span className="font-medium text-muted-foreground">Description:</span>
                      <p className="mt-1 text-sm">{repositoryData.description}</p>
                    </div>
                  )}
                  <div>
                    <span className="font-medium text-muted-foreground">Language:</span>
                    <p className="font-semibold">{repositoryData.language || 'N/A'}</p>
                  </div>
                  <div>
                    <span className="font-medium text-muted-foreground">Stars:</span>
                    <p className="font-semibold">{repositoryData.stargazersCount}</p>
                  </div>
                  <div>
                    <span className="font-medium text-muted-foreground">Forks:</span>
                    <p className="font-semibold">{repositoryData.forksCount}</p>
                  </div>
                  <div>
                    <span className="font-medium text-muted-foreground">Private:</span>
                    <p className="font-semibold">{repositoryData.private ? 'Yes' : 'No'}</p>
                  </div>
                </div>
              </div>
            )}

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose} disabled={isPending}>
                Cancel
              </Button>
              <Button type="submit" disabled={isPending || !repositoryData}>
                {isPending ? 'Creating...' : 'Create Project'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
