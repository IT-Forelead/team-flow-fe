import type { PaginationFilter } from '@/types/common.ts';

export interface Project {
  id: string;
  name: string;
  url: string;
}

export interface ProjectCreate {
  url: string;
}

export interface ProjectFilter extends PaginationFilter {
  name?: string;
  url?: string;
}

export interface ProjectUpdate {
  url: string;
}

export interface RepositoryOwner {
  login: string;
  id: number;
  nodeId: string;
  avatarUrl: string;
  gravatarId: string;
  url: string;
  htmlUrl: string;
  followersUrl: string;
  followingUrl: string;
  gistsUrl: string;
  starredUrl: string;
  subscriptionsUrl: string;
  organizationsUrl: string;
  reposUrl: string;
  eventsUrl: string;
  receivedEventsUrl: string;
  type: string;
  siteAdmin: boolean;
}

export interface RepositoryLicense {
  key: string;
  name: string;
  spdxId?: string;
  url?: string;
  nodeId: string;
}

export interface RepositoryPermissions {
  admin: boolean;
  maintain?: boolean;
  push: boolean;
  triage?: boolean;
  pull: boolean;
}

export interface Repository {
  id: number;
  nodeId: string;
  name: string;
  fullName: string;
  private: boolean;
  owner: RepositoryOwner;
  htmlUrl: string;
  description?: string;
  fork: boolean;
  url: string;
  forksUrl: string;
  keysUrl: string;
  collaboratorsUrl: string;
  teamsUrl: string;
  hooksUrl: string;
  issueEventsUrl: string;
  eventsUrl: string;
  assigneesUrl: string;
  branchesUrl: string;
  tagsUrl: string;
  blobsUrl: string;
  gitTagsUrl: string;
  gitRefsUrl: string;
  treesUrl: string;
  statusesUrl: string;
  languagesUrl: string;
  stargazersUrl: string;
  contributorsUrl: string;
  subscribersUrl: string;
  subscriptionUrl: string;
  commitsUrl: string;
  gitCommitsUrl: string;
  commentsUrl: string;
  issueCommentUrl: string;
  contentsUrl: string;
  compareUrl: string;
  mergesUrl: string;
  archiveUrl: string;
  downloadsUrl: string;
  issuesUrl: string;
  pullsUrl: string;
  milestonesUrl: string;
  notificationsUrl: string;
  labelsUrl: string;
  releasesUrl: string;
  deploymentsUrl: string;
  createdAt: string;
  updatedAt: string;
  pushedAt?: string;
  gitUrl: string;
  sshUrl: string;
  cloneUrl: string;
  svnUrl: string;
  homepage?: string;
  size: number;
  stargazersCount: number;
  watchersCount: number;
  language?: string;
  hasIssues: boolean;
  hasProjects: boolean;
  hasWiki: boolean;
  hasPages: boolean;
  hasDownloads: boolean;
  forksCount: number;
  mirrorUrl?: string;
  archived: boolean;
  disabled: boolean;
  openIssuesCount: number;
  license?: RepositoryLicense;
  allowForking: boolean;
  isTemplate: boolean;
  webCommitSignoffRequired: boolean;
  topics: string[];
  visibility: string;
  forks: number;
  openIssues: number;
  watchers: number;
  defaultBranch: string;
  permissions?: RepositoryPermissions;
  networkCount?: number;
  subscribersCount?: number;
}
