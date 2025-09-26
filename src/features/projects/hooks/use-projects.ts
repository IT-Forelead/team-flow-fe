import {
  createProject,
  deleteProject,
  getProjects,
  updateProject,
} from "@/features/projects/services/projects.service.ts";
import type {
  ProjectCreate,
  ProjectFilter,
  ProjectUpdate,
} from "@/features/projects/types.ts";
import type {
  ApiResponse,
  PaginatedResponse,
  ServerError,
} from "@/types/common.ts";
import {
  keepPreviousData,
  skipToken,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

export function useCreateProject() {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse, ServerError, ProjectCreate>({
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] }).then();
    },
  });
}

export function useUpdateProject() {
  const queryClient = useQueryClient();
  return useMutation<
    ApiResponse,
    ServerError,
    { id: string; data: ProjectUpdate }
  >({
    mutationFn: ({ id, data }: { id: string; data: ProjectUpdate }) =>
      updateProject(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] }).then();
    },
  });
}

export function useGetProjects(filter?: ProjectFilter) {
  return useQuery({
    queryKey: ["projects", filter],
    queryFn: filter ? () => getProjects(filter) : skipToken,
    placeholderData: keepPreviousData,
    select: (data) => data.data,
  });
}
useGetProjects.isQueryHook = true;

export function useDeleteProject() {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse, ServerError, string>({
    mutationFn: (id: string) => deleteProject(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] }).then();
    },
  });
}
