import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUpdateProject } from "@/features/projects/hooks/use-projects";
import {
  type ProjectUpdateSchema,
  projectUpdateSchema,
} from "@/features/projects/schema/projects.schema";
import type { Project, ProjectUpdate } from "@/features/projects/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface UpdateProjectProps {
  project: Project;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UpdateProject({
  project,
  open,
  onOpenChange,
}: UpdateProjectProps) {
  const { mutate: updateProject, isPending } = useUpdateProject();

  const form = useForm<ProjectUpdateSchema>({
    resolver: zodResolver(projectUpdateSchema()),
    defaultValues: {
      name: "",
      url: "",
    },
  });

  // Populate form with project data when project changes or modal opens
  useEffect(() => {
    if (project && open) {
      form.reset({
        name: project.name || "",
        url: project.url,
      });
    }
  }, [project, open, form]);

  function onSubmit(data: ProjectUpdate) {
    updateProject(
      { id: project.id, data },
      {
        onSuccess: (response) => {
          const message = response?.message || "Project updated successfully";

          toast.success(message, {
            duration: Number.POSITIVE_INFINITY,
            cancel: {
              label: "Close",
              onClick: () => {},
            },
          });

          onOpenChange(false);
        },
        onError: (error) => {
          toast.error(error.message, {
            duration: Number.POSITIVE_INFINITY,
            cancel: {
              label: "Close",
              onClick: () => {},
            },
          });
        },
      }
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Update Project</DialogTitle>
          <DialogDescription>
            Update project information. Modify the fields below and save
            changes.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      inputSize="md"
                      placeholder="Enter project name (optional)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>URL</FormLabel>
                  <FormControl>
                    <Input
                      inputSize="md"
                      type="url"
                      placeholder="https://example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Updating..." : "Update Project"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
