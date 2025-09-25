import type { PaginationFilter } from '@/types/common.ts';

export interface Project {
  id: string;
  name: string;
  url: string;
}

export interface ProjectCreate {
  name?: string;
  url: string;
}

export interface ProjectFilter extends PaginationFilter {
  name?: string;
}

export interface ProjectUpdate {
  id: string;
  name?: string;
  url?: string;
}
